import React, { useState, useEffect, useRef } from 'react';

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

/**
 * Pristine, zero-glitch image component.
 * Replaces fake/heavy CSS blur with instant, hardware-accelerated optical reveal.
 * Guarantees crisp resolution, zero gray smeared frames, and instant cached loading.
 */
export const BlurImage: React.FC<BlurImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div 
      className={`relative overflow-hidden bg-[#0c0c10] ${containerClassName}`}
    >
      {/* Subtle warm deep graphite shimmer before image settles */}
      <div 
        className={`absolute inset-0 bg-gradient-to-tr from-[#08080a] via-[#121216] to-[#08080a] pointer-events-none transition-opacity duration-500 ease-out z-0 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Pristine high-resolution image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isLoaded 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-[1.03]'
        } ${className}`}
        {...(props as any)}
      />

      {/* Fallback if an image fails to load */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#0a0a0d] text-center z-10">
          <div className="w-8 h-8 rounded-full border border-amber-400/30 flex items-center justify-center text-amber-300 text-xs mb-2">
            NJ
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-stone-400">
            {alt || 'Archival Motion'}
          </span>
        </div>
      )}
    </div>
  );
};
