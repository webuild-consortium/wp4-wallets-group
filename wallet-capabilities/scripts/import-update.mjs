// Import a wallet-provider update from a submitted CSV into the live dataset.
//
// Pipeline: parse & validate the submitted file  ->  show a highlighted field-level diff
// against the current entry  ->  ask for confirmation  ->  write, commit, and open a pull
// request (default; main requires PRs) or push straight to main.
//
// Usage (run from the wallet-capabilities/ directory):
//   npm run import-update -- <submitted.csv> [--dry-run] [--yes] [--push-main | --no-push]
//
//   --dry-run     validate and show the diff only; never writes, commits, or pushes
//   --yes, -y     skip the interactive confirmation (needed when run non-interactively, e.g. from Claude)
//   (default)     commit on a new branch and open a pull request via gh — main requires PRs
//   --push-main   commit + push straight to origin/main (admins only; bypasses the PR rule)
//   --no-push     apply + commit locally but do not push
//
// CSV only. If you have an .xlsx, open it in Excel and Save As -> CSV first.
// Merge semantics: a blank cell in the submission keeps the current value; only filled-in
// cells change. To clear a field, say so explicitly (it cannot be done with a blank cell).

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execFileSync } from 'child_process';
import Papa from 'papaparse';
import { CONFIG, COLUMN_ORDER, findHeaderRow, isEmptyRow, validateRow } from './lib/wallet-schema.mjs';

// ---- terminal styling (plain when not a TTY, e.g. CI or piped) ----
const color = process.stdout.isTTY;
const style = (code, s) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
const red = s => style('31', s);
const green = s => style('32', s);
const yellow = s => style('33', s);
const cyan = s => style('36', s);
const bold = s => style('1', s);
const dim = s => style('2', s);

// Resolve git / gh executables. On Windows, execFileSync can't reliably resolve a bare name
// (and a freshly-installed gh may not be on PATH yet), so search PATH + the usual install folders.
function findExecutable(name, extraDirs = []) {
    const isWin = process.platform === 'win32';
    const exts = isWin ? (process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM').split(';').filter(Boolean) : [];
    const dirs = [...(process.env.PATH || '').split(path.delimiter).filter(Boolean), ...extraDirs];
    for (const dir of dirs) {
        for (const p of [path.join(dir, name), ...exts.map(e => path.join(dir, name + e))]) {
            try { if (fs.existsSync(p) && fs.statSync(p).isFile()) return p; } catch {}
        }
    }
    return null;
}
const GH_DIRS = [
    path.join(process.env.ProgramFiles || 'C:\\Program Files', 'GitHub CLI'),
    path.join(process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)', 'GitHub CLI'),
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'GitHub CLI'),
    path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Links'),
];
const GIT = findExecutable('git') || 'git';
const GH = findExecutable('gh', GH_DIRS);

const CSV_PATH = path.join(process.cwd(), 'public', 'wallet capabilities.csv');

function fail(msg) {
    console.error(red('✖ ') + msg);
    process.exit(1);
}

// ---- parse arguments ----
const argv = process.argv.slice(2);
const flags = new Set(argv.filter(a => a.startsWith('-')));
const positional = argv.filter(a => !a.startsWith('-'));
const submittedPath = positional[0];
const dryRun = flags.has('--dry-run');
const autoYes = flags.has('--yes') || flags.has('-y');
const noPush = flags.has('--no-push');
const pushMain = flags.has('--push-main');
const openPr = !noPush && !pushMain; // default: open a pull request (main is protected)

if (flags.has('--help') || flags.has('-h') || !submittedPath) {
    console.log(`Import a wallet-provider update from a submitted CSV.

Usage: npm run import-update -- <submitted.csv> [--dry-run] [--yes] [--push-main | --no-push]

  --dry-run     validate and show the diff only (no write/commit/push)
  --yes, -y     skip the confirmation prompt
  (default)     commit on a new branch and open a pull request via gh (main requires PRs)
  --push-main   commit + push straight to main (admins only; bypasses the PR rule)
  --no-push     commit locally but do not push`);
    process.exit(submittedPath ? 0 : 1);
}
if (pushMain && noPush) fail('Use either --push-main or --no-push, not both.');
if (openPr && !GH) fail('Opening a pull request needs the GitHub CLI (gh), which was not found on PATH or in the usual install folders.\n  Open a new terminal (so PATH picks up the install), install gh, or use --push-main (admins) / --no-push.');
if (/\.xlsx?$/i.test(submittedPath)) {
    fail(`This tool reads CSV only. Open "${path.basename(submittedPath)}" in Excel and Save As → CSV, then re-run.\n  ` +
        yellow('Heads up:') + ` Excel can silently turn a portal number like 29.1 into a date (29-Jan). Check the 'nr in Portal' cell before saving.`);
}
if (!fs.existsSync(submittedPath)) fail(`File not found: ${submittedPath}`);
if (!fs.existsSync(CSV_PATH)) fail(`Current dataset not found at ${CSV_PATH}. Run this from the wallet-capabilities/ directory.`);

// ---- quote-aware record splitter: preserves exact byte offsets so untouched rows stay byte-identical ----
function splitRecords(text) {
    const records = [];
    let start = 0;
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === '"') {
            if (inQuotes && text[i + 1] === '"') { i++; continue; } // escaped ""
            inQuotes = !inQuotes;
        } else if (ch === '\n' && !inQuotes) {
            let end = i;
            if (text[i - 1] === '\r') end = i - 1; // keep \r\n intact in the surrounding raw text
            records.push({ start, end, text: text.slice(start, end) });
            start = i + 1;
        }
    }
    if (start < text.length) records.push({ start, end: text.length, text: text.slice(start) });
    return records;
}

const parseLine = (line, delimiter) => (Papa.parse(line, { delimiter, header: false }).data[0] || []);

// ---- read & parse the submitted file (accept ';' or ',' as the column delimiter) ----
const submittedRaw = fs.readFileSync(submittedPath, 'utf8');
let submittedDelimiter = null;
let submittedRows = null;
for (const delimiter of [CONFIG.delimiter, ',']) {
    const rows = Papa.parse(submittedRaw, { delimiter, skipEmptyLines: false, header: false }).data;
    if (findHeaderRow(rows) !== -1) { submittedDelimiter = delimiter; submittedRows = rows; break; }
}
if (!submittedRows) {
    fail(`Could not find a header row in "${path.basename(submittedPath)}". It must contain the '${CONFIG.headers.id}' / '${CONFIG.headers.shortName}' columns.`);
}

const sHeaderIndex = findHeaderRow(submittedRows);
const sHeaders = submittedRows[sHeaderIndex].map(h => (h || '').trim());
const sIndexOf = name => sHeaders.indexOf(name);
const missingCols = COLUMN_ORDER.filter(h => sIndexOf(h) === -1);
if (missingCols.length) {
    console.log(yellow(`⚠ Submitted file is missing column(s): ${missingCols.join(', ')}. Those fields will be left unchanged.`));
}

// ---- load the current dataset ----
const currentRaw = fs.readFileSync(CSV_PATH, 'utf8');
const records = splitRecords(currentRaw);
let currentHeaderOrder = null;
const currentById = new Map(); // id -> { record, fields }
for (const record of records) {
    const fields = parseLine(record.text, CONFIG.delimiter);
    if (!currentHeaderOrder && (fields.includes(CONFIG.headers.id) || fields.includes(CONFIG.headers.shortName))) {
        currentHeaderOrder = fields.map(h => (h || '').trim());
        continue;
    }
    if (!currentHeaderOrder) continue;
    const idIdx = currentHeaderOrder.indexOf(CONFIG.headers.id);
    const id = ((fields[idIdx] ?? '')).trim();
    if (id) currentById.set(id, { record, fields });
}
if (!currentHeaderOrder) fail(`Could not locate the header row in the current dataset (${CSV_PATH}).`);
const currentIndexOf = name => currentHeaderOrder.indexOf(name);

// ---- build the planned changes ----
const replacements = []; // { start, end, text }
const appends = [];      // serialized new record lines
const summaries = [];    // for the commit message
const errors = [];
let changeCount = 0;

for (let i = sHeaderIndex + 1; i < submittedRows.length; i++) {
    const row = submittedRows[i];
    if (isEmptyRow(row)) continue;

    const sGet = name => { const idx = sIndexOf(name); return idx !== -1 ? String(row[idx] ?? '').trim() : ''; };
    const id = sGet(CONFIG.headers.id);
    const shortName = sGet(CONFIG.headers.shortName);

    if (!id || !/^[0-9.]+$/.test(id)) {
        errors.push(`Submitted entry "${shortName || '(no name)'}": '${CONFIG.headers.id}' must be a number (digits and periods only). Found: "${sGet(CONFIG.headers.id)}". ` +
            `Replace any 'TBD' placeholder with the portal number from the Grant Agreement.`);
        continue;
    }

    const existing = currentById.get(id);
    // Build the resulting row as { header -> value }, merging submitted over current.
    const resulting = {};
    for (const header of currentHeaderOrder) {
        const submittedVal = sGet(header);
        const currentVal = existing ? String(existing.fields[currentIndexOf(header)] ?? '') : '';
        resulting[header] = submittedVal !== '' ? submittedVal : currentVal;
    }

    // Validate the resulting row (what will actually be written).
    const label = existing ? `nr ${id} (${shortName || resulting[CONFIG.headers.shortName]})` : `new entry nr ${id} (${shortName})`;
    const rowErrors = validateRow(h => resulting[h] ?? '', label);
    if (rowErrors.length) { errors.push(...rowErrors); continue; }

    // Field-level diff (compare trimmed values).
    const changedFields = [];
    for (const header of COLUMN_ORDER) {
        const before = existing ? String(existing.fields[currentIndexOf(header)] ?? '').trim() : '';
        const after = String(resulting[header] ?? '').trim();
        if (before !== after) changedFields.push({ header, before, after });
    }

    // Header line
    console.log('');
    console.log(bold(cyan(`── nr ${id} · ${resulting[CONFIG.headers.shortName] || shortName} `)) +
        bold(existing ? yellow('(UPDATE)') : green('(NEW ENTRY)')));

    if (!existing) {
        for (const header of COLUMN_ORDER) {
            const val = String(resulting[header] ?? '').trim();
            if (val) console.log('  ' + green('+ ') + bold(header) + ': ' + green(val));
        }
        appends.push(Papa.unparse([currentHeaderOrder.map(h => resulting[h] ?? '')], { delimiter: CONFIG.delimiter }));
        summaries.push(`add ${resulting[CONFIG.headers.shortName] || shortName} (nr ${id})`);
        changeCount++;
    } else if (changedFields.length === 0) {
        console.log(dim('  no changes (submitted values match the current entry)'));
    } else {
        for (const { header, before, after } of changedFields) {
            console.log('  ' + bold(header) + ':');
            console.log('    ' + red('- ' + (before || dim('(empty)'))));
            console.log('    ' + green('+ ' + (after || dim('(empty)'))));
        }
        console.log(dim(`  ${changedFields.length} field(s) changed, ${COLUMN_ORDER.length - changedFields.length} unchanged.`));
        replacements.push({
            start: existing.record.start,
            end: existing.record.end,
            text: Papa.unparse([currentHeaderOrder.map(h => resulting[h] ?? '')], { delimiter: CONFIG.delimiter })
        });
        summaries.push(`update ${resulting[CONFIG.headers.shortName] || shortName} (nr ${id})`);
        changeCount++;
    }
}

console.log('');
if (errors.length) {
    console.error(red(bold(`Validation failed with ${errors.length} problem(s):`)));
    errors.forEach(e => console.error(red('  - ') + e));
    console.error('\nNothing was changed. Fix the submitted file and re-run.');
    process.exit(1);
}
if (changeCount === 0) {
    console.log(green('✔ The submitted file matches the current data — nothing to apply.'));
    process.exit(0);
}

// ---- assemble the new file content (offset-safe: only the touched records change) ----
let updated = currentRaw;
for (const r of [...replacements].sort((a, b) => b.start - a.start)) {
    updated = updated.slice(0, r.start) + r.text + updated.slice(r.end);
}
if (appends.length) {
    updated = updated.replace(/\r?\n?$/, '\n') + appends.join('\n') + '\n';
}

// Re-validate the fully assembled file as a safety net.
const check = Papa.parse(updated, { delimiter: CONFIG.delimiter, skipEmptyLines: true, header: false }).data;
const checkHeader = findHeaderRow(check);
const checkHeaders = check[checkHeader].map(h => (h || '').trim());
const checkErrors = [];
for (let i = checkHeader + 1; i < check.length; i++) {
    if (isEmptyRow(check[i])) continue;
    const getRaw = name => { const idx = checkHeaders.indexOf(name); return idx !== -1 ? (check[i][idx] ?? '') : ''; };
    checkErrors.push(...validateRow(getRaw, `Row ${i + 1}`));
}
if (checkErrors.length) {
    console.error(red(`Internal check failed — the assembled file would be invalid (${checkErrors.length} error(s)); aborting without writing.`));
    checkErrors.forEach(e => console.error(red('  - ') + e));
    process.exit(1);
}

console.log(bold(`Ready to apply ${changeCount} change(s): `) + summaries.join('; '));

if (dryRun) {
    console.log(dim('\n--dry-run: no files were written and nothing was pushed.'));
    process.exit(0);
}

// ---- confirmation ----
async function confirm() {
    if (autoYes) return true;
    if (!process.stdin.isTTY) {
        console.log(yellow('\nNon-interactive environment detected. Re-run with ') + bold('--yes') + yellow(' to apply.'));
        return false;
    }
    const action = openPr ? 'commit on a new branch and open a pull request'
        : noPush ? 'commit locally (no push)'
        : 'commit and push to origin/main';
    return new Promise(resolve => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question(bold(`\nApply the above and ${action}? [y/N] `), ans => {
            rl.close();
            resolve(/^y(es)?$/i.test(ans.trim()));
        });
    });
}

if (!(await confirm())) {
    console.log('Aborted. Nothing was changed.');
    process.exit(0);
}

// ---- write ----
fs.writeFileSync(CSV_PATH, updated, 'utf8');
console.log(green(`✔ Updated ${path.basename(CSV_PATH)}.`));

// ---- commit, then open a PR / push to main / stay local ----
const git = (args) => execFileSync(GIT, args, { encoding: 'utf8' }).trim();
const gh = (args) => execFileSync(GH, args, { encoding: 'utf8' }).trim();
const commitMsg = `data: ${summaries.join('; ')} (via import-update)`;
const csvRel = 'public/wallet capabilities.csv';
try {
    const baseBranch = git(['rev-parse', '--abbrev-ref', 'HEAD']);

    if (openPr) {
        const slug = (summaries.map(s => (s.match(/nr ([0-9.]+)/) || [])[1]).filter(Boolean).join('-') || 'update').slice(0, 40);
        const stamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
        const prBranch = `wallet-update-${slug}-${stamp}`;
        git(['checkout', '-b', prBranch]);
        git(['add', csvRel]);
        git(['commit', '-m', commitMsg]);
        git(['push', '-u', 'origin', prBranch]);
        const prUrl = gh(['pr', 'create', '--base', 'main', '--head', prBranch, '--title', commitMsg,
            '--body', `Automated import of a provider update via \`import-update\`.\n\n- ${summaries.join('\n- ')}\n\nThe CSV validation check runs on this PR; merge to publish.`]);
        git(['checkout', baseBranch]); // back to the starting branch; main stays clean until the PR merges
        console.log(green('✔ Opened a pull request:'));
        console.log('  ' + prUrl);
        console.log(dim(`(Back on "${baseBranch}". Merge the PR — validation runs, then the site redeploys.)`));
    } else if (noPush) {
        git(['add', csvRel]);
        git(['commit', '-m', commitMsg]);
        console.log(green(`✔ Committed on ${baseBranch}.`));
        console.log(yellow('--no-push: not pushing. Push when ready: git push origin main'));
    } else {
        // --push-main: bypasses the branch-protection PR rule (admins only)
        if (baseBranch !== 'main') fail(`--push-main expects branch "main" but you're on "${baseBranch}". Switch to main first.`);
        git(['add', csvRel]);
        git(['commit', '-m', commitMsg]);
        console.log(green(`✔ Committed on ${baseBranch}.`));
        git(['push', 'origin', 'main']);
        console.log(green('✔ Pushed to origin/main. The deploy workflow will republish the site shortly.'));
    }
} catch (e) {
    fail(`git/gh step failed: ${e.stderr || e.message}\nThe CSV was written locally; review with 'git status' / 'git diff' and finish manually.`);
}
