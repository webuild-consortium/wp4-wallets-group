
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

// Duplicated from src/config.ts for validation purposes
const CONFIG = {
    delimiter: ';',
    headers: {
        id: 'nr in Portal',
        shortName: 'Short name',
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
        header: false, // We will find headers manually
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

    const headers = rows[headerIndex].map(h => h.trim());
    const idIndex = headers.indexOf(CONFIG.headers.id);
    const shortNameIndex = headers.indexOf(CONFIG.headers.shortName);

    let entryCount = 0;
    for(let i = headerIndex + 1; i < rows.length; i++) {
        if (rows[i].length > 1 && (rows[i][idIndex] || rows[i][shortNameIndex])) {
            entryCount++;
        }
    }

    if (entryCount > 0) {
        console.log(`CSV file is valid. Found ${entryCount} wallet entries.`);
        process.exit(0);
    } else {
        throw new Error('No wallet entries found after processing.');
    }

} catch (error) {
    console.error('CSV validation failed:', error.message);
    process.exit(1);
}
