import React from 'react';
import { useWallet } from '../../context/WalletContext';
import { FilterControls } from '../../ui/FilterControls';

export const Sidebar: React.FC = () => {
    const { 
        filteredData, currentIndex, filters, 
        setCurrentIndex, handleFilterChange, handleBackToAll 
    } = useWallet();

    return (
        <div className="w-full md:w-80 shrink-0 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col sticky top-4 md:h-[calc(100vh-2rem)] overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-slate-50/50">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Filters</h2>
                    <button onClick={handleBackToAll} className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">Clear All</button>
                </div>
                <FilterControls 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClear={handleBackToAll} 
                    layout="vertical" 
                />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {filteredData.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-gray-400 text-sm italic">No entries match your filters.</p>
                    </div>
                ) : (
                    filteredData.map((entry, idx) => (
                        <div 
                            key={entry.id} 
                            onClick={() => setCurrentIndex(idx)} 
                            className={`cursor-pointer p-3 border rounded-lg transition-all ${idx === currentIndex ? 'bg-blue-50 border-blue-200 text-blue-800 shadow-sm' : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center justify-center bg-gray-200 text-gray-600 text-[10px] font-bold h-4 w-4 rounded-sm shrink-0">{entry.id || '-'}</span>
                                <div className="text-xs font-semibold text-gray-500 truncate">{entry.legalName}</div>
                            </div>
                            <div className="text-sm font-bold truncate pl-6">{entry.shortName}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};