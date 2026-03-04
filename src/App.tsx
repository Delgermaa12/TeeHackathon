import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, GraduationCap, Microscope } from 'lucide-react';
import IntroAnimation from "./components/IntroAnimation";
import { Sparkles, AmbientDecorations } from "./components/AmbientDecorations";
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {//uhuhuh
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black relative">
      {/* Ambient Decorations (Goose & Teee) */}
      <AmbientDecorations />

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl relative z-20"
          >
            <Sparkles />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-mono opacity-60">Австралийн хөтөлбөр</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8">
              Боловсролыг <br />
              <span className="italic font-serif text-[#D4AF37]">Technical Minds.</span>
            </h1>
            

            <div className="flex flex-wrap gap-6">
              <button className="group flex items-center gap-3 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform">
                Бүртгүүлэх
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                Хөтөлбөр үзэх
              </button>
            </div>
          </motion.div>

          <div className="absolute inset-0 lg:relative lg:h-[600px] flex items-center justify-center z-10 opacity-30 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
             <Sparkles />
             <IntroAnimation />
          </div>
        </div>

        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-6 bg-black/50 relative z-10 overflow-hidden">
        <Sparkles />
        
      </section>

      <Footer />
    </main>
  );
}
