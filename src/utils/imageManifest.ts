export interface ImageSpec {
  id: number;
  fileName: string; // e.g., '1.png' (or '1.jpg')
  location: string; // Recommended folder in public/
  title: string;
  description: string;
  sections: string[];
  aspectRatio: string;
  recommendedResolution: string;
}

export const IMAGE_MANIFEST: ImageSpec[] = [
  {
    id: 1,
    fileName: '1.png',
    location: '/public/images/1.png',
    title: 'Bollywood Cinema & Royal Sangeet',
    description: 'Vibrant, cinematic Bollywood dance choreography or luxury wedding sangeet couple/troupe dance in rich stage lighting or Indian festive attire.',
    sections: ['About Me 3D Carousel (#1)', 'Projects Masonry', 'Commissions (Umaid Bhawan)'],
    aspectRatio: 'Portrait (3:4 or 4:5)',
    recommendedResolution: '1200 x 1600 px'
  },
  {
    id: 2,
    fileName: '2.png',
    location: '/public/images/2.png',
    title: 'Contemporary Dance & Suspension',
    description: 'Dramatic, moody contemporary dance in mid-air suspension or floor extension with artistic shadows and fluid modern movement.',
    sections: ['About Me 3D Carousel (#2)', 'Projects Masonry', 'Commissions (Tollywood Screen)', 'Community Runway Reels (#1)'],
    aspectRatio: 'Square / Portrait (1:1 or 4:5)',
    recommendedResolution: '1200 x 1500 px'
  },
  {
    id: 3,
    fileName: '3.png',
    location: '/public/images/3.png',
    title: 'Hip Hop & Street Urban Movement',
    description: 'Dynamic street dance, hip hop choreography, powerful athletic freeze or freestyle movement in urban streetwear.',
    sections: ['About Me 3D Carousel (#3)'],
    aspectRatio: 'Portrait (3:4 or 4:5)',
    recommendedResolution: '1200 x 1600 px'
  },
  {
    id: 4,
    fileName: '4.png',
    location: '/public/images/4.png',
    title: 'Zumba Conditioning & Dance Fitness',
    description: 'High-energy dance fitness, Zumba class, or athletic cardio dance session in studio setting with sweat and smiles.',
    sections: ['About Me 3D Carousel (#4)', 'Projects Masonry', 'Community Runway Reels (#3)'],
    aspectRatio: 'Landscape or Portrait (16:10 or 4:5)',
    recommendedResolution: '1600 x 1000 px'
  },
  {
    id: 5,
    fileName: '5.png',
    location: '/public/images/5.png',
    title: 'Arena Garba Festival & Youth Synchrony',
    description: 'Large-scale energetic Garba festival dancers in traditional chaniya choli / kurta with dandiya or synchronized festive circular motion.',
    sections: ['About Me 3D Carousel (#5)', 'Projects Masonry', 'Commissions (Arena Garba Festival)'],
    aspectRatio: 'Portrait (3:4 or 4:5)',
    recommendedResolution: '1200 x 1600 px'
  },
  {
    id: 6,
    fileName: '6.png',
    location: '/public/images/6.png',
    title: 'Ladies Special Atelier & Movement Sanctuary',
    description: 'Boutique women’s dance cohort, graceful group class, or empowering studio session in warm, natural studio lighting.',
    sections: ['About Me 3D Carousel (#6)', 'Projects Masonry', 'Commissions (Jubilee Hills Private Sessions)'],
    aspectRatio: 'Square or Portrait (1:1 or 4:5)',
    recommendedResolution: '1200 x 1200 px'
  },
  {
    id: 7,
    fileName: '7.png',
    location: '/public/images/7.png',
    title: 'Acro Yoga, Inversions & Handstands',
    description: 'Athletic yoga inversion, handstand balance, scapular control, or partner acro-yoga (as credited by Sania Mirza).',
    sections: ['About Me 3D Carousel (#7)', 'Projects Masonry', 'Commissions (Athletic Lab)'],
    aspectRatio: 'Portrait (3:4 or 4:5)',
    recommendedResolution: '1200 x 1600 px'
  },
  {
    id: 8,
    fileName: '8.png',
    location: '/public/images/8.png',
    title: 'Royal Palace Sangeet Staging',
    description: 'Royal palace wedding dance staging (Falaknuma / Umaid Bhawan palace style) with royal couple, chandeliers, or heritage architecture.',
    sections: ['About Me 3D Carousel (#8)', 'Projects Masonry', 'Commissions (Imperial First Dance)', 'Community Runway Reels (#5)'],
    aspectRatio: 'Portrait (3:4 or 4:5)',
    recommendedResolution: '1200 x 1600 px'
  },
  {
    id: 9,
    fileName: '9.png',
    location: '/public/images/9.png',
    title: 'Theatrical Solo Dance in Motion',
    description: 'Solo dancer in dramatic motion with flowing fabric or costume (red, gold, or jewel tone silk) under theatrical stage spotlight.',
    sections: ['Projects Masonry (#1)'],
    aspectRatio: 'Landscape (16:11 or 16:10)',
    recommendedResolution: '1600 x 1100 px'
  },
  {
    id: 10,
    fileName: '10.png',
    location: '/public/images/10.png',
    title: 'Mudra & Indian Classical Fusion Motion',
    description: 'Expressive classical Indian hand gestures (mudras), expressive facial storytelling (abhinaya), or classical-contemporary fusion.',
    sections: ['Projects Masonry', 'Commissions (Cinematic Video Direction)', 'Community Runway Reels (#2)'],
    aspectRatio: 'Portrait (4:5)',
    recommendedResolution: '1200 x 1500 px'
  },
  {
    id: 11,
    fileName: '11.png',
    location: '/public/images/11.png',
    title: 'Sprung Floor Mobility & Biomechanics Lab',
    description: 'Sprung wooden dance studio floor, stretching blocks, flexibility conditioning, foam rollers, or athletic rehearsal floor.',
    sections: ['Projects Masonry', 'Commissions (Biomechanics Lab)', 'Community Runway Reels (#7)'],
    aspectRatio: 'Landscape (16:10)',
    recommendedResolution: '1600 x 1000 px'
  },
  {
    id: 12,
    fileName: '12.png',
    location: '/public/images/12.png',
    title: 'Private Atelier Residency & 1-on-1 Coaching',
    description: 'Intimate private dance instruction, mirror reflection, personal choreographic coaching in a luxury studio setting.',
    sections: ['Projects Masonry', 'Community Runway Reels (#8)'],
    aspectRatio: 'Landscape (4:3 or 16:10)',
    recommendedResolution: '1600 x 1200 px'
  },
  {
    id: 13,
    fileName: '13.png',
    location: '/public/images/13.png',
    title: 'Classical Contemporary & Bridal Staging',
    description: 'Regal bridal solo staging, intricate ghagra/lehenga motion, or heritage classical dance composition.',
    sections: ['Projects Masonry', 'Commissions (Heritage Courtyard Ensemble)'],
    aspectRatio: 'Portrait (4:5)',
    recommendedResolution: '1200 x 1500 px'
  },
  {
    id: 14,
    fileName: '14.png',
    location: '/public/images/14.png',
    title: 'Duet & Ensemble Troupe Partnering',
    description: 'Two dancers in an artistic partnering lift or synchronized contemporary duet choreography.',
    sections: ['Projects Masonry'],
    aspectRatio: 'Landscape (16:10)',
    recommendedResolution: '1600 x 1000 px'
  },
  {
    id: 15,
    fileName: '15.png',
    location: '/public/images/15.png',
    title: 'Kinetic Movement & Camera Direction',
    description: 'Dancer framed with cinematography cameras or stage lights, capturing high-velocity movement direction for screen.',
    sections: ['Projects Masonry', 'Commissions (Camera Blocking Masterclass)', 'Community Runway Reels (#6)'],
    aspectRatio: 'Portrait (3:4 or 4:5)',
    recommendedResolution: '1200 x 1600 px'
  },
  {
    id: 16,
    fileName: '16.png',
    location: '/public/images/16.png',
    title: 'Studio Rehearsal Backstage',
    description: 'Behind-the-scenes authentic rehearsal moment: dancers resting on floor, sneakers, dance bags, rehearsal mirrors, raw grit.',
    sections: ['Projects Masonry (#15)'],
    aspectRatio: 'Square (1:1)',
    recommendedResolution: '1200 x 1200 px'
  },
  {
    id: 17,
    fileName: '17.png',
    location: '/public/images/17.png',
    title: 'Imperial Palace Ballroom & Heritage Venue',
    description: 'Grand palace ballroom interior with Belgian crystal chandeliers, marble arches, or heritage wedding venue ambience.',
    sections: ['Commissions (Falaknuma Palace Sangeet)', 'Community Runway Reels (#4)'],
    aspectRatio: 'Landscape or Portrait (16:10 or 4:5)',
    recommendedResolution: '1600 x 1000 px'
  },
  {
    id: 18,
    fileName: '18.png',
    location: '/public/images/18.png',
    title: 'High-Fashion Editorial Dance Portrait',
    description: 'Dramatic editorial studio portrait of a dancer with artistic lighting, sleek styling, or theatrical presence.',
    sections: ['Commissions (Music Album Choreography)'],
    aspectRatio: 'Portrait (4:5 or 3:4)',
    recommendedResolution: '1200 x 1500 px'
  }
];
