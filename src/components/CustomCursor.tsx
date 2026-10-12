import React, { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  theme?: 'dark' | 'white';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  const targetPos = useRef({ x: -300, y: -300 });
  const glowPos = useRef({ x: -300, y: -300 });
  const isMoving = useRef(false);
  const idleTimeout = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      isMoving.current = true;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = window.setTimeout(() => {
        isMoving.current = false;
      }, 150);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor]');
      setIsHovered(Boolean(interactive));
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const updateGlow = () => {
      const dx = targetPos.current.x - glowPos.current.x;
      const dy = targetPos.current.y - glowPos.current.y;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        glowPos.current.x += dx * 0.12;
        glowPos.current.y += dy * 0.12;

        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
        }
      }

      rafId.current = requestAnimationFrame(updateGlow);
    };

    rafId.current = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Interactive Cursor Spotlight Glow */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none z-[40] overflow-hidden select-none"
      >
        <div
          ref={glowRef}
          style={{
            willChange: 'transform',
            background: isWhite
              ? 'radial-gradient(circle, rgba(180, 140, 60, 0.12) 0%, rgba(200, 160, 80, 0.05) 35%, transparent 70%)'
              : 'radial-gradient(circle, rgba(223, 186, 115, 0.14) 0%, rgba(197, 160, 89, 0.08) 35%, transparent 70%)',
          }}
          className="absolute top-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none blur-[75px]"
        />
      </div>

      {/* Precision Diamond / Dot Custom Cursor Core */}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
        <div
          ref={dotRef}
          style={{
            willChange: 'transform',
            transition: 'width 0.18s ease, height 0.18s ease, background-color 0.18s ease, border-color 0.18s ease',
          }}
          className={`absolute top-0 left-0 rounded-full pointer-events-none flex items-center justify-center ${
            isWhite
              ? isHovered
                ? 'w-4 h-4 bg-black/20 border border-black/80 shadow-[0_0_12px_rgba(0,0,0,0.15)]'
                : 'w-2 h-2 bg-stone-900 border border-black shadow-[0_0_6px_rgba(0,0,0,0.25)]'
              : isHovered
                ? 'w-4 h-4 bg-white/20 border border-white/90 shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                : 'w-2 h-2 bg-white border border-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)]'
          }`}
        />
      </div>
    </>
  );
};

