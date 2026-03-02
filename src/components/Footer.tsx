import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3 opacity-40">
          <div className="w-6 h-6 bg-[#D4AF37] rounded-full" />
          <span className="font-mono text-[10px] uppercase tracking-widest">Te³ Engineering</span>
        </div>
        <div className="text-[10px] uppercase tracking-widest opacity-30">
          © 2026 Te³ Education. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
