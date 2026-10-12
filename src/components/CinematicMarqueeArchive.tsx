import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface CinematicMarqueeArchiveProps {
  theme: 'dark' | 'white';
  onPlayVideo?: (title: string, url: string) => void;
}

export const CinematicMarqueeArchive: React.FC<CinematicMarqueeArchiveProps> = ({
  theme,
  onPlayVideo
}) => {
  const isWhite = theme === 'white';

  const rowOneStills = [
    {
      reel: 'REEL 01',
      title: 'RAANJHANAA',
      spec: '35MM ANAMORPHIC · CRIMSON RIG',
      image: '/src/assets/images/gallery_krasota_red_solo_1790836710482.jpg'
    },
    {
      reel: 'REEL 02',
      title: 'FALAKNUMA PALACE',
      spec: 'ARRI ALEXA LF · NIZAM SUITE',
      image: '/src/assets/images/gallery_sangeet_falaknuma_grand_1790836647228.jpg'
    },
    {
      reel: 'REEL 03',
      title: 'ICARUS INVERSIONS',
      spec: 'HAUTE COUTURE · CHOREOGRAPHY',
      image: '/src/assets/images/gallery_icarus_classical_contemporary_1790836686898.jpg'
    },
    {
      reel: 'REEL 04',
      title: 'KINETIC SILHOUETTE',
      spec: '2.39:1 CINEMASCOPE · MONOCHROME',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 05',
      title: 'ROYAL SANGEET ENSEMBLE',
      spec: 'HYDERABAD PALACE · 120 DANCERS',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 06',
      title: 'ASANA PHYSICALITY',
      spec: 'BIOMECHANICS · ATHLETIC STUDIO',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 07',
      title: 'URBAN GROOVE ARCHITECTURE',
      spec: 'STREET POETRY · ISOLATIONS',
      image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 08',
      title: 'THE COUPLE FIRST DANCE',
      spec: 'BESPOKE WALTZ · LIVE DHOL',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85'
    }
  ];

  const rowTwoStills = [
    {
      reel: 'REEL 09',
      title: 'STAGE LIGHT REQUIEM',
      spec: 'THEATRICAL RIGGING · VOLUMETRIC',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 10',
      title: 'TAJ LAKE COURTYARD',
      spec: 'UDAIPUR · WATER STAGE DIRECTION',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 11',
      title: 'THEATRICAL SMOKE SOLO',
      spec: 'CONTEMPORARY RELEASE · LOW KEY',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 12',
      title: 'ALCAZAR MASTERCLASS',
      spec: 'SPRUNG FLOOR · NATURAL DAWN',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 13',
      title: 'UMAID BHAWAN SANDSTONE',
      spec: 'JODHPUR · 100-PIECE ENSEMBLE',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 14',
      title: 'OVERHEAD FORMATION',
      spec: 'CINEMATOGRAPHY · GEOMETRY',
      image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 15',
      title: 'SANIA MIRZA DIRECTION',
      spec: 'CHAMPION MOBILITY ARCHIVE',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85'
    },
    {
      reel: 'REEL 16',
      title: 'MIDNIGHT CHOREOGRAPHY',
      spec: 'CINEMA SCREENPLAY · HYDERABAD',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85'
    }
  ];

  return (
    <section className="py-20 overflow-hidden relative select-none">
      
      {/* Editorial Section Intro */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-14 mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-300/90 font-medium">
            STAGE & CINEMATOGRAPHY ARCHIVE
          </span>
          <h3 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-white">
            PRODUCTION REEL
          </h3>
        </div>
        <div className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
          16 MONUMENTAL FRAMES · HOVER TO EXPLORE
        </div>
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="flex gap-6 mb-6 overflow-hidden">
        <div className="animate-marquee flex gap-6 shrink-0">
          {rowOneStills.concat(rowOneStills).map((still, idx) => (
            <div
              key={`${still.title}-${idx}`}
              onClick={() => onPlayVideo?.(still.title, 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0')}
              className="relative w-[340px] sm:w-[440px] aspect-[16/9] overflow-hidden group cursor-pointer shrink-0 bg-stone-950 transition-all duration-700 group-hover:ring-1 group-hover:ring-amber-400/50 shadow-2xl"
            >
              <img
                src={still.image}
                alt={still.title}
                referrerPolicy="no-referrer"
                data-motion-blur="true"
                style={{
                  filter: 'blur(var(--scroll-blur, 0px)) contrast(1.18) brightness(0.78)',
                  willChange: 'filter, transform',
                }}
                className="w-full h-full object-cover group-hover:scale-108 group-hover:brightness-[0.98] transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none group-hover:opacity-75 transition-opacity" />

              {/* Film Trailer Lower-Third Slate */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
                <div>
                  <div className="text-[9px] font-mono text-amber-300 tracking-[0.25em] uppercase font-medium">
                    {still.reel}
                  </div>
                  <div className="text-base sm:text-lg font-display font-normal text-white uppercase tracking-wider group-hover:text-amber-100 transition-colors">
                    {still.title}
                  </div>
                  <div className="text-[9px] font-mono text-stone-400 tracking-widest uppercase">
                    {still.spec}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="flex gap-6 overflow-hidden">
        <div className="animate-marquee-reverse flex gap-6 shrink-0">
          {rowTwoStills.concat(rowTwoStills).map((still, idx) => (
            <div
              key={`${still.title}-rev-${idx}`}
              onClick={() => onPlayVideo?.(still.title, 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0')}
              className="relative w-[340px] sm:w-[440px] aspect-[16/9] overflow-hidden group cursor-pointer shrink-0 bg-stone-950 transition-all duration-700 group-hover:ring-1 group-hover:ring-amber-400/50 shadow-2xl"
            >
              <img
                src={still.image}
                alt={still.title}
                referrerPolicy="no-referrer"
                data-motion-blur="true"
                style={{
                  filter: 'blur(var(--scroll-blur, 0px)) contrast(1.18) brightness(0.78)',
                  willChange: 'filter, transform',
                }}
                className="w-full h-full object-cover group-hover:scale-108 group-hover:brightness-[0.98] transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none group-hover:opacity-75 transition-opacity" />

              {/* Film Trailer Lower-Third Slate */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
                <div>
                  <div className="text-[9px] font-mono text-amber-300 tracking-[0.25em] uppercase font-medium">
                    {still.reel}
                  </div>
                  <div className="text-base sm:text-lg font-display font-normal text-white uppercase tracking-wider group-hover:text-amber-100 transition-colors">
                    {still.title}
                  </div>
                  <div className="text-[9px] font-mono text-stone-400 tracking-widest uppercase">
                    {still.spec}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
