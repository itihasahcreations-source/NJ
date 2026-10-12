import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitleLockup } from './SectionTitleLockup';
import { FadeInUp } from './EditorialReveal';

interface WorkshopsCarouselSectionProps {
  theme?: 'dark' | 'white';
  onOpenInquiry?: (topic?: string) => void;
}

type TabType = 'upcoming' | 'artists';

interface CarouselCardItem {
  id: string;
  image: string;
  alt: string;
  instagramUrl?: string;
}

// Clean image datasets for UPCOMING and ARTISTS (reusing simple numbered photos in different order; no 6 or 7)
const UPCOMING_IMAGES: CarouselCardItem[] = [
  { id: 'up-1', image: '/classes/3.jpg', alt: 'Upcoming Workshop 1' },
  { id: 'up-2', image: '/classes/5.jpg', alt: 'Upcoming Workshop 2' },
  { id: 'up-3', image: '/classes/1.jpg', alt: 'Upcoming Workshop 3' },
  { id: 'up-4', image: '/classes/8.jpg', alt: 'Upcoming Workshop 4' },
  { id: 'up-5', image: '/classes/2.jpg', alt: 'Upcoming Workshop 5' },
  { id: 'up-6', image: '/classes/4.jpg', alt: 'Upcoming Workshop 6' },
  { id: 'up-7', image: '/classes/1.jpg', alt: 'Upcoming Workshop 7' },
  { id: 'up-8', image: '/classes/8.jpg', alt: 'Upcoming Workshop 8' },
];

const ARTISTS_IMAGES: CarouselCardItem[] = [
  { id: 'art-1', image: '/classes/8.jpg', alt: 'Artist Masterclass 1' },
  { id: 'art-2', image: '/classes/2.jpg', alt: 'Artist Masterclass 2' },
  { id: 'art-3', image: '/classes/5.jpg', alt: 'Artist Masterclass 3' },
  { id: 'art-4', image: '/classes/4.jpg', alt: 'Artist Masterclass 4' },
  { id: 'art-5', image: '/classes/1.jpg', alt: 'Artist Masterclass 5' },
  { id: 'art-6', image: '/classes/3.jpg', alt: 'Artist Masterclass 6' },
  { id: 'art-7', image: '/classes/8.jpg', alt: 'Artist Masterclass 7' },
  { id: 'art-8', image: '/classes/2.jpg', alt: 'Artist Masterclass 8' },
];

export const WorkshopsCarouselSection: React.FC<WorkshopsCarouselSectionProps> = ({
  theme = 'dark',
  onOpenInquiry
}) => {
  const isWhite = theme === 'white';
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Unified Interactive 3D Stage Refs for UPCOMING and ARTISTS
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollOffset = useRef(0);
  const targetOffset = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const rafId = useRef<number>(0);

  const currentItems = activeTab === 'upcoming' ? UPCOMING_IMAGES : ARTISTS_IMAGES;
  const totalItems = currentItems.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.08 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    scrollOffset.current = 0;
    targetOffset.current = 0;
  }, [activeTab]);

  useEffect(() => {
    if (!isInView) return;

    const updateStage = () => {
      const diff = targetOffset.current - scrollOffset.current;
      if (Math.abs(diff) > 0.05) {
        scrollOffset.current += diff * 0.14;
      } else {
        scrollOffset.current = targetOffset.current;
      }

      const container = stageRef.current;
      if (container) {
        const containerWidth = container.clientWidth;
        const centerX = containerWidth / 2;
        const isMobile = containerWidth < 768;
        
        // Base card width & spacing (Spacious on mobile for billion dollar luxury feel)
        const cardWidth = isMobile 
          ? Math.max(165, containerWidth * 0.46) 
          : Math.min(260, Math.max(175, containerWidth * 0.18));
        const gap = isMobile ? 22 : 22;
        const cardStride = cardWidth + gap;
        const totalItemsWidth = totalItems * cardStride;
        const startX = centerX - totalItemsWidth / 2 + cardWidth / 2;

        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;

          const itemBasePos = startX + idx * cardStride;
          const currentPos = itemBasePos + scrollOffset.current;
          
          // Normalized horizontal position across stage (0 on left, 1 on right)
          const progressX = Math.max(0, Math.min(1, currentPos / containerWidth));
          const offsetFromCenter = currentPos - centerX;
          const distFromCenter = Math.abs(offsetFromCenter);

          if (isMobile) {
            // MOBILE: Extra zoom center panel properly, spacious plaxing, luxury blur & highlight
            const normDistCenter = Math.min(1, distFromCenter / (cardWidth * 1.15));
            const centerProximity = Math.max(0, 1 - normDistCenter);
            
            // Extra zoom on center panel (scales up to 1.28)
            const mobileScale = 0.88 + centerProximity * 0.40;
            const mobileTranslateY = -22 + progressX * 55;
            const mobileTranslateZ = -20 + centerProximity * 80;
            const mobileAngleY = (0.35 - progressX) * 18;

            cardEl.style.width = `${cardWidth}px`;
            cardEl.style.transform = `translate3d(${currentPos - cardWidth / 2}px, ${mobileTranslateY}px, ${mobileTranslateZ}px) rotateY(${mobileAngleY}deg) scale(${mobileScale})`;
            
            if (centerProximity > 0.65) {
              // Highlight center panel with radiant sheen and elevated z-index
              cardEl.style.opacity = '1';
              cardEl.style.zIndex = '35';
              cardEl.style.filter = 'none';
              cardEl.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.98), 0 0 25px rgba(255, 255, 255, 0.22)';
              cardEl.style.borderColor = 'rgba(255, 255, 255, 0.55)';
            } else {
              // Side panels: luxury blur, subdued opacity and soft depth
              const blurVal = (1 - centerProximity) * 2.5;
              cardEl.style.opacity = `${Math.max(0.48, 0.95 - (1 - centerProximity) * 0.45)}`;
              cardEl.style.zIndex = `${Math.round(8 + centerProximity * 15)}`;
              cardEl.style.filter = blurVal > 0.4 ? `blur(${blurVal.toFixed(1)}px)` : 'none';
              cardEl.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.8)';
              cardEl.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            }
          } else {
            // DESKTOP: Flow from left to right (+30% bigger on right as requested)
            const scale = 0.90 + progressX * 0.38;
            const translateY = -34 + progressX * 96;
            const translateZ = -40 + progressX * 110;
            const angleY = (0.35 - progressX) * 32;

            const normDist = Math.abs(offsetFromCenter / (containerWidth * 0.45));
            const opacity = normDist > 1.8 ? Math.max(0, 1 - (normDist - 1.8) * 2.5) : 1;

            cardEl.style.width = `${cardWidth}px`;
            cardEl.style.transform = `translate3d(${currentPos - cardWidth / 2}px, ${translateY}px, ${translateZ}px) rotateY(${angleY}deg) scale(${scale})`;
            cardEl.style.opacity = `${opacity}`;
            cardEl.style.zIndex = `${Math.round(6 + progressX * 12)}`;
            cardEl.style.filter = 'none';
            cardEl.style.boxShadow = '';
            cardEl.style.borderColor = '';
          }
        });
      }

      rafId.current = requestAnimationFrame(updateStage);
    };

    rafId.current = requestAnimationFrame(updateStage);
    return () => cancelAnimationFrame(rafId.current);
  }, [activeTab, isInView, totalItems]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const maxPan = (totalItems - 1) * 60;
    targetOffset.current = (0.5 - relativeX) * maxPan * 2;
  }, [totalItems]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartOffset.current = targetOffset.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 6) {
      hasDragged.current = true;
    }
    const containerWidth = stageRef.current?.clientWidth || 1000;
    const isMobile = containerWidth < 768;
    const cardWidth = isMobile ? Math.max(165, containerWidth * 0.46) : containerWidth * 0.18;
    const maxBound = ((totalItems - 1) * (cardWidth + 22)) / 2 + 50;
    
    const nextOffset = dragStartOffset.current + deltaX * 1.25;
    targetOffset.current = Math.max(-maxBound, Math.min(maxBound, nextOffset));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section 
      id="workshops" 
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 select-none relative overflow-hidden bg-transparent"
    >
      <style>{`
        .workshops-card-shell {
          width: 100%;
          aspect-ratio: 0.70;
          border-radius: 0px !important;
          overflow: hidden;
          background-color: ${isWhite ? '#FFFFFF' : '#0c0c10'};
          position: relative;
          border: 1px solid ${isWhite ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)'};
          box-shadow: ${isWhite ? '0 16px 36px rgba(0, 0, 0, 0.08)' : '0 16px 36px rgba(0, 0, 0, 0.85)'};
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .workshops-card-shell:hover {
          border-color: ${isWhite ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.4)'};
          box-shadow: ${isWhite ? '0 24px 48px rgba(0, 0, 0, 0.12)' : '0 24px 48px rgba(0, 0, 0, 0.95)'};
        }

        .workshops-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 0px !important;
          transition: transform 0.5s ease-out;
        }

        .workshops-card-shell:hover .workshops-card-image {
          transform: scale(1.04);
        }

        .workshops-card-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.18) 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.4) 100%
          );
          pointer-events: none;
        }

        .workshops-3d-stage {
          position: relative;
          width: 100%;
          height: clamp(340px, 55svh, 500px);
          perspective: 1200px;
          perspective-origin: 50% 50%;
          overflow: visible;
          cursor: grab;
          touch-action: pan-y;
        }

        .workshops-3d-stage:active {
          cursor: grabbing;
        }

        .workshops-3d-track {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .workshops-curved-card {
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform;
          transform-style: preserve-3d;
        }
      `}</style>

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 relative z-20">
        
        {/* ============================================================== */}
        {/* 1. SECTION TITLE (Centered on mobile, Left on desktop)        */}
        {/* ============================================================== */}
        <div className="relative z-25 pointer-events-none">
          <FadeInUp delay={0.05} yOffset={10}>
            <SectionTitleLockup
              title="WORKSHOPS"
              align="mobile-center"
              theme={theme}
            />
          </FadeInUp>
        </div>

        {/* Mobile Centered Tabs: UPCOMING · ARTISTS */}
        <div className="flex sm:hidden items-center justify-center gap-5 mt-3 mb-4 z-25 relative pointer-events-auto">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`font-['Bebas_Neue',_'Montserrat',_sans-serif] text-xl tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'upcoming'
                ? isWhite ? 'text-black border-b-2 border-black pb-0.5' : 'text-white border-b-2 border-white pb-0.5'
                : isWhite ? 'text-stone-400 hover:text-stone-700' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            UPCOMING.
          </button>
          <span className={isWhite ? 'text-stone-300 select-none' : 'text-white/20 select-none'}>·</span>
          <button
            type="button"
            onClick={() => setActiveTab('artists')}
            className={`font-['Bebas_Neue',_'Montserrat',_sans-serif] text-xl tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'artists'
                ? isWhite ? 'text-black border-b-2 border-black pb-0.5' : 'text-white border-b-2 border-white pb-0.5'
                : isWhite ? 'text-stone-400 hover:text-stone-700' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            ARTISTS.
          </button>
        </div>

        {/* ============================================================== */}
        {/* MOBILE REDESIGNED CAROUSEL: Crisp, Visible, Native Touch-Swipe */}
        {/* ============================================================== */}
        <div className="block sm:hidden relative w-full overflow-hidden my-2">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-[12vw] no-scrollbar items-center">
            {currentItems.map((item, idx) => (
              <div
                key={`mobile-${item.id}-${idx}`}
                onClick={() => onOpenInquiry?.(activeTab === 'upcoming' ? `Upcoming Workshop — ${item.alt}` : `Artist Masterclass — ${item.alt}`)}
                className={`snap-center shrink-0 w-[74vw] max-w-[285px] aspect-[3/4] relative overflow-hidden cursor-pointer select-none transition-all duration-300 ${
                  isWhite
                    ? 'bg-white border border-black/15 shadow-[0_12px_36px_rgba(0,0,0,0.08)]'
                    : 'bg-stone-950 border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.95)]'
                }`}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover rounded-none brightness-[0.98] contrast-[1.04]"
                  />
                )}

                {/* Laser-cut corner markers */}
                <div className="absolute inset-0 p-3.5 flex flex-col justify-between pointer-events-none">
                  <div className="w-full flex justify-between">
                    <span className="w-2 h-2 border-t border-l border-white/30" />
                    <span className="w-2 h-2 border-t border-r border-white/30" />
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="w-2 h-2 border-b border-l border-white/30" />
                    <span className="w-2 h-2 border-b border-r border-white/30" />
                  </div>
                </div>

                <div className="workshops-card-glare" />
              </div>
            ))}
          </div>

          {/* Mobile Swipe to Explore Bar — Crisp, high-contrast, fully visible in both light & dark themes */}
          <div className="flex items-center justify-center gap-2.5 mt-4 select-none">
            <span className={`h-px w-8 transition-colors ${isWhite ? 'bg-stone-900' : 'bg-white/50'}`} />
            <span className={`text-[10px] tracking-[0.28em] uppercase font-['Montserrat',_sans-serif] font-extrabold transition-colors ${
              isWhite ? 'text-stone-950 font-black' : 'text-white/95 font-bold'
            }`}>
              SWIPE TO EXPLORE
            </span>
            <span className={`h-px w-8 transition-colors ${isWhite ? 'bg-stone-900' : 'bg-white/50'}`} />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. DESKTOP 3D FLOW CAROUSEL (Desktop only — hidden on mobile)  */}
        {/* ============================================================== */}
        <div className={`hidden sm:flex relative w-full h-[clamp(340px,55svh,500px)] ${
          isWhite ? 'mt-4 sm:mt-1' : 'mt-4 sm:-mt-10'
        } z-10 items-center justify-center pointer-events-auto`}>
          
          {/* Edge Feather Blending - Removed in white theme & zero blur on mobile */}
          {!isWhite && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none bg-gradient-to-r from-[#060608] via-[#060608]/80 to-transparent transition-colors duration-500" />
              <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none bg-gradient-to-l from-[#060608] via-[#060608]/80 to-transparent transition-colors duration-500" />
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`tab-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full overflow-visible"
              style={{
                maskImage: isWhite ? 'none' : 'radial-gradient(ellipse 95% 85% at 50% 50%, black 60%, transparent 100%)',
                WebkitMaskImage: isWhite ? 'none' : 'radial-gradient(ellipse 95% 85% at 50% 50%, black 60%, transparent 100%)',
              }}
            >
              <div
                ref={stageRef}
                onMouseMove={handleMouseMove}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="workshops-3d-stage"
                role="region"
                aria-label={`${activeTab.toUpperCase()} Repertoire Gallery`}
              >
                <div className="workshops-3d-track">
                  {currentItems.map((item, idx) => {
                    const cardContent = (
                      <div className="workshops-card-shell">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.alt}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                            className="workshops-card-image"
                          />
                        )}
                        {/* Subtle minimal geometric corner notches */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                          <div className="w-full flex justify-between">
                            <span className="w-2 h-2 border-t border-l border-white/20" />
                            <span className="w-2 h-2 border-t border-r border-white/20" />
                          </div>
                          <div className="w-full flex justify-between">
                            <span className="w-2 h-2 border-b border-l border-white/20" />
                            <span className="w-2 h-2 border-b border-r border-white/20" />
                          </div>
                        </div>
                        <div className="workshops-card-glare" />
                      </div>
                    );

                    return (
                      <div
                        key={`${item.id}-${idx}`}
                        ref={(el) => { cardRefs.current[idx] = el; }}
                        className="workshops-curved-card"
                      >
                        {cardContent}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ============================================================== */}
        {/* 3. DESKTOP BOTTOM-RIGHT: UPCOMING. & ARTISTS. (Desktop only)   */}
        {/* ============================================================== */}
        <div className="hidden sm:flex relative z-25 pointer-events-none mt-4 sm:-mt-16 items-end justify-end">
          <FadeInUp delay={0.1} yOffset={8}>
            <div className="flex flex-col items-end text-right gap-1 pointer-events-auto">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Bebas_Neue',_'Montserrat',_sans-serif] font-black uppercase tracking-wide transition-all duration-300 cursor-pointer text-right scale-y-[1.14] ${
                  activeTab === 'upcoming'
                    ? isWhite
                      ? 'text-stone-950 -translate-x-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
                      : 'text-white -translate-x-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'
                    : isWhite
                      ? 'text-stone-400 hover:text-stone-700'
                      : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                UPCOMING.
              </button>

              <button
                onClick={() => setActiveTab('artists')}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Bebas_Neue',_'Montserrat',_sans-serif] font-black uppercase tracking-wide transition-all duration-300 cursor-pointer text-right scale-y-[1.14] ${
                  activeTab === 'artists'
                    ? isWhite
                      ? 'text-stone-950 -translate-x-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
                      : 'text-white -translate-x-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'
                    : isWhite
                      ? 'text-stone-400 hover:text-stone-700'
                      : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                ARTISTS.
              </button>
            </div>
          </FadeInUp>
        </div>

      </div>
    </section>
  );
};
