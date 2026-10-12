import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, Play, X, ArrowUpRight } from 'lucide-react';
import { ASSETS } from '../utils/imageAssets';

interface DualRowArchiveMarqueeProps {
  theme: 'dark' | 'white';
  onPlayVideo?: (title: string, url: string) => void;
}

interface ArchiveItem {
  id: string;
  code: string;
  title: string;
  category: string;
  location: string;
  image: string;
  isVideo?: boolean;
  videoUrl?: string;
}

// 30 Curated Visual Archive Placeholders for Nicy Joseph Dance, Film & Performance
const ROW_ONE_ITEMS: ArchiveItem[] = [
  { id: 'a-01', code: 'NJ_001', title: 'THEATRICAL CRIMSON SOLO', category: 'CHOREOGRAPHY', location: 'HYDERABAD', image: ASSETS.redSolo, isVideo: true, videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0' },
  { id: 'a-02', code: 'NJ_002', title: 'ROYAL FALAKNUMA ENTRANCE', category: 'WEDDING CINEMA', location: 'FALAKNUMA PALACE', image: ASSETS.royalPalaceDance },
  { id: 'a-03', code: 'NJ_003', title: 'JUBILEE MOVEMENT LAB', category: 'STUDIO SANCTUARY', location: 'ROAD NO. 36', image: ASSETS.jubileeSanctuary },
  { id: 'a-04', code: 'NJ_004', title: 'CONTEMPORARY SUSPENSION', category: 'PHYSICAL THEATRE', location: 'STUDIO FLOOR', image: ASSETS.darkContemporary },
  { id: 'a-05', code: 'NJ_005', title: 'GARBA ARENA IMMERSION', category: 'FESTIVAL REEL', location: 'CULTURAL CENTRE', image: ASSETS.workshopGarba, isVideo: true, videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0' },
  { id: 'a-06', code: 'NJ_006', title: 'INTERNATIONAL MUDRA STUDY', category: 'RESEARCH', location: 'ATELIER', image: ASSETS.internationalMudra },
  { id: 'a-07', code: 'NJ_007', title: '50-DANCER SANGEET FINALE', category: 'PALACE STAGING', location: 'UMAID BHAWAN', image: ASSETS.weddingSangeet, isVideo: true, videoUrl: 'https://www.youtube-nocookie.com/embed/3JZ_D3ELwOQ?autoplay=1&mute=0' },
  { id: 'a-08', code: 'NJ_008', title: 'SPRUNG MAPLE REHEARSAL', category: 'STUDIO PROVENANCE', location: 'JUBILEE HILLS', image: ASSETS.studioRehearsal },
  { id: 'a-09', code: 'NJ_009', title: 'DUET MOMENTUM & WEIGHT', category: 'CONTEMPORARY DUET', location: 'MOVEMENT LAB', image: ASSETS.surgeDancer },
  { id: 'a-10', code: 'NJ_010', title: 'HERITAGE BALLROOM CINEMA', category: 'PALACE ARCHITECTURE', location: 'RAJASTHAN', image: ASSETS.palaceBallroom },
  { id: 'a-11', code: 'NJ_011', title: 'INVERSION CALISTHENICS', category: 'YOGA & MOBILITY', location: 'SANCTUARY FLOOR', image: ASSETS.yogaInversion },
  { id: 'a-12', code: 'NJ_012', title: 'SANCTUARY COHORT INTENSIVE', category: 'MASTERCLASS', location: 'JUBILEE HILLS', image: ASSETS.sanctuaryCohort },
  { id: 'a-13', code: 'NJ_013', title: 'CLASSICAL CONTEMPORARY FUSION', category: 'REPERTOIRE', location: 'HYDERABAD', image: ASSETS.classicalContemporary },
  { id: 'a-14', code: 'NJ_014', title: 'SOLO SILHOUETTE & GESTURE', category: 'EDITORIAL', location: 'STUDIO STILL', image: ASSETS.movementEditorial },
  { id: 'a-15', code: 'NJ_015', title: 'LUMORA TROUPE DUET', category: 'STAGE ENSEMBLE', location: 'ARENA STAGE', image: ASSETS.lumoraTroupe }
];

const ROW_TWO_ITEMS: ArchiveItem[] = [
  { id: 'a-16', code: 'NJ_016', title: 'PRIVATE ATELIER COACHING', category: '1-ON-1 RESIDENCY', location: 'JUBILEE HILLS', image: ASSETS.privateAtelier },
  { id: 'a-17', code: 'NJ_017', title: 'ATHLETIC MOBILITY LAB', category: 'FITNESS SANCTUARY', location: 'ALCAZAR MALL', image: ASSETS.mobilityLab },
  { id: 'a-18', code: 'NJ_018', title: 'RAANJHANAA SCREEN BLOCKING', category: 'SCREEN CINEMA', location: 'STUDIO REEL', image: ASSETS.redSolo, isVideo: true, videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0' },
  { id: 'a-19', code: 'NJ_019', title: 'LAKE PICHOLA PRE-WEDDING', category: 'DESTINATION FILM', location: 'UDAIPUR', image: ASSETS.palaceBallroom },
  { id: 'a-20', code: 'NJ_020', title: 'DYNAMIC FLOOR TRANSITION', category: 'EUROPEAN FLOORWORK', location: 'MOVEMENT LAB', image: ASSETS.darkContemporary },
  { id: 'a-21', code: 'NJ_021', title: 'FESTIVAL CIRCULAR RHYTHM', category: 'FOLK CONTEMPORARY', location: 'AMPHITHEATRE', image: ASSETS.workshopGarba },
  { id: 'a-22', code: 'NJ_022', title: 'SOLO BRIDAL LEHENGA CINEMA', category: 'COUTURE STAGING', location: 'THE LEELA', image: ASSETS.royalPalaceDance },
  { id: 'a-23', code: 'NJ_023', title: 'MUDRA CHIAROSCURO STUDY', category: 'RESEARCH ARCHIVE', location: 'HYDERABAD', image: ASSETS.internationalMudra },
  { id: 'a-24', code: 'NJ_024', title: 'ZUMBA CARDIO SCULPT', category: 'DAILY BATCHES', location: 'JUBILEE HILLS', image: ASSETS.mobilityLab },
  { id: 'a-25', code: 'NJ_025', title: 'GRAND COUPLE LIFT SEQUENCE', category: 'FIRST DANCE', location: 'FALAKNUMA PALACE', image: ASSETS.weddingSangeet, isVideo: true, videoUrl: 'https://www.youtube-nocookie.com/embed/3JZ_D3ELwOQ?autoplay=1&mute=0' },
  { id: 'a-26', code: 'NJ_026', title: 'SCAPULAR INVERSION STABILITY', category: 'ATHLETIC CONDITIONING', location: 'SANCTUARY', image: ASSETS.yogaInversion },
  { id: 'a-27', code: 'NJ_027', title: 'CHOREOGRAPHY WORKSHOP MASTERCLASS', category: 'INTENSIVE', location: 'JUBILEE HILLS', image: ASSETS.sanctuaryCohort },
  { id: 'a-28', code: 'NJ_028', title: 'STAGE LIGHTING & TIMBER REFLECTION', category: 'STAGE REHEARSAL', location: 'HYDERABAD', image: ASSETS.studioRehearsal },
  { id: 'a-29', code: 'NJ_029', title: 'GRAVITY & SUSPENSION STUDY', category: 'CONTEMPORARY LAB', location: 'STUDIO FLOOR', image: ASSETS.surgeDancer },
  { id: 'a-30', code: 'NJ_030', title: 'FINAL EMBODIED REVEAL', category: 'DIRECTORIAL SUMMARY', location: 'HYDERABAD', image: ASSETS.movementEditorial }
];

export const DualRowArchiveMarquee: React.FC<DualRowArchiveMarqueeProps> = ({
  theme,
  onPlayVideo
}) => {
  const isWhite = theme === 'white';
  const [selectedStill, setSelectedStill] = useState<ArchiveItem | null>(null);

  const renderCard = (item: ArchiveItem) => (
    <div
      key={item.id}
      onClick={() => {
        if (item.isVideo && item.videoUrl) {
          onPlayVideo?.(item.title, item.videoUrl);
        } else {
          setSelectedStill(item);
        }
      }}
      className="relative w-64 sm:w-80 md:w-96 aspect-[16/10] rounded-2xl overflow-hidden shrink-0 group cursor-pointer bg-stone-950 border border-white/10 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-amber-300/50"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 brightness-90 group-hover:brightness-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Top Code & Indicator */}
      <div className="absolute top-3.5 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono tracking-widest text-stone-300 pointer-events-none">
        <span className="text-amber-300 font-bold">{item.code}</span>
        <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-stone-300">
          {item.category}
        </span>
      </div>

      {/* Center Play Button if Video */}
      {item.isVideo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-amber-300 group-hover:text-black group-hover:scale-110 transition-all">
            <Play className="w-4 h-4 fill-current translate-x-0.5" />
          </div>
        </div>
      )}

      {/* Bottom Minimal Caption */}
      <div className="absolute bottom-3.5 left-4 right-4 z-10 pointer-events-none space-y-0.5">
        <div className="text-[9px] font-mono text-stone-400 uppercase tracking-wider truncate">
          {item.location}
        </div>
        <div className="text-xs sm:text-sm font-display uppercase tracking-wide text-white group-hover:text-amber-200 transition-colors truncate">
          {item.title}
        </div>
      </div>
    </div>
  );

  return (
    <section className={`py-20 sm:py-28 overflow-hidden select-none relative transition-colors duration-500 border-t border-b border-white/[0.08] ${
      isWhite ? 'bg-[#faf9f6]' : 'bg-[#040405]'
    }`}>
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-300 uppercase tracking-[0.25em]">
            <Camera className="w-3.5 h-3.5" />
            <span>NICY JOSEPH VISUAL ARCHIVE</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-display font-light uppercase tracking-wide text-white">
            30 CURATED PRODUCTION FRAMES · DUAL-ROW KINETIC SCROLL
          </h3>
        </div>
        <div className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
          TOP ROW → RIGHT · BOTTOM ROW ← LEFT · HOVER TO PAUSE
        </div>
      </div>

      {/* Dual Row Continuous Opposing Infinite Scrolls */}
      <div className="space-y-5 relative w-full overflow-hidden">
        
        {/* Soft edge gradient masks */}
        <div className={`absolute left-0 top-0 bottom-0 w-20 sm:w-44 z-20 pointer-events-none ${
          isWhite 
            ? 'bg-gradient-to-r from-[#faf9f6] to-transparent' 
            : 'bg-gradient-to-r from-[#040405] via-[#040405]/80 to-transparent'
        }`} />
        <div className={`absolute right-0 top-0 bottom-0 w-20 sm:w-44 z-20 pointer-events-none ${
          isWhite 
            ? 'bg-gradient-to-l from-[#faf9f6] to-transparent' 
            : 'bg-gradient-to-l from-[#040405] via-[#040405]/80 to-transparent'
        }`} />

        {/* ROW 1: Smoothly Scrolls RIGHT (animate-marquee-reverse) with 15 items duplicate */}
        <div className="animate-marquee-reverse flex gap-5 shrink-0 px-4">
          {ROW_ONE_ITEMS.concat(ROW_ONE_ITEMS).map((item, idx) => (
            <React.Fragment key={`r1-${item.id}-${idx}`}>
              {renderCard(item)}
            </React.Fragment>
          ))}
        </div>

        {/* ROW 2: Smoothly Scrolls LEFT (animate-marquee) with 15 items duplicate */}
        <div className="animate-marquee flex gap-5 shrink-0 px-4">
          {ROW_TWO_ITEMS.concat(ROW_TWO_ITEMS).map((item, idx) => (
            <React.Fragment key={`r2-${item.id}-${idx}`}>
              {renderCard(item)}
            </React.Fragment>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedStill && (
          <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-stone-950 rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedStill(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-amber-300 hover:text-black text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={selectedStill.image}
                  alt={selectedStill.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-1 bg-stone-950 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                    {selectedStill.code} · {selectedStill.category} · {selectedStill.location}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wide text-white">
                    {selectedStill.title}
                  </h3>
                </div>

                <div className="text-xs font-mono text-stone-500">
                  NICY JOSEPH VISUAL RECORD
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
