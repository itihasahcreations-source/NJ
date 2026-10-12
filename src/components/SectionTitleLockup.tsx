import React from 'react';

interface SectionTitleLockupProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right' | 'mobile-center';
  className?: string;
  theme?: 'dark' | 'white';
  showLogo?: boolean;
  titleColor?: string;
  subtitleColor?: string;
  logoColor?: 'black' | 'white' | 'auto';
}

export const SectionTitleLockup: React.FC<SectionTitleLockupProps> = ({
  title,
  subtitle,
  align = 'left',
  className = '',
  theme = 'dark',
  showLogo = true,
  titleColor,
  subtitleColor,
  logoColor = 'auto',
}) => {
  const isWhite = theme === 'white';
  const alignClass = 
    align === 'center' ? 'items-center text-center mx-auto' :
    align === 'mobile-center' ? 'items-center text-center mx-auto sm:items-start sm:text-left sm:mx-0' :
    align === 'right' ? 'items-end text-right ml-auto' :
    'items-start text-left';

  const resolvedSubtitleColor = subtitleColor || (isWhite ? 'text-stone-600' : 'text-white/90');
  const resolvedTitleColor = titleColor || (
    isWhite 
      ? 'text-[#141312] drop-shadow-[0_2px_12px_rgba(0,0,0,0.08)]' 
      : 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]'
  );

  const getLogoFilter = () => {
    if (logoColor === 'black') {
      return 'brightness(0) saturate(100%) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.95))';
    }
    if (logoColor === 'white') {
      return 'brightness(0) invert(1) drop-shadow(0 1px 2px rgba(255, 255, 255, 0.95))';
    }
    return isWhite
      ? 'brightness(0) invert(1) drop-shadow(0 1px 2px rgba(255, 255, 255, 0.95))'
      : 'brightness(0) saturate(100%) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.95))';
  };

  return (
    <div className={`flex flex-col ${alignClass} select-none ${className}`}>
      {subtitle && (
        <span className={`font-['Bebas_Neue',_'Montserrat',_sans-serif] text-sm sm:text-base md:text-lg tracking-[0.22em] sm:tracking-[0.28em] uppercase font-bold scale-y-[1.15] mb-1 sm:mb-1.5 select-none inline-block origin-bottom transition-colors duration-300 ${resolvedSubtitleColor}`}>
          {subtitle}
        </span>
      )}

      {/* Relational Lockup: Pure Monolith Text with Laser-Cut Signature Logo Centered IN Text */}
      <div className="relative inline-flex items-center justify-center max-w-full">
        {/* Monolith title text - Crisp, brilliant typography with clean minimal shadow */}
        <h2 
          className={`font-['Bebas_Neue',_'Montserrat',_sans-serif] font-black uppercase tracking-[0.04em] sm:tracking-[0.06em] text-[clamp(44px,7.5vw,108px)] leading-[0.88] scale-y-[1.24] origin-center whitespace-nowrap transition-colors duration-300 ${resolvedTitleColor}`}
        >
          {title}
        </h2>

        {/* Laser Cutout Stencil Signature: Centered directly IN the text, background shows through in logo's shape (hidden if showLogo === false) */}
        {showLogo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <img
              src="/logo-light.png"
              alt="Nicy Joseph"
              className="w-[85%] max-w-[90%] h-auto max-h-[160%] object-contain select-none transition-all duration-300"
              style={{
                filter: getLogoFilter()
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
