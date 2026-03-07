import { CONFIG } from '../config';
import { CsvRow, WalletData } from '../index';

export class WalletEntry implements WalletData {
    id: string;
    shortName: string;
    legalName: string;
    hasResponse: boolean;
    providesWallets: boolean;
    typologies: string[];
    protocols: string[];
    encodings: string[];
    deploymentModels: string[];
    offlineChannels: string[];
    disclosure: string[];
    links: string[];
    otherWallet: string;
    otherParticipation: string;
    experience: string;
    raw: CsvRow;

    constructor(csvRow: CsvRow) {
        this.raw = csvRow;
        this.id = this._get(CONFIG.headers.id);
        this.shortName = this._get(CONFIG.headers.shortName) || 'Unknown Organization';
        this.legalName = this._get(CONFIG.headers.legalName) || 'Name not provided';
        
        this.hasResponse = this._asBool(CONFIG.headers.hasResponse);
        this.providesWallets = this._asBool(CONFIG.headers.providesWallets);
        
        this.typologies = this._asArray(CONFIG.headers.typology);
        this.protocols = this._asArray(CONFIG.headers.protocols);
        this.encodings = this._asArray(CONFIG.headers.encodings);
        this.deploymentModels = this._asArray(CONFIG.headers.deployment);
        this.offlineChannels = this._asArray(CONFIG.headers.offline);
        this.disclosure = this._asArray(CONFIG.headers.disclosure);
        
        this.links = this._extractUrls(this._get(CONFIG.headers.links));
        
        this.otherWallet = this._get(CONFIG.headers.otherWallet);
        this.otherParticipation = this._get(CONFIG.headers.otherParticipation);
        this.experience = this._get(CONFIG.headers.experience);
    }

    private _get(key: string): string { return this.raw[key] || ''; }
    
    private _asBool(key: string): boolean { return /true|yes/i.test(String(this._get(key))); }
    
    private _asArray(key: string): string[] { 
        const val = this._get(key);
        return val ? val.split(';').map(s => s.trim()).filter(Boolean) : [];
    }

    private _extractUrls(text: string): string[] {
        if (!text) return [];
        return (text.match(/(https?:\/\/[^\s]+)/g) || []);
    }

    validate(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];
        this.typologies.forEach(t => !CONFIG.vocabularies.typologies.includes(t) && errors.push(`Unknown Typology: ${t}`));
        this.protocols.forEach(p => !CONFIG.vocabularies.protocols.includes(p) && errors.push(`Unknown Protocol: ${p}`));
        this.encodings.forEach(e => !CONFIG.vocabularies.encodings.includes(e) && errors.push(`Unknown Encoding: ${e}`));
        return { valid: errors.length === 0, errors };
    }
}