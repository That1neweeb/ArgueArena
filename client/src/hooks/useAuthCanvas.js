import { useEffect, useRef } from 'react';

export default function useAuthCanvas(color = '0,240,255') {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const fontSize = 13;
    const chars = 'ARGUEARENA01アイウエオ⚔DEBATE01XPRANK⚡//{}';
    let cols, drops;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols  = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(1);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.fillStyle = 'rgba(4,4,14,0.055)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const isCyan = i % 3 !== 0;
        ctx.fillStyle = isCyan
          ? `rgba(${color},${Math.random() * 0.11 + 0.03})`
          : `rgba(255,0,170,${Math.random() * 0.07 + 0.02})`;
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [color]);

  return canvasRef;
}
