import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const StudentProjectSection: React.FC = () => {
  const { theme, language } = useAppContext();
  const [started, setStarted] = useState(false);

  // Энд өөрийн Scratch project embed link-ээ тавина
  const scratchEmbedUrl = 'https://scratch.mit.edu/projects/123456789/embed';

  return (
    <section id="student-project" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <div className="px-4 py-1.5 rounded-full border border-brand-secondary/30 bg-brand-secondary/5 text-brand-secondary text-[10px] uppercase tracking-[0.3em] font-bold">
            {language === 'mn' ? 'Сурагчдын бүтээл' : 'Student Project'}
          </div>

          <h2
            className={`text-4xl md:text-6xl font-black tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {language === 'mn' ? 'Сурагчдын бүтээл' : 'Student Creation'}
          </h2>

          <p
            className={`max-w-2xl text-sm md:text-base ${
              theme === 'dark' ? 'text-white/50' : 'text-black/50'
            }`}
          >
            {language === 'mn'
              ? 'Манай сурагчдын хийсэн тоглоомыг эндээс шууд ажиллуулж үзээрэй.'
              : 'Play a game created by our students directly here.'}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-[2rem] overflow-hidden border shadow-2xl ${
            theme === 'dark'
              ? 'bg-[#111111] border-white/5'
              : 'bg-[#f5f5f5] border-black/5'
          }`}
        >
          {!started ? (
            <div className="relative">
              <img
                src="/student-game-cover.png"
                alt="Student Game Preview"
                className="w-full h-[260px] sm:h-[420px] lg:h-[560px] object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center px-4">
                  <h3 className="text-white text-2xl sm:text-4xl font-black tracking-tight mb-3">
                    {language === 'mn' ? 'Тоглоомоо эхлүүлэх' : 'Start the Game'}
                  </h3>

                  <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl">
                    {language === 'mn'
                      ? 'Start дээр дарахад тоглоом яг энэ хэсэг дээр шууд гарч ирнэ.'
                      : 'Press Start and the game will open right here.'}
                  </p>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStarted(true)}
                    className="px-8 py-4 bg-brand-secondary text-black rounded-full font-bold text-sm uppercase tracking-widest shadow-xl shadow-brand-secondary/20"
                  >
                    Start
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div
                className={`flex items-center justify-between px-4 sm:px-6 py-4 border-b ${
                  theme === 'dark' ? 'border-white/5' : 'border-black/5'
                }`}
              >
                <div>
                  <h3
                    className={`font-black text-lg sm:text-xl ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                  >
                    {language === 'mn' ? 'Сурагчдын бүтээл' : 'Student Project'}
                  </h3>

                  <p
                    className={`text-xs uppercase tracking-[0.2em] font-bold ${
                      theme === 'dark' ? 'text-white/30' : 'text-black/30'
                    }`}
                  >
                    Scratch Game
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStarted(false)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                    theme === 'dark'
                      ? 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                      : 'border-black/10 text-black/60 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {language === 'mn' ? 'Хаах' : 'Close'}
                </button>
              </div>

              <div className="w-full aspect-[20/9]">
                <iframe
                  src={scratchEmbedUrl}
                  title="Student Scratch Game"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default StudentProjectSection;