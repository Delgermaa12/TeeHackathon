
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react"
;
import { PATHS } from "./constants";

const COLORS = {
  GOLD: "#D4AF37",
  YELLOW: "#F4B400",
  RED: "#DB4437",
  BLUE: "#4285F4",
  GREEN: "#0F9D58",
  BG: "#050505",
  PENCIL: "#A0A0A0",
};

/**
 * Cinematic Scratch Overlay
 * Mimics the "old film" or "sketchbook" texture seen in the transitions
 */
const TransitionScratches = ({
  seed,
}: {
  seed: number;
  key?: React.Key;
}) => {
  const lines = useMemo(() => {
    const rand = (n: number) => {
      const x = Math.sin(seed * 999 + n * 1234) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 12 }).map((_, i) => {
      const x1 = rand(i) * 240;
      const y1 = rand(i + 1) * 240;
      const x2 = rand(i + 2) * 240;
      const y2 = rand(i + 3) * 240;
      const cx = (x1 + x2) / 2 + (rand(i + 4) * 20 - 10);
      const cy = (y1 + y2) / 2 + (rand(i + 5) * 20 - 10);
      return {
        id: i,
        d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`,
        w: rand(i + 6) * 0.8 + 0.2,
        delay: rand(i + 7) * 0.1,
      };
    });
  }, [seed]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0] }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 240 240" className="w-full h-full">
        {lines.map((ln) => (
          <motion.path
            key={ln.id}
            d={ln.d}
            fill="none"
            stroke={COLORS.PENCIL}
            strokeWidth={ln.w}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.5, delay: ln.delay }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

/**
 * Sketch Drafts
 * Faint lines that appear before the main shape is finalized
 */
const SketchDrafts = ({ path, delay = 0 }: { path: string; delay?: number }) => {
  return (
    <g>
      {[...Array(3)].map((_, i) => (
        <motion.path
          key={i}
          d={path}
          fill="none"
          stroke={COLORS.PENCIL}
          strokeWidth="0.2"
          initial={{ pathLength: 0, opacity: 0, x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }}
          animate={{ pathLength: 1, opacity: [0, 0.1, 0] }}
          transition={{ duration: 2, delay: delay + i * 0.3 }}
        />
      ))}
    </g>
  );
};

export const CinematicLogo = () => {
  const [scene, setScene] = useState(1);
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setScene(2), 4000),  // Morph to Sketch
      setTimeout(() => setScene(3), 8000),  // Color Fill
      setTimeout(() => setScene(4), 12000), // Final Identity
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    setTransitionKey((k) => k + 1);
  }, [scene]);

  const reset = () => {
    setScene(1);
    setTransitionKey(0);
    // Restart logic would go here if needed
  };

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
      <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor={COLORS.GOLD} />
            <stop offset="100%" stopColor="#8B7355" />
          </linearGradient>

          <mask id="duckMask">
            <path d={PATHS.GOOSE_PNG} fill="white" />
          </mask>
        </defs>

        <AnimatePresence mode="wait">
          {/* Scene 1: Golden Ratio Reveal */}
          {scene === 1 && (
            <motion.g
              key="scene1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <SketchDrafts path={PATHS.GOLDEN_RATIO} />
              <motion.path
                d={PATHS.GOLDEN_RATIO}
                fill="none"
                stroke="url(#goldGrad)"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                filter="url(#glow)"
              />
            </motion.g>
          )}

          {/* Scene 2: The Sketching Phase */}
          {scene === 2 && (
            <motion.g
              key="scene2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SketchDrafts path={PATHS.GOOSE_JPG} />
              <motion.path
                d={PATHS.GOOSE_JPG}
                fill="none"
                stroke={COLORS.GOLD}
                strokeWidth="0.6"
                strokeDasharray="4 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3 }}
                filter="url(#glow)"
              />
            </motion.g>
          )}

          {/* Scene 3: Color Infusion */}
          {scene === 3 && (
            <motion.g
              key="scene3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.path
                d={PATHS.GOOSE_PNG}
                fill={COLORS.YELLOW}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
                filter="url(#glow)"
              />
              {/* Sparkle Particles */}
              {[...Array(15)].map((_, i) => (
                <motion.circle
                  key={i}
                  r={Math.random() * 1.5}
                  fill="white"
                  initial={{ opacity: 0, x: 120, y: 120 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    x: 120 + (Math.random() * 100 - 50),
                    y: 120 + (Math.random() * 100 - 50)
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.g>
          )}

          {/* Scene 4: Final Identity */}
          {scene === 4 && (
            <motion.g
              key="scene4"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.path
                d={PATHS.GOOSE_PNG}
                fill={COLORS.YELLOW}
                stroke={COLORS.GOLD}
                strokeWidth="0.5"
                filter="url(#glow)"
              />
              
              {/* Integrated Text Te3 */}
              <motion.text
                x="90" y="135"
                fill={COLORS.RED}
                fontSize="38"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
                initial={{ opacity: 0, y: 145 }}
                animate={{ opacity: 1, y: 135 }}
                transition={{ delay: 0.5, duration: 1 }}
              >T</motion.text>
              <motion.text
                x="115" y="135"
                fill={COLORS.BLUE}
                fontSize="34"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
                initial={{ opacity: 0, y: 145 }}
                animate={{ opacity: 1, y: 135 }}
                transition={{ delay: 0.7, duration: 1 }}
              >e</motion.text>
              <motion.text
                x="138" y="115"
                fill={COLORS.GREEN}
                fontSize="20"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
              >³</motion.text>

              {/* Shine Sweep */}
              <motion.rect
                x="0" y="0" width="240" height="240"
                fill="linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                animate={{ x: [-240, 240] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                style={{ mixBlendMode: 'overlay' }}
                mask="url(#duckMask)"
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      <AnimatePresence>
        <TransitionScratches key={transitionKey} seed={transitionKey} />
      </AnimatePresence>
    </div>
  );
};
