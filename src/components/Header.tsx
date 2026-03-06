import React, { useState, useRef, useEffect } from 'react';
import { LogIn, Sun, Moon, Globe, MapPin, Phone, ChevronDown, Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';

const Header = () => {
  const { theme, toggleTheme, language, setLanguage } = useAppContext();
  const t = translations[language].nav;
  const { scrollY } = useScroll();
  
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    [
      'rgba(0, 0, 0, 0)', 
      theme === 'dark' ? 'rgba(5, 5, 5, 0.8)' : 'rgba(255, 255, 255, 0.8)'
    ]
  );
  const headerPadding = useTransform(scrollY, [0, 100], ['1.5rem', '1rem']);
  const headerBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(12px)']);
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)']
  );

  // Гадна дархад dropdown хаах
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mobile menu хаах (link дээр дарахад)
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
  };

  const navItems = [
    { key: 'home', label: t.home, href: '#home' },
    { key: 'program', label: t.program, href: '#program' },
    { key: 'courses', label: t.courses, href: '#courses' },
    { key: 'teachers', label: t.teachers, href: '/staff' },
    { key: 'articles', label: t.articles, href: '#articles' },
    { 
      key: 'about', 
      label: t.about, 
      href: '#about',
      hasDropdown: true,
      dropdownItems: [
        { icon: <MapPin size={14} />, label: language === 'mn' ? 'Хаяг байршил' : 'Location', href: '#location' },
        { icon: <Phone size={14} />, label: language === 'mn' ? 'Холбоо барих' : 'Contact', href: '#contact' }
      ]
    },
  ];

  // Анимейшнтэй лого компонент
  const AnimatedLogo = () => (
    <motion.div 
      className="relative group cursor-pointer flex items-center gap-2"
      whileHover="hover"
    >
      <div className="relative">
        <motion.span 
          className={`text-2xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          variants={{
            hover: {
              textShadow: theme === 'dark' ? "0 0 8px #D4AF37" : "0 0 8px #F97316",
              transition: { duration: 0.3 }
            }
          }}
        >
          Te
          <motion.sup 
            className="text-brand-primary inline-block"
            variants={{
              hover: {
                y: [-2, -4, -2],
                rotate: [0, 10, 0],
                scale: [1, 1.2, 1],
                transition: { duration: 0.5, repeat: Infinity }
              }
            }}
          >
            3
          </motion.sup>
        </motion.span>
        
        {/* Гэрэлтэх эффект */}
        <motion.div 
          className="absolute -inset-2 bg-brand-primary/20 rounded-full blur-xl"
          variants={{
            hover: {
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
              transition: { duration: 1.5, repeat: Infinity }
            }
          }}
        />
      </div>
      
      <motion.span 
        className={`text-[10px] uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-white/30' : 'text-black/30'} font-bold ml-2 hidden sm:block`}
        variants={{
          hover: { color: theme === 'dark' ? "#D4AF37" : "#F97316", transition: { duration: 0.3 } }
        }}
      >
        Education
      </motion.span>
    </motion.div>
  );

  return (
    <motion.header
      style={{ 
        backgroundColor: headerBg,
        backdropFilter: headerBlur,
        paddingTop: headerPadding,
        paddingBottom: headerPadding,
        borderColor: headerBorder
      }}
      className="fixed top-0 left-0 w-full z-50 border-b transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <AnimatedLogo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, i) => (
            <div key={item.key} className="relative" ref={item.hasDropdown ? dropdownRef : undefined}>
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                    className={`flex items-center gap-1 text-[11px] uppercase tracking-widest font-bold ${
                      theme === 'dark' ? 'text-white/40' : 'text-black/40'
                    } hover:text-brand-primary transition-all relative group`}
                  >
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                  
                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {aboutDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full left-0 mt-2 w-48 rounded-xl overflow-hidden border ${
                          theme === 'dark' ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-black/10'
                        } shadow-2xl`}
                      >
                        {item.dropdownItems?.map((dropdownItem, idx) => (
                          <motion.a
                            key={idx}
                            href={dropdownItem.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`flex items-center gap-3 px-4 py-3 text-xs ${
                              theme === 'dark' 
                                ? 'text-white/60 hover:bg-white/5 hover:text-brand-primary' 
                                : 'text-black/60 hover:bg-black/5 hover:text-brand-primary'
                            } transition-colors`}
                          >
                            <span className={theme === 'dark' ? 'text-white/30' : 'text-black/30'}>
                              {dropdownItem.icon}
                            </span>
                            {dropdownItem.label}
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.a
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-[11px] uppercase tracking-widest font-bold ${
                    theme === 'dark' ? 'text-white/40' : 'text-black/40'
                  } hover:text-brand-primary transition-all relative group`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-300 group-hover:w-full" />
                </motion.a>
              )}
            </div>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Toggle */}
          <button 
            onClick={() => setLanguage(language === 'mn' ? 'en' : 'mn')}
            className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-white/5 text-white/40' : 'hover:bg-black/5 text-black/40'} transition-colors flex items-center gap-2`}
          >
            <Globe size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">{language}</span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-white/5 text-white/40' : 'hover:bg-black/5 text-black/40'} transition-colors`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Login Button - Desktop */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`hidden sm:flex items-center gap-3 px-4 sm:px-6 py-2.5 ${
              theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
            } hover:bg-brand-primary hover:text-white rounded-full text-[11px] font-bold uppercase tracking-wider transition-all shadow-lg`}
          >
            <LogIn size={14} />
            <span className="hidden sm:inline">{t.login}</span>
          </motion.button>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full ${
              theme === 'dark' ? 'hover:bg-white/5 text-white' : 'hover:bg-black/5 text-black'
            } transition-colors`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`lg:hidden overflow-hidden ${
              theme === 'dark' ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-black/5'
            } border-t`}
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              {/* Mobile Nav Items */}
              {navItems.map((item) => (
                <div key={item.key}>
                  {item.hasDropdown ? (
                    <div className="space-y-2">
                      <div className={`text-sm font-bold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-white/60' : 'text-black/60'
                      }`}>
                        {item.label}
                      </div>
                      <div className="pl-4 space-y-2">
                        {item.dropdownItems?.map((dropdownItem, idx) => (
                          <a
                            key={idx}
                            href={dropdownItem.href}
                            onClick={handleMobileLinkClick}
                            className={`flex items-center gap-3 py-2 text-sm ${
                              theme === 'dark' 
                                ? 'text-white/40 hover:text-brand-primary' 
                                : 'text-black/40 hover:text-brand-primary'
                            } transition-colors`}
                          >
                            {dropdownItem.icon}
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={handleMobileLinkClick}
                      className={`block py-2 text-sm font-bold uppercase tracking-wider ${
                        theme === 'dark' 
                          ? 'text-white/60 hover:text-brand-primary' 
                          : 'text-black/60 hover:text-brand-primary'
                      } transition-colors`}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              
              {/* Mobile Login Button */}
              <button className={`w-full mt-4 flex items-center justify-center gap-3 px-6 py-3 ${
                theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
              } hover:bg-brand-primary hover:text-white rounded-full text-sm font-bold uppercase tracking-wider transition-all`}>
                <LogIn size={16} />
                {t.login}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;