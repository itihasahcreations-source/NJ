import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Film, Maximize2, X, Sparkles } from 'lucide-react';
import { ASSETS } from '../utils/imageAssets';

interface CinematicImageCarouselProps {
  theme: 'dark' | 'white';
}

interface ArchiveStill {
  id: string;
  title: string;
  location: string;
  discipline: string;
  image: string;
  ratio: string;
}

const ARCHIVE_STILLS: ArchiveStill[] = [
  {
    id: 'still-1',
    title: 'ROYAL SANGEET ENSEMBLE',
    location: 'TAJ FALAKNUMA PALACE · HYDERABAD',
    discipline: 'PALACE WEDDING CHOREOGRAPHY',
    image: ASSETS.weddingSangeet,
    ratio: 'aspect-[4/5]'
  },
  {
    id: 'still-2',
    title: 'THEATRICAL CRIMSON SOLO',
    location: 'DIRECTORIAL STAGE STUDY',
    discipline: 'CLASSICAL MUDRAS × SCREEN MOTION',
    image: ASSETS.redSolo,
    ratio: 'aspect-[4/5]'
  },
  {
    id: 'still-3',
    title: 'ATHLETIC MOBILITY & INVERSIONS',
    location: 'JUBILEE HILLS SANCTUARY',
    discipline: 'PRECISION CALISTHENICS & YOGA',
    image: ASSETS.mobilityLab,
    ratio: 'aspect-[4/5]'
  },
  {
    id: 'still-4',
    title: 'GARBA UTSAV FOLK CONTEMPORARY',
    location: 'HYDERABAD DANCE FESTIVAL ARENA',
    discipline: '350+ SYNCHRONOUS ENSEMBLE',
    image: ASSETS.workshopGarba,
    ratio: 'aspect-[4/5]'
  },
  {
    id: 'still-5',
    title: 'PRIVATE ATELIER RESIDENCY',
    location: 'SPRUNG MAPLE REHEARSAL FLOOR',
    discipline: '1-ON-1 DIRECTORIAL INTENSIVE',
    image: ASSETS.privateAtelier,
    ratio: 'aspect-[4/5]'
  },
  {
    id: 'still-6',
    title: 'CONTEMPORARY DUET CHOREOGRAPHY',
    location: 'EXPERIMENTAL MOVEMENT LAB',
    discipline: 'GRAVITY & SUSPENSION STUDY',
    image: ASSETS.surgeDancer,
    ratio: 'aspect-[4/5]'
  },
  {
    id: 'still-7',
    title: 'HERITAGE BALLROOM CINEMA',
    location: 'IMPERIAL RESIDENCY · RAJASTHAN',
    discipline: 'PALACE ARCHITECTURE & LIGHTING',
    image: ASSETS.palaceBallroom,
    ratio: 'aspect-[4/5]'
  }
];

export const CinematicImageCarousel: React.FC<CinematicImageCarouselProps> = ({ theme }) => {
  const isWhite = theme === 'white';
  const [activeModalStill, setActiveModalStill] = useState<ArchiveStill | null>(null);

  return (
    <section className={`py-20 sm:py-28 overflow-hidden select-none relative transition-colors duration-500 ${
      isWhite ? 'bg-[#faf9f6]' : 'bg-[#050507]'
    }`}>
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-300 uppercase tracking-[0.25em]">
            <Camera className="w-3.5 h-3.5" />
            <span>PRODUCTION ARCHIVE</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-display font-light uppercase tracking-wide text-white">
            MOMENTS IN MOTION · VISUAL RETROSPECTIVE
          </h3>
        </div>
        <div className="text-[11px] font-mono text-stone-400">
          <span>HOVER TO PAUSE · CLICK STILL TO ENLARGE</span>
        </div>
      </div>

      {/* Infinite Smooth Carousel Track */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradients */}
        <div className={`absolute left-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none ${
          isWhite 
            ? 'bg-gradient-to-r from-[#faf9f6] to-transparent' 
            : 'bg-gradient-to-r from-[#050507] via-[#050507]/80 to-transparent'
        }`} />
        <div className={`absolute right-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none ${
          isWhite 
            ? 'bg-gradient-to-l from-[#faf9f6] to-transparent' 
            : 'bg-gradient-to-l from-[#050507] via-[#050507]/80 to-transparent'
        }`} />

        <div className="animate-marquee flex gap-6 shrink-0 py-4 px-4">
          {ARCHIVE_STILLS.concat(ARCHIVE_STILLS).map((still, idx) => (
            <div
              key={`${still.id}-${idx}`}
              onClick={() => setActiveModalStill(still)}
              className="relative w-72 sm:w-84 md:w-96 aspect-[3/4] rounded-3xl overflow-hidden shrink-0 group cursor-pointer shadow-2xl bg-stone-950 border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-amber-300/40"
            >
              <img
                src={still.image}
                alt={still.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

              {/* Top Tag */}
              <div className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-amber-200" />
              </div>

              {/* Minimal caption reveal */}
              <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none space-y-1">
                <div className="text-[10px] font-mono tracking-widest uppercase text-amber-300 font-bold">
                  {still.discipline}
                </div>
                <div className="text-base sm:text-lg font-display uppercase tracking-wide text-white group-hover:text-amber-100 transition-colors">
                  {still.title}
                </div>
                <div className="text-[10px] font-mono text-stone-400">
                  {still.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Still Enlargement Lightbox */}
      <AnimatePresence>
        {activeModalStill && (
          <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-stone-950 rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setActiveModalStill(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-amber-300 hover:text-black text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                <img
                  src={activeModalStill.image}
                  alt={activeModalStill.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8 space-y-2 bg-stone-950">
                <div className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                  {activeModalStill.discipline} · {activeModalStill.location}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white">
                  {activeModalStill.title}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
