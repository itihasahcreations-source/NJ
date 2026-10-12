import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { FadeInUp } from './EditorialReveal';
import { SectionTitleLockup } from './SectionTitleLockup';

interface SelectedCreditsProps {
  theme?: 'dark' | 'white';
}

interface HonourItem {
  id: string;
  name: string;
  detail: string;
  category: string;
  quote: string;
  citation: string;
  link?: string;
}

const HONOURS: HonourItem[] = [
  {
    id: 'h-1',
    name: 'BRIDES TODAY',
    detail: 'Premier Wedding Choreographers in India',
    category: 'NATIONAL PRESS',
    quote: 'Recognized among the country’s premier wedding choreographers for transforming royal sangeet stages into majestic cinematic masterworks.',
    citation: 'Brides Today Magazine · Editorial Curation',
    link: 'https://www.bridestoday.in'
  },
  {
    id: 'h-2',
    name: 'SANIA MIRZA',
    detail: 'Athletic Inversion & Handstand Technique',
    category: 'CELEBRITY DIRECTION',
    quote: 'Tennis Grand Slam icon Sania Mirza publicly credited Nicy Joseph Dance & Fitness for foundational handstand balance, scapular control, and core inversion technique.',
    citation: 'Public Acknowledgment & Republic World Feature'
  },
  {
    id: 'h-3',
    name: 'TAJ FALAKNUMA PALACE',
    detail: 'Bespoke Royal Sangeet Residency',
    category: 'PALACE COMMISSIONS',
    quote: 'Directing bespoke couple entrances and grand 50-dancer ensemble choreographies beneath imperial Belgian crystal chandeliers.',
    citation: 'Hyderabad Heritage Estates & Luxury Venues'
  },
  {
    id: 'h-4',
    name: 'UMAID BHAWAN PALACE',
    detail: 'Destination Sangeet Productions',
    category: 'DESTINATION CINEMA',
    quote: 'Curating turnkey multi-day wedding theatricals and bridal solos across Jodhpur, Jaipur, and luxury destinations in Oman.',
    citation: 'Royal Rajasthan Destination Commissions'
  },
  {
    id: 'h-5',
    name: 'HYDERABAD DANCE FESTIVAL',
    detail: 'Official Studio Partner & Arena Lead',
    category: 'FESTIVAL APPOINTMENT',
    quote: 'Appointed official studio partner and Garba Arena leader, conducting synchronous festival dancers across amphitheatre productions.',
    citation: 'Hyderabad Cultural Amphitheatre',
    link: 'https://hyddancefestival.com'
  },
  {
    id: 'h-6',
    name: 'WOW HYDERABAD',
    detail: 'Exclusive Editorial Cover Spotlight',
    category: 'MAGAZINE FEATURE',
    quote: 'In-depth profile tracing Nicy Joseph’s choreographic philosophy, Jubilee Hills studio sanctuary, and Tollywood industry presence.',
    citation: 'WOW Hyderabad · Editorial Feature',
    link: 'https://wowhyderabad.com'
  },
  {
    id: 'h-7',
    name: 'TOLLYWOOD CINEMA',
    detail: 'Camera Blocking & Actor Coaching',
    category: 'SCREEN MOVEMENT',
    quote: 'Movement blocking and camera choreography for high-profile music videos, actors, and commercial dance productions.',
    citation: 'Telugu Cinema & Independent Screen Productions'
  },
  {
    id: 'h-8',
    name: 'WORLD OF DANCE',
    detail: 'International Movement Repertoire',
    category: 'GLOBAL SELECTION',
    quote: 'Celebrated stage direction and contemporary movement aesthetics spotlighting Indian choreographic excellence.',
    citation: 'Global Dance Showcase'
  }
];

// Film Festival Laurel Wreath Branch (Left)
const LaurelLeft: React.FC = () => (
  <svg 
    width="22" 
    height="48" 
    viewBox="0 0 30 70" 
    fill="currentColor" 
    className="shrink-0 transition-colors duration-300 text-stone-400 group-hover:text-[#dfba73]"
    aria-hidden="true"
  >
    <path d="M27 68 C23 52 17 37 11 23 C7 15 3 7 1 0 C0.5 0 0 0.5 0 1 C2 9 6 19 11 29 C17 43 23 57 26 69 Z" fill="currentColor" opacity="0.45"/>
    <path d="M11 8 C8 4 4 2 0 1 C0 4 3 7 7 9 C9 10 10 9 11 8 Z"/>
    <path d="M15 16 C12 12 7 10 3 9 C3 12 6 15 10 17 C12 18 14 17 15 16 Z"/>
    <path d="M19 25 C16 21 11 19 7 18 C7 21 10 24 14 26 C16 27 18 26 19 25 Z"/>
    <path d="M22 35 C19 31 14 29 10 28 C10 31 13 34 17 36 C19 37 21 36 22 35 Z"/>
    <path d="M25 46 C22 42 17 40 13 39 C13 42 16 45 20 47 C22 48 24 47 25 46 Z"/>
    <path d="M27 58 C24 54 19 52 15 51 C15 54 18 57 22 59 C24 60 26 59 27 58 Z"/>
  </svg>
);

// Film Festival Laurel Wreath Branch (Right)
const LaurelRight: React.FC = () => (
  <svg 
    width="22" 
    height="48" 
    viewBox="0 0 30 70" 
    fill="currentColor" 
    className="shrink-0 transform -scale-x-100 transition-colors duration-300 text-stone-400 group-hover:text-[#dfba73]"
    aria-hidden="true"
  >
    <path d="M27 68 C23 52 17 37 11 23 C7 15 3 7 1 0 C0.5 0 0 0.5 0 1 C2 9 6 19 11 29 C17 43 23 57 26 69 Z" fill="currentColor" opacity="0.45"/>
    <path d="M11 8 C8 4 4 2 0 1 C0 4 3 7 7 9 C9 10 10 9 11 8 Z"/>
    <path d="M15 16 C12 12 7 10 3 9 C3 12 6 15 10 17 C12 18 14 17 15 16 Z"/>
    <path d="M19 25 C16 21 11 19 7 18 C7 21 10 24 14 26 C16 27 18 26 19 25 Z"/>
    <path d="M22 35 C19 31 14 29 10 28 C10 31 13 34 17 36 C19 37 21 36 22 35 Z"/>
    <path d="M25 46 C22 42 17 40 13 39 C13 42 16 45 20 47 C22 48 24 47 25 46 Z"/>
    <path d="M27 58 C24 54 19 52 15 51 C15 54 18 57 22 59 C24 60 26 59 27 58 Z"/>
  </svg>
);

export const SelectedCredits: React.FC<SelectedCreditsProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const [selectedHonour, setSelectedHonour] = useState<HonourItem | null>(null);

  const renderHonourCard = (item: HonourItem, idx: number, trackId: string) => (
    <div
      key={`${trackId}-${item.id}-${idx}`}
      onClick={() => setSelectedHonour(item)}
      className="inline-flex shrink-0 items-center justify-center px-4 sm:px-6 cursor-pointer group select-none whitespace-nowrap transition-transform duration-300 hover:scale-105"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <LaurelLeft />
        <div className="flex flex-col items-center justify-center text-center space-y-0.5">
          <span className={`text-[8px] sm:text-[9px] font-wide tracking-[0.25em] uppercase font-bold transition-colors ${
            isWhite ? 'text-amber-700' : 'text-[#dfba73]'
          }`}>
            {item.category}
          </span>
          <span className={`text-sm sm:text-base font-sans font-bold tracking-tight uppercase transition-colors ${
            isWhite ? 'text-stone-900 group-hover:text-amber-800' : 'text-white group-hover:text-[#faeed7]'
          }`}>
            {item.name}
          </span>
          <span className={`text-[10px] sm:text-[11px] font-sans tracking-wide transition-colors ${
            isWhite ? 'text-stone-600' : 'text-stone-400'
          }`}>
            {item.detail}
          </span>
        </div>
        <LaurelRight />
      </div>
    </div>
  );

  return (
    <section 
      id="credits"
      className="pt-28 sm:pt-36 md:pt-48 pb-20 sm:pb-32 select-none relative overflow-hidden bg-transparent"
    >
      {/* Floating Spatial Atmospheric Ambient Lighting */}
      <div 
        aria-hidden="true" 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[360px] rounded-full blur-[180px] pointer-events-none -z-10 ${
          isWhite 
            ? 'bg-gradient-to-r from-amber-400/10 via-[#c5a059]/10 to-transparent' 
            : 'bg-gradient-to-r from-amber-600/10 via-[#c5a059]/10 to-transparent'
        }`} 
      />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 space-y-6 relative z-20">
        
        {/* Minimal Centered Section Heading: Pure White Monolith AWARDS & HONOURS with Centered Pure Black Logo Covering 80-90% */}
        <FadeInUp delay={0.05} yOffset={15}>
          <SectionTitleLockup
            subtitle="PRESS & INSTITUTIONAL RECOGNITION"
            title="AWARDS & HONOURS"
            align="center"
            theme={theme}
          />
        </FadeInUp>

        {/* Minimal, Seamless Infinite Laurel Marquee */}
        <FadeInUp delay={0.1} yOffset={15}>
          <div className="relative overflow-hidden py-3 flex items-center">
            
            {/* Seamless Edge Fade Overlays - Removed in white theme & zero blur on mobile */}
            {!isWhite && (
              <>
                <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-r from-[#060608] via-[#060608]/70 to-transparent" />
                <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-l from-[#060608] via-[#060608]/70 to-transparent" />
              </>
            )}

            {/* Seamless 60fps continuous infinite loop */}
            <div className="flex animate-marquee-track whitespace-nowrap will-change-transform items-center">
              {HONOURS.map((item, idx) => renderHonourCard(item, idx, 't1'))}
            </div>
            <div className="flex animate-marquee-track whitespace-nowrap will-change-transform items-center" aria-hidden="true">
              {HONOURS.map((item, idx) => renderHonourCard(item, idx, 't2'))}
            </div>

          </div>
        </FadeInUp>

      </div>

      {/* Citation Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedHonour && (
          <div 
            onClick={() => setSelectedHonour(null)}
            className={`fixed inset-0 z-[120] backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 ${
              isWhite ? 'bg-black/40' : 'bg-black/85'
            }`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-5 rounded-none ${
                isWhite 
                  ? 'bg-[#FAF8F5] border border-stone-300 text-stone-900' 
                  : 'bg-[#0d0d10] border border-white/15 text-white'
              }`}
            >
              <button
                onClick={() => setSelectedHonour(null)}
                aria-label="Close modal"
                className={`absolute top-4 right-4 p-2 transition-colors cursor-pointer ${
                  isWhite ? 'text-stone-400 hover:text-black' : 'text-stone-400 hover:text-white'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1.5 text-center">
                <span className={`text-[9px] font-wide tracking-[0.26em] uppercase font-bold ${
                  isWhite ? 'text-amber-700' : 'text-gradient-gold'
                }`}>
                  {selectedHonour.category}
                </span>
                <h3 className={`text-xl sm:text-2xl font-display uppercase tracking-tight font-bold ${
                  isWhite ? 'text-stone-900' : 'text-white'
                }`}>
                  {selectedHonour.name}
                </h3>
                <div className={`text-xs font-sans ${
                  isWhite ? 'text-stone-600' : 'text-stone-400'
                }`}>
                  {selectedHonour.detail}
                </div>
              </div>

              <div className={`p-4 border-l-2 border-[#c5a059] space-y-2 ${
                isWhite ? 'bg-stone-100/70' : 'bg-white/[0.04]'
              }`}>
                <p className={`text-xs sm:text-sm font-sans italic leading-relaxed ${
                  isWhite ? 'text-stone-800' : 'text-stone-200'
                }`}>
                  "{selectedHonour.quote}"
                </p>
                <div className={`text-[11px] font-sans ${
                  isWhite ? 'text-stone-500' : 'text-stone-400'
                }`}>
                  — {selectedHonour.citation}
                </div>
              </div>

              {selectedHonour.link && (
                <div className="pt-2 text-center">
                  <a
                    href={selectedHonour.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-wide tracking-widest uppercase transition-colors font-bold ${
                      isWhite 
                        ? 'bg-stone-900 text-white hover:bg-stone-800' 
                        : 'bg-white text-black hover:bg-stone-200'
                    }`}
                  >
                    <span>VISIT PUBLICATION</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
