import React from 'react';

interface StandardChipProps {
    label: string;
    variant?: 'blue' | 'indigo' | 'amber' | 'rose' | 'slate' | 'purple';
}

export const StandardChip: React.FC<StandardChipProps> = ({ label, variant = 'slate' }) => {
    const variants = {
        blue: 'bg-blue-50 text-blue-700 border-blue-100',
        indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
        amber: 'bg-amber-50 text-amber-700 border-amber-100',
        rose: 'bg-rose-50 text-rose-700 border-rose-100',
        slate: 'bg-slate-50 text-slate-600 border-slate-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-100',
    };

    return (
        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-tight ${variants[variant]}`}>
            {label}
        </span>
    );
};