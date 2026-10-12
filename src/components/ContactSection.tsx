import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { ArrowDiagonal } from './ArrowIcon';
import { FadeInUp } from './EditorialReveal';
import { Magnetic } from './Magnetic';

interface ContactSectionProps {
  theme?: 'dark' | 'white';
  initialInquiryTopic?: string;
  onOpenInquiry?: (topic?: string) => void;
  onToggleTheme?: () => void;
  menuVariant?: 'DF' | 'WF' | 'P';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  theme = 'dark',
  initialInquiryTopic,
  onOpenInquiry,
  onToggleTheme,
  menuVariant = 'DF',
}) => {
  const isWhite = theme === 'white';
  const logoSrc = isWhite ? '/logo-light.png' : '/logo-dark.png';

  // Aesthetic color palettes
  const palettes = [
    { 
      name: 'Imperial Gold', 
      primary: isWhite ? 'from-amber-300/30 to-yellow-200/20' : 'from-amber-600/25 to-yellow-600/10', 
      secondary: isWhite ? 'from-stone-200/40 to-amber-100/30' : 'from-stone-900/30 to-amber-950/20' 
    },
    { 
      name: 'Royal Velvet', 
      primary: isWhite ? 'from-rose-200/30 to-purple-100/25' : 'from-rose-900/20 to-purple-950/15', 
      secondary: isWhite ? 'from-stone-200/40 to-amber-100/30' : 'from-stone-900/30 to-amber-950/20' 
    },
    { 
      name: 'Emerald Sanctuary', 
      primary: isWhite ? 'from-emerald-200/30 to-teal-100/20' : 'from-emerald-900/20 to-teal-950/15', 
      secondary: isWhite ? 'from-stone-200/40 to-stone-100/30' : 'from-stone-900/30 to-stone-950/20' 
    },
    { 
      name: 'Nocturne Noir', 
      primary: isWhite ? 'from-stone-200/35 to-stone-100/25' : 'from-stone-800/20 to-stone-950/30', 
      secondary: isWhite ? 'from-amber-100/20 to-transparent' : 'from-amber-950/15 to-transparent' 
    },
  ];

  const [activePaletteIndex] = useState(0);
  const currentPalette = palettes[activePaletteIndex];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="contact" 
      className="py-16 sm:py-24 select-none relative overflow-hidden flex flex-col justify-between bg-transparent"
    >
      {/* Warm Ambient Atmospheric Aura Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePaletteIndex}-${theme}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className={`absolute top-1/4 left-1/4 w-[70vw] h-[60vw] max-w-[850px] max-h-[750px] rounded-full bg-gradient-to-br ${currentPalette.primary} blur-[160px]`} />
            <div className={`absolute bottom-10 right-1/4 w-[75vw] h-[65vw] max-w-[900px] max-h-[800px] rounded-full bg-gradient-to-tl ${currentPalette.secondary} blur-[170px]`} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-[1540px] w-full mx-auto px-6 sm:px-12 md:px-20 lg:px-28 space-y-8 sm:space-y-10">
        
        {/* Interactive Top Action Buttons: Both COMMISSION & STUDIO PASS with High Contrast */}
        <FadeInUp delay={0.05} yOffset={20}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            
            {/* 1. COMMISSION Action Button */}
            <Magnetic strength={0.35}>
              <button
                onClick={() => onOpenInquiry?.('Directorial Commissions & Screen Choreo')}
                className={`group flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 transition-all duration-300 cursor-pointer text-xs sm:text-[13px] font-wide font-bold tracking-[0.24em] uppercase border-none ${
                  isWhite
                    ? 'bg-black text-white hover:bg-stone-800 shadow-[0_15px_45px_rgba(0,0,0,0.12)]'
                    : 'bg-white text-black hover:bg-[#faeed7] shadow-[0_15px_45px_rgba(0,0,0,0.9)]'
                }`}
              >
                <span>COMMISSION</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </button>
            </Magnetic>

            {/* 2. STUDIO PASS Action Button (Equally Visible, High-Contrast Luxury Button) */}
            <Magnetic strength={0.35}>
              <button
                onClick={() => onOpenInquiry?.('Studio Pass & Class Admissions')}
                className={`group flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 transition-all duration-300 cursor-pointer text-xs sm:text-[13px] font-wide font-bold tracking-[0.24em] uppercase ${
                  isWhite
                    ? 'bg-black/[0.06] text-black hover:bg-black hover:text-white border border-black/20 shadow-[0_15px_45px_rgba(0,0,0,0.06)]'
                    : 'bg-white/[0.14] text-white hover:bg-white hover:text-black border border-white/30 shadow-[0_15px_45px_rgba(0,0,0,0.8)]'
                }`}
              >
                <span>STUDIO PASS</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </button>
            </Magnetic>

          </div>
        </FadeInUp>

        {/* Monumental Centered Logo With Luminous Aura */}
        <FadeInUp delay={0.15} yOffset={20}>
          <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-5 sm:space-y-6 pt-1 sm:pt-2">
            
            {/* Luminous Ambient Glow Layer (Only in Dark Theme, no boundary light in Light Theme) */}
            {!isWhite && (
              <div 
                aria-hidden="true" 
                className="absolute w-[500px] sm:w-[750px] h-[160px] sm:h-[220px] rounded-full blur-[110px] pointer-events-none -z-10 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-600/20" 
              />
            )}

            {/* Monumental Logo */}
            <img
              src={logoSrc}
              alt="Nicy Joseph Dance & Fitness"
              className={`h-32 sm:h-48 md:h-60 lg:h-72 w-auto max-w-[94vw] object-contain mx-auto select-none hover:scale-[1.01] transition-all duration-500 ${
                isWhite 
                  ? 'filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.12)]' 
                  : 'filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]'
              }`}
            />

            {/* Social & Light Circles:
                - DF: Instagram, WhatsApp, YouTube, Light circle (4)
                - WF: Instagram, WhatsApp, Light circle (3)
                - P:  Instagram, WhatsApp, Light circle (3)
            */}
            <div className="pt-2 flex items-center justify-center gap-4 sm:gap-5">
              
              {/* 1. Instagram (All menus) */}
              <Magnetic strength={0.35}>
                <a
                  href="https://www.instagram.com/nicyjosephdanceandfitness/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram Profile"
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md group border select-none ${
                    isWhite
                      ? 'bg-white/80 hover:bg-white text-stone-700 hover:text-black border-stone-300/80 hover:border-stone-400 shadow-[0_2px_10px_rgba(0,0,0,0.06)] active:scale-95'
                      : 'bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border-white/15 hover:border-white/30 shadow-[0_2px_10px_rgba(0,0,0,0.5)] active:scale-95'
                  }`}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.9" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </Magnetic>

              {/* 2. WhatsApp (All menus) */}
              <Magnetic strength={0.35}>
                <a
                  href="https://wa.me/919849000000"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp Direct"
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md group border select-none ${
                    isWhite
                      ? 'bg-white/80 hover:bg-white text-[#128C7E] border-stone-300/80 hover:border-emerald-500/40 shadow-[0_2px_10px_rgba(0,0,0,0.06)] active:scale-95'
                      : 'bg-white/5 hover:bg-white/10 text-[#25D366] border-white/15 hover:border-emerald-500/40 shadow-[0_2px_10px_rgba(0,0,0,0.5)] active:scale-95'
                  }`}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" 
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </Magnetic>

              {/* 3. YouTube (ONLY for DF: Dance & Fitness) */}
              {menuVariant === 'DF' && (
                <Magnetic strength={0.35}>
                  <a
                    href="https://www.youtube.com/@nicyjosephdanceandfitness"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube Channel"
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md group border select-none ${
                      isWhite
                        ? 'bg-white/80 hover:bg-white text-stone-700 hover:text-black border-stone-300/80 hover:border-stone-400 shadow-[0_2px_10px_rgba(0,0,0,0.06)] active:scale-95'
                        : 'bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border-white/15 hover:border-white/30 shadow-[0_2px_10px_rgba(0,0,0,0.5)] active:scale-95'
                    }`}
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.9" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                    </svg>
                  </a>
                </Magnetic>
              )}

              {/* 4. Light/Dark Theme Toggle: Glowing White in Dark Theme, Solid Black in Light Theme. Simple Circle, No Bulb (Hidden Feature) */}
              <Magnetic strength={0.35}>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  aria-label="Toggle Theme"
                  title={isWhite ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md group select-none active:scale-95 ${
                    isWhite
                      ? 'bg-black hover:bg-stone-900 text-white border border-black shadow-[0_3px_12px_rgba(0,0,0,0.22)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                      : 'bg-white/15 hover:bg-white/25 text-white border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_22px_rgba(255,255,255,0.65)]'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-transform duration-300 group-hover:scale-110 ${
                      isWhite
                        ? 'border-white bg-white shadow-sm'
                        : 'border-white/90 bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.85)]'
                    }`}
                  />
                </button>
              </Magnetic>

            </div>

          </div>
        </FadeInUp>

      </div>

      {/* Extreme Bottom Bar: Copyright & TOP Anchor (Clean Minimal Typography) */}
      <div className={`relative z-10 w-full max-w-[1680px] mx-auto px-6 sm:px-12 md:px-16 pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-widest transition-colors duration-300 ${
        isWhite ? 'text-stone-600' : 'text-stone-400'
      }`}>
        
        {/* Left: Brand Monogram / Location */}
        <div className={`text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold ${
          isWhite ? 'text-stone-700' : 'text-stone-400'
        }`}>
          HYDERABAD · GLOBAL PRODUCTIONS
        </div>

        {/* Center: Copyright */}
        <div className={`text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-center font-bold ${
          isWhite ? 'text-stone-500' : 'text-stone-500'
        }`}>
          COPYRIGHT © {new Date().getFullYear()} NICY JOSEPH - ALL RIGHTS RESERVED.
        </div>

        {/* Right: Clean Text TOP Anchor with arrow */}
        <button
          onClick={scrollToTop}
          className={`group flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.25em] transition-colors cursor-pointer ${
            isWhite ? 'text-stone-700 hover:text-black' : 'text-stone-400 hover:text-white'
          }`}
        >
          <span>TOP</span>
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
        </button>

      </div>
    </section>
  );
};
