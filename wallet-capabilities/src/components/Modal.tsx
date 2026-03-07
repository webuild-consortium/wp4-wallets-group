import React from 'react';

interface ModalProps {
    isOpen: boolean;
    title: string;
    content: string;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, content, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition">✕</button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar"><p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{content}</p></div>
            </div>
        </div>
    );
};