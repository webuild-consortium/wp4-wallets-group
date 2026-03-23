import React from 'react';
import { CONFIG } from '../../config';

interface TypologyBadgeProps {
    typology: string;
    variant?: 'full' | 'compact';
}

export const TypologyBadge: React.FC<TypologyBadgeProps> = ({ typology, variant = 'compact' }) => {
    const isNP = typology === CONFIG.vocabularies.typologies[0];
    const isBW = typology === CONFIG.vocabularies.typologies[1];

    if (!isNP && !isBW) return null;

    const baseClasses = "inline-flex items-center gap-1.5 font-bold border shadow-sm transition-all";
    const npClasses = `${baseClasses} bg-blue-50 text-blue-700 border-blue-100`;
    const bwClasses = `${baseClasses} bg-indigo-50 text-indigo-700 border-indigo-100`;

    if (variant === 'compact') {
        return isNP ? (
            <span className={`px-2 py-1 rounded-md text-[10px] ${npClasses}`} title="Natural Person Wallet">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                NP-Wallet
            </span>
        ) : (
            <span className={`px-2 py-1 rounded-md text-[10px] ${bwClasses}`} title="Business Wallet">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                BW
            </span>
        );
    }

    // Full variant for WalletCard
    return (
        <li className={`flex items-center gap-3 ${isNP || isBW ? 'text-blue-700' : 'text-gray-400'}`}>
            <div className={`p-2 rounded-md ${isNP || isBW ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                {isNP ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                )}
            </div>
            <span className="font-medium text-sm">{isNP ? 'Natural Persons' : 'Legal Persons'}</span>
        </li>
    );
};