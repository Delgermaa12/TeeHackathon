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
        <div className={`p-5 lg:p-6 rounded-3xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5 shadow-none' : 'bg-white border-black/5 shadow-sm'} flex items-center gap-4 transition-all hover:shadow-md group`}>
            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shrink-0 ${theme === 'dark' ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'} ${colorClass} transition-colors`}>
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
