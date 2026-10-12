import React, { useState } from 'react';
import { 
  ARCHIVE_PROJECTS, 
  ArchiveProject, 
  ClientMediaAsset 
} from '../data/archiveData';
import { 
  Film, 
  Code, 
  ArrowUpRight, 
  LayoutGrid, 
  List, 
  SlidersHorizontal 
} from 'lucide-react';

interface ArchiveGridProps {
  blueprintMode: boolean;
  onSelectProject: (project: ArchiveProject) => void;
}

export const ArchiveGrid: React.FC<ArchiveGridProps> = ({
  blueprintMode,
  onSelectProject
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'archive' | 'index'>('archive');
  const [hoveredProject, setHoveredProject] = useState<ArchiveProject | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'dance', label: 'Choreography' },
    { id: 'yoga', label: 'Inversions' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'studio', label: 'Studio' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? ARCHIVE_PROJECTS
    : ARCHIVE_PROJECTS.filter((p) => p.category === activeCategory);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      id="archive" 
      className="py-20 md:py-32 relative bg-[#080809]"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Navigation & Filter Bar: Kaspar & Yakushev minimal controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
          
          {/* Category Tabs: pure minimal text with subtle opacity */}
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none text-xs font-mono-meta tracking-wider uppercase">
            <span className="text-stone-600 hidden md:inline">FILTER /</span>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`transition-all pb-1 relative cursor-pointer ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher: Archive Grid vs. Yakushev Index List */}
          <div className="flex items-center gap-4 text-xs font-mono-meta text-stone-400">
            <span className="text-stone-600">VIEW:</span>
            <button
              onClick={() => setViewMode('archive')}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'archive' ? 'text-white font-medium' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Archive</span>
            </button>
            <span className="text-stone-700">·</span>
            <button
              onClick={() => setViewMode('index')}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'index' ? 'text-white font-medium' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Index</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MODE A: THE MAXIMILIAN KASPAR CURATED VISUAL ARCHIVE           */}
        {/* Borderless images, varied aspect ratios, text minimally seen   */}
        {/* ============================================================== */}
        {viewMode === 'archive' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 md:gap-y-24 items-start">
            {filteredProjects.map((project, idx) => {
              // Varied dimensional pacing from Kaspar: alternating column widths and vertical offsets
              const isWide = project.aspectRatio === 'wide';
              const isTall = project.aspectRatio === 'tall';
              
              let colSpan = 'md:col-span-6';
              let offsetClass = '';
              let aspectBox = 'aspect-[4/3]';

              if (idx === 0) {
                // First piece: expansive landscape anchor
                colSpan = 'md:col-span-8 md:col-start-1';
                aspectBox = 'aspect-[16/9]';
              } else if (idx === 1) {
                // Second piece: offset right column
                colSpan = 'md:col-span-4 md:col-start-9 md:pt-16';
                aspectBox = 'aspect-[3/4]';
              } else if (idx === 2) {
                // Third piece: tall vertical column
                colSpan = 'md:col-span-5 md:col-start-2';
                aspectBox = 'aspect-[3/4]';
              } else if (idx === 3) {
                // Fourth piece: standard ratio offset
                colSpan = 'md:col-span-6 md:col-start-7 md:pt-20';
                aspectBox = 'aspect-[4/3]';
              } else if (idx === 4) {
                colSpan = 'md:col-span-7 md:col-start-1';
                aspectBox = 'aspect-[16/9]';
              } else {
                colSpan = 'md:col-span-5 md:col-start-8 md:pt-8';
                aspectBox = 'aspect-[4/3]';
              }

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`${colSpan} ${offsetClass} group cursor-pointer relative`}
                >
                  {/* Borderless Image Container */}
                  <div className={`relative w-full ${aspectBox} overflow-hidden bg-[#111113]`}>
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.04] group-hover:scale-[1.03] group-hover:brightness-[0.98] transition-all duration-700 ease-out"
                    />

                    {/* Subtle translucent dark glass scrim only on hover */}
                    <div 
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                      aria-hidden="true" 
                    />

                    {/* Minimal translucent text overlaid transparently on image */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Top Bar of Image */}
                      <div className="flex items-center justify-between text-[11px] font-mono-meta text-white/80">
                        <span className="tracking-widest">{project.index}</span>
                        {project.hasVideo ? (
                          <span className="flex items-center gap-1 text-amber-300 font-semibold">
                            <Film className="w-3 h-3" />
                            <span>VIDEO</span>
                          </span>
                        ) : (
                          <span className="text-white/60">{project.year}</span>
                        )}
                      </div>

                      {/* Bottom Info of Image (clean, transparently floating) */}
                      <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-[10px] font-mono-meta tracking-widest uppercase text-amber-400/90">
                          {project.role}
                        </div>
                        <h3 className="text-lg md:text-xl font-display font-medium text-white tracking-tight uppercase leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs text-white/70 font-light line-clamp-1">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Tiny video badge if idle */}
                    {project.hasVideo && (
                      <div className="absolute bottom-3 right-3 group-hover:opacity-0 transition-opacity pointer-events-none">
                        <span className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-amber-400 block border border-white/10">
                          <Film className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Minimal whisper-quiet caption below the image (Kaspar style) */}
                  <div className="mt-3 flex items-baseline justify-between text-[11px] font-mono-meta text-stone-500 tracking-wider">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="text-stone-300 group-hover:text-white transition-colors uppercase">
                        {project.title.split('·')[0]}
                      </span>
                      <span className="text-stone-700">/</span>
                      <span className="text-stone-500 hidden sm:inline">{project.location}</span>
                    </div>
                    <span className="text-stone-600 shrink-0">{project.year}</span>
                  </div>

                  {/* Blueprint JSON peek if enabled */}
                  {blueprintMode && (
                    <div className="mt-2 p-2 bg-black/90 border border-amber-400/30 text-[10px] font-mono-meta text-amber-300">
                      <span className="text-stone-400">SLOT:</span> {project.mediaAssets[0]?.source}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* MODE B: THE ARTIOM YAKUSHEV WORK INDEX LIST                    */}
        {/* Minimal tabular list, ultra-clean, hover thumbnail preview     */}
        {/* ============================================================== */}
        {viewMode === 'index' && (
          <div className="divide-y divide-white/[0.08] relative">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                className="py-5 group cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-white/[0.02] px-2"
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono-meta text-stone-500 group-hover:text-amber-400 transition-colors w-10">
                    {project.index}
                  </span>
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-medium text-white group-hover:text-amber-300 transition-colors uppercase">
                      {project.title}
                    </h3>
                    <div className="text-xs font-light text-stone-500 md:hidden">
                      {project.role} · {project.year}
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-12 text-xs font-mono-meta text-stone-400">
                  <span className="w-48 truncate text-stone-400">{project.role}</span>
                  <span className="w-36 text-stone-500">{project.location}</span>
                  <span className="w-16 text-right text-stone-500">{project.year}</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            ))}

            {/* Hover Floating Thumbnail (Artiom Yakushev signature feature) */}
            {hoveredProject && (
              <div
                className="hidden lg:block fixed pointer-events-none z-50 w-72 h-44 overflow-hidden rounded-sm border border-white/20 shadow-2xl transition-opacity duration-150"
                style={{
                  left: `${mousePos.x + 24}px`,
                  top: `${mousePos.y - 88}px`,
                }}
              >
                <img
                  src={hoveredProject.coverImage}
                  alt={hoveredProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-[10px] font-mono-meta text-white flex justify-between">
                  <span>{hoveredProject.title}</span>
                  <span className="text-amber-300">{hoveredProject.year}</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
