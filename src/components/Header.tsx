import React, { useState } from 'react';
import { Sun, Moon, Globe, MapPin, Phone, ChevronDown, LogIn } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';
import { RegistrationForm } from './RegistrationForm';
import logo from "../assets/logo.png";

const Header: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage } = useAppContext();
  const t = translations[language].nav;
  const { scrollY } = useScroll();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const dropdownItems = [
    {
      icon: <MapPin size={14} />,
      label: language === 'mn' ? 'Байршил' : 'Location',
      href: '#location',
    },
    {
      icon: <Phone size={14} />,
      label: language === 'mn' ? 'Холбоо барих' : 'Contact',
      href: '#contact',
    },
  ];

  const navItems = [
    { key: 'home', label: t.home },
    { key: 'program', label: t.program },
    { key: 'courses', label: t.courses },
    { key: 'teachers', label: t.teachers },
    { key: 'articles', label: t.articles },
    { key: 'about', label: t.about },
  ];

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    [
      'rgba(0, 0, 0, 0)',
      theme === 'dark' ? 'rgba(5, 5, 5, 0.82)' : 'rgba(255, 255, 255, 0.88)',
    ]
  );

  const headerPadding = useTransform(scrollY, [0, 100], ['1rem', '0.7rem']);

  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    [
      'rgba(255,255,255,0)',
      theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    ]
  );

  return (
    <>
      <motion.header
        style={{
          backgroundColor: headerBg,
          paddingTop: headerPadding,
          paddingBottom: headerPadding,
          borderColor: headerBorder,
          backdropFilter: 'blur(12px)',
        }}
        className="fixed top-0 left-0 w-full z-50 border-b transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          <a href="pages/HomePage" className="flex items-center gap-2 group shrink-0">
            <div className="relative">
              <div className="relative">
                <img src={logo} alt="Teee" className="h-20 w-auto"
                /></div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item, i) => (
              <motion.a
                key={item.key}
                href={`#${item.key}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`text-[11px] uppercase tracking-widest font-bold ${
                  theme === 'dark' ? 'text-white/50' : 'text-black/50'
                } hover:text-brand-primary transition-all relative group`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-[11px] uppercase tracking-widest font-bold ${
                  theme === 'dark' ? 'text-white/50' : 'text-black/50'
                } hover:text-brand-primary transition-all`}
              >
                {language === 'mn' ? 'Мэдээлэл' : 'Info'}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className={`absolute top-full left-0 mt-2 w-52 py-2 rounded-2xl border ${
                      theme === 'dark'
                        ? 'bg-[#0A0D18]/95 border-white/10'
                        : 'bg-white/95 border-black/10'
                    } backdrop-blur-xl shadow-2xl z-50`}
                  >
                    {dropdownItems.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider ${
                          theme === 'dark'
                            ? 'text-white/70 hover:text-brand-primary hover:bg-white/5'
                            : 'text-black/70 hover:text-brand-primary hover:bg-black/5'
                        } transition-all`}
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setLanguage(language === 'mn' ? 'en' : 'mn')}
              className={`p-2 rounded-full ${
                theme === 'dark'
                  ? 'hover:bg-white/5 text-white/50'
                  : 'hover:bg-black/5 text-black/50'
              } transition-colors flex items-center gap-1`}
            >
              <Globe size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">
                {language}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === 'dark'
                  ? 'hover:bg-white/5 text-white/50'
                  : 'hover:bg-black/5 text-black/50'
              } transition-colors`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* ЗӨВХӨН НЭГ БҮРТГҮҮЛЭХ BUTTON */}
            <motion.button
              type="button"
              onClick={() => setIsRegistrationOpen(true)}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 ${
                theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
              } hover:bg-brand-primary hover:text-white rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all shadow-lg`}
            >
              <LogIn size={14} />
              <span>{language === 'mn' ? 'Бүртгүүлэх' : 'Register'}</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </>
  );
};

export default Header;