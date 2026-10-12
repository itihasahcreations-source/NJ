import React, { useRef, useEffect } from 'react';
import { Magnetic } from './Magnetic';

interface WeddingsHeroProps {
  theme?: 'dark' | 'white';
}

export const WeddingsHero: React.FC<WeddingsHeroProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoSrc = '/logo-dark.png';

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section 
      id="weddings-home" 
      className={`relative min-h-screen w-full flex flex-col justify-between overflow-hidden select-none border-none transition-colors duration-500 ${
        isWhite ? 'bg-[#FAF8F5]' : 'bg-[#060608]'
      }`}
    >
      {/* 1. CINEMATIC WEDDING VIDEO BACKGROUND WITH LUXURY WARMTH & BLACK LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.78] contrast-[1.08] saturate-[1.12] transition-all duration-500"
        >
          {/* Primary 2nd Menu Video Upload Target + Fallback */}
          <source src="/wedding-hero-video.mp4" type="video/mp4" />
          <source src="/hero-video.mp4?v=20261004v4" type="video/mp4" />
        </video>

        {/* Warm Golden Royal Palace Ambient Glow with Black Layer */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/60 via-black/40 to-[#c5a059]/15 mix-blend-screen transition-colors duration-500"
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-black/60 via-transparent to-transparent transition-colors duration-500"
          aria-hidden="true"
        />

        {/* Seamless Luxurious Bottom Merge: Smooth feathered quintic blend into single page background */}
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 inset-x-0 h-56 sm:h-76 md:h-96 pointer-events-none z-15 transition-colors duration-500"
          style={{
            background: isWhite
              ? 'linear-gradient(to bottom, rgba(250, 248, 245, 0) 0%, rgba(250, 248, 245, 0.15) 30%, rgba(250, 248, 245, 0.55) 60%, rgba(250, 248, 245, 0.9) 85%, #FAF8F5 100%)'
              : 'linear-gradient(to bottom, rgba(6, 6, 8, 0) 0%, rgba(6, 6, 8, 0.2) 30%, rgba(6, 6, 8, 0.6) 60%, rgba(6, 6, 8, 0.92) 85%, #060608 100%)'
          }}
        />
      </div>

      {/* 2. RECTANGLE BOX HIGHLIGHTING LOGO (CINEMATIC BLACK LAYER) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div 
          aria-hidden="true"
          className="w-full h-48 sm:h-68 md:h-84 lg:h-[28rem] xl:h-[34rem] pointer-events-none transition-all duration-500"
          style={{
            background: 'linear-gradient(to bottom, rgba(6, 6, 8, 0) 0%, rgba(6, 6, 8, 0.6) 25%, rgba(6, 6, 8, 0.8) 50%, rgba(6, 6, 8, 0.6) 75%, rgba(6, 6, 8, 0) 100%)',
          }}
        />
      </div>

      {/* 3. MONUMENTAL EDITORIAL HERO LOGO (WHITE LOGO ON BLACK LAYER) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4 sm:px-8">
        <div className="flex flex-col items-center justify-center w-full max-w-[1880px]">
          <img
            src={logoSrc}
            alt="Nicy Joseph"
            loading="eager"
            className="h-44 sm:h-64 md:h-80 lg:h-[26rem] xl:h-[32rem] w-auto max-w-[96vw] object-contain mx-auto select-none pointer-events-auto filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] transition-all duration-500"
          />
        </div>
      </div>

      {/* 4. BOTTOM BAR: ONLY INSTAGRAM UNDER LOGO */}
      <div className="absolute bottom-6 sm:bottom-10 inset-x-0 z-30 flex items-center justify-center pointer-events-auto px-6">
        <div className="flex items-center font-semibold">
          <Magnetic strength={0.3}>
            <a
              href="https://www.instagram.com/nicyjosephdanceandfitness/?hl=en"
              target="_blank"
              rel="noreferrer"
              className={`font-wide text-[11px] sm:text-xs transition-colors py-1 cursor-pointer tracking-[0.28em] ${
                isWhite
                  ? 'text-stone-900 hover:text-black drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]'
                  : 'text-[#faeed7] hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
              }`}
            >
              INSTAGRAM
            </a>
          </Magnetic>
        </div>
      </div>

    </section>
  );
};
