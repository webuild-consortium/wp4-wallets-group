import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

// Duplicated from src/config.ts for validation purposes
const CONFIG = {
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
    let headerIndex = -1;

    for(let i=0; i < rows.length; i++) {
        if(rows[i].includes(CONFIG.headers.id) || rows[i].includes(CONFIG.headers.shortName)) {
            headerIndex = i;
            break;
        }
    }

    if (headerIndex === -1) {
        throw new Error("Could not identify header row. Make sure it contains 'nr in Portal' or 'Short name'.");
    }

    const headers = rows[headerIndex].map(h => h?.trim());
    
    const getIndex = (headerName) => headers.indexOf(headerName);
    
    const indices = {
        id: getIndex(CONFIG.headers.id),
        shortName: getIndex(CONFIG.headers.shortName),
        legalName: getIndex(CONFIG.headers.legalName),
        hasResponse: getIndex(CONFIG.headers.hasResponse),
        typology: getIndex(CONFIG.headers.typology),
        protocols: getIndex(CONFIG.headers.protocols),
        encodings: getIndex(CONFIG.headers.encodings)
    };

    let entryCount = 0;
    const errors = [];

    for(let i = headerIndex + 1; i < rows.length; i++) {
        const row = rows[i];
        
        // Skip completely empty rows
        if (row.length === 0 || row.every(cell => !cell || cell.trim() === '')) {
            continue;
        }

        const rowNum = i + 1; // 1-based index for logging

        const id = indices.id !== -1 ? row[indices.id]?.trim() : '';
        const shortName = indices.shortName !== -1 ? row[indices.shortName]?.trim() : '';
        const legalName = indices.legalName !== -1 ? row[indices.legalName]?.trim() : '';

        // Check 4: Mandatory fields
        if (!id || !shortName || !legalName) {
            errors.push(`Row ${rowNum}: Missing mandatory fields. Required: '${CONFIG.headers.id}', '${CONFIG.headers.shortName}', and '${CONFIG.headers.legalName}'. Found: id="${id}", shortName="${shortName}", legalName="${legalName}"`);
        }

        // Check 1: ID contains only numbers and period
        if (id && !/^[0-9.]+$/.test(id)) {
            errors.push(`Row ${rowNum}: '${CONFIG.headers.id}' contains invalid characters (only numbers and period allowed): "${id}"`);
        }

        // Check 3: Has response ? is TRUE, FALSE, or empty
        const hasResponse = indices.hasResponse !== -1 ? row[indices.hasResponse]?.trim() : '';
        if (hasResponse && !['TRUE', 'FALSE'].includes(hasResponse.toUpperCase())) {
            errors.push(`Row ${rowNum}: '${CONFIG.headers.hasResponse}' must be "TRUE", "FALSE", or empty. Found: "${hasResponse}"`);
        }

        // Check 2: Validating Vocabularies
        const checkVocabulary = (fieldIndex, fieldName, vocabulary) => {
            if (fieldIndex !== -1) {
                const rawValue = row[fieldIndex];
                if (rawValue) {
                    const items = rawValue.split(';').map(item => item.trim()).filter(item => item !== '');
                    items.forEach(item => {
                        if (!vocabulary.includes(item)) {
                            errors.push(`Row ${rowNum}: '${fieldName}' contains unrecognized value: "${item}". Allowed: ${vocabulary.join(', ')}`);
                        }
                    });
                }
            }
        };

        checkVocabulary(indices.typology, CONFIG.headers.typology, CONFIG.vocabularies.typologies);
        checkVocabulary(indices.protocols, CONFIG.headers.protocols, CONFIG.vocabularies.protocols);
        checkVocabulary(indices.encodings, CONFIG.headers.encodings, CONFIG.vocabularies.encodings);

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
