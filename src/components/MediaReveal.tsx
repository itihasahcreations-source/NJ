import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MediaRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const MediaReveal: React.FC<MediaRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1.2,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: '30px 0px -30px 0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <motion.div
      ref={elementRef}
      initial={{ 
        opacity: 0, 
        scale: 0.97, 
        filter: 'blur(10px)' 
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.97,
        filter: isVisible ? 'blur(0px)' : 'blur(10px)'
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`will-change-transform will-change-[filter] ${className}`}
    >
      {children}
    </motion.div>
  );
};
