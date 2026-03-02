import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Нүүр', href: '#' },
    { name: 'Хөтөлбөр', href: '#' },
    { name: 'Сургалт', href: '#' },
    { name: 'Нийтлэл', href: '#' },
    { name: 'Бидний тухай', href: '#' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold text-black">Te³</span>
          </div>
          <span className="font-mono text-sm tracking-widest uppercase opacity-80">Engineering Ed</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.2em] font-medium opacity-60">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:opacity-100 transition-opacity">{link.name}</a>
          ))}
          <button className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
            Бүртгүүлэх
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col gap-6 p-8 text-[12px] uppercase tracking-[0.2em] font-medium">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                Бүртгүүлэх
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
