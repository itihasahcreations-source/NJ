import React from 'react';

interface MinimalStatementProps {
  theme: 'dark' | 'white';
}

export const MinimalStatement: React.FC<MinimalStatementProps> = ({ theme }) => {
  const isWhite = theme === 'white';

  const stats = [
    { label: 'PRODUCTIONS', value: '100+' },
    { label: 'INDUSTRY CITATION', value: 'TOP 10' },
    { label: 'MOVEMENT SANCTUARY', value: 'JUBILEE HILLS' },
    { label: 'DISCIPLINES', value: 'CONTEMPORARY · SANGEET · YOGA' },
  ];

  return (
    <section className={`py-24 md:py-36 px-6 md:px-14 border-none transition-colors duration-500 select-none ${
      isWhite ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      <div className="max-w-5xl mx-auto text-center space-y-12">
        
        {/* Core Statement (art-yakushev style large quiet typography) */}
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light leading-[1.3] tracking-tight text-balance">
          An award-winning contemporary dance company and choreography agency in Hyderabad, 
          integrating Indian movement traditions, visual arts and high-fashion stage productions.
        </p>

        {/* Minimal Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-xl sm:text-2xl font-condensed font-black tracking-tight text-amber-300">
                {s.value}
              </div>
              <div className="text-[10px] font-mono-meta tracking-widest uppercase opacity-50">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
