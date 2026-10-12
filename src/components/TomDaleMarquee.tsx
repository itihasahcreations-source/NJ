import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TomDaleMarqueeProps {
  theme: 'dark' | 'white';
  onExploreProjects: () => void;
}

export const TomDaleMarquee: React.FC<TomDaleMarqueeProps> = ({
  theme,
  onExploreProjects
}) => {
  const isWhite = theme === 'white';

  const marqueeText = "CONTEMPORARY PERFORMANCE * WORLD CLASS INDIAN MOVEMENT * ROYAL SANGEET * HANDSTAND INVERSIONS * JUBILEE HILLS STUDIO * DANCE.FILM.PERFORMANCE * ";

  return (
    <section id="about-section" className={`py-16 md:py-24 border-t overflow-hidden transition-colors duration-300 ${
      isWhite ? 'bg-white text-black border-black/10' : 'bg-[#080809] text-white border-white/10'
    }`}>
      
      {/* 2-Column Content Staging: Exact Screenshot 29 Layout */}
      <div className="max-w-[1520px] mx-auto px-6 md:px-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Editorial Philosophy & Electric Button (Screenshot 29) */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-6 text-sm sm:text-base md:text-lg font-light leading-relaxed text-balance">
            <p className={isWhite ? 'text-stone-800' : 'text-stone-200'}>
              We collaborate with dancers, performers, and visionary wedding clients to create 
              emotionally resonant, culturally grounded, and technically innovative choreographies. 
              As we evolve, we explore new models for stage production and distribution, bringing Indian movement 
              to unexpected places through cinematic lighting, projection aesthetics, and immersive masterclasses.
            </p>

            <p className={isWhite ? 'text-stone-600' : 'text-stone-400'}>
              We explore new ideas, aesthetics and techniques with an exceptional team of dancers, 
              musicians, wedding directors, calisthenics athletes, and visual artists across Hyderabad and destination venues.
            </p>
          </div>

          {/* Electric Neon Accent Button from Screenshot 29 */}
          <div className="pt-2">
            <button
              onClick={onExploreProjects}
              className={`px-8 py-4 text-xs sm:text-sm font-mono-meta font-extrabold uppercase tracking-widest rounded-none transition-all cursor-pointer shadow-lg active:scale-95 ${
                isWhite
                  ? 'bg-black text-white hover:bg-stone-800'
                  : 'bg-[#a3e635] text-black hover:bg-[#bef264] hover:shadow-[0_0_30px_rgba(163,230,53,0.3)]'
              }`}
            >
              EXPLORE PROJECTS
            </button>
          </div>
        </div>

        {/* Right Column: Striking Dancer in Projection Light (Screenshot 29) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full aspect-[4/3] max-w-xl overflow-hidden rounded-xl shadow-2xl">
            <img
              src="/src/assets/images/gallery_lumora_troupe_duet_1790836738609.jpg"
              alt="Dancer bathed in projection and stage light"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-[1.1] hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" 
              aria-hidden="true" 
            />
          </div>
        </div>

      </div>

      {/* 4th Image Feature: Giant Scrolling Kinetic Marquee Banner (Exact Screenshot 29) */}
      <div className={`py-6 border-y overflow-hidden select-none ${
        isWhite ? 'bg-stone-100 border-black/15 text-black' : 'bg-black border-white/10 text-[#a3e635]'
      }`}>
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight uppercase">
            {marqueeText}
          </span>
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight uppercase">
            {marqueeText}
          </span>
        </div>
      </div>

    </section>
  );
};
