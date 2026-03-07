import React, { useEffect, useRef, useMemo } from 'react';

interface GalaxyProps {
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  speed?: number;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  transparent?: boolean;
  colors?: string[];
}

const Galaxy: React.FC<GalaxyProps> = ({
  starSpeed = 0.2,
  density = 0.2,
  hueShift = 70,
  speed = 0.5,
  glowIntensity = 0.1,
  saturation = 0,
  mouseRepulsion = false,
  repulsionStrength = 2,
  twinkleIntensity = 0.1,
  rotationSpeed = 0,
  transparent = false,
  colors = ['#DB4437', '#4285F4', '#0F9D58', '#F4B400', '#D4AF37']
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars: any[] = [];
    const starCount = Math.floor((width * height) / 1000 * density);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * starSpeed * speed,
        speedY: (Math.random() - 0.5) * starSpeed * speed,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinkleDir: 1
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    if (mouseRepulsion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const draw = () => {
      if (!transparent) {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      stars.forEach(star => {
        // Twinkle
        star.opacity += star.twinkleSpeed * star.twinkleDir * twinkleIntensity;
        if (star.opacity > 1 || star.opacity < 0.2) {
          star.twinkleDir *= -1;
        }

        // Movement
        star.x += star.speedX;
        star.y += star.speedY;

        // Mouse Repulsion
        if (mouseRepulsion) {
          const dx = star.x - mouseRef.current.x;
          const dy = star.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const angle = Math.atan2(dy, dx);
            const force = (150 - dist) / 150 * repulsionStrength;
            star.x += Math.cos(angle) * force;
            star.y += Math.sin(angle) * force;
          }
        }

        // Wrap around
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        
        if (glowIntensity > 0) {
          ctx.shadowBlur = 10 * glowIntensity;
          ctx.shadowColor = star.color;
        }

        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      // Rotation effect if rotationSpeed > 0
      if (rotationSpeed > 0) {
        // Implementation of rotation if needed
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starSpeed, density, speed, glowIntensity, mouseRepulsion, repulsionStrength, twinkleIntensity, rotationSpeed, transparent, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: saturation === 0 ? 'grayscale(0)' : `saturate(${saturation}) hue-rotate(${hueShift}deg)` }}
    />
  );
};

export default Galaxy;
