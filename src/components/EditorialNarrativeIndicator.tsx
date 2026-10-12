import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditorialNarrativeIndicatorProps {
  theme?: 'dark' | 'white';
}

interface ChapterData {
  act: string;
  chapter: string;
  quote: string;
  location: string;
}

const CHAPTERS: Record<string, ChapterData> = {
  home: {
    act: 'PROLOGUE',
    chapter: 'THE EMBODIED PRESENCE',
    quote: 'Where architectural stillness ends and cinematic movement begins.',
    location: 'HYDERABAD · JUBILEE HILLS'
  },
  about: {
    act: 'ACT 01',
    chapter: 'THE DIRECTORIAL THESIS',
    quote: 'Movement is not performance; it is embodied presence.',
    location: 'ARTISTIC MANIFESTO · 15+ YEARS'
  },
  weddings: {
    act: 'ACT 02',
    chapter: 'ROYAL PALACE SANGEETS & CINEMA',
    quote: 'Bespoke couple first dances and grand ensemble productions across historic palaces.',
    location: 'TAJ FALAKNUMA · RAJASTHAN · DESTINATIONS'
  },
  studio: {
    act: 'ACT 03',
    chapter: 'DANCE & FITNESS SANCTUARY',
    quote: 'High-octane conditioning, rhythm workouts, and masterclasses at Jubilee Hills.',
    location: 'ROAD NO. 36 MOVEMENT SANCTUARY'
  },
  repertoire: {
    act: 'ACT 04',
    chapter: 'CURATED SCREEN REPERTOIRE',
    quote: 'Choreography directed for screen, stage, and cinematic storytelling.',
    location: 'SIGNATURE FILMS & REELS'
  },
  contact: {
    act: 'ACT 05',
    chapter: 'COMMISSIONS & CONCIERGE',
    quote: 'Directorial commissions and studio passes at Jubilee Hills, Hyderabad.',
    location: 'GLOBAL INQUIRIES & ADMISSIONS'
  },
};

export const EditorialNarrativeIndicator: React.FC<EditorialNarrativeIndicatorProps> = ({
  theme = 'dark'
}) => {
  const isWhite = theme === 'white';
  const [activeChapterKey, setActiveChapterKey] = useState<string>('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'repertoire', 'weddings', 'studio', 'contact'];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          const id = entry.target.id;
          if (CHAPTERS[id]) {
            setActiveChapterKey(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: '-10% 0px -10% 0px',
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Show after initial scroll
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const current = CHAPTERS[activeChapterKey] || CHAPTERS.home;

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none hidden md:block">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={activeChapterKey}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`px-4 py-3 rounded-none border backdrop-blur-md shadow-2xl max-w-md ${
              isWhite
                ? 'bg-white/85 text-black border-black/10'
                : 'bg-black/80 text-white border-white/10'
            }`}
          >
            <div className="flex items-center justify-between gap-4 pb-1 text-[9px] font-mono uppercase tracking-[0.25em]">
              <span className="text-[#facc15] font-bold">
                {current.act} · {current.chapter}
              </span>
              <span className="text-stone-400 text-[8px] tracking-widest hidden lg:inline">
                {current.location}
              </span>
            </div>

            <p className="text-xs font-editorial italic text-stone-200 leading-snug">
              “{current.quote}”
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
