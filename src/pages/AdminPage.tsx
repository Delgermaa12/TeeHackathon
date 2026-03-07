import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, ArrowRight } from 'lucide-react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { DashboardView } from '../features/dashboard/DashboardView';
import { ProgramsView } from '../features/programs/ProgramsView';
import { TrainingsView } from '../features/trainings/TrainingsView';
import { TeachersView } from '../features/teachers/TeachersView';
import { ArticlesView } from '../features/articles/ArticlesView';
import { RequestsView } from '../features/requests/RequestsView';
import { AppreciationView } from '../features/appreciation/AppreciationView';

export default function AdminPage() {
    // Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Navigation State
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'tee2025') {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Нууц үг буруу байна');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[#111] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                            <LogIn className="text-brand-secondary" size={24} />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">Админ нэвтрэх</h1>
                        <p className="text-white/40 text-sm mb-8">Системийн тохиргоо болон мэдээлэл удирдах хэсэг</p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Нууц үг оруулах..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-brand-secondary transition-colors"
                                />
                                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-secondary text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)]"
                            >
                                Нэвтрэх
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        );
    }

    const renderView = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardView />;
            case 'programs': return <ProgramsView />;
            case 'trainings': return <TrainingsView />;
            case 'teachers': return <TeachersView />;
            case 'articles': return <ArticlesView />;
            case 'requests': return <RequestsView />;
            case 'appreciation': return <AppreciationView />;
            default: return <DashboardView />;
        }
    };

    return (
        <AdminLayout
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={() => {
                setIsLoggedIn(false);
                setPassword('');
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderView()}
                </motion.div>
            </AnimatePresence>
        </AdminLayout>
    );
}
