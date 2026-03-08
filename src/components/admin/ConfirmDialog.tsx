import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Тийм',
    cancelText = 'Үгүй',
    danger = true
}: ConfirmDialogProps) {
    const { theme } = useAppContext();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        className={`relative w-full max-w-sm p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'} shadow-2xl flex flex-col`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${danger ? 'bg-red-500/10 text-red-500' : 'bg-brand-accent/10 text-brand-accent'}`}>
                                <AlertTriangle size={20} />
                            </div>
                            <button
  type="button"
  onClick={onClose}
  aria-label="Close"
  title="Close"
  className={`p-1.5 rounded-lg transition-all ${
    theme === 'dark'
      ? 'hover:bg-white/10 text-white/40'
      : 'hover:bg-black/5 text-black/40'
  }`}
>
  <X size={16} aria-hidden="true" />
</button>
                        </div>

                        <h3 className="text-lg font-bold mb-2">{title}</h3>
                        <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                            {message}
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={onClose}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${theme === 'dark' ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'hover:bg-black/5 text-black/60 hover:text-black'}`}
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all shadow-md ${danger ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-brand-accent hover:brightness-105 text-black'}`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
