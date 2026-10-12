import React from 'react';
import { motion } from 'framer-motion';

interface EditorialBlurTitleProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  theme: 'dark' | 'white';
  align?: 'left' | 'center' | 'right';
  signatureLogo?: boolean;
  logoPosition?: 'overlap-title' | 'corner' | 'above' | 'watermark';
  logoScale?: number;
  className?: string;
}

export const EditorialBlurTitle: React.FC<EditorialBlurTitleProps> = ({
  kicker,
  title,
  subtitle,
  theme,
  align = 'left',
  signatureLogo = false,
  logoPosition = 'overlap-title',
  className = ''
}) => {
  const isWhite = theme === 'white';
  const logoSrc = isWhite ? '/logo-light.png' : '/logo-dark.png';

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }[align];

  return (
    <div className={`relative flex flex-col ${alignClasses} ${className} select-none`}>
      {/* Kicker */}
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`font-mono text-[10px] sm:text-[11px] tracking-[0.32em] uppercase mb-2 ${
            isWhite ? 'text-amber-900 font-semibold' : 'text-amber-300 font-semibold'
          }`}
        >
          {kicker}
        </motion.div>
      )}

      {/* Main Title */}
      <div className="relative inline-block">
        {signatureLogo && logoPosition === 'overlap-title' && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            whileInView={{ opacity: 0.9, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute -top-6 sm:-top-10 -right-6 sm:-right-12 md:-right-16 pointer-events-none z-10 ${
              align === 'center' ? 'left-1/2 -translate-x-1/2 -top-10 sm:-top-14' : ''
            }`}
          >
            <img
              src={logoSrc}
              alt=""
              className={`h-14 sm:h-20 md:h-24 w-auto object-contain select-none filter ${
                isWhite
                  ? 'drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]'
                  : 'drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]'
              }`}
            />
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-[0.94] relative z-0 ${
            isWhite ? 'text-stone-950' : 'text-white'
          }`}
        >
          {title}
        </motion.h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-3 text-sm sm:text-base md:text-lg font-editorial font-light italic max-w-2xl ${
            isWhite ? 'text-stone-600' : 'text-stone-400'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
