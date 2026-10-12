import React, { useRef, useEffect } from 'react';
import { Magnetic } from './Magnetic';

interface HeroProps {
  theme?: 'dark' | 'white';
}

export const Hero: React.FC<HeroProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoSrc = isWhite ? '/logo-light.png' : '/logo-dark.png';

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section 
      id="home" 
      className={`relative min-h-screen w-full flex flex-col justify-between overflow-hidden select-none border-none transition-colors duration-500 ${
        isWhite ? 'bg-[#FAF8F5] text-stone-900' : 'bg-[#060608] text-white'
      }`}
    >
      {/* 1. CLEAN FULL-BLEED CINEMATIC VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ${
            isWhite ? 'brightness-[0.96] contrast-[1.02]' : 'brightness-[0.88] contrast-[1.06]'
          }`}
        >
          <source src="/hero-video.mp4?v=20261004v4" type="video/mp4" />
        </video>

        {/* Subtle Vignette */}
        <div 
          className={`absolute inset-0 pointer-events-none z-10 transition-colors duration-500 ${
            isWhite 
              ? 'bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/35' 
              : 'bg-gradient-to-t from-[#060608] via-transparent to-black/35'
          }`}
          aria-hidden="true"
        />
      </div>

      {/* 2. RECTANGLE BOX HIGHLIGHTING LOGO */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div 
          aria-hidden="true"
          className="w-full h-48 sm:h-68 md:h-84 lg:h-[28rem] xl:h-[34rem] pointer-events-none transition-all duration-500"
          style={{
            background: isWhite
              ? 'linear-gradient(to bottom, rgba(250, 248, 245, 0) 0%, rgba(250, 248, 245, 0.45) 25%, rgba(250, 248, 245, 0.68) 50%, rgba(250, 248, 245, 0.45) 75%, rgba(250, 248, 245, 0) 100%)'
              : 'linear-gradient(to bottom, rgba(6, 6, 8, 0) 0%, rgba(6, 6, 8, 0.55) 25%, rgba(6, 6, 8, 0.75) 50%, rgba(6, 6, 8, 0.55) 75%, rgba(6, 6, 8, 0) 100%)',
          }}
        />
      </div>

      {/* 3. MONUMENTAL EDITORIAL HERO LOGO (PROPER ABSOLUTE CENTER) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4 sm:px-8">
        <div className="flex flex-col items-center justify-center w-full max-w-[1880px]">
          <img
            src={logoSrc}
            alt="Nicy Joseph"
            loading="eager"
            className={`h-44 sm:h-64 md:h-80 lg:h-[26rem] xl:h-[32rem] w-auto max-w-[96vw] object-contain mx-auto select-none pointer-events-auto transition-all duration-500 ${
              isWhite 
                ? 'filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.12)]' 
                : 'filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]'
            }`}
          />
        </div>
      </div>

      {/* 4. BOTTOM BAR: INSTAGRAM & YOUTUBE */}
      <div className="absolute bottom-6 sm:bottom-10 inset-x-0 z-30 flex items-center justify-center pointer-events-auto px-6">
        <div className="flex items-center gap-6 font-semibold">
          <Magnetic strength={0.3}>
            <a
              href="https://www.instagram.com/nicyjosephdanceandfitness/?hl=en"
              target="_blank"
              rel="noreferrer"
              className={`font-wide text-[11px] sm:text-xs transition-colors py-1 cursor-pointer tracking-[0.28em] ${
                isWhite 
                  ? 'text-stone-900 hover:text-amber-800 drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]' 
                  : 'text-white hover:text-[#faeed7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
              }`}
            >
              INSTAGRAM
            </a>
          </Magnetic>

          <span className={isWhite ? 'text-stone-400' : 'text-white/60'}>·</span>

          <Magnetic strength={0.3}>
            <a
              href="https://youtube.com/@nicyjoseph"
              target="_blank"
              rel="noreferrer"
              className={`font-wide text-[11px] sm:text-xs transition-colors py-1 cursor-pointer tracking-[0.28em] ${
                isWhite 
                  ? 'text-stone-900 hover:text-amber-800 drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]' 
                  : 'text-white hover:text-[#faeed7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
              }`}
            >
              YOUTUBE
            </a>
          </Magnetic>
        </div>
      </div>

    </section>
  );
};

