import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, animate } from 'motion/react';
import { Trophy, Zap, Star, Award, Cpu, Palette, ExternalLink, Quote, Phone, Mail, Clock, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';

// --- Sub-components for Hero ---
const COLORS = {
  GOLD: "#D4AF37",
  YELLOW: "#F4B400",
  RED: "#DB4437",
  BLUE: "#4285F4",
  GREEN: "#0F9D58",
  BG: "#050505",
  PENCIL: "#A0A0A0",
};

const TransitionScratches = ({ seed, color = COLORS.PENCIL }: { seed: number; color?: string; key?: string | number }) => {
  const lines = useMemo(() => {
    const rand = (n: number) => {
      const x = Math.sin(seed * 999 + n * 1234) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 14 }).map((_, i) => {
      const x1 = rand(i) * 240;
      const y1 = rand(i + 1) * 240;
      const x2 = rand(i + 2) * 240;
      const y2 = rand(i + 3) * 240;
      const cx = (x1 + x2) / 2 + (rand(i + 4) * 18 - 9);
      const cy = (y1 + y2) / 2 + (rand(i + 5) * 18 - 9);
      const dashA = rand(i + 7) * 10 + 6;
      const dashB = rand(i + 8) * 40 + 18;
      return {
        id: i,
        d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`,
        w: rand(i + 6) * 1.2 + 0.25,
        dashA,
        dashB,
        delay: rand(i + 9) * 0.18,
        rot: rand(i + 10) * 10 - 5,
        offset: dashA + dashB,
      };
    });
  }, [seed]);

  const dust = useMemo(() => {
    const rand = (n: number) => {
      const x = Math.sin(seed * 777 + n * 2222) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      r: rand(i) * 0.9 + 0.25,
      x1: 120 + (rand(i + 1) * 70 - 35),
      y1: 120 + (rand(i + 2) * 70 - 35),
      x2: 120 + (rand(i + 3) * 120 - 60),
      y2: 120 + (rand(i + 4) * 120 - 60),
      delay: 0.05 + i * 0.03,
    }));
  }, [seed]);

  return (
    <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.9, 0] }} transition={{ duration: 0.9, ease: "easeInOut" }} style={{ mixBlendMode: "screen" }}>
      <svg viewBox="0 0 240 240" className="w-full h-full">
        <g filter="url(#glow)" opacity="0.9">
          {lines.map((ln) => (
            <motion.path key={ln.id} d={ln.d} fill="none" stroke={color} strokeWidth={ln.w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${ln.dashA} ${ln.dashB}`} initial={{ opacity: 0, pathLength: 0, strokeDashoffset: ln.offset, rotate: ln.rot, transformOrigin: "120px 120px" }} animate={{ opacity: [0, 0.35, 0], pathLength: [0, 1], strokeDashoffset: [ln.offset, 0] }} transition={{ duration: 0.55, delay: ln.delay, ease: "easeInOut" }} />
          ))}
        </g>
        {dust.map((d) => (
          <motion.circle key={d.id} r={d.r} fill={COLORS.GOLD} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0], cx: [d.x1, d.x2], cy: [d.y1, d.y2], scale: [0.6, 1.3, 0.6] }} transition={{ duration: 0.8, delay: d.delay, ease: "easeOut" }} />
        ))}
      </svg>
    </motion.div>
  );
};

const SketchDrafts = ({ path, delay = 0 }: { path: string; delay?: number }) => (
  <g>
    {[...Array(4)].map((_, i) => (
      <motion.path key={i} d={path} fill="none" stroke={COLORS.PENCIL} strokeWidth="0.3" initial={{ pathLength: 0, opacity: 0, translateX: Math.random() * 4 - 2, translateY: Math.random() * 4 - 2, rotate: Math.random() * 2 - 1 }} animate={{ pathLength: [0, 1], opacity: [0, 0.15, 0] }} transition={{ duration: 2, delay: delay + i * 0.4, ease: "easeInOut" }} />
    ))}
  </g>
);

const LogoText = ({ scene, disintegrated = false }: { scene: number; disintegrated?: boolean }) => {
  const characters = [
    { char: "T", color: COLORS.RED, x: 90, y: 135, fontSize: 38, delay: 0, rotate: -5 },
    { char: "e", color: COLORS.BLUE, x: 115, y: 135, fontSize: 34, delay: 0.2, rotate: 3 },
    { char: "³", color: COLORS.GREEN, x: 138, y: 115, fontSize: 20, delay: 0.4, rotate: 8 },
  ];
  return (
    <g>
      {characters.map((c, i) => (
        <React.Fragment key={i}>
          {scene === 3 && disintegrated && (
            <motion.text x={c.x} y={c.y} fill="none" stroke={c.color} strokeWidth="0.5" fontSize={c.fontSize} fontFamily="'Inter', sans-serif" fontWeight="900" initial={{ opacity: 0, rotate: c.rotate }} animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 3, delay: c.delay }} filter="url(#glow)">{c.char}</motion.text>
          )}
          {scene === 4 && (
            <motion.text x={c.x} y={c.y} fill={c.color} fontSize={c.fontSize} fontFamily="'Inter', sans-serif" fontWeight="900" initial={{ opacity: 0, scale: 0.5, rotate: c.rotate + 10 }} animate={{ opacity: 1, scale: 1, rotate: c.rotate }} transition={{ duration: 1.2, delay: 1.5 + i * 0.1, ease: "backOut" }} filter="url(#glow)" style={{ textShadow: `0 0 15px ${c.color}66` }}>{c.char}</motion.text>
          )}
        </React.Fragment>
      ))}
    </g>
  );
};

const ParticleSystem = ({ scrollY }: { scrollY: any }) => {
  const yRange = useTransform(scrollY, [0, 1000], [0, -200]);
  const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 + 1, duration: Math.random() * 10 + 10, delay: Math.random() * 5 })), []);
  return (
    <motion.div style={{ y: yRange }} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-yellow-500/30" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, filter: "blur(1px)" }} animate={{ y: [0, -100, 0], opacity: [0, 0.8, 0], scale: [1, 1.5, 1] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} />
      ))}
    </motion.div>
  );
};

const WavyLines = ({ scrollY }: { scrollY: any }) => {
  const yRange = useTransform(scrollY, [0, 1000], [0, 150]);
  return (
    <motion.div style={{ y: yRange }} className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        {[1, 2, 3].map((i) => (
          <motion.path key={i} d={`M 0 ${300 + i * 100} Q 250 ${200 + i * 50} 500 ${300 + i * 100} T 1000 ${300 + i * 100}`} fill="none" stroke={COLORS.GOLD} strokeWidth="0.5" animate={{ d: [`M 0 ${300 + i * 100} Q 250 ${200 + i * 50} 500 ${300 + i * 100} T 1000 ${300 + i * 100}`, `M 0 ${350 + i * 100} Q 250 ${250 + i * 50} 500 ${350 + i * 100} T 1000 ${350 + i * 100}`, `M 0 ${300 + i * 100} Q 250 ${200 + i * 50} 500 ${300 + i * 100} T 1000 ${300 + i * 100}`] }} transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </svg>
    </motion.div>
  );
};

const DisintegratedStroke = ({ path, color, delay = 0 }: { path: string; color: string; delay?: number }) => (
  <g>
    {[...Array(12)].map((_, i) => (
      <motion.path key={i} d={path} fill="none" stroke={color} strokeWidth={Math.random() * 1.5 + 0.5} strokeDasharray={`${Math.random() * 10 + 5} ${Math.random() * 50 + 20}`} initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }} animate={{ pathLength: [0, 0.3, 0], pathOffset: [0, 1.2], opacity: [0, 0.8, 0] }} transition={{ duration: 3.5, delay: delay + i * 0.05, ease: "easeInOut" }} filter="url(#glow)" />
    ))}
    {[...Array(20)].map((_, i) => (
      <motion.circle key={`p-${i}`} r={Math.random() * 1 + 0.5} fill={color} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0], x: [Math.random() * 20 - 10, Math.random() * 40 - 20], y: [Math.random() * 20 - 10, Math.random() * 40 - 20], scale: [0, 1.5, 0] }} transition={{ duration: 2.5, delay: delay + 1 + Math.random() * 1, ease: "easeOut" }} style={{ transformOrigin: "center", offsetPath: `path("${path}")`, offsetDistance: `${Math.random() * 100}%` }} />
    ))}
  </g>
);

// --- Sub-components for Stats ---
const Counter = ({ value, color }: { value: string; color: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  useEffect(() => {
    const controls = animate(0, numericValue, { duration: 2, ease: "easeOut", onUpdate: (latest) => setDisplayValue(Math.floor(latest).toLocaleString() + suffix) });
    return () => controls.stop();
  }, [numericValue, suffix]);
  return <span className={`text-5xl md:text-7xl font-black tracking-tighter ${color}`}>{displayValue}</span>;
};

// --- Main Page Sections ---

const HeroSection = () => {
  const { theme, language } = useAppContext();
  const t = translations[language].hero;
  const [scene, setScene] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, [0, 500], [0, 100]);
  const logoScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setScene(1), 500),
      setTimeout(() => setScene(2), 4500),
      setTimeout(() => setScene(3), 8500),
      setTimeout(() => setScene(4), 12500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (scene === 0) return;
    setTransitionKey((k) => k + 1);
  }, [scene]);

  const resetAnimation = () => {
    setScene(0);
    setTimeout(() => setScene(1), 100);
  };

  return (
    <section className={`relative w-full h-screen ${theme === 'dark' ? 'bg-brand-dark' : 'bg-brand-light'} flex items-center justify-center overflow-hidden transition-colors duration-500`}>
      <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-[0.03]' : 'opacity-[0.08]'} pointer-events-none`} style={{ filter: "url(#paper)" }} />
      <ParticleSystem scrollY={scrollY} />
      <WavyLines scrollY={scrollY} />
      <div className={`absolute inset-0 pointer-events-none ${theme === 'dark' ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]' : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]'}`} />
      <motion.div style={{ y: logoY, scale: logoScale, opacity: logoOpacity }} className="relative w-[600px] h-[600px]">
        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          <defs>
            <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" /><feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="2"><feDistantLight azimuth="45" elevation="60" /></feDiffuseLighting></filter>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FDF5E6" /><stop offset="50%" stopColor={COLORS.GOLD} /><stop offset="100%" stopColor="#8B7355" /></linearGradient>
            <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="transparent" /><stop offset="50%" stopColor="white" stopOpacity="0.5" /><stop offset="100%" stopColor="transparent" /></linearGradient>
            <mask id="pathMask"><path d={PATHS.GOLDEN_RATIO} fill="white" /></mask>
            <mask id="finalMask"><path d={PATHS.GOOSE_JPG} fill="white" /></mask>
          </defs>
          <AnimatePresence mode="wait">
            {scene === 1 && (
              <motion.g key="scene1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
                <SketchDrafts path={PATHS.GOLDEN_RATIO} />
                <motion.path d={PATHS.GOLDEN_RATIO} fill="none" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="4 1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.5, ease: "easeInOut" }} filter="url(#glow)" />
                <motion.rect x="0" y="0" width="240" height="240" fill="url(#shineGradient)" initial={{ x: -240 }} animate={{ x: 240 }} transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }} style={{ mixBlendMode: "overlay" }} mask="url(#pathMask)" />
              </motion.g>
            )}
            {scene === 2 && (
              <motion.g key="scene2">
                <SketchDrafts path={PATHS.GOOSE_JPG} />
                <DisintegratedStroke path={PATHS.GOOSE_JPG} color={COLORS.GOLD} />
                <LogoText scene={3} disintegrated />
                <motion.path d={PATHS.GOOSE_JPG} fill="none" stroke={COLORS.GOLD} strokeWidth="0.8" strokeDasharray="2 2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.6 }} transition={{ duration: 4, ease: "easeInOut" }} filter="url(#glow)" />
              </motion.g>
            )}
            {scene === 3 && (
              <motion.g key="scene3">
                <SketchDrafts path={PATHS.GOOSE_PNG} />
                <DisintegratedStroke path={PATHS.GOOSE_PNG} color={COLORS.RED} delay={0} />
                <DisintegratedStroke path={PATHS.GOOSE_PNG} color={COLORS.BLUE} delay={0.2} />
                <DisintegratedStroke path={PATHS.GOOSE_PNG} color={COLORS.GREEN} delay={0.4} />
                <DisintegratedStroke path={PATHS.GOOSE_PNG} color={COLORS.YELLOW} delay={0.6} />
                <motion.path d={PATHS.GOOSE_PNG} fill="none" stroke={COLORS.YELLOW} strokeWidth="0.8" strokeDasharray="3 3" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.7 }} transition={{ duration: 4, ease: "easeInOut" }} filter="url(#glow)" />
              </motion.g>
            )}
            {scene === 4 && (
              <motion.g key="scene4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                <LogoText scene={4} />
                <motion.path d={PATHS.GOOSE_JPG} fill="none" stroke={COLORS.PENCIL} strokeWidth="0.2" initial={{ opacity: 0.5 }} animate={{ opacity: 0 }} transition={{ duration: 3, delay: 1 }} />
                <motion.path d={PATHS.GOOSE_JPG} fill={COLORS.YELLOW} stroke={COLORS.YELLOW} strokeWidth="0.5" filter="url(#glow)" animate={{ filter: ["drop-shadow(0 0 8px rgba(244,180,0,0.4))", "drop-shadow(0 0 15px rgba(244,180,0,0.6))", "drop-shadow(0 0 8px rgba(244,180,0,0.4))"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                <motion.rect x="0" y="0" width="240" height="240" fill="url(#shineGradient)" animate={{ x: [-240, 240] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }} style={{ mixBlendMode: "overlay" }} mask="url(#finalMask)" />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
        <AnimatePresence>{scene !== 0 && <TransitionScratches key={`t-${transitionKey}`} seed={transitionKey} />}</AnimatePresence>
      </motion.div>
      {scene === 4 && (
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={resetAnimation} className={`absolute bottom-12 px-6 py-2 border ${theme === 'dark' ? 'border-white/10 text-white/40 hover:bg-white/5 hover:text-white/80' : 'border-black/10 text-black/40 hover:bg-black/5 hover:text-black/80'} rounded-full text-xs tracking-widest uppercase transition-all duration-300`}>{t.replay}</motion.button>
      )}
      <motion.div style={{ opacity: logoOpacity }} className="absolute top-24 left-12 flex flex-col gap-1 z-10">
        <span className={`text-[10px] uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-white/20' : 'text-black/20'} font-medium`}>{t.premium}</span>
        <div className={`h-[1px] w-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
      </motion.div>
      <motion.div style={{ opacity: logoOpacity }} className="absolute bottom-12 right-12 flex flex-col items-end gap-1 z-10">
        <span className={`text-[10px] uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-white/20' : 'text-black/20'} font-medium`}>{t.identity}</span>
        <span className={`text-[8px] ${theme === 'dark' ? 'text-white/10' : 'text-black/10'}`}>{t.copyright}</span>
      </motion.div>
    </section>
  );
};

const StatsSection = () => {
  const { theme, language } = useAppContext();
  const t = translations[language].stats;
  const stats = [
    { value: '6+', label: t.experience, color: 'text-red-500' },
    { value: '14+', label: t.programs, color: 'text-brand-primary' },
    { value: '110+', label: t.graduations, color: 'text-brand-accent' },
    { value: '2,100+', label: t.students, color: 'text-blue-500' },
  ];
  return (
    <section className={`py-32 ${theme === 'dark' ? 'bg-brand-dark border-white/5' : 'bg-white border-black/5'} border-y relative overflow-hidden transition-colors duration-500`}>
      <div className={`absolute top-0 left-1/4 w-px h-full ${theme === 'dark' ? 'bg-gradient-to-b from-transparent via-white/5 to-transparent' : 'bg-gradient-to-b from-transparent via-black/5 to-transparent'}`} />
      <div className={`absolute top-0 right-1/4 w-px h-full ${theme === 'dark' ? 'bg-gradient-to-b from-transparent via-white/5 to-transparent' : 'bg-gradient-to-b from-transparent via-black/5 to-transparent'}`} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24 space-y-4">
          <h2 className={`text-4xl md:text-6xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{t.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">{t.title.split(' ')[1]}</span> {t.title.split(' ').slice(2).join(' ')}</h2>
          <div className="h-1 w-20 bg-brand-secondary mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }} className={`group flex flex-col items-center text-center space-y-6 p-8 rounded-3xl ${theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.02]'} transition-colors duration-500`}>
              <div className="relative"><Counter value={stat.value} color={stat.color} /><motion.div className={`absolute -inset-4 ${stat.color.replace('text', 'bg')}/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} /></div>
              <span className={`text-xs uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-white/30 group-hover:text-white/60' : 'text-black/30 group-hover:text-black/60'} font-bold transition-colors`}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SuccessStoriesSection = () => {
  const { theme, language } = useAppContext();
  const t = translations[language].success;
  const stories = [
    { icon: <Trophy className="text-brand-accent" />, name: 'Г. Бат-Эрдэнэ', grade: language === 'mn' ? '8-р анги' : '8th Grade', achievement: language === 'mn' ? 'Python тэмцээнд алтан медаль' : 'Gold medal in Python competition', color: 'from-brand-secondary/20 to-transparent', borderColor: 'border-brand-secondary/50' },
    { icon: <Zap className="text-brand-accent" />, name: 'Э. Сарнай', grade: language === 'mn' ? '6-р анги' : '6th Grade', achievement: language === 'mn' ? 'Arduino робот бүтээх уралдаанд шилдэг төсөл' : 'Best project in Arduino robot building competition', color: 'from-purple-500/20 to-transparent', borderColor: 'border-purple-500/50' },
    { icon: <Star className="text-brand-accent" />, name: 'М. Ганзориг', grade: language === 'mn' ? '4-р анги' : '4th Grade', achievement: language === 'mn' ? 'Scratch анимэйшн уралдаанд тусгай шагнал' : 'Special award in Scratch animation competition', color: 'from-red-500/20 to-transparent', borderColor: 'border-red-500/50' },
    { icon: <Award className="text-brand-accent" />, name: 'А. Тэмүүжин', grade: language === 'mn' ? '7-р анги' : '7th Grade', achievement: language === 'mn' ? 'Scratch тоглоом хөгжүүлэлтийн тэмцээнд 1-р байр' : '1st place in Scratch game development competition', color: 'from-brand-accent/20 to-transparent', borderColor: 'border-brand-accent/50' },
    { icon: <Cpu className="text-brand-accent" />, name: 'Б. Номин-Эрдэнэ', grade: language === 'mn' ? '9-р анги' : '9th Grade', achievement: language === 'mn' ? 'Олон улсын роботикийн олимпиадад оролцсон' : 'Participated in International Robotics Olympiad', color: 'from-blue-500/20 to-transparent', borderColor: 'border-blue-500/50' },
    { icon: <Palette className="text-brand-accent" />, name: 'Д. Ариунзаяа', grade: language === 'mn' ? '5-р анги' : '5th Grade', achievement: language === 'mn' ? 'Хамгийн бүтээлч програмчлалын төсөл шагнал' : 'Most creative programming project award', color: 'from-brand-primary/20 to-transparent', borderColor: 'border-brand-primary/50' },
  ];
  return (
    <section className={`py-32 ${theme === 'dark' ? 'bg-brand-dark' : 'bg-brand-light'} relative overflow-hidden transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="px-4 py-1.5 rounded-full border border-brand-secondary/30 bg-brand-secondary/5 text-brand-secondary text-[10px] uppercase tracking-[0.3em] font-bold">Hall of Fame</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`text-4xl md:text-6xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{t.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">{t.title}</span></motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={`${theme === 'dark' ? 'text-white/30' : 'text-black/30'} text-xs uppercase tracking-[0.4em] font-bold max-w-lg leading-loose`}>{t.desc}</motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -15 }} className={`group relative ${theme === 'dark' ? 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5' : 'bg-black/[0.02] hover:bg-black/[0.05] border-black/5'} border rounded-[2rem] p-10 flex flex-col items-center text-center space-y-6 transition-all duration-500 overflow-hidden`}>
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${story.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="relative"><div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} w-20 h-20 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>{story.icon}</div><motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -inset-4 bg-yellow-500/10 blur-xl rounded-full" /></div>
              <div className="space-y-2 relative z-10"><h4 className={`font-black text-xl ${theme === 'dark' ? 'text-white' : 'text-black'} group-hover:text-brand-accent transition-colors`}>{story.name}</h4><div className="flex items-center justify-center gap-2"><span className={`w-8 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} /><p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">{story.grade}</p><span className={`w-8 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} /></div></div>
              <p className={`${theme === 'dark' ? 'text-white/40' : 'text-black/40'} text-sm leading-relaxed font-medium relative z-10`}>{story.achievement}</p>
              <motion.div whileHover={{ scale: 1.1 }} className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10"><button className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold ${theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'} transition-colors`}>{t.more} <ExternalLink size={12} /></button></motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const { theme, language } = useAppContext();
  const t = translations[language].testimonials;
  const testimonials = [
    { initial: 'Б', color: 'bg-brand-primary', text: language === 'mn' ? '“Хүүхэд маань TEE-д 2 жил суралцсанаас хойш технологид маш их сонирхолтой болсон. Одоо өөрийн вэбсайт хийж чаддаг болсон.”' : '“My child has been interested in technology since studying at TEE for 2 years. Now they can make their own website.”', name: 'Б. Батбаяр', role: language === 'mn' ? 'Эцэг, 7-р ангийн сурагчийн' : 'Parent of 7th grade student' },
    { initial: 'Д', color: 'bg-blue-500', text: language === 'mn' ? '“Scratch програмчлал сурснаас хойш хүүхэд маань логик сэтгэлгээ маш их хөгжсөн. Математикийн хичээлд ч илүү сайн болсон.”' : '“Since learning Scratch programming, my child\'s logical thinking has developed a lot. They even got better at math.”', name: 'Д. Сарангэрэл', role: language === 'mn' ? 'Ээж, 5-р ангийн сурагчийн' : 'Mother of 5th grade student' },
    { initial: 'Э', color: 'bg-brand-secondary', text: language === 'mn' ? '“Би TEE-д Arduino робот хийж сурсан. Маш сонирхолтой! Ирээдүйд робот инженер болмоор байна.”' : '“I learned to make Arduino robots at TEE. Very interesting! I want to be a robot engineer in the future.”', name: 'Э. Тэмүүлэн', role: language === 'mn' ? '6-р ангийн сурагч' : '6th grade student' },
    { initial: 'О', color: 'bg-brand-accent', text: language === 'mn' ? '“Бага ангиас эхлэн технологийн суурийг тавьж байгаа нь маш чухал. TEE-ийн хөтөлбөр нь олон улсын стандартад нийцсэн.”' : '“It is very important to lay the foundation of technology starting from elementary school. TEE\'s program meets international standards.”', name: 'О. Номин', role: language === 'mn' ? 'Ээж, 3-р ангийн сурагчийн' : 'Mother of 3rd grade student' },
    { initial: 'А', color: 'bg-purple-500', text: language === 'mn' ? '“TEE-д Python сурснаас хойш тоглоом хөгжүүлж чаддаг болсон. Маш их зүйл сурлаа!”' : '“Since learning Python at TEE, I can develop games. I learned a lot!”', name: 'А. Анужин', role: language === 'mn' ? '8-р ангийн сурагч' : '8th grade student' },
  ];
  return (
    <section className={`py-32 ${theme === 'dark' ? 'bg-[#080808]' : 'bg-[#f9f9f9]'} relative overflow-hidden transition-colors duration-500`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`text-4xl md:text-6xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'} leading-tight`}>{t.title} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500">{t.subtitle}</span></motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={`${theme === 'dark' ? 'text-white/30' : 'text-black/30'} text-xs uppercase tracking-[0.4em] font-bold`}>{t.desc}</motion.p>
          </div>
          <div className="flex gap-4">
            <div className={`w-12 h-12 rounded-full border ${theme === 'dark' ? 'border-white/10 text-white/40 hover:text-white hover:border-white' : 'border-black/10 text-black/40 hover:text-black hover:border-black'} flex items-center justify-center transition-all cursor-pointer`}>←</div>
            <div className={`w-12 h-12 rounded-full border ${theme === 'dark' ? 'border-white/10 text-white/40 hover:text-white hover:border-white' : 'border-black/10 text-black/40 hover:text-black hover:border-black'} flex items-center justify-center transition-all cursor-pointer`}>→</div>
          </div>
        </div>
        <div className="flex overflow-x-auto pb-12 gap-8 no-scrollbar snap-x cursor-grab active:cursor-grabbing">
          {testimonials.map((t, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }} whileHover={{ y: -10 }} className={`min-w-[340px] md:min-w-[420px] ${theme === 'dark' ? 'bg-white/[0.01] hover:bg-white/[0.03] border-white/5' : 'bg-black/[0.01] hover:bg-black/[0.03] border-black/5'} border rounded-[2.5rem] p-10 space-y-8 snap-center transition-colors duration-500 group relative`}>
              <Quote className={`absolute top-10 right-10 ${theme === 'dark' ? 'text-white/5 group-hover:text-white/10' : 'text-black/5 group-hover:text-black/10'} transition-colors`} size={60} />
              <div className="flex items-center justify-between relative z-10"><div className="relative"><div className={`w-16 h-16 rounded-2xl ${t.color} flex items-center justify-center text-white font-black text-2xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500`}>{t.initial}</div><div className={`absolute -inset-2 ${t.color} opacity-20 blur-xl rounded-full`} /></div><div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} flex gap-1 px-4 py-2 rounded-full backdrop-blur-sm`}>{[...Array(5)].map((_, i) => (<Star key={i} size={12} className="fill-brand-accent text-brand-accent" />))}</div></div>
              <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/60'} text-lg leading-relaxed font-medium relative z-10`}>{t.text}</p>
              <div className={`pt-8 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex items-center gap-4 relative z-10`}><div className="space-y-1"><h4 className={`font-bold text-base ${theme === 'dark' ? 'text-white group-hover:text-brand-primary' : 'text-black group-hover:text-brand-primary'} transition-colors`}>{t.name}</h4><p className={`${theme === 'dark' ? 'text-white/20' : 'text-black/20'} text-[10px] uppercase tracking-[0.2em] font-bold`}>{t.role}</p></div></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <TestimonialsSection />
      <SuccessStoriesSection />
    </main>
  );
};

export default HomePage;
