// Shared wallet-dataset schema + validation rules.
// Used by both scripts/validate-csv.mjs (CI/pre-deploy) and scripts/import-update.mjs.
// The vocabularies here mirror src/config.ts (the app's copy) — keep the two in sync.

export const CONFIG = {
    delimiter: ';',
    headers: {
        id: 'nr in Portal',
        shortName: 'Short name',
        legalName: 'Organizations (Legal Name)',
        hasResponse: 'Has response ?',
        providesWallets: 'Provide wallets for UCs?',
        typology: 'Kind of wallet',
        deployment: 'Deployment model',
        offline: 'Offline channels',
        links: 'Wallet links',
        protocols: 'Standards supported',
        encodings: 'Encoding formats',
        disclosure: 'Selective disclosure',
        otherWallet: 'Other input (wallet)',
        otherParticipation: 'Other input (participation)',
        experience: 'Previous LSP experience'
    },
    vocabularies: {
        typologies: [
            "Wallets that can be used by natural persons",
            "Wallets that can be used by legal persons"
        ],
        protocols: [
            "ISO/IEC 18013-5:2021",
            "W3C Verifiable Credentials 1.1"
        ],
        encodings: [
            "JSON",
            "CBOR"
        ]
    }
};

// Canonical column order — matches the header row of public/wallet capabilities.csv.
export const COLUMN_ORDER = [
    CONFIG.headers.id, CONFIG.headers.shortName, CONFIG.headers.legalName,
    CONFIG.headers.hasResponse, CONFIG.headers.providesWallets, CONFIG.headers.typology,
    CONFIG.headers.deployment, CONFIG.headers.links, CONFIG.headers.offline,
    CONFIG.headers.protocols, CONFIG.headers.encodings, CONFIG.headers.disclosure,
    CONFIG.headers.otherWallet, CONFIG.headers.otherParticipation, CONFIG.headers.experience
];

export const MAX_TEXT_LENGTH = 500;

/** Find the header row index by scanning for mandatory column names (tolerates leading metadata rows). */
export function findHeaderRow(rows) {
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].includes(CONFIG.headers.id) || rows[i].includes(CONFIG.headers.shortName)) {
            return i;
        }
    }
    return -1;
}

/** True for completely empty rows (the blank separator rows between provider blocks). */
export function isEmptyRow(row) {
    return row.length === 0 || row.every(cell => !cell || cell.trim() === '');
}

/**
 * Validate one logical row against the project's rules.
 * @param {(headerName: string) => string} getRaw - returns the raw (untrimmed) cell for a header, '' if absent.
 * @param {string} rowLabel - label used in error messages, e.g. "Row 5".
 * @returns {string[]} error messages (empty array === valid).
 */
export function validateRow(getRaw, rowLabel) {
    const errors = [];

    const id = (getRaw(CONFIG.headers.id) || '').trim();
    const shortName = (getRaw(CONFIG.headers.shortName) || '').trim();
    const legalName = (getRaw(CONFIG.headers.legalName) || '').trim();

    // Mandatory fields
    if (!id || !shortName || !legalName) {
        errors.push(`${rowLabel}: Missing mandatory fields. Required: '${CONFIG.headers.id}', '${CONFIG.headers.shortName}', and '${CONFIG.headers.legalName}'. Found: id="${id}", shortName="${shortName}", legalName="${legalName}"`);
    }

    // ID contains only numbers and period
    if (id && !/^[0-9.]+$/.test(id)) {
        errors.push(`${rowLabel}: '${CONFIG.headers.id}' contains invalid characters (only numbers and period allowed): "${id}"`);
    }

    // Has response ? is TRUE, FALSE, or empty
    const hasResponse = (getRaw(CONFIG.headers.hasResponse) || '').trim();
    if (hasResponse && !['TRUE', 'FALSE'].includes(hasResponse.toUpperCase())) {
        errors.push(`${rowLabel}: '${CONFIG.headers.hasResponse}' must be "TRUE", "FALSE", or empty. Found: "${hasResponse}"`);
    }

    // Controlled vocabularies (the only three columns the pipeline enforces)
    const checkVocabulary = (headerName, vocabulary) => {
        const rawValue = getRaw(headerName);
        if (rawValue) {
            rawValue.split(';').map(item => item.trim()).filter(item => item !== '').forEach(item => {
                if (!vocabulary.includes(item)) {
                    errors.push(`${rowLabel}: '${headerName}' contains unrecognized value: "${item}". Allowed: ${vocabulary.join(', ')}`);
                }
            });
        }
    };
    checkVocabulary(CONFIG.headers.typology, CONFIG.vocabularies.typologies);
    checkVocabulary(CONFIG.headers.protocols, CONFIG.vocabularies.protocols);
    checkVocabulary(CONFIG.headers.encodings, CONFIG.vocabularies.encodings);

    // Max length for the descriptive free-text fields
    const checkMaxLength = (headerName) => {
        const rawValue = getRaw(headerName);
        if (rawValue && rawValue.length > MAX_TEXT_LENGTH) {
            errors.push(`${rowLabel}: '${headerName}' exceeds maximum length of ${MAX_TEXT_LENGTH} characters (current length: ${rawValue.length}).`);
        }
    };
    checkMaxLength(CONFIG.headers.otherWallet);
    checkMaxLength(CONFIG.headers.otherParticipation);
    checkMaxLength(CONFIG.headers.experience);

    return errors;
}
