import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, User, ArrowRight, ChevronDown, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { articles } from '../data/articles';
import Galaxy from '../components/Galaxy';

interface ArticlesPageProps {
    onArticleClick: (id: string) => void;
    initialTag?: string | null;
    onTagChange?: (tag: string | null) => void;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ onArticleClick, initialTag, onTagChange }) => {
    const { theme, language } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [selectedTag, setSelectedTag] = useState<string | null>(initialTag || null);

    React.useEffect(() => {
        if (initialTag !== undefined) {
            setSelectedTag(initialTag);
        }
    }, [initialTag]);

    const handleSetTag = (tag: string | null) => {
        setSelectedTag(tag);
        if (onTagChange) onTagChange(tag);

        // Update hash synchronously
        if (tag) {
            window.location.hash = `#articles#${encodeURIComponent(tag)}`;
        } else {
            window.location.hash = '#articles';
        }
    };

    const categories = useMemo(() => {
        const cats = new Set(articles.map(a => a.category[language]));
        return Array.from(cats);
    }, [language]);

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesSearch = article.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || article.category[language] === selectedCategory;
            const matchesTag = !selectedTag || (article.tags?.includes(selectedTag));
            return matchesSearch && matchesCategory && matchesTag;
        });
    }, [searchQuery, selectedCategory, selectedTag, language]);

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-brand-dark text-white' : 'bg-brand-light text-black'}`}>
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <Galaxy
                    starSpeed={0.05}
                    density={0.08}
                    colors={['#DB4437', '#4285F4', '#0F9D58', '#F4B400']}
                />
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-brand-dark/40' : 'bg-brand-light/90'}`} />
            </div>

            <main className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header & Filters */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20">
                        <div className="space-y-3">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
                            >
                                {language === 'mn' ? 'Нийтлэлүүд' : 'Articles'}
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 100 }}
                                transition={{ delay: 0.2 }}
                                className="h-1.5 bg-[#eab308] rounded-full"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                            {/* Search Input */}
                            <div className="relative group w-full sm:w-80">
                                <Search className={`absolute right-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${searchQuery ? 'text-[#eab308]' : 'opacity-30 group-focus-within:opacity-100 group-focus-within:text-[#eab308]'}`} size={20} />
                                <input
                                    type="text"
                                    placeholder={language === 'mn' ? 'Нийтлэл хайх...' : 'Search articles...'}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`pl-6 pr-14 py-4 rounded-2xl w-full backdrop-blur-3xl border-2 transition-all outline-none text-sm font-medium ${theme === 'dark'
                                        ? 'bg-white/5 border-white/5 focus:border-[#eab308]/40 focus:bg-white/10'
                                        : 'bg-black/5 border-black/5 focus:border-[#eab308]/40 focus:bg-black/10'
                                        }`}
                                />
                            </div>

                            {/* Category Dropdown */}
                            <div className="relative w-full sm:w-60">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`flex items-center justify-between w-full px-6 py-4 rounded-2xl border-2 backdrop-blur-3xl transition-all ${theme === 'dark'
                                        ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-[#eab308]/20'
                                        : 'bg-black/5 border-black/5 hover:bg-black/10 hover:border-[#eab308]/20'
                                        }`}
                                >
                                    <span className={`text-xs font-black uppercase tracking-widest truncate mr-2 ${selectedCategory ? 'text-[#eab308]' : ''}`}>
                                        {selectedCategory || (language === 'mn' ? 'Бүх ангилал' : 'All Categories')}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <ChevronDown size={18} className={selectedCategory ? 'text-[#eab308]' : 'opacity-50'} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <>
                                            {/* Backdrop for closing */}
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setIsDropdownOpen(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className={`absolute top-full left-0 right-0 mt-3 p-2 rounded-2xl border-2 backdrop-blur-3xl z-20 shadow-2xl ${theme === 'dark'
                                                    ? 'bg-[#0f0f0f]/95 border-white/5'
                                                    : 'bg-white/95 border-black/5'
                                                    }`}
                                            >
                                                <button
                                                    onClick={() => { setSelectedCategory(null); setIsDropdownOpen(false); }}
                                                    className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors ${!selectedCategory
                                                        ? 'bg-[#eab308] text-black'
                                                        : theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'
                                                        }`}
                                                >
                                                    {language === 'mn' ? 'Бүх ангилал' : 'All Categories'}
                                                </button>
                                                {categories.map(cat => (
                                                    <button
                                                        key={cat}
                                                        onClick={() => { setSelectedCategory(cat); setIsDropdownOpen(false); }}
                                                        className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors ${selectedCategory === cat
                                                            ? 'bg-[#eab308] text-black'
                                                            : theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'
                                                            }`}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters */}
                    <AnimatePresence>
                        {selectedTag && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3 mb-10"
                            >
                                <span className="text-xs font-bold uppercase tracking-widest opacity-40">
                                    {language === 'mn' ? 'Шүүлтүүр:' : 'Filter:'}
                                </span>
                                <button
                                    onClick={() => handleSetTag(null)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#eab308]/20 border border-[#eab308]/30 text-[#eab308] text-[10px] font-black uppercase tracking-widest hover:bg-[#eab308] hover:text-black transition-all"
                                >
                                    #{selectedTag}
                                    <X size={14} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.map((article, idx) => (
                                <motion.div
                                    layout
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => onArticleClick(article.id)}
                                    className={`group cursor-pointer rounded-[2.5rem] overflow-hidden border transition-all duration-500 hover:shadow-2xl ${theme === 'dark'
                                        ? 'bg-black/40 border-white/5 hover:border-[#eab308]/30 shadow-black'
                                        : 'bg-white/70 border-black/5 hover:border-[#eab308]/30 shadow-black/5'
                                        }`}
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title[language]}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
                                            <Clock size={12} className="text-[#eab308]" />
                                            {article.readTime[language]}
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-4">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[10px] font-bold text-[#eab308] uppercase tracking-widest">
                                                {article.category[language]}
                                            </span>
                                            {article.tags?.map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSetTag(tag);
                                                    }}
                                                    className={`text-[8px] px-2 py-1 rounded-md bg-white/5 border border-white/5 hover:border-[#eab308]/40 transition-all font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white/40 hover:text-[#eab308]' : 'text-black/40 hover:text-[#eab308]'}`}
                                                >
                                                    #{tag}
                                                </button>
                                            ))}
                                        </div>
                                        <h3 className={`text-xl md:text-2xl font-black leading-tight tracking-tight group-hover:text-[#eab308] transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                            {article.title[language]}
                                        </h3>
                                        <p className={`text-sm leading-relaxed line-clamp-2 opacity-60 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                                            {article.excerpt[language]}
                                        </p>

                                        <div className={`pt-6 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex items-center justify-between`}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#eab308]/20 flex items-center justify-center">
                                                    <User size={14} className="text-[#eab308]" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`text-[10px] font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                                        {article.author[language]}
                                                    </span>
                                                    <span className="text-[9px] opacity-40 uppercase tracking-tighter">
                                                        {article.date}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="w-10 h-10 rounded-full border border-[#eab308]/30 flex items-center justify-center group-hover:bg-[#eab308] group-hover:text-black transition-all transform group-hover:rotate-45">
                                                <ArrowRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="py-40 text-center">
                            <Search className="mx-auto mb-6 opacity-20" size={64} />
                            <p className="text-2xl font-bold opacity-30">
                                {language === 'mn' ? 'Илэрц олдсонгүй' : 'No articles found'}
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ArticlesPage;
