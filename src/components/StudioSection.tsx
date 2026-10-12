import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, ArrowUpRight, MapPin, Calendar, Clock, Flame, Sparkles } from 'lucide-react';
import { ASSETS } from '../utils/imageAssets';

interface StudioSectionProps {
  theme: 'dark' | 'white';
  onOpenInquiry: (topic?: string) => void;
}

interface StudioProgram {
  id: string;
  num: string;
  title: string;
  category: string;
  schedule: string;
  intensity: string;
  tagline: string;
  accent: string;
  image?: string;
}

const STUDIO_PROGRAMS: StudioProgram[] = [
  {
    id: 'prog-1',
    num: '01',
    title: 'HIGH-CARDIO DANCE FITNESS & ZUMBA',
    category: 'CARDIO RHYTHM',
    schedule: 'MON / WED / FRI · 7:30 AM & 6:30 PM',
    intensity: 'High Energy',
    tagline: 'Dynamic core stamina & full-body cardio conditioning set to high-energy global playlists.',
    accent: 'text-emerald-300',
    image: ASSETS.jubileeSanctuary
  },
  {
    id: 'prog-2',
    num: '02',
    title: 'CHOREOGRAPHY MASTERCLASSES',
    category: 'BOLLYWOOD & CONTEMPORARY',
    schedule: 'TUE & THU 7:00 PM · WEEKEND INTENSIVES',
    intensity: 'Performance Focus',
    tagline: 'Signature screen choreography, musical nuances, and stage poise with multi-angle camera review.',
    accent: 'text-amber-300',
    image: ASSETS.darkContemporary
  },
  {
    id: 'prog-3',
    num: '03',
    title: 'PRIVATE 1-ON-1 ATELIER & INVERSIONS',
    category: 'BIOMECHANICS & BRIDAL SOLOS',
    schedule: 'BY APPOINTMENT ONLY',
    intensity: 'Bespoke Coaching',
    tagline: 'Technical handstand biomechanics & solo bridal coaching on private sprung maple timber.',
    accent: 'text-rose-300',
    image: ASSETS.privateAtelier
  }
];

export const StudioSection: React.FC<StudioSectionProps> = ({
  theme,
  onOpenInquiry
}) => {
  const isWhite = theme === 'white';
  const [activeTab, setActiveTab] = useState<number>(0);

  const currentProgram = STUDIO_PROGRAMS[activeTab];

  return (
    <section 
      id="studio" 
      className={`py-24 sm:py-32 select-none transition-colors duration-500 relative overflow-hidden ${
        isWhite ? 'bg-[#faf9f6] text-black' : 'bg-[#050507] text-white'
      }`}
    >
      {/* Soft Ambient Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-emerald-950/15 rounded-full blur-[160px] pointer-events-none -z-10" 
      />

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 space-y-12">
        
        {/* Unified Story Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>CHAPTER 01 / HYDERABAD MOVEMENT SANCTUARY</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light uppercase tracking-tight text-white leading-none">
              DANCE & FITNESS STUDIO
            </h2>
          </div>

          <div className="text-left md:text-right space-y-1 text-xs font-mono text-stone-400">
            <div className="flex items-center gap-1.5 md:justify-end text-white">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>ALCAZAR MALL · ROAD NO. 36, JUBILEE HILLS</span>
            </div>
            <div className="text-emerald-300">SPRUNG MAPLE TIMBER · NATURAL SKYLIGHT</div>
          </div>
        </div>

        {/* Master Interactive Composition: 3 Clean Horizontal Panels + Hero Showcase Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 3 Sleek Glass Panels (6 cols) */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {STUDIO_PROGRAMS.map((prog, idx) => {
                const isSelected = activeTab === idx;

                return (
                  <div
                    key={prog.id}
                    onClick={() => setActiveTab(idx)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-xl ${
                      isSelected
                        ? 'bg-white/[0.07] border-white/20 shadow-2xl'
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 text-xs font-mono">
                      <span className={`font-bold ${prog.accent}`}>
                        {prog.num} / {prog.category}
                      </span>
                      <span className="text-stone-400 text-[11px] flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {prog.schedule}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wide text-white">
                      {prog.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-body text-stone-300 pt-2 leading-relaxed">
                      {prog.tagline}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Direct Studio Pass Action Bar */}
            <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/[0.08]">
              <span className="text-xs font-mono text-stone-400">
                DAILY MORNING & EVENING SLOTS AVAILABLE
              </span>

              <button
                onClick={() => onOpenInquiry(`Studio Pass: ${currentProgram.title}`)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 text-black font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 shadow-lg shrink-0"
              >
                <span>RESERVE PASS</span>
                <svg 
                  width="15" 
                  height="15" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-3.5 h-3.5 shrink-0 inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ minWidth: '15px', minHeight: '15px' }}
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Dark Moody Image Stage (6 cols) */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-stone-950">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProgram.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <img
                  src={currentProgram.image}
                  alt={currentProgram.title}
                  className="w-full h-full object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Bottom Minimal Specs */}
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1 pointer-events-none">
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                SANCTUARY ENVIRONMENT
              </div>
              <div className="text-lg sm:text-xl font-display uppercase tracking-wide text-white">
                ROAD NO. 36 · JUBILEE HILLS, HYDERABAD
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
