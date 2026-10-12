import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, Maximize2, X } from 'lucide-react';
import { ASSETS } from '../utils/imageAssets';

interface KasparArchiveAestheticProps {
  theme: 'dark' | 'white';
  onPlayVideo?: (title: string, url: string) => void;
}

interface KasparMediaAsset {
  fileCode: string;
  title: string;
  type: 'video' | 'photo';
  image: string;
  videoUrl?: string;
  category: string;
  dimensions: string;
}

const KASPAR_ASSETS: KasparMediaAsset[] = [
  {
    fileCode: 'nj_001.mp4',
    title: 'RAANJHANAA · THEATRICAL MOTION',
    type: 'video',
    image: ASSETS.redSolo,
    videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0',
    category: 'CHOREOGRAPHY',
    dimensions: '3840x2160'
  },
  {
    fileCode: 'nj_002.jpg',
    title: 'ROYAL FALAKNUMA ENTRANCE',
    type: 'photo',
    image: ASSETS.royalPalaceDance,
    category: 'WEDDING CINEMA',
    dimensions: '4000x2667'
  },
  {
    fileCode: 'nj_003.jpg',
    title: 'JUBILEE HILLS MOVEMENT LAB',
    type: 'photo',
    image: ASSETS.jubileeSanctuary,
    category: 'STUDIO SANCTUARY',
    dimensions: '3840x2160'
  },
  {
    fileCode: 'nj_004.jpg',
    title: 'CONTEMPORARY RELEASE & SUSPENSION',
    type: 'photo',
    image: ASSETS.darkContemporary,
    category: 'PERFORMANCE',
    dimensions: '3840x2160'
  },
  {
    fileCode: 'nj_005.mp4',
    title: 'GARBA & FOLK CONTEMPORARY UTSAV',
    type: 'video',
    image: ASSETS.workshopGarba,
    videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0',
    category: 'FESTIVAL ARENA',
    dimensions: '1920x1080'
  },
  {
    fileCode: 'nj_006.jpg',
    title: 'INTERNATIONAL MUDRA ALIGNMENT',
    type: 'photo',
    image: ASSETS.internationalMudra,
    category: 'CLASSICAL RESEARCH',
    dimensions: '4000x3000'
  },
  {
    fileCode: 'nj_007.mp4',
    title: '50-DANCER SANGEET SPECTACLE',
    type: 'video',
    image: ASSETS.weddingSangeet,
    videoUrl: 'https://www.youtube-nocookie.com/embed/3JZ_D3ELwOQ?autoplay=1&mute=0',
    category: 'PALACE STAGING',
    dimensions: '1920x1080'
  },
  {
    fileCode: 'nj_008.jpg',
    title: 'ATELIER 1-ON-1 INVERSIONS',
    type: 'photo',
    image: ASSETS.privateAtelier,
    category: 'BIOMECHANICS',
    dimensions: '3840x2160'
  }
];

export const KasparArchiveAesthetic: React.FC<KasparArchiveAestheticProps> = ({
  theme,
  onPlayVideo
}) => {
  const isWhite = theme === 'white';
  const [activeAsset, setActiveAsset] = useState<KasparMediaAsset | null>(null);

  return (
    <section className={`py-24 sm:py-32 select-none transition-colors duration-500 relative border-t border-b ${
      isWhite ? 'bg-[#f7f6f2] text-black border-black/10' : 'bg-[#030304] text-white border-white/[0.08]'
    }`}>
      <div className="max-w-[1780px] mx-auto px-4 sm:px-6 md:px-10 space-y-8">
        
        {/* Top Minimal Coordinate Bar */}
        <div className={`flex flex-col sm:flex-row items-baseline justify-between gap-4 pb-2 text-xs font-mono tracking-widest ${
          isWhite ? 'text-stone-600' : 'text-stone-400'
        }`}>
          <div className="flex items-center gap-4">
            <span className={`font-bold tracking-[0.2em] ${
              isWhite ? 'text-black' : 'text-white'
            }`}>
              ■ NICY JOSEPH ARCHIVE
            </span>
            <span className={isWhite ? 'text-stone-400' : 'text-stone-600'}>/</span>
            <span>MULTI-ASSET INDEX (8 FRAMES)</span>
          </div>

          <div className="text-[11px] text-stone-500 uppercase tracking-widest">
            HYDERABAD · JUBILEE HILLS · WORLDWIDE
          </div>
        </div>

        {/* 4-Column × 2-Row Maximilian Kaspar Grid with ASCII art in gutters (Screenshots 49 & 50) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {KASPAR_ASSETS.map((asset, idx) => (
            <div key={asset.fileCode} className="space-y-2 group">
              
              {/* Rectangular Media Frame */}
              <div 
                onClick={() => {
                  if (asset.type === 'video' && asset.videoUrl) {
                    onPlayVideo?.(asset.title, asset.videoUrl);
                  } else {
                    setActiveAsset(asset);
                  }
                }}
                className={`relative aspect-[4/3] w-full bg-stone-950 overflow-hidden cursor-pointer border transition-all duration-300 shadow-xl ${
                  isWhite 
                    ? 'border-black/10 hover:border-amber-600/50' 
                    : 'border-white/10 hover:border-amber-300/50'
                }`}
              >
                <img
                  src={asset.image}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Video Play Trigger or Still Enlarge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {asset.type === 'video' ? (
                    <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-amber-300 group-hover:text-black group-hover:scale-110 transition-all">
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Minimal Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 text-[10px] font-mono uppercase tracking-wider text-stone-300 truncate pointer-events-none">
                  {asset.title}
                </div>
              </div>

              {/* Bottom File Code Label & ASCII Text Accent (Exact Maximilian Kaspar Layout) */}
              <div className={`flex items-start justify-between text-xs font-mono pt-1 ${
                isWhite ? 'text-stone-700' : 'text-stone-400'
              }`}>
                <span className={`transition-colors font-bold ${
                  isWhite ? 'group-hover:text-amber-700 text-stone-900' : 'group-hover:text-amber-300'
                }`}>
                  {asset.fileCode}
                </span>

                {/* Maximilian Kaspar ASCII Art Accent */}
                <div className="text-[8px] leading-[9px] font-mono text-stone-600 select-none opacity-60 text-right">
                  {idx % 2 === 0 ? (
                    <>
                      ::% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;###<br />
                      .##1111*<br />
                      +--1111+=
                    </>
                  ) : (
                    <>
                      @#####===--<br />
                      1*1*11#11#<br />
                      -%=+*++-
                    </>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox for inspecting stills */}
      <AnimatePresence>
        {activeAsset && (
          <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-stone-950 rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setActiveAsset(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-amber-300 hover:text-black text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={activeAsset.image}
                  alt={activeAsset.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-1 bg-stone-950 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                    {activeAsset.fileCode} · {activeAsset.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wide text-white">
                    {activeAsset.title}
                  </h3>
                </div>

                <div className="text-xs font-mono text-stone-500">
                  {activeAsset.dimensions}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
