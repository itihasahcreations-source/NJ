import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, Instagram } from 'lucide-react';
import { FadeInUp } from './EditorialReveal';
import { SectionTitleLockup } from './SectionTitleLockup';

interface ProjectsSectionProps {
  theme?: 'dark' | 'white';
  onOpenInquiry?: (topic?: string) => void;
  onPlayVideo?: (title: string, url: string) => void;
}

export interface EditorialPanel {
  id: string;
  image: string;
  alt: string;
  aspectClass: string;
  reelCode?: string;
  reelUrl?: string;
  title?: string;
}

interface WeddingSubCategory {
  title: string;
  panels: EditorialPanel[];
}

const WEDDING_CATEGORIES: WeddingSubCategory[] = [
  {
    title: 'EVENTS',
    panels: [
      { id: 'ev-1', image: '/classes/1.jpg', alt: 'Grand Movement Symphony', aspectClass: 'aspect-[4/5]' },
      { id: 'ev-2', image: '/classes/3.jpg', alt: 'Royal Falaknuma Staging', aspectClass: 'aspect-[3/4]' },
      { id: 'ev-3', image: '/classes/5.jpg', alt: 'Bridal Solo Theatre', aspectClass: 'aspect-[4/5]' },
      { id: 'ev-4', image: '/classes/8.jpg', alt: 'Grand Garba Utsav', aspectClass: 'aspect-[16/11]' },
      { id: 'ev-5', image: '/classes/2.jpg', alt: 'Waterfront Ballroom Prelude', aspectClass: 'aspect-[1/1]' },
    ],
  },
  {
    title: 'DESTINATIONS',
    panels: [
      { 
        id: 'dest-1', 
        image: '/destinations/dest-1.jpg', 
        alt: 'Royal Rajasthan Destination Sangeet', 
        title: 'Rajasthan Palace Sangeet',
        aspectClass: 'aspect-[9/16]',
        reelCode: 'DNS1kknM4_T',
        reelUrl: 'https://www.instagram.com/reel/DNS1kknM4_T/?stkn=MTExdGJlOWZ5Zm1law=='
      },
      { 
        id: 'dest-2', 
        image: '/destinations/dest-2.jpg', 
        alt: 'Palace Celebration Choreography', 
        title: 'Destination Grand Sangeet',
        aspectClass: 'aspect-[9/16]',
        reelCode: 'DIoMlVDNji-',
        reelUrl: 'https://www.instagram.com/reel/DIoMlVDNji-/?stkn=MTU1Zm1wN2dqYWp3MA=='
      },
      { 
        id: 'dest-3', 
        image: '/destinations/dest-3.jpg', 
        alt: 'Destination Wedding Repertoire', 
        title: 'Heritage Palace Ensemble',
        aspectClass: 'aspect-[9/16]',
        reelCode: 'DVyQxuQDFdV',
        reelUrl: 'https://www.instagram.com/reel/DVyQxuQDFdV/?stkn=MTllajRvOXdjNHVmeA=='
      },
      { 
        id: 'dest-4', 
        image: '/destinations/dest-4.jpg', 
        alt: 'Grand Sangeet Movement Direction', 
        title: 'Bespoke Royal Sangeet',
        aspectClass: 'aspect-[9/16]',
        reelCode: 'DNpd3uBM_kd',
        reelUrl: 'https://www.instagram.com/reel/DNpd3uBM_kd/?stkn=ZTUzejIza2pmeHp2'
      },
      { 
        id: 'dest-5', 
        image: '/destinations/dest-5.jpg', 
        alt: 'Destination Ballroom Ensemble', 
        title: 'Destination Ballroom Finale',
        aspectClass: 'aspect-[9/16]',
        reelCode: 'DNVwu9nsp5_',
        reelUrl: 'https://www.instagram.com/reel/DNVwu9nsp5_/?stkn=eWZwcjFzMXhtaDRm'
      },
    ],
  },
  {
    title: 'CELEBRITIES',
    panels: [
      { id: 'cel-1', image: '/classes/4.jpg', alt: 'Sania Mirza Athletic Training', aspectClass: 'aspect-[3/4]' },
      { id: 'cel-2', image: '/classes/2.jpg', alt: 'Theatrical Solo Motion', aspectClass: 'aspect-[16/11]' },
      { id: 'cel-3', image: '/classes/8.jpg', alt: 'Contemporary Suspension', aspectClass: 'aspect-[1/1]' },
      { id: 'cel-4', image: '/classes/1.jpg', alt: 'Celebrity Feature Staging', aspectClass: 'aspect-[4/5]' },
      { id: 'cel-5', image: '/classes/3.jpg', alt: 'Kinetic Movement Direction', aspectClass: 'aspect-[16/10]' },
    ],
  },
];

// Interactive 3D Parallax Tilt & Depth Card Component
const ParallaxProjectCard: React.FC<{
  panel: EditorialPanel;
  index: number;
  isExpanded: boolean;
  onCardClick: () => void;
}> = ({ panel, index, isExpanded, onCardClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Continuous Scroll Parallax for dynamic floating feeling
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });
  
  const parallaxOffset = (index % 3 - 1) * 26;
  const rawScrollY = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset]);
  const smoothScrollY = useSpring(rawScrollY, { stiffness: 120, damping: 24 });

  // Interactive 3D Mouse / Touch Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 180, mass: 0.3 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const imgTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const imgTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

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

  const isDestination = panel.image?.startsWith('/destinations/');

  return (
    <motion.div
      ref={cardRef}
      style={{ y: smoothScrollY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onCardClick}
      className={`break-inside-avoid mb-4 sm:mb-6 relative ${panel.aspectClass} w-full overflow-hidden cursor-pointer select-none bg-stone-950 will-change-transform group`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className={`w-full h-full relative overflow-hidden transition-all duration-500 will-change-transform ${
          isExpanded
            ? 'scale-[1.08] sm:scale-[1.12] z-30 shadow-[0_30px_75px_rgba(0,0,0,0.98)] ring-2 ring-amber-300/80'
            : 'scale-100 z-10 shadow-[0_16px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_28px_65px_rgba(0,0,0,0.95)] hover:scale-[1.03]'
        }`}
      >
        {/* Parallax Image Layer with 3D Depth */}
        {panel.image ? (
          <motion.img
            src={panel.image}
            alt={panel.alt}
            loading="lazy"
            decoding="async"
            style={{
              x: isDestination ? 0 : imgTranslateX,
              y: isDestination ? 0 : imgTranslateY,
              scale: isDestination ? 1 : 1.15,
            }}
            className={`w-full h-full ${
              isDestination ? 'object-contain bg-black/95' : 'object-cover object-top'
            } transition-all duration-700 ease-out ${
              isExpanded 
                ? 'brightness-105 contrast-[1.06]' 
                : 'brightness-[0.93] group-hover:brightness-100 contrast-[1.03]'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-between p-6 bg-stone-900/40 border border-white/10">
            <div className="w-full flex justify-between">
              <span className="w-2.5 h-2.5 border-t border-l border-white/30" />
              <span className="w-2.5 h-2.5 border-t border-r border-white/30" />
            </div>
            <div className="w-full flex justify-between">
              <span className="w-2.5 h-2.5 border-b border-l border-white/30" />
              <span className="w-2.5 h-2.5 border-b border-r border-white/30" />
            </div>
          </div>
        )}

        {/* 3D Dynamic Specular Sheen */}
        <div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/50 via-transparent to-white/20 opacity-40 group-hover:opacity-90 transition-opacity duration-300" 
        />

        {/* Playable Reel Indicator Center Button */}
        {panel.reelCode && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 border border-white/25 backdrop-blur-md flex items-center justify-center text-white shadow-2xl group-hover:scale-115 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Title Overlay on Hover */}
        {panel.reelCode && panel.title && (
          <div className="absolute bottom-2.5 inset-x-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
              <p className="text-[10px] font-mono uppercase tracking-wider text-stone-200 truncate">
                {panel.title}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Mobile-optimized spacious floating row with center panel extra zoom, luxury blur and plaxing
const MobileProjectCardsRow: React.FC<{
  panels: EditorialPanel[];
  onCardClick: (panel: EditorialPanel) => void;
  theme?: 'dark' | 'white';
}> = ({ panels, onCardClick, theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.clientWidth * 0.74;
    const stride = cardWidth + 20;
    const idx = Math.round(scrollLeft / stride);
    setActiveIndex(Math.max(0, Math.min(panels.length - 1, idx)));
  };

  return (
    <div className="relative w-full block sm:hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-6 px-[13vw] no-scrollbar items-center"
      >
        {panels.map((panel, idx) => {
          const isActive = idx === activeIndex;
          const isDestination = panel.image?.startsWith('/destinations/');
          return (
            <div
              key={panel.id}
              onClick={() => onCardClick(panel)}
              className={`snap-center shrink-0 ${
                isDestination ? 'w-[68vw] max-w-[270px] aspect-[9/16]' : 'w-[74vw] max-w-[290px] aspect-[3/4]'
              } relative overflow-hidden ${
                isWhite ? 'bg-white' : 'bg-stone-950'
              } cursor-pointer select-none transition-all duration-500 will-change-transform ${
                isActive
                  ? isWhite
                    ? 'scale-[1.06] z-20 border border-black/40 shadow-[0_20px_45px_rgba(0,0,0,0.14)] opacity-100 filter-none'
                    : 'scale-[1.08] z-20 border border-white/60 shadow-[0_25px_60px_rgba(0,0,0,0.98),0_0_24px_rgba(255,255,255,0.22)] opacity-100 filter-none'
                  : isWhite
                    ? 'scale-[0.95] z-10 border border-black/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] opacity-90 filter-none'
                    : 'scale-[0.94] z-10 border border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.8)] opacity-90 filter-none'
              }`}
            >
              {panel.image ? (
                <img
                  src={panel.image}
                  alt={panel.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full ${
                    isDestination ? 'object-contain bg-black/95' : 'object-cover object-top'
                  } transition-all duration-700 ease-out`}
                />
              ) : (
                <div className={`w-full h-full flex flex-col items-center justify-between p-6 ${
                  isWhite ? 'bg-black/[0.02] border border-black/10' : 'bg-stone-900/40 border border-white/10'
                }`}>
                  <div className="w-full flex justify-between">
                    <span className={`w-2.5 h-2.5 border-t border-l ${isWhite ? 'border-black/30' : 'border-white/30'}`} />
                    <span className={`w-2.5 h-2.5 border-t border-r ${isWhite ? 'border-black/30' : 'border-white/30'}`} />
                  </div>
                  <div className="w-full flex justify-between">
                    <span className={`w-2.5 h-2.5 border-b border-l ${isWhite ? 'border-black/30' : 'border-white/30'}`} />
                    <span className={`w-2.5 h-2.5 border-b border-r ${isWhite ? 'border-black/30' : 'border-white/30'}`} />
                  </div>
                </div>
              )}

              {/* Ambient lighting vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Play Button Indicator if Reel */}
              {panel.reelCode && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border text-white flex items-center justify-center shadow-2xl transition-all duration-300 ${
                    isActive ? 'border-white/70 bg-white/30 scale-110' : 'border-white/20'
                  }`}>
                    <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Swipe to Explore Bar */}
      <div className="flex items-center justify-center gap-2.5 mt-2 pb-2 select-none">
        <span className={`h-px w-8 transition-colors ${isWhite ? 'bg-stone-900' : 'bg-white/50'}`} />
        <span className={`text-[10px] tracking-[0.28em] uppercase font-['Montserrat',_sans-serif] font-extrabold transition-colors ${
          isWhite ? 'text-stone-950 font-black' : 'text-white/95 font-bold'
        }`}>
          SWIPE TO EXPLORE
        </span>
        <span className={`h-px w-8 transition-colors ${isWhite ? 'bg-stone-900' : 'bg-white/50'}`} />
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  theme = 'dark',
}) => {
  const isWhite = theme === 'white';
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeReel, setActiveReel] = useState<EditorialPanel | null>(null);

  const handleClose = useCallback(() => {
    setActiveReel(null);
  }, []);

  // Lock body scroll and handle device back button & Escape key
  useEffect(() => {
    if (!activeReel) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Push dummy history entry so Android / browser back button closes modal
    window.history.pushState({ reelModalOpen: true }, '');

    const handlePopState = () => {
      setActiveReel(null);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveReel(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeReel]);

  const handleCardClick = (panel: EditorialPanel) => {
    if (panel.reelCode) {
      setActiveReel(panel);
    } else {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(panel.id)) {
          next.delete(panel.id);
        } else {
          next.add(panel.id);
        }
        return next;
      });
    }
  };

  return (
    <section 
      id="weddings-gallery"
      className="pt-32 sm:pt-44 md:pt-56 pb-20 sm:pb-32 select-none relative overflow-hidden bg-transparent"
    >
      {/* Ambient Lighting */}
      <div 
        aria-hidden="true" 
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[85vw] h-[650px] rounded-full blur-[200px] pointer-events-none -z-10 transition-all duration-500 ${
          isWhite 
            ? 'bg-gradient-to-r from-amber-200/25 via-stone-200/35 to-transparent' 
            : 'bg-gradient-to-r from-zinc-800/15 via-slate-900/20 to-transparent'
        }`}
      />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 space-y-14 sm:space-y-18 relative z-20">
        
        {/* Section Header: Pure Monolith WEDDINGS */}
        <FadeInUp delay={0.05} yOffset={20}>
          <SectionTitleLockup
            title="WEDDINGS"
            align="left"
            theme={theme}
          />
        </FadeInUp>

        {/* 3 Sub-categories: EVENTS, DESTINATIONS, CELEBRITIES */}
        {/* Subheadings placed at the top-right (right up) corner of the images with UPCOMING/ARTISTS font */}
        <div className="space-y-16 sm:space-y-24">
          {WEDDING_CATEGORIES.map((cat, catIdx) => (
            <div key={cat.title} className="space-y-4 sm:space-y-5">
              
              {/* Subheading in Right Up Corner (Same font as UPCOMING. & ARTISTS.) */}
              <FadeInUp delay={0.06 + catIdx * 0.04} yOffset={10}>
                <div className="w-full flex items-center justify-end pb-1 sm:pb-2">
                  <h3 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Bebas_Neue',_'Montserrat',_sans-serif] font-black uppercase tracking-wide scale-y-[1.14] text-right select-none transition-colors duration-300 ${
                    isWhite 
                      ? 'text-stone-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]' 
                      : 'text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'
                  }`}>
                    {cat.title}.
                  </h3>
                </div>
              </FadeInUp>

              {/* Mobile Carousel Row (< sm) with Extra Zoom, Highlighting and Luxury Blur */}
              <MobileProjectCardsRow
                panels={cat.panels}
                onCardClick={handleCardClick}
                theme={theme}
              />

              {/* Desktop / Tablet Collage Grid (>= sm) with Rich 3D Parallax */}
              <div className="hidden sm:block columns-2 md:columns-3 lg:columns-5 gap-4 sm:gap-5 md:gap-6 [column-fill:_balance]">
                {cat.panels.map((panel, idx) => (
                  <ParallaxProjectCard
                    key={panel.id}
                    panel={panel}
                    index={idx}
                    isExpanded={expandedIds.has(panel.id)}
                    onCardClick={() => handleCardClick(panel)}
                  />
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Playable Instagram Reel Modal: Portal to document.body, Pure Minimal, Zero Text */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeReel && (
            <div 
              onClick={handleClose}
              className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 pb-6 select-none cursor-pointer"
              style={{
                paddingTop: 'max(1.25rem, env(safe-area-inset-top, 1.25rem))',
                paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))',
              }}
            >
              {/* Top Navigation Bar: Minimal Back (<) and Close (✕) Buttons */}
              <div 
                className="w-full max-w-[420px] flex items-center justify-between px-2 pt-1 pb-2 z-30 shrink-0 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Dedicated Minimal Back Button (<) */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-12 h-12 rounded-full bg-black/85 hover:bg-white text-white hover:text-black border border-white/35 backdrop-blur-xl shadow-[0_6px_25px_rgba(0,0,0,0.9)] flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
                  aria-label="Back"
                  title="Back"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
                </button>

                {/* Dedicated Minimal Close Button (✕) */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-12 h-12 rounded-full bg-black/85 hover:bg-white text-white hover:text-black border border-white/35 backdrop-blur-xl shadow-[0_6px_25px_rgba(0,0,0,0.9)] flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
                  aria-label="Close"
                  title="Close"
                >
                  <X className="w-5 h-5 stroke-[2.2]" />
                </button>
              </div>

              {/* Pure Minimal Video Player Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[9/16] max-h-[72svh] sm:max-h-[78vh] bg-stone-950 border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.98)] overflow-hidden cursor-default my-auto shrink-0"
              >
                {/* Poster Image Preview: Instant visual anchor, zero white flash */}
                {activeReel.image && activeReel.image.startsWith('/destinations/') && (
                  <img
                    src={activeReel.image}
                    alt={activeReel.alt}
                    className="absolute inset-0 w-full h-full object-contain filter brightness-90 bg-black/95"
                  />
                )}

                {/* Embedded Instagram Reel */}
                <iframe
                  src={`https://www.instagram.com/reel/${activeReel.reelCode}/embed/`}
                  title={activeReel.alt || 'Instagram Reel'}
                  className="relative z-10 w-full h-full border-0 block bg-transparent"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  scrolling="no"
                />
              </motion.div>

              {/* Bottom Minimal Actions Bar: Instagram Icon + Quick Close Button */}
              <div 
                className="w-full max-w-[420px] flex items-center justify-center gap-5 px-2 pt-2 z-30 shrink-0 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Direct Link to Watch on Instagram (pure icon, zero text!) */}
                <a
                  href={activeReel.reelUrl || `https://www.instagram.com/reel/${activeReel.reelCode}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-black/85 hover:bg-white text-white hover:text-black border border-white/35 backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 stroke-[2]" />
                </a>

                {/* Minimal Quick Close Button (✕) for thumb reach */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-12 h-12 rounded-full bg-black/85 hover:bg-white text-white hover:text-black border border-white/35 backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
                  aria-label="Close"
                  title="Close"
                >
                  <X className="w-5 h-5 stroke-[2.2]" />
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
