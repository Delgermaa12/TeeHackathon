import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Tag, Share2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useDataContext } from '../context/DataContext';
import { articles as staticArticles } from '../data/articles';
import type { Article } from '../types/article';
import Galaxy from '../components/Galaxy';

interface ArticleDetailProps {
    article?: Article;
    onBack?: (tag?: string) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article: propArticle, onBack }) => {
    const { theme, language } = useAppContext();
    const { scrollY } = useScroll();
    const { id } = useParams();
    const navigate = useNavigate();
    const { articles: contextArticles, teachers } = useDataContext();

    const imageScale = useTransform(scrollY, [0, 400], [1, 1.1]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const article = React.useMemo(() => {
        if (propArticle) return propArticle;

        const foundContextArticle = contextArticles.find(a => a.id === id);
        if (foundContextArticle && foundContextArticle.status === 'published') {
            const author = teachers.find(t => t.id === foundContextArticle.authorId)?.name || 'System';
            
            const contentHTML = foundContextArticle.blocks.map(b => {
                if (b.type === 'text') {
                    const text = typeof b.content === 'string' ? b.content : (b.content as any).html || '';
                    return `<div class="article-text-block">${text}</div>`;
                }
                if (b.type === 'image') {
                    return `<div class="article-image-block">
                        <img src="${(b.content as any).url}" alt="${(b.content as any).caption || ''}" class="rounded-2xl w-full" />
                        ${(b.content as any).caption ? `<p class="text-sm text-center mt-2 opacity-60">${(b.content as any).caption}</p>` : ''}
                    </div>`;
                }
                if (b.type === 'quote') {
                    return `<blockquote class="border-l-4 border-brand-secondary pl-6 py-2 italic text-2xl font-bold opacity-90 my-8">
                        "${(b.content as any).text}"
                        ${(b.content as any).author ? `<cite class="block text-sm font-black uppercase not-italic mt-4 opacity-50">— ${(b.content as any).author}</cite>` : ''}
                    </blockquote>`;
                }
                if (b.type === 'video') {
                    return `<div class="article-video-block aspect-video w-full rounded-2xl overflow-hidden my-8">
                        <iframe src="${(b.content as any).url}" class="w-full h-full" frameborder="0" allowfullscreen></iframe>
                    </div>`;
                }
                return '';
            }).join('');

            return {
                id: foundContextArticle.id,
                title: { mn: foundContextArticle.title, en: foundContextArticle.title },
                category: { mn: foundContextArticle.category, en: foundContextArticle.category },
                excerpt: { mn: foundContextArticle.excerpt || '', en: foundContextArticle.excerpt || '' },
                content: { mn: contentHTML, en: contentHTML },
                author: { mn: author, en: author },
                date: new Date(foundContextArticle.updatedAt).toLocaleDateString(),
                readTime: { mn: '5 мин', en: '5 min' },
                image: foundContextArticle.cover || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
                tags: foundContextArticle.tags || []
            } as Article;
        }

        return staticArticles.find(a => a.id === id);
    }, [propArticle, id, contextArticles, teachers]);

    const handleBack = () => {
        if (onBack) onBack();
        else navigate('/articles');
    };

    if (!article) {
        return (
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-brand-dark text-white' : 'bg-brand-light text-black'} flex items-center justify-center`}>
                <button
                    onClick={handleBack}
                    className="px-6 py-3 rounded-2xl border border-[#eab308]/40 text-[#eab308] font-bold"
                >
                    {language === 'mn' ? 'Нийтлэл олдсонгүй. Буцах' : 'Article not found. Go back'}
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-brand-dark text-white' : 'bg-brand-light text-black'}`}>
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <Galaxy
                    starSpeed={0.1}
                    density={0.1}
                    colors={['#DB4437', '#4285F4', '#0F9D58', '#F4B400']}
                />
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-brand-dark/60' : 'bg-brand-light/90'}`} />
            </div>

            <main className="relative z-10 pt-32">
                {/* Reading Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-[#eab308] z-[60] origin-left"
                    style={{ scaleX: useTransform(scrollY, [0, 1000], [0, 1]) }}
                />

                {/* Hero Section */}
                <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                    <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
                        <img
                            src={article.image}
                            alt={article.title[language]}
                            className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 ${theme === 'dark'
                            ? 'bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent'
                            : 'bg-gradient-to-t from-brand-light via-brand-light/10 to-transparent'
                            }`} />
                    </motion.div>

                    <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-10 mt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-center gap-4"
                        >
                            <span className="px-5 py-2 rounded-full bg-[#eab308]/20 border-2 border-[#eab308]/30 text-[#eab308] text-[10px] font-black uppercase tracking-widest backdrop-blur-3xl">
                                {article.category[language]}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                        >
                            {article.title[language]}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`flex flex-wrap justify-center items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}
                        >
                            <div className="flex items-center gap-3">
                                <User size={16} className="text-[#eab308]" />
                                {article.author[language]}
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar size={16} className="text-[#eab308]" />
                                {article.date}
                            </div>
                            <div className="flex items-center gap-3 text-[#eab308]">
                                <Clock size={16} />
                                {article.readTime[language]}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className={`py-32 -mt-32 relative z-20`}>
                    <div className="max-w-4xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`p-10 md:p-20 rounded-[4rem] backdrop-blur-3xl border-2 shadow-2xl ${theme === 'dark' ? 'bg-[#050505]/60 border-white/5' : 'bg-white/80 border-black/5 shadow-black/5'
                                } shadow-[#eab308]/5`}
                        >
                            <div className={`prose prose-2xl ${theme === 'dark' ? 'prose-invert text-white' : 'text-black'} max-w-none`}>
                                <p className="text-2xl md:text-4xl font-black leading-tight mb-16 italic opacity-90 border-l-[12px] border-[#eab308] pl-10">
                                    {article.excerpt[language]}
                                </p>
                                <div
                                    className={`text-lg md:text-xl leading-[1.8] space-y-10 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'} font-medium`}
                                    dangerouslySetInnerHTML={{ __html: article.content[language].replace(/\n/g, '<br/><br/>') }}
                                />
                            </div>

                            {/* Tags/Footer */}
                            <div className={`mt-20 pt-12 border-t-2 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex flex-wrap gap-5`}>
                                <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] opacity-50">
                                    <Tag size={14} className="text-[#eab308]" />
                                    Tags:
                                </div>
                                {article.tags?.map(tag => (
                                    <span
                                        key={tag}
                                        onClick={handleBack}
                                        className={`text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-2xl border-2 transition-all cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white/50 hover:border-[#eab308]/40 hover:text-white' : 'bg-black/5 border-black/5 text-black/50 hover:border-[#eab308]/40 hover:text-black'
                                            }`}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Bottom Actions */}
                        <div className="mt-16 flex justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleBack}
                                className="px-12 py-5 bg-[#eab308] text-black rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-[#eab308]/20 flex items-center gap-4 transition-all hover:shadow-[#eab308]/40 active:scale-95"
                            >
                                <ArrowLeft size={20} />
                                {language === 'mn' ? 'Нийтлэлүүд рүү буцах' : 'Back to Articles'}
                            </motion.button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ArticleDetail;
