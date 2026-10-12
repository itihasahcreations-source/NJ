import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { SectionTitleLockup } from './SectionTitleLockup';

interface WeeklyScheduleSectionProps {
  theme?: 'dark' | 'white';
}

export interface ClassScheduleItem {
  time: string;
  name: string;
}

export interface DaySchedule {
  id: string;
  short: string;
  full: string;
  classes: ClassScheduleItem[];
}

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    id: 'mon',
    short: 'MON',
    full: 'MONDAY',
    classes: [
      { time: '08:30', name: 'Dance Fitness' },
      { time: '09:30', name: 'Dance Fitness' },
      { time: '04:30', name: 'Toddlers' },
      { time: '05:15', name: 'Kids' },
      { time: '06:00', name: 'Dance Fitness' },
      { time: '07:00', name: 'Tollywood' },
      { time: '08:00', name: 'Semi Classical' },
    ],
  },
  {
    id: 'tue',
    short: 'TUE',
    full: 'TUESDAY',
    classes: [
      { time: '08:30', name: 'Dance Fitness' },
      { time: '09:30', name: 'Dance Fitness' },
      { time: '04:30', name: 'Toddlers' },
      { time: '05:15', name: 'Kids' },
      { time: '06:00', name: 'Dance Fitness' },
      { time: '07:00', name: 'Bollywood' },
      { time: '08:00', name: 'Contemporary' },
    ],
  },
  {
    id: 'wed',
    short: 'WED',
    full: 'WEDNESDAY',
    classes: [
      { time: '08:30', name: 'Dance Fitness' },
      { time: '09:30', name: 'Dance Fitness' },
      { time: '04:30', name: 'Toddlers' },
      { time: '05:15', name: 'Kids' },
      { time: '06:00', name: 'Dance Fitness' },
      { time: '07:00', name: 'Tollywood' },
      { time: '08:00', name: 'Semi Classical' },
    ],
  },
  {
    id: 'thu',
    short: 'THU',
    full: 'THURSDAY',
    classes: [
      { time: '08:30', name: 'Dance Fitness' },
      { time: '09:30', name: 'Dance Fitness' },
      { time: '04:30', name: 'Toddlers' },
      { time: '05:15', name: 'Kids' },
      { time: '06:00', name: 'Dance Fitness' },
      { time: '07:00', name: 'Hip Hop' },
      { time: '08:00', name: 'Contemporary' },
    ],
  },
  {
    id: 'fri',
    short: 'FRI',
    full: 'FRIDAY',
    classes: [
      { time: '08:30', name: 'Dance Fitness' },
      { time: '09:30', name: 'Dance Fitness' },
      { time: '04:30', name: 'Toddlers' },
      { time: '05:15', name: 'Kids' },
      { time: '06:00', name: 'Dance Fitness' },
      { time: '07:00', name: 'Tollywood' },
      { time: '08:00', name: 'Bollywood' },
    ],
  },
];

export const WeeklyScheduleSection: React.FC<WeeklyScheduleSectionProps> = ({
  theme = 'dark',
}) => {
  const isWhite = theme === 'white';
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);

  // Subtle Mouse Parallax on Schedule Container (smooth tactile depth, no day hopping)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 10);
    mouseY.set(y * 6);
  };

  const handleContainerMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const setManualActiveDay = (idx: number) => {
    setActiveDayIndex(idx);
  };

  // Mobile Touch / Swipe Handling (predictable horizontal swipe only)
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Horizontal swipe threshold (must be distinctly horizontal, not vertical scrolling)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
      if (deltaX < 0) {
        // Swipe Left -> Next Day
        setActiveDayIndex((prev) => Math.min(WEEKLY_SCHEDULE.length - 1, prev + 1));
      } else {
        // Swipe Right -> Prev Day
        setActiveDayIndex((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const currentDay = WEEKLY_SCHEDULE[activeDayIndex];

  return (
    <section
      id="schedule"
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="py-16 sm:py-20 md:py-24 select-none relative overflow-hidden bg-transparent"
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 relative z-20">
        
        {/* Top Header Row: Section Heading + Horizontal Minimal Weekdays Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-neutral-800/40 border-stone-200/60">
          
          {/* Section Heading Lockup — SCHEDULE only, NO logo overlapping */}
          <div className="relative z-10 pointer-events-none">
            <SectionTitleLockup
              title="SCHEDULE"
              align="left"
              theme={theme}
              showLogo={false}
            />
          </div>

          {/* Minimal Horizontal Weekdays Navigation: MON · TUE · WED · THU · FRI */}
          <nav
            aria-label="Weekly schedule days"
            className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5 flex-wrap pointer-events-auto"
          >
            {WEEKLY_SCHEDULE.map((day, idx) => {
              const isActive = idx === activeDayIndex;

              return (
                <React.Fragment key={day.id}>
                  <button
                    type="button"
                    onClick={() => setManualActiveDay(idx)}
                    onMouseEnter={() => setManualActiveDay(idx)}
                    className={`relative py-1.5 px-2 sm:px-3 text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase font-bold transition-all duration-300 cursor-pointer focus:outline-none ${
                      isActive
                        ? isWhite
                          ? 'text-[#111111] scale-105'
                          : 'text-white scale-105'
                        : isWhite
                        ? 'text-stone-400 hover:text-stone-700'
                        : 'text-white/40 hover:text-white/75'
                    }`}
                  >
                    <span>{day.short}</span>

                    {/* Subtle underline indicator on active day */}
                    {isActive && (
                      <motion.div
                        layoutId="activeScheduleDayPill"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        className={`absolute bottom-0 inset-x-2 h-[2px] rounded-full ${
                          isWhite ? 'bg-black' : 'bg-white'
                        }`}
                      />
                    )}
                  </button>

                  {/* Middle Dot Divider between days */}
                  {idx < WEEKLY_SCHEDULE.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`text-xs select-none pointer-events-none ${
                        isWhite ? 'text-stone-300' : 'text-white/20'
                      }`}
                    >
                      ·
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Schedule Display Area: Smooth Cinematic Morph */}
        <motion.div
          style={{ x: springX, y: springY }}
          onMouseMove={handleContainerMouseMove}
          onMouseLeave={handleContainerMouseLeave}
          className="relative mt-8 sm:mt-12 md:mt-14 max-w-4xl"
        >
          {/* Active Day Monumental Title */}
          <div className="mb-6 sm:mb-8 flex items-baseline justify-between">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentDay.id}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`font-['Bebas_Neue',_'Montserrat',_sans-serif] text-3xl sm:text-4xl md:text-5xl tracking-[0.14em] uppercase font-black scale-y-[1.1] origin-left ${
                  isWhite ? 'text-[#141312]' : 'text-white'
                }`}
              >
                {currentDay.full}
              </motion.h3>
            </AnimatePresence>

            {/* Subtle swipe hint on mobile */}
            <span
              className={`sm:hidden text-[10px] tracking-widest uppercase ${
                isWhite ? 'text-stone-400' : 'text-white/30'
              }`}
            >
              Swipe
            </span>
          </div>

          {/* Classes List: TIME — CLASS */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDay.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="flex flex-col divide-y divide-neutral-800/40 divide-stone-200/70 border-t border-b border-neutral-800/40 border-stone-200/70"
              >
                {currentDay.classes.map((item, idx) => (
                  <motion.div
                    key={`${currentDay.id}-${item.time}-${item.name}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.32,
                      delay: idx * 0.035,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`group py-3.5 sm:py-4.5 md:py-5 flex items-center justify-between transition-all duration-300 ${
                      isWhite
                        ? 'hover:bg-stone-100/50 hover:pl-2'
                        : 'hover:bg-white/[0.03] hover:pl-2'
                    }`}
                  >
                    {/* TIME — CLASS format */}
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6 font-['Montserrat',_sans-serif]">
                      {/* Time */}
                      <span
                        className={`font-mono text-sm sm:text-base md:text-lg tracking-wider font-semibold transition-colors duration-200 ${
                          isWhite
                            ? 'text-stone-500 group-hover:text-black'
                            : 'text-white/50 group-hover:text-white'
                        }`}
                      >
                        {item.time}
                      </span>

                      {/* Em-dash */}
                      <span
                        aria-hidden="true"
                        className={`text-sm sm:text-base md:text-lg font-light select-none transition-colors duration-200 ${
                          isWhite
                            ? 'text-stone-300 group-hover:text-black'
                            : 'text-white/30 group-hover:text-white'
                        }`}
                      >
                        —
                      </span>

                      {/* Class Name */}
                      <span
                        className={`text-base sm:text-lg md:text-xl font-medium tracking-tight transition-colors duration-200 ${
                          isWhite
                            ? 'text-[#1A1A1A] group-hover:text-black'
                            : 'text-white/90 group-hover:text-white'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    {/* Subtle dot indicator on hover */}
                    <span
                      aria-hidden="true"
                      className={`w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                        isWhite ? 'bg-black' : 'bg-white'
                      }`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
