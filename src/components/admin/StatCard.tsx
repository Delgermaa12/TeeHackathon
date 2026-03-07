import React from 'react';
import { useAppContext } from '../../context/AppContext';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    colorClass: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export function StatCard({ title, value, icon, colorClass, trend }: StatCardProps) {
    const { theme } = useAppContext();

    return (
        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5' : 'bg-white border-black/5 shadow-sm'} flex items-center gap-5 transition-all hover:shadow-md`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} ${colorClass}`}>
                {icon}
            </div>
            <div className="flex-1">
                <p className={`${theme === 'dark' ? 'text-white/40' : 'text-black/50'} text-[11px] font-bold uppercase tracking-wider mb-0.5 line-clamp-1`}>{title}</p>
                <div className="flex items-end gap-3">
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{value}</p>
                    {trend && (
                        <p className={`text-[10px] font-bold pb-1 flex items-center gap-0.5 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
