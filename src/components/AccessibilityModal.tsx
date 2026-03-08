import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Accessibility, Link2, MousePointer2, Type, 
  FlipHorizontal2, BringToFront, RefreshCcw, Palette,
  Contrast
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import type { AccessibilitySettings } from '../context/AccessibilityContext';
import { useAppContext } from '../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SETTINGS_MAP: { id: keyof Omit<AccessibilitySettings, 'colorBlind'>; icon: any; label: string }[] = [
  { id: 'highContrast', icon: BringToFront, label: 'Дэлгэцийн ялгарал' },
  { id: 'invertColors', icon: Contrast, label: 'Өнгө урвуулах' },
  { id: 'highlightLinks', icon: Link2, label: 'Холбоос тодруулагч' },
  { id: 'largeCursor', icon: MousePointer2, label: 'Хулганы хэмжээ' },
  { id: 'largeText', icon: Type, label: 'Үсгийн хэмжээ' },
  { id: 'letterSpacing', icon: FlipHorizontal2, label: 'Үсэг хоорондын зай' },
];

const COLOR_BLIND_MODES = [
    { id: 'none', label: 'Хэвийн' },
    { id: 'protanopia', label: 'Protanopia' },
    { id: 'deuteranopia', label: 'Deuteranopia' },
    { id: 'tritanopia', label: 'Tritanopia' },
    { id: 'grayscale', label: 'Хар цагаан' },
] as const;

export const AccessibilityModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { settings, toggleSetting, setColorBlind, resetAll } = useAccessibility();
  const { theme } = useAppContext();
  
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
            isDark ? 'bg-[#1a1a1a] text-white border border-white/10' : 'bg-white text-black border border-black/10'
          }`}
        >
          <div className="p-6 md:p-10 relative">
            <button
              onClick={onClose}
              className={`absolute top-6 right-6 p-2 rounded-full ${
                isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'
              } transition-colors`}
            >
              <X size={20} />
            </button>

            <div className={`p-6 rounded-2xl mb-8 flex gap-6 items-start ${
               isDark ? 'border border-white/10' : 'border border-gray-100 shadow-sm'
            }`}>
              <div className="w-16 h-16 rounded-full bg-black text-white shrink-0 flex items-center justify-center">
                <Accessibility size={36} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Хүртээмжтэй байдлын тохиргоо</h2>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  Вэб хүртээмж гэдэг нь вэбсайт, программууд болон дижитал контентыг хөгжлийн бэрхшээлээс үл 
                  хамааран бүх хүмүүс ашиглах боломжтой болгох практикийг хэлнэ. Үүнд харааны, сонсголын, бие 
                  бялдрын, хэл ярианы, танин мэдэхүйн болон мэдрэлийн хөгжлийн бэрхшээлтэй хүмүүс вэб рүү 
                  нэвтрэх, ойлгох, удирдах, харилцах боломжтой гэх зэрэг үйлдлүүд хийгдэж болно.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {SETTINGS_MAP.map((setting) => {
                const Icon = setting.icon;
                const isActive = settings[setting.id as keyof Omit<AccessibilitySettings, 'colorBlind'>];
                
                return (
                  <button
                    key={setting.id}
                    onClick={() => toggleSetting(setting.id as keyof Omit<AccessibilitySettings, 'colorBlind'>)}
                    className={`flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-2xl border-2 transition-all ${
                      isActive 
                        ? (isDark ? 'border-brand-accent bg-brand-accent/10' : 'border-brand-accent bg-brand-accent/5')
                        : (isDark ? 'border-white/10 hover:border-white/30' : 'border-gray-100 hover:border-gray-300')
                    }`}
                  >
                    <Icon size={32} className={`mb-3 ${isActive ? 'text-brand-accent' : ''}`} />
                    <span className="text-xs md:text-sm font-semibold">{setting.label}</span>
                  </button>
                );
              })}
            </div>

            <div className={`p-6 rounded-2xl mb-8 ${isDark ? 'border border-white/10' : 'border border-gray-100 shadow-sm'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <Palette size={20} className="text-brand-accent" />
                    <h3 className="font-bold text-lg">Өнгөний харалган байдал</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {COLOR_BLIND_MODES.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setColorBlind(mode.id)}
                            className={`px-4 py-3 rounded-xl border-2 text-xs font-bold transition-all ${
                                settings.colorBlind === mode.id
                                    ? (isDark ? 'border-brand-accent bg-brand-accent/20 text-brand-accent' : 'border-brand-accent bg-brand-accent/10 text-brand-accent')
                                    : (isDark ? 'border-white/10 hover:border-white/30' : 'border-gray-100 hover:border-gray-300')
                            }`}
                        >
                            {mode.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-white/10">
              <button
                onClick={resetAll}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1a1a] text-white dark:bg-white/10 transition-colors hover:opacity-90 font-semibold"
              >
                Бүгдийг шинэчлэх <RefreshCcw size={18} />
              </button>
              
              <button
                onClick={onClose}
                className={`px-8 py-3 rounded-full font-semibold ${
                  isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
                } transition-colors`}
              >
                Буцах
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
