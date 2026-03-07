import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Globe,
  MapPin,
  Phone,
  ChevronDown,
  LogIn,
  Menu,
  X,
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';
import { RegistrationForm } from './RegistrationForm';
import logo from '../assets/logo1.png';

const Header: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage } = useAppContext();
  const t = translations[language].nav;
  const { scrollY } = useScroll();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);

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

  const navClass = `text-[11px] uppercase tracking-widest font-bold ${
    theme === 'dark' ? 'text-white/50' : 'text-black/50'
  } hover:text-brand-primary transition-all relative group`;

  const navUnderline = (
    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-300 group-hover:w-full" />
  );

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileInfoOpen(false);
  };

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
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <img
                src={logo}
                alt="Teee"
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {location.pathname === '/' ? (
              <>
                <a href="#home" className={navClass}>
                  {t.home}
                  {navUnderline}
                </a>
                <a href="#program" className={navClass}>
                  {t.program}
                  {navUnderline}
                </a>
                <a href="#articles" className={navClass}>
                  {t.articles}
                  {navUnderline}
                </a>
              </>
            ) : (
              <>
                <Link to="/" className={navClass}>
                  {t.home}
                  {navUnderline}
                </Link>
                <Link to="/" className={navClass}>
                  {t.program}
                  {navUnderline}
                </Link>
                <Link to="/" className={navClass}>
                  {t.articles}
                  {navUnderline}
                </Link>
              </>
            )}

            <Link to="/about" className={navClass}>
              {t.about}
              {navUnderline}
            </Link>

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
                        href={location.pathname === '/' ? item.href : '/'}
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

            <motion.button
              type="button"
              onClick={() => setIsRegistrationOpen(true)}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2.5 ${
                theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
              } hover:bg-brand-primary hover:text-white rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all shadow-lg`}
            >
              <LogIn size={14} />
              <span>{language === 'mn' ? 'Бүртгүүлэх' : 'Register'}</span>
            </motion.button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full ${
                theme === 'dark'
                  ? 'hover:bg-white/5 text-white/70'
                  : 'hover:bg-black/5 text-black/70'
              } transition-colors`}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className={`lg:hidden border-t mt-3 ${
                theme === 'dark'
                  ? 'bg-[#050505]/95 border-white/10'
                  : 'bg-white/95 border-black/10'
              } backdrop-blur-xl`}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {location.pathname === '/' ? (
                  <>
                    <a
                      href="#home"
                      onClick={closeMobileMenu}
                      className={`px-3 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider ${
                        theme === 'dark'
                          ? 'text-white/70 hover:bg-white/5'
                          : 'text-black/70 hover:bg-black/5'
                      }`}
                    >
                      {t.home}
                    </a>
                    <a
                      href="#program"
                      onClick={closeMobileMenu}
                      className={`px-3 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider ${
                        theme === 'dark'
                          ? 'text-white/70 hover:bg-white/5'
                          : 'text-black/70 hover:bg-black/5'
                      }`}
                    >
                      {t.program}
                    </a>
                    <a
                      href="#articles"
                      onClick={closeMobileMenu}
                      className={`px-3 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider ${
                        theme === 'dark'
                          ? 'text-white/70 hover:bg-white/5'
                          : 'text-black/70 hover:bg-black/5'
                      }`}
                    >
                      {t.articles}
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      onClick={closeMobileMenu}
                      className={`px-3 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider ${
                        theme === 'dark'
                          ? 'text-white/70 hover:bg-white/5'
                          : 'text-black/70 hover:bg-black/5'
                      }`}
                    >
                      {t.home}
                    </Link>
                    <Link
                      to="/"
                      onClick={closeMobileMenu}
                      className={`px-3 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider ${
                        theme === 'dark'
                          ? 'text-white/70 hover:bg-white/5'
                          : 'text-black/70 hover:bg-black/5'
                      }`}
                    >
                      {t.program}
                    </Link>
                    <Link
                      to="/"
                      onClick={closeMobileMenu}
                      className={`px-3 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider ${
                        theme === 'dark'
                          ? 'text-white/70 hover:bg-white/5'
                          : 'text-black/70 hover:bg-black/5'
                      }`}
                    >
                      {t.articles}
                    </Link>
                  </>
                )}

                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className={`px-3 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider ${
                    theme === 'dark'
                      ? 'text-white/70 hover:bg-white/5'
                      : 'text-black/70 hover:bg-black/5'
                  }`}
                >
                  {t.about}
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileInfoOpen(!isMobileInfoOpen)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider ${
                    theme === 'dark'
                      ? 'text-white/70 hover:bg-white/5'
                      : 'text-black/70 hover:bg-black/5'
                  }`}
                >
                  <span>{language === 'mn' ? 'Мэдээлэл' : 'Info'}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isMobileInfoOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isMobileInfoOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden ml-2 flex flex-col"
                    >
                      {dropdownItems.map((item, i) => (
                        <a
                          key={i}
                          href={location.pathname === '/' ? item.href : '/'}
                          onClick={closeMobileMenu}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider ${
                            theme === 'dark'
                              ? 'text-white/60 hover:bg-white/5'
                              : 'text-black/60 hover:bg-black/5'
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="button"
                  onClick={() => {
                    setIsRegistrationOpen(true);
                    closeMobileMenu();
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`sm:hidden mt-2 flex items-center justify-center gap-2 px-4 py-3 ${
                    theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                  } hover:bg-brand-primary hover:text-white rounded-full text-[11px] font-bold uppercase tracking-wider transition-all shadow-lg`}
                >
                  <LogIn size={14} />
                  <span>{language === 'mn' ? 'Бүртгүүлэх' : 'Register'}</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </>
  );
};

export default Header;