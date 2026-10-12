import React from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { ASSETS } from '../utils/imageAssets';
import { FadeInUp } from './EditorialReveal';
import { BlurImage } from './BlurImage';

interface ReelsSectionProps {
  theme: 'dark' | 'white';
  onOpenInquiry: (topic?: string) => void;
  onPlayVideo?: (title: string, url: string) => void;
}

export interface ArchivePostItem {
  id: string;
  title: string;
  category: string;
  image: string;
  instagramUrl: string;
}

const INSTAGRAM_ACCOUNT = 'https://www.instagram.com/nicyjosephdanceandfitness/?hl=en';

// Real post thumbnails & choreographies from Nicy Joseph Dance & Fitness
export const ARCHIVE_POSTS: ArchivePostItem[] = [
  {
    id: 'arch-1',
    title: 'Garba Arena Direction',
    category: 'CHOREOGRAPHY',
    image: ASSETS.workshopGarba,
    instagramUrl: INSTAGRAM_ACCOUNT
  },
  {
    id: 'arch-2',
    title: 'High-Cadence Cardio Lab',
    category: 'FITNESS SANCTUARY',
    image: ASSETS.mobilityLab,
    instagramUrl: INSTAGRAM_ACCOUNT
  },
  {
    id: 'arch-3',
    title: 'Artistic Directorial Portrait',
    category: 'DIRECTOR REPERTOIRE',
    image: ASSETS.artYakushevPortrait,
    instagramUrl: INSTAGRAM_ACCOUNT
  },
  {
    id: 'arch-4',
    title: 'Taj Falaknuma Royal Sangeet',
    category: 'PALACE COMMISSIONS',
    image: ASSETS.royalPalaceDance,
    instagramUrl: INSTAGRAM_ACCOUNT
  },
  {
    id: 'arch-5',
    title: 'Handstand & Inversion Lab',
    category: 'BIOMECHANICS',
    image: ASSETS.yogaInversion,
    instagramUrl: INSTAGRAM_ACCOUNT
  },
  {
    id: 'arch-6',
    title: 'Destination Palace Duet',
    category: 'FIRST DANCE',
    image: ASSETS.weddingSangeet,
    instagramUrl: INSTAGRAM_ACCOUNT
  },
  {
    id: 'arch-7',
    title: 'Screen Cinema Blocking',
    category: 'SCREEN DIRECTION',
    image: ASSETS.redSolo,
    instagramUrl: INSTAGRAM_ACCOUNT
  },
  {
    id: 'arch-8',
    title: 'Jubilee Hills Studio Cohort',
    category: 'STUDIO SANCTUARY',
    image: ASSETS.sanctuaryCohort,
    instagramUrl: INSTAGRAM_ACCOUNT
  }
];

export const ReelsSection: React.FC<ReelsSectionProps> = ({
  theme
}) => {
  const isWhite = theme === 'white';

  return (
    <section 
      id="reels" 
      className={`py-20 sm:py-24 select-none transition-colors duration-700 relative overflow-hidden ${
        isWhite ? 'bg-[#faf9f6] text-black' : 'bg-[#040406] text-white'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 space-y-10">
        
        {/* Clean, Minimal Header: Just ARCHIVE and direct Instagram Arrow */}
        <FadeInUp delay={0.05} yOffset={20}>
          <div className={`flex items-center justify-between pb-6 border-b ${
            isWhite ? 'border-black/10' : 'border-white/[0.08]'
          }`}>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight font-medium ${
              isWhite ? 'text-stone-900' : 'text-white'
            }`}>
              ARCHIVE
            </h2>

            <a
              href={INSTAGRAM_ACCOUNT}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 transition-colors text-xs font-mono tracking-widest uppercase group ${
                isWhite ? 'text-stone-600 hover:text-black' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Instagram className={`w-3.5 h-3.5 transition-colors ${
                isWhite ? 'text-stone-600 group-hover:text-black' : 'text-stone-400 group-hover:text-white'
              }`} />
              <span>INSTAGRAM</span>
              <ArrowUpRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ${
                isWhite ? 'text-stone-600 group-hover:text-black' : 'text-stone-400 group-hover:text-white'
              }`} />
            </a>
          </div>
        </FadeInUp>

        {/* ============================================================== */}
        {/* MINIMAL, UNCLUSTERED INSTAGRAM ARCHIVE GRID                    */}
        {/* Pure photographic cards with clean hover and direct link       */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-start">
          {ARCHIVE_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={`relative w-full aspect-[4/5] shadow-xl overflow-hidden group cursor-pointer transition-all duration-300 block rounded-none border ${
                isWhite 
                  ? 'bg-stone-100 border-black/10 hover:border-black/30' 
                  : 'bg-stone-950 border-white/10 hover:border-white/40'
              }`}
            >
              {/* Actual Real Photography Thumbnail */}
              <BlurImage
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-95 group-hover:brightness-105"
                containerClassName="w-full h-full"
              />

              {/* Natural Dark Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

              {/* Top Right Subtle Instagram Icon */}
              <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Clean Minimal Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none space-y-1">
                <div className="text-[10px] font-mono text-amber-200/90 uppercase tracking-widest">
                  {post.category}
                </div>

                <h3 className="text-sm sm:text-base font-display uppercase tracking-wide text-white font-medium line-clamp-1">
                  {post.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Minimal Bottom Action: Just an arrow link to Instagram */}
        <FadeInUp delay={0.15} yOffset={15}>
          <div className={`pt-4 flex justify-between items-center border-t ${
            isWhite ? 'border-black/10' : 'border-white/[0.08]'
          }`}>
            <span className={`text-xs font-mono tracking-wider ${
              isWhite ? 'text-stone-500' : 'text-stone-500'
            }`}>
              NICY JOSEPH DANCE & FITNESS
            </span>

            <a
              href={INSTAGRAM_ACCOUNT}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 text-xs font-mono transition-colors group ${
                isWhite ? 'text-stone-700 hover:text-black' : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>VIEW ALL ON INSTAGRAM</span>
              <ArrowUpRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ${
                isWhite ? 'text-stone-700 group-hover:text-black' : 'text-stone-400 group-hover:text-white'
              }`} />
            </a>
          </div>
        </FadeInUp>

      </div>
    </section>
  );
};
