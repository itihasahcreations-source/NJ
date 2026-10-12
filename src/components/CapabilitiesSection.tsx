import React, { useState } from 'react';
import { CAPABILITIES } from '../data/archiveData';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';

interface CapabilitiesSectionProps {
  onOpenInquiry: (discipline?: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onOpenInquiry }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="capabilities" className="py-20 md:py-32 bg-[#080809] border-t border-white/[0.06] relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Minimal Section Marker */}
        <div className="flex items-center justify-between text-[11px] font-mono-meta text-stone-500 uppercase tracking-widest pb-4 border-b border-white/[0.06]">
          <span>03 / DISCIPLINES & ECOSYSTEM</span>
          <span>PRODUCTION MATRIX</span>
        </div>

        {/* Clean Editorial Accordion / Index (Artiom Yakushev & DFP clarity) */}
        <div className="divide-y divide-white/[0.08]">
          {CAPABILITIES.map((cap, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div 
                key={cap.number}
                className="py-8 transition-colors group cursor-pointer"
                onClick={() => toggleExpand(idx)}
              >
                {/* Primary Row */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono-meta text-xs text-stone-500 group-hover:text-amber-400 transition-colors w-8">
                      {cap.number}
                    </span>
                    <h3 className="text-xl md:text-3xl font-display font-medium text-white group-hover:text-stone-200 uppercase tracking-tight transition-colors">
                      {cap.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-mono-meta text-stone-400">
                    <span className="hidden md:inline text-stone-500 max-w-sm truncate">
                      {cap.disciplines.join(' · ')}
                    </span>
                    <span className="p-1 text-stone-500 group-hover:text-white transition-colors">
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="pt-8 pb-4 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-light text-stone-400 animate-in fade-in duration-200">
                    <div className="md:col-span-3 text-[11px] font-mono-meta text-stone-500 uppercase tracking-wider">
                      Scope & Rehearsal Flow /
                    </div>

                    <div className="md:col-span-5 space-y-4">
                      <p className="text-stone-300 text-sm leading-relaxed">
                        {cap.scope}
                      </p>
                      <div className="space-y-1.5 pt-2">
                        <div className="text-[10px] font-mono-meta text-stone-500 uppercase">Disciplines:</div>
                        <div className="flex flex-wrap gap-2 text-stone-300 font-mono-meta text-[11px]">
                          {cap.disciplines.map((d, i) => (
                            <span key={d}>
                              {d}{i < cap.disciplines.length - 1 ? ' · ' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col justify-between space-y-6">
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono-meta text-stone-500 uppercase">Deliverables:</div>
                        <ul className="space-y-1.5 text-stone-300">
                          {cap.deliverables.map((del) => (
                            <li key={del} className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-stone-500" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenInquiry(cap.title);
                        }}
                        className="self-start text-xs font-mono-meta text-white hover:text-stone-300 underline underline-offset-4 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Commission {cap.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
