import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { CONFIG } from '../config';
import { WalletEntry } from '../types/WalletEntry';
import { DataService } from '../services/DataService';
import { FilterService, FilterState } from '../services/FilterService';
import { Sidebar } from './Sidebar';
import { WalletCard } from './WalletCard';
import { WalletTable } from './WalletTable';
import { Modal } from './Modal';

function App() {
  const [data, setData] = useState<WalletEntry[]>([]);
  const [filteredData, setFilteredData] = useState<WalletEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({ response: 'Yes', typologies: [], protocols: [], encodings: [] });
  const [modal, setModal] = useState({ isOpen: false, title: '', content: '' });
  const [searchId, setSearchId] = useState<string | null>(new URLSearchParams(window.location.search).get('id'));
  const [activeView, setActiveView] = useState<'dashboard' | 'table'>('dashboard');

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLoading(true);
      Papa.parse(e.target.files[0], {
        delimiter: CONFIG.delimiter,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<string[]>) => {
          const processed = DataService.process(results);
          setData(processed);
          setFilteredData(processed);
          setLoading(false);
          setSearchId(null);
        }
      });
    }
  };

  if (loading && data.length === 0) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="text-center"><p className="mb-4">Loading...</p><input type="file" accept=".csv" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/></div></div>;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 relative bg-gray-100">
      <div className="w-full max-w-7xl flex justify-between items-center mb-6">
        {searchId ? (
          <button 
            onClick={handleBackToAll}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Wallet Providers
          </button>
        ) : (
          <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            <button 
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${activeView === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveView('table')}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${activeView === 'table' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Table View
            </button>
          </div>
        )}
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden sm:block">
          WP4 Wallet Providers Group
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 items-start">
        {!searchId && activeView === 'dashboard' && (
          <Sidebar 
            entries={filteredData} 
            currentIndex={currentIndex} 
            filters={filters} 
            onSelect={setCurrentIndex} 
            onFilterChange={handleFilterChange} 
            onClear={() => handleFilterChange({ response: 'All', typologies: [], protocols: [], encodings: [] })} 
          />
        )}
        
        {!searchId && activeView === 'table' ? (
          <WalletTable 
            entries={FilterService.getQualifiedProviders(filteredData)} 
            filters={filters}
            onSelect={handleSelectProvider} 
            onFilterChange={handleFilterChange}
            onClear={() => handleFilterChange({ response: 'Yes', typologies: [], protocols: [], encodings: [] })}
          />
        ) : (
          <WalletCard 
            entry={filteredData[currentIndex]} 
            index={currentIndex} 
            total={filteredData.length} 
            onNavigate={(dir) => setCurrentIndex(prev => prev + dir)} 
            onOpenModal={(title, content) => setModal({ isOpen: true, title, content })} 
            onShare={handleShare}
          />
        )}
      </div>
      <Modal isOpen={modal.isOpen} title={modal.title} content={modal.content} onClose={() => setModal({ ...modal, isOpen: false })} />
    </div>
  );
}

export default App;