export interface CsvRow {
    [key: string]: string;
}

export interface WalletData {
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
}