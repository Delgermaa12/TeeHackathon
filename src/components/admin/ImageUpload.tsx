import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface ImageUploadProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
}

export function ImageUpload({ value, onChange, label, aspectRatio = 'square' }: ImageUploadProps) {
    const { theme } = useAppContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            onChange(result);
        };
        reader.readAsDataURL(file);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const aspectClass =
        aspectRatio === 'video' ? 'aspect-video' :
            aspectRatio === 'portrait' ? 'aspect-[3/4]' :
                aspectRatio === 'wide' ? 'aspect-[21/9]' :
                    'aspect-square';

    return (
        <div className="space-y-2">
            {label && (
                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                    {label}
                </label>
            )}

            <div
                className={`relative group rounded-3xl border-2 border-dashed transition-all duration-500 overflow-hidden cursor-pointer ${aspectClass} ${isDragging ? 'border-brand-secondary bg-brand-secondary/5 scale-[0.98]' :
                    theme === 'dark' ? 'border-white/10 bg-white/5 hover:border-white/20' : 'border-black/10 bg-black/5 hover:border-black/20'
                    }`}
                onDragOver={onDragOver}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                {value ? (
                    <>
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                            <div className="p-3 rounded-full bg-white/10 text-white">
                                <Upload size={20} />
                            </div>
                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Зураг солих</span>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onChange(''); }}
                            className="absolute top-4 right-4 p-2 rounded-2xl bg-black/60 text-white hover:bg-red-500 transition-all z-10 backdrop-blur-md border border-white/10"
                        >
                            <X size={14} />
                        </button>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                        <div className={`p-5 rounded-[2rem] transition-all duration-500 ${theme === 'dark' ? 'bg-white/5 text-brand-secondary' : 'bg-black/5 text-brand-secondary'
                            } group-hover:scale-110 group-hover:rotate-3`}>
                            <Upload size={32} />
                        </div>
                        <div className="space-y-1.5">
                            <p className={`text-sm font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Зураг оруулах</p>
                            <p className="text-[10px] opacity-40 font-medium uppercase tracking-widest">Drag and drop or click to browse</p>
                        </div>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onSelect}
                />
            </div>
        </div>
    );
}
