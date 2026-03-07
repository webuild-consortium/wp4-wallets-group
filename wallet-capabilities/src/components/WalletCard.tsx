import React, { useState, useEffect, useRef } from 'react';
import { WalletEntry } from '../types/WalletEntry';
import { CONFIG } from '../config';

interface CardProps {
    entry: WalletEntry | null;
    index: number;
    total: number;
    onNavigate: (dir: number) => void;
    onOpenModal: (title: string, content: string) => void;
}

export const WalletCard: React.FC<CardProps> = ({ entry, index, total, onNavigate, onOpenModal }) => {
    if (!entry) return <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full flex-1 flex items-center justify-center p-10"><h3 className="text-xl font-bold text-gray-800">No Entries Found</h3></div>;

    const TextTruncate = ({ title, text }: { title: string, text: string }) => {
        const [isOverflowing, setIsOverflowing] = useState(false);
        const ref = useRef<HTMLParagraphElement>(null);
        useEffect(() => { if (ref.current) setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight); }, [text]);
        return (
            <div onClick={() => isOverflowing && onOpenModal(title, text)} className={isOverflowing ? 'cursor-pointer group' : ''}>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">{title}</h4>
                <p ref={ref} className={`text-sm text-gray-600 line-clamp-2 ${isOverflowing ? 'group-hover:text-blue-600' : ''} ${!text ? 'italic text-gray-400' : ''}`}>
                    {text || 'Not specified'}
                </p>
                {isOverflowing && <span className="text-xs text-blue-500 italic group-hover:text-blue-600">(Click to view full)</span>}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full flex-1 overflow-hidden flex flex-col relative min-h-[500px]">
            <div className="bg-slate-50 border-b border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-20 relative">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white font-bold rounded-lg text-xl shadow-sm shrink-0">{entry.id || '-'}</div>
                    <div className="min-w-0"><h1 className="text-2xl font-bold text-gray-900 truncate">{entry.shortName}</h1><h2 className="text-sm font-medium text-gray-500 truncate">{entry.legalName}</h2></div>
                </div>
                <div className="flex flex-col sm:items-end gap-2 text-sm font-medium shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${entry.hasResponse ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>Has Response</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${entry.providesWallets ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>Provides Wallets</span>
                </div>
            </div>

            <div className="relative flex-1 bg-white">
                {!entry.hasResponse && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50/60 backdrop-blur-[2px]">
                        <div className="transform -rotate-12 border-4 border-gray-400/30 rounded-xl p-8 bg-white/70 shadow-sm backdrop-blur-md"><span className="text-4xl font-extrabold text-gray-400 tracking-widest uppercase text-center">No Response<br/>Provided</span></div>
                    </div>
                )}
                <div className={`p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${!entry.hasResponse ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Wallet Typology</h3>
                        <ul className="space-y-3">
                            {[0, 1].map(i => {
                                const isActive = entry.typologies.includes(CONFIG.vocabularies.typologies[i]);
                                return (
                                    <li key={i} className={`flex items-center gap-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`}>
                                        <div className={`p-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
                                        <span className={`font-medium text-sm ${!isActive && 'line-through decoration-gray-300'}`}>{i === 0 ? 'Natural Persons' : 'Legal Persons'}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Infrastructure</h3>
                        <div className="flex items-start gap-2 mb-3 text-gray-700"><div className="p-2 bg-purple-50 text-purple-600 rounded-md shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg></div><span className="font-medium text-sm pt-1">{entry.deploymentModels.join(', ') || 'Not specified'}</span></div>
                        <div><span className="text-xs text-gray-500 mb-2 block">Offline Channels:</span><div className="flex flex-wrap gap-2">{entry.offlineChannels.length ? entry.offlineChannels.map(c => <span key={c} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border">{c}</span>) : <span className="text-sm text-gray-400 italic">None</span>}</div></div>
                        <div className="pt-2 border-t border-gray-100"><span className="text-xs text-gray-500 mb-2 block">Links:</span><div className="flex flex-col gap-2">{entry.links.length ? entry.links.map(l => <a key={l} href={l} target="_blank" className="text-sm font-medium text-blue-600 hover:text-blue-800 truncate">{l}</a>) : <span className="text-sm text-gray-400 italic">None</span>}</div></div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Standards</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Protocols', items: entry.protocols, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
                                { label: 'Encodings', items: entry.encodings, color: 'bg-amber-50 text-amber-700 border-amber-100' },
                                { label: 'Disclosure', items: entry.disclosure, color: 'bg-rose-50 text-rose-700 border-rose-100' }
                            ].map(g => (
                                <div key={g.label}><span className="text-xs text-gray-500 mb-1 block">{g.label}:</span><div className="flex flex-wrap gap-1">{g.items.length ? g.items.map(i => <span key={i} className={`px-2 py-1 rounded text-xs font-semibold border ${g.color}`}>{i}</span>) : <span className="text-sm text-gray-400 italic">None</span>}</div></div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4 border-t border-gray-200 pt-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Additional Context</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <TextTruncate title="Other Input (Wallet)" text={entry.otherWallet} />
                            <TextTruncate title="Other Input (Participation)" text={entry.otherParticipation} />
                            <TextTruncate title="Previous LSP Experience" text={entry.experience} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-between items-center z-20 relative">
                <button onClick={() => onNavigate(-1)} disabled={index === 0} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">Previous</button>
                <span className="text-sm text-gray-500 font-medium">Entry {index + 1} of {total}</span>
                <button onClick={() => onNavigate(1)} disabled={index === total - 1} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">Next</button>
            </div>
        </div>
    );
};