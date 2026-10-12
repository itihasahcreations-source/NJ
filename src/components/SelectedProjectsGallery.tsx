import React, { useState } from 'react';
import { ARCHIVE_PROJECTS, ArchiveProject } from '../data/archiveData';
import { ArrowRight, Film } from 'lucide-react';

interface SelectedProjectsGalleryProps {
  theme: 'dark' | 'white';
  blueprintMode: boolean;
  onSelectProject: (project: ArchiveProject) => void;
  onViewAllKaspar: () => void;
}

export const SelectedProjectsGallery: React.FC<SelectedProjectsGalleryProps> = ({
  theme,
  blueprintMode,
  onSelectProject,
  onViewAllKaspar
}) => {
  const isWhite = theme === 'white';
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="selected-projects" className={`transition-colors duration-300 relative ${
      isWhite ? 'bg-[#ffffff] text-black' : 'bg-black text-white'
    }`}>
      
      {/* ============================================================== */}
      {/* 1. EDITORIAL STATEMENT BLOCK (Exact Screenshot 27 Top Section) */}
      {/* ============================================================== */}
      <div id="about-statement" className={`py-24 md:py-36 px-6 md:px-12 border-b ${
        isWhite ? 'border-black/10' : 'border-white/[0.08]'
      }`}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-light leading-relaxed tracking-tight text-balance">
            An award-winning contemporary dance company and production agency in Hyderabad, 
            integrating Indian movement, visual arts and fashion. We make live performance, film and 
            original choreographies for weddings, brands and for the stage.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SELECTED PROJECTS HEADER WITH MISTY GLOW (Screenshot 27)    */}
      {/* ============================================================== */}
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 pt-20 pb-28 space-y-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          
          <div className="space-y-3">
            {/* Exact Screenshot 27 Kicker: 01 · SELECTED PROJECTS */}
            <div className={`text-xs font-mono-meta tracking-[0.2em] uppercase font-bold ${
              isWhite ? 'text-stone-500' : 'text-stone-400'
            }`}>
              01 · SELECTED PROJECTS
            </div>

            {/* Title with Misty Blur Aura Glow (Screenshot 27) */}
            <div className="relative">
              <div 
                className="absolute -top-2 left-0 text-4xl sm:text-6xl md:text-7xl font-condensed font-black tracking-tight uppercase opacity-40 blur-lg pointer-events-none select-none"
                style={{
                  color: isWhite ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)'
                }}
                aria-hidden="true"
              >
                SELECTED PROJECTS
              </div>

              <h2 className="relative text-4xl sm:text-6xl md:text-7xl font-condensed font-black tracking-tight uppercase leading-none">
                SELECTED PROJECTS
              </h2>
            </div>
          </div>

          {/* Right link: VIEW ALL PROJECTS → */}
          <button
            onClick={onViewAllKaspar}
            className={`flex items-center gap-2 text-xs md:text-sm font-mono-meta font-bold uppercase tracking-widest transition-colors cursor-pointer group pb-2 ${
              isWhite ? 'text-stone-800 hover:text-black' : 'text-stone-400 hover:text-white'
            }`}
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* ============================================================== */}
        {/* 3. 3-COLUMN LARGE ROUNDED CARDS (Exact Screenshot 25 & 27)     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ARCHIVE_PROJECTS.map((project) => {
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-[24px] overflow-hidden aspect-[4/3] group cursor-pointer shadow-xl transition-all duration-500 border ${
                  isWhite 
                    ? 'bg-stone-100 border-black/10 hover:shadow-2xl' 
                    : 'bg-[#121215] border-white/10 hover:border-white/30'
                }`}
              >
                {/* Background Image */}
                <img
                  src={project.coverImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.88] group-hover:scale-105 group-hover:brightness-[0.98] transition-all duration-700 ease-out"
                />

                {/* Scrim Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Left Badge (Screenshot 25: GOLD · 1.4 AWARDS) */}
                {project.awardBadge && (
                  <div className="absolute top-5 left-5 z-10">
                    <span className="px-3 py-1 text-[10px] md:text-[11px] font-mono-meta font-bold rounded-sm uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {project.awardBadge}
                    </span>
                  </div>
                )}

                {/* Top Right Video Icon if project contains video */}
                {project.hasVideo && (
                  <div className="absolute top-5 right-5 z-10">
                    <span className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-amber-400 block border border-white/20">
                      <Film className="w-3.5 h-3.5" />
                    </span>
                  </div>
                )}

                {/* Bottom Content Area: Title + Subtitle + VIEW → (Screenshot 25) */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-4 pointer-events-none">
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-condensed font-black text-white uppercase tracking-tight leading-none group-hover:text-stone-100 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-stone-300 font-light line-clamp-1 max-w-xs">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono-meta font-bold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                    <span>VIEW</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Blueprint Mode JSON Badge if turned on */}
                {blueprintMode && (
                  <div className="absolute top-12 left-5 z-10 p-1.5 rounded bg-black/90 border border-amber-400/40 text-[9px] font-mono-meta text-amber-300">
                    SLOT: {project.mediaAssets[0]?.fileCode} ({project.mediaAssets.length} ASSETS)
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
