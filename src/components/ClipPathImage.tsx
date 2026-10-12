import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ClipPathImageProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  delay?: number;
  staggerIndex?: number;
}

export const ClipPathImage: React.FC<ClipPathImageProps> = ({
  src,
  alt,
  className = '',
  aspect = 'aspect-[16/10]',
  delay = 0,
  staggerIndex = 0
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  // Editorial staggered timing: deliberate, weighted, unhurried
  const totalDelay = delay + staggerIndex * 0.14;

  return (
    <div className={`relative overflow-hidden w-full ${aspect} bg-[#08080a] select-none border-none group`}>
      
      {/* 1. Subtle Floating Lens Bokeh Orbs in Background (Heightens 3D Feeling) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-1000">
        <motion.div
          animate={{
            x: [0, 15, -10, 0],
            y: [0, -12, 8, 0],
            scale: [1, 1.15, 0.95, 1],
            opacity: [0.3, 0.6, 0.4, 0.3]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-br from-amber-400/25 via-red-900/20 to-transparent blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 12, 0],
            y: [0, 15, -10, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.2, 0.5, 0.3, 0.2]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-gradient-to-tr from-rose-900/30 via-amber-200/15 to-transparent blur-3xl"
        />
      </div>

      {/* 2. Main Editorial Clip-Path Shutter Reveal with Haute-Couture Easing */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: 1.4,
          delay: totalDelay,
          ease: [0.77, 0, 0.175, 1] // Haute-couture quintic curve
        }}
        className="w-full h-full relative"
      >
        {/* Shimmer skeleton while loading */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-stone-900/60 animate-pulse" />
        )}

        {/* 3. True Depth-of-Field (Bokeh) Focus Pull & Counter-Motion Deceleration */}
        <motion.img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          decoding="async"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          data-motion-blur="true"
          initial={{
            scale: 1.18,
            y: '5%',
            opacity: 0.8
          }}
          whileInView={{
            scale: 1,
            y: '0%',
            opacity: 1
          }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 1.4,
            delay: totalDelay,
            ease: [0.22, 1, 0.36, 1] // Cinematic lens focus pull deceleration
          }}
          style={{
            filter: 'blur(var(--scroll-blur, 0px)) contrast(1.15) brightness(0.88)',
            willChange: 'filter, transform',
          }}
          className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />

        {/* 4. Film Contrast Dissipation Scrim */}
        <motion.div
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: totalDelay + 0.15,
            ease: 'easeOut'
          }}
          className="absolute inset-0 bg-stone-950 pointer-events-none"
        />
      </motion.div>
    </div>
  );
};
