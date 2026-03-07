export const CONFIG = {
    csvFile: 'wallet capabilities.csv',
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