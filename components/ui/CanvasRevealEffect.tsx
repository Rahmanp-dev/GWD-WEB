import React, { useRef, useEffect } from "react";

interface CanvasRevealEffectProps {
  animationSpeed?: number;
  containerClassName?: string;
  colors?: [number, number, number][];
  dotSize?: number;
  active?: boolean;
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  animationSpeed = 2,
  containerClassName = "",
  colors = [
    [236, 72, 153],
    [232, 121, 249],
  ],
  dotSize = 2,
  active = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dotsRef = useRef<any[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });

  // Helper to setup dots
  const setupDots = (width: number, height: number) => {
    const dots: { x: number; y: number; r: number; color: string }[] = [];
    const dotCount = Math.floor((width * height) / 3000); // Fewer dots for perf
    for (let i = 0; i < dotCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = dotSize + Math.random() * dotSize;
      const colorIdx = Math.floor(Math.random() * colors.length);
      const color = `rgb(${colors[colorIdx].join(",")})`;
      dots.push({ x, y, r, color });
    }
    dotsRef.current = dots;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    sizeRef.current = { width, height };
    setupDots(width, height);
    let t = 0;
    let running = true;

    function animate() {
      if (!ctx || !active) return;
      ctx.clearRect(0, 0, width, height);
      t += animationSpeed * 0.008;
      dotsRef.current.forEach((dot, i) => {
        if (!ctx) return;
        const offset = Math.sin(t + i) * 8;
        ctx.beginPath();
        ctx.arc(dot.x + offset, dot.y + offset, dot.r, 0, 2 * Math.PI);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = 0.10 + 0.08 * Math.sin(t + i); // Lower alpha for perf
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (running && active) animationRef.current = requestAnimationFrame(animate);
    }
    if (active) animate();
    return () => {
      running = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line
  }, [animationSpeed, colors, dotSize, active]);

  // Resize observer for canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleResize = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (width !== sizeRef.current.width || height !== sizeRef.current.height) {
        canvas.width = width;
        canvas.height = height;
        sizeRef.current = { width, height };
        setupDots(width, height);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [colors, dotSize]);

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none ${containerClassName}`} style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}; 