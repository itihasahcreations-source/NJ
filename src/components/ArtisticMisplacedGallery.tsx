import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowUpRight, Maximize2, Minimize2 } from 'lucide-react';

interface ArchiveTile {
  id: string;
  title: string;
  spec: string;
  image: string;
  aspect: string;
  expandedAspect: string;
  isVideo?: boolean;
  videoUrl?: string;
  note: string;
}

interface ArtisticMisplacedGalleryProps {
  theme: 'dark' | 'white';
  onPlayVideo?: (title: string, url: string) => void;
}

export const ArtisticMisplacedGallery: React.FC<ArtisticMisplacedGalleryProps> = ({
  theme,
  onPlayVideo
}) => {
  const isWhite = theme === 'white';
  const [expandedId, setExpandedId] = useState<string | null>('tile-2');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Multi-plane parallax speeds across alternating columns (art-yakushev style)
  const yColSlow = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const yColFast = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const yColMedium = useTransform(scrollYProgress, [0, 1], [-14, 18]);

  const galleryTiles: ArchiveTile[] = [
    {
      id: 'tile-1',
      title: 'RAANJHANAA',
      spec: '35MM THEATRICAL SOLO',
      image: '/src/assets/images/gallery_krasota_red_solo_1790836710482.jpg',
      aspect: 'aspect-[4/3]',
      expandedAspect: 'aspect-[16/10]',
      isVideo: true,
      videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0',
      note: 'Contemporary Indian classical mudras translated into cinematic screen motion.'
    },
    {
      id: 'tile-2',
      title: 'THE PRIVATE ATELIER',
      spec: 'DIRECTORIAL RESIDENCY',
      image: '/src/assets/images/residency_private_atelier_1790850691865.jpg',
      aspect: 'aspect-[16/10]',
      expandedAspect: 'aspect-[16/9]',
      isVideo: false,
      note: 'High-ceiling sprung maple dance sanctuary in Jubilee Hills Road No. 36.'
    },
    {
      id: 'tile-3',
      title: 'UMAID BHAWAN COURTYARD',
      spec: 'PALACE ENSEMBLE',
      image: '/src/assets/images/gallery_icarus_classical_contemporary_1790836686898.jpg',
      aspect: 'aspect-[3/4]',
      expandedAspect: 'aspect-[4/5]',
      isVideo: false,
      note: 'Monumental royal sandstone courtyards under twilight skies.'
    },
    {
      id: 'tile-4',
      title: 'TAJ FALAKNUMA GRAND',
      spec: 'HERITAGE RESIDENCY',
      image: '/src/assets/images/gallery_sangeet_falaknuma_grand_1790836647228.jpg',
      aspect: 'aspect-[16/11]',
      expandedAspect: 'aspect-[16/9]',
      isVideo: false,
      note: 'Imperial marble staircase ensembles under 101-dining chandeliers.'
    },
    {
      id: 'tile-5',
      title: 'SANCTUARY COHORT',
      spec: 'TROUPE REPERTOIRE',
      image: '/src/assets/images/residency_sanctuary_cohort_1790850703020.jpg',
      aspect: 'aspect-[4/3]',
      expandedAspect: 'aspect-[16/10]',
      isVideo: false,
      note: 'Contemporary release technique and synchronized troupe geometry.'
    },
    {
      id: 'tile-6',
      title: 'POEM OF ASANA',
      spec: 'ATHLETIC BIOMECHANICS',
      image: '/src/assets/images/residency_mobility_lab_1790850714919.jpg',
      aspect: 'aspect-[3/4]',
      expandedAspect: 'aspect-[4/5]',
      isVideo: false,
      note: 'Handstand inversions and scapular conditioning tailored for championship athletes.'
    }
  ];

  const handleToggle = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section 
      ref={sectionRef}
      id="repertoire" 
      className={`py-20 sm:py-28 md:py-36 select-none border-t border-b transition-colors duration-700 relative overflow-hidden ${
        isWhite ? 'bg-[#f7f7f5] text-black border-black/10' : 'bg-[#060608] text-white border-white/10'
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-14 space-y-12">
        
        {/* Clean, Normal Luxury Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-current/15">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#facc15] uppercase font-bold block">
              ACT 02 / CURATED SCENES & REPERTOIRE
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light uppercase tracking-wide text-white">
              MOVEMENT ARCHIVE
            </h2>
          </div>

          <div className="text-[11px] font-mono text-stone-400 uppercase tracking-widest flex items-center gap-3">
            <span>6 CURATED SCENES</span>
            <span className="text-[#facc15]">• CLICK ANY TILE TO EXPAND</span>
          </div>
        </div>

        {/* Human Asymmetric 3-Column Grid with Multi-Plane Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {galleryTiles.map((tile, idx) => {
            const isExpanded = expandedId === tile.id;
            const parallaxY = idx % 3 === 0 ? yColSlow : idx % 3 === 1 ? yColFast : yColMedium;

            return (
              <motion.div
                key={tile.id}
                layout
                style={{ y: isExpanded ? 0 : parallaxY }}
                onClick={() => handleToggle(tile.id)}
                className={`relative group cursor-pointer transition-all duration-700 ${
                  isExpanded ? 'lg:col-span-2 scale-[1.01]' : 'col-span-1'
                } ${idx % 2 === 1 ? 'md:mt-6 lg:mt-10' : ''}`}
              >
                <div className="relative overflow-hidden bg-stone-950 shadow-2xl group-hover:ring-1 group-hover:ring-[#facc15]/40 transition-all duration-500">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    referrerPolicy="no-referrer"
                    data-motion-blur="true"
                    style={{
                      filter: 'blur(var(--scroll-blur, 0px)) contrast(1.18) brightness(0.88)',
                      willChange: 'filter, transform',
                    }}
                    className={`w-full ${isExpanded ? tile.expandedAspect : tile.aspect} object-cover object-center group-hover:scale-105 group-hover:brightness-[0.98] transition-all duration-700 ease-out`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

                  {/* Expand / Minimize Affordance */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#facc15] group-hover:text-black transition-all">
                      {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  {/* Play Button if Video */}
                  {tile.isVideo && !isExpanded && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-white/95 text-black flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#facc15] transition-all">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Minimal Caption on Tile */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 pointer-events-none space-y-1">
                    <div className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#facc15]">
                      {tile.spec}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-light uppercase tracking-wide text-white group-hover:text-amber-100 transition-colors">
                      {tile.title}
                    </h3>

                    {isExpanded && (
                      <p className="text-xs sm:text-sm font-body text-stone-300 pt-1 line-clamp-2 animate-in fade-in duration-300">
                        {tile.note}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span className="uppercase">{tile.title}</span>
                  <span className="text-[#facc15] group-hover:underline">
                    {isExpanded ? 'COLLAPSE' : 'EXPAND VIEW'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
