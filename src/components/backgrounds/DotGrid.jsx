import { useEffect, useRef } from 'react';

/**
 * Interactive Dot Grid Background
 * Based on reactbits.dev/backgrounds/dot-grid
 */
const DotGrid = ({
  dotSize = 2,
  gap = 30,
  baseColor = '#6366f1',
  activeColor = '#8b5cf6',
  proximity = 120,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dots = [];

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    // Initialize dots
    const initDots = () => {
      dots.length = 0;
      const cols = Math.ceil(canvas.width / gap);
      const rows = Math.ceil(canvas.height / gap);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * gap,
            y: j * gap,
            baseX: i * gap,
            baseY: j * gap,
            size: dotSize,
          });
        }
      }
      dotsRef.current = dots;
    };

    // Draw dots
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let size = dot.size;
        let color = baseColor;

        if (distance < proximity) {
          const ratio = 1 - distance / proximity;
          size = dot.size + ratio * 4;
          color = activeColor;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    // Handle mouse move
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // Initialize
    resize();
    draw();

    // Event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dotSize, gap, baseColor, activeColor, proximity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0, ...style }}
    />
  );
};

export default DotGrid;
