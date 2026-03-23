import React from 'react';

interface ProviderIdentityProps {
    id: string;
    shortName: string;
    legalName: string;
    size?: 'sm' | 'lg';
}

export const ProviderIdentity: React.FC<ProviderIdentityProps> = ({ id, shortName, legalName, size = 'sm' }) => {
    if (size === 'lg') {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white font-bold rounded-lg text-xl shadow-sm shrink-0">
                    {id || '-'}
                </div>
                <div className="min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">{shortName}</h1>
                    <h2 className="text-sm font-medium text-gray-500 truncate">{legalName}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-700 font-bold h-8 w-8 rounded text-sm shrink-0 shadow-sm border border-blue-200">
                {id || '-'}
            </span>
            <div className="min-w-0">
                <div className="font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                    {shortName}
                </div>
                <div className="text-xs text-gray-500 truncate">{legalName}</div>
            </div>
        </div>
    );
};