import { useState, useEffect, useRef } from 'react';

interface ScrollVelocityOptions {
  sensitivity?: number;
  decay?: number;
}

/**
 * Lightweight, 60fps compositor scroll velocity hook.
 * Zero CSS variable injection on documentElement to avoid frame drops.
 */
export function useScrollVelocityBlur(options: ScrollVelocityOptions = {}) {
  const { sensitivity = 1.0, decay = 0.9 } = options;

  const [isScrollingFast, setIsScrollingFast] = useState<boolean>(false);
  const [velocity, setVelocity] = useState<number>(0);

  const lastScrollYRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const currentVelocityRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    lastTimeRef.current = performance.now();

    const loop = () => {
      currentVelocityRef.current *= decay;

      if (currentVelocityRef.current < 0.05) {
        currentVelocityRef.current = 0;
        setVelocity(0);
        setIsScrollingFast(false);
        rafIdRef.current = null;
        return;
      }

      setVelocity(currentVelocityRef.current);
      setIsScrollingFast(currentVelocityRef.current > 1.8);
      rafIdRef.current = requestAnimationFrame(loop);
    };

    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTimeRef.current);
      const currentScrollY = window.scrollY;
      const dy = Math.abs(currentScrollY - lastScrollYRef.current);

      const v = (dy / dt) * sensitivity;
      currentVelocityRef.current = Math.max(currentVelocityRef.current * 0.5, v);

      lastScrollYRef.current = currentScrollY;
      lastTimeRef.current = now;

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [sensitivity, decay]);

  return {
    blur: 0, // Zero fake blur
    velocity,
    isScrollingFast,
  };
}
