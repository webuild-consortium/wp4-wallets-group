import React from 'react';
import { WalletEntry } from '../types/WalletEntry';
import { FilterState } from '../services/FilterService';
import { TypologyBadge } from './shared/TypologyBadge';
import { StandardChip } from './shared/StandardChip';
import { ProviderIdentity } from './shared/ProviderIdentity';
import { FilterControls } from './shared/FilterControls';

interface TableProps {
    entries: WalletEntry[];
    filters: FilterState;
    onSelect: (id: string) => void;
    onFilterChange: (newFilters: FilterState) => void;
    onClear: () => void;
}

export const WalletTable: React.FC<TableProps> = ({ entries, filters, onSelect, onFilterChange, onClear }) => {
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Table Filters</h2>
                </div>
                <FilterControls filters={filters} onFilterChange={onFilterChange} onClear={onClear} layout="horizontal" />
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-200">
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Provider</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Typology</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Infrastructure</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Standards</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {entries.map((entry) => (
                                <tr 
                                    key={entry.id} 
                                    onClick={() => onSelect(entry.id)}
                                    className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                                >
                                    <td className="p-4">
                                        <ProviderIdentity id={entry.id} shortName={entry.shortName} legalName={entry.legalName} />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-2">
                                            <TypologyBadge typology={entry.typologies[0]} variant="compact" />
                                            <TypologyBadge typology={entry.typologies[1]} variant="compact" />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="space-y-1.5">
                                            <div className="flex flex-col gap-0.5">
                                                {entry.deploymentModels.map((model, i) => (
                                                    <div key={i} className="text-[11px] font-medium text-gray-700 leading-tight">
                                                        {model}{i < entry.deploymentModels.length - 1 ? ',' : ''}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {entry.offlineChannels.map(c => (
                                                    <StandardChip key={c} label={c} variant="purple" />
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                            {entry.protocols.map(s => <StandardChip key={s} label={s} variant="indigo" />)}
                                            {entry.encodings.map(s => <StandardChip key={s} label={s} variant="amber" />)}
                                            {entry.disclosure.map(s => <StandardChip key={s} label={s} variant="rose" />)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {entries.length === 0 && (
                    <div className="p-10 text-center text-gray-500 italic">No providers match the criteria.</div>
                )}
            </div>
        </div>
    );
};