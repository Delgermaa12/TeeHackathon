import React from 'react';
import { useAppContext } from '../../context/AppContext';
import {
    LayoutDashboard, BookOpen, GraduationCap, Users,
    FileText, MessageSquare, Heart, LogOut, Moon, Sun, Globe, Rocket
} from 'lucide-react';
import { useAdminTranslation } from '../../hooks/useAdminTranslation';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    onTabChange: (tab: string) => void;
    onLogout: () => void;
}

export function AdminLayout({ children, activeTab, onTabChange, onLogout }: AdminLayoutProps) {
    const { theme, toggleTheme, language, setLanguage } = useAppContext();
    const t = useAdminTranslation();

    const menuItems = [
        { id: 'dashboard', label: t.sidebar.dashboard, icon: LayoutDashboard },
        { id: 'programs', label: t.sidebar.programs, icon: BookOpen },
        { id: 'trainings', label: t.sidebar.trainings, icon: GraduationCap },
        { id: 'teachers', label: t.sidebar.teachers, icon: Users },
        { id: 'articles', label: t.sidebar.articles, icon: FileText },
        { id: 'projects', label: t.sidebar.projects, icon: Rocket },
        { id: 'requests', label: t.sidebar.requests, icon: MessageSquare },
        { id: 'appreciation', label: t.sidebar.appreciation, icon: Heart },
    ];

    return (
        <div className={`min-h-screen flex flex-col md:flex-row ${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8f9fa] text-black'} font-['Inter']`}>
            {/* Sidebar */}
            <aside className={`w-full md:w-64 shrink-0 flex flex-col ${theme === 'dark' ? 'bg-[#111] border-r border-white/5' : 'bg-white border-r border-black/5 shadow-xl md:shadow-none z-50 relative'}`}>
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center text-black font-black text-xl">
                            T
                        </div>
                        <div>
                            <h2 className="font-bold text-lg leading-tight tracking-tighter">{t.sidebar.adminSystem}</h2>
                            <p className="text-[10px] uppercase tracking-widest font-black text-brand-accent animate-pulse">{t.sidebar.centralControl}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pb-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${isActive
                                    ? 'bg-brand-accent text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                                    : theme === 'dark'
                                        ? 'text-white/50 hover:bg-white/5 hover:text-white'
                                        : 'text-black/50 hover:bg-black/5 hover:text-black'
                                    }`}
                            >
                                <Icon size={18} className={isActive ? 'opacity-100' : 'opacity-50'} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} space-y-4`}>
                    {/* Theme & Lang Toggles */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={toggleTheme}
                            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all border ${theme === 'dark'
                                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                                : 'bg-black/5 border-black/10 hover:bg-black/10'
                                }`}
                        >
                            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                            {theme === 'dark' ? 'Light' : 'Dark'}
                        </button>
                        <button
                            onClick={() => setLanguage(language === 'mn' ? 'en' : 'mn')}
                            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all border ${theme === 'dark'
                                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                                : 'bg-black/5 border-black/10 hover:bg-black/10'
                                }`}
                        >
                            <Globe size={14} />
                            {language.toUpperCase()}
                        </button>
                    </div>

                    <button
                        onClick={onLogout}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-bold text-sm border border-red-500/20 text-red-500 hover:bg-red-500/10`}
                    >
                        <LogOut size={16} />
                        {t.sidebar.logout}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
