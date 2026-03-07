import React, { useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { GraduationCap, Edit3, Trash2 } from 'lucide-react';
import { mockTrainings, mockTeachers, mockPrograms } from '../../mock/adminData';
import type { Training } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';

export function TrainingsView() {
    const { theme } = useAppContext();
    const [search, setSearch] = useState('');
    const [formatFilter, setFormatFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

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
            header: 'Дүүргэлт',
            accessorKey: 'enrolledCount',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{row.enrolledCount} / {row.capacity}</span>
                    <div className={`w-16 h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                        <div
                            className="h-full bg-brand-secondary"
                            style={{ width: `${Math.min((row.enrolledCount / row.capacity) * 100, 100)}%` }}
                        />
                    </div>
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

            <DataTable columns={columns} data={filteredTrainings} onRowClick={handleEdit} />

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
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Хэлбэр</label>
                            <select defaultValue={selectedTraining?.format || 'offline'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                <option value="offline">Танхим</option>
                                <option value="online">Цахим</option>
                                <option value="hybrid">Холимог</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Хүчин чадал</label>
                            <input type="number" defaultValue={selectedTraining?.capacity || 20} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
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
