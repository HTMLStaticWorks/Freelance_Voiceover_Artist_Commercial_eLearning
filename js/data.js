/* 
  =========================================
  GLOBAL DATA MODULE (js/data.js)
  =========================================
*/

const VO_DATA = {
  // Voice Demos
  demos: [
    {
      id: 'demo-commercial-1',
      title: 'Automotive Brand Commercial',
      category: 'commercial',
      categoryLabel: 'Commercial',
      duration: '0:30',
      durationSeconds: 30,
      audioPath: 'assets/audio/commercial_automotive.mp3',
      coverImage: 'assets/images/commercial_automotive.png',
      description: 'Energetic, gritty, and deep tone for a modern high-end sports car campaign.',
      accent: 'Mid-Atlantic',
      accentLabel: 'Mid-Atlantic (US)'
    },
    {
      id: 'demo-commercial-2',
      title: 'Premium Luxury Watch',
      category: 'commercial',
      categoryLabel: 'Commercial',
      duration: '0:45',
      durationSeconds: 45,
      audioPath: 'assets/audio/commercial_luxury.mp3',
      coverImage: 'assets/images/commercial_luxury.png',
      description: 'Smooth, warm, and sophisticated voice styling for luxury branding.',
      accent: 'British RP',
      accentLabel: 'British RP'
    },
    {
      id: 'demo-elearning-1',
      title: 'Advanced AI and Robotics Course',
      category: 'elearning',
      categoryLabel: 'eLearning',
      duration: '2:15',
      durationSeconds: 135,
      audioPath: 'assets/audio/elearning_robotics.mp3',
      coverImage: 'assets/images/elearning_robotics.png',
      description: 'Clear, engaging, and professional tone suited for higher education technical lectures.',
      accent: 'North American',
      accentLabel: 'Standard American'
    },
    {
      id: 'demo-elearning-2',
      title: 'Corporate Onboarding Tutorial',
      category: 'elearning',
      categoryLabel: 'eLearning',
      duration: '1:40',
      durationSeconds: 100,
      audioPath: 'assets/audio/elearning_onboarding.mp3',
      coverImage: 'assets/images/elearning_onboarding.png',
      description: 'Friendly, welcoming, and instructional voice for employee compliance training.',
      accent: 'Transatlantic',
      accentLabel: 'Transatlantic'
    },
    {
      id: 'demo-corporate-1',
      title: 'Global Tech Keynote Introduction',
      category: 'corporate',
      categoryLabel: 'Corporate Narration',
      duration: '1:15',
      durationSeconds: 75,
      audioPath: 'assets/audio/corporate_keynote.mp3',
      coverImage: 'assets/images/corporate_keynote.png',
      description: 'Authoritative, inspiring, and direct narrative styling for tech summits.',
      accent: 'North American',
      accentLabel: 'Standard American'
    },
    {
      id: 'demo-ivr-1',
      title: 'FinTech Phone System & IVR',
      category: 'ivr',
      categoryLabel: 'IVR & Telephone',
      duration: '1:05',
      durationSeconds: 65,
      audioPath: 'assets/audio/ivr_fintech.mp3',
      coverImage: 'assets/images/ivr_telecom.png',
      description: 'Polished, reliable, reassuring navigation menus and hold messages.',
      accent: 'Transatlantic',
      accentLabel: 'Transatlantic'
    },
    {
      id: 'demo-explainer-1',
      title: 'SaaS App Explainer Video',
      category: 'explainer',
      categoryLabel: 'Explainer Videos',
      duration: '1:00',
      durationSeconds: 60,
      audioPath: 'assets/audio/explainer_saas.mp3',
      coverImage: 'assets/images/explainer_saas.png',
      description: 'Conversational, energetic, upbeat voice-over explaining digital solutions.',
      accent: 'North American',
      accentLabel: 'Standard American'
    },
    {
      id: 'demo-audiobooks-1',
      title: 'Sci-Fi Novel Narration',
      category: 'audiobooks',
      categoryLabel: 'Audiobooks',
      duration: '3:00',
      durationSeconds: 180,
      audioPath: 'assets/audio/audiobook_scifi.mp3',
      coverImage: 'assets/images/audiobook_scifi.png',
      description: 'Dramatic narration featuring ambient character shifts and atmospheric delivery.',
      accent: 'British RP',
      accentLabel: 'British RP'
    },
    {
      id: 'demo-characters-1',
      title: 'Fantasy RPG Wizard / Rogue',
      category: 'characters',
      categoryLabel: 'Character Voices',
      duration: '1:20',
      durationSeconds: 80,
      audioPath: 'assets/audio/character_fantasy.mp3',
      coverImage: 'assets/images/characters_fantasy.png',
      description: 'Deep gravelly wizard and fast, raspy rogue voice archetypes.',
      accent: 'British Celtic',
      accentLabel: 'British Celtic'
    },
    {
      id: 'demo-promo-1',
      title: 'Network TV Autumn Promo',
      category: 'promos',
      categoryLabel: 'Promo Announcements',
      duration: '0:35',
      durationSeconds: 35,
      audioPath: 'assets/audio/promo_autumn.mp3',
      coverImage: 'assets/images/promo_broadcast.png',
      description: 'Exciting, punchy, and cinematic billboard promo for prime time TV.',
      accent: 'Mid-Atlantic',
      accentLabel: 'Mid-Atlantic (US)'
    }
  ],

  // Services (12 premium cards matching requirement)
  services: [
    {
      title: 'Commercial Voiceovers',
      icon: 'radio',
      desc: 'High-impact vocal delivery tailored for radio, television, and digital social media advertising campaign slots.',
      coverImage: 'assets/images/commercial_production.png'
    },
    {
      title: 'eLearning Narration',
      icon: 'graduation-cap',
      desc: 'Engaging instructional voiceovers for academic lectures, educational apps, and interactive training courses.',
      coverImage: 'assets/images/elearning_art.png'
    },
    {
      title: 'Corporate Training',
      icon: 'briefcase',
      desc: 'Pristine, professional corporate presentation narration, onboarding videos, and compliance tutorials.',
      coverImage: 'assets/images/service_corporate.png'
    },
    {
      title: 'IVR & Telephone Systems',
      icon: 'phone',
      desc: 'Elegant phone directory prompts, automated routing scripts, and studio-grade on-hold branding solutions.',
      coverImage: 'assets/images/service_ivr.png'
    },
    {
      title: 'Explainer Videos',
      icon: 'video',
      desc: 'Friendly, conversational, and energetic styles that simplify complex products or tech apps for users.',
      coverImage: 'assets/images/service_explainer.png'
    },
    {
      title: 'Podcast Intro/Outro',
      icon: 'mic',
      desc: 'Catchy and highly customized voice billboards, station IDs, and segments to define your brand identity.',
      coverImage: 'assets/images/podcast_setup.png'
    },
    {
      title: 'YouTube Narration',
      icon: 'play-circle',
      desc: 'Charismatic, pacing-optimized, and retention-focused narration for educational, narrative, or documentary channels.',
      coverImage: 'assets/images/service_youtube.png'
    },
    {
      title: 'Audiobook Recording',
      icon: 'book-open',
      desc: 'Rich narration with distinctive character voices and pristine sound engineering for full-length fiction & non-fiction.',
      coverImage: 'assets/images/service_audiobook.png'
    },
    {
      title: 'Radio Ads',
      icon: 'music',
      desc: 'Punchy local or national radio spots designed to command attention, cut through noise, and drive conversions.',
      coverImage: 'assets/images/promo_broadcast.png'
    },
    {
      title: 'TV Commercials',
      icon: 'tv',
      desc: 'Cinematic, professionally paced narration designed to integrate beautifully with high-end TV advertising mixes.',
      coverImage: 'assets/images/service_tv.png'
    },
    {
      title: 'Audio Editing',
      icon: 'sliders',
      desc: 'Comprehensive post-production: breath removal, de-clicking, equalizing, and leveling for broadcast-ready standards.',
      coverImage: 'assets/images/service_editing.png'
    },
    {
      title: 'Fast Delivery',
      icon: 'zap',
      desc: '24-hour turnaround on scripts under 1,000 words. Recorded and mastered in a professional double-walled studio.',
      coverImage: 'assets/images/service_fast.png'
    }
  ],

  // Languages & Accents
  languages: [
    {
      language: 'English (US)',
      accent: 'Standard American, Mid-Atlantic, Southern',
      badge: 'Native',
      flag: '🇺🇸',
      sampleId: 'demo-commercial-1',
      description: 'Neutral US accent with crisp articulation and dynamic regional styling.',
      coverImage: 'assets/images/lang_us.png'
    },
    {
      language: 'English (UK)',
      accent: 'Received Pronunciation (RP), London, Scottish',
      badge: 'Fluent',
      flag: '🇬🇧',
      sampleId: 'demo-commercial-2',
      description: 'Sophisticated, classic British RP voice styling with precise acoustic projection.',
      coverImage: 'assets/images/lang_uk.png'
    },
    {
      language: 'Transatlantic',
      accent: 'Classic Hollywood, Neutral International Accent',
      badge: 'Fluent',
      flag: '🌐',
      sampleId: 'demo-elearning-2',
      description: 'An elegant blend of US and UK phonetics suitable for global corporate networks.',
      coverImage: 'assets/images/lang_transatlantic.png'
    }
  ],

  // Pricing Packages
  pricing: [
    {
      title: 'Commercial Package',
      price: '$250',
      period: 'per Spot',
      popular: false,
      desc: 'Ideal for local/regional radio & web advertisements.',
      features: [
        'Up to 60 seconds of recording',
        '2 revision rounds included',
        'Broadcast quality WAV/MP3 files',
        '1-Year Web & Local Broadcast rights',
        'Fully cleaned and mastered track',
        '24-Hour delivery'
      ]
    },
    {
      title: 'eLearning & Training',
      price: '$350',
      period: 'per 1k Words',
      popular: true,
      desc: 'Best for educational modules, corporate courses & tutorials.',
      features: [
        'Up to 1,000 words of narration',
        'Unlimited revisions for pronunciation errors',
        'Individually split audio files (up to 10 files)',
        'Full instructional learning rights',
        'Breath and background noise removal',
        '48-Hour delivery'
      ]
    },
    {
      title: 'Corporate Narration',
      price: '$450',
      period: 'per Project',
      popular: false,
      desc: 'Tailored for brand manifestos, tech videos & keynotes.',
      features: [
        'Up to 5 minutes of narration',
        '2 revision rounds included',
        'Full business/internal usage rights',
        'Source-Connect live session option',
        'Perfect EQ & leveling for video',
        '48-Hour delivery'
      ]
    },
    {
      title: 'Audiobook Package',
      price: '$180',
      period: 'per Finished Hour',
      popular: false,
      desc: 'Engineered for ACX, Audible, and audiobook publishers.',
      features: [
        'Full character voice scripting',
        'ACX/Audible formatting standards check',
        'Complete proofing for misread words',
        'Separate chapter exports',
        'Retail audio sample (5 min)',
        'Flexible schedule planning'
      ]
    }
  ],

  // Professional Journey Timeline
  timeline: [
    {
      year: '2016',
      title: 'Broadcasting & Theater Foundation',
      desc: 'Began professional training in classical theatrical performance and commercial broadcast production.'
    },
    {
      year: '2018',
      title: 'Studio Launch & Agency Signings',
      desc: 'Constructed an acoustic-treated home studio and signed with premier regional voice representation agencies.'
    },
    {
      year: '2020',
      title: 'Digital eLearning Boom',
      desc: 'Pivoted to high-volume eLearning and software explainer production, voicing modules for over 50 tech startups.'
    },
    {
      year: '2022',
      title: 'Global Brand Campaigns',
      desc: 'Awarded major commercial VO campaigns for automotive brands and global athletic organizations.'
    },
    {
      year: '2024',
      title: 'Premium Dolby Studio Setup',
      desc: 'Upgraded to a custom double-walled acoustic booth, Neumann gear, and real-time remote direction systems (Source-Connect).'
    },
    {
      year: '2026',
      title: 'Elite Voiceover Brand Launch',
      desc: 'Rebranding as Aura Voice, focusing on world-class SaaS, AI narration, and immersive audiobook productions.'
    }
  ],

  // FAQs
  faqs: [
    {
      q: 'What is your standard turnaround time?',
      a: 'For commercial scripts and small projects under 1,000 words, my standard delivery is 24 hours. For larger eLearning modules and book narrations, we will agree on a custom milestones plan.'
    },
    {
      q: 'Do you offer live remote recording sessions?',
      a: 'Yes! My studio is equipped with Source-Connect Standard, ipDTL, Zoom, and Skype. You can direct the recording session in real-time from anywhere in the world.'
    },
    {
      q: 'What equipment do you use in your recording studio?',
      a: 'My primary microphone is a Neumann U87 Ai and a Sennheiser MKH416. I record using a Universal Audio Apollo Twin interface, premium Mogami cabling, in a double-walled soundproof vocal booth with a -60dB noise floor.'
    },
    {
      q: 'What are commercial and broadcast buyout rights?',
      a: 'Commercial rights cover using the voiceover on non-paid marketing channels (websites, organic social). Broadcast rights cover paid promotional campaigns (Google/Facebook Ads, TV, Radio). Pricing packages state the included rights, and custom quotes can expand coverage.'
    },
    {
      q: 'What is your revision policy?',
      a: 'Every script booking includes revision rounds. If I make a pronunciation mistake or omit a word, it will be corrected for free. Script rewrites or changes after recording starts will incur a reasonable copy re-record fee.'
    }
  ],

  // Testimonials
  testimonials: [
    {
      quote: "Aura brought our SaaS promotional script to life with incredible energy and clarity. Absolute professional, fast turnaround, and standard-setting audio quality.",
      author: "Sarah Jenkins",
      role: "VP of Marketing, CloudScale Inc.",
      rating: 5
    },
    {
      quote: "We recorded 15 chapters of technical training courses with Aura. The articulation was flawless, the audio was clean and pre-split, saving us dozens of editing hours.",
      author: "Dr. Marcus Vance",
      role: "Director of eLearning, EduTech Global",
      rating: 5
    },
    {
      quote: "Directing Aura remotely via Source-Connect was a breeze. They take direction instantly, offering subtle micro-adjustments in tone and pacing that made our TV commercial shine.",
      author: "Elena Rostova",
      role: "Creative Director, Nexus Agency",
      rating: 5
    },
    {
      quote: "Aura's voiceover for our telephone routing system completely changed how our callers interact. The tone is warm, inviting, and professional. Outstanding job!",
      author: "David Miller",
      role: "Head of Operations, Apex Financial Group",
      rating: 5
    }
  ]
};
