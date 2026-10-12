import React from 'react';

interface ArrowProps {
  className?: string;
  strokeWidth?: number;
  size?: number;
  color?: string;
}

/**
 * Bulletproof Vector Arrows.
 * Exact reference match to Inquire button:
 * - 24x24 viewBox with (7,17) to (17,7) diagonal line and (7,7)-(17,7)-(17,17) polyline
 * - Uses currentColor by default to seamlessly adopt text color
 * - Inline style with minWidth/minHeight prevents collapse or clipping
 */

// Diagonal Arrow: ↗ (for Commission, Studio Pass, Reserve Pass, External Links)
export const ArrowDiagonal: React.FC<ArrowProps> = ({ 
  className = "w-3.5 h-3.5", 
  strokeWidth = 2.5,
  size = 15,
  color = "currentColor"
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} shrink-0 inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
    style={{ minWidth: `${size}px`, minHeight: `${size}px` }}
    aria-hidden="true"
  >
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);

// Upward Arrow: ↑ (for TOP button)
export const ArrowUpward: React.FC<ArrowProps> = ({ 
  className = "w-3.5 h-3.5", 
  strokeWidth = 2.5,
  size = 15,
  color = "currentColor"
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} shrink-0 inline-block transition-transform duration-200 group-hover:-translate-y-0.5`}
    style={{ minWidth: `${size}px`, minHeight: `${size}px` }}
    aria-hidden="true"
  >
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);

// Right Arrow: →
export const ArrowRightward: React.FC<ArrowProps> = ({ 
  className = "w-3.5 h-3.5", 
  strokeWidth = 2.5,
  size = 15,
  color = "currentColor"
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} shrink-0 inline-block transition-transform duration-200 group-hover:translate-x-0.5`}
    style={{ minWidth: `${size}px`, minHeight: `${size}px` }}
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

