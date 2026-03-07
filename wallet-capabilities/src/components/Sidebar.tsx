import React from 'react';
import { CONFIG } from '../config';
import { WalletEntry } from '../types/WalletEntry';
import { FilterState } from '../services/FilterService';

interface SidebarProps {
    entries: WalletEntry[];
    currentIndex: number;
    filters: FilterState;
    onSelect: (index: number) => void;
    onFilterChange: (newFilters: FilterState) => void;
    onClear: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ entries, currentIndex, filters, onSelect, onFilterChange, onClear }) => {
    const handleCheck = (category: keyof FilterState, value: string) => {
        const current = filters[category] as string[];
        const updated = current.includes(value) ? current.filter(i => i !== value) : [...current, value];
        onFilterChange({ ...filters, [category]: updated });
    };

    return (
        <div className="w-full md:w-80 shrink-0 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col sticky top-4 md:h-[calc(100vh-2rem)]">
            <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Filters</h2>
                    <button onClick={onClear} className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">Clear All</button>
                </div>
                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Has Provided Answer</label>
                        <select value={filters.response} onChange={(e) => onFilterChange({ ...filters, response: e.target.value })} className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg p-2">
                            <option value="All">All Entries</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    {[
                        { label: 'Wallet Typology', key: 'typologies', opts: CONFIG.vocabularies.typologies },
                        { label: 'Protocols', key: 'protocols', opts: CONFIG.vocabularies.protocols },
                        { label: 'Encodings', key: 'encodings', opts: CONFIG.vocabularies.encodings }
                    ].map(group => (
                        <div key={group.key}>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">{group.label}</label>
                            <div className="space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar">
                                {group.opts.map(opt => (
                                    <label key={opt} className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input type="checkbox" checked={(filters[group.key as keyof FilterState] as string[]).includes(opt)} onChange={() => handleCheck(group.key as keyof FilterState, opt)} className="mt-0.5 text-blue-600 rounded" />
                                        <span className="break-words">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {entries.length === 0 ? <p className="text-gray-500 text-sm italic p-2">No entries match.</p> : entries.map((entry, idx) => (
                    <div key={idx} onClick={() => onSelect(idx)} className={`cursor-pointer p-3 border rounded-lg transition-all ${idx === currentIndex ? 'bg-blue-50 border-blue-200 text-blue-800 shadow-sm' : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-1"><span className="inline-flex items-center justify-center bg-gray-200 text-gray-600 text-[10px] font-bold h-4 w-4 rounded-sm shrink-0">{entry.id || '-'}</span><div className="text-xs font-semibold text-gray-500 truncate">{entry.legalName}</div></div><div className="text-sm font-bold truncate pl-6">{entry.shortName}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};