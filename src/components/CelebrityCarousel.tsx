import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface CelebrityCarouselProps {
  theme: 'dark' | 'white';
  onOpenInquiry: (name?: string) => void;
}

export const CelebrityCarousel: React.FC<CelebrityCarouselProps> = ({
  theme,
  onOpenInquiry
}) => {
  const isWhite = theme === 'white';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      id: 'sania-mirza',
      badge: 'ATHLETE COLLABORATION',
      name: 'SANIA MIRZA',
      role: 'Pandemic Movement & Handstand Inversion Training',
      location: 'Jubilee Hills Private Sanctuary',
      year: '2020 — 2021',
      description: 'Custom biomechanical movement coaching, core stability, and advanced scapular alignment during the national lockdown.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=85'
    },
    {
      id: 'brides-today',
      badge: 'PRESS CITATION',
      name: 'BRIDES TODAY TOP 10',
      role: 'Top 10 Indian Wedding Choreographers in the Country',
      location: 'National Feature',
      year: 'EDITORIAL HONOUR',
      description: 'Named among the premier luxury wedding choreographers in India for narrative sangeets and bespoke stage compositions.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1800&q=85'
    },
    {
      id: 'taj-falaknuma',
      badge: 'HERITAGE VENUE PRODUCTION',
      name: 'TAJ FALAKNUMA PALACE',
      role: 'Bespoke Destination Royal Sangeet Staging',
      location: 'Falaknuma, Hyderabad',
      year: 'ANNUAL PRODUCTIONS',
      description: 'Directing multi-day bridal parties and cinematic couple duets in historic royal palace corridors and courtyards.',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1800&q=85'
    },
    {
      id: 'tollywood-cinema',
      badge: 'FILM INDUSTRY',
      name: 'TOLLYWOOD SCREEN PRODUCTION',
      role: 'Actor Movement & Contemporary Screen Choreography',
      location: 'Ramoji Film City / Hyderabad Studios',
      year: '2022 — 2024',
      description: 'Crafting fluid actor blocking, percussive dance sequences, and cinematic camera movement for mainstream Telugu cinema.',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1800&q=85'
    },
    {
      id: 'dance-festival',
      badge: 'ARENA FESTIVAL',
      name: 'HYDERABAD DANCE FESTIVAL',
      role: 'Official Garba Immersion & Arena Masterclass Partner',
      location: 'Hitex Exhibition Center, Hyderabad',
      year: '5,000+ ATTENDEES',
      description: 'Lead choreography and kinetic arena direction for thousands of dancers in high-tempo folk and contemporary Indian swirls.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85'
    }
  ];

  // Auto-advance slides every 6 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section 
      id="vip" 
      className={`py-20 md:py-32 select-none border-none transition-colors duration-500 ${
        isWhite ? 'bg-[#f7f7f5] text-black' : 'bg-black text-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1680px] mx-auto px-6 md:px-14 space-y-8">
        
        {/* Header Row: Title & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          
          <div className="space-y-2">
            <div className={`text-xs font-mono-meta font-bold tracking-[0.24em] uppercase ${
              isWhite ? 'text-stone-500' : 'text-stone-400'
            }`}>
              03 / VIP & CELEBRITY PORTFOLIO
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-condensed font-black tracking-tight uppercase leading-none">
              COLLABORATIONS & REPUTATION
            </h2>
          </div>

          {/* Carousel Arrows & Counter */}
          <div className="flex items-center gap-6">
            <span className="text-xs font-mono-meta tracking-widest text-stone-400">
              0{currentSlide + 1} / 0{slides.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className={`p-3 rounded-full transition-all cursor-pointer ${
                  isWhite
                    ? 'bg-black/5 hover:bg-black text-black hover:text-white'
                    : 'bg-white/10 hover:bg-white text-white hover:text-black'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next slide"
                className={`p-3 rounded-full transition-all cursor-pointer ${
                  isWhite
                    ? 'bg-black/5 hover:bg-black text-black hover:text-white'
                    : 'bg-white/10 hover:bg-white text-white hover:text-black'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Carousel Slide Stage (Sharp Rectangle, Luxury Full-Bleed Frame) */}
        <div className="relative w-full h-[520px] sm:h-[620px] md:h-[700px] overflow-hidden rounded-none shadow-2xl border-none group">
          
          {/* Background Image with Smooth Crossfade Transition */}
          <img
            key={active.id}
            src={active.image}
            alt={active.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter contrast-[1.12] brightness-[0.88] transition-all duration-1000 ease-out group-hover:scale-105"
          />

          {/* Minimal Dark Scrim on Image */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/25 pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Left Badge */}
          <div className="absolute top-8 left-8 sm:left-12 z-10">
            <span className="px-3.5 py-1.5 text-[10px] sm:text-xs font-mono-meta font-bold uppercase tracking-widest bg-black/75 backdrop-blur-md text-amber-300 border border-amber-300/30">
              {active.badge}
            </span>
          </div>

          {/* Bottom Left Minimal Text ON IMAGE (Clean, International Editorial Style) */}
          <div className="absolute bottom-8 sm:bottom-12 left-8 sm:left-12 right-8 sm:right-12 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-mono-meta text-stone-300 uppercase tracking-widest font-semibold">
                {active.location} · {active.year}
              </div>

              <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-condensed font-black text-white uppercase tracking-tight leading-[0.9]">
                {active.name}
              </h3>

              <div className="text-sm sm:text-base font-display font-medium text-stone-200">
                {active.role}
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl leading-relaxed">
                {active.description}
              </p>
            </div>

            {/* Quick Inquire Button */}
            <button
              onClick={() => onOpenInquiry(active.name)}
              className="self-start md:self-end px-7 py-3 text-xs font-mono-meta font-bold uppercase tracking-widest rounded-full bg-white text-black hover:bg-stone-200 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              COMMISSION INQUIRY
            </button>

          </div>

          {/* Slide Progress Indicators at Top Right */}
          <div className="absolute top-8 right-8 sm:right-12 z-10 flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
                className={`h-1 transition-all duration-500 rounded-none cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
