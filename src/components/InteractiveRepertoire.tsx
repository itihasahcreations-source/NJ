import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, ArrowUpRight, Film, Sparkles } from 'lucide-react';
import { ASSETS } from '../utils/imageAssets';

interface InteractiveRepertoireProps {
  theme: 'dark' | 'white';
  onPlayVideo?: (title: string, url: string) => void;
  onOpenInquiry?: (topic?: string) => void;
}

interface RepertoireFilm {
  id: string;
  title: string;
  category: string;
  duration: string;
  accentColor: string;
  image: string;
  videoUrl: string;
  synopsis: string;
  credits: string;
}

const REPERTOIRE_FILMS: RepertoireFilm[] = [
  {
    id: 'film-1',
    title: 'RAANJHANAA · THEATRICAL MOTION',
    category: 'SCREEN CHOREOGRAPHY',
    duration: '03:42',
    accentColor: 'text-rose-300',
    image: ASSETS.redSolo,
    videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0',
    synopsis: 'Translating traditional mudras into cinematic screen blocking and fluid floorwork.',
    credits: 'Direction & Movement: Nicy Joseph'
  },
  {
    id: 'film-2',
    title: 'ROYAL FALAKNUMA PALACE SANGEET',
    category: 'WEDDING CINEMA',
    duration: '04:15',
    accentColor: 'text-amber-200',
    image: ASSETS.weddingSangeet,
    videoUrl: 'https://www.youtube-nocookie.com/embed/3JZ_D3ELwOQ?autoplay=1&mute=0',
    synopsis: 'Grand couple entrance and multi-generational sangeet staged under imperial chandeliers.',
    credits: 'Sangeet Production: 45 Dancers'
  },
  {
    id: 'film-3',
    title: 'INSCAPE & ATHLETIC LAB',
    category: 'CONTEMPORARY RELEASE',
    duration: '02:50',
    accentColor: 'text-emerald-300',
    image: ASSETS.surgeDancer,
    videoUrl: 'https://www.youtube-nocookie.com/embed/fJ9rUzIMcZQ?autoplay=1&mute=0',
    synopsis: 'Gravity-defying floorwork, scapular inversions, and continuous kinetic momentum.',
    credits: 'Contemporary Duet Choreography'
  },
  {
    id: 'film-4',
    title: 'GARBA & FOLK CONTEMPORARY UTSAV',
    category: 'FESTIVAL REEL',
    duration: '03:10',
    accentColor: 'text-amber-300',
    image: ASSETS.workshopGarba,
    videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0',
    synopsis: 'High-octane rhythmic footwork and swirling circular patterns with modern musicality.',
    credits: 'Workshop Ensemble'
  }
];

// Tactile 3D Tilt Card Component powered by Framer Motion
const TiltCard: React.FC<{
  film: RepertoireFilm;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}> = ({ film, isHovered, onClick, onMouseEnter }) => {
  // Motion values for mouse coordinates relative to card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, high-fidelity luxury spring physics (zero drag, instantaneous response)
  const springConfig = { damping: 22, stiffness: 380, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle luxury tilt: max ±7 degrees for natural tactile depth
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-7deg', '7deg']);
  
  // Dynamic specular lighting reflection coordinates
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['10%', '90%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: '1100px' }} className="w-full">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        className={`relative aspect-[3/4] rounded-3xl cursor-pointer overflow-hidden flex flex-col justify-between p-6 sm:p-7 backdrop-blur-2xl group transition-all duration-300 will-change-transform ${
          isHovered
            ? 'bg-gradient-to-b from-white/[0.12] to-white/[0.04] shadow-[0_30px_70px_rgba(0,0,0,0.85)] ring-1 ring-white/25 -translate-y-1.5'
            : 'bg-white/[0.03] hover:bg-white/[0.06] shadow-xl'
        }`}
      >
        {/* Dynamic Specular Glare Layer that tracks mouse light */}
        <motion.div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18) 0%, transparent 65%)`,
          }}
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Visual Backdrop Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={film.image}
            alt={film.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-108 opacity-45 brightness-110' : 'scale-100 opacity-25 filter grayscale'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Top Metadata */}
        <div 
          style={{ transform: 'translateZ(20px)' }}
          className="flex items-center justify-between text-[11px] font-mono tracking-wider z-20"
        >
          <span className={film.accentColor}>
            {film.category}
          </span>
          <span className="text-stone-400">{film.duration}</span>
        </div>

        {/* Central Play Trigger Button (Pop out with 3D depth) */}
        <div 
          style={{ transform: 'translateZ(35px)' }}
          className="my-auto py-4 flex items-center justify-center z-20"
        >
          <div className={`w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? 'bg-gradient-to-r from-amber-200 to-rose-200 text-black scale-110 shadow-2xl'
              : 'bg-white/15 text-white group-hover:bg-white/30'
          }`}>
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          </div>
        </div>

        {/* Bottom Details (Pop out in 3D) */}
        <div 
          style={{ transform: 'translateZ(25px)' }}
          className="space-y-2 z-20"
        >
          <h3 className="text-lg font-display font-light uppercase tracking-wide text-white group-hover:text-amber-100 transition-colors">
            {film.title}
          </h3>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1 pt-1 overflow-hidden"
              >
                <p className="text-xs font-body text-stone-300 leading-snug line-clamp-2">
                  {film.synopsis}
                </p>
                <div className="text-[10px] font-mono text-stone-400 pt-0.5">
                  {film.credits}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-stone-400 border-t border-white/[0.08]">
            <span>PLAY FILM</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-200" />
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export const InteractiveRepertoire: React.FC<InteractiveRepertoireProps> = ({
  theme,
  onPlayVideo,
  onOpenInquiry
}) => {
  const isWhite = theme === 'white';
  const [activeFilmIndex, setActiveFilmIndex] = useState<number>(0);

  return (
    <section 
      id="repertoire" 
      className={`py-20 sm:py-28 md:py-36 select-none transition-colors duration-500 relative overflow-hidden ${
        isWhite ? 'bg-[#faf9f6] text-black' : 'bg-[#060608] text-white'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-[#f5d77f]">
              <Film className="w-3.5 h-3.5 text-amber-300" />
              <span>ACT 04 / CURATED REPERTOIRE</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light uppercase tracking-tight text-white leading-none">
              CINEMATIC WORKS & FILMS
            </h2>
          </div>

          <div className="text-right text-xs font-mono text-stone-400">
            <span>4 SIGNATURE REELS · 3D TACTILE INTERACTION</span>
            <div className="text-[10px] text-amber-200/80 pt-1">MOVE MOUSE OVER CARD TO EXPERIENCE 3D TILT</div>
          </div>
        </div>

        {/* 4 ARCHED FILM STRIP CARDS WITH FRAMER MOTION 3D TILT EFFECT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {REPERTOIRE_FILMS.map((film, idx) => (
            <TiltCard
              key={film.id}
              film={film}
              isHovered={activeFilmIndex === idx}
              onClick={() => {
                setActiveFilmIndex(idx);
                onPlayVideo?.(film.title, film.videoUrl);
              }}
              onMouseEnter={() => setActiveFilmIndex(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
