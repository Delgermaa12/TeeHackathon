import React, { useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { type ViewMode } from '../../components/admin/ViewModeToggle';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { GraduationCap, Edit3, Trash2, Users, Calendar, DollarSign, ShoppingCart } from 'lucide-react';
import { mockTrainings, mockTeachers, mockPrograms } from '../../mock/adminData';
import type { Training } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';

export function TrainingsView() {
    const { theme } = useAppContext();
    const [search, setSearch] = useState('');
    const [formatFilter, setFormatFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const [trainings, setTrainings] = useState<Training[]>(mockTrainings);
    const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
    const [isDrawOpen, setIsDrawOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [trainingToDelete, setTrainingToDelete] = useState<string | null>(null);

    const handleAdd = () => {
        setSelectedTraining(null);
        setIsDrawOpen(true);
    };

    const handleEdit = (training: Training) => {
        setSelectedTraining(training);
        setIsDrawOpen(true);
    };

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setTrainingToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (trainingToDelete) {
            setTrainings(trainings.filter(t => t.id !== trainingToDelete));
            setTrainingToDelete(null);
        }
    };

    const filteredTrainings = trainings.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
        const matchesFormat = formatFilter ? t.format === formatFilter : true;
        const matchesStatus = statusFilter ? t.status === statusFilter : true;
        return matchesSearch && matchesFormat && matchesStatus;
    });

    const columns: Column<Training>[] = [
        {
            header: 'Сургалт',
            accessorKey: 'title',
            cell: ({ row }) => <span className="font-bold">{row.title}</span>,
            sortable: true
        },
        {
            header: 'Багш',
            accessorKey: 'teacherId',
            cell: ({ row }) => {
                const teacher = mockTeachers.find(t => t.id === row.teacherId);
                return teacher ? teacher.name : '-';
            }
        },
        {
            header: 'Хэлбэр',
            accessorKey: 'format',
            cell: ({ row }) => (
                <span className={`text-[10px] uppercase font-bold tracking-wider ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                    {row.format === 'online' ? 'Цахим' : row.format === 'offline' ? 'Танхим' : 'Холимог'}
                </span>
            )
        },
        {
            header: 'Хугацаа',
            accessorKey: 'startDate',
            cell: ({ row }) => (
                <span className="text-xs">{row.startDate} ~<br />{row.endDate}</span>
            )
        },
        {
            header: 'Үнэ',
            accessorKey: 'price',
            cell: ({ row }) => (
                <span className="font-medium">
                    {row.type === 'paid' ? `${row.price.toLocaleString()}₮` : 'Үнэгүй'}
                </span>
            )
        },
        {
            header: 'Борлуулалт',
            accessorKey: 'salesCount',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{row.salesCount}</span>
                    <ShoppingCart size={12} className="opacity-30" />
                </div>
            )
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
                    <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(row); }}
                        className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-white/5 text-white/40 hover:text-white' : 'border-black/5 hover:bg-black/5 text-black/40 hover:text-black'}`}
                    >
                        <Edit3 size={14} />
                    </button>
                    <button
                        onClick={(e) => handleDeleteClick(row.id, e)}
                        className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500' : 'border-black/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500'}`}
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title="Сургалтууд"
                description="Элсэлт авч буй болон явагдаж буй сургалтууд"
                icon={GraduationCap}
                actionLabel="Шинэ сургалт"
                onAction={handleAdd}
            />

            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                searchPlaceholder="Сургалтын нэрээр хайх..."
                filters={[
                    {
                        key: 'format',
                        label: 'Хэлбэр',
                        value: formatFilter,
                        onChange: setFormatFilter,
                        options: [
                            { label: 'Цахим', value: 'online' },
                            { label: 'Танхим', value: 'offline' },
                            { label: 'Холимог', value: 'hybrid' }
                        ]
                    },
                    {
                        key: 'status',
                        label: 'Статус',
                        value: statusFilter,
                        onChange: setStatusFilter,
                        options: [
                            { label: 'Идэвхтэй', value: 'active' },
                            { label: 'Хүлээгдэж буй', value: 'pending' },
                            { label: 'Дууссан', value: 'archived' }
                        ]
                    }
                ]}
            />

            {viewMode === 'list' ? (
                <DataTable columns={columns} data={filteredTrainings} onRowClick={handleEdit} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTrainings.map((training) => {
                        const teacher = mockTeachers.find(t => t.id === training.teacherId);

                        return (
                            <div
                                key={training.id}
                                onClick={() => handleEdit(training)}
                                className={`group cursor-pointer rounded-3xl p-6 border transition-all duration-300 hover:shadow-xl ${theme === 'dark'
                                    ? 'bg-black/40 border-white/5 hover:border-brand-secondary/30'
                                    : 'bg-white border-black/5 hover:border-brand-secondary/30 shadow-sm'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} group-hover:bg-brand-secondary/10 transition-colors`}>
                                        <GraduationCap size={24} className="text-brand-secondary" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleEdit(training); }}
                                            className="text-white/40 hover:text-white transition-colors"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteClick(training.id, e)}
                                            className="text-red-500/40 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[10px] uppercase font-bold tracking-wider ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                                            {training.format === 'online' ? 'Цахим' : training.format === 'offline' ? 'Танхим' : 'Холимог'}
                                        </span>
                                        <StatusBadge status={training.status} />
                                    </div>
                                    <h3 className={`font-bold text-base line-clamp-2 group-hover:text-brand-secondary transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        {training.title}
                                    </h3>
                                    <div className="flex items-center gap-2 pt-1">
                                        <div className="w-5 h-5 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                                            <Users size={10} />
                                        </div>
                                        <span className="text-[10px] font-bold opacity-60">
                                            {teacher?.name || 'Багшгүй'}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold tracking-tighter uppercase opacity-40">Үнэ</span>
                                            <span className={`text-sm font-bold ${training.type === 'paid' ? 'text-brand-secondary' : 'text-green-500'}`}>
                                                {training.type === 'paid' ? `${training.price.toLocaleString()}₮` : 'Үнэгүй'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-bold tracking-tighter uppercase opacity-40">Борлуулалт</span>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-sm font-bold text-white">{training.salesCount}</span>
                                                <ShoppingCart size={12} className="opacity-30 text-brand-secondary" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] font-bold opacity-60">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-brand-secondary/60" />
                                            <span>{training.startDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {filteredTrainings.length === 0 && (
                        <div className="col-span-full py-20 text-center opacity-30 font-bold">
                            Илэрц олдсонгүй
                        </div>
                    )}
                </div>
            )}

            <DrawerPanel
                isOpen={isDrawOpen}
                onClose={() => setIsDrawOpen(false)}
                title={selectedTraining ? 'Сургалт засах' : 'Шинэ сургалт'}
                footer={
                    <>
                        <button onClick={() => setIsDrawOpen(false)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60' : 'border-black/10 hover:bg-black/5 text-black/60'}`}>Цуцлах</button>
                        <button onClick={() => setIsDrawOpen(false)} className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-secondary text-black shadow-md hover:brightness-105 transition-all">Хадгалах</button>
                    </>
                }
            >
                <form className="space-y-5">
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Сургалтын нэр</label>
                        <input type="text" defaultValue={selectedTraining?.title} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Хөтөлбөр сонгох</label>
                        <select defaultValue={selectedTraining?.programId} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                            {mockPrograms.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Багш сонгох</label>
                        <select defaultValue={selectedTraining?.teacherId} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                            {mockTeachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Эхлэх огноо</label>
                            <input type="date" defaultValue={selectedTraining?.startDate} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Дуусах огноо</label>
                            <input type="date" defaultValue={selectedTraining?.endDate} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Төрөл</label>
                            <select
                                id="training-type"
                                defaultValue={selectedTraining?.type || 'paid'}
                                className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}
                                onChange={(e) => {
                                    const priceField = document.getElementById('training-price-field');
                                    if (priceField) {
                                        priceField.style.display = e.target.value === 'paid' ? 'block' : 'none';
                                    }
                                }}
                            >
                                <option value="paid">Төлбөртэй</option>
                                <option value="free">Үнэгүй</option>
                            </select>
                        </div>
                        <div
                            id="training-price-field"
                            className="space-y-1.5"
                            style={{ display: selectedTraining?.type === 'free' ? 'none' : 'block' }}
                        >
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Үнэ</label>
                            <div className="relative">
                                <input type="number" defaultValue={selectedTraining?.price} className={`w-full px-4 py-3 pl-10 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="500,000" />
                                <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Хэлбэр</label>
                            <select defaultValue={selectedTraining?.format || 'offline'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                <option value="offline">Танхим</option>
                                <option value="online">Цахим</option>
                                <option value="hybrid">Холимог</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Борлуулалтын тоо</label>
                            <input type="number" defaultValue={selectedTraining?.salesCount || 0} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                        </div>
                    </div>
                </form>
            </DrawerPanel>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Сургалт устгах"
                message="Та энэ сургалтыг устгахдаа итгэлтэй байна уу? Сургалтад бүртгүүлсэн хүмүүсийн мэдээлэл хамт устах болно."
            />
        </div>
    );
}
