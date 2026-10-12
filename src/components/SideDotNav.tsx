import React, { useState, useEffect } from 'react';

interface SideDotNavProps {
  theme: 'dark' | 'white';
}

interface NavSection {
  id: string;
  label: string;
}

const SECTIONS: NavSection[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'studio', label: 'STUDIO' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'socials', label: 'SOCIALS' },
  { id: 'expertise', label: 'COMMISSIONS' },
  { id: 'contact', label: 'CONCIERGE' },
];

export const SideDotNav: React.FC<SideDotNavProps> = ({ theme }) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isNavHovered, setIsNavHovered] = useState<boolean>(false);
  const [hoveredDotId, setHoveredDotId] = useState<string | null>(null);
  const isWhite = theme === 'white';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside 
      aria-label="Section navigation"
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => {
        setIsNavHovered(false);
        setHoveredDotId(null);
      }}
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 select-none pointer-events-auto p-2"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredDotId === sec.id;
        const showLabel = isNavHovered && (isHovered || (isActive && !hoveredDotId));

        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            onMouseEnter={() => setHoveredDotId(sec.id)}
            onMouseLeave={() => setHoveredDotId(null)}
            aria-label={`Jump to ${sec.label}`}
            className="group flex items-center gap-3 py-1 cursor-pointer focus:outline-none"
          >
            {/* Minimalist Floating Label */}
            <span
              className={`font-wide text-[9px] tracking-[0.26em] uppercase transition-all duration-300 pointer-events-none whitespace-nowrap px-2 py-0.5 rounded backdrop-blur-md shadow-sm ${
                showLabel
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-2 pointer-events-none'
              } ${
                isWhite
                  ? 'bg-white/90 text-black border border-black/10'
                  : 'bg-black/90 text-white border border-white/15'
              }`}
            >
              {sec.label}
            </span>

            {/* Micro Dot */}
            <div className="relative flex items-center justify-center w-3 h-5">
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? isWhite
                      ? 'w-1 h-5 bg-black shadow-[0_2px_6px_rgba(0,0,0,0.3)]'
                      : 'w-1 h-5 bg-[#ffd700] shadow-[0_0_14px_rgba(255,215,0,0.95)]'
                    : isWhite
                      ? 'w-1 h-1 bg-black/25 group-hover:bg-black group-hover:scale-150'
                      : 'w-1 h-1 bg-white/30 group-hover:bg-[#ffd700] group-hover:scale-150'
                }`}
              />
            </div>
          </button>
        );
      })}
    </aside>
  );
};
