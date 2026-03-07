import React, { useState, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";
import {
  Trophy,
  Zap,
  Star,
  Award,
  Cpu,
  Palette,
  ExternalLink,
  Quote,
  Phone,
  Mail,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { translations } from "../translations";
import IntroAnimation from "../components/IntroAnimation"; // IntroAnimation импортлох

// --- Color constants ---
const COLORS = {
  GOLD: "#D4AF37",
  YELLOW: "#F4B400",
  RED: "#DB4437",
  BLUE: "#4285F4",
  GREEN: "#0F9D58",
  BG: "#050505",
  PENCIL: "#A0A0A0",
};

// ============================================
// ORIGINAL CODE - БҮГД ХАДГАЛАГДСАН
// ============================================

// --- Original: TransitionScratches ---
const TransitionScratches = ({
  seed,
  color = COLORS.PENCIL,
}: {
  seed: number;
  color?: string;
  key?: string | number;
}) => {
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
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.9, 0] }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      style={{ mixBlendMode: "screen" }}
    >
      <svg viewBox="0 0 240 240" className="w-full h-full">
        <g filter="url(#glow)" opacity="0.9">
          {lines.map((ln) => (
            <motion.path
              key={ln.id}
              d={ln.d}
              fill="none"
              stroke={color}
              strokeWidth={ln.w}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${ln.dashA} ${ln.dashB}`}
              initial={{
                opacity: 0,
                pathLength: 0,
                strokeDashoffset: ln.offset,
                rotate: ln.rot,
                transformOrigin: "120px 120px",
              }}
              animate={{
                opacity: [0, 0.35, 0],
                pathLength: [0, 1],
                strokeDashoffset: [ln.offset, 0],
              }}
              transition={{
                duration: 0.55,
                delay: ln.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
        {dust.map((d) => (
          <motion.circle
            key={d.id}
            r={d.r}
            fill={COLORS.GOLD}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              cx: [d.x1, d.x2],
              cy: [d.y1, d.y2],
              scale: [0.6, 1.3, 0.6],
            }}
            transition={{ duration: 0.8, delay: d.delay, ease: "easeOut" }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

// --- Original: SketchDrafts ---
const SketchDrafts = ({
  path,
  delay = 0,
}: {
  path: string;
  delay?: number;
}) => (
  <g>
    {[...Array(4)].map((_, i) => (
      <motion.path
        key={i}
        d={path}
        fill="none"
        stroke={COLORS.PENCIL}
        strokeWidth="0.3"
        initial={{
          pathLength: 0,
          opacity: 0,
          translateX: Math.random() * 4 - 2,
          translateY: Math.random() * 4 - 2,
          rotate: Math.random() * 2 - 1,
        }}
        animate={{ pathLength: [0, 1], opacity: [0, 0.15, 0] }}
        transition={{ duration: 2, delay: delay + i * 0.4, ease: "easeInOut" }}
      />
    ))}
  </g>
);

// --- Original: LogoText ---
const LogoText = ({
  scene,
  disintegrated = false,
}: {
  scene: number;
  disintegrated?: boolean;
}) => {
  const characters = [
    {
      char: "T",
      color: COLORS.RED,
      x: 90,
      y: 135,
      fontSize: 38,
      delay: 0,
      rotate: -5,
    },
    {
      char: "e",
      color: COLORS.BLUE,
      x: 115,
      y: 135,
      fontSize: 34,
      delay: 0.2,
      rotate: 3,
    },
    {
      char: "³",
      color: COLORS.GREEN,
      x: 138,
      y: 115,
      fontSize: 20,
      delay: 0.4,
      rotate: 8,
    },
  ];
  return (
    <g>
      {characters.map((c, i) => (
        <React.Fragment key={i}>
          {scene === 3 && disintegrated && (
            <motion.text
              x={c.x}
              y={c.y}
              fill="none"
              stroke={c.color}
              strokeWidth="0.5"
              fontSize={c.fontSize}
              fontFamily="'Inter', sans-serif"
              fontWeight="900"
              initial={{ opacity: 0, rotate: c.rotate }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 3, delay: c.delay }}
              filter="url(#glow)"
            >
              {c.char}
            </motion.text>
          )}
          {scene === 4 && (
            <motion.text
              x={c.x}
              y={c.y}
              fill={c.color}
              fontSize={c.fontSize}
              fontFamily="'Inter', sans-serif"
              fontWeight="900"
              initial={{ opacity: 0, scale: 0.5, rotate: c.rotate + 10 }}
              animate={{ opacity: 1, scale: 1, rotate: c.rotate }}
              transition={{
                duration: 1.2,
                delay: 1.5 + i * 0.1,
                ease: "backOut",
              }}
              filter="url(#glow)"
              style={{ textShadow: `0 0 15px ${c.color}66` }}
            >
              {c.char}
            </motion.text>
          )}
        </React.Fragment>
      ))}
    </g>
  );
};

// --- Original: ParticleSystem ---
const ParticleSystem = ({ scrollY }: { scrollY: any }) => {
  const yRange = useTransform(scrollY, [0, 1000], [0, -200]);
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      })),
    [],
  );

  const { theme } = useAppContext();

  return (
    <motion.div
      style={{ y: yRange }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
            backgroundColor:
              theme === "dark"
                ? "rgba(212, 175, 55, 0.3)"
                : "rgba(249, 115, 22, 0.2)",
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
};

// --- Original: WavyLines ---
const WavyLines = ({ scrollY }: { scrollY: any }) => {
  const { theme } = useAppContext();
  const yRange = useTransform(scrollY, [0, 1000], [0, 150]);
  const lineColor = theme === "dark" ? COLORS.GOLD : "#f97316";

  return (
    <motion.div
      style={{ y: yRange }}
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-20"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {[1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M 0 ${300 + i * 100} Q 250 ${200 + i * 50} 500 ${300 + i * 100} T 1000 ${300 + i * 100}`}
            fill="none"
            stroke={lineColor}
            strokeWidth="0.5"
            animate={{
              d: [
                `M 0 ${300 + i * 100} Q 250 ${200 + i * 50} 500 ${300 + i * 100} T 1000 ${300 + i * 100}`,
                `M 0 ${350 + i * 100} Q 250 ${250 + i * 50} 500 ${350 + i * 100} T 1000 ${350 + i * 100}`,
                `M 0 ${300 + i * 100} Q 250 ${200 + i * 50} 500 ${300 + i * 100} T 1000 ${300 + i * 100}`,
              ],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

// --- Original: DisintegratedStroke ---
const DisintegratedStroke = ({
  path,
  color,
  delay = 0,
}: {
  path: string;
  color: string;
  delay?: number;
}) => (
  <g>
    {[...Array(12)].map((_, i) => (
      <motion.path
        key={i}
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={Math.random() * 1.5 + 0.5}
        strokeDasharray={`${Math.random() * 10 + 5} ${Math.random() * 50 + 20}`}
        initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }}
        animate={{
          pathLength: [0, 0.3, 0],
          pathOffset: [0, 1.2],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 3.5,
          delay: delay + i * 0.05,
          ease: "easeInOut",
        }}
        filter="url(#glow)"
      />
    ))}
    {[...Array(20)].map((_, i) => (
      <motion.circle
        key={`p-${i}`}
        r={Math.random() * 1 + 0.5}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [Math.random() * 20 - 10, Math.random() * 40 - 20],
          y: [Math.random() * 20 - 10, Math.random() * 40 - 20],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 2.5,
          delay: delay + 1 + Math.random() * 1,
          ease: "easeOut",
        }}
        style={{
          transformOrigin: "center",
          offsetPath: `path("${path}")`,
          offsetDistance: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </g>
);

// --- Original: Counter ---
const Counter = ({ value, color }: { value: string; color: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  useEffect(() => {
    const controls = animate(0, numericValue, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest: number) =>
        setDisplayValue(Math.floor(latest).toLocaleString() + suffix),
    });
    return () => controls.stop();
  }, [numericValue, suffix]);
  return (
    <span
      className={`text-5xl md:text-7xl font-black tracking-tighter ${color}`}
    >
      {displayValue}
    </span>
  );
};

// ============================================
// UPDATED SECTIONS WITH IMAGE DATA
// ============================================

// --- Hero Section (Зурагнаас авсан мэдээлэл + IntroAnimation) ---
const HeroSection = () => {
  const { theme, language } = useAppContext();
  const t = translations[language].hero;
  const [scene, setScene] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);
  const contentScale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // IntroAnimation-ийн scene утгыг ашиглах
  useEffect(() => {
    // Эхний scene-г харуулах
    setScene(1);
  }, []);

  // Зурагнаас авсан статистик мэдээлэл
  const stats = [
    {
      value: "7+",
      label: "ЖИЛИЙН ТУРШЛАГА",
      color: theme === "dark" ? "text-red-500" : "text-red-600",
    },
    {
      value: "10+",
      label: "ХӨТӨЛБӨР",
      color: theme === "dark" ? "text-green-500" : "text-green-600",
    },
    {
      value: "2000+",
      label: "НИЙТ ТӨГСӨГЧ",
      color: theme === "dark" ? "text-yellow-500" : "text-yellow-600",
    },
    {
      value: "5000+",
      label: "ЧАДАВРЖСАН СУРАГЧ",
      color: theme === "dark" ? "text-blue-500" : "text-blue-600",
    },
  ];

  return (
    <section
      className={`relative w-full min-h-screen ${theme === "dark" ? "bg-brand-dark" : "bg-brand-light"} flex items-center justify-center overflow-hidden transition-colors duration-500`}
    >
      {/* Background effects */}
      <div
        className={`absolute inset-0 ${theme === "dark" ? "opacity-[0.03]" : "opacity-[0.08]"} pointer-events-none`}
        style={{ filter: "url(#paper)" }}
      />
      <ParticleSystem scrollY={scrollY} />
      <WavyLines scrollY={scrollY} />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content - Text and Stats */}
          <motion.div
            style={{
              y: contentY,
              scale: contentScale,
              opacity: contentOpacity,
            }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <div>
              {/* Hero Tag */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37] text-[#D4AF37] mb-7"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[0.68rem] tracking-widest uppercase font-mono">
                  Монголын №1 дижитал технологийн сургууль
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tighter leading-[1.1] mb-4"
              >
                БОЛОВСРОЛЫГ
                <br />
                <span className="italic font-serif text-[#D4AF37]">
                  инженерчлэв.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.85 }}
                className="text-sm sm:text-base text-[var(--muted)] mb-8 max-w-[520px]"
              >
                3-р ангиас 9-р анги хүртэл · Python · Robotics · Game Dev ·
                Electronics
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
              >
                <button className="group flex items-center justify-center gap-3 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform w-full sm:w-auto">
                  БҮРТГҮҮЛЭХ
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full border ${
                    theme === "dark"
                      ? "border-white/10 hover:bg-white/5 text-white"
                      : "border-black/10 hover:bg-black/5 text-black"
                  } transition-colors w-full sm:w-auto`}
                >
                  ХӨТӨЛБӨРҮҮД ҮЗЭХ
                </button>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div
                      className={`text-2xl md:text-3xl font-bold ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[0.65rem] uppercase tracking-wider text-[var(--muted)] whitespace-nowrap">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - IntroAnimation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, delay: 0.3 }}
            className="w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <IntroAnimation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Classes Section (Зурагнаас авсан мэдээлэл) ---
const ClassesSection = () => {
  const { theme } = useAppContext();

  const classes = [
    { grade: "3-Р АНГИ", teacher: "Ш.Бонор" },
    { grade: "5-Р АНГИ", teacher: "М.Зоригт" },
    { grade: "7-Р АНГИ", teacher: "Ж.Солонго" },
    { grade: "9-Р АНГИ", teacher: "У.Санж-Очир" },
  ];

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-12 ${theme === "dark" ? "bg-brand-dark" : "bg-white"} transition-colors`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2.5 font-['Syne'] text-[0.65rem] font-bold tracking-[4px] uppercase mb-4 text-[#D4AF37] before:content-[''] before:block before:w-7 before:h-[1.5px] before:bg-current">
              Шинэ элсэлт 2025–2026
            </div>
            <h2
              className={`text-4xl md:text-5xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              АНГИУД
            </h2>
          </div>
          <a
            href="#"
            className={`flex items-center gap-2 text-sm font-medium ${theme === "dark" ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"} transition-colors`}
          >
            БҮХ АНГИУД →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {classes.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"} hover:scale-105 transition-transform`}
            >
              <div className="text-2xl font-bold mb-2">{c.grade}</div>
              <div
                className={`text-sm ${theme === "dark" ? "text-white/60" : "text-black/60"}`}
              >
                {c.teacher}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Stats Section (Зурагнаас авсан мэдээлэл) ---
const StatsSection = () => {
  const { theme } = useAppContext();

  // Зурагнаас авсан статистик
  const stats = [
    {
      value: "7+",
      label: "ЖИЛИЙН ТУРШЛАГА",
      color: theme === "dark" ? "text-red-500" : "text-red-600",
    },
    {
      value: "10+",
      label: "ХӨТӨЛБӨР",
      color: theme === "dark" ? "text-green-500" : "text-green-600",
    },
    {
      value: "2000+",
      label: "НИЙТ ТӨГСӨГЧ",
      color: theme === "dark" ? "text-yellow-500" : "text-yellow-600",
    },
    {
      value: "5000+",
      label: "ЧАДАВРЖСАН СУРАГЧ",
      color: theme === "dark" ? "text-blue-500" : "text-blue-600",
    },
  ];

  return (
    <section
      className={`py-16 ${theme === "dark" ? "bg-brand-dark border-white/5" : "bg-white border-black/5"} border-y relative overflow-hidden transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative">
                <Counter value={stat.value} color={stat.color} />
              </div>
              <div
                className={`text-[0.65rem] uppercase tracking-wider font-medium ${theme === "dark" ? "text-white/40" : "text-black/40"} mt-2`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Achievements Section (Зурагнаас авсан мэдээлэл) ---
const AchievementsSection = () => {
  const { theme } = useAppContext();

  const achievements = [
    {
      title: "1-р байр",
      desc: "Улаанбаатар 2024",
      color: "from-yellow-500/20",
    },
    { title: "2-р байр", desc: "Улаанбаатар 2024", color: "from-gray-500/20" },
    { title: "1-р байр", desc: "Electrikid 2024", color: "from-blue-500/20" },
    { title: "Web Design 101", desc: "2024", color: "from-green-500/20" },
    { title: "Arduino Robot", desc: "Тэмцээн", color: "from-purple-500/20" },
    {
      title: "Zero 2 Hero",
      desc: "2024 төгсөгчид",
      color: "from-orange-500/20",
    },
    { title: "Python", desc: "Топ төгсөгчид", color: "from-red-500/20" },
  ];

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-12 ${theme === "dark" ? "bg-brand-dark" : "bg-brand-light"} transition-colors`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-black"} mb-4`}
          >
            ХҮҮХДҮҮДИЙН АМЖИЛТ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`relative p-6 rounded-2xl overflow-hidden border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"} group hover:scale-105 transition-all`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${a.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">{a.title}</h3>
                <p
                  className={`text-sm ${theme === "dark" ? "text-white/60" : "text-black/60"}`}
                >
                  {a.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Testimonials Section (Зурагнаас авсан мэдээлэл) ---
const TestimonialsSection = () => {
  const { theme } = useAppContext();

  const testimonials = [
    {
      initial: "Б",
      color: "bg-green-500",
      text: "“Хүүхэд маань TEE-д 2 жил суралцсанаас хойш технологид маш их сонирхолтой болсон. Одоо өөрийн вэбсайт хийж чаддаг болсон.”",
      name: "Б. Батбаяр",
      role: "Эцэг, 7-р ангийн сурагчийн",
    },
    {
      initial: "Д",
      color: "bg-blue-500",
      text: "“Scratch програмчлал сурснаас хойш хүүхэд маань логик сэтгэлгээ маш их хөгжсөн. Математикийн хичээлд ч илүү сайн болсон.”",
      name: "Д. Сарангэрэл",
      role: "Ээж, 5-р ангийн сурагчийн",
    },
    {
      initial: "Э",
      color: "bg-orange-500",
      text: "“Би TEE-д Arduino робот хийж сурсан. Маш сонирхолтой! Ирээдүйд робот инженер болмоор байна.”",
      name: "Э. Тэмүүлэн",
      role: "6-р ангийн сурагч",
    },
  ];

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-12 ${theme === "dark" ? "bg-brand-dark" : "bg-white"} relative overflow-hidden transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            БИДНИЙ ТУХАЙ — ТЭДНИЙ ҮГ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-2xl border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"} relative group hover:scale-105 transition-all`}
            >
              <Quote
                className={`absolute top-4 right-4 ${theme === "dark" ? "text-white/10" : "text-black/10"}`}
                size={40}
              />

              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${testimonial.color} flex items-center justify-center text-white font-bold text-xl`}
                >
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p
                    className={`text-xs ${theme === "dark" ? "text-white/40" : "text-black/40"}`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <p
                className={`text-sm leading-relaxed ${theme === "dark" ? "text-white/70" : "text-black/70"}`}
              >
                {testimonial.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Success Stories Section (Original - хадгалагдсан) ---
const SuccessStoriesSection = () => {
  const { theme, language } = useAppContext();
  const t = translations[language].success;
  const stories = [
    {
      icon: <Trophy className="text-brand-accent" />,
      name: "Г. Бат-Эрдэнэ",
      grade: language === "mn" ? "8-р анги" : "8th Grade",
      achievement:
        language === "mn"
          ? "Python тэмцээнд алтан медаль"
          : "Gold medal in Python competition",
      color: "from-brand-secondary/20 to-transparent",
      borderColor: "border-brand-secondary/50",
    },
    {
      icon: <Zap className="text-brand-accent" />,
      name: "Э. Сарнай",
      grade: language === "mn" ? "6-р анги" : "6th Grade",
      achievement:
        language === "mn"
          ? "Arduino робот бүтээх уралдаанд шилдэг төсөл"
          : "Best project in Arduino robot building competition",
      color: "from-purple-500/20 to-transparent",
      borderColor: "border-purple-500/50",
    },
    {
      icon: <Star className="text-brand-accent" />,
      name: "М. Ганзориг",
      grade: language === "mn" ? "4-р анги" : "4th Grade",
      achievement:
        language === "mn"
          ? "Scratch анимэйшн уралдаанд тусгай шагнал"
          : "Special award in Scratch animation competition",
      color: "from-red-500/20 to-transparent",
      borderColor: "border-red-500/50",
    },
    {
      icon: <Award className="text-brand-accent" />,
      name: "А. Тэмүүжин",
      grade: language === "mn" ? "7-р анги" : "7th Grade",
      achievement:
        language === "mn"
          ? "Scratch тоглоом хөгжүүлэлтийн тэмцээнд 1-р байр"
          : "1st place in Scratch game development competition",
      color: "from-brand-accent/20 to-transparent",
      borderColor: "border-brand-accent/50",
    },
    {
      icon: <Cpu className="text-brand-accent" />,
      name: "Б. Номин-Эрдэнэ",
      grade: language === "mn" ? "9-р анги" : "9th Grade",
      achievement:
        language === "mn"
          ? "Олон улсын роботикийн олимпиадад оролцсон"
          : "Participated in International Robotics Olympiad",
      color: "from-blue-500/20 to-transparent",
      borderColor: "border-blue-500/50",
    },
    {
      icon: <Palette className="text-brand-accent" />,
      name: "Д. Ариунзаяа",
      grade: language === "mn" ? "5-р анги" : "5th Grade",
      achievement:
        language === "mn"
          ? "Хамгийн бүтээлч програмчлалын төсөл шагнал"
          : "Most creative programming project award",
      color: "from-brand-primary/20 to-transparent",
      borderColor: "border-brand-primary/50",
    },
  ];

  return (
    <section
      className={`py-20 ${theme === "dark" ? "bg-brand-dark" : "bg-brand-light"} relative overflow-hidden transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full border border-brand-secondary/30 bg-brand-secondary/5 text-brand-secondary text-[10px] uppercase tracking-[0.3em] font-bold"
          >
            Hall of Fame
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-5xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            {t.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">
              {t.subtitle}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${theme === "dark" ? "text-white/30" : "text-black/30"} text-xs uppercase tracking-[0.4em] font-bold max-w-lg`}
          >
            {t.desc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative ${theme === "dark" ? "bg-white/5 hover:bg-white/10 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10"} border rounded-2xl p-8 flex flex-col items-center text-center space-y-4 transition-all duration-500 overflow-hidden`}
            >
              <div
                className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${story.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />
              <div className="relative">
                <div
                  className={`${theme === "dark" ? "bg-white/10" : "bg-black/10"} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  {story.icon}
                </div>
              </div>
              <div>
                <h4
                  className={`font-bold text-lg ${theme === "dark" ? "text-white" : "text-black"} group-hover:text-brand-accent transition-colors`}
                >
                  {story.name}
                </h4>
                <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
                  {story.grade}
                </p>
              </div>
              <p
                className={`${theme === "dark" ? "text-white/40" : "text-black/40"} text-sm`}
              >
                {story.achievement}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main HomePage Component ---
const HomePage = () => {
  return (
    <main className="relative overflow-x-hidden">
      {/* SVG Definitions */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="paper">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="5"
              result="noise"
            />
            <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="2">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </svg>

      <HeroSection />
      <ClassesSection />
      <StatsSection />
      <AchievementsSection />
      <TestimonialsSection />
      <SuccessStoriesSection />
    </main>
  );
};

export default HomePage;
