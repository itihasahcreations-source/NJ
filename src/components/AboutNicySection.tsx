import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 8 Active Class Slides
// WACKING is active with /classes/8.jpg
// TOLLYWOOD and BOLLYWOOD are empty architectural panels as requested
export interface ClassSlideItem {
  id: string;
  label: string;
  image: string;
}

export const CLASS_SLIDES: ClassSlideItem[] = [
  { id: 'class-1', label: 'HIP HOP', image: '/classes/1.jpg' },
  { id: 'class-2', label: 'BREAKDANCING', image: '/classes/2.jpg' },
  { id: 'class-3', label: 'POPPING & LOCKING', image: '/classes/3.jpg' },
  { id: 'class-4', label: 'FREESTYLE & BATTLE TACTICS', image: '/classes/4.jpg' },
  { id: 'class-8', label: 'WACKING', image: '/classes/8.jpg' },
  { id: 'class-5', label: 'CHOREO & PERFORMANCE', image: '/classes/5.jpg' },
  { id: 'class-6', label: 'TOLLYWOOD', image: '' },
  { id: 'class-7', label: 'BOLLYWOOD', image: '' },
];

// Connected Loop: First and Last connected infinitely in a continuous cylindrical ring
const VIRTUAL_SLIDES: (ClassSlideItem & { virtualKey: string })[] = [
  ...CLASS_SLIDES.map((item, i) => ({ ...item, virtualKey: `loop1-${item.id}-${i}` })),
  ...CLASS_SLIDES.map((item, i) => ({ ...item, virtualKey: `loop2-${item.id}-${i}` })),
];

export interface DaySchedule {
  id: string;
  short: string;
  full: string;
  classes: { time: string; name: string }[];
}

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    id: 'mon',
    short: 'MON',
    full: 'MONDAY',
    classes: [
      { time: '08:30', name: 'Dance Fitness' },
      { time: '09:30', name: 'Dance Fitness' },
      { time: '04:30', name: 'Toddlers' },
      { time: '05:15', name: 'Kids' },
      { time: '06:00', name: 'Dance Fitness' },
      { time: '07:00', name: 'Tollywood' },
      { time: '08:00', name: 'Semi Classical' },
    ],
  },
  {
    id: 'tue',
    short: 'TUE',
    full: 'TUESDAY',
    classes: [
      { time: '08:30', name: 'Dance Fitness' },
      { time: '09:30', name: 'Dance Fitness' },
      { time: '04:30', name: 'Toddlers' },
      { time: '05:15', name: 'Kids' },
      { time: '06:00', name: 'Dance Fitness' },
      { time: '07:00', name: 'Bollywood' },
      { time: '08:00', name: 'Contemporary' },
    ],
  },
  {
    id: 'wed',
    short: 'WED',
    full: 'WEDNESDAY',
    classes: [
      { time: '08:30', name: 'Dance Fitness' },
      { time: '09:30', name: 'Dance Fitness' },
      { time: '04:30', name: 'Toddlers' },
      { time: '05:15', name: 'Kids' },
      { time: '06:00', name: 'Dance Fitness' },
      { time: '07:00', name: 'Tollywood' },
      { time: '08:00', name: 'Semi Classical' },
    ],
  },
  {
    id: 'thu',
    short: 'THU',
    full: 'THURSDAY',
    classes: [
      { time: '08:30', name: 'Dance Fitness' },
      { time: '09:30', name: 'Dance Fitness' },
      { time: '04:30', name: 'Toddlers' },
      { time: '05:15', name: 'Kids' },
      { time: '06:00', name: 'Dance Fitness' },
      { time: '07:00', name: 'Hip Hop' },
      { time: '08:00', name: 'Contemporary' },
    ],
  },
  {
    id: 'fri',
    short: 'FRI',
    full: 'FRIDAY',
    classes: [
      { time: '08:30', name: 'Dance Fitness' },
      { time: '09:30', name: 'Dance Fitness' },
      { time: '04:30', name: 'Toddlers' },
      { time: '05:15', name: 'Kids' },
      { time: '06:00', name: 'Dance Fitness' },
      { time: '07:00', name: 'Tollywood' },
      { time: '08:00', name: 'Bollywood' },
    ],
  },
];

interface AboutNicySectionProps {
  theme?: 'dark' | 'white';
}

export const AboutNicySection: React.FC<AboutNicySectionProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isInView, setIsInView] = useState(false);

  // Clicking CLASSES title or Schedule button opens the schedule
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // Parallax on CLASSES text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rawLogoY = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const logoY = useSpring(rawLogoY, { stiffness: 100, damping: 25 });

  // Mouse interactive stage physics (fast and responsive with continuous loop)
  const scrollOffset = useRef(0);
  const targetOffset = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const rafId = useRef<number>(0);

  const totalVirtualItems = VIRTUAL_SLIDES.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.08 }
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

  // Fast, smooth mouse interactive RAF update — zero automatic slide, seamless loop!
  useEffect(() => {
    if (!isInView) return;

    const updateStage = () => {
      const diff = targetOffset.current - scrollOffset.current;
      if (Math.abs(diff) > 0.05) {
        scrollOffset.current += diff * 0.18; // fast snappy follow
      } else {
        scrollOffset.current = targetOffset.current;
      }

      const container = stageRef.current;
      if (container) {
        const containerWidth = container.clientWidth;
        const centerX = containerWidth / 2;
        const isMobile = containerWidth < 768;

        const cardWidth = isMobile 
          ? Math.max(160, containerWidth * 0.44) 
          : Math.min(320, Math.max(220, containerWidth * 0.22));
        const gap = isMobile ? 18 : 28;
        const cardStride = cardWidth + gap;
        const cycleWidth = totalVirtualItems * cardStride;
        const halfCycle = cycleWidth / 2;

        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;

          // Infinite cylindrical modulo wrapping connected first to last
          let offset = ((idx * cardStride + scrollOffset.current) % cycleWidth + cycleWidth) % cycleWidth;
          if (offset > halfCycle) offset -= cycleWidth;

          const currentPos = centerX + offset;
          const offsetFromCenter = offset;
          const normDist = offsetFromCenter / (containerWidth * 0.44);
          
          // Original cylindrical amphitheater curve:
          const angleY = Math.max(-36, Math.min(36, -normDist * 28));
          const absDist = Math.abs(normDist);
          const scale = 0.88 + Math.min(0.24, Math.pow(absDist, 1.4) * 0.20);
          const translateZ = Math.min(60, (Math.pow(absDist, 1.6) * 120) - 75);
          const translateY = Math.min(18, Math.pow(absDist, 2) * 8);
          const opacity = absDist > 1.6 ? Math.max(0, 1 - (absDist - 1.6) * 3) : 1;

          cardEl.style.width = `${cardWidth}px`;
          cardEl.style.transform = `translate3d(${currentPos - cardWidth / 2}px, ${translateY}px, ${translateZ}px) rotateY(${angleY}deg) scale(${scale})`;
          cardEl.style.opacity = `${opacity}`;
          cardEl.style.zIndex = `${Math.round(20 - Math.min(15, absDist * 5))}`;
        });
      }

      rafId.current = requestAnimationFrame(updateStage);
    };

    rafId.current = requestAnimationFrame(updateStage);
    return () => cancelAnimationFrame(rafId.current);
  }, [isInView, totalVirtualItems]);

  // Mouse interactivity: moving mouse across stage dynamically pans through the loop
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const container = stageRef.current;
    const isMobile = container.clientWidth < 768;
    const cardWidth = isMobile 
      ? Math.max(160, container.clientWidth * 0.44) 
      : Math.min(320, Math.max(220, container.clientWidth * 0.22));
    const cardStride = cardWidth + (isMobile ? 18 : 28);
    // Span through all 8 cards across stage width
    const totalSpan = 8 * cardStride;
    targetOffset.current = (0.5 - relativeX) * (totalSpan * 0.95);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartOffset.current = targetOffset.current;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 6) {
      hasDragged.current = true;
    }
    // Direct continuous drag tracking (seamless infinite loop)
    targetOffset.current = dragStartOffset.current + deltaX * 1.35;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
  };

  // Step Left / Right Chevrons
  const handleStep = useCallback((direction: -1 | 1) => {
    const container = stageRef.current;
    if (!container) return;
    const isMobile = container.clientWidth < 768;
    const cardWidth = isMobile 
      ? Math.max(160, container.clientWidth * 0.44) 
      : Math.min(320, Math.max(220, container.clientWidth * 0.22));
    const cardStride = cardWidth + (isMobile ? 18 : 28);
    targetOffset.current += -direction * cardStride;
  }, []);

  // Clicking an individual card: open schedule if user was not dragging
  const handleCardClick = () => {
    if (hasDragged.current) return;
    setIsScheduleOpen(true);
  };

  // Mobile swipe handling on Schedule
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
      if (deltaX < 0) {
        setActiveDayIndex((prev) => Math.min(WEEKLY_SCHEDULE.length - 1, prev + 1));
      } else {
        setActiveDayIndex((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const currentScheduleDay = WEEKLY_SCHEDULE[activeDayIndex];

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="Dance Classes & Disciplines"
      className={`about-nicy-section ${isInView ? 'about-nicy-in-view' : ''}`}
    >
      <style>{`
        .about-nicy-section {
          --white: #FFFFFF;
          --gallery-bg: #060608;
          --bronze-accent: #C5A059;

          position: relative;
          width: 100%;
          min-height: 100svh;
          overflow: hidden;
          background-color: var(--gallery-bg);
          color: var(--white);
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 400;
          box-sizing: border-box;
          user-select: none;
          perspective: 1200px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        .about-nicy-top-seam {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: clamp(50px, 8vh, 100px);
          background: ${isWhite 
            ? 'transparent' 
            : 'linear-gradient(to bottom, #060608 0%, rgba(6, 6, 8, 0.45) 50%, transparent 100%)'};
          pointer-events: none;
          z-index: 12;
        }

        .about-nicy-bottom-seam {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: clamp(70px, 12vh, 160px);
          background: ${isWhite 
            ? 'transparent' 
            : 'linear-gradient(to top, #060608 0%, rgba(6, 6, 8, 0.5) 45%, transparent 100%)'};
          pointer-events: none;
          z-index: 12;
        }

        .about-nicy-ambient-canvas {
          position: absolute;
          inset: 0;
          background: ${isWhite
            ? `radial-gradient(circle at 35% 65%, rgba(197, 160, 89, 0.08) 0%, transparent 55%),
               radial-gradient(circle at 78% 22%, rgba(225, 215, 195, 0.25) 0%, transparent 50%),
               linear-gradient(180deg, #FAF8F5 0%, #F5F1E8 50%, #FAF8F5 100%)`
            : `radial-gradient(circle at 35% 65%, rgba(197, 160, 89, 0.05) 0%, transparent 55%),
               radial-gradient(circle at 78% 22%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
               linear-gradient(180deg, #060608 0%, #09090d 50%, #060608 100%)`};
          z-index: 1;
          pointer-events: none;
        }

        .about-nicy-3d-stage {
          position: relative;
          margin-top: clamp(140px, 18svh, 200px);
          width: 100%;
          height: clamp(310px, 47svh, 450px);
          z-index: 3;
          perspective: 1200px;
          perspective-origin: 50% 50%;
          overflow: visible;
          cursor: grab;
          touch-action: pan-y;
        }

        .about-nicy-3d-stage:active {
          cursor: grabbing;
        }

        .about-nicy-3d-track {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .about-nicy-curved-card {
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform;
          transform-style: preserve-3d;
        }

        .about-nicy-card-shell {
          width: 100%;
          aspect-ratio: 0.70;
          border-radius: 0px !important;
          overflow: hidden;
          background-color: ${isWhite ? '#FFFFFF' : '#0c0c10'};
          position: relative;
          border: 1px solid ${isWhite ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)'};
          box-shadow: ${isWhite ? '0 16px 36px rgba(0, 0, 0, 0.06)' : '0 16px 36px rgba(0, 0, 0, 0.85)'};
          transition: border-color 0.25s ease, background-color 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-nicy-curved-card:hover .about-nicy-card-shell {
          border-color: ${isWhite ? 'rgba(0, 0, 0, 0.35)' : 'rgba(255, 255, 255, 0.4)'};
          background-color: ${isWhite ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)'};
        }

        .about-nicy-card-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.06) 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.2) 100%
          );
          pointer-events: none;
        }

        .about-nicy-card-caption {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          pointer-events: none;
        }

        .about-nicy-caption-label {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(9px, 0.75vw, 11px);
          font-weight: 600;
          letter-spacing: 0.18em;
          color: ${isWhite ? '#141312' : '#FFFFFF'};
          text-transform: uppercase;
          white-space: nowrap;
          text-shadow: ${isWhite ? '0 1px 2px rgba(255, 255, 255, 0.8)' : '0 2px 6px rgba(0, 0, 0, 0.8)'};
        }

        /* MONUMENTAL CENTER TOP PLACEMENT FOR CLASSES TITLE (Clickable Trigger) */
        .about-nicy-hairline-lockup {
          position: absolute;
          top: clamp(60px, 8svh, 95px);
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          opacity: 0;
          transform: translateY(0px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-nicy-monolith-relative-stage {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.25s ease;
        }

        .about-nicy-monolith-relative-stage:hover {
          transform: scale(1.02);
        }

        .about-nicy-monolith-word {
          font-family: 'Bebas Neue', 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: clamp(52px, 7.5vw, 114px);
          line-height: 0.88;
          letter-spacing: clamp(0.04em, 0.1vw, 0.08em);
          text-transform: uppercase;
          color: ${isWhite ? '#141312 !important' : '#FFFFFF !important'};
          display: inline-block;
          transform: scaleY(1.26);
          transform-origin: center center;
          filter: ${isWhite ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08))' : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))'};
          user-select: none;
          white-space: nowrap;
        }

        .about-nicy-logo-centered-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 3;
        }

        .about-nicy-signature-logo {
          width: 85%;
          max-width: 90%;
          height: auto;
          max-height: 150%;
          object-fit: contain;
          display: block;
          filter: ${isWhite 
            ? 'brightness(0) invert(1) drop-shadow(0 1px 2px rgba(255, 255, 255, 0.95))' 
            : 'brightness(0) saturate(100%) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.95))'};
        }

        @media (max-width: 767px) {
          .about-nicy-3d-stage {
            margin-top: clamp(120px, 16svh, 160px);
          }
          .about-nicy-hairline-lockup {
            top: clamp(45px, 6svh, 70px);
          }
          .about-nicy-monolith-word {
            font-size: clamp(38px, 9.5vw, 54px);
            letter-spacing: 0.06em;
            transform: scaleY(1.18);
          }
          .about-nicy-signature-logo {
            width: 88%;
            max-width: 92%;
          }
        }

        .about-nicy-in-view .about-nicy-hairline-lockup {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Top & Bottom Seams */}
      <div className="about-nicy-top-seam" aria-hidden="true" />
      <div className="about-nicy-bottom-seam" aria-hidden="true" />

      {/* Ambient Canvas */}
      <div className="about-nicy-ambient-canvas" aria-hidden="true" />

      {/* Monumental CLASSES Lockup with Laser-cut signature logo overlay */}
      <motion.div 
        style={{ y: logoY }}
        className="about-nicy-hairline-lockup"
      >
        <button
          type="button"
          onClick={() => setIsScheduleOpen((prev) => !prev)}
          className="about-nicy-monolith-relative-stage focus:outline-none cursor-pointer"
          title="Click to view Schedule"
          aria-label="View Schedule"
        >
          <span className="about-nicy-monolith-word">CLASSES</span>

          <div className="about-nicy-logo-centered-overlay">
            <img
              src="/logo-light.png"
              alt="Nicy Joseph"
              className="about-nicy-signature-logo"
            />
          </div>
        </button>
      </motion.div>

      {/* 3D Cylindrical Interactive Carousel (Connected First to Last, WACKING Visible, Tollywood & Bollywood Empty) */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="about-nicy-3d-stage"
        role="region"
        aria-label="3D Classes Repertoire"
      >
        <div className="about-nicy-3d-track">
          {VIRTUAL_SLIDES.map((item, idx) => (
            <div
              key={item.virtualKey}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className="about-nicy-curved-card cursor-pointer"
              onClick={handleCardClick}
              title={`View ${item.label} Schedule`}
            >
              <div className="about-nicy-card-shell">
                {item.image ? (
                  /* Active photo (Hip Hop, Breakdancing, Popping & Locking, Freestyle, Wacking, Choreo) */
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                    className="w-full h-full object-cover rounded-none brightness-[0.96] contrast-[1.04]"
                  />
                ) : (
                  /* Empty Architectural Panel for Tollywood & Bollywood */
                  <div className="w-full h-full flex flex-col items-center justify-between p-6 bg-white/[0.015] border border-white/[0.08] relative select-none">
                    <div className="w-full flex justify-between">
                      <span className="w-2.5 h-2.5 border-t border-l border-white/25" />
                      <span className="w-2.5 h-2.5 border-t border-r border-white/25" />
                    </div>

                    <div className="flex flex-col items-center justify-center text-center my-auto opacity-45">
                      <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center mb-2.5 text-white/50">
                        <span className="text-[11px] font-mono leading-none">+</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-mono text-white/60 font-semibold">
                        STUDIO LAB
                      </span>
                    </div>

                    <div className="w-full flex justify-between">
                      <span className="w-2.5 h-2.5 border-b border-l border-white/25" />
                      <span className="w-2.5 h-2.5 border-b border-r border-white/25" />
                    </div>
                  </div>
                )}

                {/* Subtle aesthetic laser-cut corner markers */}
                <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
                <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/20 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/20 pointer-events-none" />
                
                <div className="about-nicy-card-glare" />
              </div>

              <div className="about-nicy-card-caption">
                <span className="about-nicy-caption-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Luxury Navigation Chevrons on Carousel Sides */}
        <div className="absolute inset-y-0 left-2 sm:left-6 flex items-center z-30 pointer-events-none">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleStep(-1); }}
            aria-label="Previous class"
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto backdrop-blur-md cursor-pointer border ${
              isWhite
                ? 'bg-white/80 text-black border-black/10 hover:bg-white hover:border-black/30 shadow-sm'
                : 'bg-black/60 text-white/90 border-white/15 hover:bg-white/10 hover:border-white/40 hover:text-white shadow-lg'
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 -translate-x-[1px]" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-2 sm:right-6 flex items-center z-30 pointer-events-none">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleStep(1); }}
            aria-label="Next class"
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto backdrop-blur-md cursor-pointer border ${
              isWhite
                ? 'bg-white/80 text-black border-black/10 hover:bg-white hover:border-black/30 shadow-sm'
                : 'bg-black/60 text-white/90 border-white/15 hover:bg-white/10 hover:border-white/40 hover:text-white shadow-lg'
            }`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 translate-x-[1px]" />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MINIMAL SCHEDULE TRIGGER: Pure text and arrow                  */}
      {/* ============================================================== */}
      <div className="flex justify-center mt-5 sm:mt-7 z-25 relative">
        <button
          type="button"
          onClick={() => setIsScheduleOpen((prev) => !prev)}
          className={`group inline-flex items-center gap-2 cursor-pointer transition-opacity duration-300 hover:opacity-100 ${
            isWhite
              ? 'text-[#141312]/80 hover:text-black'
              : 'text-[#E8E8E3]/80 hover:text-white'
          }`}
          aria-expanded={isScheduleOpen}
          aria-controls="classes-schedule"
        >
          <span className="font-['Bebas_Neue',_'Montserrat',_sans-serif] tracking-[0.22em] text-sm sm:text-base md:text-lg uppercase font-bold">
            {isScheduleOpen ? 'HIDE SCHEDULE' : 'WEEKLY SCHEDULE'}
          </span>
          <span className={`text-[10px] sm:text-xs transition-transform duration-300 select-none ${isScheduleOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* MERGED SCHEDULE SECTION: Under carousel, opens permanently on click */}
      {/* Minimal, elegant, small typography layout                       */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isScheduleOpen && (
          <motion.div
            id="classes-schedule"
            initial={{ opacity: 0, y: 24, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full max-w-3xl mx-auto px-4 sm:px-6 z-20 pb-16 pt-8 mt-2"
          >
            {/* Minimal Horizontal Navigation: MON · TUE · WED · THU · FRI */}
            <div className="flex items-center justify-between border-b border-neutral-800/40 border-stone-200/60 pb-3 mb-6">
              <span className={`text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase font-semibold ${
                isWhite ? 'text-stone-400' : 'text-white/40'
              }`}>
                SCHEDULE
              </span>

              <nav aria-label="Schedule days" className="flex items-center gap-1 sm:gap-2">
                {WEEKLY_SCHEDULE.map((day, idx) => {
                  const isActive = idx === activeDayIndex;
                  return (
                    <React.Fragment key={day.id}>
                      <button
                        type="button"
                        onClick={() => setActiveDayIndex(idx)}
                        className={`relative py-1 px-1.5 sm:px-2.5 text-[11px] sm:text-xs tracking-[0.18em] uppercase font-bold transition-all duration-200 cursor-pointer focus:outline-none ${
                          isActive
                            ? isWhite
                              ? 'text-black'
                              : 'text-white'
                            : isWhite
                            ? 'text-stone-400 hover:text-stone-700'
                            : 'text-white/35 hover:text-white/70'
                        }`}
                      >
                        <span>{day.short}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeClassesDayPill"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            className={`absolute bottom-0 inset-x-1.5 h-[1.5px] rounded-full ${
                              isWhite ? 'bg-black' : 'bg-white'
                            }`}
                          />
                        )}
                      </button>

                      {idx < WEEKLY_SCHEDULE.length - 1 && (
                        <span
                          aria-hidden="true"
                          className={`text-[9px] select-none pointer-events-none ${
                            isWhite ? 'text-stone-300' : 'text-white/20'
                          }`}
                        >
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>
            </div>

            {/* Active Day Name & Class Listings: TIME — CLASS (Minimal Small Layout) */}
            <div className="relative">
              <div className="flex items-baseline justify-between mb-3">
                <span className={`font-['Bebas_Neue',_'Montserrat',_sans-serif] text-xl sm:text-2xl tracking-[0.14em] uppercase font-black scale-y-[1.1] ${
                  isWhite ? 'text-[#141312]' : 'text-white'
                }`}>
                  {currentScheduleDay.full}
                </span>

                <span className={`sm:hidden text-[9px] tracking-widest uppercase ${
                  isWhite ? 'text-stone-400' : 'text-white/30'
                }`}>
                  Swipe
                </span>
              </div>

              {/* Minimal List */}
              <div className="flex flex-col divide-y divide-neutral-800/40 divide-stone-200/60 border-t border-b border-neutral-800/40 border-stone-200/60">
                {currentScheduleDay.classes.map((item) => (
                  <div
                    key={`${currentScheduleDay.id}-${item.time}-${item.name}`}
                    className={`py-2 sm:py-2.5 flex items-center justify-between transition-colors duration-200 ${
                      isWhite ? 'hover:bg-black/[0.02]' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 font-['Montserrat',_sans-serif]">
                      <span className={`font-mono text-xs sm:text-sm tracking-wider font-semibold ${
                        isWhite ? 'text-stone-500' : 'text-white/50'
                      }`}>
                        {item.time}
                      </span>
                      <span className={`text-xs select-none ${
                        isWhite ? 'text-stone-300' : 'text-white/30'
                      }`}>
                        —
                      </span>
                      <span className={`text-xs sm:text-sm font-medium tracking-tight ${
                        isWhite ? 'text-[#1A1A1A]' : 'text-white/90'
                      }`}>
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
