import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Papa from 'papaparse';
import { CONFIG } from '../config';
import { Wallet } from '../types/Wallet';
import { DataService } from '../services/DataService';
import { FilterService, FilterState } from '../services/FilterService';

interface WalletContextType {
    data: Wallet[];
    filteredData: Wallet[];
    currentIndex: number;
    filters: FilterState;
    loading: boolean;
    activeView: 'dashboard' | 'table';
    searchId: string | null;
    modal: { isOpen: boolean; title: string; content: string };
    setData: (data: Wallet[]) => void;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setFilters: (filters: FilterState) => void;
    setActiveView: (view: 'dashboard' | 'table') => void;
    setSearchId: (id: string | null) => void;
    setModal: React.Dispatch<React.SetStateAction<{ isOpen: boolean; title: string; content: string }>>;
    handleFilterChange: (newFilters: FilterState) => void;
    handleBackToAll: () => void;
    handleSelectProvider: (id: string) => void;
    handleShare: (id: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<Wallet[]>([]);
    const [filteredData, setFilteredData] = useState<Wallet[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({ response: 'Yes', typologies: [], protocols: [], encodings: [] });
    const [activeView, setActiveView] = useState<'dashboard' | 'table'>('dashboard');
    const [searchId, setSearchId] = useState<string | null>(new URLSearchParams(window.location.search).get('id'));
    const [modal, setModal] = useState({ isOpen: false, title: '', content: '' });

    useEffect(() => {
        fetch(CONFIG.csvFile)
            .then(res => { if (!res.ok) throw new Error('Failed'); return res.text(); })
            .then(text => {
                Papa.parse(text, {
                    delimiter: CONFIG.delimiter,
                    skipEmptyLines: true,
                    complete: (results: Papa.ParseResult<string[]>) => {
                        const processed = DataService.process(results);
                        setData(processed);
                        
                        if (searchId) {
                            const entry = processed.find(e => e.id === searchId);
                            if (entry) {
                                setFilteredData([entry]);
                            } else {
                                setFilteredData(FilterService.apply(processed, filters));
                                setSearchId(null);
                            }
                        } else {
                            setFilteredData(FilterService.apply(processed, filters));
                        }
                        setLoading(false);
                    }
                });
            })
            .catch(() => setLoading(false));
    }, []);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        setFilteredData(FilterService.apply(data, newFilters));
        setCurrentIndex(0);
        if (searchId) {
            window.history.pushState({}, '', import.meta.env.BASE_URL);
            setSearchId(null);
        }
    };

    const handleBackToAll = () => {
        window.history.pushState({}, '', import.meta.env.BASE_URL);
        setSearchId(null);
        const defaultFilters: FilterState = { response: 'Yes', typologies: [], protocols: [], encodings: [] };
        setFilters(defaultFilters);
        setFilteredData(FilterService.apply(data, defaultFilters));
        setCurrentIndex(0);
    };

    const handleSelectProvider = (id: string) => {
        const entry = data.find(e => e.id === id);
        if (entry) {
            setSearchId(id);
            setFilteredData([entry]);
            setCurrentIndex(0);
            const url = new URL(window.location.origin + import.meta.env.BASE_URL);
            url.searchParams.set('id', id);
            window.history.pushState({}, '', url.toString());
        }
    };

    const handleShare = (id: string) => {
        const baseUrl = window.location.origin + import.meta.env.BASE_URL;
        const url = new URL(baseUrl);
        url.searchParams.set('id', id);
        navigator.clipboard.writeText(url.toString());
        alert('Link copied to clipboard!');
    };

    return (
        <WalletContext.Provider value={{
            data, filteredData, currentIndex, filters, loading, activeView, searchId, modal,
            setData, setCurrentIndex, setFilters, setActiveView, setSearchId, setModal,
            handleFilterChange, handleBackToAll, handleSelectProvider, handleShare
        }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) throw new Error('useWallet must be used within a WalletProvider');
    return context;
};