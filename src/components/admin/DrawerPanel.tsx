import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface DrawerPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: string;
}

export function DrawerPanel({ isOpen, onClose, title, children, footer, maxWidth = 'max-w-md' }: DrawerPanelProps) {
    const { theme } = useAppContext();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={`relative w-full ${maxWidth} h-full flex flex-col shadow-2xl rounded-l-3xl border-l ${theme === 'dark' ? 'bg-[#111] border-white/5 shadow-none' : 'bg-white border-black/5 ring-1 ring-black/5'}`}
                    >
                        <div className={`p-6 md:p-8 flex justify-between items-center shrink-0 border-b ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'hover:bg-white/10 text-white/40 hover:text-white' : 'hover:bg-black/5 text-black/40 hover:text-black'}`}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-sm">
                            {children}
                        </div>

                        {footer && (
                            <div className={`p-6 md:p-8 shrink-0 flex justify-end gap-3 border-t ${theme === 'dark' ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'}`}>
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
