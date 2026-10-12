import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Play, ArrowUpRight } from 'lucide-react';

interface TomDaleSurgeSectionProps {
  theme: 'dark' | 'white';
  onOpenInquiry: (topic?: string) => void;
  onPlayVideo?: (title: string, url: string) => void;
}

export const TomDaleSurgeSection: React.FC<TomDaleSurgeSectionProps> = ({
  theme,
  onOpenInquiry,
  onPlayVideo
}) => {
  const isWhite = theme === 'white';
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const inscapeParallax = useTransform(scrollYProgress, [0, 1], [-30, 25]);
  const stageParallax = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const surgeParallax = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section 
      ref={sectionRef}
      id="surge" 
      className={`relative py-20 sm:py-28 md:py-36 select-none overflow-hidden transition-colors duration-700 ${
        isWhite ? 'bg-[#f4f4f0] text-black' : 'bg-[#050505] text-white'
      }`}
    >
      {/* ============================================================== */}
      {/* 1. GIANT BACKGROUND KINETIC TYPOGRAPHY: INSCAPE                 */}
      {/* Positioned with proper vertical space so it never collides     */}
      {/* ============================================================== */}
      <motion.div 
        style={{ y: inscapeParallax }}
        className="w-full overflow-hidden pointer-events-none select-none text-center pb-4 sm:pb-6"
      >
        <h2 className="text-[14vw] sm:text-[15vw] font-black uppercase tracking-tight text-[#facc15] leading-none opacity-90">
          INSCAPE
        </h2>
        <div className="w-full h-1 bg-[#facc15] max-w-[88vw] mx-auto opacity-70 -mt-2 sm:-mt-4" />
      </motion.div>

      {/* ============================================================== */}
      {/* 2. DYNAMIC AERIAL SUSPENSION DANCER & PRESS REVIEWS (IMAGE 3)   */}
      {/* ============================================================== */}
      <motion.div 
        style={{ y: stageParallax }}
        className="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-14"
      >
        
        {/* Main Stage Frame with Merged Foreground Dancer */}
        <div 
          className="relative w-full aspect-[16/11] sm:aspect-[16/9] max-h-[760px] mx-auto overflow-hidden shadow-2xl group cursor-pointer bg-stone-950"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onPlayVideo?.('SURGE REPERTOIRE', 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0')}
        >
          {/* Athletic Contemporary Flying Dancer Image */}
          <img
            src="/src/assets/images/tomdale_surge_dancer_1790851820126.jpg"
            alt="Dancer in dynamic flight inspired by Tom Dale Surge"
            referrerPolicy="no-referrer"
            data-motion-blur="true"
            style={{
              filter: 'blur(var(--scroll-blur, 0px)) contrast(1.22) brightness(0.86)',
              willChange: 'filter, transform',
            }}
            className="w-full h-full object-cover object-center group-hover:scale-105 group-hover:brightness-[0.98] transition-transform duration-1000 ease-out"
          />

          {/* Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40 pointer-events-none" />

          {/* ============================================================ */}
          {/* EXACT SCREENSHOT 48 / 53 PRESS QUOTE OVERLAY                 */}
          {/* “Genre busting....ingenious” ★★★★★ THE ARTS DESK            */}
          {/* ============================================================ */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 sm:p-8 pointer-events-none z-20 space-y-4">
            
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-2 sm:space-y-4 max-w-4xl"
            >
              <h3 className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic font-light tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
                “Genre busting....ingenious”
              </h3>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-white drop-shadow-md">
                <div className="flex items-center gap-1 text-[#facc15]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-6 sm:h-6 fill-current" />
                  ))}
                </div>
                <span className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-wider text-white ml-1">
                  THE ARTS DESK
                </span>
              </div>

              <p className="text-[10px] sm:text-xs font-mono text-stone-300 uppercase tracking-[0.22em] max-w-md mx-auto hidden sm:block">
                HYDERABAD SANCTUARY REPERTOIRE · CONTEMPORARY INDIAN CHOREOGRAPHY
              </p>
            </motion.div>

            {/* Play Button Affordance */}
            <div className="pt-2 sm:pt-4 pointer-events-auto">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayVideo?.('SURGE REPERTOIRE', 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0');
                }}
                className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-[#facc15] text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                aria-label="Play showreel"
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
              </button>
            </div>

          </div>

          {/* ============================================================ */}
          {/* GIANT LOWER KINETIC TYPOGRAPHY: SURGE (Screenshot 48 / 53)   */}
          {/* ============================================================ */}
          <motion.div 
            style={{ y: surgeParallax }}
            className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden pointer-events-none text-center"
          >
            <h2 className="text-[13vw] sm:text-[14vw] font-black uppercase tracking-tight text-[#facc15] leading-none opacity-95">
              SURGE
            </h2>
            <div className="w-full h-1 bg-[#facc15] max-w-[88vw] mx-auto -mt-1 sm:-mt-2" />
          </motion.div>

        </div>

        {/* Secondary Review Bar Below Stage (Clean, Fully Responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12 text-center md:text-left border-t border-current/15 mt-6 sm:mt-8">
          <div className="space-y-1.5">
            <div className="text-xs font-mono text-[#facc15] tracking-[0.25em] uppercase font-bold">
              ★★★★★ BRIDES TODAY
            </div>
            <p className="text-xs sm:text-sm font-serif italic text-stone-300">
              “Directing scale, theatrical drama, and royal heritage into unforgettable living architecture.”
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-mono text-[#facc15] tracking-[0.25em] uppercase font-bold">
              ★★★★★ THE HINDU PERFORMING ARTS
            </div>
            <p className="text-xs sm:text-sm font-serif italic text-stone-300">
              “Nicy Joseph commands the space with biomechanical discipline and raw emotion.”
            </p>
          </div>

          <div className="space-y-3 flex flex-col items-center md:items-start justify-center">
            <button
              onClick={() => onOpenInquiry('Repertoire Performance Commission')}
              className="px-7 sm:px-8 py-3.5 bg-[#facc15] text-black text-xs font-mono font-black uppercase tracking-widest hover:bg-yellow-400 transition-colors flex items-center gap-2 cursor-pointer shadow-lg w-full sm:w-auto justify-center"
            >
              <span>COMMISSION THIS REPERTOIRE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </motion.div>
    </section>
  );
};
