import React, { useState } from 'react';
import { Code, Check, Copy } from 'lucide-react';

interface ClientAssetSystemProps {
  theme: 'dark' | 'white';
}

export const ClientAssetSystem: React.FC<ClientAssetSystemProps> = ({ theme }) => {
  const isWhite = theme === 'white';
  const [selectedCategory, setSelectedCategory] = useState<'wedding' | 'dance' | 'workshop' | 'yoga' | 'studio'>('wedding');
  const [copied, setCopied] = useState(false);
  
  const [customTitle, setCustomTitle] = useState('Heritage Sangeet Ballroom Finale');
  const [customType, setCustomType] = useState<'photograph' | 'video'>('photograph');
  const [customSource, setCustomSource] = useState('CLIENT GOOGLE DRIVE / SANGEET_2024');

  const currentSampleJson = {
    assetType: customType,
    fileCode: 'nj_005.jpg',
    category: selectedCategory,
    title: customTitle,
    source: customSource,
    status: 'WAITING_FOR_ORIGINAL_ASSET',
    placeholder: true,
    dimensions: customType === 'photograph' ? 'RAW HIGH-RES 4000x3000' : '4K MASTER (16:9)'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentSampleJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    {
      category: 'wedding' as const,
      label: 'Wedding Sangeet Rehearsal & Stage',
      title: 'Bridal Solo Choreography Stills',
      source: 'CLIENT INSTAGRAM / @nicyjosephdanceandfitness',
      type: 'photograph' as const
    },
    {
      category: 'dance' as const,
      label: 'YouTube Dance Showcase',
      title: 'Raanjhanaa Choreography Stills & Cut',
      source: 'OFFICIAL YOUTUBE CHANNEL (ZLGLRrxf1Fs)',
      type: 'video' as const
    },
    {
      category: 'workshop' as const,
      label: 'Garba Arena Festival Immersion',
      title: 'Day 2 Arena Kinetic Swirl Photos',
      source: 'FESTIVAL ACCREDITED PHOTOGRAPHER DRIVE',
      type: 'photograph' as const
    },
    {
      category: 'yoga' as const,
      label: 'Inversion & Handstand Technique',
      title: 'Handstand Scapular Alignment Series',
      source: 'CLIENT STUDIO REEL ARCHIVE',
      type: 'video' as const
    },
    {
      category: 'studio' as const,
      label: 'Jubilee Hills Movement Sanctuary',
      title: 'Mirrored Studio Floor Daily Atmosphere',
      source: 'CLIENT DRIVE / JUBILEE_HILLS_STILLS',
      type: 'photograph' as const
    }
  ];

  return (
    <section id="asset-system" className={`py-20 md:py-28 border-t transition-colors duration-300 relative ${
      isWhite ? 'bg-[#f7f7f5] text-black border-black/10' : 'bg-[#060607] text-white border-white/10'
    }`}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Minimal Section Marker */}
        <div className={`flex items-center justify-between text-[11px] font-mono-meta uppercase tracking-widest pb-4 border-b ${
          isWhite ? 'border-black/10 text-stone-600' : 'border-white/10 text-stone-400'
        }`}>
          <span className="font-bold">CLIENT-ASSET ARCHITECTURE (BRIEF F)</span>
          <span>SCHEMA SPECIFICATION</span>
        </div>

        {/* Blueprint Layout: Clean, architectural, human */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Proposal Explanation & Category Presets */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight">
                Structured Ingestion for Raw Assets
              </h3>
              <p className={`text-xs font-light leading-relaxed ${
                isWhite ? 'text-stone-600' : 'text-stone-400'
              }`}>
                Designed so Nicy’s existing photography and videography—from wedding drives, 
                Instagram carousels, and YouTube reels—drop directly into this editorial visual archive 
                without breaking grid aesthetics.
              </p>
            </div>

            {/* Presets List */}
            <div className={`divide-y border-y ${
              isWhite ? 'divide-black/10 border-black/10' : 'divide-white/[0.08] border-white/[0.08]'
            }`}>
              {presets.map((preset) => (
                <div
                  key={preset.label}
                  onClick={() => {
                    setSelectedCategory(preset.category);
                    setCustomTitle(preset.title);
                    setCustomSource(preset.source);
                    setCustomType(preset.type);
                  }}
                  className={`py-3.5 transition-colors cursor-pointer flex items-center justify-between text-xs font-mono-meta ${
                    customTitle === preset.title
                      ? isWhite ? 'text-black font-bold' : 'text-white font-bold'
                      : isWhite ? 'text-stone-500 hover:text-black' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="tracking-wide uppercase">{preset.label}</div>
                    <div className="text-[10px] opacity-60 truncate">{preset.source}</div>
                  </div>
                  <span className="text-[10px] uppercase opacity-70">[{preset.type}]</span>
                </div>
              ))}
            </div>

            {/* Quiet instructions */}
            <div className={`text-[11px] font-mono-meta space-y-1 ${
              isWhite ? 'text-stone-500' : 'text-stone-500'
            }`}>
              <div>INGESTION READY: GOOGLE DRIVE / INSTAGRAM REELS / YOUTUBE</div>
              <div>METADATA: EXIF · RATIO HARMONIZATION · ARCHIVAL KEY</div>
            </div>
          </div>

          {/* Right: Technical Schema View (Brief F) */}
          <div className="lg:col-span-7 space-y-3">
            <div className={`flex items-center justify-between text-[11px] font-mono-meta ${
              isWhite ? 'text-stone-600' : 'text-stone-400'
            }`}>
              <span>CLIENT-ASSET-SPECIFICATION.JSON</span>
              <button
                onClick={handleCopy}
                className="hover:underline flex items-center gap-1.5 cursor-pointer font-bold"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'COPIED' : 'COPY SPEC'}</span>
              </button>
            </div>

            <div className={`p-6 border font-mono-meta text-xs leading-relaxed overflow-x-auto rounded-lg shadow-sm ${
              isWhite 
                ? 'bg-white border-black/15 text-stone-900 selection:bg-black selection:text-white' 
                : 'bg-[#0c0c0e] border-white/10 text-stone-300 selection:bg-white selection:text-black'
            }`}>
              <code>{JSON.stringify(currentSampleJson, null, 2)}</code>
            </div>

            <p className={`text-[11px] font-light ${
              isWhite ? 'text-stone-500' : 'text-stone-500'
            }`}>
              Complies with Brief F client-asset placeholder system standard: 
              distinguishes verified public sources from pending original high-res assets.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
