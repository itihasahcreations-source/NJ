import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Sparkles, Compass } from 'lucide-react';
import { FadeInUp } from './EditorialReveal';
import { ASSETS } from '../utils/imageAssets';

interface AboutParallaxProps {
  theme?: 'dark' | 'white';
  onOpenInquiry?: (topic?: string) => void;
  onPlayVideo?: (title: string, url: string) => void;
}

/**
 * Editorial Couture About Section
 * - Logo on the LEFT side with title like before
 * - Rich multi-image architectural collage with smooth parallax depth
 * - Evocative manifesto, biographical narrative, 3 directorial pillars
 * - Cursive gold signature and compact action button with guaranteed arrow
 */
export const AboutParallax: React.FC<AboutParallaxProps> = ({
  theme = 'dark',
  onOpenInquiry,
}) => {
  const isWhite = theme === 'white';
  const logoSrc = isWhite ? '/logo-light.png' : '/logo-dark.png';
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll tracking across the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = { damping: 28, stiffness: 100, mass: 0.5 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Subtle depth-based parallax layers
  const textY = useTransform(smoothProgress, [0.1, 0.85], [15, -15]);
  const primaryImageY = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const secondaryImageY = useTransform(smoothProgress, [0, 1], [30, -30]);
  const innerImageY = useTransform(smoothProgress, [0, 1], ['-6%', '6%']);

  // Tactile 3D Tilt following cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      id="about" 
      className={`relative min-h-screen w-full flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 select-none border-none transition-colors duration-700 overflow-hidden ${
        isWhite ? 'bg-[#faf9f6] text-black' : 'bg-[#060608] text-white'
      }`}
    >
      
      {/* Dynamic Warm Champagne Gold & Platinum Atmospheric Aura */}
      <div 
        aria-hidden="true" 
        className={`absolute top-1/3 right-1/4 -translate-y-1/2 w-[70vw] h-[60vw] max-w-[900px] max-h-[800px] rounded-full blur-[170px] pointer-events-none -z-10 ${
          isWhite ? 'bg-amber-600/10' : 'bg-gradient-to-l from-amber-600/15 via-[#c5a059]/10 to-transparent'
        }`} 
      />

      <div className="max-w-[1680px] w-full mx-auto space-y-12 sm:space-y-14">
        
        {/* Header: Logo on Left with Title as before */}
        <FadeInUp delay={0.05} yOffset={20}>
          <div className="flex items-center gap-4 sm:gap-6 pb-2">
            <img
              src={logoSrc}
              alt="Nicy Joseph"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain filter drop-shadow-lg select-none hover:scale-105 transition-transform shrink-0"
            />
            <div className="space-y-0.5">
              <span className={`block font-wide text-[9px] sm:text-[10px] tracking-[0.32em] uppercase ${
                isWhite ? 'text-amber-900 font-bold' : 'text-gradient-gold font-bold'
              }`}>
                PROLOGUE &amp; PHILOSOPHY
              </span>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight font-bold ${
                isWhite ? 'text-stone-900' : 'text-white'
              }`}>
                ABOUT NICY JOSEPH
              </h2>
            </div>
          </div>
        </FadeInUp>

        {/* 2-Column Editorial Grid: Rich Typography on Left, Multi-layered Framed Art on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ============================================================== */}
          {/* LEFT: Couture Editorial Narrative & Three Directorial Pillars */}
          {/* ============================================================== */}
          <motion.div 
            style={{ y: textY }}
            className="lg:col-span-7 space-y-8 pointer-events-auto"
          >
            {/* Monumental Editorial Headline */}
            <div className="space-y-4">
              <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-light leading-[1.18] tracking-tight ${
                isWhite ? 'text-stone-950' : 'text-[#f5f3ef]'
              }`}>
                <span>Movement is an </span>
                <span className={`italic font-editorial px-1 ${
                  isWhite ? 'text-[#8f6c31]' : 'text-gradient-gold font-normal'
                }`}>
                  architectural presence
                </span>
                <span> — commanding stage, screen, and spirit in an accelerated world.</span>
              </h3>
            </div>

            {/* In-Depth Biographical Manifesto */}
            <div className={`space-y-4 text-sm sm:text-base leading-relaxed font-sans ${
              isWhite ? 'text-stone-700' : 'text-stone-300'
            }`}>
              <p>
                Based in Hyderabad at her private sanctuary in Jubilee Hills, <strong className={isWhite ? 'text-black font-semibold' : 'text-white font-semibold'}>Nicy Joseph</strong> is an artistic director, movement architect, and choreographer whose work synthesizes classical Indian mudra kinetic syntax with European release contemporary technique and elite biomechanics.
              </p>
              <p>
                Recognized by <span className={`font-mono text-xs uppercase tracking-wider font-semibold ${isWhite ? 'text-amber-900' : 'text-[#e5d8c3]'}`}>Brides Today</span> among the premier wedding choreographers in India, she directs bespoke multi-day royal sangeet theatricals and imperial couple entrances beneath the historic chandeliers of <strong className={isWhite ? 'text-black' : 'text-white'}>Taj Falaknuma Palace</strong> and majestic Rajasthan heritage estates.
              </p>
              <p>
                As a personal movement and athletic inversion mentor, tennis Grand Slam icon <strong className={isWhite ? 'text-black' : 'text-white'}>Sania Mirza</strong> credited Nicy Joseph Dance &amp; Fitness for foundational scapular stability, handstand balance, and functional core control — bridging high-fashion cinematic aesthetics with world-class physical performance.
              </p>
            </div>

            {/* Three Architectural Directorial Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              <div className={`p-4 space-y-1.5 transition-colors border-l-2 ${
                isWhite ? 'border-amber-900/30 bg-black/[0.02]' : 'border-[#c5a059]/40 bg-white/[0.02]'
              }`}>
                <div className={`text-[10px] font-mono tracking-[0.24em] uppercase font-bold ${
                  isWhite ? 'text-amber-900' : 'text-[#dfba73]'
                }`}>
                  01 · PALACE COMMISSIONS
                </div>
                <div className={`text-xs leading-relaxed ${isWhite ? 'text-stone-600' : 'text-stone-400'}`}>
                  50-dancer sangeet symphonies, turnkey couple solos &amp; heritage ballroom theatricals.
                </div>
              </div>

              <div className={`p-4 space-y-1.5 transition-colors border-l-2 ${
                isWhite ? 'border-amber-900/30 bg-black/[0.02]' : 'border-[#c5a059]/40 bg-white/[0.02]'
              }`}>
                <div className={`text-[10px] font-mono tracking-[0.24em] uppercase font-bold ${
                  isWhite ? 'text-amber-900' : 'text-[#dfba73]'
                }`}>
                  02 · SCREEN &amp; CINEMA
                </div>
                <div className={`text-xs leading-relaxed ${isWhite ? 'text-stone-600' : 'text-stone-400'}`}>
                  Camera blocking, commercial dance direction &amp; actor movement preparation.
                </div>
              </div>

              <div className={`p-4 space-y-1.5 transition-colors border-l-2 ${
                isWhite ? 'border-amber-900/30 bg-black/[0.02]' : 'border-[#c5a059]/40 bg-white/[0.02]'
              }`}>
                <div className={`text-[10px] font-mono tracking-[0.24em] uppercase font-bold ${
                  isWhite ? 'text-amber-900' : 'text-[#dfba73]'
                }`}>
                  03 · ATHLETIC LAB
                </div>
                <div className={`text-xs leading-relaxed ${isWhite ? 'text-stone-600' : 'text-stone-400'}`}>
                  Handstand inversion mastery, scapular control &amp; holistic neuromuscular longevity.
                </div>
              </div>
            </div>

            {/* Signature & Inquiry CTA */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-6 border-t border-white/10">
              <div className="space-y-0.5">
                <span className={`block font-cursive text-3xl sm:text-4xl ${
                  isWhite ? 'text-stone-900' : 'text-gradient-gold'
                }`}>
                  Nicy Joseph
                </span>
                <span className="block text-[9px] font-mono tracking-[0.26em] uppercase text-stone-400">
                  ARTISTIC DIRECTOR · JUBILEE HILLS, HYDERABAD
                </span>
              </div>

              <button
                onClick={() => onOpenInquiry?.('Directorial Commissions & Artistic Atelier')}
                className={`group relative inline-flex items-center justify-between gap-3.5 px-7 sm:px-8 py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-2xl ${
                  isWhite
                    ? 'bg-black text-white hover:bg-stone-900 shadow-[0_15px_35px_rgba(0,0,0,0.2)]'
                    : 'bg-white text-black hover:bg-[#faeed7] shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
                }`}
              >
                <span className="font-wide text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em]">DIRECTORIAL INQUIRY</span>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg shrink-0 ${
                  isWhite ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isWhite ? '#000000' : '#ffffff'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 inline-block shrink-0">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </div>
              </button>
            </div>

          </motion.div>

          {/* ============================================================== */}
          {/* RIGHT: Layered Multi-Image Architectural Showcase              */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
            
            {/* Soft Ambient Radiance Halo */}
            <div 
              aria-hidden="true" 
              className={`absolute inset-0 max-w-[500px] rounded-full blur-[100px] pointer-events-none -z-10 ${
                isWhite ? 'bg-amber-600/15' : 'bg-gradient-to-tr from-rose-900/20 via-amber-600/20 to-transparent'
              }`} 
            />

            {/* Primary Tactile 3D Framed Portrait */}
            <div style={{ perspective: '1200px' }} className="w-full max-w-[420px] relative z-20">
              <motion.div
                ref={cardRef}
                style={{
                  y: primaryImageY,
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformStyle: 'preserve-3d',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => onOpenInquiry?.('Private Atelier Direction & Mentorship')}
                className={`relative w-full aspect-[4/5] overflow-hidden rounded-none shadow-[0_30px_90px_rgba(0,0,0,0.95)] cursor-pointer group border-none outline-none ring-0 will-change-transform ${
                  isWhite ? 'bg-stone-200' : 'bg-[#0c0809]'
                }`}
              >
                <motion.div 
                  style={{ y: innerImageY, scale: 1.12 }}
                  className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform"
                >
                  <img
                    src={ASSETS.artYakushevPortrait}
                    alt="Nicy Joseph Movement Direction"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </motion.div>

                {/* Subtle Theatrical Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Lower Photo Label */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-white text-[9px] font-mono tracking-[0.24em] uppercase">
                  <span className="font-semibold text-gradient-gold">ATELIER EDITORIAL</span>
                  <span className="text-white/60">HYDERABAD</span>
                </div>
              </motion.div>
            </div>

            {/* Secondary Layered Floating Offset Card (Studio Sanctuary Rehearsal) */}
            <motion.div
              style={{ y: secondaryImageY }}
              className="hidden sm:block absolute -bottom-8 -left-8 md:-bottom-10 md:-left-10 z-30 w-48 sm:w-56 aspect-[3/4] shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden border border-white/10 group cursor-pointer"
              onClick={() => onOpenInquiry?.('Jubilee Hills Sanctuary Residency')}
            >
              <img
                src={ASSETS.jubileeSanctuary}
                alt="Jubilee Hills Sanctuary"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10 pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-[8px] font-mono tracking-widest uppercase">
                <span className="block font-bold text-amber-300">JUBILEE HILLS</span>
                <span className="block text-stone-400">SANCTUARY FLOOR</span>
              </div>
            </motion.div>

            {/* Top Right Floating Metric Pill-less Tag */}
            <div className={`hidden sm:flex absolute -top-4 -right-4 z-30 px-3.5 py-1.5 backdrop-blur-md border ${
              isWhite 
                ? 'bg-white/90 border-black/10 text-stone-900 shadow-md' 
                : 'bg-black/80 border-white/15 text-stone-200 shadow-2xl'
            }`}>
              <span className="text-[9px] font-mono tracking-[0.24em] uppercase font-bold">
                EST. 2018 · 100+ PRODUCTIONS
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
