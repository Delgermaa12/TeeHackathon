import React, { useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { FileText, Edit3, Trash2 } from 'lucide-react';
import { mockArticles, mockTeachers } from '../../mock/adminData';
import type { Article } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';

export function ArticlesView() {
    const { theme } = useAppContext();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [articles, setArticles] = useState<Article[]>(mockArticles);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [isDrawOpen, setIsDrawOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

    const handleAdd = () => {
        setSelectedArticle(null);
        setIsDrawOpen(true);
    };

    const handleEdit = (article: Article) => {
        setSelectedArticle(article);
        setIsDrawOpen(true);
    };

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setArticleToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (articleToDelete) {
            setArticles(articles.filter(a => a.id !== articleToDelete));
            setArticleToDelete(null);
        }
    };

    const filteredArticles = articles.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter ? a.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    const columns: Column<Article>[] = [
        {
            header: 'Гарчиг',
            accessorKey: 'title',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <img src={row.cover || 'https://via.placeholder.com/80'} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="max-w-[200px] truncate font-bold" title={row.title}>{row.title}</div>
                </div>
            ),
            sortable: true
        },
        {
            header: 'Ангилал',
            accessorKey: 'category',
            cell: ({ row }) => <span className={`text-xs px-2 py-1 rounded bg-black/5 ${theme === 'dark' ? 'bg-white/5' : ''}`}>{row.category}</span>
        },
        {
            header: 'Зохиогч',
            accessorKey: 'authorId',
            cell: ({ row }) => {
                const author = mockTeachers.find(t => t.id === row.authorId);
                return author ? author.name : '-';
            }
        },
        {
            header: 'Огноо',
            accessorKey: 'publishedDate',
            cell: ({ row }) => <span className="text-xs">{row.publishedDate ? new Date(row.publishedDate).toLocaleDateString() : '-'}</span>,
            sortable: true
        },
        {
            header: 'Статус',
            accessorKey: 'status',
            cell: ({ row }) => <StatusBadge status={row.status} />
        },
        {
            header: 'Үйлдэл',
            accessorKey: 'id',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(row); }} className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-white/5 text-white/40 hover:text-white' : 'border-black/5 hover:bg-black/5 text-black/40 hover:text-black'}`}>
                        <Edit3 size={14} />
                    </button>
                    <button onClick={(e) => handleDeleteClick(row.id, e)} className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500' : 'border-black/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500'}`}>
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title="Нийтлэлүүд"
                description="Сайт дээрх мэдээ, зөвлөгөө, нийтлэлүүдийн удирдлага"
                icon={FileText}
                actionLabel="Шинэ нийтлэл"
                onAction={handleAdd}
            />

            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder="Гарчгаар хайх..."
                filters={[{
                    key: 'status',
                    label: 'Статус',
                    value: statusFilter,
                    onChange: setStatusFilter,
                    options: [{ label: 'Нийтлэгдсэн', value: 'published' }, { label: 'Ноорог', value: 'draft' }]
                }]}
            />

            <DataTable columns={columns} data={filteredArticles} onRowClick={handleEdit} />

            <DrawerPanel
                isOpen={isDrawOpen}
                onClose={() => setIsDrawOpen(false)}
                title={selectedArticle ? 'Нийтлэл засах' : 'Шинэ нийтлэл'}
                footer={
                    <>
                        <button onClick={() => setIsDrawOpen(false)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60' : 'border-black/10 hover:bg-black/5 text-black/60'}`}>Цуцлах</button>
                        <button onClick={() => setIsDrawOpen(false)} className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-secondary text-black shadow-md hover:brightness-105 transition-all">Хадгалах</button>
                    </>
                }
            >
                <form className="space-y-5">
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Гарчиг</label>
                        <input type="text" defaultValue={selectedArticle?.title} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Ковер зураг (URL)</label>
                        <input type="text" defaultValue={selectedArticle?.cover} placeholder="https://..." className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none text-xs`} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Ангилал</label>
                            <select defaultValue={selectedArticle?.category || 'Мэдээ'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                <option value="Мэдээ">Мэдээ</option>
                                <option value="Зөвлөгөө">Зөвлөгөө</option>
                                <option value="Боловсрол">Боловсрол</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Статус</label>
                            <select defaultValue={selectedArticle?.status || 'draft'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                <option value="draft">Ноорог</option>
                                <option value="published">Нийтлэх</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Агуулга</label>
                        <textarea rows={8} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none text-sm leading-relaxed`} placeholder="Нийтлэлийн дэлгэрэнгүй агуулга..." />
                    </div>
                </form>
            </DrawerPanel>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Нийтлэл устгах"
                message="Та энэ нийтлэлийг устгахдаа итгэлтэй байна уу? Системээс бүр мөсөн устах болно."
            />
        </div>
    );
}
