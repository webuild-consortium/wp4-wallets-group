import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { CONFIG, findHeaderRow, isEmptyRow, validateRow } from './lib/wallet-schema.mjs';

const csvFilePath = path.join(process.cwd(), 'public', 'wallet capabilities.csv');

console.log(`Validating CSV file at: ${csvFilePath}`);

try {
    const csvFile = fs.readFileSync(csvFilePath, 'utf8');

    console.log('File read successfully. Parsing...');

    const results = Papa.parse(csvFile, {
        delimiter: CONFIG.delimiter,
        skipEmptyLines: true,
        header: false,
    });

    if (results.errors.length > 0) {
        throw new Error('CSV parsing error: ' + results.errors.map(e => e.message).join(', '));
    }

    console.log('File parsed. Processing data...');

    const rows = results.data;
    const headerIndex = findHeaderRow(rows);

    if (headerIndex === -1) {
        throw new Error("Could not identify header row. Make sure it contains 'nr in Portal' or 'Short name'.");
    }

    const headers = rows[headerIndex].map(h => h?.trim());
    const getIndex = (headerName) => headers.indexOf(headerName);

    let entryCount = 0;
    const errors = [];

    for (let i = headerIndex + 1; i < rows.length; i++) {
        const row = rows[i];

        // Skip completely empty rows
        if (isEmptyRow(row)) {
            continue;
        }

        const rowNum = i + 1; // 1-based index for logging
        const getRaw = (headerName) => {
            const idx = getIndex(headerName);
            return idx !== -1 ? (row[idx] ?? '') : '';
        };

        errors.push(...validateRow(getRaw, `Row ${rowNum}`));
        entryCount++;
    }

    if (errors.length > 0) {
        console.error(`\nValidation failed with ${errors.length} errors:`);
        errors.forEach(err => console.error(`- ${err}`));
        process.exit(1);
    }

    if (entryCount > 0) {
        console.log(`CSV file is valid. Found ${entryCount} wallet entries.`);
        process.exit(0);
    } else {
        throw new Error('No wallet entries found after processing.');
    }

} catch (error) {
    if (!error.message) {
        process.exit(1);
    }
    console.error('CSV validation failed:', error.message);
    process.exit(1);
}
