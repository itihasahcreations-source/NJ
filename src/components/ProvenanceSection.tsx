import React from 'react';
import { PROVENANCE_TIMELINE } from '../data/archiveData';
import { ExternalLink } from 'lucide-react';

interface ProvenanceSectionProps {
  theme: 'dark' | 'white';
}

export const ProvenanceSection: React.FC<ProvenanceSectionProps> = ({ theme }) => {
  const isWhite = theme === 'white';

  return (
    <section id="provenance-section" className={`py-20 md:py-28 border-t transition-colors duration-300 relative ${
      isWhite ? 'bg-white text-black border-black/10' : 'bg-[#080809] text-white border-white/10'
    }`}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Minimal Section Marker */}
        <div className={`flex items-center justify-between text-[11px] font-mono-meta uppercase tracking-widest pb-4 border-b ${
          isWhite ? 'border-black/10 text-stone-600' : 'border-white/10 text-stone-400'
        }`}>
          <span className="font-bold">PROVENANCE & DOCUMENTED CITATIONS</span>
          <span>PRESS ARCHIVE</span>
        </div>

        {/* Chronological Table / Index (DFP & Yakushev model) */}
        <div className={`divide-y ${isWhite ? 'divide-black/10' : 'divide-white/[0.08]'}`}>
          {PROVENANCE_TIMELINE.map((item, idx) => (
            <div 
              key={idx}
              className={`py-6 transition-colors px-2 flex flex-col md:flex-row md:items-baseline justify-between gap-6 group ${
                isWhite ? 'hover:bg-stone-50' : 'hover:bg-white/[0.015]'
              }`}
            >
              {/* Year & Category */}
              <div className="flex items-baseline gap-6 w-48 shrink-0">
                <span className={`font-mono-meta text-xs font-bold transition-colors ${
                  isWhite ? 'text-black' : 'text-stone-400 group-hover:text-white'
                }`}>
                  {item.year}
                </span>
                <span className={`text-[11px] font-mono-meta uppercase tracking-wider ${
                  isWhite ? 'text-stone-500' : 'text-stone-600'
                }`}>
                  {item.category}
                </span>
              </div>

              {/* Main Content & Quote */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <h3 className="text-base font-display font-bold uppercase transition-colors">
                    {item.title}
                  </h3>
                  <span className={`text-xs font-mono-meta ${isWhite ? 'text-stone-500' : 'text-stone-400'}`}>
                    — {item.source}
                  </span>
                </div>
                <p className={`text-xs font-light leading-relaxed max-w-2xl ${
                  isWhite ? 'text-stone-600' : 'text-stone-400'
                }`}>
                  {item.quoteOrContext}
                </p>
              </div>

              {/* Link / Citation */}
              <div className="shrink-0 text-right">
                {item.verificationLink ? (
                  <a
                    href={item.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-[11px] font-mono-meta transition-colors ${
                      isWhite ? 'text-stone-600 hover:text-black' : 'text-stone-500 hover:text-white'
                    }`}
                  >
                    <span>View Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className={`text-[10px] font-mono-meta ${isWhite ? 'text-stone-400' : 'text-stone-600'}`}>
                    VERIFIED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
