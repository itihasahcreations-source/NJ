import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningLoaderProps {
  onComplete: () => void;
}

export const OpeningLoader: React.FC<OpeningLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ultra-smooth linear progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 450);
          }, 300);
          return 100;
        }
        // Swift, elegant, non-blocking progression
        const step = Math.floor(Math.random() * 9) + 7;
        return Math.min(prev + step, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[1000] bg-[#040406] flex items-center justify-center select-none overflow-hidden cursor-pointer"
          onClick={() => {
            // Immediate graceful dismiss on tap/click
            setProgress(100);
            setIsVisible(false);
            setTimeout(onComplete, 150);
          }}
        >
          {/* Subtle Warm Champagne Gold & Amber Ambient Halo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.85, opacity: 0.2 }}
              animate={{ 
                scale: [0.85, 1.25, 0.95],
                opacity: [0.2, 0.4, 0.25]
              }}
              transition={{ 
                duration: 2.8, 
                repeat: Infinity, 
                repeatType: 'reverse', 
                ease: 'easeInOut' 
              }}
              className="w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-gradient-to-tr from-amber-600/18 via-[#c5a059]/16 to-amber-900/10 rounded-full blur-[160px]"
            />
          </div>

          {/* Vignette border shading */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#040406]/40 to-[#040406] pointer-events-none" />

          {/* Center Monogram / Logo with Refined Specular Shimmer Sweep & Hairline Accent */}
          <div className="relative flex flex-col items-center justify-center px-6">
            
            <div className="relative overflow-hidden p-6 sm:p-10 flex items-center justify-center">
              <motion.img
                src="/logo-dark.png"
                alt="Nicy Joseph"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="h-28 sm:h-44 md:h-56 lg:h-64 w-auto max-w-[85vw] object-contain filter drop-shadow-[0_20px_60px_rgba(0,0,0,0.95)]"
              />

              {/* Gentle specular light reflection traversing across the mark */}
              <motion.div
                initial={{ x: '-130%' }}
                animate={{ x: '190%' }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: 'easeInOut',
                  repeatDelay: 0.4
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/18 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
              />
            </div>

            {/* Ultra-Delicate Hairline Gold Thread Progress Line (Zero extra text) */}
            <div className="w-36 sm:w-48 h-[1px] bg-white/10 relative overflow-hidden mt-1 sm:mt-2">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B87A18] via-[#dfba73] to-[#B87A18] shadow-[0_0_12px_rgba(223,186,115,0.7)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
