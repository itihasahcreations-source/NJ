import React, { useState } from 'react';
import { Magnetic } from './Magnetic';

export type PageRoute = 'dance-fitness' | 'wedding-fiestas' | 'portfolio';

interface HeaderProps {
  theme?: 'dark' | 'white';
  activePage: PageRoute;
  onSelectPage: (page: PageRoute) => void;
  onOpenInquiry?: (topic?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme = 'dark',
  activePage,
  onSelectPage,
}) => {
  const isWhite = theme === 'white';
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // All 3 Menu Options with both compact code (DF / WF / P) and full names
  const marqueeItems = [
    { id: 'dance-fitness' as PageRoute, short: 'DF', label: 'DANCE & FITNESS' },
    { id: 'wedding-fiestas' as PageRoute, short: 'WF', label: 'WEDDING FIESTAS' },
    { id: 'portfolio' as PageRoute, short: 'P', label: 'PORTFOLIO' },
    { id: 'dance-fitness' as PageRoute, short: 'DF', label: 'DANCE & FITNESS' },
    { id: 'wedding-fiestas' as PageRoute, short: 'WF', label: 'WEDDING FIESTAS' },
    { id: 'portfolio' as PageRoute, short: 'P', label: 'PORTFOLIO' },
    { id: 'dance-fitness' as PageRoute, short: 'DF', label: 'DANCE & FITNESS' },
    { id: 'wedding-fiestas' as PageRoute, short: 'WF', label: 'WEDDING FIESTAS' },
    { id: 'portfolio' as PageRoute, short: 'P', label: 'PORTFOLIO' },
    { id: 'dance-fitness' as PageRoute, short: 'DF', label: 'DANCE & FITNESS' },
    { id: 'wedding-fiestas' as PageRoute, short: 'WF', label: 'WEDDING FIESTAS' },
    { id: 'portfolio' as PageRoute, short: 'P', label: 'PORTFOLIO' },
  ];

  const handleSelect = (pageId: PageRoute) => {
    onSelectPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2.5 sm:py-3.5 pointer-events-none border-none transition-all duration-300">
      <div className="max-w-[1720px] mx-auto px-4 flex items-center justify-center relative">
          
        {/* ============================================================== */}
        {/* ULTRA-SLEEK AESTHETIC TRANSPARENT FLOATING PILL                 */}
        {/* Stable sizing, zero glitch, razor-sharp edges without white halo */}
        {/* ============================================================== */}
        <div className="pointer-events-auto z-30 flex items-center justify-center">
          <Magnetic strength={0.12}>
            <div 
              className={`relative overflow-hidden rounded-full px-3 sm:px-4 h-7 sm:h-8 w-52 sm:w-64 md:w-72 flex items-center transition-all duration-300 ease-out cursor-pointer backdrop-blur-xl ${
                isWhite
                  ? 'bg-black/90 hover:bg-black border border-black/15 shadow-[0_6px_24px_rgba(0,0,0,0.22)]'
                  : 'bg-black/80 hover:bg-black/90 border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.55)]'
              }`}
            >
              
              {/* Subtle edge fades for seamless blending - Pure dark gradient on both themes */}
              <div className="absolute left-0 top-0 bottom-0 w-3.5 z-20 pointer-events-none bg-gradient-to-r from-black/90 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-3.5 z-20 pointer-events-none bg-gradient-to-l from-black/90 to-transparent" />

              {/* Automatic marquee track with smooth hover pause */}
              <div className="flex items-center gap-3 sm:gap-4 animate-marquee w-max hover:[animation-play-state:paused] whitespace-nowrap">
                {marqueeItems.map((item, idx) => {
                  const isActive = activePage === item.id;
                  const isItemHovered = hoveredIdx === idx;

                  return (
                    <button
                      key={`menu-${item.id}-${idx}`}
                      onClick={() => handleSelect(item.id)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`flex items-center gap-1 font-['Montserrat',_sans-serif] uppercase text-[8.5px] sm:text-[9.5px] tracking-[0.22em] transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? 'text-white font-bold'
                          : 'text-stone-300 hover:text-white font-medium'
                      }`}
                    >
                      {isActive && (
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 mr-0.5 bg-white ${
                          isWhite ? 'shadow-sm' : 'shadow-[0_0_8px_rgba(255,255,255,0.85)]'
                        }`} />
                      )}
                      <span className="inline-block transition-all duration-200">
                        {isItemHovered ? item.label : item.short}
                      </span>
                      <span className="text-[6.5px] ml-1 text-white/30">·</span>
                    </button>
                  );
                })}
              </div>

            </div>
          </Magnetic>
        </div>

      </div>
    </header>
  );
};

