import React from 'react';

interface MotionSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  index?: number;
}

export const MotionSection: React.FC<MotionSectionProps> = ({
  children,
  id,
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`border-none select-none relative scroll-mt-6 md:scroll-mt-12 bg-transparent ${className}`}
    >
      {children}
    </section>
  );
};
