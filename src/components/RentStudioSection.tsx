import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { MapPin, Navigation, Sparkles } from 'lucide-react';

interface RentStudioSectionProps {
  theme?: 'dark' | 'white';
}

export const RentStudioSection: React.FC<RentStudioSectionProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const googleMapsUrl = 'https://maps.app.goo.gl/BhiV1nC29dFDhBKY9';
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax Depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const smoothY = useSpring(rawY, { stiffness: 90, damping: 20 });

  // 3D Tilt Stage Interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), springConfig);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const studioPhotos = ['/studio/9.jpg', '/studio/1.jpg', '/studio/2.jpg', '/studio/3.jpg'];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
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
      id="rent-studio" 
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-28 select-none relative overflow-hidden bg-transparent"
    >
      {/* Top & Bottom Ambient Seams */}
      <div 
        aria-hidden="true" 
        className={`absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b ${
          isWhite ? 'from-[#FAF8F5]' : 'from-[#060608]'
        } to-transparent pointer-events-none z-10 transition-colors duration-500`} 
      />
      <div 
        aria-hidden="true" 
        className={`absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-t ${
          isWhite ? 'from-[#FAF8F5]' : 'from-[#060608]'
        } to-transparent pointer-events-none z-10 transition-colors duration-500`} 
      />

      {/* Atmospheric Soft Light Orb */}
      <div 
        aria-hidden="true" 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-[850px] h-[380px] rounded-full blur-[160px] pointer-events-none -z-10 transition-all duration-700 ${
          isWhite 
            ? 'bg-gradient-to-tr from-amber-200/20 via-stone-200/30 to-amber-100/15' 
            : 'bg-gradient-to-tr from-zinc-800/10 via-emerald-950/15 to-neutral-900/15'
        }`} 
      />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 relative z-20">
        
        {/* PURE VISUAL STAGE: NO TEXT WHATSOEVER */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative z-10 flex flex-col items-center justify-center w-full"
        >
          <motion.div
            style={{ y: smoothY, rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="group relative flex flex-col items-center justify-center w-full max-w-5xl will-change-transform"
          >
            {/* Top Interactive Minimal Indicator Bar */}
            <div className="flex items-center gap-2 mb-4 z-30 pointer-events-auto">
              {studioPhotos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                    activeImageIndex === i
                      ? isWhite
                        ? 'w-10 bg-black'
                        : 'w-10 bg-white'
                      : isWhite
                      ? 'w-3 bg-stone-300 hover:bg-stone-500'
                      : 'w-3 bg-white/25 hover:bg-white/50'
                  }`}
                  aria-label={`Visual view ${i + 1}`}
                />
              ))}
            </div>

            {/* Overlapping Visual Sculpture: Master Studio Canvas + Floating Interactive Location Portal */}
            <div className="relative flex items-center justify-center w-full">
              
              {/* PRIMARY CANVAS: Large Cinematic Architectural View */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                title="Location"
                className={`relative w-[68vw] sm:w-[56vw] max-w-[760px] aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden transition-all duration-700 block group/canvas ${
                  isWhite
                    ? 'border border-black/10 bg-white/90 shadow-[0_30px_70px_rgba(0,0,0,0.09)] group-hover:border-black/30'
                    : 'border border-white/10 bg-stone-950/80 shadow-[0_30px_80px_rgba(0,0,0,0.95)] group-hover:border-white/30'
                }`}
              >
                {/* Uploaded Studio Photo with graceful fallback */}
                {studioPhotos[activeImageIndex] && (
                  <img
                    key={activeImageIndex}
                    src={studioPhotos[activeImageIndex]}
                    alt="Rent Studio Sanctuary"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl brightness-[0.95] contrast-[1.05]"
                  />
                )}

                {/* Simple Rent Studio Heading popping from image when hovered over (Pure text, no pill boundary) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="opacity-0 group-hover/canvas:opacity-100 scale-90 group-hover/canvas:scale-100 transition-all duration-300 ease-out select-none">
                    <span className="font-['Bebas_Neue',_sans-serif] text-2xl sm:text-3xl md:text-4xl tracking-[0.25em] uppercase font-bold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                      RENT STUDIO
                    </span>
                  </div>
                </div>

                {/* Architectural Studio Stage Shell — Corner Markers */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between pointer-events-none z-10">
                  <div className="w-full flex justify-between">
                    <span className="w-2.5 h-2.5 border-t border-l border-white/25" />
                    <span className="w-2.5 h-2.5 border-t border-r border-white/25" />
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="w-2.5 h-2.5 border-b border-l border-white/25" />
                    <span className="w-2.5 h-2.5 border-b border-r border-white/25" />
                  </div>
                </div>

                {/* Ambient Soft Vignette & Specular Light */}
                <div 
                  className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
                    isWhite 
                      ? 'bg-gradient-to-t from-stone-900/10 via-transparent to-transparent' 
                      : 'bg-gradient-to-t from-black/75 via-transparent to-black/25'
                  }`} 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </a>

              {/* OVERLAPPING FLOATING LOCATION PORTAL (Pure Iconography & Live Beacon) */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                title="Google Maps Coordinates"
                className={`absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-6 md:right-12 w-[24vw] min-w-[110px] max-w-[210px] aspect-square rounded-2xl overflow-hidden backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center gap-3.5 z-30 group/portal cursor-pointer ${
                  isWhite
                    ? 'border border-black/15 bg-white/85 shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:border-black/40 hover:bg-white hover:scale-105'
                    : 'border border-white/20 bg-black/70 shadow-[0_25px_60px_rgba(0,0,0,0.98)] hover:border-white/50 hover:bg-black/90 hover:scale-105'
                }`}
              >
                {/* Radial Pulse Backing */}
                <div 
                  aria-hidden="true" 
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.18)_0%,transparent_75%)] pointer-events-none" 
                />

                {/* Location Pin Icon */}
                <div className="relative z-10 transition-transform duration-300 group-hover/portal:-translate-y-1">
                  <MapPin 
                    className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${
                      isWhite
                        ? 'text-stone-900 group-hover/portal:text-emerald-600'
                        : 'text-white/95 group-hover/portal:text-emerald-400'
                    }`}
                    strokeWidth={1.6} 
                  />
                </div>

                {/* Pulsing Coordinates Beacon */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-400/35 animate-ping absolute" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,1)] transition-transform duration-300 group-hover/portal:scale-125" />
                </div>

                {/* Subtle Navigation Arrow Icon */}
                <div className="relative z-10 opacity-60 group-hover/portal:opacity-100 transition-all duration-300">
                  <Navigation 
                    className={`w-3.5 h-3.5 rotate-45 ${
                      isWhite ? 'text-stone-700' : 'text-white/80'
                    }`} 
                    strokeWidth={1.8}
                  />
                </div>

                {/* Corner Specular Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none" />
              </a>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
