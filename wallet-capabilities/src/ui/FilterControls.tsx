import React from 'react';
import { CONFIG } from '../config';
import { FilterState } from '../services/FilterService';

interface FilterControlsProps {
    filters: FilterState;
    onFilterChange: (newFilters: FilterState) => void;
    onClear: () => void;
    layout?: 'vertical' | 'horizontal';
}

export const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange, onClear, layout = 'vertical' }) => {
    const handleCheck = (category: keyof FilterState, value: string) => {
        const current = filters[category] as string[];
        const updated = current.includes(value) ? current.filter(i => i !== value) : [...current, value];
        onFilterChange({ ...filters, [category]: updated });
    };

    const containerClass = layout === 'horizontal' 
        ? "flex flex-wrap items-end gap-6" 
        : "space-y-5";

    const itemClass = layout === 'horizontal'
        ? "flex-1 min-w-[200px]"
        : "";

    return (
        <div className={containerClass}>
            <div className={itemClass}>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Has Provided Answer</label>
                <select 
                    value={filters.response} 
                    onChange={(e) => onFilterChange({ ...filters, response: e.target.value })} 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
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
                <div key={group.key} className={itemClass}>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">{group.label}</label>
                    <div className={`space-y-1.5 overflow-y-auto custom-scrollbar ${layout === 'horizontal' ? 'max-h-24 bg-gray-50 p-2 rounded-lg border border-gray-100' : 'max-h-32'}`}>
                        {group.opts.map((opt: string) => (
                            <label key={opt} className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
                                <input 
                                    type="checkbox" 
                                    checked={(filters[group.key as keyof FilterState] as string[]).includes(opt)} 
                                    onChange={() => handleCheck(group.key as keyof FilterState, opt)} 
                                    className="mt-0.5 text-blue-600 rounded focus:ring-blue-500" 
                                />
                                <span className="break-words leading-tight">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            {layout === 'horizontal' && (
                <div className="pb-1">
                    <button onClick={onClear} className="px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100 uppercase tracking-wide">
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
};