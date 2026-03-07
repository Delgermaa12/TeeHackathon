import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, easeInOut } from "framer-motion";

const TWO_PI = 6.283185307179586;

const BRAND_COLORS = {
  YELLOW: "#FFB800",
  RED: "#E53935",
  GREEN: "#00A651",
  BLUE: "#2D7FF9",
  GOLD: "#D4AF37",
};

export const PATHS = {
  GOLDEN_RATIO: "M 1486.980469 1373.058594 L 1487.03125 1373.09375 Z M 1244.761719 504.730469 C 1236.191406 504.730469 1227.640625 504.851562 1219.128906 505.089844 C 1012.78125 510.941406 822.570312 587.828125 684.402344 672.191406 C 546.039062 756.671875 459.609375 848.808594 381.246094 954.851562 C 302.988281 1060.75 232.441406 1180.96875 193.535156 1300.976562 C 154.628906 1420.992188 147.5 1540.480469 140.394531 1659.152344 C 140.386719 1659.265625 140.382812 1659.378906 140.382812 1659.496094 C 140.382812 1662.65625 142.949219 1665.21875 146.109375 1665.21875 C 149.140625 1665.21875 151.644531 1662.859375 151.824219 1659.835938 C 158.945312 1540.96875 166.042969 1422.921875 204.429688 1304.507812 C 242.820312 1186.089844 312.625 1066.980469 390.457031 961.660156 C 468.183594 856.480469 553.578125 765.488281 690.371094 681.960938 C 827.359375 598.320312 1015.640625 522.320312 1219.449219 516.53125 C 1227.871094 516.300781 1236.308594 516.179688 1244.78125 516.179688 C 1441.390625 516.179688 1648.761719 580.519531 1787.191406 702.890625 C 1796.988281 711.558594 1806.441406 720.5 1815.558594 729.71875 C 1940.75 856.320312 2001.941406 1032.640625 2007.691406 1182.039062 C 2013.851562 1342.027344 1956.390625 1470.554688 1855.648438 1554.339844 C 1779.839844 1617.386719 1679.71875 1655.039062 1588 1655.039062 C 1557.339844 1655.039062 1527.621094 1650.832031 1500.058594 1641.957031 C 1457.019531 1628.097656 1418.988281 1602.785156 1388.28125 1571.734375 C 1340.570312 1523.492188 1310.960938 1461.871094 1307.308594 1408.851562 C 1301.320312 1322.097656 1364.910156 1256.414062 1421.828125 1235.820312 C 1436.441406 1230.535156 1450.578125 1228.257812 1463.910156 1228.257812 C 1498.390625 1228.257812 1527.449219 1243.507812 1545.179688 1261.429688 L 1545.179688 1261.433594 C 1546.921875 1263.191406 1548.558594 1264.988281 1550.058594 1266.773438 C 1572.410156 1293.332031 1569.449219 1323.109375 1560.828125 1343.972656 C 1552.289062 1364.625 1538.660156 1375.257812 1524.699219 1378.992188 C 1520.488281 1380.121094 1516.230469 1380.632812 1512.101562 1380.632812 C 1502.179688 1380.632812 1493.050781 1377.679688 1487.289062 1373.277344 L 1487.28125 1373.273438 C 1486.390625 1372.59375 1485.570312 1371.859375 1484.828125 1371.117188 C 1479.109375 1365.328125 1477.460938 1357.402344 1478.550781 1350.625 C 1479.789062 1342.882812 1484.410156 1337.625 1488.308594 1336.066406 C 1489.359375 1335.644531 1490.441406 1335.457031 1491.519531 1335.457031 C 1494.109375 1335.457031 1496.589844 1336.554688 1498.058594 1338.042969 C 1498.089844 1338.066406 1498.148438 1338.136719 1498.160156 1338.144531 L 1498.171875 1338.15625 C 1499.898438 1340 1500.261719 1342.675781 1500.519531 1348.160156 C 1500.660156 1351.226562 1503.191406 1353.613281 1506.230469 1353.613281 C 1506.320312 1353.613281 1506.421875 1353.613281 1506.511719 1353.609375 C 1509.671875 1353.460938 1512.109375 1350.777344 1511.960938 1347.617188 C 1511.75 1343.097656 1511.640625 1335.78125 1506.53125 1330.332031 C 1506.429688 1330.222656 1506.289062 1330.082031 1506.199219 1329.988281 C 1502.761719 1326.507812 1497.351562 1323.996094 1491.5 1323.996094 C 1489.058594 1323.996094 1486.53125 1324.4375 1484.039062 1325.433594 C 1475.671875 1328.792969 1468.980469 1337.964844 1467.238281 1348.8125 C 1465.679688 1358.507812 1467.941406 1370.328125 1476.691406 1379.171875 C 1477.800781 1380.296875 1479.011719 1381.367188 1480.320312 1382.371094 L 1480.339844 1382.378906 C 1488.289062 1388.453125 1499.878906 1392.082031 1512.089844 1392.082031 C 1517.25 1392.082031 1522.519531 1391.4375 1527.671875 1390.054688 C 1545.429688 1385.300781 1561.671875 1371.933594 1571.410156 1348.347656 C 1581.070312 1324.972656 1584.800781 1290.269531 1558.820312 1259.402344 C 1557.121094 1257.367188 1555.289062 1255.367188 1553.339844 1253.390625 L 1553.320312 1253.378906 C 1533.691406 1233.527344 1501.699219 1216.796875 1463.910156 1216.796875 C 1449.320312 1216.796875 1433.871094 1219.285156 1417.941406 1225.050781 C 1357.410156 1246.949219 1289.460938 1316.613281 1295.878906 1409.640625 C 1299.769531 1465.914062 1330.898438 1530 1380.140625 1579.785156 C 1411.949219 1611.957031 1451.519531 1638.359375 1496.550781 1652.859375 C 1525.320312 1662.121094 1556.230469 1666.5 1588.011719 1666.5 C 1682.859375 1666.5 1785.558594 1627.53125 1862.96875 1563.144531 C 1966.738281 1476.839844 2025.421875 1344.742188 2019.140625 1181.589844 C 2013.300781 1029.789062 1951.191406 850.589844 1823.691406 721.671875 C 1814.398438 712.269531 1804.769531 703.148438 1794.78125 694.308594 C 1653.828125 569.710938 1443.570312 504.730469 1244.761719 504.730469 Z M 1244.761719 504.730469",

  SECOND_BODY: "m 949.01016,1128.253 c 13.50819,277.3789 -171.17337,399.5018 -174.7705,387.9077 -34.41191,-110.9145 -246.55834,-164.9011 -327.70611,7.5406 -1.1357,2.4134 -207.82218,-183.0338 -177.58395,-395.8938 l 340.0302,0.4455 z",

  SECOND_HEAD: "m 601.97603,1109.3419 c 8.39573,-79.6382 -14.7458,-144.51777 -67.09322,-183.9189 -60.92992,-45.86104 -152.24938,-39.17628 -199.46477,2.302 -39.49208,34.69342 -65.51655,82.3859 -65.3039,181.8292 l 165.9309,-0.2123 z",

  SECOND_FEET: "m 762.77781,1584.409 c 7.49539,-55.8255 -20.92788,-101.3051 -67.6616,-128.9249 -54.39583,-32.148 -122.16119,-28.6605 -164.87648,0.061 -42.38948,28.5025 -66.96437,64.1432 -63.73514,129.0128 l 148.13658,-0.1489 z",

  SECOND_TAIL: "m 846.82206,1110.4725 a 50.053673,51.958546 0 0 1 50.03603,-51.9756 50.053673,51.958546 0 0 1 50.07131,51.939 l -50.05367,0.02 z",

  SECOND_MOUTH: "m 182.64379,1108.4485 a 72.835861,72.179535 0 0 1 72.48474,-72.2024 l 0.35111,72.1787 z",

  TEE_T: "m 128.12209,413.43608 h -1.08 v -7.03467 h -2.71444 l 0.0384,-1.53333 h 6.42 v 1.62338 l -2.62556,-0.045 z",

  TEE_E: "m 686.80498,1283.3393 -81.96794,58.3491 q 13.85913,13.7598 28.48446,14.3243 14.65345,0.3582 25.83091,-7.5984 17.23197,-12.2665 18.04629,-35.7276 l 23.23866,1.3161 q -0.36235,34.673 -28.30601,54.5646 -21.42353,15.2504 -46.95407,9.985 -25.53046,-5.2654 -41.99392,-28.3327 -15.40697,-21.5872 -12.12223,-47.7371 3.31324,-26.3559 24.38744,-41.3577 20.72485,-14.7531 47.04499,-9.1194 26.23205,5.5102 44.31142,31.3338 z m -92.10983,39.7106 58.68153,-41.7725 q -24.74689,-14.0084 -43.84174,-0.4156 -20.84128,14.836 -14.83979,42.1881 z",

  FINAL_BODY_OUTER: "m 178.17877,120.88071 a 66.469612,75.498703 0 0 1 -66.40473,75.49866 66.469612,75.498703 0 0 1 -66.534366,-75.35129 l 66.469486,-0.14737 z",

  FINAL_HEAD_TOP: "m 100.08727,-131.51253 a 26.137545,28.808369 0 0 1 26.17064,-28.51937 26.137545,28.808369 0 0 1 26.10242,28.5952 l -26.13683,0.21314 z",

  FINAL_BODY_INNER: "m 45.332363,120.92373 a 42.851646,50.954716 0 0 1 21.341187,-44.323659 42.851646,50.954716 0 0 1 42.95204,-0.04671 42.851646,50.954716 0 0 1 21.40932,44.277175 l -42.851431,-0.16028 z",

  FINAL_MOUTH: "m 45.651262,130.92383 a 17.090006,18.832779 0 0 1 -12.150756,-5.46272 17.090006,18.832779 0 0 1 -5.053683,-13.34597 l 17.089993,-0.0237 z",

  FINAL_TAIL: "m -152.72255,-92.90889 a 25.337103,28.122721 0 0 1 -18.03724,-8.20108 25.337103,28.122721 0 0 1 -7.45291,-19.99097 l 25.33703,0.0698 z",
};

type ScenePart =
  | { kind: "path"; d: string; color: string; delay: number; transform?: string }
  | { kind: "ellipse"; cx: number; cy: number; rx: number; ry: number; color: string; delay: number };

type Scene = {
  key: string;
  viewBox: string;
  strokeWidth: number;
  parts: ScenePart[];
  drawDuration: number;
  holdDuration: number;
  scribbleInMs?: number;
  scribbleOutMs?: number;
  sceneTransform?: string;
  camera?: { scaleIn: number; rotateIn: number; yIn: number };
};

const SCENES: Scene[] = [
  {
    key: "golden",
    viewBox: "120 460 1940 1260",
    strokeWidth: 6,
    drawDuration: 2.3,
    holdDuration: 1.1,
    camera: { scaleIn: 0.92, rotateIn: -1.4, yIn: 8 },
    parts: [{ kind: "path", d: PATHS.GOLDEN_RATIO, color: BRAND_COLORS.GOLD, delay: 0 }],
  },
  {
    key: "old",
    viewBox: "0 0 210 297",
    strokeWidth: 3.2,
    drawDuration: 2.4,
    holdDuration: 0.85,
    scribbleInMs: 420,
    scribbleOutMs: 520,
    camera: { scaleIn: 0.92, rotateIn: 1.2, yIn: 10 },
    sceneTransform: "matrix(0.148472256,0,0,0.148472256,37.336805,-21.726667)",
    parts: [
      { kind: "path", d: PATHS.SECOND_BODY, color: BRAND_COLORS.YELLOW, delay: 0.0 },
      { kind: "path", d: PATHS.SECOND_HEAD, color: BRAND_COLORS.YELLOW, delay: 0.28 },
      { kind: "path", d: PATHS.SECOND_TAIL, color: BRAND_COLORS.GREEN, delay: 0.18 },
      { kind: "path", d: PATHS.SECOND_MOUTH, color: BRAND_COLORS.RED, delay: 0.42 },
      { kind: "path", d: PATHS.SECOND_FEET, color: BRAND_COLORS.BLUE, delay: 0.24 },
      { kind: "path", d: PATHS.TEE_T, color: BRAND_COLORS.RED, delay: 0.36 },
      { kind: "path", d: PATHS.TEE_E, color: BRAND_COLORS.BLUE, delay: 0.44 },
      { kind: "ellipse", cx: 365.44446, cy: 989.89349, rx: 25.247002, ry: 25.96154, color: "white", delay: 0.72 },
      { kind: "ellipse", cx: 365.40308, cy: 988.8421, rx: 11.255884, ry: 11.574448, color: BRAND_COLORS.BLUE, delay: 0.82 },
    ],
  },
  {
    key: "final",
    viewBox: "0 0 210 297",
    strokeWidth: 1.8,
    drawDuration: 2.75,
    holdDuration: 2.2,
    scribbleInMs: 420,
    camera: { scaleIn: 0.93, rotateIn: -1.0, yIn: 10 },
    parts: [
      { kind: "path", d: PATHS.FINAL_BODY_OUTER, color: BRAND_COLORS.GOLD, delay: 0.0 },
      { kind: "path", d: PATHS.FINAL_BODY_INNER, color: BRAND_COLORS.GOLD, delay: 0.14 },
      { kind: "path", d: PATHS.FINAL_HEAD_TOP, color: BRAND_COLORS.BLUE, delay: 0.22, transform: "scale(1,-1)" },
      { kind: "path", d: PATHS.FINAL_MOUTH, color: BRAND_COLORS.RED, delay: 0.4 },
      { kind: "path", d: PATHS.FINAL_TAIL, color: BRAND_COLORS.GREEN, delay: 0.18, transform: "scale(-1,1)" },
      { kind: "ellipse", cx: 73.994774, cy: 93.564285, rx: 8.2766819, ry: 9.029108, color: "white", delay: 0.46 },
      { kind: "ellipse", cx: 72.44487, cy: 89.95108, rx: 2.1292045, ry: 2.3227687, color: "white", delay: 0.6 },
    ],
  },
];

function prand(seed: number, n: number) {
  const x = Math.sin(seed * 999 + n * 1234) * 10000;
  return x - Math.floor(x);
}

function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  const x1 = cx - rx;
  const x2 = cx + rx;
  return `M ${x1} ${cy} A ${rx} ${ry} 0 1 0 ${x2} ${cy} A ${rx} ${ry} 0 1 0 ${x1} ${cy} Z`;
}

function PaperFX() {
  const { theme } = useAppContext?.() || { theme: 'dark' };

  // Зөвхөн dark mode-д л PaperFX харуулах
  if (theme !== 'dark') return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_10%,white_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_50%_50%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)]" />
    </div>
  );
}

function SketchOverlay({ seed, intensity = 1 }: { seed: number; intensity?: number }) {
  const { theme } = useAppContext?.() || { theme: 'dark' };
  const strokeColor = theme === 'dark' ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.3)';

  const lines = useMemo(() => {
    const count = Math.floor(26 * intensity);
    return Array.from({ length: count }).map((_, i) => {
      const x1 = prand(seed, i) * 250;
      const y1 = prand(seed, i + 1) * 250;
      const x2 = x1 + (prand(seed, i + 2) - 0.5) * (140 + 90 * intensity);
      const y2 = y1 + (prand(seed, i + 3) - 0.5) * (140 + 90 * intensity);
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    });
  }, [seed, intensity]);

  return (
    <motion.svg
      viewBox="0 0 250 250"
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.38 }}
      exit={{ opacity: 0 }}
    >
      {lines.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={0.6}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.34, delay: i * 0.011 }}
        />
      ))}
    </motion.svg>
  );
}

function BurstParticles({ seed }: { seed: number }) {
  const particles = useMemo(() => {
    const palette = Object.values(BRAND_COLORS);
    return Array.from({ length: 40 }).map((_, i) => {
      const a = prand(seed, i) * TWO_PI;
      const distance = 52 + prand(seed, i + 1) * 160;
      const size = 1 + prand(seed, i + 2) * 2.8;
      const duration = 0.42 + prand(seed, i + 3) * 0.62;
      const color = palette[Math.floor(prand(seed, i + 4) * palette.length)];
      return { a, distance, size, duration, color };
    });
  }, [seed]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: Math.cos(p.a) * p.distance, y: Math.sin(p.a) * p.distance, opacity: 0, scale: 0 }}
          transition={{ duration: p.duration, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function ChromaticGlitch({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <>
      <motion.div
        className="absolute inset-0 z-40 mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.35, 0] }}
        transition={{ duration: 0.45 }}
        style={{ filter: "blur(1px)" }}
      >
        <div className="absolute inset-0 translate-x-[2px] opacity-60 bg-[#2D7FF9]/10" />
        <div className="absolute inset-0 -translate-x-[2px] opacity-60 bg-[#E53935]/10" />
        <div className="absolute inset-0 translate-y-[1px] opacity-60 bg-[#00A651]/10" />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.18, 0] }}
        transition={{ duration: 0.45 }}
        style={{ background: "rgba(255,255,255,0.04)" }}
      />
    </>
  );
}

function TipGlow({ d, delay, duration, color }: { d: string; delay: number; duration: number; color: string }) {
  return (
    <motion.circle r="3.6" fill={color} opacity={0.0} filter="url(#glow)">
      <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount={1} keyTimes="0;1" keySplines="0.45 0 0.55 1" calcMode="spline" path={d} />
      <animate attributeName="opacity" dur={`${duration}s`} begin={`${delay}s`} values="0;0.9;0" keyTimes="0;0.25;1" repeatCount={1} />
    </motion.circle>
  );
}

function SceneSVG({
  scene,
  phase,
  isFinished,
  scratchSeed,
  morphingToNext,
}: {
  scene: Scene;
  phase: "scribbleIn" | "draw" | "hold" | "scribbleOut";
  isFinished: boolean;
  scratchSeed: number;
  morphingToNext: boolean;
}) {
  const drawEase = [0.45, 0, 0.55, 1] as const;

  const isGolden = scene.key === "golden";
  const outSeconds = (scene.scribbleOutMs ?? 640) / 1000;

  const holdWobble = phase === "hold" || isFinished ? { rotate: [0, 0.6, 0], scale: [1, 1.01, 1] } : {};
  const holdWobbleT = phase === "hold" || isFinished ? { duration: 3.2, repeat: Infinity, ease: easeInOut } : { duration: 0 };

  const sceneMorph = morphingToNext ? { scale: [1, 1.08], rotate: [0, 12], opacity: [1, 0.35] } : {};
  const sceneMorphT = morphingToNext ? { duration: outSeconds, ease: easeInOut } : { duration: 0 };

  return (
    <motion.svg
      viewBox={scene.viewBox}
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      initial={{ opacity: 0, filter: "grayscale(1) blur(10px)", scale: 0.92 }}
      animate={{ opacity: 1, filter: "grayscale(0) blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "grayscale(1) blur(12px)", scale: 1.07 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <motion.g animate={{ ...holdWobble, ...sceneMorph }} transition={morphingToNext ? sceneMorphT : holdWobbleT}>
        <g transform={scene.sceneTransform}>
          {scene.parts.map((part, i) => {
            const delay = part.delay;
            const d = part.kind === "ellipse" ? ellipsePath(part.cx, part.cy, part.rx, part.ry) : part.d;
            const staticTf = part.kind === "path" ? part.transform : undefined;
            const color = part.color;

            const partMorph = morphingToNext
              ? {
                x: (prand(scratchSeed + 17, i) - 0.5) * 6,
                y: (prand(scratchSeed + 27, i) - 0.5) * 6,
                scale: [1, 1.06],
                opacity: [1, 0.55],
              }
              : { x: 0, y: 0, scale: 1, opacity: 1 };

            const partMorphT = morphingToNext ? { duration: outSeconds, ease: easeInOut } : { duration: 0 };

            return (
              <motion.g key={i} animate={partMorph} transition={partMorphT}>
                <g transform={staticTf}>
                  {/* blueprint */}
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth={scene.strokeWidth * 0.6}
                    strokeDasharray="6 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: scene.drawDuration * 0.55, delay }}
                  />

                  {/* Golden ratio draft pass */}
                  {isGolden &&
                    [0, 1, 2].map((k) => (
                      <motion.path
                        key={`draft-${i}-${k}`}
                        d={d}
                        fill="none"
                        stroke="rgba(255,255,255,0.22)"
                        strokeWidth={scene.strokeWidth * 0.42}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pathLength={1}
                        strokeDasharray="1"
                        initial={{ strokeDashoffset: 1, opacity: 0, x: 0, y: 0 }}
                        animate={{
                          strokeDashoffset: 0,
                          opacity: 1,
                          x: (prand(99 + k, i) - 0.5) * 2.2,
                          y: (prand(199 + k, i) - 0.5) * 2.2,
                        }}
                        transition={{
                          strokeDashoffset: { duration: scene.drawDuration * 0.78, delay: delay + k * 0.06, ease: drawEase },
                          opacity: { duration: 0.2, delay: delay + k * 0.06 },
                          x: { duration: 0.6, delay: delay + k * 0.06 },
                          y: { duration: 0.6, delay: delay + k * 0.06 },
                        }}
                        filter="url(#rough)"
                      />
                    ))}

                  {/* main stroke */}
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={scene.strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                    pathLength={1}
                    strokeDasharray="1"
                    initial={{ strokeDashoffset: 1, opacity: 0 }}
                    animate={{ strokeDashoffset: 0, opacity: 1 }}
                    transition={{
                      strokeDashoffset: { duration: scene.drawDuration, ease: drawEase, delay },
                      opacity: { duration: 0.22, delay },
                    }}
                  />

                  {/* subtle rough ink */}
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={scene.strokeWidth * 1.15}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#rough)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === "draw" || phase === "hold" || isFinished ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: delay + 0.15 }}
                  />

                  {/* ink bleed fill */}
                  <motion.path
                    d={d}
                    fill={color}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{
                      opacity: phase === "hold" || isFinished ? 0.14 : 0,
                      scale: phase === "hold" || isFinished ? 1 : 0.985,
                    }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />

                  {/* soft glow */}
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={scene.strokeWidth * 3.1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="blur-xl opacity-20"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: scene.drawDuration * 1.05, ease: drawEase, delay }}
                  />

                  {(phase === "draw" || isFinished) && <TipGlow d={d} delay={delay} duration={scene.drawDuration} color={color} />}
                </g>
              </motion.g>
            );
          })}
        </g>
      </motion.g>
    </motion.svg>
  );
}

// useAppContext-ийг импортлох эсвэл түр хувьсагч
let useAppContext: any = () => ({ theme: 'dark' });

// Хэрэв context байгаа бол ашиглах
(async () => {
  try {
    const contextModule = await import('../context/AppContext');
    useAppContext = contextModule.useAppContext;
  } catch (e) {
    // context байхгүй бол default утга ашиглах
  }
})();

export default function IntroAnimation() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [phase, setPhase] = useState<"scribbleIn" | "draw" | "hold" | "scribbleOut">("scribbleIn");
  const [scratchSeed, setScratchSeed] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const timers = useRef<number[]>([]);

  const clearAll = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    if (isFinished) return;
    clearAll();

    const scene = SCENES[sceneIdx];

    setPhase("scribbleIn");
    setScratchSeed((s) => s + 1);

    const tScribbleIn = scene.scribbleInMs ?? 520;
    const tDraw = Math.floor(scene.drawDuration * 1000);
    const tHold = Math.floor(scene.holdDuration * 1000);
    const tScribbleOut = scene.scribbleOutMs ?? 640;

    timers.current.push(window.setTimeout(() => setPhase("draw"), tScribbleIn));

    timers.current.push(
      window.setTimeout(() => {
        setPhase("hold");
      }, tScribbleIn + tDraw)
    );

    timers.current.push(
      window.setTimeout(() => {
        if (sceneIdx < SCENES.length - 1) {
          setPhase("scribbleOut");
          setScratchSeed((s) => s + 1);

          timers.current.push(
            window.setTimeout(() => {
              setSceneIdx((v) => v + 1);
            }, tScribbleOut)
          );
        } else {
          setIsFinished(true);
        }
      }, tScribbleIn + tDraw + tHold)
    );

    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, isFinished]);

  const scene = SCENES[sceneIdx];
  const showCore = phase === "draw" || phase === "hold" || phase === "scribbleOut" || isFinished;

  const cam = scene.camera ?? { scaleIn: 0.93, rotateIn: 0, yIn: 10 };

  const hasNext = sceneIdx < SCENES.length - 1;
  const nextScene = hasNext ? SCENES[sceneIdx + 1] : null;

  const morphingToNext = scene.key === "old" && phase === "scribbleOut" && hasNext && nextScene?.key === "final";

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none bg-transparent">
      <PaperFX />

      <AnimatePresence>
        {(phase === "scribbleIn" || phase === "scribbleOut") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.085 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]"
          />
        )}
      </AnimatePresence>

      <div className="relative w-full h-full bg-transparent">
        {/* scribble FX */}
        <AnimatePresence mode="wait">
          {(phase === "scribbleIn" || phase === "scribbleOut") && (
            <motion.div
              key={`scratch-${scratchSeed}`}
              className="absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.33 }}
            >
              <SketchOverlay seed={scratchSeed} intensity={phase === "scribbleOut" ? 1.18 : 1} />
              <BurstParticles seed={scratchSeed} />
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl bg-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [0, 1, 0], scale: [0.9, 1.08, 1] }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ChromaticGlitch active={phase === "scribbleOut"} />

        {/* next scene preview during morph (old->final) */}
        {morphingToNext && nextScene && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: (scene.scribbleOutMs ?? 520) / 1000, ease: [0.22, 1, 0.36, 1] }}
          >
            <SceneSVG
              scene={nextScene}
              phase={"draw"}
              isFinished={false}
              scratchSeed={scratchSeed + 999}
              morphingToNext={false}
            />
          </motion.div>
        )}

        {/* core scene */}
        <AnimatePresence mode="wait">
          {showCore && (
            <motion.div
              key={`${scene.key}-${sceneIdx}`}
              className="absolute inset-0 z-20"
              initial={{ opacity: 0, scale: cam.scaleIn, rotate: cam.rotateIn, y: cam.yIn }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, scale: 1.06, rotate: 0.6, y: -8 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <SceneSVG
                scene={scene}
                phase={phase}
                isFinished={isFinished}
                scratchSeed={scratchSeed}
                morphingToNext={morphingToNext}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isFinished && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-white/10"
              animate={{ scale: [1, 1.18], opacity: [0.25, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-white/5"
              animate={{ scale: [1, 1.28], opacity: [0.12, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
          </>
        )}
      </div>
    </div>
  );
}