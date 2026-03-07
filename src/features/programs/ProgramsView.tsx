import React, { useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { BookOpen, Edit3, Trash2, List, ArrowLeft, PlayCircle, FileText, CheckSquare, Presentation } from 'lucide-react';
import { mockPrograms, mockLessons } from '../../mock/adminData';
import type { Program, Lesson } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';

export function ProgramsView() {
    const { theme } = useAppContext();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // State for Modals & Data
    const [programs, setPrograms] = useState<Program[]>(mockPrograms);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [isDrawOpen, setIsDrawOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [programToDelete, setProgramToDelete] = useState<string | null>(null);

    // Curriculum state
    const [viewingProgram, setViewingProgram] = useState<Program | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [isLessonDrawOpen, setIsLessonDrawOpen] = useState(false);

    // Handlers
    const handleAdd = () => {
        setSelectedProgram(null);
        setIsDrawOpen(true);
    };

    const handleEdit = (program: Program) => {
        setSelectedProgram(program);
        setIsDrawOpen(true);
    };

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setProgramToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (programToDelete) {
            setPrograms(programs.filter(p => p.id !== programToDelete));
            setProgramToDelete(null);
        }
    };

    // Derived Data
    const filteredPrograms = programs.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter ? p.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    // Columns Definition
    const columns: Column<Program>[] = [
        {
            header: 'Хөтөлбөрийн нэр',
            accessorKey: 'title',
            cell: ({ row }) => <span className="font-bold">{row.title}</span>,
            sortable: true
        },
        { header: 'Ангилал', accessorKey: 'category', sortable: true },
        { header: 'Түвшин', accessorKey: 'level' },
        { header: 'Хугацаа', accessorKey: 'duration' },
        {
            header: 'Сургалтууд',
            accessorKey: 'trainingsCount',
            cell: ({ row }) => <span className="font-medium bg-brand-secondary/10 text-brand-secondary px-2 py-1 rounded">{row.trainingsCount}</span>
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
                        onClick={(e) => { e.stopPropagation(); setViewingProgram(row); }}
                        className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-brand-secondary/10 text-white/40 hover:text-brand-secondary' : 'border-black/5 hover:bg-brand-secondary/10 text-black/40 hover:text-brand-secondary'}`}
                        title="Хичээлүүд харах"
                    >
                        <List size={14} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(row); }}
                        className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-white/5 text-white/40 hover:text-white' : 'border-black/5 hover:bg-black/5 text-black/40 hover:text-black'}`}
                        title="Засах"
                    >
                        <Edit3 size={14} />
                    </button>
                    <button
                        onClick={(e) => handleDeleteClick(row.id, e)}
                        className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500' : 'border-black/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500'}`}
                        title="Устгах"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ];

    // Sub-view: Lessons
    if (viewingProgram) {
        const programLessons = lessons
            .filter(l => l.programId === viewingProgram.id)
            .sort((a, b) => a.order - b.order);

        const lessonColumns: Column<Lesson>[] = [
            {
                header: 'Дараалал',
                accessorKey: 'order',
                cell: ({ row }) => <span className={theme === 'dark' ? 'text-white/40' : 'text-black/40'}>#{row.order}</span>
            },
            {
                header: 'Хичээлийн нэр',
                accessorKey: 'title',
                cell: ({ row }) => <span className="font-bold">{row.title}</span>
            },
            {
                header: 'Төрөл',
                accessorKey: 'type',
                cell: ({ row }) => {
                    const iconMap = {
                        video: <PlayCircle size={12} />,
                        reading: <FileText size={12} />,
                        assignment: <Presentation size={12} />,
                        quiz: <CheckSquare size={12} />
                    };
                    const typeMap = { video: 'Бичлэг', reading: 'Унших', assignment: 'Даалгавар', quiz: 'Шалгалт' };
                    return (
                        <div className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2 py-1 rounded font-bold w-max ${theme === 'dark' ? 'bg-white/10 text-white/80' : 'bg-black/5 text-black/80'}`}>
                            {iconMap[row.type]}
                            {typeMap[row.type]}
                        </div>
                    );
                }
            },
            { header: 'Хугацаа', accessorKey: 'duration' },
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
                            onClick={(e) => { e.stopPropagation(); setSelectedLesson(row); setIsLessonDrawOpen(true); }}
                            className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-white/5 text-white/40 hover:text-white' : 'border-black/5 hover:bg-black/5 text-black/40 hover:text-black'}`}
                        >
                            <Edit3 size={14} />
                        </button>
                    </div>
                )
            }
        ];

        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setViewingProgram(null)}
                        className={`p-3 rounded-xl border ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60 hover:text-white' : 'border-black/10 hover:bg-black/5 text-black/60 hover:text-black'} transition-all flex items-center gap-2`}
                    >
                        <ArrowLeft size={18} />
                        <span className="text-sm font-medium pr-1">Буцах</span>
                    </button>
                    <div className="flex-1">
                        <PageHeader
                            title={`Хөтөлбөр: ${viewingProgram.title}`}
                            description={`Нийт ${programLessons.length} хичээл байна`}
                            icon={BookOpen}
                            actionLabel="Шинэ хичээл"
                            onAction={() => { setSelectedLesson(null); setIsLessonDrawOpen(true); }}
                        />
                    </div>
                </div>

                <DataTable
                    columns={lessonColumns}
                    data={programLessons}
                    onRowClick={(l) => { setSelectedLesson(l); setIsLessonDrawOpen(true); }}
                />

                <DrawerPanel
                    isOpen={isLessonDrawOpen}
                    onClose={() => setIsLessonDrawOpen(false)}
                    title={selectedLesson ? 'Хичээл засах' : 'Шинэ хичээл нэмэх'}
                    footer={
                        <>
                            <button onClick={() => setIsLessonDrawOpen(false)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60' : 'border-black/10 hover:bg-black/5 text-black/60'}`}>Цуцлах</button>
                            <button onClick={() => setIsLessonDrawOpen(false)} className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-secondary text-black shadow-md hover:brightness-105 transition-all">Хадгалах</button>
                        </>
                    }
                >
                    <form className="space-y-5">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Дараалал</label>
                            <input type="number" defaultValue={selectedLesson?.order || programLessons.length + 1} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="1" />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Хичээлийн нэр</label>
                            <input type="text" defaultValue={selectedLesson?.title} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Гарчиг" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Төрөл</label>
                                <select defaultValue={selectedLesson ? selectedLesson.type : 'video'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                    <option value="video">Бичлэг</option>
                                    <option value="reading">Унших</option>
                                    <option value="assignment">Даалгавар</option>
                                    <option value="quiz">Шалгалт</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Хугацаа</label>
                                <input type="text" defaultValue={selectedLesson?.duration} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="15 минут" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Статус</label>
                            <select defaultValue={selectedLesson ? selectedLesson.status : 'published'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                <option value="published">Нийтлэгдсэн</option>
                                <option value="draft">Ноорог</option>
                            </select>
                        </div>
                    </form>
                </DrawerPanel>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title="Хөтөлбөрүүд"
                description="Бүх сургалтын хөтөлбөрүүдийн жагсаалт болон удирдлага"
                icon={BookOpen}
                actionLabel="Шинэ хөтөлбөр"
                onAction={handleAdd}
            />

            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder="Хөтөлбөрийн нэрээр хайх..."
                filters={[
                    {
                        key: 'status',
                        label: 'Статус',
                        value: statusFilter,
                        onChange: setStatusFilter,
                        options: [
                            { label: 'Идэвхтэй', value: 'active' },
                            { label: 'Ноорог', value: 'draft' }
                        ]
                    }
                ]}
            />

            <DataTable
                columns={columns}
                data={filteredPrograms}
                onRowClick={handleEdit}
            />

            {/* Sliding Form Panel for Program */}
            <DrawerPanel
                isOpen={isDrawOpen}
                onClose={() => setIsDrawOpen(false)}
                title={selectedProgram ? 'Хөтөлбөр засах' : 'Шинэ хөтөлбөр нэмэх'}
                footer={
                    <>
                        <button onClick={() => setIsDrawOpen(false)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60' : 'border-black/10 hover:bg-black/5 text-black/60'}`}>Цуцлах</button>
                        <button onClick={() => setIsDrawOpen(false)} className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-secondary text-black shadow-md hover:brightness-105 transition-all">Хадгалах</button>
                    </>
                }
            >
                <form className="space-y-5">
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Нэр</label>
                        <input type="text" defaultValue={selectedProgram?.title} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Хөтөлбөрийн нэр" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Ангилал</label>
                            <input type="text" defaultValue={selectedProgram?.category} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Жишээ: Програмчлал" />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Түвшин</label>
                            <input type="text" defaultValue={selectedProgram?.level} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Анхан шат" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Тайлбар</label>
                        <textarea rows={4} defaultValue={selectedProgram?.description} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Хөтөлбөрийн дэлгэрэнгүй мэдээлэл..." />
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Статус</label>
                        <select defaultValue={selectedProgram ? selectedProgram.status : 'active'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                            <option value="active">Идэвхтэй</option>
                            <option value="draft">Ноорог</option>
                            <option value="archived">Архивлагдсан</option>
                        </select>
                    </div>
                </form>
            </DrawerPanel>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Хөтөлбөр устгах"
                message="Та энэ хөтөлбөрийг устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй."
            />
        </div>
    );
}
