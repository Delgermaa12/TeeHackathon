import React, { useEffect, useRef } from "react";

interface GalaxyProps {
  starSpeed?: number;
  density?: number;
  speed?: number;
  glowIntensity?: number;
  twinkleIntensity?: number;
  colors?: string[];
}

const Galaxy: React.FC<GalaxyProps> = ({
  starSpeed = 0.08,
  density = 0.12,
  speed = 0.22,
  glowIntensity = 0.2,
  twinkleIntensity = 0.08,
  colors = ["#DB4437", "#4285F4", "#0F9D58", "#F4B400", "#D4AF37"],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleDir: number;
    }> = [];

    const starCount = Math.floor((width * height) / 1800 * density);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * starSpeed * speed,
        speedY: (Math.random() - 0.5) * starSpeed * speed,
        opacity: Math.random() * 0.45 + 0.25,
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        twinkleDir: 1,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed * star.twinkleDir * twinkleIntensity;

        if (star.opacity > 0.75 || star.opacity < 0.2) {
          star.twinkleDir *= -1;
        }

        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;
        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = star.color;
        ctx.shadowBlur = 10 * glowIntensity;
        ctx.shadowColor = star.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.globalAlpha = star.opacity * 0.08;
        ctx.fillStyle = star.color;
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starSpeed, density, speed, glowIntensity, twinkleIntensity, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default Galaxy;