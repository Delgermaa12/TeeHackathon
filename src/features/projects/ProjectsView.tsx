import React, { useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { type ViewMode } from '../../components/admin/ViewModeToggle';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { ImageUpload } from '../../components/admin/ImageUpload';
import { Rocket, Edit3, Trash2, ExternalLink, Play, Box, Star } from 'lucide-react';
import type { StudentProject } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';
import { useDataContext } from '../../context/DataContext';
import { useAlertContext } from '../../context/AlertContext';

export function ProjectsView() {
    const { theme, language } = useAppContext();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const { studentProjects, addStudentProject, updateStudentProject, deleteStudentProject } = useDataContext();
    const { showAlert } = useAlertContext();

    // State for Modals & Data
    const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);
    const [isDrawOpen, setIsDrawOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

    // Handlers
    const handleAdd = () => {
        setSelectedProject(null);
        setIsDrawOpen(true);
    };

    const handleEdit = (project: StudentProject) => {
        setSelectedProject(project);
        setIsDrawOpen(true);
    };

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setProjectToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (projectToDelete) {
            deleteStudentProject(projectToDelete);
            showAlert('Бүтээл амжилттай устгагдлаа', 'success');
            setProjectToDelete(null);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleSaveProject = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        
        const projectData: any = {
            title: formData.get('title'),
            type: formData.get('type'),
            studentName: formData.get('studentName'),
            embedUrl: formData.get('embedUrl'),
            openUrl: formData.get('openUrl'),
            featured: formData.get('featured') === 'on',
            status: formData.get('status'),
            thumbnail: selectedProject?.thumbnail || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
            color: formData.get('type') === 'scratch' ? 'bg-orange-400' : 'bg-cyan-400'
        };

        if (selectedProject) {
            updateStudentProject(selectedProject.id, projectData);
            showAlert('Бүтээл амжилттай шинэчлэгдлээ', 'success');
        } else {
            addStudentProject(projectData);
            showAlert('Шинэ бүтээл амжилттай нэмэгдлээ', 'success');
        }
        setIsDrawOpen(false);
    };

    // Derived Data
    const filteredProjects = studentProjects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                             p.studentName.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter ? p.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    // Columns Definition
    const columns: Column<StudentProject>[] = [
        {
            header: 'Бүтээлийн нэр',
            accessorKey: 'title',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${row.type === 'scratch' ? 'bg-orange-400/10 text-orange-400' : 'bg-cyan-400/10 text-cyan-400'}`}>
                        {row.type === 'scratch' ? <Play size={14} /> : <Box size={14} />}
                    </div>
                    <span className="font-bold">{row.title}</span>
                </div>
            )
        },
        { header: 'Сурагч', accessorKey: 'studentName' },
        { 
            header: 'Төрөл', 
            accessorKey: 'type',
            cell: ({ row }) => <span className="uppercase text-[10px] font-black opacity-60 tracking-wider font-mono">{row.type}</span>
        },
        {
            header: 'Онцлох',
            accessorKey: 'featured',
            cell: ({ row }) => row.featured ? <Star size={14} className="fill-brand-accent text-brand-accent" /> : <Star size={14} className="opacity-10" />
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
                title="Сурагчдын бүтээл"
                description="Home хуудасны тоглоом болон 3D бүтээлүүдийг удирдах"
                icon={Rocket}
                actionLabel="Шинэ бүтээл"
                onAction={handleAdd}
            />

            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                searchPlaceholder="Бүтээл эсвэл сурагчийн нэрээр хайх..."
                filters={[
                    {
                        key: 'status',
                        label: 'Статус',
                        value: statusFilter,
                        onChange: setStatusFilter,
                        options: [
                            { label: 'Идэвхтэй', value: 'active' },
                            { label: 'Идэвхгүй', value: 'inactive' }
                        ]
                    }
                ]}
            />

            {viewMode === 'list' ? (
                <DataTable
                    columns={columns}
                    data={filteredProjects}
                    onRowClick={handleEdit}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => handleEdit(project)}
                            className={`group cursor-pointer rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${theme === 'dark' ? 'bg-[#151515] border-white/5' : 'bg-white border-black/5 shadow-sm'}`}
                        >
                            <div className="relative h-48">
                                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute top-4 left-4">
                                     <div className={`p-2 rounded-xl text-black ${project.type === 'scratch' ? 'bg-orange-400' : 'bg-cyan-400'}`}>
                                        {project.type === 'scratch' ? <Play size={16} /> : <Box size={16} />}
                                    </div>
                                </div>
                                {project.featured && (
                                    <div className="absolute top-4 right-4 bg-brand-accent text-black p-2 rounded-xl shadow-lg">
                                        <Star size={16} className="fill-black" />
                                    </div>
                                )}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
                                    <p className="text-white/60 text-xs font-medium uppercase tracking-widest mt-1">{project.studentName}</p>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <StatusBadge status={project.status} />
                                <div className="flex gap-2">
                                    <button onClick={(e) => {e.stopPropagation(); handleEdit(project)}} className={`p-2 rounded-xl ${theme === 'dark' ? 'hover:bg-white/5 text-white/40' : 'hover:bg-black/5 text-black/40'} transition-all`}>
                                        <Edit3 size={16} />
                                    </button>
                                    <button onClick={(e) => handleDeleteClick(project.id, e)} className={`p-2 rounded-xl hover:bg-red-500/10 text-red-500/40 hover:text-red-500 transition-all`}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <DrawerPanel
                isOpen={isDrawOpen}
                onClose={() => setIsDrawOpen(false)}
                title={selectedProject ? 'Бүтээл засах' : 'Шинэ бүтээл нэмэх'}
                footer={
                    <>
                        <button type="button" onClick={() => setIsDrawOpen(false)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60' : 'border-black/10 hover:bg-black/5 text-black/60'}`}>Цуцлах</button>
                        <button form="project-form" type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-accent text-black shadow-md hover:brightness-105 transition-all">Хадгалах</button>
                    </>
                }
            >
                <form id="project-form" onSubmit={handleSaveProject} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Бүтээлийн нэр</label>
                        <input name="title" type="text" defaultValue={selectedProject?.title} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Project Title" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Сурагчийн нэр</label>
                            <input name="studentName" type="text" defaultValue={selectedProject?.studentName} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="Student Name" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Төрөл</label>
                            <select name="type" defaultValue={selectedProject?.type || 'scratch'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                <option value="scratch">Scratch (Game)</option>
                                <option value="tinkercad">Tinkercad (3D)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Embed URL (Iframe)</label>
                        <input name="embedUrl" type="text" defaultValue={selectedProject?.embedUrl} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="https://scratch.mit.edu/projects/.../embed" />
                    </div>

                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Open URL (Шууд холбоос)</label>
                        <input name="openUrl" type="text" defaultValue={selectedProject?.openUrl} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="https://scratch.mit.edu/projects/..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Статус</label>
                            <select name="status" defaultValue={selectedProject?.status || 'active'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                <option value="active">Идэвхтэй</option>
                                <option value="inactive">Идэвхгүй</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2 pt-6">
                            <input name="featured" id="featured" type="checkbox" defaultChecked={selectedProject?.featured} className="w-4 h-4 accent-brand-accent" />
                            <label htmlFor="featured" className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Онцлох бүтээл</label>
                        </div>
                    </div>

                    <ImageUpload
                        label="Thumbnail зураг"
                        value={selectedProject?.thumbnail}
                        onChange={(val) => {
                            if (selectedProject) setSelectedProject({ ...selectedProject, thumbnail: val });
                        }}
                        aspectRatio="video"
                    />
                </form>
            </DrawerPanel>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Бүтээл устгах"
                message="Та энэ сурагчийн бүтээлийг устгахдаа итгэлтэй байна уу?"
            />
        </div>
    );
}
