# How to update your Wallet Capabilities entry

This guide explains how to add or update your organization's entry in the **WE BUILD Wallet
Capability Viewer** → https://webuild-consortium.github.io/wp4-wallets-group/

## Where the data comes from

The public page is generated from a single CSV file in this repository:

[`wallet-capabilities/public/wallet capabilities.csv`](public/wallet%20capabilities.csv)

Any change to that file on the `main` branch triggers an automated build that revalidates the
data and redeploys the page.

## What this is — and isn't

This is **not an official registry** of wallet providers or their solutions, and it is **not
intended to capture every possible value or update**. The data originates from the initial
stock-taking questionnaire run at the start of the project. Beyond that exercise, it is maintained
only for wallet providers who specifically requested to be included, on a case-by-case basis. It
will not necessarily reflect every new protocol or technology your wallet supports — it captures
what was recorded at the time of the original exercise or a specific update request, not a live or
exhaustive technical spec of your solution.

Its purpose is also not to demonstrate or promote your product. It exists solely to give other
members of the WE BUILD consortium a general overview of the wallet arsenal available within the
project.

> **Disclaimer.** The data are self-declared by each wallet provider and may be outdated. Verify
> information directly with providers for the most current details.

## Two ways to update

| | Option 1 — Edit the CSV yourself | Option 2 — Send us a template |
|---|---|---|
| **Best if** | You're comfortable with GitHub / CSV | You'd rather fill a spreadsheet |
| **You need** | Write access to the repo (see below) | Nothing special |
| **We do** | Nothing — the pipeline handles it | We import your values for you |

---

## Option 1 — Edit the CSV yourself

**Step 1 — Get write access.** You must be a member of the
[`wp4-wallet-providers-contributors`](https://github.com/orgs/webuild-consortium/teams/wp4-wallet-providers-contributors)
GitHub team. If you're not, email **webuild-github-support@grnet.gr** with your GitHub username to
be added.

**Step 2 — Download and edit the file locally.** Open
[`public/wallet capabilities.csv`](public/wallet%20capabilities.csv) on GitHub, use the **Raw** button
to download it, and edit your row in a **local** text editor, following the
**[column rules](#column-rules)** and **[format notes](#csv-format-notes)**. To add a brand-new
provider, add a new row.

> Please don't use GitHub's in-browser editor for this file: its table preview flags the
> semicolon-delimited format ("Illegal quoting in line 2…"), and the browser editor makes quoting
> mistakes easy. Editing a downloaded copy locally is safer.

**Step 3 — Submit it as a pull request.** Put your edited file back on a new branch and open a pull
request — either with git (commit & push a branch), or on GitHub via **Add file → Upload files** into
`wallet-capabilities/public/` (drop your edited file to replace the current one) and choose
**"Create a new branch… and start a pull request"**. The validation check runs automatically; the
group-leading team reviews and merges, and the site redeploys.

> Not comfortable with this? Use Option 2 — just send us the file.

---

## Option 2 — Fill a template and send it to us

1. Download a template — use whichever you prefer (**we prefer CSV**):
   - CSV: [`templates/wallet_capabilities_template_UPDATES.csv`](templates/wallet_capabilities_template_UPDATES.csv)
   - Excel: [`templates/wallet_capabilities_template_UPDATES.xlsx`](templates/wallet_capabilities_template_UPDATES.xlsx)
2. Fill in **only the fields you want to change** (see the [column rules](#column-rules)). You don't
   have to repeat unchanged values — when we import, a blank cell keeps your current value.
3. Email the file (`.csv` or `.xlsx`) to the **group-leading team**, cc'ing
   **webuild-github-support@grnet.gr**.

We then run it through an import tool that validates your file, shows us a side-by-side diff of
exactly what changes, asks us to confirm, and publishes it. If anything doesn't validate, we'll
come back to you.

---

## Column rules

The file has **15 columns**, in this order. Multiple values in one cell are separated by a
semicolon `;`.

| Column | Rule |
|---|---|
| `nr in Portal` | **Mandatory. Numbers and periods only** (e.g. `29` or `29.1`) — your WeBuild portal number from the Grant Agreement. Please verify it against the GA. |
| `Short name` | Mandatory. |
| `Organizations (Legal Name)` | Mandatory. |
| `Has response ?` | `TRUE`, `FALSE`, or empty. Set `TRUE` when you provide data. |
| `Provide wallets for UCs?` | `Yes` / `No` — whether you intend to provide your wallet to WeBuild use cases. |
| `Kind of wallet` | **Controlled (enforced)** — pick only from the [allowed values](#allowed-values). |
| `Deployment model` | Free text — please reuse a [recommended value](#allowed-values). |
| `Wallet links` | Free text (URL or URLs). |
| `Offline channels` | Free text — please reuse a [recommended value](#allowed-values). |
| `Standards supported` | **Controlled (enforced)** — pick only from the [allowed values](#allowed-values). |
| `Encoding formats` | **Controlled (enforced)** — pick only from the [allowed values](#allowed-values). |
| `Selective disclosure` | Free text — please reuse a [recommended value](#allowed-values). |
| `Other input (wallet)` | Free text, **max 500 characters** (longer is rejected by the check). |
| `Other input (participation)` | Free text, **max 500 characters**. |
| `Previous LSP experience` | Free text, **max 500 characters**. |

## Allowed values

Only **three** columns are strictly enforced by the automated check — a value outside these lists
will cause validation to fail:

| Enforced column | Allowed values (use exactly, `;`-separated for multiple) |
|---|---|
| `Kind of wallet` | `Wallets that can be used by natural persons`<br>`Wallets that can be used by legal persons` |
| `Standards supported` | `ISO/IEC 18013-5:2021`<br>`W3C Verifiable Credentials 1.1` |
| `Encoding formats` | `JSON`<br>`CBOR` |

The following columns are **free text**, but for consistency please reuse these common values where
they apply (other values are accepted, but tell the group-leading team if you need a genuinely new
one so we can keep things aligned):

| Column | Recommended values |
|---|---|
| `Deployment model` | Mobile wallet<br>Server wallet on cloud<br>Server wallet that can be installed on premise<br>Server wallet that can be provided as a service<br>Wallet functionality via API & SDK<br>Multi-device edge wallet (white label) |
| `Offline channels` | BLE<br>NFC<br>QR Code<br>Direct |
| `Selective disclosure` | JWT (including SD-JWT)<br>JSON-LD |

## CSV format notes

If you edit the CSV directly (Option 1) or hand-edit the CSV template, keep to the existing format:

- The file is **semicolon (`;`) delimited**, and multiple values inside one cell are **also**
  separated by `;`.
- A cell that contains a `;`, a comma, a line break, or several URLs must be wrapped in **double
  quotes** — exactly as in the surrounding rows — so the columns don't shift.
- Keep all 15 columns in order; don't remove or reorder them.
- Blank lines between blocks of rows are fine — leave them as they are.

## Known gotcha — Excel and the portal number

If you open the CSV template in Excel and re-save it as CSV, values that look numeric (like a portal
number `29.1`) can be **silently reformatted as dates** (e.g. `29-Jan`) by Excel's autoformat, which
then fails the validation check. If you send a CSV back, please double-check that no cell —
especially `nr in Portal` — has been reformatted this way. (Sending the `.xlsx` avoids this.)

## Questions

Any issues or questions at any step: contact the **group-leading team**.
