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
  Eye,
} from 'lucide-react';
import type { Article, ArticleBlock, BlockType, Teacher } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';
import { useDataContext } from '../../context/DataContext';
import { useAlertContext } from '../../context/AlertContext';

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
  | { type: 'UPDATE_ARTICLE_FIELD'; payload: { key: keyof Article; value: unknown } }
  | { type: 'ADD_BLOCK'; payload: { blockType: BlockType } }
  | { type: 'REMOVE_BLOCK'; payload: { id: string } }
  | { type: 'UPDATE_BLOCK_CONTENT'; payload: { id: string; content: unknown } }
  | { type: 'UPDATE_BLOCK_SETTINGS'; payload: { id: string; settings: unknown } }
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
        settings: {
          showPreview: true,
          buttonText: 'Үзэх',
          ribbonText: '',
          duration: '',
        },
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
      return {
        ...state,
        article: {
          ...state.article,
          [key]: value,
          updatedAt: new Date().toISOString(),
        },
      };
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
      const next = state.blocks.map((b) =>
        b.id === action.payload.id ? { ...b, content: action.payload.content } : b,
      );
      return { ...state, blocks: next };
    }

    case 'UPDATE_BLOCK_SETTINGS': {
      const next = state.blocks.map((b) =>
        b.id === action.payload.id ? { ...b, settings: action.payload.settings } : b,
      );
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

function getAuthorName(authorId: string, teachers: Teacher[]) {
  return teachers.find((t) => t.id === authorId)?.name || 'Систем';
}

function safePlainText(text: string): string {
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
      <div className="absolute right-4 top-4 z-10 flex items-center gap-1 opacity-0 transition-all group-hover:opacity-100">
        <button
          onClick={onMoveUp}
          disabled={disableUp}
          aria-label="Move block up"
          title="Move block up"
          className={`p-1.5 rounded-lg ${
            theme === 'dark'
              ? 'hover:bg-white/10 text-white/40 hover:text-white'
              : 'hover:bg-black/10 text-black/40 hover:text-black'
          } disabled:opacity-0`}
          type="button"
        >
          <ChevronUp size={14} aria-hidden="true" />
        </button>

        <button
          onClick={onMoveDown}
          disabled={disableDown}
          aria-label="Move block down"
          title="Move block down"
          className={`p-1.5 rounded-lg ${
            theme === 'dark'
              ? 'hover:bg-white/10 text-white/40 hover:text-white'
              : 'hover:bg-black/10 text-black/40 hover:text-black'
          } disabled:opacity-0`}
          type="button"
        >
          <ChevronDown size={14} aria-hidden="true" />
        </button>

        <button
          onClick={onRemove}
          aria-label="Remove block"
          title="Remove block"
          className="p-1.5 rounded-lg text-red-500/60 hover:bg-red-500/20 hover:text-red-500"
          type="button"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2 opacity-40 transition-all group-hover:opacity-100">
        <div className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
          <GripVertical size={14} aria-hidden="true" />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          {type}
        </span>
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
  onUpdateContent: (id: string, content: unknown) => void;
  onUpdateSettings: (id: string, settings: unknown) => void;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div
      className={`group relative rounded-2xl border p-4 transition-all ${
        theme === 'dark'
          ? 'bg-white/5 border-white/5 hover:border-brand-accent/30'
          : 'bg-black/5 border-black/5 hover:border-brand-accent/30'
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
          aria-label="Text block content"
          value={safePlainText(block.content as string)}
          onChange={(e) => onUpdateContent(block.id, e.target.value)}
          className={`w-full min-h-[120px] shrink-0 rounded bg-transparent p-2 outline-none ${
            theme === 'dark' ? 'text-white/80' : 'text-black/80'
          }`}
          placeholder="Бичвэр оруулах..."
        />
      )}

      {block.type === 'quote' && (
        <div className="space-y-3">
          <textarea
            aria-label="Quote text"
            value={safePlainText((block.content as { text?: string })?.text ?? '')}
            onChange={(e) =>
              onUpdateContent(block.id, {
                ...(block.content as object),
                text: e.target.value,
              })
            }
            className={`w-full border-l-4 border-brand-accent p-3 italic outline-none ${
              theme === 'dark' ? 'text-white/80' : 'text-black/80'
            } bg-transparent`}
            placeholder="Ишлэл..."
            rows={2}
          />

          <input
            type="text"
            aria-label="Quote author"
            value={safePlainText((block.content as { author?: string })?.author ?? '')}
            onChange={(e) =>
              onUpdateContent(block.id, {
                ...(block.content as object),
                author: e.target.value,
              })
            }
            className={`w-full bg-transparent px-3 text-xs outline-none opacity-80 ${
              theme === 'dark' ? 'text-white/70' : 'text-black/70'
            }`}
            placeholder="Зохиогч..."
          />
        </div>
      )}

      {block.type === 'video' && (
        <div className="space-y-3">
          <div
            className={`flex items-center gap-2 rounded-xl border p-2 ${
              theme === 'dark' ? 'bg-black/20 border-white/5' : 'bg-black/5 border-black/10'
            }`}
          >
            <Video size={16} className="text-brand-accent" aria-hidden="true" />
            <input
              type="text"
              aria-label="Video URL"
              value={safePlainText((block.content as { url?: string })?.url ?? '')}
              onChange={(e) =>
                onUpdateContent(block.id, {
                  ...(block.content as object),
                  url: e.target.value,
                })
              }
              className={`flex-1 bg-transparent text-xs outline-none ${
                theme === 'dark' ? 'text-white/80' : 'text-black/80'
              }`}
              placeholder="Video URL (YouTube/Vimeo)..."
            />
          </div>

          {Boolean((block.content as { url?: string })?.url) && (
            <div
              className={`aspect-video rounded-xl border overflow-hidden flex items-center justify-center ${
                theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-black/10 border-black/10'
              }`}
            >
              <PlayCircle
                size={40}
                className={theme === 'dark' ? 'text-white/20' : 'text-black/20'}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      )}

      {block.type === 'course_grid' && (
        <div className="space-y-4">
          <input
            type="text"
            aria-label="Course grid title"
            value={safePlainText((block.content as { title?: string })?.title ?? '')}
            onChange={(e) =>
              onUpdateContent(block.id, {
                ...(block.content as object),
                title: e.target.value,
              })
            }
            className={`w-full border-b bg-transparent p-2 font-bold outline-none ${
              theme === 'dark' ? 'border-white/10 text-white/90' : 'border-black/10 text-black/90'
            }`}
            placeholder="Grid Title (e.g. Recommended Courses)"
          />

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label htmlFor={`course-duration-${block.id}`} className="opacity-40 text-[9px] uppercase font-bold">
                Duration Text
              </label>
              <input
                id={`course-duration-${block.id}`}
                type="text"
                aria-label="Course duration text"
                value={safePlainText((block.settings as { duration?: string })?.duration ?? '')}
                onChange={(e) =>
                  onUpdateSettings(block.id, {
                    ...(block.settings as object),
                    duration: e.target.value,
                  })
                }
                className={`w-full rounded-lg p-2 outline-none ${
                  theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'
                }`}
                placeholder="24 hours"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor={`course-button-${block.id}`} className="opacity-40 text-[9px] uppercase font-bold">
                Button Text
              </label>
              <input
                id={`course-button-${block.id}`}
                type="text"
                aria-label="Course button text"
                value={safePlainText((block.settings as { buttonText?: string })?.buttonText ?? 'Үзэх')}
                onChange={(e) =>
                  onUpdateSettings(block.id, {
                    ...(block.settings as object),
                    buttonText: e.target.value,
                  })
                }
                className={`w-full rounded-lg p-2 outline-none ${
                  theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <label htmlFor={`show-preview-${block.id}`} className="flex cursor-pointer items-center gap-2">
              <input
                id={`show-preview-${block.id}`}
                type="checkbox"
                checked={Boolean((block.settings as { showPreview?: boolean })?.showPreview)}
                onChange={(e) =>
                  onUpdateSettings(block.id, {
                    ...(block.settings as object),
                    showPreview: e.target.checked,
                  })
                }
                className="accent-brand-accent"
              />
              <span className="opacity-60">Enable Video Preview</span>
            </label>

            <div className="flex flex-1 items-center gap-2">
              <label htmlFor={`ribbon-text-${block.id}`} className="opacity-40 text-[9px] uppercase font-bold">
                Ribbon
              </label>
              <input
                id={`ribbon-text-${block.id}`}
                type="text"
                aria-label="Ribbon text"
                value={safePlainText((block.settings as { ribbonText?: string })?.ribbonText ?? '')}
                onChange={(e) =>
                  onUpdateSettings(block.id, {
                    ...(block.settings as object),
                    ribbonText: e.target.value,
                  })
                }
                className={`flex-1 rounded-lg p-2 outline-none ${
                  theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'
                }`}
                placeholder="New"
              />
            </div>
          </div>

          <div
            className={`flex items-center justify-between rounded-xl border p-3 ${
              theme === 'dark'
                ? 'bg-brand-accent/5 border-brand-accent/10'
                : 'bg-brand-accent/10 border-brand-accent/20'
            }`}
          >
            <span className="text-[10px] opacity-60">
              Selected Courses:{' '}
              {Array.isArray((block.content as { courseIds?: string[] })?.courseIds)
                ? ((block.content as { courseIds?: string[] }).courseIds?.length ?? 0)
                : 0}
            </span>

            <button
              className="text-[10px] font-bold text-brand-accent"
              type="button"
              aria-label="Select courses"
              title="Select courses"
            >
              Select Courses
            </button>
          </div>
        </div>
      )}

      {block.type === 'image' && (
        <div className="space-y-3">
          <ImageUpload
            label="Зураг"
            value={(block.content as { url?: string })?.url}
            onChange={(val:string) =>
              onUpdateContent(block.id, {
                ...(block.content as object),
                url: val,
              })
            }
            aspectRatio="video"
          />

          <input
            type="text"
            aria-label="Image caption"
            value={safePlainText((block.content as { caption?: string })?.caption ?? '')}
            onChange={(e) =>
              onUpdateContent(block.id, {
                ...(block.content as object),
                caption: e.target.value,
              })
            }
            className={`w-full rounded-xl p-3 text-xs outline-none ${
              theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'
            }`}
            placeholder="Caption..."
          />

          {Boolean((block.content as { url?: string })?.url) &&
            isValidHttpUrl((block.content as { url?: string }).url ?? '') && (
              <img
                src={(block.content as { url?: string }).url}
                alt=""
                className={`h-40 w-full rounded-xl border object-cover ${
                  theme === 'dark' ? 'border-white/10' : 'border-black/10'
                }`}
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
  teachers,
}: {
  theme: string;
  article: Article;
  teachers: Teacher[];
}) {
  return (
    <div className="flex items-center justify-center rounded-[3rem] bg-black/5 py-20">
      <div
        className={`group w-[400px] overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-500 ${
          theme === 'dark'
            ? 'bg-black/40 border-white/5 shadow-black'
            : 'bg-white/70 border-black/5 shadow-black/5'
        }`}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={article.cover || 'https://via.placeholder.com/800x600?text=No+Cover'}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700"
          />
          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            <Clock size={12} className="text-[#eab308]" aria-hidden="true" />
            12 min read
          </div>
        </div>

        <div className="space-y-4 p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#eab308]">
              {article.category}
            </span>
            {article.tags?.map((tag, idx) => (
              <span
                key={idx}
                className={`rounded-md px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'bg-white/10 text-white/50' : 'bg-black/5 text-black/50'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          <h3
            className={`text-xl md:text-2xl font-black leading-tight tracking-tight transition-colors group-hover:text-[#eab308] ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {article.title || 'Untitled Article'}
          </h3>

          <div className="flex items-center gap-4">
            <p
              className={`line-clamp-2 text-sm leading-relaxed opacity-60 ${
                theme === 'dark' ? 'text-white/70' : 'text-black/70'
              }`}
            >
              {article.excerpt || 'No excerpt provided...'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`flex items-center gap-1.5 text-[10px] font-medium ${
                theme === 'dark' ? 'text-white/40' : 'text-black/40'
              }`}
            >
              <Eye size={12} className="text-[#eab308]" aria-hidden="true" /> {article.views} views
            </span>
          </div>

          <div
            className={`flex items-center justify-between border-t pt-6 ${
              theme === 'dark' ? 'border-white/5' : 'border-black/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eab308]/20">
                <User size={14} className="text-[#eab308]" aria-hidden="true" />
              </div>

              <div className="flex flex-col text-left">
                <span className={`text-[10px] font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {getAuthorName(article.authorId, teachers)}
                </span>
                <span className="text-[9px] uppercase tracking-tighter opacity-40">
                  {new Date(article.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eab308]/30 text-[#eab308]">
              <ArrowRight size={18} aria-hidden="true" />
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
  teachers,
}: {
  theme: string;
  article: Article;
  blocks: ArticleBlock[];
  teachers: Teacher[];
}) {
  return (
    <div className="animate-in fade-in duration-500 mx-auto max-w-5xl space-y-0 overflow-hidden rounded-[3rem] py-0">
      <header className="relative flex h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={article.cover || 'https://via.placeholder.com/1920x1080?text=No+Cover'}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              theme === 'dark'
                ? 'bg-black/50'
                : 'bg-white/50'
            }`}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-8 px-6 text-center">
          <div className="flex justify-center">
            <span className="rounded-full border-2 border-[#eab308]/30 bg-[#eab308]/20 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-[#eab308] backdrop-blur-3xl">
              {article.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white">
            {article.title?.trim() ? article.title : 'Гарчиггүй нийтлэл'}
          </h1>

          <div className="flex items-center justify-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-white">
            <div className="flex items-center gap-2">
              <User size={16} className="text-[#eab308]" aria-hidden="true" /> {getAuthorName(article.authorId, teachers)}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#eab308]" aria-hidden="true" />{' '}
              {new Date(article.updatedAt ?? Date.now()).toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-20 -mt-20 px-6 pb-20">
        <div
          className={`mx-auto max-w-4xl rounded-[4rem] border-2 p-12 md:p-20 shadow-2xl shadow-[#eab308]/5 backdrop-blur-3xl ${
            theme === 'dark' ? 'bg-[#050505]/90 border-white/5' : 'bg-white/95 border-black/5'
          }`}
        >
          {article.excerpt && (
            <p
              className={`mb-16 border-l-[12px] border-[#eab308] pl-10 text-2xl md:text-3xl font-black italic leading-tight opacity-90 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              {article.excerpt}
            </p>
          )}

          <div className="space-y-12">
            {blocks.map((block) => (
              <div key={block.id}>
                {block.type === 'text' && (
                  <div
                    className={`whitespace-pre-wrap text-xl font-medium leading-[1.8] ${
                      theme === 'dark' ? 'text-white/80' : 'text-black/80'
                    }`}
                  >
                    {safePlainText(block.content as string)}
                  </div>
                )}

                {block.type === 'quote' && (
                  <blockquote
                    className={`relative rounded-[2rem] border p-10 ${
                      theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                    }`}
                  >
                    <Quote size={40} className="absolute -top-4 -left-4 text-brand-accent opacity-40" aria-hidden="true" />
                    <p className={`${theme === 'dark' ? 'text-white/90' : 'text-black/90'} text-2xl font-serif italic leading-relaxed`}>
                      “{safePlainText((block.content as { text?: string })?.text ?? '')}”
                    </p>
                    <footer className="mt-6 flex items-center gap-3">
                      <div className="h-0.5 w-8 bg-brand-accent/40" />
                      <cite className="text-brand-accent not-italic text-sm font-bold uppercase tracking-widest">
                        — {safePlainText((block.content as { author?: string })?.author ?? '')}
                      </cite>
                    </footer>
                  </blockquote>
                )}

                {block.type === 'image' &&
                  (block.content as { url?: string })?.url &&
                  isValidHttpUrl((block.content as { url?: string }).url ?? '') && (
                    <figure className="space-y-4">
                      <img
                        src={(block.content as { url?: string }).url}
                        alt=""
                        className="w-full rounded-[2rem] shadow-xl"
                      />
                      {(block.content as { caption?: string })?.caption ? (
                        <figcaption className="text-center text-xs italic opacity-50">
                          {safePlainText((block.content as { caption?: string }).caption ?? '')}
                        </figcaption>
                      ) : null}
                    </figure>
                  )}

                {block.type === 'video' && (
                  <div
                    className={`aspect-video rounded-[2rem] border flex items-center justify-center overflow-hidden shadow-2xl ${
                      theme === 'dark' ? 'bg-black border-white/10' : 'bg-black/10 border-black/10'
                    }`}
                  >
                    <PlayCircle size={60} className="text-brand-accent opacity-20" aria-hidden="true" />
                  </div>
                )}

                {block.type === 'course_grid' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className={`flex items-center gap-3 text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        <div className="rounded-lg bg-brand-accent/10 p-2 text-brand-accent">
                          <LayoutGrid size={20} aria-hidden="true" />
                        </div>
                        {safePlainText((block.content as { title?: string })?.title ?? '')}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className={`group relative space-y-3 overflow-hidden rounded-2xl border p-4 ${
                            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                          }`}
                        >
                          {(block.settings as { ribbonText?: string })?.ribbonText ? (
                            <div className="absolute top-4 right-4 z-10 rounded-md bg-brand-accent px-2 py-1 text-[8px] font-black uppercase">
                              {safePlainText((block.settings as { ribbonText?: string }).ribbonText ?? '')}
                            </div>
                          ) : null}

                          <div className={`h-32 animate-pulse rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`} />
                          <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Course Item {i}</h4>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[10px] opacity-60">
                              <Clock size={12} aria-hidden="true" />{' '}
                              {safePlainText((block.settings as { duration?: string })?.duration ?? '12 sections')}
                            </div>

                            <button
                              className="rounded-lg bg-brand-accent/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-accent transition-all hover:bg-brand-accent hover:text-black"
                              type="button"
                            >
                              {safePlainText((block.settings as { buttonText?: string })?.buttonText ?? 'Үзэх')}
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
  const { articles, teachers, addArticle, updateArticle, deleteArticle } = useDataContext();
  const { showAlert } = useAlertContext();
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
      authorId: teachers[0]?.id || '',
      category: DEFAULT_CATEGORY,
      blocks: [],
      views: 0,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
      cover: '',
    };

    dispatch({ type: 'OPEN_NEW', payload: { article: next } });
  }, [teachers]);

  const handleEdit = useCallback((article: Article) => {
    dispatch({ type: 'OPEN_EDIT', payload: { article } });
  }, []);

  const openDeleteDialog = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteState({ isOpen: true, articleId: id });
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteState.articleId) {
      deleteArticle(deleteState.articleId);
      showAlert('Нийтлэл амжилттай устгагдлаа', 'success');
    }
    setDeleteState({ isOpen: false, articleId: null });
  }, [deleteState.articleId, deleteArticle, showAlert]);

  const closeDelete = useCallback(() => setDeleteState({ isOpen: false, articleId: null }), []);
  const onCloseEditor = useCallback(() => dispatch({ type: 'CLOSE' }), []);

  const onPublish = useCallback(() => {
    if (!editor.article) return;

    const updated: Article = {
      ...editor.article,
      blocks: normalizeBlocks(editor.blocks),
      status: 'published',
      updatedAt: new Date().toISOString(),
    };

    const exists = articles.some((a) => a.id === updated.id);
    if (exists) {
      updateArticle(updated.id, updated);
      showAlert('Нийтлэл амжилттай шинэчлэгдлээ', 'success');
    } else {
      addArticle(updated);
      showAlert('Нийтлэл амжилттай нийтлэгдлээ', 'success');
    }

    dispatch({ type: 'CLOSE' });
  }, [editor.article, editor.blocks, articles, updateArticle, addArticle, showAlert]);

  const columns: Column<Article>[] = useMemo(
    () => [
      {
        header: 'Нийтлэл',
        accessorKey: 'title',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div
              className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
              }`}
            >
              {row.cover && isValidHttpUrl(row.cover) ? (
                <img src={row.cover} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center opacity-30">
                  <ImageIcon size={16} aria-hidden="true" />
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-col">
              <span className="max-w-[200px] truncate font-bold">{row.title}</span>
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
            <span className="font-bold text-brand-accent">{row.category}</span>
            <div className="flex flex-wrap gap-1">
              {row.tags?.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className={`rounded px-1 text-[8px] uppercase tracking-tighter ${
                    theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/50'
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ),
      },
      {
        header: 'Зохиогч',
        accessorKey: 'authorId',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
              <User size={10} aria-hidden="true" />
            </div>
            <span className="max-w-[100px] truncate text-xs">{getAuthorName(row.authorId, teachers)}</span>
          </div>
        ),
      },
      {
        header: 'Үзсэн',
        accessorKey: 'views',
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 font-medium opacity-50">
            <Eye size={12} className="text-brand-accent" aria-hidden="true" />
            <span>{(row.views ?? 0).toLocaleString()}</span>
          </div>
        ),
      },
      {
        header: 'Статус',
        accessorKey: 'status',
        cell: ({ row }) => <StatusBadge status={row.status} />,
      },
      {
        header: 'Үйлдэл',
        accessorKey: 'id',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit(row)}
              aria-label={`Edit article ${row.title || ''}`}
              title="Edit article"
              className={`rounded-lg border p-1.5 transition-all ${
                theme === 'dark'
                  ? 'border-white/5 hover:bg-white/5 text-white/40 hover:text-white'
                  : 'border-black/5 hover:bg-black/5 text-black/40 hover:text-black'
              }`}
              type="button"
            >
              <Edit3 size={14} aria-hidden="true" />
            </button>

            <button
              onClick={(e) => openDeleteDialog(row.id, e)}
              aria-label={`Delete article ${row.title || ''}`}
              title="Delete article"
              className={`rounded-lg border p-1.5 transition-all ${
                theme === 'dark'
                  ? 'border-white/5 hover:bg-red-500/10 text-red-500/60'
                  : 'border-black/5 hover:bg-red-500/10 text-red-500/60'
              }`}
              type="button"
            >
              <Trash2 size={14} aria-hidden="true" />
            </button>
          </div>
        ),
      },
    ],
    [theme, handleEdit, openDeleteDialog, teachers],
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

  const removeBlock = useCallback(
    (id: string) => dispatch({ type: 'REMOVE_BLOCK', payload: { id } }),
    [],
  );

  const moveBlock = useCallback(
    (id: string, direction: 'up' | 'down') => dispatch({ type: 'MOVE_BLOCK', payload: { id, direction } }),
    [],
  );

  const updateBlockContent = useCallback(
    (id: string, content: unknown) => dispatch({ type: 'UPDATE_BLOCK_CONTENT', payload: { id, content } }),
    [],
  );

  const updateBlockSettings = useCallback(
    (id: string, settings: unknown) => dispatch({ type: 'UPDATE_BLOCK_SETTINGS', payload: { id, settings } }),
    [],
  );

  const setArticleField = useCallback((key: keyof Article, value: unknown) => {
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
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleEdit(article)}
              className={`group cursor-pointer overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-black/40 border-white/5 hover:border-brand-accent/30'
                  : 'bg-white border-black/5 hover:border-brand-accent/30 shadow-sm'
              }`}
            >
              <div className="relative aspect-video overflow-hidden">
                {article.cover && isValidHttpUrl(article.cover) ? (
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className={`flex h-full w-full items-center justify-center ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                    <ImageIcon size={32} className="opacity-20" aria-hidden="true" />
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <StatusBadge status={article.status} />
                </div>
              </div>

              <div className="space-y-3 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                    {article.category}
                  </span>

                  {article.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`rounded-md px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider ${
                        theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/50'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-1 text-[10px] font-medium ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                    <Clock size={10} aria-hidden="true" /> {new Date(article.updatedAt).toLocaleDateString()}
                  </span>

                  <span className={`flex items-center gap-1 text-[10px] font-medium ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                    <Eye size={10} aria-hidden="true" /> {article.views}
                  </span>
                </div>

                <h3
                  className={`line-clamp-2 font-bold leading-snug transition-colors group-hover:text-brand-accent ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                >
                  {article.title || 'Гарчиггүй'}
                </h3>

                <div
                  className={`flex items-center justify-between border-t pt-2 ${
                    theme === 'dark' ? 'border-white/5' : 'border-black/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                      <User size={12} aria-hidden="true" />
                    </div>
                    <span className={`text-[10px] font-bold ${theme === 'dark' ? 'opacity-60' : 'opacity-80 text-black/70'}`}>
                      {getAuthorName(article.authorId, teachers)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(article);
                      }}
                      aria-label={`Edit article ${article.title || ''}`}
                      title="Edit article"
                      className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'} transition-colors`}
                      type="button"
                    >
                      <Edit3 size={14} aria-hidden="true" />
                    </button>

                    <button
                      onClick={(e) => openDeleteDialog(article.id, e)}
                      aria-label={`Delete article ${article.title || ''}`}
                      title="Delete article"
                      className="text-red-500/40 transition-colors hover:text-red-500"
                      type="button"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="col-span-full py-20 text-center font-bold opacity-30">Илэрц олдсонгүй</div>
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
            <div className={`flex ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-xl p-1`}>
              <button
                onClick={() => setEditorMode('edit')}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                  editor.mode === 'edit'
                    ? 'bg-brand-accent text-black shadow-lg'
                    : theme === 'dark'
                    ? 'text-white/40 hover:text-white'
                    : 'text-black/40 hover:text-black'
                }`}
                type="button"
              >
                Editor
              </button>

              <button
                onClick={() => setEditorMode('preview')}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                  editor.mode === 'preview'
                    ? 'bg-brand-accent text-black shadow-lg'
                    : theme === 'dark'
                    ? 'text-white/40 hover:text-white'
                    : 'text-black/40 hover:text-black'
                }`}
                type="button"
              >
                Full Preview
              </button>

              <button
                onClick={() => setEditorMode('card')}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                  editor.mode === 'card'
                    ? 'bg-brand-accent text-black shadow-lg'
                    : theme === 'dark'
                    ? 'text-white/40 hover:text-white'
                    : 'text-black/40 hover:text-black'
                }`}
                type="button"
              >
                Card Preview
              </button>
            </div>
          </div>
        }
        footer={
          <div className="flex w-full items-center justify-between">
            <div className={`flex items-center gap-4 text-xs ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
              <Settings2 size={16} aria-hidden="true" /> Auto-saving enabled
            </div>

            <div className="flex gap-3">
              <button
                onClick={onCloseEditor}
                className={`rounded-xl border px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${
                  theme === 'dark'
                    ? 'border-white/10 hover:bg-white/5 text-white/60'
                    : 'border-black/10 hover:bg-black/5 text-black/60'
                }`}
                type="button"
              >
                Цуцлах
              </button>

              <button
                onClick={onPublish}
                className="rounded-xl bg-brand-accent px-8 py-2.5 text-xs font-black uppercase tracking-widest text-black shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all hover:brightness-105"
                type="button"
              >
                Нийтлэх
              </button>
            </div>
          </div>
        }
      >
        {!selectedArticle ? null : editor.mode === 'preview' ? (
          <ArticlePreview theme={theme} article={selectedArticle} blocks={editor.blocks} teachers={teachers} />
        ) : editor.mode === 'card' ? (
          <ArticleCardPreview theme={theme} article={selectedArticle} teachers={teachers} />
        ) : (
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-8 space-y-8">
              <div className="space-y-4">
                <input
                  type="text"
                  aria-label="Article title"
                  value={selectedArticle.title ?? ''}
                  onChange={(e) => setArticleField('title', e.target.value)}
                  className={`w-full bg-transparent text-4xl font-black outline-none ${
                    theme === 'dark'
                      ? 'text-white placeholder:text-white/20'
                      : 'text-black placeholder:text-black/30'
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

              <div
                className={`group flex flex-col items-center justify-center gap-6 rounded-[2rem] border-2 border-dashed py-10 transition-all ${
                  theme === 'dark' ? 'border-white/5' : 'border-black/10'
                } hover:border-brand-accent/40`}
              >
                <div className="space-y-1 text-center">
                  <p
                    className={`font-bold transition-all ${
                      theme === 'dark' ? 'opacity-40' : 'opacity-60 text-black'
                    } group-hover:opacity-80`}
                  >
                    Блок нэмэхийн тулд / дарна уу
                  </p>
                  <p className={`text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'opacity-20' : 'opacity-40 text-black'}`}>
                    эсвэл доорхыг сонгоно уу
                  </p>
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
                      className={`flex w-24 flex-col items-center gap-2 rounded-2xl p-4 transition-all hover:bg-brand-accent/10 hover:border-brand-accent/40 ${
                        theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-black/10 shadow-sm'
                      }`}
                      type="button"
                    >
                      <btn.icon size={20} className="text-brand-accent" aria-hidden="true" />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'opacity-40' : 'opacity-60 text-black'}`}>
                        {btn.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-4 space-y-8">
              <div
                className={`rounded-3xl border p-6 space-y-6 ${
                  theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-black/10 shadow-sm'
                }`}
              >
                <h3 className={`mb-4 text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'opacity-40' : 'opacity-60 text-black'}`}>
                  Post Settings
                </h3>

                <div className="space-y-2">
                  <label
                    htmlFor="article-category"
                    className={`block text-[10px] font-bold uppercase ${theme === 'dark' ? 'opacity-30' : 'opacity-50 text-black'}`}
                  >
                    Category
                  </label>

                  <select
                    id="article-category"
                    aria-label="Article category"
                    value={selectedArticle.category ?? DEFAULT_CATEGORY}
                    onChange={(e) => setArticleField('category', e.target.value)}
                    className={`w-full rounded-xl border p-3 text-xs outline-none ${
                      theme === 'dark'
                        ? 'bg-black/20 border-white/5 text-white/80'
                        : 'bg-black/5 border-black/10 text-black/80'
                    }`}
                  >
                    <option value="Боловсрол">Боловсрол</option>
                    <option value="Мэдээ">Мэдээ</option>
                    <option value="Зөвлөгөө">Зөвлөгөө</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="article-tags"
                    className={`block text-[10px] font-bold uppercase ${theme === 'dark' ? 'opacity-30' : 'opacity-50 text-black'}`}
                  >
                    Tags (comma separated)
                  </label>

                  <input
                    id="article-tags"
                    type="text"
                    aria-label="Article tags"
                    value={selectedArticle.tags?.join(', ') ?? ''}
                    onChange={(e) =>
                      setArticleField(
                        'tags',
                        e.target.value
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean),
                      )
                    }
                    className={`w-full rounded-xl border p-3 text-xs outline-none ${
                      theme === 'dark'
                        ? 'bg-black/20 border-white/5 text-white/80'
                        : 'bg-black/5 border-black/10 text-black/80'
                    }`}
                    placeholder="Tech, Education, News..."
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="article-excerpt"
                    className={`block cursor-help text-[10px] font-bold uppercase ${theme === 'dark' ? 'opacity-30' : 'opacity-50 text-black'}`}
                    title="A short summary for the article card"
                  >
                    Excerpt / Summary
                  </label>

                  <textarea
                    id="article-excerpt"
                    aria-label="Article excerpt"
                    value={selectedArticle.excerpt ?? ''}
                    onChange={(e) => setArticleField('excerpt', e.target.value)}
                    className={`min-h-[80px] w-full rounded-xl border p-3 text-xs outline-none ${
                      theme === 'dark'
                        ? 'bg-black/20 border-white/5 text-white/80'
                        : 'bg-black/5 border-black/10 text-black/80'
                    }`}
                    placeholder="Brief summary for cards..."
                  />
                </div>

                <div className="space-y-2">
                  <ImageUpload
                    label="Featured Image"
                    value={selectedArticle.cover}
                    onChange={(val:string) => setArticleField('cover', val)}
                    aspectRatio="video"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className={`block text-[10px] font-bold uppercase ${theme === 'dark' ? 'opacity-30' : 'opacity-50 text-black'}`}
                  >
                    Status
                  </label>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setStatus('published')}
                      className={`flex-1 rounded-lg p-2 text-[10px] font-bold transition-all ${
                        selectedArticle.status === 'published'
                          ? 'bg-brand-accent text-black'
                          : theme === 'dark'
                          ? 'bg-white/5 text-white/40 hover:text-white'
                          : 'bg-black/5 text-black/40 hover:text-black'
                      }`}
                      type="button"
                    >
                      Published
                    </button>

                    <button
                      onClick={() => setStatus('draft')}
                      className={`flex-1 rounded-lg p-2 text-[10px] font-bold transition-all ${
                        selectedArticle.status === 'draft'
                          ? 'bg-brand-accent text-black'
                          : theme === 'dark'
                          ? 'bg-white/5 text-white/40 hover:text-white'
                          : 'bg-black/5 text-black/40 hover:text-black'
                      }`}
                      type="button"
                    >
                      Draft
                    </button>
                  </div>
                </div>

                <div className={`border-t pt-4 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                  <label
                    htmlFor="article-author"
                    className={`mb-2 block text-[10px] font-bold uppercase ${theme === 'dark' ? 'opacity-30' : 'opacity-50 text-black'}`}
                  >
                    Author
                  </label>

                  <select
                    id="article-author"
                    aria-label="Article author"
                    value={selectedArticle.authorId ?? ''}
                    onChange={(e) => setArticleField('authorId', e.target.value)}
                    className={`w-full rounded-xl border p-3 text-xs outline-none ${
                      theme === 'dark'
                        ? 'bg-black/20 border-white/5 text-white/80'
                        : 'bg-black/5 border-black/10 text-black/80'
                    }`}
                  >
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>

                  <div
                    className={`mt-3 flex items-center gap-3 rounded-xl border p-2 ${
                      theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'
                    }`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-black">
                      {(getAuthorName(selectedArticle.authorId, teachers)[0] ?? 'A').toUpperCase()}
                    </div>
                    <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {getAuthorName(selectedArticle.authorId, teachers)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-brand-accent/10 bg-brand-accent/5 p-6">
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