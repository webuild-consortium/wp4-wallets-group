import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { CONFIG } from '../config';
import { WalletEntry } from '../types/WalletEntry';
import { DataService } from '../services/DataService';
import { FilterService, FilterState } from '../services/FilterService';
import { Sidebar } from './Sidebar';
import { WalletCard } from './WalletCard';
import { Modal } from './Modal';

function App() {
  const [data, setData] = useState<WalletEntry[]>([]);
  const [filteredData, setFilteredData] = useState<WalletEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({ response: 'All', typologies: [], protocols: [], encodings: [] });
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
            setFilteredData(processed);
            setLoading(false);
          }
        });
      })
      .catch(() => setLoading(false)); // Handle manual upload UI here if needed
  }, []);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setFilteredData(FilterService.apply(data, newFilters));
    setCurrentIndex(0);
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
        }
      });
    }
  };

  if (loading && data.length === 0) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="text-center"><p className="mb-4">Loading...</p><input type="file" accept=".csv" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/></div></div>;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 relative bg-gray-100">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 items-start">
        <Sidebar entries={filteredData} currentIndex={currentIndex} filters={filters} onSelect={setCurrentIndex} onFilterChange={handleFilterChange} onClear={() => handleFilterChange({ response: 'All', typologies: [], protocols: [], encodings: [] })} />
        <WalletCard entry={filteredData[currentIndex]} index={currentIndex} total={filteredData.length} onNavigate={(dir) => setCurrentIndex(prev => prev + dir)} onOpenModal={(title, content) => setModal({ isOpen: true, title, content })} />
      </div>
      <Modal isOpen={modal.isOpen} title={modal.title} content={modal.content} onClose={() => setModal({ ...modal, isOpen: false })} />
    </div>
  );
}

export default App;