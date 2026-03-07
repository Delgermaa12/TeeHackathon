// src/views/admin/articles/ArticlesView.tsx
import React, { useCallback, useMemo, useReducer, useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { type ViewMode } from '../../components/admin/ViewModeToggle';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { ImageUpload } from '../../components/admin/ImageUpload';
import {
    FileText,
    Edit3,
    Trash2,
    Image as ImageIcon,
    User,
    Calendar,
    ChevronUp,
    ChevronDown,
    Quote,
    Video,
    LayoutGrid,
    X,
    Type,
    GripVertical,
    Settings2,
    PlayCircle,
    Clock,
    ArrowRight,
    Eye
} from 'lucide-react';
import { mockArticles, mockTeachers } from '../../mock/adminData';
import type { Article, ArticleBlock, BlockType } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';

/**
 * Production refactor notes:
 * - Single source of truth: editor reducer
 * - No dangerouslySetInnerHTML (XSS risk). Render text safely.
 * - Memoized columns & derived data
 * - Pure helpers for block creation/normalization
 */

type EditorMode = 'edit' | 'preview' | 'card';
type ArticleStatus = Article['status'];

type EditorState = {
    isOpen: boolean;
    mode: EditorMode;
    article: Article | null;
    blocks: ArticleBlock[];
};

type EditorAction =
    | { type: 'OPEN_NEW'; payload: { article: Article } }
    | { type: 'OPEN_EDIT'; payload: { article: Article } }
    | { type: 'CLOSE' }
    | { type: 'SET_MODE'; payload: { mode: EditorMode } }
    | { type: 'UPDATE_ARTICLE_FIELD'; payload: { key: keyof Article; value: any } }
    | { type: 'ADD_BLOCK'; payload: { blockType: BlockType } }
    | { type: 'REMOVE_BLOCK'; payload: { id: string } }
    | { type: 'UPDATE_BLOCK_CONTENT'; payload: { id: string; content: any } }
    | { type: 'UPDATE_BLOCK_SETTINGS'; payload: { id: string; settings: any } }
    | { type: 'MOVE_BLOCK'; payload: { id: string; direction: 'up' | 'down' } }
    | { type: 'SET_BLOCKS'; payload: { blocks: ArticleBlock[] } };

const DEFAULT_CATEGORY: Article['category'] = 'Мэдээ';

function createId(prefix: string) {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

function normalizeBlocks(blocks: ArticleBlock[]): ArticleBlock[] {
    return [...blocks]
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((b, i) => ({ ...b, order: i + 1 }));
}

function createBlock(type: BlockType, order: number): ArticleBlock {
    const id = createId('blk');

    const base: ArticleBlock = {
        id,
        type,
        order,
        content: {},
        settings: {},
    };

    switch (type) {
        case 'text':
            return { ...base, content: '' };
        case 'quote':
            return { ...base, content: { text: '', author: '' } };
        case 'video':
            return { ...base, content: { url: '', title: '' } };
        case 'image':
            return { ...base, content: { url: '', caption: '' } };
        case 'course_grid':
            return {
                ...base,
                content: { courseIds: [], title: '' },
                settings: { showPreview: true, buttonText: 'Үзэх', ribbonText: '', duration: '' },
            };
        default:
            return base;
    }
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
    switch (action.type) {
        case 'OPEN_NEW': {
            const article = action.payload.article;
            return {
                isOpen: true,
                mode: 'edit',
                article,
                blocks: normalizeBlocks(article.blocks ?? []),
            };
        }
        case 'OPEN_EDIT': {
            const article = action.payload.article;
            return {
                isOpen: true,
                mode: 'edit',
                article,
                blocks: normalizeBlocks(article.blocks ?? []),
            };
        }
        case 'CLOSE':
            return { isOpen: false, mode: 'edit', article: null, blocks: [] };

        case 'SET_MODE':
            return { ...state, mode: action.payload.mode };

        case 'UPDATE_ARTICLE_FIELD': {
            if (!state.article) return state;
            const { key, value } = action.payload;
            return { ...state, article: { ...state.article, [key]: value, updatedAt: new Date().toISOString() } };
        }

        case 'ADD_BLOCK': {
            const next = [...state.blocks, createBlock(action.payload.blockType, state.blocks.length + 1)];
            return { ...state, blocks: normalizeBlocks(next) };
        }

        case 'REMOVE_BLOCK': {
            const next = state.blocks.filter((b) => b.id !== action.payload.id);
            return { ...state, blocks: normalizeBlocks(next) };
        }

        case 'UPDATE_BLOCK_CONTENT': {
            const next = state.blocks.map((b) => (b.id === action.payload.id ? { ...b, content: action.payload.content } : b));
            return { ...state, blocks: next };
        }

        case 'UPDATE_BLOCK_SETTINGS': {
            const next = state.blocks.map((b) => (b.id === action.payload.id ? { ...b, settings: action.payload.settings } : b));
            return { ...state, blocks: next };
        }

        case 'MOVE_BLOCK': {
            const idx = state.blocks.findIndex((b) => b.id === action.payload.id);
            if (idx < 0) return state;

            const targetIdx = action.payload.direction === 'up' ? idx - 1 : idx + 1;
            if (targetIdx < 0 || targetIdx >= state.blocks.length) return state;

            const next = [...state.blocks];
            [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
            return { ...state, blocks: normalizeBlocks(next) };
        }

        case 'SET_BLOCKS':
            return { ...state, blocks: normalizeBlocks(action.payload.blocks) };

        default:
            return state;
    }
}

function getAuthorName(authorId: string) {
    return mockTeachers.find((t) => t.id === authorId)?.name || 'Систем';
}

function safePlainText(text: string): string {
    // Safety: render as plain text only (no HTML). Keep it deterministic.
    return (text ?? '').toString();
}

function isValidHttpUrl(value: string) {
    try {
        const u = new URL(value);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
}

/** Small UI primitives (kept in same file; later you can split into separate components) */

function BlockHeader({
    theme,
    type,
    onMoveUp,
    onMoveDown,
    onRemove,
    disableUp,
    disableDown,
}: {
    theme: string;
    type: string;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onRemove: () => void;
    disableUp: boolean;
    disableDown: boolean;
}) {
    return (
        <>
            <div className={`absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all z-10`}>
                <button
                    onClick={onMoveUp}
                    disabled={disableUp}
                    className={`p-1.5 rounded-lg ${theme === 'dark' ? 'hover:bg-white/10 text-white/40 hover:text-white' : 'hover:bg-black/10 text-black/40 hover:text-black'
                        } disabled:opacity-0`}
                    type="button"
                >
                    <ChevronUp size={14} />
                </button>
                <button
                    onClick={onMoveDown}
                    disabled={disableDown}
                    className={`p-1.5 rounded-lg ${theme === 'dark' ? 'hover:bg-white/10 text-white/40 hover:text-white' : 'hover:bg-black/10 text-black/40 hover:text-black'
                        } disabled:opacity-0`}
                    type="button"
                >
                    <ChevronDown size={14} />
                </button>
                <button
                    onClick={onRemove}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-500/60 hover:text-red-500"
                    type="button"
                >
                    <X size={14} />
                </button>
            </div>

            <div className="flex items-center gap-2 mb-4 opacity-40 group-hover:opacity-100 transition-all">
                <div className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                    <GripVertical size={14} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{type}</span>
            </div>
        </>
    );
}

function BlockEditor({
    theme,
    block,
    index,
    total,
    onMove,
    onRemove,
    onUpdateContent,
    onUpdateSettings,
}: {
    theme: string;
    block: ArticleBlock;
    index: number;
    total: number;
    onMove: (id: string, direction: 'up' | 'down') => void;
    onRemove: (id: string) => void;
    onUpdateContent: (id: string, content: any) => void;
    onUpdateSettings: (id: string, settings: any) => void;
}) {
    const isFirst = index === 0;
    const isLast = index === total - 1;

    return (
        <div
            className={`group relative p-4 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-brand-secondary/30' : 'bg-black/5 border-black/5 hover:border-brand-secondary/30'
                }`}
        >
            <BlockHeader
                theme={theme}
                type={block.type}
                disableUp={isFirst}
                disableDown={isLast}
                onMoveUp={() => onMove(block.id, 'up')}
                onMoveDown={() => onMove(block.id, 'down')}
                onRemove={() => onRemove(block.id)}
            />

            {block.type === 'text' && (
                <textarea
                    value={safePlainText(block.content)}
                    onChange={(e) => onUpdateContent(block.id, e.target.value)}
                    className={`w-full bg-transparent outline-none p-2 rounded shrink-0 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'
                        } min-h-[120px]`}
                    placeholder="Бичвэр оруулах..."
                />
            )}

            {block.type === 'quote' && (
                <div className="space-y-3">
                    <textarea
                        value={safePlainText(block.content?.text ?? '')}
                        onChange={(e) => onUpdateContent(block.id, { ...block.content, text: e.target.value })}
                        className={`w-full bg-transparent outline-none p-3 border-l-4 border-brand-secondary italic ${theme === 'dark' ? 'text-white/80' : 'text-black/80'
                            }`}
                        placeholder="Ишлэл..."
                        rows={2}
                    />
                    <input
                        type="text"
                        value={safePlainText(block.content?.author ?? '')}
                        onChange={(e) => onUpdateContent(block.id, { ...block.content, author: e.target.value })}
                        className={`w-full bg-transparent outline-none px-3 text-xs ${theme === 'dark' ? 'text-white/70' : 'text-black/70'} opacity-80`}
                        placeholder="Зохиогч..."
                    />
                </div>
            )}

            {block.type === 'video' && (
                <div className="space-y-3">
                    <div className={`flex gap-2 items-center p-2 rounded-xl border ${theme === 'dark' ? 'bg-black/20 border-white/5' : 'bg-black/5 border-black/10'}`}>
                        <Video size={16} className="text-brand-secondary" />
                        <input
                            type="text"
                            value={safePlainText(block.content?.url ?? '')}
                            onChange={(e) => onUpdateContent(block.id, { ...block.content, url: e.target.value })}
                            className={`flex-1 bg-transparent outline-none text-xs ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}
                            placeholder="Video URL (YouTube/Vimeo)..."
                        />
                    </div>
                    {Boolean(block.content?.url) && (
                        <div className={`aspect-video rounded-xl flex items-center justify-center border overflow-hidden ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-black/10 border-black/10'}`}>
                            <PlayCircle size={40} className={theme === 'dark' ? 'text-white/20' : 'text-black/20'} />
                        </div>
                    )}
                </div>
            )}

            {block.type === 'course_grid' && (
                <div className="space-y-4">
                    <input
                        type="text"
                        value={safePlainText(block.content?.title ?? '')}
                        onChange={(e) => onUpdateContent(block.id, { ...block.content, title: e.target.value })}
                        className={`w-full bg-transparent border-b p-2 outline-none font-bold ${theme === 'dark' ? 'border-white/10 text-white/90' : 'border-black/10 text-black/90'}`}
                        placeholder="Grid Title (e.g. Recommended Courses)"
                    />

                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                            <label className="opacity-40 text-[9px] uppercase font-bold">Duration Text</label>
                            <input
                                type="text"
                                value={safePlainText(block.settings?.duration ?? '')}
                                onChange={(e) => onUpdateSettings(block.id, { ...block.settings, duration: e.target.value })}
                                className={`w-full p-2 rounded-lg outline-none ${theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'}`}
                                placeholder="24 hours"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="opacity-40 text-[9px] uppercase font-bold">Button Text</label>
                            <input
                                type="text"
                                value={safePlainText(block.settings?.buttonText ?? 'Үзэх')}
                                onChange={(e) => onUpdateSettings(block.id, { ...block.settings, buttonText: e.target.value })}
                                className={`w-full p-2 rounded-lg outline-none ${theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'}`}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={Boolean(block.settings?.showPreview)}
                                onChange={(e) => onUpdateSettings(block.id, { ...block.settings, showPreview: e.target.checked })}
                                className="accent-brand-secondary"
                            />
                            <span className="opacity-60">Enable Video Preview</span>
                        </label>

                        <div className="flex items-center gap-2 flex-1">
                            <label className="opacity-40 text-[9px] uppercase font-bold">Ribbon</label>
                            <input
                                type="text"
                                value={safePlainText(block.settings?.ribbonText ?? '')}
                                onChange={(e) => onUpdateSettings(block.id, { ...block.settings, ribbonText: e.target.value })}
                                className={`flex-1 p-2 rounded-lg outline-none ${theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'}`}
                                placeholder="New"
                            />
                        </div>
                    </div>

                    <div className={`p-3 rounded-xl flex items-center justify-between border ${theme === 'dark' ? 'bg-brand-secondary/5 border-brand-secondary/10' : 'bg-brand-secondary/10 border-brand-secondary/20'}`}>
                        <span className="text-[10px] opacity-60">Selected Courses: {Array.isArray(block.content?.courseIds) ? block.content.courseIds.length : 0}</span>
                        <button className="text-[10px] text-brand-secondary font-bold" type="button">
                            Select Courses
                        </button>
                    </div>
                </div>
            )}

            {block.type === 'image' && (
                <div className="space-y-3">
                    <ImageUpload
                        label="Зураг"
                        value={block.content?.url}
                        onChange={(val) => onUpdateContent(block.id, { ...block.content, url: val })}
                        aspectRatio="video"
                    />

                    <input
                        type="text"
                        value={safePlainText(block.content?.caption ?? '')}
                        onChange={(e) => onUpdateContent(block.id, { ...block.content, caption: e.target.value })}
                        className={`w-full p-3 rounded-xl outline-none text-xs ${theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'}`}
                        placeholder="Caption..."
                    />

                    {Boolean(block.content?.url) && isValidHttpUrl(block.content.url) && (
                        <img
                            src={block.content.url}
                            alt=""
                            className={`w-full h-40 object-cover rounded-xl border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

function ArticleCardPreview({
    theme,
    article,
}: {
    theme: string;
    article: Article;
}) {
    return (
        <div className="flex items-center justify-center py-20 bg-black/5 rounded-[3rem]">
            <div
                className={`w-[400px] group rounded-[2.5rem] overflow-hidden border transition-all duration-500 shadow-2xl ${theme === 'dark'
                    ? 'bg-black/40 border-white/5 shadow-black'
                    : 'bg-white/70 border-black/5 shadow-black/5'
                    }`}
            >
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={article.cover || 'https://via.placeholder.com/800x600?text=No+Cover'}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
                        <Clock size={12} className="text-[#eab308]" />
                        12 min read
                    </div>
                </div>

                <div className="p-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold text-[#eab308] uppercase tracking-widest">
                            {article.category}
                        </span>
                        {article.tags?.map((tag, idx) => (
                            <span key={idx} className={`text-[9px] px-1.5 py-0.5 rounded-md font-medium uppercase tracking-wider ${theme === 'dark' ? 'bg-white/10 text-white/50' : 'bg-black/5 text-black/50'}`}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-black leading-tight tracking-tight group-hover:text-[#eab308] transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {article.title || 'Untitled Article'}
                    </h3>
                    <div className="flex items-center gap-4">
                        <p className={`text-sm leading-relaxed line-clamp-2 opacity-60 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                            {article.excerpt || 'No excerpt provided...'}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-medium ${theme === 'dark' ? 'text-white/40' : 'text-black/40'} flex items-center gap-1.5`}>
                            <Eye size={12} className="text-[#eab308]" /> {article.views} views
                        </span>
                    </div>

                    <div className={`pt-6 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#eab308]/20 flex items-center justify-center">
                                <User size={14} className="text-[#eab308]" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className={`text-[10px] font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                    {getAuthorName(article.authorId)}
                                </span>
                                <span className="text-[9px] opacity-40 uppercase tracking-tighter">
                                    {new Date(article.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="w-10 h-10 rounded-full border border-[#eab308]/30 flex items-center justify-center text-[#eab308]">
                            <ArrowRight size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArticlePreview({
    theme,
    article,
    blocks,
}: {
    theme: string;
    article: Article;
    blocks: ArticleBlock[];
}) {
    return (
        <div className="space-y-0 max-w-5xl mx-auto py-0 animate-in fade-in duration-500 overflow-hidden rounded-[3rem]">
            {/* Hero Section - Matching ArticleDetail.tsx */}
            <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={article.cover || 'https://via.placeholder.com/1920x1080?text=No+Cover'}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${theme === 'dark'
                        ? 'bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent'
                        : 'bg-gradient-to-t from-brand-light via-brand-light/10 to-transparent'
                        }`} />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
                    <div className="flex justify-center">
                        <span className="px-5 py-2 rounded-full bg-[#eab308]/20 border-2 border-[#eab308]/30 text-[#eab308] text-[10px] font-black uppercase tracking-widest backdrop-blur-3xl">
                            {article.category}
                        </span>
                    </div>

                    <h1 className={`text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white`}>
                        {article.title?.trim() ? article.title : 'Гарчиггүй нийтлэл'}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-white">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-[#eab308]" /> {getAuthorName(article.authorId)}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-[#eab308]" /> {new Date(article.updatedAt ?? Date.now()).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Section - Matching ArticleDetail.tsx */}
            <div className="relative z-20 -mt-20 pb-20 px-6">
                <div className={`max-w-4xl mx-auto p-12 md:p-20 rounded-[4rem] backdrop-blur-3xl border-2 shadow-2xl ${theme === 'dark' ? 'bg-[#050505]/90 border-white/5' : 'bg-white/95 border-black/5'
                    } shadow-[#eab308]/5`}>

                    {article.excerpt && (
                        <p className={`text-2xl md:text-3xl font-black leading-tight mb-16 italic opacity-90 border-l-[12px] border-[#eab308] pl-10 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            {article.excerpt}
                        </p>
                    )}

                    <div className="space-y-12">
                        {blocks.map((block) => (
                            <div key={block.id}>
                                {block.type === 'text' && (
                                    <div className={`${theme === 'dark' ? 'text-white/80' : 'text-black/80'} leading-[1.8] text-xl font-medium whitespace-pre-wrap`}>
                                        {safePlainText(block.content)}
                                    </div>
                                )}

                                {block.type === 'quote' && (
                                    <blockquote className={`relative p-10 rounded-[2rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                                        <Quote size={40} className="absolute -top-4 -left-4 text-brand-secondary opacity-40" />
                                        <p className={`${theme === 'dark' ? 'text-white/90' : 'text-black/90'} text-2xl font-serif italic leading-relaxed`}>
                                            “{safePlainText(block.content?.text ?? '')}”
                                        </p>
                                        <footer className="mt-6 flex items-center gap-3">
                                            <div className="h-0.5 w-8 bg-brand-secondary/40" />
                                            <cite className="not-italic font-bold text-brand-secondary text-sm uppercase tracking-widest">
                                                — {safePlainText(block.content?.author ?? '')}
                                            </cite>
                                        </footer>
                                    </blockquote>
                                )}

                                {block.type === 'image' && block.content?.url && isValidHttpUrl(block.content.url) && (
                                    <figure className="space-y-4">
                                        <img src={block.content.url} alt="" className="w-full rounded-[2rem] shadow-xl" />
                                        {block.content?.caption ? (
                                            <figcaption className="text-center text-xs opacity-50 italic">{safePlainText(block.content.caption)}</figcaption>
                                        ) : null}
                                    </figure>
                                )}

                                {block.type === 'video' && (
                                    <div className={`aspect-video rounded-[2rem] overflow-hidden shadow-2xl border flex items-center justify-center ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-black/10 border-black/10'
                                        }`}
                                    >
                                        <PlayCircle size={60} className="text-brand-secondary opacity-20" />
                                    </div>
                                )}

                                {block.type === 'course_grid' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className={`text-xl font-bold flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                                <div className="p-2 bg-brand-secondary/10 rounded-lg text-brand-secondary">
                                                    <LayoutGrid size={20} />
                                                </div>
                                                {safePlainText(block.content?.title ?? '')}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {[1, 2].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`p-4 rounded-2xl space-y-3 relative overflow-hidden group border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                                                        }`}
                                                >
                                                    {block.settings?.ribbonText ? (
                                                        <div className="absolute top-4 right-4 bg-brand-secondary text-[8px] font-black uppercase px-2 py-1 rounded-md z-10">
                                                            {safePlainText(block.settings.ribbonText)}
                                                        </div>
                                                    ) : null}

                                                    <div className={`h-32 rounded-xl animate-pulse ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`} />
                                                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Course Item {i}</h4>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-[10px] opacity-60">
                                                            <Clock size={12} /> {safePlainText(block.settings?.duration ?? '12 sections')}
                                                        </div>
                                                        <button
                                                            className="text-[10px] font-black uppercase tracking-widest text-brand-secondary bg-brand-secondary/10 px-3 py-1.5 rounded-lg hover:bg-brand-secondary hover:text-black transition-all"
                                                            type="button"
                                                        >
                                                            {safePlainText(block.settings?.buttonText ?? 'Үзэх')}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ArticlesView() {
    const { theme } = useAppContext();

    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const [articles, setArticles] = useState<Article[]>(mockArticles);
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const [deleteState, setDeleteState] = useState<{ isOpen: boolean; articleId: string | null }>({
        isOpen: false,
        articleId: null,
    });

    const [editor, dispatch] = useReducer(editorReducer, {
        isOpen: false,
        mode: 'edit',
        article: null,
        blocks: [],
    });

    const filteredArticles = useMemo(() => {
        const s = search.trim().toLowerCase();
        return articles.filter((a) => {
            const matchesSearch = s ? (a.title ?? '').toLowerCase().includes(s) : true;
            const matchesCategory = categoryFilter ? a.category === categoryFilter : true;
            return matchesSearch && matchesCategory;
        });
    }, [articles, search, categoryFilter]);

    const handleAdd = useCallback(() => {
        const newId = createId('art');
        const now = new Date().toISOString();

        const next: Article = {
            id: newId,
            title: '',
            authorId: mockTeachers[0]?.id || '',
            category: DEFAULT_CATEGORY,
            blocks: [],
            views: 0,
            status: 'draft',
            createdAt: now,
            updatedAt: now,
            cover: '',
        };

        dispatch({ type: 'OPEN_NEW', payload: { article: next } });
    }, []);

    const handleEdit = useCallback((article: Article) => {
        dispatch({ type: 'OPEN_EDIT', payload: { article } });
    }, []);

    const openDeleteDialog = useCallback((id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteState({ isOpen: true, articleId: id });
    }, []);

    const confirmDelete = useCallback(() => {
        setArticles((prev) => prev.filter((a) => a.id !== deleteState.articleId));
        setDeleteState({ isOpen: false, articleId: null });
    }, [deleteState.articleId]);

    const closeDelete = useCallback(() => setDeleteState({ isOpen: false, articleId: null }), []);

    const onCloseEditor = useCallback(() => dispatch({ type: 'CLOSE' }), []);

    const onPublish = useCallback(() => {
        if (!editor.article) return;

        const updated: Article = {
            ...editor.article,
            blocks: normalizeBlocks(editor.blocks),
            status: (editor.article.status ?? 'draft') === 'published' ? 'published' : 'published',
            updatedAt: new Date().toISOString(),
        };

        setArticles((prev) => {
            const exists = prev.some((a) => a.id === updated.id);
            if (exists) return prev.map((a) => (a.id === updated.id ? updated : a));
            return [updated, ...prev];
        });

        dispatch({ type: 'CLOSE' });
    }, [editor.article, editor.blocks]);

    const columns: Column<Article>[] = useMemo(
        () => [
            {
                header: 'Нийтлэл',
                accessorKey: 'title',
                cell: ({ row }) => (
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                                }`}
                        >
                            {row.cover && isValidHttpUrl(row.cover) ? (
                                <img src={row.cover} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center opacity-30">
                                    <ImageIcon size={16} />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-bold truncate max-w-[200px]">{row.title}</span>
                            <span className={`text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                                {(row.blocks?.length ?? 0).toLocaleString()} блоктой
                            </span>
                        </div>
                    </div>
                ),
            },
            {
                header: 'Ангилал',
                accessorKey: 'category',
                cell: ({ row }) => (
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-brand-secondary">{row.category}</span>
                        <div className="flex flex-wrap gap-1">
                            {row.tags?.slice(0, 2).map((tag, i) => (
                                <span key={i} className={`text-[8px] px-1 rounded uppercase tracking-tighter ${theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/50'}`}>#{tag}</span>
                            ))}
                        </div>
                    </div>
                )
            },
            {
                header: 'Зохиогч',
                accessorKey: 'authorId',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                            <User size={10} />
                        </div>
                        <span className="text-xs truncate max-w-[100px]">{getAuthorName(row.authorId)}</span>
                    </div>
                )
            },
            {
                header: 'Үзсэн',
                accessorKey: 'views',
                cell: ({ row }) => (
                    <div className="flex items-center gap-1.5 opacity-50 font-medium">
                        <Eye size={12} className="text-brand-secondary" />
                        <span>{(row.views ?? 0).toLocaleString()}</span>
                    </div>
                )
            },
            { header: 'Статус', accessorKey: 'status', cell: ({ row }) => <StatusBadge status={row.status} /> },
            {
                header: 'Үйлдэл',
                accessorKey: 'id',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleEdit(row)}
                            className={`p-1.5 rounded-lg border transition-all ${theme === 'dark'
                                ? 'border-white/5 hover:bg-white/5 text-white/40 hover:text-white'
                                : 'border-black/5 hover:bg-black/5 text-black/40 hover:text-black'
                                }`}
                            type="button"
                        >
                            <Edit3 size={14} />
                        </button>
                        <button
                            onClick={(e) => openDeleteDialog(row.id, e)}
                            className={`p-1.5 rounded-lg border transition-all ${theme === 'dark'
                                ? 'border-white/5 hover:bg-red-500/10 text-red-500/60'
                                : 'border-black/5 hover:bg-red-500/10 text-red-500/60'
                                }`}
                            type="button"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ),
            },
        ],
        [theme, handleEdit, openDeleteDialog],
    );

    const selectedArticle = editor.article;

    const setEditorMode = useCallback(
        (mode: EditorMode) => dispatch({ type: 'SET_MODE', payload: { mode } }),
        [],
    );

    const addBlock = useCallback(
        (type: BlockType) => dispatch({ type: 'ADD_BLOCK', payload: { blockType: type } }),
        [],
    );

    const removeBlock = useCallback((id: string) => dispatch({ type: 'REMOVE_BLOCK', payload: { id } }), []);
    const moveBlock = useCallback((id: string, direction: 'up' | 'down') => dispatch({ type: 'MOVE_BLOCK', payload: { id, direction } }), []);
    const updateBlockContent = useCallback((id: string, content: any) => dispatch({ type: 'UPDATE_BLOCK_CONTENT', payload: { id, content } }), []);
    const updateBlockSettings = useCallback((id: string, settings: any) => dispatch({ type: 'UPDATE_BLOCK_SETTINGS', payload: { id, settings } }), []);

    const setArticleField = useCallback((key: keyof Article, value: any) => {
        dispatch({ type: 'UPDATE_ARTICLE_FIELD', payload: { key, value } });
    }, []);

    const setStatus = useCallback(
        (status: ArticleStatus) => {
            if (!selectedArticle) return;
            setArticleField('status', status);
        },
        [selectedArticle, setArticleField],
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title="Нийтлэлүүд"
                description="Вэб сайтын блог болон мэдээ мэдээллийн удирдлага"
                icon={FileText}
                actionLabel="Шинэ нийтлэл"
                onAction={handleAdd}
            />

            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                filters={[
                    {
                        key: 'category',
                        label: 'Ангилал',
                        value: categoryFilter,
                        onChange: setCategoryFilter,
                        options: [
                            { label: 'Боловсрол', value: 'Боловсрол' },
                            { label: 'Зөвлөгөө', value: 'Зөвлөгөө' },
                            { label: 'Мэдээ', value: 'Мэдээ' },
                        ],
                    },
                ]}
            />

            {viewMode === 'list' ? (
                <DataTable columns={columns} data={filteredArticles} onRowClick={handleEdit} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredArticles.map((article) => (
                        <div
                            key={article.id}
                            onClick={() => handleEdit(article)}
                            className={`group cursor-pointer rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${theme === 'dark'
                                ? 'bg-black/40 border-white/5 hover:border-brand-secondary/30'
                                : 'bg-white border-black/5 hover:border-brand-secondary/30 shadow-sm'
                                }`}
                        >
                            <div className="relative aspect-video overflow-hidden">
                                {article.cover && isValidHttpUrl(article.cover) ? (
                                    <img
                                        src={article.cover}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                                        <ImageIcon size={32} className="opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3">
                                    <StatusBadge status={article.status} />
                                </div>
                            </div>
                            <div className="p-5 space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
                                        {article.category}
                                    </span>
                                    {article.tags?.map((tag, idx) => (
                                        <span key={idx} className={`text-[9px] px-1.5 py-0.5 rounded-md font-medium uppercase tracking-wider ${theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/50'}`}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`text-[10px] font-medium ${theme === 'dark' ? 'text-white/40' : 'text-black/40'} flex items-center gap-1`}>
                                        <Clock size={10} /> {new Date(article.updatedAt).toLocaleDateString()}
                                    </span>
                                    <span className={`text-[10px] font-medium ${theme === 'dark' ? 'text-white/40' : 'text-black/40'} flex items-center gap-1`}>
                                        <Eye size={10} /> {article.views}
                                    </span>
                                </div>
                                <h3 className={`font-bold line-clamp-2 leading-snug group-hover:text-brand-secondary transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                    {article.title || 'Гарчиггүй'}
                                </h3>
                                <div className={`flex items-center justify-between pt-2 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                                            <User size={12} />
                                        </div>
                                        <span className={`text-[10px] font-bold ${theme === 'dark' ? 'opacity-60' : 'opacity-80 text-black/70'}`}>
                                            {getAuthorName(article.authorId)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(article);
                                            }}
                                            className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'} transition-colors`}
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                        <button
                                            onClick={(e) => openDeleteDialog(article.id, e)}
                                            className="text-red-500/40 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredArticles.length === 0 && (
                        <div className="col-span-full py-20 text-center opacity-30 font-bold">
                            Илэрц олдсонгүй
                        </div>
                    )}
                </div>
            )}

            <DrawerPanel
                isOpen={editor.isOpen}
                onClose={onCloseEditor}
                maxWidth={editor.mode !== 'edit' ? 'max-w-6xl' : 'max-w-4xl'}
                title={
                    <div className="flex items-center gap-4">
                        <span className="opacity-40">/</span>
                        <div className={`flex ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} p-1 rounded-xl`}>
                            <button
                                onClick={() => setEditorMode('edit')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${editor.mode === 'edit' ? 'bg-brand-secondary text-black shadow-lg' : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
                                    }`}
                                type="button"
                            >
                                Editor
                            </button>
                            <button
                                onClick={() => setEditorMode('preview')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${editor.mode === 'preview' ? 'bg-brand-secondary text-black shadow-lg' : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
                                    }`}
                                type="button"
                            >
                                Full Preview
                            </button>
                            <button
                                onClick={() => setEditorMode('card')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${editor.mode === 'card' ? 'bg-brand-secondary text-black shadow-lg' : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
                                    }`}
                                type="button"
                            >
                                Card Preview
                            </button>
                        </div>
                    </div>
                }
                footer={
                    <div className="flex w-full justify-between items-center">
                        <div className={`flex items-center gap-4 text-xs ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                            <Settings2 size={16} /> Auto-saving enabled
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={onCloseEditor}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60' : 'border-black/10 hover:bg-black/5 text-black/60'
                                    }`}
                                type="button"
                            >
                                Цуцлах
                            </button>
                            <button
                                onClick={onPublish}
                                className="px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-brand-secondary text-black shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:brightness-105 transition-all"
                                type="button"
                            >
                                Нийтлэх
                            </button>
                        </div>
                    </div>
                }
            >
                {!selectedArticle ? null : editor.mode === 'preview' ? (
                    <ArticlePreview theme={theme} article={selectedArticle} blocks={editor.blocks} />
                ) : editor.mode === 'card' ? (
                    <ArticleCardPreview theme={theme} article={selectedArticle} />
                ) : (
                    <div className="grid grid-cols-12 gap-10">
                        <div className="col-span-8 space-y-8">
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={selectedArticle.title ?? ''}
                                    onChange={(e) => setArticleField('title', e.target.value)}
                                    className={`w-full bg-transparent text-4xl font-black outline-none ${theme === 'dark' ? 'text-white placeholder:text-white/20' : 'text-black placeholder:text-black/30'
                                        }`}
                                    placeholder="Гарчиг оруулах..."
                                />
                                <div className={`h-0.5 w-full ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`} />
                            </div>

                            <div className="space-y-6">
                                {editor.blocks.map((block, i) => (
                                    <BlockEditor
                                        key={block.id}
                                        theme={theme}
                                        block={block}
                                        index={i}
                                        total={editor.blocks.length}
                                        onMove={moveBlock}
                                        onRemove={removeBlock}
                                        onUpdateContent={updateBlockContent}
                                        onUpdateSettings={updateBlockSettings}
                                    />
                                ))}
                            </div>

                            <div className={`py-10 border-2 border-dashed ${theme === 'dark' ? 'border-white/5' : 'border-black/10'} rounded-[2rem] flex flex-col items-center justify-center gap-6 group hover:border-brand-secondary/40 transition-all`}>
                                <div className="text-center space-y-1">
                                    <p className={`font-bold ${theme === 'dark' ? 'opacity-40' : 'opacity-60 text-black'} group-hover:opacity-80 transition-all`}>Блок нэмэхийн тулд / дарна уу</p>
                                    <p className={`text-[10px] ${theme === 'dark' ? 'opacity-20' : 'opacity-40 text-black'} uppercase tracking-widest`}>эсвэл доорхыг сонгоно уу</p>
                                </div>

                                <div className="flex gap-4">
                                    {[
                                        { icon: Type, type: 'text', label: 'Text' },
                                        { icon: ImageIcon, type: 'image', label: 'Image' },
                                        { icon: Quote, type: 'quote', label: 'Quote' },
                                        { icon: Video, type: 'video', label: 'Video' },
                                        { icon: LayoutGrid, type: 'course_grid', label: 'Course Grid' },
                                    ].map((btn) => (
                                        <button
                                            key={btn.type}
                                            onClick={() => addBlock(btn.type as BlockType)}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-black/10 shadow-sm'} hover:bg-brand-secondary/10 hover:border-brand-secondary/40 transition-all w-24`}
                                            type="button"
                                        >
                                            <btn.icon size={20} className="text-brand-secondary" />
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'opacity-40' : 'opacity-60 text-black'}`}>{btn.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-4 space-y-8">
                            <div className={`p-6 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-black/10 shadow-sm'} rounded-3xl border space-y-6`}>
                                <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'opacity-40' : 'opacity-60 text-black'} mb-4`}>Post Settings</h3>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase opacity-30">Category</label>
                                    <select
                                        value={selectedArticle.category ?? DEFAULT_CATEGORY}
                                        onChange={(e) => setArticleField('category', e.target.value)}
                                        className={`w-full p-3 rounded-xl border outline-none text-xs ${theme === 'dark' ? 'bg-black/20 border-white/5 text-white/80' : 'bg-black/5 border-black/10 text-black/80'
                                            }`}
                                    >
                                        <option value="Боловсрол">Боловсрол</option>
                                        <option value="Мэдээ">Мэдээ</option>
                                        <option value="Зөвлөгөө">Зөвлөгөө</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase opacity-30">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={selectedArticle.tags?.join(', ') ?? ''}
                                        onChange={(e) => setArticleField('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                                        className={`w-full p-3 rounded-xl border outline-none text-xs ${theme === 'dark' ? 'bg-black/20 border-white/5 text-white/80' : 'bg-black/5 border-black/10 text-black/80'
                                            }`}
                                        placeholder="Tech, Education, News..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase opacity-30 cursor-help" title="A short summary for the article card">Excerpt / Summary</label>
                                    <textarea
                                        value={selectedArticle.excerpt ?? ''}
                                        onChange={(e) => setArticleField('excerpt', e.target.value)}
                                        className={`w-full p-3 rounded-xl border outline-none text-xs min-h-[80px] ${theme === 'dark' ? 'bg-black/20 border-white/5 text-white/80' : 'bg-black/5 border-black/10 text-black/80'
                                            }`}
                                        placeholder="Brief summary for cards..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <ImageUpload
                                        label="Featured Image"
                                        value={selectedArticle.cover}
                                        onChange={(val) => setArticleField('cover', val)}
                                        aspectRatio="video"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase opacity-30">Status</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setStatus('published')}
                                            className={`flex-1 p-2 rounded-lg text-[10px] font-bold transition-all ${selectedArticle.status === 'published' ? 'bg-brand-secondary text-black' : theme === 'dark' ? 'bg-white/5 text-white/40 hover:text-white' : 'bg-black/5 text-black/40 hover:text-black'
                                                }`}
                                            type="button"
                                        >
                                            Published
                                        </button>
                                        <button
                                            onClick={() => setStatus('draft')}
                                            className={`flex-1 p-2 rounded-lg text-[10px] font-bold transition-all ${selectedArticle.status === 'draft' ? 'bg-brand-secondary text-black' : theme === 'dark' ? 'bg-white/5 text-white/40 hover:text-white' : 'bg-black/5 text-black/40 hover:text-black'
                                                }`}
                                            type="button"
                                        >
                                            Draft
                                        </button>
                                    </div>
                                </div>

                                <div className={`pt-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                                    <label className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'opacity-30' : 'opacity-50 text-black'} mb-2 block`}>Author</label>
                                    <select
                                        value={selectedArticle.authorId ?? ''}
                                        onChange={(e) => setArticleField('authorId', e.target.value)}
                                        className={`w-full p-3 rounded-xl border outline-none text-xs ${theme === 'dark' ? 'bg-black/20 border-white/5 text-white/80' : 'bg-black/5 border-black/10 text-black/80'
                                            }`}
                                    >
                                        {mockTeachers.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.name}
                                            </option>
                                        ))}
                                    </select>

                                    <div className={`mt-3 flex items-center gap-3 p-2 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'} rounded-xl border`}>
                                        <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center font-bold text-black text-xs">
                                            {(getAuthorName(selectedArticle.authorId)[0] ?? 'A').toUpperCase()}
                                        </div>
                                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{getAuthorName(selectedArticle.authorId)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-brand-secondary/5 rounded-3xl border border-brand-secondary/10 space-y-4">
                                <p className="text-[10px] leading-relaxed opacity-60">
                                    This article will be visible on the main homepage and the "Нийтлэл" section.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </DrawerPanel>

            <ConfirmDialog
                isOpen={deleteState.isOpen}
                onClose={closeDelete}
                onConfirm={confirmDelete}
                title="Устгах"
                message="Энэ нийтлэлийг бүрмөсөн устгахдаа итгэлтэй байна уу?"
            />
        </div>
    );
}