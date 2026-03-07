import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ElementType;
}

export function PageHeader({ title, description, actionLabel, onAction, icon: Icon }: PageHeaderProps) {
    const { theme } = useAppContext();

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
                <h1 className={`text-2xl font-bold flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    {Icon && <Icon className="text-brand-secondary" size={24} />}
                    {title}
                </h1>
                {description && (
                    <p className={`text-xs mt-1 font-medium ${theme === 'dark' ? 'text-white/40' : 'text-black/50'}`}>
                        {description}
                    </p>
                )}
            </div>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-secondary text-black text-xs font-bold rounded-xl hover:brightness-105 transition-all shadow-md active:scale-95"
                >
                    <Plus size={16} />
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
