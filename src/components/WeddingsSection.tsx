import React from 'react';
import { ReelsSection } from './ReelsSection';

interface WeddingsSectionProps {
  theme: 'dark' | 'white';
  onOpenInquiry: (topic?: string) => void;
  onPlayVideo?: (title: string, url: string) => void;
}

export const WeddingsSection: React.FC<WeddingsSectionProps> = (props) => {
  return <ReelsSection {...props} />;
};
