import { useAppContext } from '../../context/AppContext';
import { Search } from 'lucide-react';
import { ViewModeToggle, type ViewMode } from './ViewModeToggle';

export interface FilterOption {
    label: string;
    value: string;
}

interface FilterGroup {
    key: string;
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (val: string) => void;
}

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (q: string) => void;
    searchPlaceholder?: string;
    filters?: FilterGroup[];
    viewMode?: ViewMode;
    onViewModeChange?: (mode: ViewMode) => void;
}

export function FilterBar({
    searchQuery,
    onSearchChange,
    searchPlaceholder = "Хайх...",
    filters = [],
    viewMode,
    onViewModeChange
}: FilterBarProps) {
    const { theme } = useAppContext();

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
            <div className={`relative flex-1 rounded-2xl border ${theme === 'dark' ? 'bg-black/20 border-white/5 focus-within:border-brand-secondary/50 focus-within:bg-white/5' : 'bg-black/[0.02] border-black/5 focus-within:border-brand-secondary/50 focus-within:bg-white shadow-sm'} transition-all flex items-center px-5 w-full md:w-auto overflow-hidden`}>
                <Search size={16} className={`shrink-0 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className={`w-full bg-transparent border-none outline-none px-3 py-3 text-sm font-medium ${theme === 'dark' ? 'text-white placeholder:text-white/30' : 'text-black placeholder:text-black/30'}`}
                />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                {filters.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-xs font-bold">
                        {filters.map((fGroup) => (
                            <select
                                key={fGroup.key}
                                value={fGroup.value}
                                onChange={(e) => fGroup.onChange(e.target.value)}
                                className={`px-4 py-3 rounded-2xl outline-none appearance-none cursor-pointer border ${theme === 'dark' ? 'bg-[#151515] border-white/5 text-white/80 hover:bg-white/5' : 'bg-white border-black/5 text-black/80 hover:bg-black/[0.02]'} shadow-sm focus:border-brand-secondary transition-all`}
                            >
                                <option value="">{fGroup.label}</option>
                                {fGroup.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        ))}
                    </div>
                )}

                {viewMode && onViewModeChange && (
                    <ViewModeToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
                )}
            </div>
        </div>
    );
}
