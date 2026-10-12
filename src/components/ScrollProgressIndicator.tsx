import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressIndicatorProps {
  theme?: 'dark' | 'white';
}

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none select-none">
      <div className="w-full h-[2px] bg-white/10">
        <motion.div
          style={{ scaleX }}
          className="h-full origin-left gradient-chromatic shadow-[0_0_10px_rgba(244,63,94,0.7)]"
        />
      </div>
    </div>
  );
};
