import { PageHeader } from '../../components/admin/PageHeader';
import { StatCard } from '../../components/admin/StatCard';
import { BookOpen, GraduationCap, Users, FileText, MessageSquare, Heart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useDataContext } from '../../context/DataContext';
import { SimpleChart } from '../../components/admin/SimpleChart';
import { useAdminTranslation } from '../../hooks/useAdminTranslation';

export function DashboardView() {
    const { theme } = useAppContext();
    const t = useAdminTranslation();
    const { programs, trainings, teachers, articles, requests, appreciations } = useDataContext();

    // Calculate aggregated stats
    const activeTrainings = trainings.filter(t => t.status === 'active').length;
    const publishedArticles = articles.filter(a => a.status === 'published').length;
    const pendingRequests = requests.filter(r => r.status === 'new' || r.status === 'in_review').length;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title={t.dashboard.title}
                description={t.dashboard.description}
            />

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <StatCard
                    title={t.dashboard.totalPrograms}
                    value={programs.length}
                    icon={<BookOpen size={24} />}
                    colorClass="text-blue-500"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                    title={t.dashboard.activeTrainings}
                    value={activeTrainings}
                    icon={<GraduationCap size={24} />}
                    colorClass="text-brand-accent"
                    trend={{ value: 5, isPositive: true }}
                />
                <StatCard
                    title={t.dashboard.totalTeachers}
                    value={teachers.length}
                    icon={<Users size={24} />}
                    colorClass="text-purple-500"
                />
                <StatCard
                    title="Нийтлэгдсэн мэдээ"
                    value={publishedArticles}
                    icon={<FileText size={24} />}
                    colorClass="text-pink-500"
                    trend={{ value: 2, isPositive: true }}
                />
                <StatCard
                    title="Хүлээгдэж буй хүсэлт"
                    value={pendingRequests}
                    icon={<MessageSquare size={24} />}
                    colorClass="text-orange-500"
                    trend={{ value: 10, isPositive: false }}
                />
                <StatCard
                    title="Ирсэн талархал"
                    value={appreciations.length}
                    icon={<Heart size={24} />}
                    colorClass="text-red-500"
                />
            </div>

            {/* Analytics Section */}
            <div className={`p-6 md:p-8 rounded-[2.5rem] border ${theme === 'dark' ? 'bg-[#111] border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h3 className="text-lg font-bold tracking-tight">{t.dashboard.registrationTrends}</h3>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Сүүлийн 7 хоногийн бүртгэлийн үзүүлэлт</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent px-3 py-1 bg-brand-accent/10 rounded-full border border-brand-accent/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                            Live Data
                        </span>
                    </div>
                </div>
                
                <SimpleChart 
                    data={[
                        { label: 'Даваа', value: 12 },
                        { label: 'Мягмар', value: 18 },
                        { label: 'Лхагва', value: 15 },
                        { label: 'Пүрэв', value: 25 },
                        { label: 'Баасан', value: 20 },
                        { label: 'Бямба', value: 35 },
                        { label: 'Ням', value: 28 },
                    ]} 
                    height={240}
                />
            </div>

            {/* Widgets Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                {/* Recent Requests Widget */}
                <div className={`rounded-3xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5 shadow-none' : 'bg-white border-black/5 shadow-sm'} overflow-hidden`}>
                    <div className={`p-6 border-b ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex justify-between items-center`}>
                        <h3 className={`font-bold text-sm tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Сүүлд ирсэн хүсэлтүүд</h3>
                    </div>
                    <div className="p-0">
                        {requests.slice(0, 3).map((req) => (
                            <div key={req.id} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b last:border-0 ${theme === 'dark' ? 'border-white/5 hover:bg-white/[0.02]' : 'border-black/5 hover:bg-black/[0.02]'} transition-colors`}>
                                <div>
                                    <p className="font-bold text-sm">{req.name}</p>
                                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/50'} uppercase tracking-widest`}>{req.type}</p>
                                </div>
                                <span className={`self-start sm:self-auto px-2 py-1 rounded text-[10px] font-bold ${req.priority === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-brand-secondary/10 text-brand-secondary'}`}>
                                    {req.status === 'new' ? 'Шинэ' : 'Шалгагдаж буй'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Latest Appreciation Widget */}
                <div className={`rounded-3xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5 shadow-none' : 'bg-white border-black/5 shadow-sm'} overflow-hidden`}>
                    <div className={`p-6 border-b ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex justify-between items-center`}>
                        <h3 className={`font-bold text-sm tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Хамгийн сүүлийн талархал</h3>
                    </div>
                    <div className="p-0">
                        {appreciations.slice(0, 3).map((appr) => (
                            <div key={appr.id} className={`p-4 border-b last:border-0 ${theme === 'dark' ? 'border-white/5 hover:bg-white/[0.02]' : 'border-black/5 hover:bg-black/[0.02]'} transition-colors`}>
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-bold text-sm">{appr.sender}</p>
                                    <Heart size={14} className="text-red-500 mt-1" />
                                </div>
                                <p className={`text-xs italic line-clamp-2 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                                    "{appr.messagePreview}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}