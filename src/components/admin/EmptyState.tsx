import React from 'react';
import { useAppContext } from '../../context/AppContext';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
    const { theme } = useAppContext();

    return (
        <div className={`p-12 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed ${theme === 'dark' ? 'bg-[#151515]/50 border-white/10' : 'bg-black/[0.02] border-black/10'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${theme === 'dark' ? 'bg-white/5 text-brand-secondary' : 'bg-black/5 text-brand-secondary'}`}>
                <Icon size={32} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {title}
            </h3>
            <p className={`text-sm max-w-sm mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                {description}
            </p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-6 py-2.5 bg-brand-secondary text-black text-sm font-bold rounded-xl hover:brightness-105 transition-all shadow-md"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
