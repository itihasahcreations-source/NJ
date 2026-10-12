import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, ArrowUpRight, Award, Compass, Sparkles } from 'lucide-react';
import { ASSETS } from '../utils/imageAssets';

interface AboutSectionProps {
  theme: 'dark' | 'white';
  onOpenInquiry: (topic?: string) => void;
  onPlayVideo?: (title: string, url: string) => void;
}

interface RepertoireWork {
  id: string;
  title: string;
  category: string;
  duration: string;
  image: string;
  videoUrl: string;
}

const REPERTOIRE_FILMS: RepertoireWork[] = [
  {
    id: 'film-1',
    title: 'RAANJHANAA · THEATRICAL MOTION',
    category: 'CHOREOGRAPHY FILM',
    duration: '03:42',
    image: ASSETS.redSolo,
    videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0'
  },
  {
    id: 'film-2',
    title: 'ROYAL FALAKNUMA PALACE SANGEET',
    category: 'WEDDING CINEMA',
    duration: '04:15',
    image: ASSETS.royalPalaceDance,
    videoUrl: 'https://www.youtube-nocookie.com/embed/3JZ_D3ELwOQ?autoplay=1&mute=0'
  },
  {
    id: 'film-3',
    title: 'CONTEMPORARY RELEASE & SUSPENSION',
    category: 'RESEARCH LAB',
    duration: '02:50',
    image: ASSETS.darkContemporary,
    videoUrl: 'https://www.youtube-nocookie.com/embed/fJ9rUzIMcZQ?autoplay=1&mute=0'
  },
  {
    id: 'film-4',
    title: 'GARBA & FOLK UTSAV ARENA',
    category: 'FESTIVAL REEL',
    duration: '03:10',
    image: ASSETS.workshopGarba,
    videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0'
  }
];

const HONOURS = [
  { name: 'BRIDES TODAY', detail: 'TOP 10 WEDDING CHOREOGRAPHERS IN INDIA' },
  { name: 'SANIA MIRZA', detail: 'TECHNIQUE & ATHLETIC CONDITIONING' },
  { name: 'TAJ FALAKNUMA PALACE', detail: 'BESPOKE ROYAL SANGEET RESIDENCY' },
  { name: 'HYDERABAD DANCE FESTIVAL', detail: 'OFFICIAL STUDIO PARTNER & ARENA LEAD' },
  { name: 'UMAID BHAWAN PALACE', detail: 'RAJASTHAN DESTINATION SANGEET' },
  { name: 'WOW HYDERABAD', detail: 'EXCLUSIVE EDITORIAL COVER PROFILE' }
];

export const AboutSection: React.FC<AboutSectionProps> = ({
  theme,
  onOpenInquiry,
  onPlayVideo
}) => {
  const isWhite = theme === 'white';

  return (
    <section 
      id="about" 
      className={`py-24 sm:py-32 select-none transition-colors duration-500 relative overflow-hidden ${
        isWhite ? 'bg-[#faf9f6] text-black' : 'bg-[#050507] text-white'
      }`}
    >
      {/* Soft Ambient Gold Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-950/15 rounded-full blur-[180px] pointer-events-none -z-10" 
      />

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 space-y-16">
        
        {/* Unified Story Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#f5d77f]">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>CHAPTER 03 / HER STORY & PEDIGREE</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light uppercase tracking-tight text-white leading-none">
              HER JOURNEY & REPERTOIRE
            </h2>
          </div>

          <div className="text-left md:text-right space-y-1 text-xs font-mono text-stone-400">
            <div>SHIAMAK DAVAR ALUMNA · HYDERABAD</div>
            <div className="text-amber-200">15+ YEARS DIRECTION · 500+ PRODUCTIONS</div>
          </div>
        </div>

        {/* 4 Clean Transparent Story Panels (Zero Image Overload, Quiet High-Fashion Typography) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl space-y-3">
            <div className="text-xs font-mono text-amber-300 font-bold">01 / LINEAGE</div>
            <h3 className="text-xl font-display uppercase text-white">SHIAMAK DAVAR PEDIGREE</h3>
            <p className="text-xs sm:text-sm font-body text-stone-300 leading-relaxed">
              Formative training under Indian choreographic legends, translating classical precision into screen blocking and industry productions.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl space-y-3">
            <div className="text-xs font-mono text-rose-300 font-bold">02 / ATHLETIC CONDITIONING</div>
            <h3 className="text-xl font-display uppercase text-white">SANIA MIRZA TRAINING</h3>
            <p className="text-xs sm:text-sm font-body text-stone-300 leading-relaxed">
              Celebrity athletic conditioning; tennis champion Sania Mirza publicly acknowledged Nicy Joseph for handstand inversion foundations.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl space-y-3">
            <div className="text-xs font-mono text-emerald-300 font-bold">03 / FESTIVAL DIRECTION</div>
            <h3 className="text-xl font-display uppercase text-white">HYDERABAD DANCE FESTIVAL</h3>
            <p className="text-xs sm:text-sm font-body text-stone-300 leading-relaxed">
              Official studio partner leading 350+ dancers in high-energy synchronized circular Garba rhythms at the cultural arena.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl space-y-3">
            <div className="text-xs font-mono text-teal-300 font-bold">04 / EDITORIAL CITATION</div>
            <h3 className="text-xl font-display uppercase text-white">BRIDES TODAY TOP 10</h3>
            <p className="text-xs sm:text-sm font-body text-stone-300 leading-relaxed">
              Celebrated nationally by Brides Today and WOW Hyderabad for elevating luxury Indian wedding choreography into cinematic art.
            </p>
          </div>

        </div>

        {/* Curated 4-Item Signature Film Strip (Rectangular with Hover Play) */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-stone-400">
            <span>CURATED SIGNATURE FILMS (CLICK TO PLAY)</span>
            <span className="text-amber-300">4 SIGNATURE REELS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REPERTOIRE_FILMS.map((film) => (
              <div
                key={film.id}
                onClick={() => onPlayVideo?.(film.title, film.videoUrl)}
                className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-stone-950 group border border-white/10 shadow-xl transition-all duration-300 hover:border-amber-300/40"
              >
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                {/* Top Duration */}
                <div className="absolute top-4 right-4 z-10 px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-stone-300">
                  {film.duration}
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-amber-300 group-hover:text-black group-hover:scale-110 transition-all">
                    <Play className="w-4 h-4 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Title */}
                <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                  <div className="text-[9px] font-mono uppercase text-amber-300 tracking-wider">
                    {film.category}
                  </div>
                  <h4 className="text-sm sm:text-base font-display uppercase tracking-wide text-white truncate">
                    {film.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seamless Honours Infinite Marquee Ticker */}
        <div className="pt-8 border-t border-white/[0.08] space-y-6">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-400">
            <Award className="w-4 h-4 text-amber-300" />
            <span>DIRECTORIAL HONOURS & COMMENDATIONS</span>
          </div>

          <div className="relative overflow-hidden py-3">
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none bg-gradient-to-r from-[#050507] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#050507] to-transparent" />

            <div className="animate-marquee flex items-center gap-12 sm:gap-20">
              {HONOURS.concat(HONOURS).map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 shrink-0">
                  <div className="space-y-0.5">
                    <div className="text-lg sm:text-2xl font-display uppercase tracking-wide text-white">
                      {item.name}
                    </div>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-stone-400">
                      {item.detail}
                    </div>
                  </div>
                  <span className="text-amber-300/40 text-xs ml-8">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
