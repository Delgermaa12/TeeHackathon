import { useEffect, useState } from "react";
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import styles from './AmbientDecorations.module.css';

const BRAND_COLORS = ["#FFB800", "#E53935", "#00A651", "#2D7FF9", "#D4AF37"];


export const Sparkles = () => {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const newSparkle = {
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
      };
      setSparkles(prev => [...prev.slice(-15), newSparkle]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: 180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute w-1.5 h-1.5"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              backgroundColor: s.color,
              boxShadow: `0 0 8px ${s.color}`,
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const GooseIcon = () => {
  const STROKE_SCALE = 2.6;

  const sw = (n: number) => n * STROKE_SCALE;

  const DRAW = 4.5;   // ziragdah hugatsaa
  const HOLD = 10.0;  // haragdah hugatsaa
  const FADE = 4.0;   // alga boloh hugatsaa
  const GAP = 1.2;    // daraagiinh ni garah hugatsaa

  const TOTAL = DRAW + HOLD + FADE;
  const tDrawEnd = DRAW / TOTAL;
  const tHoldEnd = (DRAW + HOLD) / TOTAL;

  const common = (delay = 0) => ({
    initial: { opacity: 0, strokeDashoffset: 1 },
    animate: {
      opacity: [0, 1, 1, 0],
      strokeDashoffset: [1, 0, 0, 0],
    },
    transition: {
      duration: TOTAL,
      times: [0, tDrawEnd, tHoldEnd, 1],
      ease: easeInOut,
      delay,
      repeat: Infinity,
      repeatDelay: GAP,
    },
  });

  const fadeOnly = (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: [0, 1, 1, 0] },
    transition: {
      duration: TOTAL,
      times: [0, tDrawEnd, tHoldEnd, 1],
      ease: easeInOut,
      delay,
      repeat: Infinity,
      repeatDelay: GAP,
    },
  });

  return (
    <motion.svg viewBox="0 0 210 297" className="w-full h-full">
      <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
        <g>
          <motion.path
            d="m 178.17877,120.88071 a 66.469612,75.498703 0 0 1 -66.40473,75.49866 66.469612,75.498703 0 0 1 -66.534366,-75.35129 l 66.469486,-0.14737 z"
            fill="none"
            stroke="#d5d23a"
            strokeWidth={sw(0.399)}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            {...common(0)}
          />

          <motion.path
            d="m 45.332363,120.92373 a 42.851646,50.954716 0 0 1 21.341187,-44.323659 42.851646,50.954716 0 0 1 42.95204,-0.04671 42.851646,50.954716 0 0 1 21.40932,44.277175 l -42.851431,-0.16028 z"
            fill="none"
            stroke="#d5d23a"
            strokeWidth={sw(0.572)}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            {...common(0.15)}
          />
        </g>

        <g>
          <motion.path
            d="m 100.08727,-131.51253 a 26.137545,28.808369 0 0 1 26.17064,-28.51937 26.137545,28.808369 0 0 1 26.10242,28.5952 l -26.13683,0.21314 z"
            transform="scale(1,-1)"
            fill="none"
            stroke="#0787ff"
            strokeWidth={sw(0.335965)}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            {...common(0.25)}
          />

          <motion.path
            d="m 45.651262,130.92383 a 17.090006,18.832779 0 0 1 -12.150756,-5.46272 17.090006,18.832779 0 0 1 -5.053683,-13.34597 l 17.089993,-0.0237 z"
            fill="none"
            stroke="#f43434"
            strokeWidth={sw(0.295913)}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            {...common(0.35)}
          />
        </g>

        <g>
          <motion.path
            d="m -152.72255,-92.90889 a 25.337103,28.122721 0 0 1 -18.03724,-8.20108 25.337103,28.122721 0 0 1 -7.45291,-19.99097 l 25.33703,0.0698 z"
            transform="scale(-1)"
            fill="none"
            stroke="#078127"
            strokeWidth={sw(0.389)}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            {...common(0.2)}
          />
        </g>

        <g>
          <motion.ellipse
            cx="73.994774"
            cy="93.564285"
            rx="8.2766819"
            ry="9.029108"
            fill="none"
            stroke="#ffffff"
            strokeWidth={sw(0.0493468)}
            {...fadeOnly(0.75)}
          />
          <motion.ellipse
            cx="72.44487"
            cy="89.95108"
            rx="2.1292045"
            ry="2.3227687"
            fill="none"
            stroke="#ffffff"
            strokeWidth={sw(0.0126946)}
            {...fadeOnly(0.95)}
          />
          <motion.ellipse
            cx="76.167404"
            cy="89.354385"
            rx="1.1686611"
            ry="1.2749032"
            fill="none"
            stroke="#ffffff"
            strokeWidth={sw(0.007)}
            {...fadeOnly(1.05)}
          />
          <motion.ellipse
            cx="72.393433"
            cy="93.407776"
            rx="6.8816948"
            ry="7.3576117"
            fill="none"
            stroke="#000000"
            strokeWidth={sw(0.0406185)}
            {...fadeOnly(0.85)}
          />
        </g>
      </motion.g>
    </motion.svg>
  );
};

const TeeeText = () => (
  <div className="flex font-serif italic text-2xl md:text-3xl tracking-tighter select-none opacity-100 filter blur-[1px]">
    <span className={styles.teeeT}>T</span>
    <span className={styles.teeeE1}>e</span>
    <span className={styles.teeeE2}>e</span>
    <span className={styles.teeeE3}>e</span>
  </div>
);


export const AmbientDecorations = () => {
  const [elements, setElements] = useState<{ id: number; type: 'goose' | 'teee'; x: number; y: number; side: 'left' | 'right' }[]>([]);

  useEffect(() => {
    const spawn = () => {
      const id = Date.now();
      const side = Math.random() > 0.5 ? 'left' : 'right';
      const type = Math.random() > 0.5 ? 'goose' : 'teee';
      
      // Keep them in the "empty" side areas
      const x = side === 'left' ? Math.random() * 12 : 88 + Math.random() * 10;
      const y = 5 + Math.random() * 90;

      const newElement = { id, type, x, y, side } as const;
      setElements(prev => [...prev.slice(-4), newElement]);
    };

    const interval = setInterval(spawn, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {elements.map(el => (
          <motion.div
  key={el.id}
  initial={{ opacity: 0, y: el.y + 20, scale: 0.8 }}
  animate={{ opacity: el.type === "goose" ? 0.55 : 0.18, y: el.y, scale: 1 }}
  exit={{ opacity: 0, scale: 1.1 }}
  transition={{ duration: 1.5, ease: "easeOut" }}
  className="absolute"
  style={{
    left: `${el.x}%`,
    top: `${el.y}%`,
    width: el.type === "goose" ? "70px" : "auto",
    height: el.type === "goose" ? "70px" : "auto",
  }}
>
  {el.type === "goose" ? <GooseIcon /> : <TeeeText />}
</motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
