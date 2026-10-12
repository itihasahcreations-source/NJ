import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Curated Archive Slide Panels populated with random valid photos (1, 2, 3, 4, 5, 8; no 6 or 7)
const VALID_ARCHIVE_PHOTOS = [
  '/classes/1.jpg',
  '/classes/2.jpg',
  '/classes/3.jpg',
  '/classes/4.jpg',
  '/classes/5.jpg',
  '/classes/8.jpg',
];

const ARCHIVE_IMAGES = Array.from({ length: 20 }, (_, i) => ({
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

  // Parallax on ABOUT bottom text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const rawLogoY = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const logoY = useSpring(rawLogoY, { stiffness: 100, damping: 25 });

  // Pure Interactive Scroll Physics (Identical to first menu: mouse pan & drag, zero auto-scroll)
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
          ? Math.max(130, containerWidth * 0.35) 
          : Math.min(245, Math.max(168, containerWidth * 0.178));
        const gap = isMobile ? 14 : 20;
        const cardStride = cardWidth + gap;
        const totalTrackWidth = totalItems * cardStride;
        const startX = centerX - totalTrackWidth / 2 + cardWidth / 2;

        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;

          const itemBasePos = startX + idx * cardStride;
          const currentPos = itemBasePos + scrollOffset.current;
          
          // Normalized horizontal progress across stage (0 on left near hand to 1 on right above ABOUT)
          const progressX = Math.max(0, Math.min(1, currentPos / containerWidth));

          // Hand-flowing perspective: Left side is small (size of her hand ~0.50), Right side expands +30% bigger (~1.55)
          const scale = 0.50 + progressX * 1.05;
          const translateZ = -80 + progressX * 190;
          // Curve gently downwards on the right so it physically overlaps 10% behind the ABOUT text
          const translateY = Math.sin(progressX * Math.PI) * -20 + progressX * 82;
          const angleY = (0.38 - progressX) * 44;

          const offsetFromCenter = currentPos - centerX;
          const normDist = Math.abs(offsetFromCenter / (containerWidth * 0.45));
          const opacity = normDist > 1.8 ? Math.max(0, 1 - (normDist - 1.8) * 2.5) : 1;

          cardEl.style.width = `${cardWidth}px`;
          cardEl.style.transform = `translate3d(${currentPos - cardWidth / 2}px, ${translateY}px, ${translateZ}px) rotateY(${angleY}deg) scale(${scale})`;
          cardEl.style.opacity = `${opacity}`;
          cardEl.style.zIndex = `${Math.round(4 + progressX * 10)}`;
        });
      }

      rafId.current = requestAnimationFrame(updateStage);
    };

    rafId.current = requestAnimationFrame(updateStage);
    return () => cancelAnimationFrame(rafId.current);
  }, [isInView, totalItems]);

  // Interactive Mouse Pan (Identical to first menu)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const maxPan = (totalItems - 1) * 60;
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
    const cardWidth = isMobile ? containerWidth * 0.38 : containerWidth * 0.195;
    const maxBound = ((totalItems - 1) * (cardWidth + 24)) / 2 + 50;
    
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
      aria-label="About Nicy Joseph"
      className={`about-portfolio-section ${isInView ? 'about-portfolio-in-view' : ''}`}
    >
      <style>{`
        .about-portfolio-section {
          --white: #FFFFFF;
          --gallery-bg: #040406;

          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 100svh;
          max-height: 100svh;
          overflow: hidden;
          background-color: var(--gallery-bg);
          color: var(--white);
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
          user-select: none;
          perspective: 1200px;
        }

        .about-portfolio-top-seam {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: clamp(50px, 8vh, 100px);
          background: ${isWhite 
            ? 'transparent' 
            : 'linear-gradient(to bottom, #040406 0%, rgba(4, 4, 6, 0.45) 50%, transparent 100%)'};
          pointer-events: none;
          z-index: 15;
        }

        .about-portfolio-bottom-seam {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: clamp(70px, 12vh, 160px);
          background: ${isWhite 
            ? 'transparent' 
            : 'linear-gradient(to top, #040406 0%, rgba(4, 4, 6, 0.5) 45%, transparent 100%)'};
          pointer-events: none;
          z-index: 15;
        }

        .about-portfolio-ambient-canvas {
          position: absolute;
          inset: 0;
          background: ${isWhite
            ? `
              radial-gradient(circle at 25% 65%, rgba(230, 225, 215, 0.45) 0%, transparent 55%),
              radial-gradient(circle at 80% 25%, rgba(235, 230, 220, 0.4) 0%, transparent 50%),
              linear-gradient(180deg, #FAF8F5 0%, #F5F2EC 50%, #FAF8F5 100%)
            `
            : `
              radial-gradient(circle at 25% 65%, rgba(25, 25, 35, 0.35) 0%, transparent 55%),
              radial-gradient(circle at 80% 25%, rgba(20, 20, 30, 0.3) 0%, transparent 50%),
              linear-gradient(180deg, #040406 0%, #08080c 50%, #040406 100%)
            `};
          z-index: 1;
          pointer-events: none;
        }

        /* 3D CYLINDRICAL STAGE: Generous top spacing, flowing behind ABOUT lockup */
        .about-portfolio-3d-stage {
          position: absolute;
          top: clamp(130px, 19svh, 25svh);
          left: 0;
          right: 0;
          width: 100%;
          height: clamp(360px, 62svh, 560px);
          z-index: 4;
          perspective: 1200px;
          perspective-origin: 50% 50%;
          overflow: visible;
          cursor: grab;
          touch-action: pan-y;
        }

        .about-portfolio-3d-stage:active {
          cursor: grabbing;
        }

        .about-portfolio-3d-track {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .about-portfolio-curved-card {
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform;
          transform-style: preserve-3d;
        }

        .about-portfolio-card-shell {
          width: 100%;
          aspect-ratio: 0.70;
          border-radius: 0px !important;
          overflow: hidden;
          background-color: ${isWhite ? '#F2EDE4' : '#0c0c10'};
          position: relative;
          border: 1px solid ${isWhite ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.12)'};
          box-shadow: ${isWhite ? '0 16px 36px rgba(0, 0, 0, 0.08)' : '0 16px 36px rgba(0, 0, 0, 0.85)'};
          transition: border-color 0.25s ease;
        }

        .about-portfolio-curved-card:hover .about-portfolio-card-shell {
          border-color: ${isWhite ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.35)'};
        }

        .about-portfolio-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 0px !important;
          transition: transform 0.4s ease-out;
        }

        .about-portfolio-curved-card:hover .about-portfolio-card-image {
          transform: scale(1.04);
        }

        .about-portfolio-card-glare {
          position: absolute;
          inset: 0;
          background: ${isWhite
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, transparent 50%, rgba(0, 0, 0, 0.08) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, transparent 50%, rgba(0, 0, 0, 0.4) 100%)'};
          pointer-events: none;
        }

        /* FULL-SCREEN CUTOUT LAYER (HER HAND REACHES UP IN FRONT AT LEFT CORNER) */
        .about-portfolio-cutout-layer {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100vh;
          height: 100svh;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          pointer-events: none;
          z-index: 10;
        }

        .about-portfolio-cutout-image {
          height: clamp(620px, 104svh, 1120px);
          width: auto;
          max-width: 95vw;
          object-fit: contain;
          object-position: bottom left;
          filter: ${isWhite
            ? 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.22))'
            : 'drop-shadow(0 25px 60px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 90px rgba(0, 0, 0, 0.85))'};
          transform: translate3d(0, 0, 0);
        }

        /* MONUMENTAL ABOUT LOCKUP */
        .about-portfolio-hairline-lockup {
          position: absolute;
          right: clamp(24px, 5vw, 84px);
          bottom: max(24px, calc(env(safe-area-inset-bottom, 0px) + clamp(16px, 3.8svh, 42px)));
          z-index: 25;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          pointer-events: none;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-portfolio-monolith-relative-stage {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
        }

        .about-portfolio-monolith-word {
          font-family: 'Bebas Neue', 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: clamp(56px, 7.8vw, 120px);
          line-height: 0.88;
          letter-spacing: clamp(0.04em, 0.1vw, 0.08em);
          text-transform: uppercase;
          color: ${isWhite ? '#141416 !important' : '#FFFFFF !important'};
          display: inline-block;
          transform: scaleY(1.26);
          transform-origin: center right;
          filter: ${isWhite ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08))' : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))'};
          user-select: none;
          white-space: nowrap;
        }

        .about-portfolio-logo-centered-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 3;
        }

        .about-portfolio-signature-logo {
          width: 85%;
          max-width: 90%;
          height: auto;
          max-height: 150%;
          object-fit: contain;
          display: block;
          filter: ${isWhite
            ? 'brightness(0) invert(1) saturate(100%) drop-shadow(0 1px 2px rgba(255, 255, 255, 0.95))'
            : 'brightness(0) saturate(100%) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.95))'};
        }

        @media (max-width: 767px) {
          .about-portfolio-hairline-lockup {
            right: clamp(16px, 4.5vw, 24px);
            bottom: max(18px, calc(env(safe-area-inset-bottom, 0px) + 14px));
          }
          .about-portfolio-monolith-word {
            font-size: clamp(38px, 9.5vw, 54px);
            letter-spacing: 0.06em;
            transform: scaleY(1.18);
          }
          .about-portfolio-signature-logo {
            width: 88%;
            max-width: 92%;
          }
          .about-portfolio-cutout-image {
            height: clamp(410px, 86svh, 600px);
          }
        }

        .about-portfolio-in-view .about-portfolio-hairline-lockup {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Top & Bottom Seams */}
      <div className="about-portfolio-top-seam" aria-hidden="true" />
      <div className="about-portfolio-bottom-seam" aria-hidden="true" />

      {/* Ambient Canvas */}
      <div className="about-portfolio-ambient-canvas" aria-hidden="true" />

      {/* 3D Cylindrical Interactive Carousel (Pure Interactive Scroll Physics, +30% larger on right above ABOUT) */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="about-portfolio-3d-stage"
        role="region"
        aria-label="3D Portfolio Repertoire Archive"
      >
        <div className="about-portfolio-3d-track">
          {ARCHIVE_IMAGES.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className="about-portfolio-curved-card"
            >
              <div className="about-portfolio-card-shell">
                {item.image && (
                  <img
                    src={item.image}
                    alt={`Archive Visual ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                    className="about-portfolio-card-image"
                  />
                )}
                <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                  <div className="w-full flex justify-between">
                    <span className="w-2 h-2 border-t border-l border-white/20" />
                    <span className="w-2 h-2 border-t border-r border-white/20" />
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="w-2 h-2 border-b border-l border-white/20" />
                    <span className="w-2 h-2 border-b border-r border-white/20" />
                  </div>
                  <div className="about-portfolio-card-glare" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Nicy Cutout PNG (Anchored in Left Corner, Opposite ABOUT) */}
      <div className="about-portfolio-cutout-layer" aria-hidden="true">
        <img
          src="/about-nicy.png"
          alt="Nicy Joseph"
          className="about-portfolio-cutout-image"
        />
      </div>

      {/* Monumental ABOUT Lockup with Laser-cut signature logo overlay */}
      <motion.div 
        style={{ y: logoY }}
        className="about-portfolio-hairline-lockup"
      >
        <div className="about-portfolio-monolith-relative-stage">
          <span className="about-portfolio-monolith-word">ABOUT</span>

          <div className="about-portfolio-logo-centered-overlay">
            <img
              src={isWhite ? '/logo-dark.png' : '/logo-light.png'}
              alt="Nicy Joseph"
              className="about-portfolio-signature-logo"
            />
          </div>
        </div>
      </motion.div>

    </section>
  );
};
