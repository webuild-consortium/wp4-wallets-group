import Papa from 'papaparse';
import { CONFIG } from '../config';
import { Wallet } from '../types/Wallet';

export const DataMapper = {
    /** Maps a raw CSV record (string key-value pairs) to a typed Wallet domain object. */
    toDomain(raw: Record<string, string>): Wallet {
        const _get = (key: string) => raw[key] || '';
        const _asBool = (key: string) => /true|yes/i.test(String(_get(key)));
        const _asArray = (key: string) => {
            const val = _get(key);
            return val ? val.split(';').map(s => s.trim()).filter(Boolean) : [];
        };
        const _extractUrls = (text: string) => {
            if (!text) return [];
            return (text.match(/(https?:\/\/[^\s]+)/g) || []);
        };

        return {
            id: _get(CONFIG.headers.id),
            shortName: _get(CONFIG.headers.shortName) || 'Unknown Organization',
            legalName: _get(CONFIG.headers.legalName) || 'Name not provided',
            hasResponse: _asBool(CONFIG.headers.hasResponse),
            providesWallets: _asBool(CONFIG.headers.providesWallets),
            typologies: _asArray(CONFIG.headers.typology),
            protocols: _asArray(CONFIG.headers.protocols),
            encodings: _asArray(CONFIG.headers.encodings),
            deploymentModels: _asArray(CONFIG.headers.deployment),
            offlineChannels: _asArray(CONFIG.headers.offline),
            disclosure: _asArray(CONFIG.headers.disclosure),
            links: _extractUrls(_get(CONFIG.headers.links)),
            otherWallet: _get(CONFIG.headers.otherWallet),
            otherParticipation: _get(CONFIG.headers.otherParticipation),
            experience: _get(CONFIG.headers.experience)
        };
    },

    /** Validates that the wallet's attributes match the project's allowed vocabularies. */
    validate(wallet: Wallet): boolean {
        // Core validation logic
        const validTypologies = wallet.typologies.every(t => CONFIG.vocabularies.typologies.includes(t));
        const validProtocols = wallet.protocols.every(p => CONFIG.vocabularies.protocols.includes(p));
        const validEncodings = wallet.encodings.every(e => CONFIG.vocabularies.encodings.includes(e));
        
        return validTypologies && validProtocols && validEncodings;
    }
};

export const DataService = {
    /** Truncates text to a maximum length and adds an ellipsis. */
    truncate(text: string, max: number): string {
        if (!text || text.length <= max) return text;
        return text.substring(0, max).trim() + '...';
    },

    /**
     * Processes raw CSV data into an array of Wallet domain objects.
     * 
     * CURRENT BEHAVIOR:
     * 1. Header Discovery: Instead of assuming the first row is the header, it scans all rows
     *    looking for mandatory keywords ("nr in Portal" or "Short name"). This allows the 
     *    CSV to have metadata or titles at the top (e.g., the "BEN (T4.7)" row).
     * 2. Exception Handling: If no valid header row is found after scanning the entire file, 
     *    it throws an Error, which should be caught by the caller (e.g., WalletContext).
     * 3. Row Mapping: Once the header index is found, it processes all subsequent rows.
     * 4. Validation: Each mapped object is validated against the application's vocabularies 
     *    before being added to the final dataset.
     */
    process(results: Papa.ParseResult<string[]>): Wallet[] {
        const rows = results.data;
        let headerIndex = -1;

        // Define which columns should be truncated during the read process
        const truncateLimits: Record<string, number> = {
            [CONFIG.headers.otherWallet]: 500,
            [CONFIG.headers.otherParticipation]: 500,
            [CONFIG.headers.experience]: 500
        };

        // Search for the header row by checking for mandatory column names.
        // This effectively skips any leading title or metadata rows.
        for(let i=0; i < rows.length; i++) {
            if(rows[i].includes(CONFIG.headers.id) || rows[i].includes(CONFIG.headers.shortName)) {
                headerIndex = i;
                break;
            }
        }

        if (headerIndex === -1) throw new Error("Could not identify header row");

        const headers = rows[headerIndex].map(h => h.trim());
        const parsedData: Wallet[] = [];

        // Start processing from the row immediately after the header.
        for(let i = headerIndex + 1; i < rows.length; i++) {
            // Skip empty or malformed rows
            if (rows[i].length <= 1 && !rows[i][0]) continue;
            
            const rawObj: Record<string, string> = {};
            headers.forEach((header, index) => {
                let val = rows[i][index] || "";
                // Apply truncation if the header is in our limits map
                if (truncateLimits[header]) {
                    val = this.truncate(val, truncateLimits[header]);
                }
                rawObj[header] = val;
            });
            
            // Map the raw CSV record to the Wallet domain model if it has a basic identity
            if(rawObj[CONFIG.headers.id] || rawObj[CONFIG.headers.shortName]) {
                const wallet = DataMapper.toDomain(rawObj);
                if (DataMapper.validate(wallet)) {
                    parsedData.push(wallet);
                } else {
                    console.warn(`Skipping invalid wallet entry: ${wallet.shortName}`);
                }
            }
        }
        return parsedData;
    }
};