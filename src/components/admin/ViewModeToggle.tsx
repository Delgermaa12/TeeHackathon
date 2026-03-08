import { LayoutGrid, LayoutList } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export type ViewMode = 'list' | 'grid';

interface ViewModeToggleProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
    const { theme } = useAppContext();

    return (
        <div className={`flex p-1 rounded-xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5' : 'bg-white border-black/5'
            } shadow-sm`}>
            <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                    ? 'bg-brand-accent text-black shadow-md'
                    : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
                    }`}
                title="Жагсаалтаар харах"
                type="button"
            >
                <LayoutList size={16} />
            </button>
            <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                    ? 'bg-brand-accent text-black shadow-md'
                    : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
                    }`}
                title="Хүснэгтээр харах"
                type="button"
            >
                <LayoutGrid size={16} />
            </button>
        </div>
    );
}
