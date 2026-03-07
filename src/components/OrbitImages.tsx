import React, { useMemo, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
  type MotionStyle,
} from "motion/react";
import "./OrbitImages.css";

type ShapeType =
  | "circle"
  | "ellipse"
  | "square"
  | "rectangle"
  | "triangle"
  | "star"
  | "heart"
  | "infinity"
  | "wave"
  | "custom";

type CSSVariables = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};

type OrbitItemProps = {
  item: React.ReactNode;
  index: number;
  totalItems: number;
  path: string;
  itemSize: number;
  rotation: number;
  progress: MotionValue<number>;
  fill: boolean;
};

type OrbitImagesProps = {
  images?: string[];
  items?: React.ReactNode[];
  altPrefix?: string;
  shape?: ShapeType;
  customPath?: string;
  baseWidth?: number;
  radiusX?: number;
  radiusY?: number;
  radius?: number;
  starPoints?: number;
  starInnerRatio?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: "normal" | "reverse";
  fill?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  easing?: "linear" | "easeIn" | "easeOut" | "easeInOut";
  paused?: boolean;
  centerContent?: React.ReactNode;
  responsive?: boolean;
  interactive?: boolean;
};

function generateEllipsePath(
  cx: number,
  cy: number,
  rx: number,
  ry: number
): string {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function generateCirclePath(cx: number, cy: number, r: number): string {
  return generateEllipsePath(cx, cy, r, r);
}

function generateSquarePath(cx: number, cy: number, size: number): string {
  const h = size / 2;
  return `M ${cx - h} ${cy - h} L ${cx + h} ${cy - h} L ${cx + h} ${cy + h} L ${cx - h} ${cy + h} Z`;
}

function generateRectanglePath(
  cx: number,
  cy: number,
  w: number,
  h: number
): string {
  const hw = w / 2;
  const hh = h / 2;
  return `M ${cx - hw} ${cy - hh} L ${cx + hw} ${cy - hh} L ${cx + hw} ${cy + hh} L ${cx - hw} ${cy + hh} Z`;
}

function generateTrianglePath(cx: number, cy: number, size: number): string {
  const triangleHeight = (size * Math.sqrt(3)) / 2;
  const halfSize = size / 2;

  return `M ${cx} ${cy - triangleHeight / 1.5}
          L ${cx + halfSize} ${cy + triangleHeight / 3}
          L ${cx - halfSize} ${cy + triangleHeight / 3}
          Z`;
}

function generateStarPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  points: number
): string {
  const step = Math.PI / points;
  let path = "";

  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }

  return `${path} Z`;
}

function generateHeartPath(cx: number, cy: number, size: number): string {
  const s = size / 30;
  return `M ${cx} ${cy + 12 * s}
          C ${cx - 20 * s} ${cy - 5 * s},
            ${cx - 12 * s} ${cy - 18 * s},
            ${cx} ${cy - 8 * s}
          C ${cx + 12 * s} ${cy - 18 * s},
            ${cx + 20 * s} ${cy - 5 * s},
            ${cx} ${cy + 12 * s}`;
}

function generateInfinityPath(
  cx: number,
  cy: number,
  w: number,
  h: number
): string {
  const hw = w / 2;
  const hh = h / 2;

  return `M ${cx} ${cy}
          C ${cx + hw * 0.5} ${cy - hh}, ${cx + hw} ${cy - hh}, ${cx + hw} ${cy}
          C ${cx + hw} ${cy + hh}, ${cx + hw * 0.5} ${cy + hh}, ${cx} ${cy}
          C ${cx - hw * 0.5} ${cy + hh}, ${cx - hw} ${cy + hh}, ${cx - hw} ${cy}
          C ${cx - hw} ${cy - hh}, ${cx - hw * 0.5} ${cy - hh}, ${cx} ${cy}`;
}

function generateWavePath(
  cx: number,
  cy: number,
  w: number,
  amplitude: number,
  waves: number
): string {
  const points: string[] = [];
  const segments = waves * 20;
  const halfWidth = w / 2;

  for (let i = 0; i <= segments; i++) {
    const x = cx - halfWidth + (w * i) / segments;
    const y =
      cy + Math.sin((i / segments) * waves * 2 * Math.PI) * amplitude;
    points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }

  for (let i = segments; i >= 0; i--) {
    const x = cx - halfWidth + (w * i) / segments;
    const y =
      cy - Math.sin((i / segments) * waves * 2 * Math.PI) * amplitude;
    points.push(`L ${x} ${y}`);
  }

  return `${points.join(" ")} Z`;
}

function OrbitItem({
  item,
  index,
  totalItems,
  path,
  itemSize,
  rotation,
  progress,
  fill,
}: OrbitItemProps) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;

  const offsetDistance = useTransform(progress, (value: number) => {
    const offset = (((value + itemOffset) % 100) + 100) % 100;
    return `${offset}%`;
  });

  const orbitItemVars: CSSVariables = {
    "--orbit-item-size": `${itemSize}px`,
    "--orbit-path": `path("${path}")`,
  };

  const orbitItemContentVars: CSSVariables = {
    "--orbit-item-rotation": `${-rotation}deg`,
  };

  const orbitItemStyle: MotionStyle = {
    ...orbitItemVars,
    offsetDistance,
  };

  return (
    <motion.div className="orbit-item" style={orbitItemStyle}>
      <div className="orbit-item-content" style={orbitItemContentVars}>
        {item}
      </div>
    </motion.div>
  );
}

export default function OrbitImages({
  images = [],
  items = [],
  altPrefix = "Orbiting image",
  shape = "ellipse",
  customPath,
  baseWidth = 1400,
  radiusX = 700,
  radiusY = 170,
  radius = 300,
  starPoints = 5,
  starInnerRatio = 0.5,
  rotation = -8,
  duration = 40,
  itemSize = 64,
  direction = "normal",
  fill = true,
  width = 100,
  height = 100,
  className = "",
  showPath = false,
  pathColor = "rgba(0,0,0,0.1)",
  pathWidth = 2,
  easing = "linear",
  paused = false,
  centerContent,
  responsive = false,
  interactive = false,
}: OrbitImagesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const path = useMemo(() => {
    switch (shape) {
      case "circle":
        return generateCirclePath(designCenterX, designCenterY, radius);

      case "ellipse":
        return generateEllipsePath(
          designCenterX,
          designCenterY,
          radiusX,
          radiusY
        );

      case "square":
        return generateSquarePath(designCenterX, designCenterY, radius * 2);

      case "rectangle":
        return generateRectanglePath(
          designCenterX,
          designCenterY,
          radiusX * 2,
          radiusY * 2
        );

      case "triangle":
        return generateTrianglePath(designCenterX, designCenterY, radius * 2);

      case "star":
        return generateStarPath(
          designCenterX,
          designCenterY,
          radius,
          radius * starInnerRatio,
          starPoints
        );

      case "heart":
        return generateHeartPath(designCenterX, designCenterY, radius * 2);

      case "infinity":
        return generateInfinityPath(
          designCenterX,
          designCenterY,
          radiusX * 2,
          radiusY * 2
        );

      case "wave":
        return generateWavePath(
          designCenterX,
          designCenterY,
          radiusX * 2,
          radiusY,
          3
        );

      case "custom":
        return customPath || generateCirclePath(designCenterX, designCenterY, radius);

      default:
        return generateEllipsePath(
          designCenterX,
          designCenterY,
          radiusX,
          radiusY
        );
    }
  }, [
    shape,
    customPath,
    designCenterX,
    designCenterY,
    radiusX,
    radiusY,
    radius,
    starPoints,
    starInnerRatio,
  ]);

  useEffect(() => {
    if (!responsive || !containerRef.current) return;

    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) return;

    const controls = animate(progress, direction === "reverse" ? -100 : 100, {
      duration,
      ease: easing,
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.stop();
  }, [progress, duration, easing, direction, paused]);

  const fallbackImageItems = images.map((src, index) => (
    <img
      key={`${src}-${index}`}
      src={src}
      alt={`${altPrefix} ${index + 1}`}
      draggable={false}
      className="orbit-image"
    />
  ));

  const renderItems = items.length > 0 ? items : fallbackImageItems;

  const containerVars: CSSVariables = {
    "--orbit-container-width":
      typeof width === "number" ? `${width}px` : width,
    "--orbit-container-height":
      typeof height === "number" ? `${height}px` : height,
    "--orbit-base-width": `${baseWidth}px`,
    "--orbit-scale": scale,
    "--orbit-rotation": `${rotation}deg`,
    "--orbit-path-color": pathColor,
    "--orbit-path-width": `${pathWidth / Math.max(scale, 0.0001)}px`,
  };

  const ariaProps = interactive ? {} : { "aria-hidden": "true" as const };

  return (
    <div
      ref={containerRef}
      className={`orbit-container ${
        responsive ? "orbit-container--responsive" : ""
      } ${className}`}
      style={containerVars}
      {...ariaProps}
    >
      <div
        className={`orbit-scaling-container ${
          responsive ? "orbit-scaling-container--responsive" : ""
        }`}
      >
        <div className="orbit-rotation-wrapper">
          {showPath && (
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${baseWidth} ${baseWidth}`}
              className="orbit-path-svg"
              aria-hidden="true"
            >
              <path
                d={path}
                fill="none"
                stroke="var(--orbit-path-color)"
                strokeWidth="var(--orbit-path-width)"
              />
            </svg>
          )}

          {renderItems.map((item, index) => (
            <OrbitItem
              key={index}
              item={item}
              index={index}
              totalItems={renderItems.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
            />
          ))}
        </div>
      </div>

      {centerContent ? (
        <div className="orbit-center-content">{centerContent}</div>
      ) : null}
    </div>
  );
}