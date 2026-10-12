import React, { useState } from 'react';
import { Play, Film, ExternalLink } from 'lucide-react';

interface VideoSectionProps {
  theme: 'dark' | 'white';
  onOpenInquiry: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ theme, onOpenInquiry }) => {
  const isWhite = theme === 'white';
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video-reel" className={`py-20 md:py-28 border-t transition-colors duration-300 relative ${
      isWhite ? 'bg-[#f4f4f2] text-black border-black/10' : 'bg-[#060607] text-white border-white/10'
    }`}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-12 space-y-8">
        
        {/* Minimal Section Marker */}
        <div className={`flex items-center justify-between text-[11px] font-mono-meta uppercase tracking-widest pb-4 border-b ${
          isWhite ? 'border-black/10 text-stone-600' : 'border-white/10 text-stone-400'
        }`}>
          <div className="flex items-center gap-2">
            <span className="font-bold">PUBLIC VIDEO REEL</span>
            <span>·</span>
            <span>CHOREOGRAPHY BY NICY JOSEPH</span>
          </div>

          <a
            href="https://www.youtube.com/watch?v=ZLGLRrxf1Fs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1.5 transition-colors font-bold"
          >
            <span>OFFICIAL YOUTUBE (ZLGLRrxf1Fs)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Cinematic Stage: Full wide borderless video experience */}
        <div className="relative aspect-video w-full overflow-hidden bg-black rounded-xl shadow-2xl group border border-white/10">
          {isPlaying ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/ZLGLRrxf1Fs?autoplay=1&rel=0&modestbranding=1"
              title="Raanjhanaa | Bollywood Dance | Nicy Joseph Dance & Fitness"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div 
              onClick={() => setIsPlaying(true)}
              className="relative w-full h-full cursor-pointer overflow-hidden"
            >
              <img
                src="/src/assets/images/gallery_krasota_red_solo_1790836710482.jpg"
                alt="Raanjhanaa Choreography Direction"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-[0.72] group-hover:scale-[1.02] group-hover:brightness-[0.85] transition-all duration-700 ease-out"
              />

              {/* Minimal Dark Scrim */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Center Play Button: Minimal & cinematic */}
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/60 bg-black/40 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-2xl">
                  <Play className="w-8 h-8 md:w-10 md:h-10 fill-current translate-x-0.5" />
                </div>
                <div className="text-xs font-mono-meta font-bold tracking-widest uppercase text-white/90">
                  PLAY CHOREOGRAPHY FILM [03:45]
                </div>
              </div>

              {/* Overlaid Minimal Titles at bottom */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono-meta tracking-widest text-amber-300 uppercase font-bold">
                    VERIFIED YOUTUBE REFERENCE
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-black text-white tracking-tight uppercase">
                    Raanjhanaa | Bollywood Dance
                  </h3>
                </div>

                <div className="text-xs font-mono-meta text-stone-300">
                  CHOREOGRAPHY BY NICY JOSEPH · HYDERABAD
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
