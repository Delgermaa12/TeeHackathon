import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, animate } from 'motion/react';
import { Trophy, Zap, Star, Award, Cpu, Palette, ExternalLink, Quote, Phone, Mail, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';
import { PATHS } from '../constants';
import Galaxy from '../components/Galaxy';
import CardSwap, { Card } from '../components/CardSwap';
import StudentProjectSection from '../components/Game';
import { Masonry } from '../components/Masonry';
import gallery1 from '../assets/gallery-1.jpg';
import gallery2 from '../assets/gallery-2.jpg';
import gallery3 from '../assets/gallery-3.jpg';
import gallery4 from '../assets/gallery-4.jpg';
import gallery5 from '../assets/gallery-5.jpg';
import gallery6 from '../assets/gallery-6.jpg';
import scratchImage from '../assets/scratch.jpg';
import grade5Image from '../assets/5th_grade.jpg';
import grade7Image from '../assets/7th_grade.jpg';
import grade9Image from '../assets/9th_grade.jpg';
import { Link } from 'react-router';

// --- Sub-components for Hero ---
const COLORS = {
  GOLD: "#D4AF37",
  YELLOW: "#F4B400",
  RED: "#DB4437",
  BLUE: "#4285F4",
  GREEN: "#0F9D58",
  BG: "#101010",
  PENCIL: "#fcfcfd",
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
    <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0] }} transition={{ duration: 0.9, ease: "easeInOut" }} style={{ mixBlendMode: "screen" }}>
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

const DisintegratedStroke = ({ path, color, delay = 0 }: { path: string; color: string; delay?: number }) => (
  <g>
    {[...Array(12)].map((_, i) => (
      <motion.path key={i} d={path} fill="none" stroke={color} strokeWidth={Math.random() * 2 + 0.8} strokeDasharray={`${Math.random() * 10 + 5} ${Math.random() * 50 + 20}`} initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }} animate={{ pathLength: [0, 0.3, 0], pathOffset: [0, 1.2], opacity: [0, 0.8, 0] }} transition={{ duration: 3.5, delay: delay + i * 0.05, ease: "easeInOut" }} filter="url(#glow)" />
    ))}
    {[...Array(20)].map((_, i) => (
      <motion.circle key={`p-${i}`} r={Math.random() * 1 + 0.5} fill={color} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0], x: [Math.random() * 20 - 10, Math.random() * 40 - 20], y: [Math.random() * 20 - 10, Math.random() * 40 - 20], scale: [0, 1.5, 0] }} transition={{ duration: 2.5, delay: delay + 1 + Math.random() * 1, ease: "easeOut" }} style={{ transformOrigin: "center", offsetPath: `path("${path}")`, offsetDistance: `${Math.random() * 100}%` }} />
    ))}
  </g>
);

const FirstGooseScene = ({ theme }: { theme: string }) => {
  const paths = [
    { d: "m 846.82206,1110.4725 a 50.053673,51.958546 0 0 1 50.03603,-51.9756 50.053673,51.958546 0 0 1 50.07131,51.939 l -50.05367,0.02 z", color: "#37a458", width: 2.6, delay: 0 },
    { d: "m 182.64379,1108.4485 a 72.835861,72.179535 0 0 1 72.48474,-72.2024 l 0.35111,72.1787 z", color: "#e04233", width: 3, delay: 0.2 },
    { d: "m 601.97603,1109.3419 c 8.39573,-79.6382 -14.7458,-144.51777 -67.09322,-183.9189 -60.92992,-45.86104 -152.24938,-39.17628 -199.46477,2.302 -39.49208,34.69342 -65.51655,82.3859 -65.3039,181.8292 l 165.9309,-0.2123 z", color: "#fdbf02", width: 3.7, delay: 0.4 },
    { d: "m 762.77781,1584.409 c 7.49539,-55.8255 -20.92788,-101.3051 -67.6616,-128.9249 -54.39583,-32.148 -122.16119,-28.6605 -164.87648,0.061 -42.38948,28.5025 -66.96437,64.1432 -63.73514,129.0128 l 148.13658,-0.1489 z", color: "#0586ff", width: 3, delay: 0.6 },
    { d: "m 949.01016,1128.253 c 13.50819,277.3789 -171.17337,399.5018 -174.7705,387.9077 -34.41191,-110.9145 -246.55834,-164.9011 -327.70611,7.5406 -1.1357,2.4134 -207.82218,-183.0338 -177.58395,-395.8938 l 340.0302,0.4455 z", color: "#fdcb02", width: 2.8, delay: 0.8 },
  ];

  return (
    <motion.g 
      key="scene1"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5 }}
    >
      <g transform="matrix(0.21706797,0,0,0.21706797,-15.429671,-136.36484)">
        {paths.map((p, i) => (
          <React.Fragment key={i}>
            <DisintegratedStroke path={p.d} color={p.color} delay={p.delay} />
            <motion.path
              d={p.d}
              fill="none"
              stroke={p.color}
              strokeWidth={p.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: p.delay }}
            />
          </React.Fragment>
        ))}
        <motion.ellipse
          cx="365.44446" cy="989.89349" rx="25.247002" ry="25.96154"
          fill="none" stroke={theme === 'dark' ? "#fbfbf4" : "#333333"} strokeWidth="1.3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        />
        <motion.ellipse
          cx="365.40308" cy="988.8421" rx="11.255884" ry="11.574448"
          fill="none" stroke="#518ad2" strokeWidth="1.4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        />
        <motion.path
          d="m 128.12209,413.43608 h -1.08 v -7.03467 h -2.71444 l 0.0384,-1.53333 h 6.42 v 1.62338 l -2.62556,-0.045 z"
          transform="matrix(28.564186,0,0,24.384183,-3131.8831,-8694.778)"
          fill="none" stroke="#e9422f" strokeWidth="0.14"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2 }}
        />
        <motion.path
          d="m 686.80498,1283.3393 -81.96794,58.3491 q 13.85913,13.7598 28.48446,14.3243 14.65345,0.3582 25.83091,-7.5984 17.23197,-12.2665 18.04629,-35.7276 l 23.23866,1.3161 q -0.36235,34.673 -28.30601,54.5646 -21.42353,15.2504 -46.95407,9.985 -25.53046,-5.2654 -41.99392,-28.3327 -15.40697,-21.5872 -12.12223,-47.7371 3.31324,-26.3559 24.38744,-41.3577 20.72485,-14.7531 47.04499,-9.1194 26.23205,5.5102 44.31142,31.3338 z m -92.10983,39.7106 58.68153,-41.7725 q -24.74689,-14.0084 -43.84174,-0.4156 -20.84128,14.836 -14.83979,42.1881 z"
          fill="none" stroke="#0586ff" strokeWidth="2.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.2 }}
        />
        <motion.text
          transform="matrix(14.615436,0,0,8.8028985,3236.225,-2413.9118)"
          style={{ fontSize: '20px', fontFamily: 'Candara', fill: 'none', stroke: '#45a343', strokeWidth: 0.2 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
        >
          <tspan x="-174.56" y="415.6">3</tspan>
        </motion.text>
      </g>
    </motion.g>
  );
};

const GoldenRatioScene = ({ theme }: { theme: string }) => {
  const gridLines = Array.from({ length: 11 });
  return (
    <motion.g 
      key="scene2" 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.1 }} 
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Grid */}
      <g opacity="0.1">
        {gridLines.map((_, i) => (
          <React.Fragment key={i}>
            <line x1={i * 24} y1="0" x2={i * 24} y2="240" stroke={theme === 'dark' ? "white" : "black"} strokeWidth="0.5" />
            <line x1="0" y1={i * 24} x2="240" y2={i * 24} stroke={theme === 'dark' ? "white" : "black"} strokeWidth="0.5" />
          </React.Fragment>
        ))}
      </g>

      <g transform="translate(120, 120)">
        {/* Fibonacci Circles */}
        {[
          { r: 80, color: COLORS.GOLD, label: "8px", delay: 0 },
          { r: 50, color: COLORS.YELLOW, label: "5px", delay: 0.5, cx: -30, cy: -20 },
          { r: 30, color: COLORS.BLUE, label: "3px", delay: 1, cx: 40, cy: 20 },
          { r: 20, color: COLORS.RED, label: "2px", delay: 1.5, cx: -80, cy: 10 },
          { r: 10, color: theme === 'dark' ? "white" : "black", label: "1px", delay: 2, cx: -50, cy: -40 },
        ].map((c, i) => (
          <React.Fragment key={i}>
            <motion.circle 
              cx={c.cx || 0} cy={c.cy || 0} r={c.r} fill="none" stroke={c.color} strokeWidth="1.5" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: c.delay }}
            />
            <motion.text 
              x={(c.cx || 0) + c.r + 5} y={(c.cy || 0)} fill={c.color} fontSize="8" fontWeight="bold" 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: c.delay + 1 }}
            >{c.label}</motion.text>
          </React.Fragment>
        ))}
      </g>

      <motion.rect x="0" y="0" width="240" height="240" fill="url(#shineGradient)" initial={{ x: -240 }} animate={{ x: 240 }} transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }} style={{ mixBlendMode: "overlay" }} />
    </motion.g>
  );
};

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

// --- Unified Background Component ---

const UnifiedBackground = ({ scrollY }: { scrollY: any }) => {
  const { theme } = useAppContext();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Base background */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          theme === "dark" ? "bg-[#0c0c0c]" : "bg-white"
        }`}
      />

      {/* Sparkle Galaxy */}
      <Galaxy
      starSpeed={theme === "dark" ? 0.08 : 0.06}
      density={theme === "dark" ? 0.12 : 0.16}
      speed={theme === "dark" ? 0.22 : 0.18}
      glowIntensity={theme === "dark" ? 0.2 : 0.24}
      twinkleIntensity={theme === "dark" ? 0.08 : 0.1}
/>

      {/* Subtle gradient overlay */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.45)_100%)]"
        }`}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-brand-secondary/10 rounded-full blur-[120px]" />
    </div>
  );
};


// --- Main Page Sections ---

const HeroSection = ({ scrollY }: { scrollY: any }) => {
  const { theme, language } = useAppContext();
  const t = translations[language].hero;
  const [scene, setScene] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const logoY = useTransform(scrollY, [0, 500], [0, 100]);
  const logoScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const FINAL_GOOSE_PATHS = [
    { d: "m 178.17877,120.88071 a 66.469612,75.498703 0 0 1 -66.40473,75.49866 66.469612,75.498703 0 0 1 -66.534366,-75.35129 l 66.469486,-0.14737 z", color: theme === 'dark' ? '#d5d23a' : '#b5b22a', delay: 0 },
    { d: "m 100.08727,-131.51253 a 26.137545,28.808369 0 0 1 26.17064,-28.51937 26.137545,28.808369 0 0 1 26.10242,28.5952 l -26.13683,0.21314 z", color: theme === 'dark' ? '#0787ff' : '#0066cc', delay: 0.5, transform: "scale(1,-1)" },
    { d: "m 45.332363,120.92373 a 42.851646,50.954716 0 0 1 21.341187,-44.323659 42.851646,50.954716 0 0 1 42.95204,-0.04671 42.851646,50.954716 0 0 1 21.40932,44.277175 l -42.851431,-0.16028 z", color: theme === 'dark' ? '#d5d23a' : '#b5b22a', delay: 1 },
    { d: "m 45.651262,130.92383 a 17.090006,18.832779 0 0 1 -12.150756,-5.46272 17.090006,18.832779 0 0 1 -5.053683,-13.34597 l 17.089993,-0.0237 z", color: theme === 'dark' ? '#f43434' : '#d32f2f', delay: 1.5 },
    { d: "m -152.72255,-92.90889 a 25.337103,28.122721 0 0 1 -18.03724,-8.20108 25.337103,28.122721 0 0 1 -7.45291,-19.99097 l 25.33703,0.0698 z", color: theme === 'dark' ? '#078127' : '#05661e', delay: 2, transform: "scale(-1)" },
  ];

  const FINAL_GOOSE_PATH = (
    <g id="layer1">
      {FINAL_GOOSE_PATHS.map((path, i) => (
        <React.Fragment key={i}>
          <DisintegratedStroke path={path.d} color={path.color} delay={path.delay} />
          <motion.path 
            style={{ fill: 'none', stroke: path.color, strokeWidth: theme === 'dark' ? 1.2 : 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', strokeOpacity: 1 }} 
            d={path.d}
            transform={path.transform}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: path.delay, ease: "easeInOut" }}
            filter="url(#glow)"
          />
        </React.Fragment>
      ))}
      <motion.ellipse style={{ fill: 'none', stroke: theme === 'dark' ? '#ffffff' : '#000000', strokeWidth: 0.5, strokeOpacity: 1 }} cx="73.994774" cy="93.564285" rx="8.2766819" ry="9.029108" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} />
      <motion.ellipse style={{ fill: 'none', stroke: theme === 'dark' ? '#ffffff' : '#000000', strokeWidth: 0.3, strokeOpacity: 1 }} cx="72.44487" cy="89.95108" rx="2.1292045" ry="2.3227687" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.7 }} />
      <motion.ellipse style={{ fill: 'none', stroke: theme === 'dark' ? '#ffffff' : '#000000', strokeWidth: 0.2, strokeOpacity: 1 }} cx="76.167404" cy="89.354385" rx="1.1686611" ry="1.2749032" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }} />
      <motion.ellipse style={{ fill: 'none', stroke: theme === 'dark' ? '#000000' : '#ffffff', strokeWidth: 0.4, strokeOpacity: 1 }} cx="72.393433" cy="93.407776" rx="6.8816948" ry="7.3576117" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1 }} />
    </g>
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setScene(1), 500),
      setTimeout(() => setScene(2), 4500),
      setTimeout(() => setScene(3), 8500),
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
    <section className="relative w-full min-h-screen flex items-center pt-32 pb-20 lg:pt-24 lg:pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24 relative z-10">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary">
              {language === 'mn' ? 'Элсэлт авч байна 2026' : 'Now Enrolling for 2026'}
            </span>
          </div>

          <h1 className={`text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {language === 'mn' ? 'монголын n1 дижитал' : 'The Future of'} <br />
            <span className="text-brand-secondary italic font-serif">
              {language === 'mn' ? 'технологийн сургууль.' : 'Technical Minds.'}
            </span>
          </h1>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-brand-secondary text-black rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-brand-secondary/20"
            >
              {language === 'mn' ? 'Хөтөлбөрүүд' : 'Explore Programs'}
              <ArrowRight size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 border ${theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-black hover:bg-black/5'} rounded-full font-bold text-sm uppercase tracking-widest transition-all`}
            >
              {language === 'mn' ? 'Бидний тухай' : 'Our Philosophy'}
            </motion.button>
          </div>
        </motion.div>

        {/* Right Logo Animation */}
        <motion.div 
          style={{ y: logoY, scale: logoScale, opacity: logoOpacity }} 
          className="relative aspect-square w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] mx-auto order-last lg:order-none"
        >
          <svg viewBox="0 0 240 240" className={`w-full h-full ${theme === 'dark' ? 'drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'drop-shadow-[0_0_10px_rgba(0,0,0,0.15)]'}`}>
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FDF5E6" /><stop offset="50%" stopColor={COLORS.GOLD} /><stop offset="100%" stopColor="#8B7355" /></linearGradient>
              <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="transparent" /><stop offset="50%" stopColor="white" stopOpacity="0.5" /><stop offset="100%" stopColor="transparent" /></linearGradient>
              <mask id="pathMask"><path d={PATHS.GOLDEN_RATIO} fill="white" /></mask>
              <mask id="finalMask"><path d={PATHS.GOOSE_JPG} fill="white" /></mask>
            </defs>
            <AnimatePresence mode="wait">
              {scene === 1 && <FirstGooseScene theme={theme} />}
              {scene === 2 && <GoldenRatioScene theme={theme} />}
              {scene === 3 && (
                <motion.g key="scene3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                  {FINAL_GOOSE_PATH}
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </motion.div>
      </div>
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
    <section className="py-32 relative overflow-hidden">
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
  const galleryItems = [
  {
    id: '1',
    img: gallery1,
    url: '#',
    height: 400,
  },
  {
    id: '2',
    img: gallery2,
    url: '#',
    height: 300,
  },
  {
    id: '3',
    img: gallery3,
    url: '#',
    height: 500,
  },
  {
    id: '4',
    img: gallery4,
    url: '#',
    height: 350,
  },
  {
    id: '5',
    img: gallery5,
    url: '#',
    height: 420,
  },
  {
    id: '6',
    img: gallery6,
    url: '#',
    height: 380,
  },
];
  const { theme, language } = useAppContext();

  return (
    <section className="pt-12 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <h2
            className={`text-4xl md:text-6xl font-black tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Бидний дурсамж
          </h2>

          <p
            className={`text-sm ${
              theme === 'dark' ? 'text-white/40' : 'text-black/40'
            }`}
          >
            {language === 'mn'
              ? 'Манай сурагчдын бүтээлүүд'
              : 'Our Students Works'}
          </p>
        </div>

        <Masonry
        items={galleryItems}
        ease="power3.out"
  duration={0.6}
  stagger={0.05}
  animateFrom="bottom"
  scaleOnHover
  hoverScale={0.95}
  blurToFocus
  colorShiftOnHover={false}
/>

      </div>
    </section>
  );
};

const ProgramsPreviewSection = () => {
  const { theme, language } = useAppContext();

  const featuredPrograms = [
    {
      grade: '3',
      title: language === 'mn' ? '3 дугаар ангийн хөтөлбөр' : '3rd Grade Program',
      description:
        language === 'mn'
          ? 'Компьютерын үндэс, алгоритм, програмчлалын анхан шатыг сурах'
          : 'Learn computer basics, algorithms, and programming fundamentals',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'Анхан шат' : 'Beginner',
      age: language === 'mn' ? '8-9 нас' : '8-9 years',
      image: scratchImage,
      accent: 'bg-blue-600/90',
    },
    {
      grade: '5',
      title: language === 'mn' ? '5-р ангийн хөтөлбөр' : '5th Grade Program',
      description:
        language === 'mn'
          ? 'Вэб хөгжүүлэлт, HTML, CSS, JavaScript сурах'
          : 'Web development, HTML, CSS, JavaScript learning',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'Суурь шат' : 'Foundation',
      age: language === 'mn' ? '10-11 нас' : '10-11 years',
      image: grade5Image,
      accent: 'bg-purple-600/90',
    },
    {
      grade: '7',
      title: language === 'mn' ? '7-р ангийн хөтөлбөр' : '7th Grade Program',
      description:
        language === 'mn'
          ? 'Мобайл хэрэгслэлийн хөгжүүлэлт ба дизайн'
          : 'Mobile app development and design',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'Дунд шат' : 'Intermediate',
      age: language === 'mn' ? '12-13 нас' : '12-13 years',
      image: grade7Image,
      accent: 'bg-orange-600/90',
    },
    {
      grade: '9',
      title: language === 'mn' ? '9-р ангийн хөтөлбөр' : '9th Grade Program',
      description:
        language === 'mn'
          ? 'AI, машин сургалт ба системүүдийн зарчим'
          : 'AI, machine learning and systems principles',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'Ахисан шат' : 'Advanced',
      age: language === 'mn' ? '14-15 нас' : '14-15 years',
      image: grade9Image,
      accent: 'bg-emerald-600/90',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-brand-secondary" />
              <span className="text-brand-secondary text-xs font-black uppercase tracking-[0.4em]">
                {language === 'mn' ? 'ҮНДСЭН ХӨТӨЛБӨРҮҮД' : 'MAIN PROGRAMS'}
              </span>
            </div>

            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter ${
                theme === 'dark' ? 'text-white' : 'text-black'
              } leading-none`}
            >
              {language === 'mn' ? 'ХӨТӨЛБӨРҮҮД' : 'PROGRAMS'}
            </h2>

            <p
              className={`max-w-2xl text-sm md:text-base ${
                theme === 'dark' ? 'text-white/50' : 'text-black/50'
              }`}
            >
              {language === 'mn'
                ? '3-9-р ангийн сурагчдад зориулсан шаталсан технологийн сургалтын хөтөлбөрүүд.'
                : 'Structured technology learning programs for students from grades 3 to 9.'}
            </p>
          </div>

          <Link
            to="/programm"
            className={`inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest ${
              theme === 'dark'
                ? 'text-white/40 hover:text-white'
                : 'text-black/40 hover:text-black'
            } transition-colors pb-2`}
          >
            {language === 'mn' ? 'БҮХ ХӨТӨЛБӨР' : 'ALL PROGRAMS'}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredPrograms.map((program, index) => (
            <motion.div
              key={program.grade}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="h-full"
            >
              <Link to={`/grade/${program.grade}`} className="block h-full">
                <div
                  className={`relative group overflow-hidden rounded-[2rem] border h-full transition-all duration-500 hover:-translate-y-2 ${
                    theme === 'dark'
                      ? 'bg-[#111111] border-white/5 hover:border-white/10'
                      : 'bg-white border-black/5 hover:border-black/10 shadow-xl'
                  }`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <div
                        className={`inline-flex items-center px-4 py-2 rounded-xl text-white text-sm font-black backdrop-blur-sm ${program.accent}`}
                      >
                        {language === 'mn'
                          ? `${program.grade} дугаар анги`
                          : `Grade ${program.grade}`}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
                    <h3
                      className={`text-xl font-black mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}
                    >
                      {program.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed mb-5 flex-grow ${
                        theme === 'dark' ? 'text-white/60' : 'text-black/60'
                      }`}
                    >
                      {program.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span
                        className={`px-3 py-1.5 rounded-full font-semibold ${
                          theme === 'dark'
                            ? 'bg-blue-500/15 text-blue-300'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {program.duration}
                      </span>

                      <span
                        className={`px-3 py-1.5 rounded-full font-semibold ${
                          theme === 'dark'
                            ? 'bg-purple-500/15 text-purple-300'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {program.level}
                      </span>

                      <span
                        className={`px-3 py-1.5 rounded-full font-semibold ${
                          theme === 'dark'
                            ? 'bg-pink-500/15 text-pink-300'
                            : 'bg-pink-100 text-pink-700'
                        }`}
                      >
                        {program.age}
                      </span>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-brand-secondary font-bold text-sm">
                      {language === 'mn' ? 'Дэлгэрэнгүй үзэх' : 'View details'}
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
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
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className={`text-4xl md:text-6xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'} leading-tight`}>
                {t.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500">
                  {t.subtitle}
                </span>
              </h2>
              <p className={`${theme === 'dark' ? 'text-white/30' : 'text-black/30'} text-xs uppercase tracking-[0.4em] font-bold`}>
                {t.desc}
              </p>
            </motion.div>

            <div className="flex gap-4">
              <div className={`w-12 h-12 rounded-full border ${theme === 'dark' ? 'border-white/10 text-white/40 hover:text-white hover:border-white' : 'border-black/10 text-black/40 hover:text-black hover:border-black'} flex items-center justify-center transition-all cursor-pointer`}>←</div>
              <div className={`w-12 h-12 rounded-full border ${theme === 'dark' ? 'border-white/10 text-white/40 hover:text-white hover:border-white' : 'border-black/10 text-black/40 hover:text-black hover:border-black'} flex items-center justify-center transition-all cursor-pointer`}>→</div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end pr-0 lg:pr-20">
            <CardSwap 
              width={400} 
              height={320} 
              cardDistance={40} 
              verticalDistance={30} 
              delay={4000}
              skewAmount={3}
            >
              {testimonials.map((t, index) => (
                <Card 
                  key={index}
                  className={`${theme === 'dark' ? 'bg-[#111111] border-white/5' : 'bg-[#f5f5f5] border-black/5 shadow-xl'} border rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between`}
                >
                  <Quote className={`absolute top-6 right-6 ${theme === 'dark' ? 'text-white/5' : 'text-black/5'}`} size={40} />
                  
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl ${t.color} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                        {t.initial}
                      </div>
                    </div>
                    <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} flex gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm`}>
                      {[...Array(5)].map((_, i) => (<Star key={i} size={10} className="fill-brand-accent text-brand-accent" />))}
                    </div>
                  </div>

                  <p className={`${theme === 'dark' ? 'text-white/70' : 'text-black/70'} text-base leading-relaxed font-medium italic`}>
                    {t.text}
                  </p>

                  <div className={`pt-6 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex items-center gap-4`}>
                    <div className="space-y-1">
                      <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {t.name}
                      </h4>
                      <p className={`${theme === 'dark' ? 'text-white/30' : 'text-black/30'} text-[9px] uppercase tracking-[0.2em] font-bold`}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const { scrollY } = useScroll();
  return (
    <main className="relative">
      <UnifiedBackground scrollY={scrollY} />
      <div className="relative z-10">
        <HeroSection scrollY={scrollY} />
        <StatsSection />
        <ProgramsPreviewSection />
        <StudentProjectSection />
        <TestimonialsSection />
        <SuccessStoriesSection />
      </div>
    </main>
  );
};


export default HomePage;
