import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface CenterRightThemeToggleProps {
  theme: 'dark' | 'white';
  onToggleTheme: () => void;
}

export const CenterRightThemeToggle: React.FC<CenterRightThemeToggleProps> = ({
  theme,
  onToggleTheme
}) => {
  const isWhite = theme === 'white';

  return (
    <aside 
      aria-label="Theme mode switcher"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 select-none"
    >
      <button
        onClick={onToggleTheme}
        aria-label="Toggle between dark and light version"
        title="Toggle Theme"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-transparent hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/20 hover:border-white/50 backdrop-blur-md active:scale-95 group shadow-lg"
      >
        {isWhite ? (
          <Moon className="w-4 h-4 text-stone-900 group-hover:rotate-12 transition-transform" />
        ) : (
          <Sun className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
        )}
      </button>
    </aside>
  );
};
