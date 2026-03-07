import Papa from 'papaparse';
import { CONFIG } from '../config';
import { WalletEntry } from '../types/WalletEntry';

export const DataService = {
    process(results: Papa.ParseResult<string[]>): WalletEntry[] {
        const rows = results.data;
        let headerIndex = -1;

        for(let i=0; i < rows.length; i++) {
            if(rows[i].includes(CONFIG.headers.id) || rows[i].includes(CONFIG.headers.shortName)) {
                headerIndex = i;
                break;
            }
        }

        if (headerIndex === -1) throw new Error("Could not identify header row");

        const headers = rows[headerIndex].map(h => h.trim());
        const parsedData: WalletEntry[] = [];

        for(let i = headerIndex + 1; i < rows.length; i++) {
            if (rows[i].length <= 1 && !rows[i][0]) continue;
            
            const rawObj: Record<string, string> = {};
            headers.forEach((header, index) => rawObj[header] = rows[i][index] || "");
            
            if(rawObj[CONFIG.headers.id] || rawObj[CONFIG.headers.shortName]) {
                const entry = new WalletEntry(rawObj);
                if (entry.validate().valid) parsedData.push(entry);
            }
        }
        return parsedData;
    }
};