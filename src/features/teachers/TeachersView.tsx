import React, { useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { type ViewMode } from '../../components/admin/ViewModeToggle';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { Users, Edit3, Trash2, Mail, Phone, BookOpen } from 'lucide-react';
import { mockTeachers } from '../../mock/adminData';
import type { Teacher } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';

export function TeachersView() {
    const { theme } = useAppContext();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [isDrawOpen, setIsDrawOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);

    const handleAdd = () => {
        setSelectedTeacher(null);
        setIsDrawOpen(true);
    };

    const handleEdit = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setIsDrawOpen(true);
    };

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setTeacherToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (teacherToDelete) {
            setTeachers(teachers.filter(t => t.id !== teacherToDelete));
            setTeacherToDelete(null);
        }
    };

    const filteredTeachers = teachers.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter ? t.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    const columns: Column<Teacher>[] = [
        {
            header: 'Багш',
            accessorKey: 'name',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <img src={row.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                    <span className="font-bold">{row.name}</span>
                </div>
            ),
            sortable: true
        },
        { header: 'Мэргэжил', accessorKey: 'specialization' },
        {
            header: 'Холбоо барих',
            accessorKey: 'phone',
            cell: ({ row }) => (
                <div className="flex flex-col text-xs">
                    <span className="font-bold">{row.phone}</span>
                    <span className={`text-[10px] ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{row.email}</span>
                </div>
            )
        },
        {
            header: 'Идэвхтэй сургалт',
            accessorKey: 'activeTrainingsCount',
            cell: ({ row }) => <span className="font-medium bg-brand-secondary/10 text-brand-secondary px-2 py-1 rounded">{row.activeTrainingsCount}</span>
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
                title="Багш нар"
                description="Бүртгэлтэй сургагч багш нарын мэдээлэл"
                icon={Users}
                actionLabel="Шинэ багш"
                onAction={handleAdd}
            />

            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                searchPlaceholder="Багшийн нэрээр хайх..."
                filters={[{
                    key: 'status',
                    label: 'Статус',
                    value: statusFilter,
                    onChange: setStatusFilter,
                    options: [{ label: 'Идэвхтэй', value: 'active' }, { label: 'Идэвхгүй', value: 'inactive' }]
                }]}
            />

            {viewMode === 'list' ? (
                <DataTable columns={columns} data={filteredTeachers} onRowClick={handleEdit} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTeachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            onClick={() => handleEdit(teacher)}
                            className={`group cursor-pointer rounded-3xl p-6 border transition-all duration-300 hover:shadow-xl ${theme === 'dark'
                                ? 'bg-black/40 border-white/5 hover:border-brand-secondary/30'
                                : 'bg-white border-black/5 hover:border-brand-secondary/30 shadow-sm'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src={teacher.avatar}
                                            alt={teacher.name}
                                            className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-secondary/20"
                                        />
                                        <div className="absolute -bottom-1 -right-1">
                                            <StatusBadge status={teacher.status} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className={`font-bold group-hover:text-brand-secondary transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                            {teacher.name}
                                        </h3>
                                        <span className="text-xs opacity-50">{teacher.specialization}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(teacher);
                                        }}
                                        className="text-white/40 hover:text-white transition-colors"
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                    <button
                                        onClick={(e) => handleDeleteClick(teacher.id, e)}
                                        className="text-red-500/40 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-3 text-xs opacity-60">
                                    <Mail size={14} className="text-brand-secondary" />
                                    <span className="truncate">{teacher.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs opacity-60">
                                    <Phone size={14} className="text-brand-secondary" />
                                    <span>{teacher.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs opacity-60">
                                    <BookOpen size={14} className="text-brand-secondary" />
                                    <span className="font-bold text-brand-secondary">{teacher.activeTrainingsCount} идэвхтэй сургалт</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredTeachers.length === 0 && (
                        <div className="col-span-full py-20 text-center opacity-30 font-bold">
                            Илэрц олдсонгүй
                        </div>
                    )}
                </div>
            )}

            <DrawerPanel
                isOpen={isDrawOpen}
                onClose={() => setIsDrawOpen(false)}
                title={selectedTeacher ? 'Багшийн мэдээлэл засах' : 'Шинэ багш'}
                footer={
                    <>
                        <button onClick={() => setIsDrawOpen(false)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60' : 'border-black/10 hover:bg-black/5 text-black/60'}`}>Цуцлах</button>
                        <button onClick={() => setIsDrawOpen(false)} className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-secondary text-black shadow-md hover:brightness-105 transition-all">Хадгалах</button>
                    </>
                }
            >
                <form className="space-y-5">
                    <div className="flex items-center justify-center mb-6">
                        <div className={`w-24 h-24 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                            {selectedTeacher?.avatar ? (
                                <img src={selectedTeacher.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Зураг оруулах</span>
                            )}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Нэр</label>
                        <input type="text" defaultValue={selectedTeacher?.name} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Мэргэжил</label>
                        <input type="text" defaultValue={selectedTeacher?.specialization} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Утас</label>
                            <input type="text" defaultValue={selectedTeacher?.phone} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>И-мэйл</label>
                            <input type="email" defaultValue={selectedTeacher?.email} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                        </div>
                    </div>
                </form>
            </DrawerPanel>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Багш устгах"
                message="Та энэ багшийн мэдээллийг устгахдаа итгэлтэй байна уу?"
            />
        </div>
    );
}
