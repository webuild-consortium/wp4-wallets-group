import React from 'react';
import Papa from 'papaparse';
import { DataService } from '../services/DataService';
import { CONFIG } from '../config';
import { useWallet } from '../context/WalletContext';
import { Sidebar } from '../features/dashboard/Sidebar';
import { WalletCard } from '../features/dashboard/WalletCard';
import { WalletTable } from '../features/table/WalletTable';
import { Modal } from './Modal';

function App() {
  const { 
    data, filteredData, currentIndex, loading, searchId, modal,
    setData, setCurrentIndex, setActiveView, setModal, 
    handleBackToAll, handleShare, activeView 
  } = useWallet();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      Papa.parse(e.target.files[0], {
        delimiter: CONFIG.delimiter,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<string[]>) => {
          const processed = DataService.process(results);
          setData(processed);
        }
      });
    }
  };

  if (loading && data.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="mb-4">Loading...</p>
        <input type="file" accept=".csv" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
      </div>
    </div>
  );

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
          <Sidebar />
        )}
        
        {!searchId && activeView === 'table' ? (
          <WalletTable />
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