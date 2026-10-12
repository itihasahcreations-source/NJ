import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpatialDepthBlur } from './hooks/useSpatialDepthBlur';
import { OpeningLoader } from './components/OpeningLoader';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';
import { CustomCursor } from './components/CustomCursor';
import { Header, PageRoute } from './components/Header';
import { Hero } from './components/Hero';
import { WeddingsHero } from './components/WeddingsHero';
import { AboutNicySection } from './components/AboutNicySection';
import { AboutPortfolioSection } from './components/AboutPortfolioSection';
import { WorkshopsCarouselSection } from './components/WorkshopsCarouselSection';
import { RentStudioSection } from './components/RentStudioSection';
import { DanceFitnessSection } from './components/DanceFitnessSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SocialsCarouselSection } from './components/SocialsCarouselSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { SelectedCredits } from './components/SelectedCredits';
import { ContactSection } from './components/ContactSection';
import { InquiryDrawer } from './components/InquiryDrawer';
import { Footer } from './components/Footer';
import { X, ChevronLeft } from 'lucide-react';

export default function App() {
  const [showLoader, setShowLoader] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'white'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('njd_theme');
      if (saved === 'white' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const [activePage, setActivePage] = useState<PageRoute>('dance-fitness');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string>('Royal Wedding Choreography');

  // Video Lightbox Modal State
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; url: string } | null>(null);

  // Sync theme with document element and localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('njd_theme', theme);
      const root = document.documentElement;
      if (theme === 'white') {
        root.classList.add('theme-white');
        root.classList.remove('theme-dark');
        document.body.style.backgroundColor = '#FAF8F5';
        document.body.style.color = '#1A1A1A';
      } else {
        root.classList.add('theme-dark');
        root.classList.remove('theme-white');
        document.body.style.backgroundColor = '#060608';
        document.body.style.color = '#EDEAE2';
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'white' : 'dark'));
  };

  // Lock body scroll and handle escape for video modal
  useEffect(() => {
    if (!activeVideoModal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideoModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideoModal]);

  useSpatialDepthBlur();

  // Weighted momentum-based Lenis scroll implementation for smooth inertia
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleOpenInquiry = (topic?: string) => {
    if (topic) setInquiryTopic(topic);
    setInquiryOpen(true);
  };

  const handleSelectPage = (page: PageRoute) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-body border-none relative overflow-x-clip transition-colors duration-500 ${
      theme === 'white'
        ? 'bg-[#FAF8F5] text-[#1A1A1A] selection:bg-black selection:text-white'
        : 'bg-[#060608] text-[#edeae2] selection:bg-white selection:text-black'
    }`}>
      
      {/* Atmospheric Ambient Background */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700"
        style={{
          background: theme === 'white'
            ? `
              radial-gradient(circle at 50% 20%, rgba(230, 224, 214, 0.55) 0%, transparent 60%),
              radial-gradient(circle at 80% 60%, rgba(225, 218, 206, 0.45) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(235, 228, 216, 0.45) 0%, transparent 50%),
              #FAF8F5
            `
            : `
              radial-gradient(circle at 50% 20%, rgba(25, 25, 32, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 80% 60%, rgba(18, 18, 24, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(14, 14, 20, 0.3) 0%, transparent 50%),
              #040406
            `
        }}
      />

      {/* Opening Loading Screen */}
      {showLoader && (
        <OpeningLoader onComplete={() => setShowLoader(false)} />
      )}

      {/* Subtle Hairline Top Progress Bar */}
      <ScrollProgressIndicator theme={theme} />

      {/* Interactive Cursor Spotlight Glow */}
      <CustomCursor theme={theme} />

      {/* 3-Menu Destination Navigation Header */}
      <Header
        theme={theme}
        activePage={activePage}
        onSelectPage={handleSelectPage}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* ============================================================== */}
      {/* 3 DISTINCT MENU PAGES WITH SMOOTH HARDWARE-ACCELERATED ROUTING */}
      {/* ============================================================== */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* ============================================================ */}
          {/* PAGE 1: DANCE & FITNESS (Main Movement & Workshop Atelier)   */}
          {/* ============================================================ */}
          {activePage === 'dance-fitness' && (
            <motion.div
              key="page-dance-fitness"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full"
            >
              {/* HERO */}
              <Hero theme={theme} />

              {/* 2ND SECTION: CLASSES (WITH MERGED CLICK-TO-OPEN MINIMAL SCHEDULE) */}
              <AboutNicySection theme={theme} />

              {/* WORKSHOPS SECTION (UPCOMING & ARTISTS) */}
              <WorkshopsCarouselSection
                theme={theme}
                onOpenInquiry={handleOpenInquiry}
              />

              {/* RENT STUDIO SECTION (MINIMAL LOCATION BEACON) */}
              <RentStudioSection theme={theme} />

              {/* DANCE & FITNESS SANCTUARY REPERTOIRE REELS */}
              <DanceFitnessSection
                theme={theme}
                onOpenInquiry={handleOpenInquiry}
                onPlayVideo={(title, url) => setActiveVideoModal({ title, url })}
              />

              {/* SOCIALS & COMMUNITY */}
              <SocialsCarouselSection theme={theme} />

              {/* CONCIERGE & CONTACT (DF: 4 Circles - Instagram, WhatsApp, YouTube, Light) */}
              <ContactSection
                theme={theme}
                menuVariant="DF"
                initialInquiryTopic="Dance & Fitness Atelier Inquiry"
                onOpenInquiry={handleOpenInquiry}
                onToggleTheme={toggleTheme}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* PAGE 2: WEDDING FIESTAS (Royal Sangeet & Choreographies)     */}
          {/* ============================================================ */}
          {activePage === 'wedding-fiestas' && (
            <motion.div
              key="page-wedding-fiestas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full"
            >
              {/* WEDDING HERO WITH ONLY INSTAGRAM UNDER LOGO */}
              <WeddingsHero theme={theme} />

              {/* PROJECTS SECTION (MOVED TO WEDDING FIESTAS) */}
              <ProjectsSection
                theme={theme}
                onOpenInquiry={handleOpenInquiry}
                onPlayVideo={(title, url) => setActiveVideoModal({ title, url })}
              />

              {/* COMMISSIONS & BESPOKE WEDDING DIRECTION (MOVED HERE) */}
              <ExpertiseSection
                theme={theme}
                onOpenInquiry={handleOpenInquiry}
                onPlayVideo={(title, url) => setActiveVideoModal({ title, url })}
              />

              {/* COMMUNITY & RUNWAY ARCHIVE */}
              <SocialsCarouselSection theme={theme} />

              {/* WEDDING CONCIERGE CONTACT (WF: 3 Circles - Instagram, WhatsApp, Light) */}
              <ContactSection
                theme={theme}
                menuVariant="WF"
                initialInquiryTopic="Royal Wedding Choreography & Sangeet"
                onOpenInquiry={handleOpenInquiry}
                onToggleTheme={toggleTheme}
              />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* PAGE 3: PORTFOLIO (Artistic About & Awards Archive)          */}
          {/* ============================================================ */}
          {activePage === 'portfolio' && (
            <motion.div
              key="page-portfolio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full"
            >
              {/* EDITORIAL ABOUT SECTION WITH CUTOUT PNG & SPEEDUP INFINITE SCROLL */}
              <AboutPortfolioSection theme={theme} />

              {/* AWARDS & HONOURS (MOVED TO PORTFOLIO) */}
              <SelectedCredits theme={theme} />

              {/* COMMUNITY & RUNWAY ARCHIVE */}
              <SocialsCarouselSection theme={theme} />

              {/* PORTFOLIO INQUIRY & CONTACT (P: 3 Circles - Instagram, WhatsApp, Light) */}
              <ContactSection
                theme={theme}
                menuVariant="P"
                initialInquiryTopic="Portfolio & Masterclass Commission"
                onOpenInquiry={handleOpenInquiry}
                onToggleTheme={toggleTheme}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      <Footer theme={theme} />

      {/* Video Lightbox Modal: Pure Minimal, Zero Text */}
      {activeVideoModal && (
        <div 
          onClick={() => setActiveVideoModal(null)}
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 pb-6 select-none cursor-pointer"
          style={{
            paddingTop: 'max(1.25rem, env(safe-area-inset-top, 1.25rem))',
            paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))',
          }}
        >
          {/* Top Navigation Bar: Minimal Back (<) and Close (✕) Buttons */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between px-2 pt-1 pb-2 z-30 shrink-0 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Minimal Back Button (<) */}
            <button
              type="button"
              onClick={() => setActiveVideoModal(null)}
              className="w-12 h-12 rounded-full bg-black/85 hover:bg-white text-white hover:text-black border border-white/35 backdrop-blur-xl shadow-[0_6px_25px_rgba(0,0,0,0.9)] flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
              aria-label="Back"
              title="Back"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* Minimal Close Button (✕) */}
            <button
              type="button"
              onClick={() => setActiveVideoModal(null)}
              className="w-12 h-12 rounded-full bg-black/85 hover:bg-white text-white hover:text-black border border-white/35 backdrop-blur-xl shadow-[0_6px_25px_rgba(0,0,0,0.9)] flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
              aria-label="Close"
              title="Close"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Minimal 16:9 Video Player */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video bg-black shadow-[0_25px_80px_rgba(0,0,0,0.98)] rounded-none overflow-hidden border border-white/20 my-auto shrink-0"
          >
            <iframe
              src={activeVideoModal.url}
              title={activeVideoModal.title}
              className="w-full h-full border-0 block bg-black"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Bottom Minimal Close Button for Mobile Thumb Convenience */}
          <div 
            className="w-full max-w-5xl flex items-center justify-center pt-2 z-30 shrink-0 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideoModal(null)}
              className="w-12 h-12 rounded-full bg-black/85 hover:bg-white text-white hover:text-black border border-white/35 backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
              aria-label="Close"
              title="Close"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      )}

      {/* Inquiry Drawer */}
      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialTopic={inquiryTopic}
        theme={theme}
      />

    </div>
  );
}
