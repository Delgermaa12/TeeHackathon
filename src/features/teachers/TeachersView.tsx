import React, { useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { type ViewMode } from '../../components/admin/ViewModeToggle';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { ImageUpload } from '../../components/admin/ImageUpload';
import { Users, Edit3, Trash2, Mail, Facebook, Instagram, Linkedin, Globe, Star } from 'lucide-react';
import type { Teacher } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';
import { useDataContext } from '../../context/DataContext';
import { useAlertContext } from '../../context/AlertContext';
import { useAdminTranslation } from '../../hooks/useAdminTranslation';

export function TeachersView() {
    const { theme } = useAppContext();
    const t = useAdminTranslation();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const { teachers, addTeacher, updateTeacher, deleteTeacher } = useDataContext();
    const { showAlert } = useAlertContext();

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
            deleteTeacher(teacherToDelete);
            showAlert(t.alerts.deleted, 'success');
            setTeacherToDelete(null);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const skillsString = formData.get('skills') as string;
        const skills = skillsString ? skillsString.split(',').map(s => s.trim()).filter(s => s) : [];

        const socialLinks: any[] = [];
        const fb = formData.get('facebook') as string;
        const ig = formData.get('instagram') as string;
        if (fb) socialLinks.push({ platform: 'facebook', url: fb });
        if (ig) socialLinks.push({ platform: 'instagram', url: ig });

        const certsString = formData.get('certificates') as string;
        const certificates = certsString ? certsString.split('\n').map(line => {
            const [title, image] = line.split('|').map(s => s.trim());
            return title && image ? { title, image } : null;
        }).filter(c => c) : [];

        const teacherData: any = {
            name: formData.get('name'),
            specialization: formData.get('specialization'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            age: Number(formData.get('age')),
            gender: formData.get('gender'),
            bio: formData.get('bio'),
            experience: formData.get('experience'),
            education: formData.get('education'),
            philosophy: formData.get('philosophy'),
            github: formData.get('github'),
            type: formData.get('type'),
            skills: skills,
            status: 'active',
            avatar: selectedTeacher?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200',
            socialLinks: socialLinks,
            certificates: certificates
        };

        if (selectedTeacher) {
            updateTeacher(selectedTeacher.id, teacherData);
            showAlert(t.alerts.updated, 'success');
        } else {
            addTeacher(teacherData);
            showAlert(t.alerts.saved, 'success');
        }
        setIsDrawOpen(false);
    };

    const filteredTeachers = teachers.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter ? t.status === statusFilter : true;
        const matchesType = typeFilter ? t.type === typeFilter : true;
        return matchesSearch && matchesStatus && matchesType;
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
            header: 'Төрөл',
            accessorKey: 'type',
            cell: ({ row }) => (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.type === 'udirdlaga' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {row.type === 'udirdlaga' ? 'Удирдлага' : 'Багш'}
                </span>
            )
        },
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
            header: 'Статус',
            accessorKey: 'status',
            cell: ({ row }) => <StatusBadge status={row.status} />
        },
        {
            header: 'Үйлдэл',
            accessorKey: 'id',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button aria-label='1' onClick={(e) => { e.stopPropagation(); handleEdit(row); }} className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-white/5 text-white/40 hover:text-white' : 'border-black/5 hover:bg-black/5 text-black/40 hover:text-black'}`}>
                        <Edit3 size={14} />
                    </button>
                    <button aria-label='2' onClick={(e) => handleDeleteClick(row.id, e)} className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500' : 'border-black/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500'}`}>
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title={t.sidebar.teachers}
                description="Бүртгэлтэй сургагч багш нарын мэдээлэл"
                icon={Users}
                actionLabel={t.common.add}
                onAction={handleAdd}
            />

            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                searchPlaceholder={t.common.search}
                filters={[
                    {
                        key: 'status',
                        label: t.common.status,
                        value: statusFilter,
                        onChange: setStatusFilter,
                        options: [{ label: 'Бүх', value: '' }, { label: 'Идэвхтэй', value: 'active' }, { label: 'Идэвхгүй', value: 'inactive' }]
                    },
                    {
                        key: 'type',
                        label: 'Төрөл',
                        value: typeFilter,
                        onChange: setTypeFilter,
                        options: [{ label: 'Бүх', value: '' }, { label: 'Удирдлага', value: 'udirdlaga' }, { label: 'Багш', value: 'bagsh' }]
                    }
                ]}
            />

            {viewMode === 'list' ? (
                <DataTable columns={columns} data={filteredTeachers} onRowClick={handleEdit} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTeachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            onClick={() => handleEdit(teacher)}
                            className={`group cursor-pointer rounded-3xl p-6 md:p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${theme === 'dark'
                                ? 'bg-[#151515] border-white/5 hover:border-brand-secondary/30 shadow-none'
                                : 'bg-white border-black/5 hover:border-brand-secondary/30 shadow-sm ring-1 ring-black/5'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <img
                                            src={teacher.avatar}
                                            alt={teacher.name}
                                            className="w-16 h-16 rounded-2xl object-cover border border-black/5 shadow-sm"
                                        />
                                        <div className="absolute -bottom-1 -right-1">
                                            <StatusBadge status={teacher.status} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className={`font-bold group-hover:text-brand-secondary transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                            {teacher.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] opacity-50">{teacher.specialization}</span>
                                            {teacher.age && (
                                                <span className={`text-[10px] px-1.5 rounded bg-brand-secondary/10 text-brand-secondary font-bold`}>
                                                    {teacher.age} нас
                                                </span>
                                            )}
                                            <span className={`text-[10px] px-1.5 rounded font-bold ${teacher.type === 'udirdlaga' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                {teacher.type === 'udirdlaga' ? 'Удирдлага' : 'Багш'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button aria-label='3'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(teacher);
                                        }}
                                        className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'} transition-colors`}
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                    <button aria-label='4'
                                        onClick={(e) => handleDeleteClick(teacher.id, e)}
                                        className="text-red-500/40 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className={`space-y-5 pt-5 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                                {teacher.bio && (
                                    <p className={`text-[10px] line-clamp-2 leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/60'}`}>
                                        {teacher.bio}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-1.5">
                                    {teacher.skills?.slice(0, 3).map((skill, index) => (
                                        <span key={index} className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/60 font-bold'}`}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[9px] opacity-60">
                                    {teacher.experience && <div><span className="font-bold">Туршлага:</span> {teacher.experience}</div>}
                                    {teacher.education && <div><span className="font-bold">Боловсрол:</span> {teacher.education}</div>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className={`flex items-center gap-3 text-xs ${theme === 'dark' ? 'opacity-60' : 'text-black/70 font-medium'}`}>
                                        <Mail size={14} className="text-brand-secondary" />
                                        <span className="truncate max-w-[120px]">{teacher.email}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {teacher.socialLinks?.map((link, i) => {
                                            const Icon = link.platform === 'facebook' ? Facebook :
                                                link.platform === 'instagram' ? Instagram :
                                                    link.platform === 'linkedin' ? Linkedin : Globe;
                                            return (
                                                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
                                                    <Icon size={12} />
                                                </a>
                                            );
                                        })}
                                    </div>
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
                        <button type="button" onClick={() => setIsDrawOpen(false)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/60' : 'border-black/10 hover:bg-black/5 text-black/60'}`}>Цуцлах</button>
                        <button form="teacher-form" type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-accent text-black shadow-md hover:brightness-105 transition-all">Хадгалах</button>
                    </>
                }
            >
                <form id="teacher-form" onSubmit={handleSave} className="space-y-6">
                    <ImageUpload
                        label="Багшийн зураг"
                        value={selectedTeacher?.avatar}
                        onChange={(val) => {
                            if (selectedTeacher) setSelectedTeacher({ ...selectedTeacher, avatar: val });
                        }}
                    />
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Нэр</label>
                        <input aria-label="Нэр" name="name" type="text" defaultValue={selectedTeacher?.name} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} required />
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Мэргэжил</label>
                        <input aria-label="Мэргэжил" name="specialization" type="text" defaultValue={selectedTeacher?.specialization} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Утас</label>
                            <input aria-label="Утас" name="phone" type="text" defaultValue={selectedTeacher?.phone} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>И-мэйл</label>
                            <input aria-label="И-мэйл" name="email" type="email" defaultValue={selectedTeacher?.email} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Нас</label>
                            <input aria-label="Нас" name="age" type="number" defaultValue={selectedTeacher?.age} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Ажилтан төрөл</label>
                            <select aria-label="Төрөл" name="type" defaultValue={selectedTeacher?.type || 'bagsh'} className={`w-full px-4 py-3 rounded-xl border appearance-none outline-none ${theme === 'dark' ? 'bg-[#151515] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                                <option value="udirdlaga">Удирдлага</option>
                                <option value="bagsh">Багш</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Туршлага</label>
                            <input aria-label="Туршлага" name="experience" type="text" defaultValue={selectedTeacher?.experience} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Боловсрол</label>
                            <input aria-label="Боловсрол" name="education" type="text" defaultValue={selectedTeacher?.education} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>GitHub Link</label>
                        <input aria-label="GitHub" name="github" type="text" defaultValue={selectedTeacher?.github} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Философи</label>
                        <textarea name="philosophy" defaultValue={selectedTeacher?.philosophy} rows={2} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none resize-none`} placeholder="Багшийн баримталдаг зарчим..." />
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Ур чадвар (таслалаар тусгаарлах)</label>
                        <div className="relative">
                            <input type="text" name="skills" defaultValue={selectedTeacher?.skills?.join(', ')} className={`w-full px-4 py-3 pl-10 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} placeholder="React, Node.js, UI/UX" />
                            <Star size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Үнэмлэх, Сертификат (Нэр|Зургийн линк - мөр бүр дээр нэг)</label>
                        <textarea name="certificates" defaultValue={selectedTeacher?.certificates?.map(c => `${c.title}|${c.image}`).join('\n')} rows={3} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none resize-none font-mono text-xs`} placeholder="Linux Essentials|https://url.com/image.png" />
                    </div>
                    <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Дэлгэрэнгүй тайлбар (Bio)</label>
                        <textarea name="bio" defaultValue={selectedTeacher?.bio} rows={3} className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none resize-none`} placeholder="Багшийн танилцуулга..." />
                    </div>
                    <div className="space-y-3">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Холбоотой линкүүд</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <Facebook size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
                                <input name="facebook" defaultValue={selectedTeacher?.socialLinks?.find(l => l.platform === 'facebook')?.url} type="text" placeholder="Facebook URL" className={`w-full pl-9 pr-4 py-2 text-xs rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                            </div>
                            <div className="relative">
                                <Instagram size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
                                <input name="instagram" defaultValue={selectedTeacher?.socialLinks?.find(l => l.platform === 'instagram')?.url} type="text" placeholder="Instagram URL" className={`w-full pl-9 pr-4 py-2 text-xs rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} outline-none`} />
                            </div>
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