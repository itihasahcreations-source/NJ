import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SectionTitleLockup } from './SectionTitleLockup';

// Curated Archive Slide Panels populated with valid studio & dance photos (1, 2, 3, 4, 5, 8; no 6 or 7)
const VALID_ARCHIVE_PHOTOS = [
  '/classes/1.jpg',
  '/classes/2.jpg',
  '/classes/3.jpg',
  '/classes/4.jpg',
  '/classes/5.jpg',
  '/classes/8.jpg',
];

const ARCHIVE_IMAGES = Array.from({ length: 18 }, (_, i) => ({
  id: `arch-${i + 1}`,
  image: VALID_ARCHIVE_PHOTOS[i % VALID_ARCHIVE_PHOTOS.length],
}));

interface AboutPortfolioSectionProps {
  theme?: 'dark' | 'white';
}

export const AboutPortfolioSection: React.FC<AboutPortfolioSectionProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isInView, setIsInView] = useState(false);

  // Smooth Interactive Pan & Drag Physics
  const scrollOffset = useRef(0);
  const targetOffset = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const rafId = useRef<number>(0);

  const totalItems = ARCHIVE_IMAGES.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

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
        const cardWidth = isMobile 
          ? Math.max(140, containerWidth * 0.40) 
          : Math.min(260, Math.max(180, containerWidth * 0.185));
        const gap = isMobile ? 16 : 24;
        const cardStride = cardWidth + gap;
        const totalTrackWidth = totalItems * cardStride;
        const startX = centerX - totalTrackWidth / 2 + cardWidth / 2;

        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;

          const itemBasePos = startX + idx * cardStride;
          const currentPos = itemBasePos + scrollOffset.current;
          
          const offsetFromCenter = currentPos - centerX;
          const normDist = offsetFromCenter / (containerWidth * 0.44);
          const absDist = Math.abs(normDist);

          // Harmonious symmetrical amphitheater curve with center card prominent
          const angleY = Math.max(-32, Math.min(32, normDist * -24));
          const translateZ = -Math.min(absDist * 125, 250);
          const translateY = Math.min(absDist * 14, 28);
          const scale = Math.max(0.84, 1.03 - absDist * 0.12);
          const opacity = absDist > 2.2 ? Math.max(0, 1 - (absDist - 2.2) * 1.6) : 1;

          cardEl.style.width = `${cardWidth}px`;
          cardEl.style.transform = `translate3d(${currentPos - cardWidth / 2}px, ${translateY}px, ${translateZ}px) rotateY(${angleY}deg) scale(${scale})`;
          cardEl.style.opacity = `${opacity}`;
          cardEl.style.zIndex = `${Math.round(20 - Math.min(15, absDist * 6))}`;
        });
      }

      rafId.current = requestAnimationFrame(updateStage);
    };

    rafId.current = requestAnimationFrame(updateStage);
    return () => cancelAnimationFrame(rafId.current);
  }, [isInView, totalItems]);

  // Interactive Mouse Pan
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const maxPan = (totalItems - 1) * 55;
    targetOffset.current = (0.5 - relativeX) * maxPan * 2.2;
  }, [totalItems]);

  // Touch / Pointer Drag
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = targetOffset.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    const containerWidth = stageRef.current?.clientWidth || 1000;
    const isMobile = containerWidth < 768;
    const cardWidth = isMobile ? containerWidth * 0.40 : containerWidth * 0.185;
    const maxBound = ((totalItems - 1) * (cardWidth + 24)) / 2 + 60;
    
    const nextOffset = dragStartOffset.current + deltaX * 1.35;
    targetOffset.current = Math.max(-maxBound, Math.min(maxBound, nextOffset));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section
      id="about-portfolio"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      aria-label="Portfolio & Repertoire Archive"
      className="pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-32 select-none relative overflow-hidden bg-transparent w-full flex flex-col items-center justify-center transition-colors duration-500"
    >
      <style>{`
        .portfolio-3d-stage {
          position: relative;
          width: 100%;
          height: clamp(340px, 48vh, 520px);
          z-index: 10;
          perspective: 1200px;
          perspective-origin: 50% 50%;
          overflow: visible;
          cursor: grab;
          touch-action: pan-y;
        }

        .portfolio-3d-stage:active {
          cursor: grabbing;
        }

        .portfolio-3d-track {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .portfolio-curved-card {
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform;
          transform-style: preserve-3d;
        }

        .portfolio-card-shell {
          width: 100%;
          aspect-ratio: 0.70;
          border-radius: 0px !important;
          overflow: hidden;
          background-color: ${isWhite ? '#FFFFFF' : '#0c0c10'};
          position: relative;
          border: 1px solid ${isWhite ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)'};
          box-shadow: ${isWhite ? '0 16px 36px rgba(0, 0, 0, 0.06)' : '0 16px 36px rgba(0, 0, 0, 0.85)'};
          transition: border-color 0.25s ease, background-color 0.25s ease;
        }

        .portfolio-curved-card:hover .portfolio-card-shell {
          border-color: ${isWhite ? 'rgba(0, 0, 0, 0.28)' : 'rgba(255, 255, 255, 0.35)'};
        }

        .portfolio-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 0px !important;
          transition: transform 0.4s ease-out;
        }

        .portfolio-curved-card:hover .portfolio-card-image {
          transform: scale(1.04);
        }

        .portfolio-card-glare {
          position: absolute;
          inset: 0;
          background: ${isWhite
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, transparent 50%, rgba(0, 0, 0, 0.06) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, transparent 50%, rgba(0, 0, 0, 0.4) 100%)'};
          pointer-events: none;
        }

        @media (max-width: 767px) {
          .portfolio-3d-stage {
            height: 310px !important;
            margin-top: 14px !important;
          }
        }
      `}</style>

      {/* Atmospheric Ambient Glow */}
      <div 
        aria-hidden="true" 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[500px] rounded-full blur-[200px] pointer-events-none -z-10 transition-colors duration-500 ${
          isWhite 
            ? 'bg-gradient-to-r from-amber-200/20 via-stone-200/25 to-transparent' 
            : 'bg-gradient-to-r from-zinc-800/15 via-slate-900/20 to-transparent'
        }`}
      />

      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center space-y-6 sm:space-y-8 relative z-20">
        
        {/* ============================================================== */}
        {/* HARMONIOUS MONUMENTAL TITLE LOCKUP MATCHING WEBSITE SIGNATURE  */}
        {/* Clean, perfectly centered, elevated typography                  */}
        {/* ============================================================== */}
        <div className="w-full flex items-center justify-center">
          <SectionTitleLockup
            title="PORTFOLIO"
            subtitle="REPERTOIRE & CHOREOGRAPHY ARCHIVE"
            align="center"
            theme={theme}
          />
        </div>

        {/* ============================================================== */}
        {/* 3D BALANCED AMPHITHEATER CAROUSEL (Center prominent, smooth)    */}
        {/* ============================================================== */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="portfolio-3d-stage"
          role="region"
          aria-label="3D Portfolio Repertoire Archive"
        >
          <div className="portfolio-3d-track">
            {ARCHIVE_IMAGES.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="portfolio-curved-card"
              >
                <div className="portfolio-card-shell">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={`Portfolio Visual ${idx + 1}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                      className="portfolio-card-image"
                    />
                  )}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                    <div className="w-full flex justify-between">
                      <span className={`w-2 h-2 border-t border-l ${isWhite ? 'border-black/20' : 'border-white/20'}`} />
                      <span className={`w-2 h-2 border-t border-r ${isWhite ? 'border-black/20' : 'border-white/20'}`} />
                    </div>
                    <div className="w-full flex justify-between">
                      <span className={`w-2 h-2 border-b border-l ${isWhite ? 'border-black/20' : 'border-white/20'}`} />
                      <span className={`w-2 h-2 border-b border-r ${isWhite ? 'border-black/20' : 'border-white/20'}`} />
                    </div>
                    <div className="portfolio-card-glare" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Swipe to Explore Bar — Crisp, high-contrast, fully visible in both themes */}
        <div className="flex sm:hidden items-center justify-center gap-2.5 mt-2 pb-2 select-none">
          <span className={`h-px w-8 transition-colors ${isWhite ? 'bg-stone-900' : 'bg-white/50'}`} />
          <span className={`text-[10px] tracking-[0.28em] uppercase font-['Montserrat',_sans-serif] font-black transition-colors ${
            isWhite ? 'text-stone-950 font-black' : 'text-white font-bold'
          }`}>
            SWIPE TO EXPLORE
          </span>
          <span className={`h-px w-8 transition-colors ${isWhite ? 'bg-stone-900' : 'bg-white/50'}`} />
        </div>

      </div>

    </section>
  );
};
