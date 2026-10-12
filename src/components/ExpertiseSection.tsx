import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useScroll, AnimatePresence } from 'framer-motion';

interface ExpertiseSectionProps {
  theme?: 'dark' | 'white';
  onOpenInquiry: (topic?: string) => void;
  onPlayVideo?: (title: string, url: string) => void;
}

interface GroupDefinition {
  key: 'PERFORM' | 'CREATE' | 'EMPOWER';
  subheading: string;
  items: {
    id: string;
    name: string;
    videoUrl?: string;
  }[];
}

const GROUPS_DATA: GroupDefinition[] = [
  {
    key: 'PERFORM',
    subheading: 'PERFORM',
    items: [
      {
        id: 'perf-1',
        name: 'Solo Performances',
        videoUrl: 'https://www.youtube-nocookie.com/embed/Gfel5TxDMd4?autoplay=1&mute=0'
      },
      {
        id: 'perf-2',
        name: 'Couple / Duo Performances',
        videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0'
      },
      {
        id: 'perf-3',
        name: 'Family & Group Performances',
        videoUrl: 'https://www.youtube-nocookie.com/embed/3JZ_D3ELwOQ?autoplay=1&mute=0'
      },
      {
        id: 'perf-4',
        name: 'Flash Mob',
        videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0'
      },
      {
        id: 'perf-5',
        name: 'Surprise Entries',
        videoUrl: 'https://www.youtube-nocookie.com/embed/3JZ_D3ELwOQ?autoplay=1&mute=0'
      },
    ]
  },
  {
    key: 'CREATE',
    subheading: 'CREATE',
    items: [
      {
        id: 'create-1',
        name: 'Customized Choreography',
        videoUrl: 'https://www.youtube-nocookie.com/embed/fXbSqDn8F7Y?autoplay=1&mute=0'
      },
      {
        id: 'create-2',
        name: 'Song Editing & Mashups',
        videoUrl: 'https://www.youtube-nocookie.com/embed/SdJIt9qSbKE?autoplay=1&mute=0'
      },
      {
        id: 'create-3',
        name: 'Performance Planning',
        videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0'
      },
      {
        id: 'create-4',
        name: 'Stage Formations',
        videoUrl: 'https://www.youtube-nocookie.com/embed/fXbSqDn8F7Y?autoplay=1&mute=0'
      },
      {
        id: 'create-5',
        name: 'Online & Offline Sessions',
        videoUrl: 'https://www.youtube-nocookie.com/embed/gpsXeze2uyw?autoplay=1&mute=0'
      },
    ]
  },
  {
    key: 'EMPOWER',
    subheading: 'EMPOWER',
    items: [
      {
        id: 'emp-1',
        name: 'Fun Sessions',
        videoUrl: 'https://www.youtube-nocookie.com/embed/oY95q0dtPJg?autoplay=1&mute=0'
      },
      {
        id: 'emp-2',
        name: 'Stage Confidence',
        videoUrl: 'https://www.youtube-nocookie.com/embed/SdJIt9qSbKE?autoplay=1&mute=0'
      },
      {
        id: 'emp-3',
        name: 'Easy-to-Learn Steps',
        videoUrl: 'https://www.youtube-nocookie.com/embed/oY95q0dtPJg?autoplay=1&mute=0'
      },
      {
        id: 'emp-4',
        name: 'Creative Concepts',
        videoUrl: 'https://www.youtube-nocookie.com/embed/ynOFRYnJCfM?autoplay=1&mute=0'
      },
      {
        id: 'emp-5',
        name: 'Personal Attention',
        videoUrl: 'https://www.youtube-nocookie.com/embed/gpsXeze2uyw?autoplay=1&mute=0'
      },
    ]
  }
];

// Flattened list for global index lookup
const ALL_ITEMS = GROUPS_DATA.flatMap((g) =>
  g.items.map((it) => ({ ...it, groupKey: g.key }))
);

// Valid photos for WE section (1, 2, 3, 4, 5, 8; no 6 or 7)
const WE_RANDOM_IMAGES = [
  '/classes/1.jpg',
  '/classes/2.jpg',
  '/classes/3.jpg',
  '/classes/4.jpg',
  '/classes/5.jpg',
  '/classes/8.jpg',
];

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({
  theme = 'dark',
  onOpenInquiry,
  onPlayVideo
}) => {
  const isWhite = theme === 'white';
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Group references for scroll calculation
  const groupRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Dynamic Scroll Parallax on Section Scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const rawScrollY = useTransform(scrollYProgress, [0.1, 0.9], [-40, 40]);
  const scrollParallaxY = useSpring(rawScrollY, { damping: 22, stiffness: 120 });

  // Tactile 3D Tilt for card on mouse hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 150, mass: 0.35 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

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

  // Scroll detection to smoothly update the active subheading (PERFORM -> CREATE -> EMPOWER)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Centered reading line trigger
          const triggerY = window.innerHeight * 0.48;
          let matchedIndex = 0;

          for (let i = 0; i < groupRefs.length; i++) {
            const el = groupRefs[i].current;
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerY) {
                matchedIndex = i;
              }
            }
          }

          setActiveGroupIndex((prev) => {
            if (prev !== matchedIndex) {
              // Update default active image for this group if current item is outside it
              setActiveIdx((curIdx) => {
                const currentItem = ALL_ITEMS[curIdx];
                if (currentItem && currentItem.groupKey !== GROUPS_DATA[matchedIndex].key) {
                  const firstOfGroup = ALL_ITEMS.findIndex(
                    (it) => it.groupKey === GROUPS_DATA[matchedIndex].key
                  );
                  return firstOfGroup !== -1 ? firstOfGroup : curIdx;
                }
                return curIdx;
              });
              return matchedIndex;
            }
            return prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeItem = ALL_ITEMS[activeIdx] || ALL_ITEMS[0];

  const handleCardClick = () => {
    if (activeItem.videoUrl) {
      onPlayVideo?.(activeItem.name, activeItem.videoUrl);
    } else {
      onOpenInquiry(`Commission Inquiry: ${activeItem.name}`);
    }
  };

  return (
    <section 
      id="expertise" 
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-32 select-none relative flex flex-col justify-start border-none bg-transparent"
    >
      {/* Atmospheric Ambient Glow (Only in Dark Theme) */}
      {!isWhite && (
        <div 
          aria-hidden="true" 
          className="absolute top-1/3 right-1/4 w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full blur-[180px] pointer-events-none -z-10 bg-gradient-to-l from-zinc-800/15 via-slate-900/20 to-transparent" 
        />
      )}

      <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-8 md:px-14 lg:px-20 relative z-20">
        
        {/* Centered Composition: Sticky Image with Hero Title + Right-side Repertoire List */}
        <div className="flex flex-row items-start justify-center relative w-full max-w-5xl mx-auto gap-2 sm:gap-4 md:gap-8">
          
          {/* ============================================================ */}
          {/* STICKY COLUMN: Vertically centered in reading viewport       */}
          {/* Contains WE [PERFORM | CREATE | EMPOWER] + 3D Tilt Image     */}
          {/* Moves seamlessly together with scroll parallax               */}
          {/* ============================================================ */}
          <div className="sticky top-[16vh] sm:top-[18vh] md:top-[20vh] self-start shrink-0 w-[48%] sm:w-[46%] md:w-[44%] max-w-[460px] z-10">
            
            {/* Ambient Backlight Halo (Only in Dark Theme) */}
            {!isWhite && (
              <div 
                aria-hidden="true" 
                className="absolute inset-0 rounded-2xl blur-[75px] pointer-events-none -z-10 bg-gradient-to-tr from-white/10 via-zinc-700/15 to-transparent" 
              />
            )}

            <motion.div 
              style={{ y: scrollParallaxY, perspective: '1000px' }} 
              className="relative w-full"
            >
              
              {/* ============================================================ */}
              {/* MONUMENTAL HERO TITLE: WE [PERFORM | CREATE | EMPOWER]       */}
              {/* Overlapping the common image with crystal-clear contrast     */}
              {/* ============================================================ */}
              <div className="relative -mb-6 sm:-mb-8 md:-mb-10 pl-2 sm:pl-3 select-none pointer-events-none z-30">
                <div className="inline-flex items-baseline gap-2.5 sm:gap-3.5 md:gap-4 px-2 sm:px-3 py-1">
                  
                  {/* Primary Heading: WE */}
                  <span className={`font-['Bebas_Neue',_'Montserrat',_sans-serif] font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-none tracking-[0.03em] ${
                    isWhite 
                      ? 'text-[#0E0E10] drop-shadow-[0_2px_14px_rgba(255,255,255,1)] drop-shadow-[0_1px_3px_rgba(255,255,255,1)]' 
                      : 'text-white drop-shadow-[0_4px_24px_rgba(0,0,0,1)] drop-shadow-[0_1px_4px_rgba(0,0,0,1)]'
                  }`}>
                    WE
                  </span>

                  {/* Dynamic Interactive Subheading: PERFORM / CREATE / EMPOWER */}
                  <div className="flex items-baseline overflow-visible">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={GROUPS_DATA[activeGroupIndex].subheading}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className={`font-['Bebas_Neue',_'Montserrat',_sans-serif] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[3.25rem] leading-none tracking-[0.08em] uppercase ${
                          isWhite 
                            ? 'text-[#B87A18] drop-shadow-[0_2px_14px_rgba(255,255,255,1)] drop-shadow-[0_1px_3px_rgba(255,255,255,1)]' 
                            : 'text-[#dfba73] drop-shadow-[0_4px_24px_rgba(0,0,0,1)] drop-shadow-[0_1px_4px_rgba(0,0,0,1)]'
                        }`}
                      >
                        {GROUPS_DATA[activeGroupIndex].subheading}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                </div>
              </div>

              {/* The Interactive Tilt Common Image Card */}
              <motion.div
                ref={cardRef}
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformStyle: 'preserve-3d',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleCardClick}
                className={`relative w-full h-[clamp(340px,52svh,540px)] aspect-[4/5] overflow-hidden cursor-pointer group transition-all duration-300 border-none ${
                  isWhite ? 'bg-white shadow-[0_15px_45px_rgba(0,0,0,0.08)]' : 'bg-stone-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)]'
                }`}
              >
                {/* Random Valid Image for WE Section (1, 2, 3, 4, 5, 8; NO 6 or 7) */}
                <img
                  src={WE_RANDOM_IMAGES[activeIdx % WE_RANDOM_IMAGES.length]}
                  alt="WE Repertoire"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105"
                />

                {/* Clean Architectural Video Preview Stage Shell */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                  <div className="w-full flex justify-between">
                    <span className="w-2.5 h-2.5 border-t border-l border-white/25" />
                    <span className="w-2.5 h-2.5 border-t border-r border-white/25" />
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="w-2.5 h-2.5 border-b border-l border-white/25" />
                    <span className="w-2.5 h-2.5 border-b border-r border-white/25" />
                  </div>
                </div>

                {/* Top Overlay Scrim for Title Legibility */}
                <div className={`absolute inset-x-0 top-0 h-28 pointer-events-none z-10 ${
                  isWhite ? 'bg-gradient-to-b from-white/35 via-white/10 to-transparent' : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent'
                }`} />

                {/* Bottom Scrim */}
                <div className={`absolute inset-0 pointer-events-none ${
                  isWhite ? 'bg-gradient-to-t from-stone-900/35 via-transparent to-transparent' : 'bg-gradient-to-t from-black/60 via-transparent to-black/20'
                }`} />

                {/* Right Edge Shadow on Image (Only in Dark Theme, no boundary light in Light Theme) */}
                {!isWhite && (
                  <div className="absolute inset-y-0 right-0 w-24 sm:w-36 pointer-events-none z-15 bg-gradient-to-l from-black/90 via-black/55 to-transparent" />
                )}

              </motion.div>
            </motion.div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Expansive Repertoire List                      */}
          {/* Clean minimal items without added labels or numbers          */}
          {/* ============================================================ */}
          <div className="flex-1 -ml-4 sm:-ml-8 md:-ml-10 z-20 space-y-12 sm:space-y-16 py-4 sm:py-8 pl-2 sm:pl-4 pointer-events-auto">
            
            {GROUPS_DATA.map((group, groupIdx) => (
              <div 
                key={group.key} 
                ref={groupRefs[groupIdx]}
                className="space-y-2.5 sm:space-y-3.5 scroll-mt-40"
              >
                {/* 5 Repertoire Items */}
                <div className="space-y-2.5 sm:space-y-3.5">
                  {group.items.map((item) => {
                    const globalIdx = ALL_ITEMS.findIndex(x => x.id === item.id);
                    const isSelected = activeIdx === globalIdx;

                    return (
                      <div
                        key={item.id}
                        onMouseEnter={() => {
                          setActiveIdx(globalIdx);
                          setActiveGroupIndex(groupIdx);
                        }}
                        onClick={() => {
                          setActiveIdx(globalIdx);
                          setActiveGroupIndex(groupIdx);
                          if (item.videoUrl) {
                            onPlayVideo?.(item.name, item.videoUrl);
                          } else {
                            onOpenInquiry(`Commission: ${item.name}`);
                          }
                        }}
                        className="cursor-pointer transition-all duration-200 py-1 flex items-center group"
                      >
                        <h3
                          className={`text-base sm:text-lg md:text-xl lg:text-[1.45rem] font-['Bebas_Neue',_'Montserrat',_sans-serif] uppercase tracking-[0.14em] scale-y-[1.12] transition-all duration-200 select-none ${
                            isSelected
                              ? isWhite
                                ? 'text-stone-950 font-bold translate-x-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.12)]'
                                : 'text-white font-bold translate-x-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]'
                              : isWhite
                                ? 'text-stone-400 hover:text-stone-800 font-normal'
                                : 'text-stone-400 hover:text-white font-normal'
                          }`}
                        >
                          {item.name}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Inquire Action Button */}
            <div className="pt-4 sm:pt-6">
              <button
                onClick={() => onOpenInquiry(`Commission Inquiry: ${activeItem.name}`)}
                className={`group relative inline-flex items-center justify-between gap-3 px-6 sm:px-8 py-3 rounded-full transition-all duration-300 cursor-pointer shadow-xl ${
                  isWhite ? 'bg-black text-white hover:bg-stone-800' : 'bg-white text-black hover:bg-stone-200'
                }`}
              >
                <span className="font-['Montserrat',_sans-serif] text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em]">INQUIRE</span>
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow shrink-0 ${
                  isWhite ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 inline-block shrink-0">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </div>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
