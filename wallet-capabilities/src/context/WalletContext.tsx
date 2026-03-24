import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
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
    
    // Read initial state from URL
    const getInitialParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            view: (params.get('view') === 'table' ? 'table' : 'dashboard') as 'dashboard' | 'table',
            id: params.get('id')
        };
    };

    const initialParams = getInitialParams();
    const [activeView, setActiveView] = useState<'dashboard' | 'table'>(initialParams.view);
    const [searchId, setSearchId] = useState<string | null>(initialParams.id);
    const [modal, setModal] = useState({ isOpen: false, title: '', content: '' });

    // Internal helper to update URL and state
    const navigate = useCallback((view: 'dashboard' | 'table', id: string | null = null) => {
        const url = new URL(window.location.origin + import.meta.env.BASE_URL);
        
        if (view === 'table') {
            url.searchParams.set('view', 'table');
        } 

        if (id) {
            url.searchParams.set('id', id);
        }

        window.history.pushState({}, '', url.toString());
        setActiveView(view);
        setSearchId(id);
    }, []);

    // Sync state with browser navigation (Back/Forward)
    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            setActiveView(params.get('view') === 'table' ? 'table' : 'dashboard');
            setSearchId(params.get('id'));
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Initial Data Load
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
                        setLoading(false);
                    }
                });
            })
            .catch(() => setLoading(false));
    }, []);

    // Derived filtering logic
    useEffect(() => {
        if (!data.length) return;

        if (searchId) {
            const entry = data.find(e => e.id === searchId);
            if (entry) {
                setFilteredData([entry]);
                setCurrentIndex(0);
            } else {
                setFilteredData(FilterService.apply(data, filters));
                setSearchId(null);
            }
        } else {
            setFilteredData(FilterService.apply(data, filters));
        }
    }, [data, filters, searchId]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        if (searchId) {
            navigate(activeView, null); // Clear ID but stay in current view
        }
    };

    const handleBackToAll = () => {
        const defaultFilters: FilterState = { response: 'Yes', typologies: [], protocols: [], encodings: [] };
        setFilters(defaultFilters);
        navigate(activeView, null);
        setCurrentIndex(0);
    };

    const handleSelectProvider = (id: string) => {
        navigate('dashboard', id);
    };

    const handleSetActiveView = (view: 'dashboard' | 'table') => {
        navigate(view, null); // Switching views clears the specific ID selection
    };

    const handleShare = (id: string) => {
        const url = new URL(window.location.origin + import.meta.env.BASE_URL);
        url.searchParams.set('id', id);
        navigator.clipboard.writeText(url.toString());
        alert('Link copied to clipboard!');
    };

    return (
        <WalletContext.Provider value={{
            data, filteredData, currentIndex, filters, loading, activeView, searchId, modal,
            setData, setCurrentIndex, setFilters, 
            setActiveView: handleSetActiveView, 
            setSearchId, setModal,
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