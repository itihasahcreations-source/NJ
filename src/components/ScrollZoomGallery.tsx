import React, { useState } from 'react';
import { ArrowUpRight, Play, Film } from 'lucide-react';

interface ScrollZoomGalleryProps {
  theme: 'dark' | 'white';
  onSelectProject: (project: any) => void;
  onOpenShowreel: () => void;
}

export const ScrollZoomGallery: React.FC<ScrollZoomGalleryProps> = ({
  theme,
  onSelectProject,
  onOpenShowreel
}) => {
  const isWhite = theme === 'white';
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const projects = [
    {
      id: 'proj-1',
      index: '01',
      title: 'RAANJHANAA',
      category: 'CHOREOGRAPHY FILM & DIRECTION',
      year: '2024',
      badge: 'OFFICIAL YOUTUBE FILM',
      hasVideo: true,
      image: '/src/assets/images/gallery_krasota_red_solo_1790836710482.jpg',
      aspect: 'lg:col-span-8 aspect-[16/10]',
      summary: 'Contemporary Bollywood choreographic direction in crimson spotlight.'
    },
    {
      id: 'proj-2',
      index: '02',
      title: 'ICARUS',
      category: 'ROYAL SANGEET ENSEMBLE',
      year: '2024',
      badge: 'BRIDES TODAY TOP 10',
      hasVideo: false,
      image: '/src/assets/images/gallery_icarus_classical_contemporary_1790836686898.jpg',
      aspect: 'lg:col-span-4 aspect-[4/5]',
      summary: 'Palace wedding ensemble stage production.'
    },
    {
      id: 'proj-3',
      index: '03',
      title: 'POEM OF ASANA',
      category: 'BIOMECHANICS & INVERSIONS',
      year: '2023',
      badge: 'SANIA MIRZA COLLAB',
      hasVideo: false,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=85',
      aspect: 'lg:col-span-4 aspect-[4/5]',
      summary: 'Architectural handstand inversion and scapular precision.'
    },
    {
      id: 'proj-4',
      index: '04',
      title: 'LUMORA',
      category: 'IMMERSIVE PROJECTION STAGE',
      year: '2023',
      badge: 'HYD DANCE FESTIVAL',
      hasVideo: false,
      image: '/src/assets/images/gallery_lumora_troupe_duet_1790836738609.jpg',
      aspect: 'lg:col-span-8 aspect-[16/10]',
      summary: 'Duet movement performance bathed in atmospheric cobalt and amber projection.'
    },
    {
      id: 'proj-5',
      index: '05',
      title: 'TERRA MUDRA',
      category: 'CLASSICAL × CONTEMPORARY',
      year: '2024',
      badge: 'REPERTOIRE MASTERPIECE',
      hasVideo: false,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=85',
      aspect: 'lg:col-span-6 aspect-[16/11]',
      summary: 'Expressive Indian mudra handwork merged with explosive floor speed.'
    },
    {
      id: 'proj-6',
      index: '06',
      title: 'JUBILEE SANCTUARY',
      category: 'STUDIO PROVENANCE & SESSIONS',
      year: 'EST. 2020',
      badge: 'DAILY BATCHES',
      hasVideo: false,
      image: '/src/assets/images/studio_rehearsal_backstage_1790835788315.jpg',
      aspect: 'lg:col-span-6 aspect-[16/11]',
      summary: 'Daily artist training, choreography rehearsals, and private movement coaching.'
    }
  ];

  return (
    <section 
      id="work" 
      className={`py-24 md:py-36 select-none border-none transition-colors duration-500 ${
        isWhite ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <div className="max-w-[1680px] mx-auto px-6 md:px-14 space-y-12">
        
        {/* Minimal Kicker & Header (art-yakushev.com layout) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4">
          <div className="space-y-3">
            <div className={`text-xs font-mono-meta font-bold tracking-[0.24em] uppercase ${
              isWhite ? 'text-stone-500' : 'text-stone-400'
            }`}>
              01 / SELECTED COMMISSIONS
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-condensed font-black tracking-tight uppercase leading-none">
              CHOREOGRAPHY & STAGE
            </h2>
          </div>

          <div className="text-xs font-mono-meta text-stone-500 uppercase tracking-widest hidden sm:block">
            HOVER TO ZOOM · CLICK TO EXPAND
          </div>
        </div>

        {/* Dynamic Asymmetric Grid (Inspired by art-yakushev.com) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {projects.map((proj) => {
            const isHovered = hoveredId === proj.id;

            return (
              <div
                key={proj.id}
                onClick={() => {
                  if (proj.hasVideo) {
                    onOpenShowreel();
                  } else {
                    onSelectProject(proj);
                  }
                }}
                onMouseEnter={() => setHoveredId(proj.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`${proj.aspect} relative overflow-hidden rounded-none cursor-pointer shadow-xl group border-none transition-all duration-700`}
              >
                {/* Background Image with Smooth Interactive Zoom */}
                <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.12] brightness-[0.85] group-hover:scale-105 group-hover:brightness-[0.98] transition-transform duration-1000 ease-out rounded-none"
                />

                {/* Scrim Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none rounded-none"
                  aria-hidden="true"
                />

                {/* Top Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-3 py-1 text-[10px] font-mono-meta font-bold uppercase tracking-widest bg-black/75 backdrop-blur-md text-white border border-white/20">
                    {proj.badge}
                  </span>
                </div>

                {/* Top Right Action Arrow */}
                <div className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Center Video Play Badge if Video */}
                {proj.hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Bottom Minimal Text ON IMAGE (Zero Text Outside!) */}
                <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none flex items-end justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono-meta text-stone-300 uppercase tracking-widest font-semibold">
                      {proj.index} / {proj.category}
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-condensed font-black text-white uppercase tracking-tight leading-none group-hover:text-amber-200 transition-colors">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-stone-300 font-light line-clamp-1 max-w-md pt-1">
                      {proj.summary}
                    </p>
                  </div>

                  <span className="text-xs font-mono-meta text-stone-400 uppercase tracking-widest hidden sm:inline">
                    {proj.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
