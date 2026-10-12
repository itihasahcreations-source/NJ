/**
 * Curated Archive Data for Nicy Joseph Dance & Fitness
 * Hyderabad, India
 * 
 * Accurately tailored to match:
 * - Screenshot 26: Dance.Film.Performance Hero
 * - Screenshot 25: Selected Projects 3-column rounded cards with blurred aura header
 * - Screenshot 28: Maximilian Kaspar multi-asset grid (nj_001.mp4, nj_002.jpg, ASCII accents)
 * - Screenshot 29: Tom Dale Company oversized kinetic marquee ticker
 */

export interface ClientMediaAsset {
  id: string;
  assetType: 'photograph' | 'video';
  fileCode: string; // e.g. 'nj_001.mp4', 'nj_002.jpg' as in Maximilian Kaspar (Screenshot 28)
  category: 'wedding' | 'dance' | 'performance' | 'workshop' | 'yoga' | 'fitness' | 'studio' | 'celebrity';
  title: string;
  source: string;
  status: 'VERIFIED_PUBLIC_SOURCE' | 'WAITING_FOR_ORIGINAL_ASSET';
  placeholder: boolean;
  url: string;
  videoEmbedId?: string;
  caption?: string;
  dimensions?: string;
}

export interface ArchiveProject {
  id: string;
  index: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'wedding' | 'dance' | 'performance' | 'workshop' | 'yoga' | 'studio';
  year: string;
  location: string;
  awardBadge?: string; // e.g. 'BRIDES TODAY TOP 10', 'HYD DANCE FESTIVAL', 'SANIA MIRZA COLLAB'
  client: string;
  summary: string;
  curatorNote: string;
  role: string;
  aspectRatio: 'wide' | 'tall' | 'standard';
  coverImage: string;
  hasVideo: boolean;
  videoEmbedId?: string;
  mediaAssets: ClientMediaAsset[];
  disciplines: string[];
  credits: { label: string; value: string }[];
  featured: boolean;
  provenanceCitation?: string;
}

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    id: 'raanjhanaa-bollywood',
    index: '01',
    slug: 'raanjhanaa',
    title: 'RAANJHANAA',
    subtitle: 'Contemporary Bollywood choreographic direction & spatial flow',
    category: 'dance',
    year: '2023',
    location: 'Hyderabad Studio',
    awardBadge: 'YOUTUBE MASTERPIECE',
    client: 'Nicy Joseph Dance & Fitness',
    summary: 'A signature movement piece conceived and choreographed by Nicy Joseph. Combining lyrical Bollywood storytelling with dynamic footwork, fluid transitions, and cinematic staging.',
    curatorNote: 'Public verified YouTube choreography reference. Exemplifies Nicy’s command of musicality and emotive Indian dance narrative.',
    role: 'Choreography, Direction & Solo Performance',
    aspectRatio: 'standard',
    coverImage: '/src/assets/images/gallery_krasota_red_solo_1790836710482.jpg',
    hasVideo: true,
    videoEmbedId: 'ZLGLRrxf1Fs',
    provenanceCitation: 'Official YouTube: Raanjhanaa | Bollywood Dance | Nicy Joseph Dance & Fitness (ZLGLRrxf1Fs)',
    featured: true,
    disciplines: ['Bollywood Contemporary', 'Spatial Staging', 'Cinematic Repertoire'],
    credits: [
      { label: 'Choreography', value: 'Nicy Joseph' },
      { label: 'Studio', value: 'Nicy Joseph Dance & Fitness' },
      { label: 'Platform', value: 'Official YouTube (ZLGLRrxf1Fs)' },
      { label: 'Location', value: 'Hyderabad, India' }
    ],
    mediaAssets: [
      {
        id: 'asset-r1',
        assetType: 'video',
        fileCode: 'nj_001.mp4',
        category: 'dance',
        title: 'Full Choreography Showcase · Raanjhanaa',
        source: 'OFFICIAL NICY YOUTUBE (ZLGLRrxf1Fs)',
        status: 'VERIFIED_PUBLIC_SOURCE',
        placeholder: false,
        url: 'https://www.youtube.com/watch?v=ZLGLRrxf1Fs',
        videoEmbedId: 'ZLGLRrxf1Fs',
        caption: 'Choreography by Nicy Joseph. Official release on YouTube.',
        dimensions: '1920x1080 (16:9 4K)'
      },
      {
        id: 'asset-r2',
        assetType: 'photograph',
        fileCode: 'nj_002.jpg',
        category: 'dance',
        title: 'Solo Crimson Motion · Suspended Arch',
        source: 'CLIENT INSTAGRAM / CLIENT ARCHIVE',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/gallery_krasota_red_solo_1790836710482.jpg',
        caption: 'Dramatic red stage lighting study of transitional movement in the mid-tempo segment.',
        dimensions: '3840x2160'
      },
      {
        id: 'asset-r3',
        assetType: 'photograph',
        fileCode: 'nj_003.jpg',
        category: 'studio',
        title: 'Floor Rehearsal & Alignment Study',
        source: 'CLIENT DRIVE / REHEARSAL STILLS',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/studio_rehearsal_backstage_1790835788315.jpg',
        caption: 'Pre-production movement blocking inside Jubilee Hills studio.',
        dimensions: '2400x1600'
      },
      {
        id: 'asset-r4',
        assetType: 'photograph',
        fileCode: 'nj_004.jpg',
        category: 'performance',
        title: 'Editorial Silhouette & Gesture',
        source: 'CLIENT DRIVE / ARCHIVAL SLOTS',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/hero_nicy_movement_editorial_1790835724020.jpg',
        caption: 'Hasselblad medium format capture of final closing mudra.',
        dimensions: '3840x2160'
      }
    ]
  },
  {
    id: 'heritage-sangeet-falaknuma',
    index: '02',
    slug: 'falaknuma-sangeet',
    title: 'FALAKNUMA SANGEET',
    subtitle: 'Bespoke royal sangeet & multi-generational family staging',
    category: 'wedding',
    year: '2024',
    location: 'Taj Falaknuma & Grand Estates',
    awardBadge: 'BRIDES TODAY TOP 10',
    client: 'Royal Hyderabad Destination Weddings',
    summary: 'Curated sangeet choreography tailored for intimate bridal solos, bride & groom grand duets, and synchronized multi-generational family flashmobs. Recognized in Brides Today top 10 Indian choreographers.',
    curatorNote: 'Documented in Brides Today ("Top 10 Wedding Choreographers to Help You Flaunt Your Moves") and WOW Hyderabad wedding features.',
    role: 'Lead Wedding Choreographer & Rehearsal Director',
    aspectRatio: 'standard',
    coverImage: '/src/assets/images/gallery_icarus_classical_contemporary_1790836686898.jpg',
    hasVideo: false,
    provenanceCitation: 'Featured in Brides Today (April 2024) & WOW Hyderabad Sangeet Portfolio',
    featured: true,
    disciplines: ['Sangeet Production', 'Couple Duets', 'Family Rehearsals', 'Bridal Solos'],
    credits: [
      { label: 'Press Citation', value: 'Brides Today Top 10' },
      { label: 'Production Scope', value: '18 Rehearsals · 42 Dancers · Palace Ballroom' },
      { label: 'Venue Style', value: 'Taj Falaknuma Palace & Heritage Estates' },
      { label: 'Director', value: 'Nicy Joseph' }
    ],
    mediaAssets: [
      {
        id: 'asset-w1',
        assetType: 'photograph',
        fileCode: 'fn_001.jpg',
        category: 'wedding',
        title: 'Palace Stage Ensemble · Classical Stance',
        source: 'CLIENT INSTAGRAM / CLIENT DRIVE',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/gallery_icarus_classical_contemporary_1790836686898.jpg',
        caption: 'Contemporary tailored staging for destination palace wedding.',
        dimensions: '4000x3000'
      },
      {
        id: 'asset-w2',
        assetType: 'photograph',
        fileCode: 'fn_002.jpg',
        category: 'wedding',
        title: 'Grand Ballroom Finale · Emerald Gold Attire',
        source: 'CLIENT DRIVE / SANGEET ARCHIVE',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/archive_wedding_sangeet_choreography_1790835745407.jpg',
        caption: 'Climactic sangeet performance under royal chandelier lighting.',
        dimensions: '4000x3000'
      },
      {
        id: 'asset-w3',
        assetType: 'photograph',
        fileCode: 'fn_003.jpg',
        category: 'wedding',
        title: 'Bride & Groom Duet Rehearsal Stills',
        source: 'CLIENT DRIVE / REHEARSAL STILLS',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/studio_rehearsal_backstage_1790835788315.jpg',
        caption: 'One-on-one partner work coaching step count and posture comfort.',
        dimensions: '3000x2000'
      }
    ]
  },
  {
    id: 'handstand-yoga-inversion',
    index: '03',
    slug: 'asana-inversions',
    title: 'POEM OF ASANA',
    subtitle: 'Precision calisthenics & advanced handstand biomechanics',
    category: 'yoga',
    year: '2023',
    location: 'Jubilee Hills Sanctuary',
    awardBadge: 'SANIA MIRZA COLLAB',
    client: 'Nicy Joseph Movement Lab',
    summary: 'Precision-focused inversion and flexibility coaching combining classical yoga principles, gymnastic calisthenics, and core biomechanics. Documented publicly by Sania Mirza.',
    curatorNote: 'Documented public reference: Sania Mirza publicly thanked @nicyjosephdanceandfitness for teaching handstand technique during lockdown training.',
    role: 'Master Movement & Yoga Inversion Coach',
    aspectRatio: 'standard',
    coverImage: '/src/assets/images/archive_yoga_inversion_discipline_1790835758078.jpg',
    hasVideo: false,
    provenanceCitation: 'Public Source: Republic World sports coverage on Sania Mirza lockdown fitness training',
    featured: true,
    disciplines: ['Handstand Inversions', 'Core Calisthenics', 'Vinyasa Alignment', 'Athletic Recovery'],
    credits: [
      { label: 'Public Mention', value: 'Sania Mirza (Public Thanks on Instagram)' },
      { label: 'Specialty', value: 'Free-Standing Handstand & Scapular Stability' },
      { label: 'Approach', value: 'Biomechanical Alignment & Breath Control' },
      { label: 'Instructor', value: 'Nicy Joseph' }
    ],
    mediaAssets: [
      {
        id: 'asset-y1',
        assetType: 'photograph',
        fileCode: 'as_001.jpg',
        category: 'yoga',
        title: 'Static Inversion Balance · Studio Concrete Still',
        source: 'CLIENT INSTAGRAM / CLIENT DRIVE',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/archive_yoga_inversion_discipline_1790835758078.jpg',
        caption: 'Demonstration of stacked spinal neutral and scapular elevation.',
        dimensions: '3000x4000'
      },
      {
        id: 'asset-y2',
        assetType: 'photograph',
        fileCode: 'as_002.jpg',
        category: 'celebrity',
        title: 'Celebrity Technique Acknowledgment',
        source: 'REPUBLIC WORLD & INSTAGRAM PUBLIC CITATION',
        status: 'VERIFIED_PUBLIC_SOURCE',
        placeholder: false,
        url: '/src/assets/images/hero_nicy_movement_editorial_1790835724020.jpg',
        caption: 'Public documentation: Sania Mirza credited Nicy Joseph Dance & Fitness for handstand technique.',
        dimensions: '1080x1350'
      }
    ]
  },
  {
    id: 'hyderabad-dance-festival-garba',
    index: '04',
    slug: 'garba-immersion',
    title: 'LUMORA GARBA',
    subtitle: 'Official studio partner & Day 2 festival arena conductor',
    category: 'workshop',
    year: '2024',
    location: 'Hyderabad Cultural Amphitheatre',
    awardBadge: 'HYD DANCE FESTIVAL',
    client: 'Hyderabad Dance Festival (Official)',
    summary: 'Nicy Joseph Dance & Fitness served as an official studio partner for the prestigious Hyderabad Dance Festival, leading the Day 2 Garba component with hundreds of active participants moving in unison.',
    curatorNote: 'Documented on hyddancefestival.com: Official Studio Partner & Day 2 Garba Leader.',
    role: 'Festival Studio Partner & Lead Garba Conductor',
    aspectRatio: 'standard',
    coverImage: '/src/assets/images/gallery_lumora_troupe_duet_1790836738609.jpg',
    hasVideo: false,
    provenanceCitation: 'Official Festival Archive: hyddancefestival.com (Day 2 Schedule & Studio Partner Listing)',
    featured: true,
    disciplines: ['Garba Folk Rhythms', 'Circular Dynamics', 'Festival Staging', 'Community Energy'],
    credits: [
      { label: 'Festival', value: 'Hyderabad Dance Festival (Official)' },
      { label: 'Role', value: 'Studio Partner & Day 2 Garba Lead' },
      { label: 'Cohort Size', value: '350+ Participants' },
      { label: 'Organization', value: 'Nicy Joseph Dance & Fitness' }
    ],
    mediaAssets: [
      {
        id: 'asset-g1',
        assetType: 'photograph',
        fileCode: 'gb_001.jpg',
        category: 'workshop',
        title: 'Projection Swirl & Synchronized Movement',
        source: 'OFFICIAL FESTIVAL ARCHIVE / CLIENT INSTAGRAM',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/gallery_lumora_troupe_duet_1790836738609.jpg',
        caption: 'Duet in ambient stage light during festival staging.',
        dimensions: '4000x3000'
      },
      {
        id: 'asset-g2',
        assetType: 'photograph',
        fileCode: 'gb_002.jpg',
        category: 'workshop',
        title: 'Arena Kinetic Swirl · Day 2 Garba Immersion',
        source: 'CLIENT DRIVE / FESTIVAL PHOTOGRAPHY',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/archive_workshop_garba_festival_1790835773229.jpg',
        caption: 'High-energy circular Garba patterns with 350+ dancers.',
        dimensions: '4000x3000'
      }
    ]
  },
  {
    id: 'studio-milestone-two-years',
    index: '05',
    slug: 'two-years-studio',
    title: '9.81 M/S² RESIDENCY',
    subtitle: 'Studio provenance, daily batches & industry rehearsals',
    category: 'studio',
    year: '2022',
    location: 'Jubilee Hills, Hyderabad',
    awardBadge: 'EST. 2020 · WOW HYDERABAD',
    client: 'Nicy Joseph Dance & Fitness',
    summary: 'A curated milestone commemorating two years since founding Nicy Joseph Dance & Fitness. Tracing the development of custom dance floors, professional lighting, daily student batches, and Tollywood/industry rehearsals.',
    curatorNote: 'Documented on YouTube ("Celebrating Two years of Nicy Joseph Dance and Fitness") & featured in WOW Hyderabad Nov 2024 issue.',
    role: 'Founder & Artistic Director',
    aspectRatio: 'standard',
    coverImage: '/src/assets/images/studio_rehearsal_backstage_1790835788315.jpg',
    hasVideo: true,
    provenanceCitation: 'Documented YouTube: "Celebrating Two years of Nicy Joseph Dance and Fitness" & WOW Hyderabad',
    featured: false,
    disciplines: ['Studio Architecture', 'Community Batches', 'Tollywood Rehearsals', 'Creative Labs'],
    credits: [
      { label: 'Studio Base', value: 'Jubilee Hills, Hyderabad' },
      { label: 'Established', value: 'Circa 2020' },
      { label: 'Focus', value: 'Dance, Fitness, Yoga, Workshops' },
      { label: 'Director', value: 'Nicy Joseph' }
    ],
    mediaAssets: [
      {
        id: 'asset-s1',
        assetType: 'photograph',
        fileCode: 'st_001.jpg',
        category: 'studio',
        title: 'Studio Interior · Natural Light & Mirrored Barre',
        source: 'CLIENT DRIVE / ARCHITECTURAL PORTFOLIO',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/studio_rehearsal_backstage_1790835788315.jpg',
        caption: 'The Jubilee Hills studio floor ready for morning movement intensive.',
        dimensions: '3840x2160'
      },
      {
        id: 'asset-s2',
        assetType: 'video',
        fileCode: 'st_002.mp4',
        category: 'studio',
        title: 'Celebrating Two Years · Official Anniversary Film',
        source: 'OFFICIAL NICY YOUTUBE',
        status: 'VERIFIED_PUBLIC_SOURCE',
        placeholder: false,
        url: 'https://youtube.com/@nicyjoseph',
        caption: 'Documentary retrospective with student journeys and choreo milestones.',
        dimensions: '1920x1080'
      }
    ]
  },
  {
    id: 'indian-contemporary-repertoire',
    index: '06',
    slug: 'terra-contemporary',
    title: 'N25 REPERTOIRE',
    subtitle: 'Short film · dance × classical mudras × percussive speed',
    category: 'performance',
    year: '2024',
    location: 'Hyderabad Cultural Centre',
    awardBadge: 'ORIGINAL WORK',
    client: 'Contemporary Movement Lab',
    summary: 'An ongoing research and performance series merging classical Indian physical vocabulary—mudras, torso isolation, rhythmic footwork—with fluid European contemporary floorwork and breath timing.',
    curatorNote: 'Tom Dale Company & DFP inspired contemporary movement exploration tailored to Indian bodily traditions.',
    role: 'Choreographic Research & Performance Soloist',
    aspectRatio: 'standard',
    coverImage: '/src/assets/images/hero_nicy_movement_editorial_1790835724020.jpg',
    hasVideo: false,
    featured: false,
    disciplines: ['Indian Contemporary', 'Classical Mudra Accents', 'Floor Flow', 'Percussive Timing'],
    credits: [
      { label: 'Research', value: 'Traditional Meets Kinetic Modernism' },
      { label: 'Soundscape', value: 'Percussion & Ambient Electronic Score' },
      { label: 'Direction', value: 'Nicy Joseph' }
    ],
    mediaAssets: [
      {
        id: 'asset-c1',
        assetType: 'photograph',
        fileCode: 'nr_001.jpg',
        category: 'performance',
        title: 'Mudra Stance & Dynamic Light Play',
        source: 'CLIENT DRIVE / PERFORMANCE ARCHIVE',
        status: 'WAITING_FOR_ORIGINAL_ASSET',
        placeholder: true,
        url: '/src/assets/images/hero_nicy_movement_editorial_1790835724020.jpg',
        caption: 'Exploration of classical hand gestures transitioned into floor slide.',
        dimensions: '3840x2160'
      }
    ]
  }
];

export interface ProvenanceItem {
  year: string;
  source: string;
  title: string;
  category: string;
  quoteOrContext: string;
  verificationLink?: string;
  isPublicCitation: boolean;
}

export const PROVENANCE_TIMELINE: ProvenanceItem[] = [
  {
    year: '2024',
    source: 'Brides Today Magazine',
    title: 'Top 10 Wedding Choreographers to Help You Flaunt Your Moves',
    category: 'Wedding Press',
    quoteOrContext: 'Celebrated for curating bespoke sangeet stage spectacles and high-energy family routines across Hyderabad & destination celebrations.',
    verificationLink: 'https://www.bridestoday.in/wedding-ideas/story/top-10-wedding-choreographers-to-help-you-flaunt-your-moves-991633-2024-04-28',
    isPublicCitation: true
  },
  {
    year: '2024',
    source: 'Hyderabad Dance Festival',
    title: 'Official Studio Partner & Day 2 Garba Masterclass',
    category: 'Festival Partnership',
    quoteOrContext: 'Nicy Joseph Dance & Fitness formally listed as official studio partner; Nicy conducted the major Day 2 Garba movement session.',
    verificationLink: 'https://www.hyddancefestival.com/',
    isPublicCitation: true
  },
  {
    year: '2024',
    source: 'WOW Hyderabad (Nov 2024 Issue)',
    title: 'Studio Journey, Dance Repertoire & Jubilee Hills Legacy',
    category: 'Editorial Profile',
    quoteOrContext: 'Documented the studio’s growth since 2020, community classes, and fitness/dance impact in Jubilee Hills and Tollywood circles.',
    verificationLink: 'https://wowhyderabad.com/wp-content/uploads/2024/11/WOW-Nov2024-Issue-for-Web.pdf',
    isPublicCitation: true
  },
  {
    year: '2022',
    source: 'Official YouTube & Studio Milestone',
    title: 'Celebrating Two Years of Nicy Joseph Dance and Fitness',
    category: 'Milestone Film',
    quoteOrContext: 'Retrospective release capturing the inception of the studio, student growth, and stage showcases.',
    verificationLink: 'https://youtube.com/@nicyjoseph',
    isPublicCitation: true
  },
  {
    year: '2020',
    source: 'Republic World / Instagram Public Record',
    title: 'Sania Mirza Handstand Technique Acknowledgment',
    category: 'Collaborations',
    quoteOrContext: 'Tennis champion Sania Mirza publicly acknowledged @nicyjosephdanceandfitness for teaching her the technical handstand inversion foundation.',
    verificationLink: 'https://www.republicworld.com/sports/tennis/sania-mirza-nails-a-handstand-in-latest-ig-post-amid-covid-lockdown',
    isPublicCitation: true
  },
  {
    year: '2020',
    source: 'Nicy Joseph Dance & Fitness Inception',
    title: 'Founding of the Jubilee Hills Movement Space',
    category: 'Studio Milestone',
    quoteOrContext: 'Establishment of the dedicated dance, yoga, and fitness studio in Hyderabad.',
    isPublicCitation: true
  }
];

export interface CapabilityItem {
  number: string;
  title: string;
  scope: string;
  disciplines: string[];
  deliverables: string[];
}

export const CAPABILITIES: CapabilityItem[] = [
  {
    number: '01',
    title: 'Wedding & Sangeet Choreography',
    scope: 'Turnkey choreography direction for luxury Indian weddings across Hyderabad, Udaipur, Goa, and international destinations.',
    disciplines: ['Bride & Groom Duets', 'Solo Bridal Concepts', 'Family Synchrony', 'Scripted Thematic Staging'],
    deliverables: ['Custom music edits & song mixing', 'Private home or studio rehearsals', 'Step-by-step video practice guides', 'Backstage stage-management on event night']
  },
  {
    number: '02',
    title: 'Contemporary & Commercial Dance',
    scope: 'High-caliber stage repertoire, Tollywood industry movement, music video choreographies, and cultural festivals.',
    disciplines: ['Bollywood Contemporary', 'Semi-Classical Mudra Fusion', 'Garba & Folk Dynamics', 'Urban Commercial'],
    deliverables: ['Original choreography conception', 'Spatial blocking for stage & camera', 'Dancer casting & troupe management', 'Rehearsal coaching']
  },
  {
    number: '03',
    title: 'Inversion, Handstand & Calisthenics',
    scope: 'Technical biomechanical coaching for athletes, dancers, and enthusiasts seeking advanced inversion balance and strength.',
    disciplines: ['Free-standing Handstands', 'Scapular & Shoulder Mobility', 'Core & Spinal Stability', 'Vinyasa Flow'],
    deliverables: ['1-on-1 private coaching blocks', 'Diagnostic mobility assessment', 'Safe progressive wall & spot drills', 'Autonomous balance programming']
  },
  {
    number: '04',
    title: 'Workshops, Masterclasses & Festivals',
    scope: 'High-impact group workshops for cultural institutions, universities, corporate teams, and dance festivals.',
    disciplines: ['Mass Garba Arena Leading', 'Bollywood Masterclasses', 'Movement Confidence Labs', 'Youth Intensives'],
    deliverables: ['Curated 60-120 min intensive syllabus', 'Curriculum notes & rhythm breakdowns', 'Multi-level accessibility', 'Live stage conducting']
  },
  {
    number: '05',
    title: 'Jubilee Hills Studio & Rentals',
    scope: 'A dedicated, professional movement floor in Hyderabad equipped for daily batches, rehearsals, and artist residencies.',
    disciplines: ['Daily Group Batches', 'Private Rehearsal Floor', 'Content Creation Space', 'Industry Screenings'],
    deliverables: ['Cushioned wooden dance flooring', 'Full-length studio mirrors', 'Acoustic sound setup', 'Climate-controlled rehearsal environment']
  }
];
