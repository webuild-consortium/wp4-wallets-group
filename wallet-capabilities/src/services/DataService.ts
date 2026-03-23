import Papa from 'papaparse';
import { CONFIG } from '../config';
import { Wallet } from '../types/Wallet';

export const DataMapper = {
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

    validate(wallet: Wallet): boolean {
        // Core validation logic
        const validTypologies = wallet.typologies.every(t => CONFIG.vocabularies.typologies.includes(t));
        const validProtocols = wallet.protocols.every(p => CONFIG.vocabularies.protocols.includes(p));
        const validEncodings = wallet.encodings.every(e => CONFIG.vocabularies.encodings.includes(e));
        
        return validTypologies && validProtocols && validEncodings;
    }
};

export const DataService = {
    process(results: Papa.ParseResult<string[]>): Wallet[] {
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
        const parsedData: Wallet[] = [];

        for(let i = headerIndex + 1; i < rows.length; i++) {
            if (rows[i].length <= 1 && !rows[i][0]) continue;
            
            const rawObj: Record<string, string> = {};
            headers.forEach((header, index) => rawObj[header] = rows[i][index] || "");
            
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