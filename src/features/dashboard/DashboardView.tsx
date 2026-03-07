import React from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { StatCard } from '../../components/admin/StatCard';
import { BookOpen, GraduationCap, Users, FileText, MessageSquare, Heart } from 'lucide-react';
import { mockPrograms, mockTrainings, mockTeachers, mockArticles, mockRequests, mockAppreciations } from '../../mock/adminData';
import { useAppContext } from '../../context/AppContext';

export function DashboardView() {
    const { theme } = useAppContext();

    // Calculate aggregated stats
    const activeTrainings = mockTrainings.filter(t => t.status === 'active').length;
    const publishedArticles = mockArticles.filter(a => a.status === 'published').length;
    const pendingRequests = mockRequests.filter(r => r.status === 'new' || r.status === 'in_review').length;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title="Хяналтын самбар"
                description="Системийн ерөнхий мэдээлэл болон статистик үзүүлэлтүүд"
            />

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <StatCard
                    title="Нийт хөтөлбөр"
                    value={mockPrograms.length}
                    icon={<BookOpen size={24} />}
                    colorClass="text-blue-500"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                    title="Идэвхтэй сургалтууд"
                    value={activeTrainings}
                    icon={<GraduationCap size={24} />}
                    colorClass="text-brand-secondary"
                    trend={{ value: 5, isPositive: true }}
                />
                <StatCard
                    title="Нийт багш нар"
                    value={mockTeachers.length}
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
                    value={mockAppreciations.length}
                    icon={<Heart size={24} />}
                    colorClass="text-red-500"
                />
            </div>

            {/* Widgets Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                {/* Recent Requests Widget */}
                <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5' : 'bg-white border-black/5'} overflow-hidden shadow-sm`}>
                    <div className={`p-5 border-b ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex justify-between items-center`}>
                        <h3 className={`font-bold text-sm tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Сүүлд ирсэн хүсэлтүүд</h3>
                    </div>
                    <div className="p-0">
                        {mockRequests.slice(0, 3).map((req) => (
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
                <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5' : 'bg-white border-black/5'} overflow-hidden shadow-sm`}>
                    <div className={`p-5 border-b ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex justify-between items-center`}>
                        <h3 className={`font-bold text-sm tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Хамгийн сүүлийн талархал</h3>
                    </div>
                    <div className="p-0">
                        {mockAppreciations.slice(0, 3).map((appr) => (
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
