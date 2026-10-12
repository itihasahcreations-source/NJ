import React from 'react';

interface FooterProps {
  theme?: 'dark' | 'white';
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer 
      aria-hidden="true"
      className="hidden"
    />
  );
};
