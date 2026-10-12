import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { ClipPathImage } from './ClipPathImage';

interface WorksSectionProps {
  theme: 'dark' | 'white';
  onPlayVideo: (title: string, url: string) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const WorksSection: React.FC<WorksSectionProps> = ({
  theme,
  onPlayVideo,
  onOpenInquiry
}) => {
  const isWhite = theme === 'white';
  const [activeWorksTab, setActiveWorksTab] = useState<'selected' | 'vip' | 'films'>('selected');
  const [currentVipSlide, setCurrentVipSlide] = useState(0);

  // 1. Signature 6 Curated Commissions with Screenshot 37 Style Text Over Image
  const signatureWorks = [
    {
      id: 'proj-1',
      index: '01',
      title: 'RAANJHANAA',
      category: 'CHOREOGRAPHY FILM & DIRECTION',
      year: '2024',
      badge: 'OFFICIAL YOUTUBE FILM',
      hasVideo: true,
      videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0',
      image: '/src/assets/images/gallery_krasota_red_solo_1790836710482.jpg',
      aspect: 'lg:col-span-8 aspect-[16/10]',
      editorialPrefix: 'A ',
      italicPhrase: 'contemporary solo',
      editorialSuffix: ' in crimson theatrical light, translating Indian classical mudras into cinematic screen motion.'
    },
    {
      id: 'proj-2',
      index: '02',
      title: 'ICARUS',
      category: 'ROYAL SANGEET ENSEMBLE',
      year: '2024',
      badge: 'BRIDES TODAY TOP 10',
      hasVideo: false,
      videoUrl: '',
      image: '/src/assets/images/gallery_icarus_classical_contemporary_1790836686898.jpg',
      aspect: 'lg:col-span-4 aspect-[4/5]',
      editorialPrefix: 'An ',
      italicPhrase: 'architectural ensemble',
      editorialSuffix: ' designed for palace courtyards that celebrate grandeur and emotional scale.'
    },
    {
      id: 'proj-3',
      index: '03',
      title: 'POEM OF ASANA',
      category: 'BIOMECHANICS & INVERSIONS',
      year: '2023',
      badge: 'SANIA MIRZA COLLAB',
      hasVideo: false,
      videoUrl: '',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=85',
      aspect: 'lg:col-span-4 aspect-[4/5]',
      editorialPrefix: 'Advanced ',
      italicPhrase: 'handstand inversions',
      editorialSuffix: ' and scapular conditioning tailored for championship athletic precision.'
    },
    {
      id: 'proj-4',
      index: '04',
      title: 'LUMORA',
      category: 'IMMERSIVE PROJECTION STAGE',
      year: '2023',
      badge: 'HYD DANCE FESTIVAL',
      hasVideo: false,
      videoUrl: '',
      image: '/src/assets/images/gallery_lumora_troupe_duet_1790836738609.jpg',
      aspect: 'lg:col-span-8 aspect-[16/10]',
      editorialPrefix: 'An ',
      italicPhrase: 'immersive stage duet',
      editorialSuffix: ' bathed in atmospheric cobalt and amber projection mapping.'
    },
    {
      id: 'proj-5',
      index: '05',
      title: 'TERRA MUDRA',
      category: 'CLASSICAL × CONTEMPORARY',
      year: '2024',
      badge: 'REPERTOIRE MASTERPIECE',
      hasVideo: false,
      videoUrl: '',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=85',
      aspect: 'lg:col-span-6 aspect-[16/11]',
      editorialPrefix: 'Ancient ',
      italicPhrase: 'mudra handwork',
      editorialSuffix: ' fused with explosive contemporary release floor transitions.'
    },
    {
      id: 'proj-6',
      index: '06',
      title: 'JUBILEE SANCTUARY',
      category: 'STUDIO PROVENANCE & SESSIONS',
      year: 'EST. 2020',
      badge: 'DAILY BATCHES',
      hasVideo: false,
      videoUrl: '',
      image: '/src/assets/images/studio_rehearsal_backstage_1790835788315.jpg',
      aspect: 'lg:col-span-6 aspect-[16/11]',
      editorialPrefix: 'A ',
      italicPhrase: 'movement laboratory',
      editorialSuffix: ' at Alcazar Mall where non-dancers discover effortless grace and stage command.'
    }
  ];

  // 2. VIP & Celebrity Collaborations (5 Slides) with Screenshot 37 Style Text
  const vipSlides = [
    {
      badge: 'ATHLETE COLLABORATION',
      name: 'SANIA MIRZA',
      role: 'Pandemic Movement & Handstand Inversion Training',
      location: 'Jubilee Hills Private Sanctuary',
      year: '2020 — 2021',
      editorialPrefix: 'Private ',
      italicPhrase: 'movement conditioning',
      editorialSuffix: ' and scapular stability for world champion Sania Mirza during national lockdown.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=85'
    },
    {
      badge: 'PRESS CITATION',
      name: 'BRIDES TODAY TOP 10',
      role: 'Top 10 Indian Wedding Choreographers in the Country',
      location: 'National Editorial Honor',
      year: 'CITING EXCELLENCE',
      editorialPrefix: 'Honoured among ',
      italicPhrase: 'India’s top 10',
      editorialSuffix: ' luxury wedding choreographers for bespoke stage direction and viral sangeets.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1800&q=85'
    },
    {
      badge: 'HERITAGE PALACE PRODUCTION',
      name: 'TAJ FALAKNUMA PALACE',
      role: 'Bespoke Destination Royal Sangeet Staging',
      location: 'Falaknuma, Hyderabad',
      year: 'ANNUAL RESIDENCY',
      editorialPrefix: 'Directing ',
      italicPhrase: 'Nizami palace celebrations',
      editorialSuffix: ' under 101-dining chandeliers and grand sweeping marble courtyards.',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1800&q=85'
    },
    {
      badge: 'FILM INDUSTRY',
      name: 'TOLLYWOOD SCREEN PRODUCTION',
      role: 'Actor Movement & Contemporary Screen Choreography',
      location: 'Ramoji Film City / Hyderabad Studios',
      year: '2022 — 2024',
      editorialPrefix: 'Sculpting ',
      italicPhrase: 'cinematic actor blocking',
      editorialSuffix: ' and high-octane regional screen choreography for leading South cinema features.',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1800&q=85'
    },
    {
      badge: 'ARENA FESTIVAL',
      name: 'HYDERABAD DANCE FESTIVAL',
      role: 'Official Garba Immersion & Arena Masterclass Partner',
      location: 'Hitex Exhibition Center, Hyderabad',
      year: '5,000+ ATTENDEES',
      editorialPrefix: 'Kinetic ',
      italicPhrase: 'arena direction',
      editorialSuffix: ' commanding 5,000+ dancers across high-tempo folk and contemporary Indian formations.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85'
    }
  ];

  // 3. Cinematic Wedding Films with Screenshot 37 Style Text
  const weddingFilms = [
    {
      title: 'RAANJHANAA · THE ROYAL SANGEET CUT',
      couple: 'Arya & Rohan · Taj Falaknuma Palace',
      runtime: '01:54 CINEMATIC FILM',
      badge: 'OFFICIAL YOUTUBE SHOWREEL',
      thumbnail: '/src/assets/images/gallery_krasota_red_solo_1790836710482.jpg',
      videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0',
      editorialPrefix: 'A ',
      italicPhrase: 'royal sangeet cut',
      editorialSuffix: ' under Nizami chandeliers with synchronized family flash mobs.'
    },
    {
      title: 'JAWAANI JAANEMAN · RETRO VIRAL MEDLEY',
      couple: 'Samira & Kabir · Udaipur City Palace',
      runtime: '02:18 VIRAL CHOREO',
      badge: 'VIRAL REPERTOIRE',
      thumbnail: '/src/assets/images/archive_wedding_sangeet_choreography_1790835745407.jpg',
      videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0',
      editorialPrefix: 'A ',
      italicPhrase: 'viral family medley',
      editorialSuffix: ' blending retro 80s disco with explosive modern Punjabi bounce.'
    },
    {
      title: 'PALACE COURTYARD ENTRANCE & PYRO',
      couple: 'Nandini & Vikram · Rambagh Palace Jaipur',
      runtime: '01:30 ENTRY SHOW',
      badge: 'BESPOKE ENTRY',
      thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
      videoUrl: 'https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&mute=0',
      editorialPrefix: 'A ',
      italicPhrase: 'grand bridal entrance',
      editorialSuffix: ' with mirror dancers, live percussions and royal cold pyrotechnics.'
    }
  ];

  const activeVip = vipSlides[currentVipSlide];

  return (
    <section 
      id="works" 
      className={`py-28 md:py-44 select-none border-none transition-colors duration-700 relative overflow-hidden ${
        isWhite ? 'bg-white text-black' : 'bg-[#060608] text-white'
      }`}
    >
      {/* Volumetric Crimson Stage Glow Behind Works */}
      <div 
        aria-hidden="true"
        className="absolute top-1/3 left-1/3 w-[800px] h-[800px] bg-red-950/20 rounded-full blur-[200px] pointer-events-none -z-10" 
      />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-14 space-y-12 md:space-y-16">
        
        {/* ============================================================== */}
        {/* 1. WORKS HEADER WITH MERGED OVERSIZED TYPOGRAPHY               */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-6 border-b border-white/10">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#facc15] uppercase font-bold">
                ACT 06 / THE VISUAL PORTFOLIO
              </span>
              <span className="text-stone-500 opacity-40">•</span>
              <span className="text-[11px] font-mono tracking-widest text-stone-400 uppercase hidden sm:inline">
                CURATED COMMISSIONS & FILMS
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-light tracking-tight uppercase leading-[0.9] text-white">
              CHOREOGRAPHY & REPERTOIRE
            </h2>

            <p className="text-base sm:text-lg font-body font-light leading-relaxed text-stone-200">
              A borderless 3D visual archive. Curated commissions, high-fashion celebrity conditioning, and royal destination wedding films.
            </p>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md rounded-full text-xs font-mono uppercase tracking-wider self-start lg:self-end border border-white/10">
            <button
              onClick={() => setActiveWorksTab('selected')}
              className={`px-5 py-2.5 rounded-full transition-all cursor-pointer font-bold ${
                activeWorksTab === 'selected' 
                  ? 'bg-white text-black shadow-xl' 
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              SELECTED WORKS
            </button>
            <button
              onClick={() => setActiveWorksTab('vip')}
              className={`px-5 py-2.5 rounded-full transition-all cursor-pointer font-bold ${
                activeWorksTab === 'vip' 
                  ? 'bg-[#facc15] text-black shadow-xl' 
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              CELEBRITY & VIP
            </button>
            <button
              onClick={() => setActiveWorksTab('films')}
              className={`px-5 py-2.5 rounded-full transition-all cursor-pointer font-bold ${
                activeWorksTab === 'films' 
                  ? 'bg-white text-black shadow-xl' 
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              WEDDING FILMS
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. TAB CONTENT: BORDERLESS 3D IMMERSIVE WORK SPACES            */}
        {/* WITH SIGNATURE SCREENSHOT 37 EDITORIAL TEXT OVER IMAGE         */}
        {/* ============================================================== */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: SIGNATURE 6 WORKS */}
          {activeWorksTab === 'selected' && (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
            >
              {signatureWorks.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    if (proj.hasVideo) {
                      onPlayVideo(proj.title, proj.videoUrl);
                    } else {
                      onOpenInquiry(`Project Inquiry: ${proj.title}`);
                    }
                  }}
                  className={`${proj.aspect} relative overflow-hidden rounded-none cursor-pointer shadow-2xl group border-none transition-all duration-700 flex flex-col justify-between p-6 sm:p-10`}
                >
                  <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <ClipPathImage
                      src={proj.image}
                      alt={proj.title}
                      aspect="w-full h-full"
                      staggerIndex={idx}
                      className="group-hover:scale-105 group-hover:brightness-[0.92] transition-transform duration-1000 ease-out"
                    />
                  </div>

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

                  {/* Top Bar on Image */}
                  <div className="relative z-10 flex items-center justify-between pointer-events-none">
                    <span className="px-3.5 py-1 text-[10px] font-mono-meta font-bold uppercase tracking-widest bg-black/80 backdrop-blur-md text-amber-300 border border-white/15">
                      {proj.badge}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Center Play Button if Video */}
                  {proj.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-amber-400 transition-all">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  {/* SIGNATURE SCREENSHOT 37 EDITORIAL TEXT ON TOP OF IMAGE */}
                  <div className="relative z-10 space-y-3 pointer-events-none max-w-2xl">
                    <div className="text-[11px] font-mono-meta text-stone-300 uppercase tracking-widest font-semibold">
                      {proj.index} / {proj.category} · {proj.year}
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light leading-[1.12] tracking-tight text-white group-hover:text-[#f3f9ff] transition-colors">
                      {proj.editorialPrefix}
                      <span className="font-editorial italic font-normal text-amber-300 underline decoration-amber-400/30 underline-offset-8">
                        {proj.italicPhrase}
                      </span>
                      {proj.editorialSuffix}
                    </h3>

                    <div className="text-xs font-mono-meta uppercase tracking-widest text-stone-400 pt-1">
                      {proj.title} · NICY JOSEPH DIRECTION
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 2: VIP & CELEBRITY CAROUSEL */}
          {activeWorksTab === 'vip' && (
            <motion.div
              key="vip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Carousel Controls */}
              <div className="flex items-center justify-between pb-2">
                <div className="text-xs font-mono-meta text-stone-400 tracking-widest uppercase">
                  SLIDE 0{currentVipSlide + 1} / 0{vipSlides.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentVipSlide((prev) => (prev - 1 + vipSlides.length) % vipSlides.length)}
                    className="p-3 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors cursor-pointer"
                    aria-label="Previous VIP slide"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentVipSlide((prev) => (prev + 1) % vipSlides.length)}
                    className="p-3 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors cursor-pointer"
                    aria-label="Next VIP slide"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Big 3D Stage Frame with Screenshot 37 Typography */}
              <div className="relative w-full h-[540px] sm:h-[640px] overflow-hidden rounded-none shadow-2xl border-none group flex flex-col justify-between p-8 sm:p-14">
                <img
                  key={activeVip.name}
                  src={activeVip.image}
                  alt={activeVip.name}
                  referrerPolicy="no-referrer"
                  data-motion-blur="true"
                  style={{
                    filter: 'blur(var(--scroll-blur, 0px)) contrast(1.18) brightness(0.76)',
                    willChange: 'filter, transform',
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 text-[10px] sm:text-xs font-mono-meta font-bold uppercase tracking-widest bg-black/80 backdrop-blur-md text-amber-300 border border-amber-300/30">
                    {activeVip.badge}
                  </span>
                  <div className="text-xs font-mono-meta text-stone-300 uppercase tracking-widest">
                    {activeVip.location} · {activeVip.year}
                  </div>
                </div>

                {/* Screenshot 37 Signature Editorial Statement Over Image */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-4 max-w-3xl">
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-light leading-[1.08] tracking-tight text-white">
                      {activeVip.editorialPrefix}
                      <span className="font-editorial italic font-normal text-amber-300 underline decoration-amber-400/30 underline-offset-8">
                        {activeVip.italicPhrase}
                      </span>
                      {activeVip.editorialSuffix}
                    </h3>

                    <div className="text-sm font-mono-meta text-stone-300 uppercase tracking-widest font-semibold">
                      {activeVip.name} — {activeVip.role}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenInquiry(`VIP Commission: ${activeVip.name}`)}
                    className="self-start md:self-end px-8 py-3.5 text-xs font-mono-meta font-bold uppercase tracking-widest rounded-full bg-white text-black hover:bg-stone-200 transition-all cursor-pointer shadow-2xl active:scale-95 shrink-0"
                  >
                    COMMISSION INQUIRY
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: WEDDING FILMS */}
          {activeWorksTab === 'films' && (
            <motion.div
              key="films"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {weddingFilms.map((film) => (
                <div
                  key={film.title}
                  onClick={() => onPlayVideo(film.title, film.videoUrl)}
                  className="group relative overflow-hidden rounded-none cursor-pointer border-none shadow-2xl aspect-[3/4] flex flex-col justify-between p-8"
                >
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    referrerPolicy="no-referrer"
                    data-motion-blur="true"
                    style={{
                      filter: 'blur(var(--scroll-blur, 0px)) contrast(1.18) brightness(0.76)',
                      willChange: 'filter, transform',
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 group-hover:brightness-[0.92] transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/25 pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between pointer-events-none">
                    <span className="px-3.5 py-1 text-[10px] font-mono-meta font-bold uppercase tracking-widest bg-amber-400 text-black">
                      {film.badge}
                    </span>
                    <span className="text-[10px] font-mono-meta text-stone-300 uppercase tracking-widest">
                      {film.runtime}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-amber-400 transition-all">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Screenshot 37 Editorial Typography on Image */}
                  <div className="relative z-10 space-y-2 pointer-events-none">
                    <div className="text-[10px] font-mono-meta text-stone-300 uppercase tracking-widest">
                      {film.couple}
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-display font-light leading-[1.15] text-white">
                      {film.editorialPrefix}
                      <span className="font-editorial italic font-normal text-amber-300">
                        {film.italicPhrase}
                      </span>
                      {film.editorialSuffix}
                    </h4>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
};
