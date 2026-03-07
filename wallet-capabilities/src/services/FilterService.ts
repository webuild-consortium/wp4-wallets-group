import { WalletEntry } from '../types/WalletEntry';

export interface FilterState {
    response: string;
    typologies: string[];
    protocols: string[];
    encodings: string[];
}

export const FilterService = {
    apply(dataset: WalletEntry[], filters: FilterState): WalletEntry[] {
        return dataset.filter(entry => {
            let match = true;

            if (filters.response !== 'All') {
                if (filters.response === 'Yes' && !entry.hasResponse) match = false;
                if (filters.response === 'No' && entry.hasResponse) match = false;
            }

            if (filters.typologies.length > 0 && match) {
                if (!filters.typologies.every(val => entry.typologies.includes(val))) match = false;
            }

            if (filters.protocols.length > 0 && match) {
                if (!filters.protocols.every(val => entry.protocols.includes(val))) match = false;
            }

            if (filters.encodings.length > 0 && match) {
                if (!filters.encodings.every(val => entry.encodings.includes(val))) match = false;
            }
            return match;
        });
    }
};