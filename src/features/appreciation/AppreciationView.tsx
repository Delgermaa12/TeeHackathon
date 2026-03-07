import React, { useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { type ViewMode } from '../../components/admin/ViewModeToggle';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { Heart, Star, StarOff, CheckCircle, XCircle, Trash2, Eye, Quote, Clock, User } from 'lucide-react';
import { mockAppreciations, mockTeachers, mockPrograms, mockTrainings } from '../../mock/adminData';
import type { Appreciation } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';

export function AppreciationView() {
    const { theme } = useAppContext();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const [appreciations, setAppreciations] = useState<Appreciation[]>(mockAppreciations);
    const [selectedAppreciation, setSelectedAppreciation] = useState<Appreciation | null>(null);
    const [isDrawOpen, setIsDrawOpen] = useState(false);

    // Delete Dialog state
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const handleView = (appr: Appreciation) => {
        setSelectedAppreciation(appr);
        setIsDrawOpen(true);
    };

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setItemToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            setAppreciations(appreciations.filter(a => a.id !== itemToDelete));
            setItemToDelete(null);
            setIsDrawOpen(false);
        }
    };

    const toggleFeatured = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setAppreciations(appreciations.map(a => a.id === id ? { ...a, featured: !a.featured } : a));
        if (selectedAppreciation?.id === id) {
            setSelectedAppreciation({ ...selectedAppreciation, featured: !selectedAppreciation.featured });
        }
    };

    const updateStatus = (id: string, newStatus: 'approved' | 'rejected' | 'pending') => {
        setAppreciations(appreciations.map(a => a.id === id ? { ...a, status: newStatus } : a));
        if (selectedAppreciation?.id === id) {
            setSelectedAppreciation({ ...selectedAppreciation, status: newStatus });
        }
    };

    const getTargetName = (type: string, id: string) => {
        if (type === 'teacher') return mockTeachers.find(t => t.id === id)?.name || 'Тодорхойгүй багш';
        if (type === 'program') return mockPrograms.find(p => p.id === id)?.title || 'Тодорхойгүй хөтөлбөр';
        if (type === 'training') return mockTrainings.find(t => t.id === id)?.title || 'Тодорхойгүй сургалт';
        return '-';
    };

    const filteredAppreciations = appreciations.filter(a => {
        const matchesSearch = a.sender.toLowerCase().includes(search.toLowerCase()) || a.messagePreview.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter ? a.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    const columns: Column<Appreciation>[] = [
        {
            header: 'Онцлох',
            accessorKey: 'featured',
            cell: ({ row }) => (
                <button
                    onClick={(e) => toggleFeatured(row.id, e)}
                    className={`p-1.5 rounded-lg transition-all ${row.featured ? 'text-yellow-500 hover:bg-yellow-500/10' : theme === 'dark' ? 'text-white/20 hover:text-white/60 hover:bg-white/5' : 'text-black/20 hover:text-black/60 hover:bg-black/5'}`}
                >
                    {row.featured ? <Star size={16} className="fill-current" /> : <StarOff size={16} />}
                </button>
            )
        },
        {
            header: 'Илгээгч',
            accessorKey: 'sender',
            cell: ({ row }) => <span className="font-bold">{row.sender}</span>,
            sortable: true
        },
        {
            header: 'Хэнд/Юунд',
            accessorKey: 'targetId',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                        {row.targetType === 'teacher' ? 'Багшид' : row.targetType === 'program' ? 'Хөтөлбөрт' : 'Сургалтад'}
                    </span>
                    <span className="text-sm">{getTargetName(row.targetType, row.targetId)}</span>
                </div>
            )
        },
        {
            header: 'Зурвас',
            accessorKey: 'messagePreview',
            cell: ({ row }) => (
                <div className="max-w-[250px] truncate text-xs italic opacity-80" title={row.fullMessage}>
                    "{row.messagePreview}"
                </div>
            )
        },
        {
            header: 'Статус',
            accessorKey: 'status',
            cell: ({ row }) => <StatusBadge status={row.status} />
        },
        {
            header: 'Огноо',
            accessorKey: 'createdAt',
            cell: ({ row }) => <span className="text-xs">{new Date(row.createdAt).toLocaleDateString()}</span>,
            sortable: true
        },
        {
            header: 'Үйлдэл',
            accessorKey: 'id',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleView(row); }} className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-white/5 text-white/40 hover:text-white' : 'border-black/5 hover:bg-black/5 text-black/40 hover:text-black'}`}>
                        <Eye size={14} />
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
                title="Талархал"
                description="Хэрэглэгчдээс багш болон сургалтад ирүүлсэн сэтгэгдэл, талархал"
                icon={Heart}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5' : 'bg-white border-black/5'}`}>
                    <p className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/50'}`}>Нийт талархал</p>
                    <p className="text-2xl font-bold mt-1">{mockAppreciations.length}</p>
                </div>
                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5 text-green-500' : 'bg-white border-black/5 text-green-600'}`}>
                    <p className={`text-[10px] uppercase font-bold tracking-widest opacity-60`}>Зөвшөөрсөн</p>
                    <p className="text-2xl font-bold mt-1">{mockAppreciations.filter(a => a.status === 'approved').length}</p>
                </div>
                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5 text-yellow-500' : 'bg-white border-black/5 text-yellow-600'}`}>
                    <p className={`text-[10px] uppercase font-bold tracking-widest opacity-60`}>Хүлээгдэж буй</p>
                    <p className="text-2xl font-bold mt-1">{mockAppreciations.filter(a => a.status === 'pending').length}</p>
                </div>
            </div>

            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                searchPlaceholder="Илгээгч болон зурвасаар хайх..."
                filters={[{
                    key: 'status',
                    label: 'Статус',
                    value: statusFilter,
                    onChange: setStatusFilter,
                    options: [
                        { label: 'Хүлээгдэж буй', value: 'pending' },
                        { label: 'Зөвшөөрсөн', value: 'approved' },
                        { label: 'Татгалзсан', value: 'rejected' }
                    ]
                }]}
            />

            {viewMode === 'list' ? (
                <DataTable columns={columns} data={filteredAppreciations} onRowClick={handleView} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAppreciations.map((appr) => (
                        <div
                            key={appr.id}
                            onClick={() => handleView(appr)}
                            className={`group cursor-pointer rounded-3xl p-6 border transition-all duration-300 hover:shadow-xl ${theme === 'dark'
                                ? 'bg-black/40 border-white/5 hover:border-brand-secondary/30'
                                : 'bg-white border-black/5 hover:border-brand-secondary/30 shadow-sm'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} group-hover:bg-brand-secondary/10 transition-colors`}>
                                    <Heart size={24} className={appr.status === 'approved' ? 'text-red-500' : 'text-brand-secondary'} />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => toggleFeatured(appr.id, e)}
                                        className={`p-1.5 rounded-lg transition-all ${appr.featured ? 'text-yellow-500 hover:bg-yellow-500/10' : 'text-white/20 hover:text-white/60'}`}
                                    >
                                        {appr.featured ? <Star size={16} className="fill-current" /> : <StarOff size={16} />}
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleView(appr); }}
                                        className="text-white/40 hover:text-white transition-colors"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => handleDeleteClick(appr.id, e)}
                                        className="text-red-500/40 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between">
                                    <span className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                                        {appr.targetType === 'teacher' ? 'Багшид' : appr.targetType === 'program' ? 'Хөтөлбөрт' : 'Сургалтад'}
                                    </span>
                                    <StatusBadge status={appr.status} />
                                </div>
                                <h3 className={`font-bold text-sm truncate ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                                    {getTargetName(appr.targetType, appr.targetId)}
                                </h3>
                                <div className={`relative p-4 rounded-2xl text-xs italic leading-relaxed ${theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'}`}>
                                    <Quote size={12} className="absolute -top-1 -left-1 text-brand-secondary opacity-40 rotate-180" />
                                    <p className="line-clamp-3">{appr.messagePreview}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                                        <User size={12} />
                                    </div>
                                    <span className="text-[10px] font-bold opacity-60">
                                        {appr.sender}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] opacity-40">
                                    <Clock size={10} />
                                    <span>{new Date(appr.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredAppreciations.length === 0 && (
                        <div className="col-span-full py-20 text-center opacity-30 font-bold">
                            Талархал олдсонгүй
                        </div>
                    )}
                </div>
            )}

            <DrawerPanel
                isOpen={isDrawOpen}
                onClose={() => setIsDrawOpen(false)}
                title="Талархал шалгах"
                footer={
                    <button onClick={() => setIsDrawOpen(false)} className={`w-full px-4 py-3 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-black/10 hover:bg-black/5 text-black'}`}>Хаах</button>
                }
            >
                {selectedAppreciation && (
                    <div className="space-y-6">
                        <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                            <div className="flex justify-between items-start mb-4 border-b pb-4 border-white/10">
                                <div className="flex gap-3 items-center">
                                    <div className="w-10 h-10 rounded-full bg-brand-secondary/20 text-brand-secondary flex items-center justify-center font-bold">
                                        {selectedAppreciation.sender.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{selectedAppreciation.sender}</h3>
                                        <p className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-white/40' : 'text-black/50'}`}>
                                            Огноо: {new Date(selectedAppreciation.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <StatusBadge status={selectedAppreciation.status} />
                            </div>

                            <div className="mb-4">
                                <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                                    Эзэн: {selectedAppreciation.targetType === 'teacher' ? 'Багш' : selectedAppreciation.targetType === 'program' ? 'Хөтөлбөр' : 'Сургалт'}
                                </p>
                                <p className="font-bold text-brand-secondary">
                                    {getTargetName(selectedAppreciation.targetType, selectedAppreciation.targetId)}
                                </p>
                            </div>

                            <div className={`p-4 rounded-xl text-sm leading-relaxed italic ${theme === 'dark' ? 'bg-[#111] text-white/80' : 'bg-white shadow-inner text-black/80'}`}>
                                "{selectedAppreciation.fullMessage}"
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-bold text-sm">Удирдах</h4>

                            <button
                                onClick={() => toggleFeatured(selectedAppreciation.id)}
                                className={`w-full flex justify-between items-center p-3 rounded-xl border transition-all ${selectedAppreciation.featured ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500' : theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}
                            >
                                <span className="font-bold text-xs">Нүүр хуудсанд онцлох</span>
                                {selectedAppreciation.featured ? <Star size={16} className="fill-current" /> : <StarOff size={16} />}
                            </button>

                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <button
                                    onClick={() => updateStatus(selectedAppreciation.id, 'approved')}
                                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all border ${selectedAppreciation.status === 'approved' ? 'bg-green-500/20 border-green-500/30 text-green-500' : theme === 'dark' ? 'border-white/10 hover:bg-green-500/10 hover:text-green-500' : 'border-black/10 hover:bg-green-500/10 hover:text-green-600'}`}
                                >
                                    <CheckCircle size={16} /> Зөвшөөрөх
                                </button>
                                <button
                                    onClick={() => updateStatus(selectedAppreciation.id, 'rejected')}
                                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all border ${selectedAppreciation.status === 'rejected' ? 'bg-red-500/20 border-red-500/30 text-red-500' : theme === 'dark' ? 'border-white/10 hover:bg-red-500/10 hover:text-red-500' : 'border-black/10 hover:bg-red-500/10 hover:text-red-600'}`}
                                >
                                    <XCircle size={16} /> Татгалзах
                                </button>
                                <button
                                    onClick={(e) => handleDeleteClick(selectedAppreciation.id, e)}
                                    className={`col-span-2 flex items-center justify-center gap-2 py-3 mt-2 rounded-xl text-xs font-bold transition-all border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white`}
                                >
                                    <Trash2 size={16} /> Устгах
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </DrawerPanel>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Талархал устгах"
                message="Та энэ талархлын зурвасыг устгахдаа итгэлтэй байна уу? Устгасан зурвасыг сэргээх боломжгүй."
            />
        </div>
    );
}
