import React, { useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { type ViewMode } from '../../components/admin/ViewModeToggle';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { ImageUpload } from '../../components/admin/ImageUpload';
import { BookOpen, Edit3, Trash2, List, ArrowLeft, PlayCircle, FileText, CheckSquare, Presentation, Layers, BarChart, Wrench, Info, Phone } from 'lucide-react';
import type { Program, Lesson } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';
import { useDataContext } from '../../context/DataContext';
import { useAlertContext } from '../../context/AlertContext';

export function ProgramsView() {
    const { theme } = useAppContext();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const { programs, lessons, addProgram, updateProgram, deleteProgram, addLesson, updateLesson } = useDataContext();
    const { showAlert } = useAlertContext();

    // State for Modals & Data
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [isDrawOpen, setIsDrawOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [programToDelete, setProgramToDelete] = useState<string | null>(null);

    // Curriculum state
    const [viewingProgram, setViewingProgram] = useState<Program | null>(null);
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
            deleteProgram(programToDelete);
            showAlert('Хөтөлбөр амжилттай устгагдлаа', 'success');
            setProgramToDelete(null);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleSaveProgram = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        
        const programData: any = {
            title: formData.get('title'),
            category: formData.get('category'),
            level: formData.get('level'),
            duration: formData.get('duration'),
            description: formData.get('description'),
            ageGroup: formData.get('ageGroup'),
            contactInfo: formData.get('contactInfo'),
            tools: formData.get('tools'),
            status: formData.get('status'),
            price: formData.get('price'),
            icon: formData.get('icon'),
            color: formData.get('color'),
            tagColor: formData.get('category') === 'zuslaan' ? 'bg-green-500' : 'bg-orange-500',
            coverImage: selectedProgram?.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
            trainingsCount: selectedProgram?.trainingsCount || 0
        };

        if (selectedProgram) {
            updateProgram(selectedProgram.id, programData);
            showAlert('Хөтөлбөр амжилттай шинэчлэгдлээ', 'success');
        } else {
            addProgram(programData);
            showAlert('Шинэ хөтөлбөр амжилттай үүсгэлээ', 'success');
        }
        setIsDrawOpen(false);
    };

    const handleSaveLesson = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        
        const lessonData: any = {
            title: formData.get('title'),
            type: formData.get('type'),
            duration: formData.get('duration'),
            status: formData.get('status'),
            order: Number(formData.get('order')),
            programId: viewingProgram?.id
        };

        if (selectedLesson) {
            updateLesson(selectedLesson.id, lessonData);
            showAlert('Хичээл амжилттай шинэчлэгдлээ', 'success');
        } else {
            addLesson(lessonData);
            showAlert('Шинэ хичээл амжилттай нэмэгдлээ', 'success');
        }
        setIsLessonDrawOpen(false);
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
        {
            header: 'Ангилал',
            accessorKey: 'category',
            cell: ({ row }) => (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.category === 'zuslaan' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {row.category === 'zuslaan' ? 'Зуслан' : 'Богино хугацааны'}
                </span>
            ),
            sortable: true
        },
        { header: 'Түвшин', accessorKey: 'level' },
        { header: 'Хугацаа', accessorKey: 'duration' },
        {
            header: 'Үнэ',
            accessorKey: 'price',
            cell: ({ row }) => <span className="font-bold text-brand-accent">{row.price || '---'}</span>
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
                        className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-brand-accent/10 text-white/40 hover:text-brand-accent' : 'border-black/5 hover:bg-brand-accent/10 text-black/40 hover:text-brand-accent'}`}
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
        aria-label="Засах"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedLesson(row);
          setIsLessonDrawOpen(true);
        }}
        className={`p-1.5 rounded-lg border transition-all ${
          theme === 'dark'
            ? 'border-white/5 hover:bg-white/5 text-white/40 hover:text-white'
            : 'border-black/5 hover:bg-black/5 text-black/40 hover:text-black'
        }`}
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
                            <button type="button" onClick={() => setIsLessonDrawOpen(false)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60' : 'border-black/10 hover:bg-black/5 text-black/60'}`}>Цуцлах</button>
                            <button form="lesson-form" type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-accent text-black shadow-md hover:brightness-105 transition-all">Хадгалах</button>
                        </>
                    }
                >
                    <form id="lesson-form" onSubmit={handleSaveLesson} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Дараалал</label>
                            <input name="order" type="number" defaultValue={selectedLesson?.order || programLessons.length + 1} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="1" />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Хичээлийн нэр</label>
                            <input name="title" type="text" defaultValue={selectedLesson?.title} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Гарчиг" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Төрөл</label>
                                <select name="type" defaultValue={selectedLesson?.type || 'video'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                    <option value="video">Бичлэг</option>
                                    <option value="reading">Унших</option>
                                    <option value="assignment">Даалгавар</option>
                                    <option value="quiz">Шалгалт</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Хугацаа</label>
                                <input name="duration" type="text" defaultValue={selectedLesson?.duration} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="15 минут" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Статус</label>
                            <select name="status" defaultValue={selectedLesson?.status || 'published'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
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
                viewMode={viewMode}
                onViewModeChange={setViewMode}
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

            {viewMode === 'list' ? (
                <DataTable
                    columns={columns}
                    data={filteredPrograms}
                    onRowClick={handleEdit}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPrograms.map((program) => (
                        <div
                            key={program.id}
                            onClick={() => handleEdit(program)}
                            className={`group cursor-pointer rounded-3xl p-6 md:p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${theme === 'dark'
                                ? 'bg-[#151515] border-white/5 hover:border-brand-accent/30 shadow-none'
                                : 'bg-white border-black/5 hover:border-brand-accent/30 shadow-sm ring-1 ring-black/5'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} group-hover:bg-brand-accent/10 transition-colors`}>
                                    <BookOpen size={24} className="text-brand-accent" />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setViewingProgram(program); }}
                                        className={`${theme === 'dark' ? 'text-white/40' : 'text-black/40'} hover:text-brand-accent transition-colors`}
                                        title="Хичээлүүд харах"
                                    >
                                        <List size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEdit(program); }}
                                        className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'} transition-colors`}
                                        title="Засах"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => handleDeleteClick(program.id, e)}
                                        className="text-red-500/40 hover:text-red-500 transition-colors"
                                        title="Устгах"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {program.coverImage && (
                                <div className="relative h-32 mb-4 rounded-2xl overflow-hidden group-hover:shadow-lg transition-all duration-500">
                                    <img
                                        src={program.coverImage}
                                        alt={program.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Type badge removed from program level */}
                                </div>
                            )}

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">
                                        {program.category}
                                    </span>
                                    <StatusBadge status={program.status} />
                                </div>
                                <h3 className={`font-bold text-lg group-hover:text-brand-accent transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                    {program.title}
                                </h3>
                                <p className={`text-xs line-clamp-2 opacity-50 mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                    {program.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {program.ageGroup && (
                                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-medium border ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white/60' : 'bg-black/5 border-black/5 text-black/60'}`}>
                                            <Info size={10} className="text-brand-accent" />
                                            {program.ageGroup}
                                        </div>
                                    )}
                                    {program.tools && (
                                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-medium border ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white/60' : 'bg-black/5 border-black/5 text-black/60'}`}>
                                            <Wrench size={10} className="text-brand-accent" />
                                            {program.tools.split(',')[0]}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <Layers size={14} className="text-brand-accent/60" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] opacity-40 uppercase font-bold tracking-tighter">Түвшин</span>
                                        <span className="text-xs font-bold">{program.level}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BarChart size={14} className="text-brand-accent/60" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] opacity-40 uppercase font-bold tracking-tighter">Сургалтууд</span>
                                        <span className="text-xs font-bold text-brand-accent">{program.trainingsCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredPrograms.length === 0 && (
                        <div className="col-span-full py-20 text-center opacity-30 font-bold">
                            Илэрц олдсонгүй
                        </div>
                    )}
                </div>
            )}

            {/* Sliding Form Panel for Program */}
            <DrawerPanel
                isOpen={isDrawOpen}
                onClose={() => setIsDrawOpen(false)}
                title={selectedProgram ? 'Хөтөлбөр засах' : 'Шинэ хөтөлбөр нэмэх'}
                footer={
                    <>
                        <button type="button" onClick={() => setIsDrawOpen(false)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60' : 'border-black/10 hover:bg-black/5 text-black/60'}`}>Цуцлах</button>
                        <button form="program-form" type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-accent text-black shadow-md hover:brightness-105 transition-all">Хадгалах</button>
                    </>
                }
            >
                <form id="program-form" onSubmit={handleSaveProgram} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 font-bold">
                            <label className={`text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Нэр</label>
                            <input name="title" type="text" defaultValue={selectedProgram?.title} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Хөтөлбөрийн нэр" required />
                        </div>
                        <ImageUpload
                            label="Нүүр зураг"
                            value={selectedProgram?.coverImage}
                            onChange={(val) => {
                                if (selectedProgram) setSelectedProgram({ ...selectedProgram, coverImage: val });
                            }}
                            aspectRatio="video"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Ангилал</label>
                            <select name="category" defaultValue={selectedProgram?.category || 'bogino'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                <option value="bogino">Богино хугацааны</option>
                                <option value="zuslaan">Зуслан</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Түвшин</label>
                            <select name="level" defaultValue={selectedProgram?.level || 'Анхан шат'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                <option value="Анхан шат">Анхан шат</option>
                                <option value="Суурь шат">Суурь шат</option>
                                <option value="Дунд шат">Дунд шат</option>
                                <option value="Ахисан шат">Ахисан шат</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 font-bold">
                            <label className={`text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Хугацаа</label>
                            <input name="duration" type="text" defaultValue={selectedProgram?.duration || '12 долоо хоног'} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="12 долоо хоног" required />
                        </div>
                        <div className="space-y-1.5 font-bold">
                            <label className={`text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Үнэ</label>
                            <input name="price" type="text" defaultValue={selectedProgram?.price} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="450,000₮" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 focus-within:ring-1 focus-within:ring-brand-accent/30 rounded-xl transition-all">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Icon (FA)</label>
                            <input name="icon" type="text" defaultValue={selectedProgram?.icon || 'fa-code'} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="fa-code" />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Gradient Color</label>
                            <input name="color" type="text" defaultValue={selectedProgram?.color || 'from-blue-400 to-indigo-600'} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="from-blue-400 to-indigo-600" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Насны ангилал</label>
                            <input name="ageGroup" type="text" defaultValue={selectedProgram?.ageGroup} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Жишээ: 8-12 нас" />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Холбоо барих</label>
                            <div className="relative">
                                <input name="contactInfo" type="text" defaultValue={selectedProgram?.contactInfo} className={`w-full px-4 py-3 pl-10 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="9911..." />
                                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Тайлбар</label>
                            <textarea name="description" rows={3} defaultValue={selectedProgram?.description} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Хөтөлбөрийн дэлгэрэнгүй мэдээлэл..." />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Ашиглах багаж хэрэгсэл</label>
                            <textarea name="tools" rows={3} defaultValue={selectedProgram?.tools} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="VS Code, Scratch, Arduino..." />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Хичээлийн хөтөлбөр (товч)</label>
                        <input type="text" defaultValue={selectedProgram?.curriculumSummary} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Хичээлийн гол сэдвүүд" />
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Статус</label>
                        <select name="status" defaultValue={selectedProgram ? selectedProgram.status : 'active'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
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