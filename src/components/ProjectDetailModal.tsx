import React, { useEffect, useState } from 'react';
import { ArchiveProject } from '../data/archiveData';
import { X, Film, ExternalLink, ArrowUpRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ArchiveProject | null;
  onClose: () => void;
  onOpenInquiry: (discipline?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenInquiry
}) => {
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentAsset = project.mediaAssets[activeAssetIndex] || project.mediaAssets[0];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black/95 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl bg-[#09090b] border border-white/[0.1] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Minimal Navigation Bar */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono-meta text-stone-400">
          <div className="flex items-center gap-4">
            <span className="text-white">{project.index}</span>
            <span className="text-stone-700">/</span>
            <span className="uppercase text-stone-300">{project.title.split('·')[0]}</span>
            <span className="text-stone-700">/</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-stone-400 hover:text-white p-1 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-10 space-y-8 max-h-[82vh] overflow-y-auto">
          
          {/* Main Showcase Media (Video or Image) */}
          <div className="relative aspect-video w-full bg-black overflow-hidden">
            {currentAsset?.assetType === 'video' && currentAsset.videoEmbedId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentAsset.videoEmbedId}?autoplay=1&rel=0`}
                title={currentAsset.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={currentAsset?.url || project.coverImage}
                  alt={currentAsset?.title || project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Metadata on Image (Kaspar style) */}
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-xs font-mono-meta text-white/80">
                  <div>
                    <div className="text-[10px] text-amber-300 uppercase tracking-widest">
                      {currentAsset?.title}
                    </div>
                    {currentAsset?.caption && (
                      <div className="text-stone-300 text-xs font-light mt-0.5 max-w-lg">
                        {currentAsset.caption}
                      </div>
                    )}
                  </div>
                  <div className="text-stone-500 text-[10px]">
                    {currentAsset?.source}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Asset Reel Selector Strip */}
          {project.mediaAssets.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none text-xs font-mono-meta">
              <span className="text-stone-600 uppercase">ASSETS:</span>
              {project.mediaAssets.map((asset, idx) => (
                <button
                  key={asset.id}
                  onClick={() => setActiveAssetIndex(idx)}
                  className={`px-3 py-1.5 transition-colors cursor-pointer border ${
                    activeAssetIndex === idx
                      ? 'border-white text-white font-medium bg-white/[0.05]'
                      : 'border-white/[0.08] text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <span>[{asset.assetType.toUpperCase()}] {asset.title.slice(0, 24)}...</span>
                </button>
              ))}
            </div>
          )}

          {/* Editorial Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-white/[0.08]">
            <div className="md:col-span-8 space-y-4">
              <div className="space-y-1">
                <div className="text-[11px] font-mono-meta text-stone-500 uppercase">
                  {project.role}
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-medium text-white uppercase tracking-tight">
                  {project.title}
                </h2>
              </div>

              <p className="text-sm text-stone-300 font-light leading-relaxed">
                {project.summary}
              </p>

              <div className="pt-2 text-xs font-mono-meta text-stone-400 space-y-1">
                <div className="text-stone-500">ARCHIVE NOTE /</div>
                <p className="font-light">{project.curatorNote}</p>
              </div>

              {project.provenanceCitation && (
                <div className="text-[11px] font-mono-meta text-stone-500 pt-2">
                  CITATION: {project.provenanceCitation}
                </div>
              )}
            </div>

            <div className="md:col-span-4 space-y-6 text-xs font-mono-meta">
              <div className="space-y-3">
                <div className="text-stone-500 uppercase">Project Record</div>
                <div className="space-y-2 border-t border-white/[0.06] pt-2">
                  {project.credits.map((c) => (
                    <div key={c.label} className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-stone-500">{c.label}</span>
                      <span className="text-stone-200">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry(project.title);
                }}
                className="w-full py-3 bg-white text-black font-medium text-xs uppercase tracking-widest hover:bg-stone-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Commission Similar Work</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
