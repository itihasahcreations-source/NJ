import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { FadeInUp } from './EditorialReveal';
import { SectionTitleLockup } from './SectionTitleLockup';

interface SocialsCarouselSectionProps {
  theme?: 'dark' | 'white';
}

export const SocialsCarouselSection: React.FC<SocialsCarouselSectionProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 4000);
  };

  const reelCards = [
    { id: 'sc-1', image: '/classes/2.jpg' },
    { id: 'sc-2', image: '/classes/4.jpg' },
    { id: 'sc-3', image: '/classes/8.jpg' },
    { id: 'sc-4', image: '/classes/1.jpg' },
    { id: 'sc-5', image: '/classes/3.jpg' },
    { id: 'sc-6', image: '/classes/5.jpg' },
    { id: 'sc-7', image: '/classes/1.jpg' },
  ];

  // Tripled items for continuous, smooth infinite marquee loop
  const marqueeItems = [...reelCards, ...reelCards, ...reelCards];

  return (
    <section 
      id="socials"
      className="py-20 sm:py-28 md:py-36 select-none relative overflow-hidden flex flex-col items-center justify-center bg-transparent"
    >
      {/* Atmospheric Ambient Glow */}
      <div 
        aria-hidden="true" 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[960px] h-[400px] rounded-full blur-[180px] pointer-events-none -z-10 transition-all duration-500 ${
          isWhite 
            ? 'bg-gradient-to-r from-amber-200/25 via-stone-200/35 to-amber-100/20' 
            : 'bg-gradient-to-r from-zinc-800/15 via-slate-900/25 to-zinc-900/15'
        }`}
      />

      {/* ============================================================== */}
      {/* COMPACT & TIGHT OVERLAPPING STAGE CONTAINER                     */}
      {/* 1. SLANTED MARQUEE FLOWING BEHIND (Z-INDEX 10)                 */}
      {/* 2. FOREGROUND COMMUNITY TITLE (Z-INDEX 25)                     */}
      {/* ============================================================== */}
      <div className="relative w-full min-h-[360px] sm:min-h-[400px] md:min-h-[440px] flex items-center justify-center">
        
        {/* Slanted Marquee Track (Shifted 40% downwards closer to email bar) */}
        <div 
          className="absolute inset-x-[-8%] sm:inset-x-[-12%] top-[65%] -translate-y-1/2 z-10 overflow-hidden py-4 pointer-events-auto"
          style={{
            transform: 'translateY(-20%) rotate(-6.5deg) scale(1.06)',
          }}
        >
          {/* Feather Gradient Overlays on Left & Right - Completely removed in white theme & zero blur on mobile */}
          {!isWhite && (
            <>
              <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-32 sm:w-56 z-30 pointer-events-none bg-gradient-to-r from-[#040406] via-[#040406]/90 to-transparent transition-colors duration-500" />
              <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-32 sm:w-56 z-30 pointer-events-none bg-gradient-to-l from-[#040406] via-[#040406]/90 to-transparent transition-colors duration-500" />
            </>
          )}

          {/* Marquee Track Moving Diagonally Behind Title — Continuous, non-pausable, non-clickable */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-7 animate-marquee w-max select-none pointer-events-none px-6">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`group relative shrink-0 block w-48 sm:w-52 md:w-60 lg:w-64 aspect-[4/5] overflow-hidden outline-none ${
                  isWhite 
                    ? 'border border-black/10 bg-white/75 shadow-[0_12px_40px_rgba(0,0,0,0.08)]' 
                    : 'border border-white/10 bg-stone-950/80 shadow-[0_12px_40px_rgba(0,0,0,0.95)]'
                }`}
              >
                {/* Photo with graceful fallback */}
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                    className="w-full h-full object-cover brightness-[0.96] contrast-[1.05]"
                  />
                )}

                {/* Clean architectural empty panel — NO text inside */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                  <div className="w-full flex justify-between">
                    <span className="w-2 h-2 border-t border-l border-white/20" />
                    <span className="w-2 h-2 border-t border-r border-white/20" />
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="w-2 h-2 border-b border-l border-white/20" />
                    <span className="w-2 h-2 border-b border-r border-white/20" />
                  </div>
                </div>

                {/* Delicate Specular Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* FOREGROUND TITLE: COMMUNITY (Shifted 10% downwards)            */}
        {/* Requirement: In light theme, heading white, logo black, and   */}
        {/* subtitle ("JOIN THE") white in all versions                    */}
        {/* ============================================================== */}
        <div className="relative z-25 pointer-events-none px-4 text-center transform translate-y-3 sm:translate-y-5">
          <FadeInUp delay={0.05} yOffset={8}>
            <SectionTitleLockup
              subtitle="JOIN THE"
              title="COMMUNITY"
              align="center"
              theme={theme}
              titleColor={isWhite ? 'text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]' : undefined}
              subtitleColor={isWhite ? 'text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]' : undefined}
              logoColor="black"
              className="drop-shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
            />
          </FadeInUp>
        </div>

      </div>

      {/* Tightly Integrated Newsletter Form (No Dead Space) */}
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 md:px-10 mt-5 sm:mt-7 relative z-30">
        <FadeInUp delay={0.1} yOffset={10}>
          <div className="max-w-md mx-auto px-4 space-y-2 text-center">
            <form onSubmit={handleSubmit} className={`flex items-center gap-0 w-full rounded-full overflow-hidden backdrop-blur-md p-1 transition-all duration-300 ${
              isWhite 
                ? 'border border-black/15 bg-white/85 shadow-lg' 
                : 'border border-white/12 bg-white/[0.04] shadow-2xl'
            }`}>
              <input
                type="email"
                required
                placeholder="Email address for private workshop alerts*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 px-4 py-2 text-xs font-sans tracking-wider outline-none bg-transparent ${
                  isWhite 
                    ? 'text-stone-900 placeholder:text-stone-400' 
                    : 'text-white placeholder:text-stone-500'
                }`}
              />
              <button
                type="submit"
                className={`px-5 sm:px-6 py-2 rounded-full text-xs font-wide font-bold uppercase tracking-[0.2em] transition-all cursor-pointer shrink-0 shadow-md ${
                  isWhite 
                    ? 'bg-stone-900 text-white hover:bg-black' 
                    : 'bg-white text-black hover:bg-stone-200'
                }`}
              >
                {isSubmitted ? (
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>JOINED</span>
                  </span>
                ) : (
                  'SUBMIT'
                )}
              </button>
            </form>

            <p className={`text-[10.5px] font-sans tracking-wide transition-colors ${
              isWhite ? 'text-stone-600' : 'text-stone-400'
            }`}>
              We share private workshop dates and invitations. Unsubscribe anytime.
            </p>
          </div>
        </FadeInUp>
      </div>

    </section>
  );
};
