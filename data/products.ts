export interface ProductFeature {
  title: string;
  description: string;
  iconName?: string;
}

export interface ProductUseCase {
  title: string;
  description: string;
  targetRole?: string;
}

export interface ProductHowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface ProductProofPoint {
  metric: string;
  label: string;
  detail: string;
}

export interface Product {
  slug: string;
  name: string;
  domain?: string;
  category: string;
  tagline: string;
  description: string;
  positioning?: string;
  status: "live" | "in-development";
  badge: string;
  badgeColor: string; // #2e936f for Live, #fab60a for In Development
  ctaText: string;
  ctaUrl?: string;
  ctaEnabled: boolean;
  externalUrl?: string;
  iconName: string;
  iconUrl?: string;
  imageUrl?: string;
  features: string[];
  reports?: string[];
  useCase: string;
  pricingModel: "demo-only" | "starting-from" | "custom-quote" | "live-platform" | "waitlist";
  pricingStartingAt?: string;
  pricingNote?: string;
  targetAudience: string[];
  problemSolved: {
    title: string;
    points: string[];
  };
  howItWorks: ProductHowItWorksStep[];
  featureDetails?: ProductFeature[];
  proofPoint?: ProductProofPoint;
  faqs?: {
    question: string;
    answer: string;
  }[];
  relatedServiceSlug?: string;
}

export const productsData: Product[] = [
  {
    slug: "astrobeams",
    name: "AstroBeams",
    domain: "astrobeams.store",
    category: "Live Astrologer Consultation & Guidance Platform",
    status: "live",
    badge: "Live Platform",
    badgeColor: "#2e936f",
    tagline: "Talk to Expert Astrologers Online for Free Predictions & Life Guidance",
    description:
      "Experience accurate astrology services with AstroBeams. Chat or call certified expert astrologers for love, career, marriage, and life guidance. Available 24/7 for chat and voice consultations.",
    positioning:
      "A next-generation astrology & life guidance platform offering live chat, voice call consultations, birth chart/Kundli analysis, and personalized remedies.",
    ctaText: "Visit AstroBeams.store →",
    ctaUrl: "https://astrobeams.store",
    ctaEnabled: true,
    externalUrl: "https://astrobeams.store",
    iconName: "Orbit",
    iconUrl: "/images/astrobeams-icon.png",
    imageUrl: "/images/astrobeams-main.png",
    features: [
      "Certified expert astrologers available 24/7",
      "Live chat and voice call consultations",
      "Accurate predictions and personalized remedies",
      "Kundli analysis and birth chart readings",
      "Love, career, and life guidance",
      "Free initial consultation available",
    ],
    useCase: "Individuals seeking astrological guidance, life predictions, and personal development.",
    pricingModel: "live-platform",
    pricingNote: "Freemium initial consultation with transparent pay-per-minute advisory models.",
    targetAudience: [
      "Individuals seeking astrological guidance and life predictions",
      "Users requiring instant 24/7 certified astrologer consultations",
      "People looking for accurate Kundli, Horoscope & birth chart analysis",
      "Couples evaluating marriage and relationship compatibility remedies",
    ],
    problemSolved: {
      title: "Instant Access to Certified Astrologers & Kundli Predictions",
      points: [
        "Instant 24/7 access to expert astrologers via chat and call.",
        "Accurate, confidential guidance for love, career, marriage, and life decisions.",
        "Instant Kundli analysis, matching, and remedial solutions.",
      ],
    },
    howItWorks: [
      {
        step: 1,
        title: "Sign up & Claim Free Consultation",
        description: "Create an account to access initial free credits and choose from certified astrologers.",
      },
      {
        step: 2,
        title: "Enter Birth Details & Choose Advisor",
        description: "Provide birth date, time, and location to generate planetary charts and Kundli.",
      },
      {
        step: 3,
        title: "Live Chat or Call Consultation",
        description: "Connect instantly for real-time predictions, career advice, and remedies.",
      },
    ],
    featureDetails: [
      {
        title: "Vedic & Western Astrology",
        description: "Comprehensive planetary analysis, Kundli generation, and zodiac insights.",
        iconName: "Orbit",
      },
      {
        title: "Live Chat & Call Advisory",
        description: "Real-time 24/7 consultations with verified astrologers for love, career, and life.",
        iconName: "Orbit",
      },
      {
        title: "Kundli & Birth Chart Analysis",
        description: "Detailed birth chart mapping, synastry matchmaking, and gemstone recommendations.",
        iconName: "Orbit",
      },
    ],
    proofPoint: {
      metric: "24/7",
      label: "Live Consultation Availability",
      detail: "Certified expert astrologers ready for instant phone & chat consultations.",
    },
    faqs: [
      {
        question: "How do I consult an astrologer on AstroBeams?",
        answer: "Visit astrobeams.store, sign up to receive your free initial consultation, select an astrologer, and start live chat or call instantly.",
      },
      {
        question: "What services are available on AstroBeams?",
        answer: "AstroBeams provides Kundli matching, horoscopes, gemstone recommendations, career advice, relationship guidance, and annual predictions.",
      },
    ],
  },
  {
    slug: "astrobeams-ai",
    name: "AstroBeams AI",
    domain: "astrobeams.in",
    category: "AI-Powered Astrology & Spiritual Guidance Platform",
    status: "live",
    badge: "Live",
    badgeColor: "#2e936f",
    tagline: "Personalized AI Cosmic Guidance & Life Reports",
    description:
      "AstroBeams AI is an AI-powered astrology and spiritual guidance platform that provides personalized cosmic guidance through AI-powered consultations, astrology readings, spiritual tools, compatibility analysis, and personalized life reports.",
    positioning:
      "An AI spiritual advisor marketplace where users can receive personalized astrology, numerology, palmistry, and spiritual guidance through conversational AI and digital reports.",
    ctaText: "Visit AstroBeams.in →",
    ctaUrl: "https://astrobeams.in",
    ctaEnabled: true,
    externalUrl: "https://astrobeams.in",
    iconName: "Orbit",
    iconUrl: "/images/astrobeams-icon.png",
    imageUrl: "/images/astrobeams-main.png",
    features: [
      "AI-Powered Vedic Astrology",
      "Western/Tropical Astrology",
      "Career & Professional Guidance",
      "Love & Relationship Insights",
      "PDF Reports",
      "Astrology Shop",
    ],
    reports: [
      "Professional Horoscope / Kundli reports",
      "Natal Horoscope reports",
      "Synastry / relationship reports",
      "Life forecasts and transit-based insights",
      "Gemstone & Remedial Reports",
      "Varshaphal Annual Reports",
    ],
    useCase: "Consumers seeking personalized astrology, numerology, palmistry, and spiritual guidance via AI and digital reports",
    pricingModel: "live-platform",
    pricingNote: "Users can start with free questions and continue through a credit-based consultation experience with transparent per-minute billing.",
    targetAudience: [
      "Individuals seeking astrological guidance and life predictions",
      "Users requiring instant 24/7 AI spiritual consultations",
      "People looking for accurate Kundli, Horoscope & birth chart analysis",
      "Couples evaluating marriage and relationship compatibility remedies",
    ],
    problemSolved: {
      title: "Instant Access to AI Spiritual Guidance & Digital Reports",
      points: [
        "Instant 24/7 access to AI-powered Vedic & Western astrology guidance without wait times.",
        "Lack of interactive, confidential platforms for personal guidance and relationship matchmaking.",
        "Generating downloadable, comprehensive birth chart reports and gemstone remedies in seconds.",
      ],
    },
    howItWorks: [
      {
        step: 1,
        title: "Sign up & Claim Free Questions",
        description: "Create an account to receive starter credits and consult with AI spiritual guides.",
      },
      {
        step: 2,
        title: "Enter Birth Details & Choose AI Guide",
        description: "Provide birth date, time, and location to calculate exact planetary positions and Kundli.",
      },
      {
        step: 3,
        title: "Receive Readings & Download Reports",
        description: "Engage in live chat predictions or generate downloadable PDF reports.",
      },
    ],
    featureDetails: [
      {
        title: "Vedic & Western Astrology",
        description: "Comprehensive planetary analysis, Kundli generation, and zodiac insights.",
        iconName: "Orbit",
      },
      {
        title: "Interactive AI Consultations",
        description: "Conversational AI guidance for career, relationships, and life timing.",
        iconName: "Orbit",
      },
      {
        title: "PDF Reports & Astrology Shop",
        description: "Downloadable PDF reports and digital spiritual tools.",
        iconName: "Orbit",
      },
    ],
    proofPoint: {
      metric: "24/7",
      label: "Instant AI Consultation Availability",
      detail: "Freemium credit-based spiritual advisor platform delivering fast cosmic insights.",
    },
    faqs: [
      {
        question: "How do I start using AstroBeams AI?",
        answer: "Visit astrobeams.in, sign up to receive initial free questions, choose an AI spiritual advisor, and start your consultation.",
      },
      {
        question: "What types of reports can I download on AstroBeams AI?",
        answer: "AstroBeams AI offers PDF reports including Horoscopes, Gemstone Reports, Match-making, Numerology, Varshaphal Annual Reports, and Synastry Reports.",
      },
    ],
  },
  {
    slug: "fashai-universal",
    name: "FashAI Universal",
    domain: "fashaiuniversal.com",
    category: "INTERNATIONAL LUXURY FASHION & EVENTS PLATFORM",
    status: "live",
    badge: "Live",
    badgeColor: "#2e936f",
    tagline: "International Fashion & Event Production Platform Powered by AI",
    description:
      "FashAI Universal is an international fashion and event production platform powered by Arav Innovation, delivering luxury fashion shows, runway productions, corporate events, brand campaigns, and creative experiences while connecting global fashion talent across the UAE, India, and international markets.",
    positioning:
      "An international fashion and luxury event production ecosystem combining AI-driven creative concepts with physical runway and event execution.",
    ctaText: "Visit FashAIUniversal.com →",
    ctaUrl: "https://www.fashaiuniversal.com/",
    ctaEnabled: true,
    externalUrl: "https://www.fashaiuniversal.com/",
    iconName: "FashAILogo",
    iconUrl: "/images/fashai-logo.png",
    features: [
      "Fashion Shows & Runway Production",
      "Luxury & Lifestyle Events",
      "Corporate Summits & Galas",
      "Brand Shoots & Campaigns",
      "Global Talent Network",
      "AI-Powered Creative Concepts",
    ],
    useCase: "Fashion houses, luxury brands, corporate sponsors, and creative talent seeking global event production and AI creative concepts.",
    pricingModel: "live-platform",
    pricingNote: "Custom production and event management proposals tailored for global fashion and corporate clients.",
    targetAudience: [
      "International luxury fashion brands and designers",
      "Corporate summit and gala organizers in UAE, India & global hubs",
      "Fashion models, creative directors, and campaign producers",
      "Brands looking for AI-powered visual production and campaign concepts",
    ],
    problemSolved: {
      title: "Global Luxury Event Production & AI Creative Concepts",
      points: [
        "Bridging cross-border talent and logistics between UAE, India, and international fashion capitals.",
        "Integrating cutting-edge AI creative concepts into physical runway shows and brand campaigns.",
        "End-to-end execution of high-end corporate summits, galas, and luxury lifestyle experiences.",
      ],
    },
    howItWorks: [
      {
        step: 1,
        title: "Concept & AI Creative Direction",
        description: "Develop tailored campaign themes, AI visual storyboards, and event architecture.",
      },
      {
        step: 2,
        title: "Talent & Production Curation",
        description: "Source international models, designers, technical crews, and venue logistics.",
      },
      {
        step: 3,
        title: "Live Runway & Media Execution",
        description: "Deliver world-class fashion shows, live broadcasts, and multi-channel brand media.",
      },
    ],
    featureDetails: [
      {
        title: "Runway & Event Production",
        description: "Full-scale staging, lighting, choreographies, and VIP hospitality management.",
        iconName: "Sparkles",
      },
      {
        title: "Global Talent Network",
        description: "Direct access to top models, stylists, photographers, and creative directors.",
        iconName: "Sparkles",
      },
      {
        title: "AI-Powered Creative Concepts",
        description: "Hyper-realistic virtual staging, moodboards, and generative brand visuals.",
        iconName: "Sparkles",
      },
    ],
    proofPoint: {
      metric: "Global",
      label: "International Event Production Footprint",
      detail: "Connecting high-fashion production across UAE, India, and global markets.",
    },
    faqs: [
      {
        question: "What is FashAI Universal?",
        answer: "FashAI Universal is an international fashion and event production platform powered by Arav Innovation, delivering runway shows, luxury galas, and AI-assisted creative campaigns.",
      },
      {
        question: "How can brands partner with FashAI Universal?",
        answer: "Visit fashaiuniversal.com to explore upcoming shows, request event production proposals, or connect with our talent network.",
      },
    ],
  },
  {
    slug: "getastrav",
    name: "GetAstrav",
    domain: "getastrav.com",
    category: "EXECUTIVE COMMAND & ENTERPRISE AI PLATFORM",
    status: "live",
    badge: "Live Platform",
    badgeColor: "#2e936f",
    tagline: "The Goal-Driven Organization Operating System Powered by Enterprise AI",
    description:
      "GetAstrav is an executive command and organization operating system engineered with automated mathematical progress rollups, AI goal decomposition, and enterprise RBAC.",
    positioning:
      "A next-generation enterprise operating system empowering leadership with real-time goal decomposition, automated progress telemetry, and intelligent workflow automation.",
    ctaText: "Visit GetAstrav.com →",
    ctaUrl: "https://www.getastrav.com/",
    ctaEnabled: true,
    externalUrl: "https://www.getastrav.com/",
    iconName: "GetAstravLogo",
    features: [
      "AI Goal Decomposition & Rollups",
      "Executive Command Dashboards",
      "Automated Progress Telemetry",
      "Enterprise RBAC Governance",
      "Cross-Functional Alignment",
      "Custom Platform Integrations",
    ],
    useCase: "Enterprises and executive leaders seeking goal-driven organization operating systems and AI workflow orchestration.",
    pricingModel: "live-platform",
    pricingNote: "Enterprise licensing and dedicated deployment architectures.",
    targetAudience: [
      "Enterprise technology leaders & CIOs",
      "Executive leadership teams & founders",
      "Organizations driving automated goal decomposition",
      "Digital transformation teams requiring scalable cloud architecture",
    ],
    problemSolved: {
      title: "Eliminating Blindspots with Goal-Driven Enterprise Intelligence",
      points: [
        "Unifying fragmented enterprise workflows through intelligent AI orchestration.",
        "Providing automated mathematical progress rollups across organizational tiers.",
        "Enabling data-driven business decisions with real-time smart analytics and RBAC.",
      ],
    },
    howItWorks: [
      {
        step: 1,
        title: "Define Strategic Goals",
        description: "Set top-level executive objectives with mathematical success criteria.",
      },
      {
        step: 2,
        title: "AI Decomposition & Rollups",
        description: "GetAstrav breaks goals into sub-milestones with automated progress rollups.",
      },
      {
        step: 3,
        title: "Enterprise Execution",
        description: "Seamless team alignment with real-time telemetry and enterprise RBAC.",
      },
    ],
    featureDetails: [
      {
        title: "AI Goal Decomposition",
        description: "Intelligent breakdown of high-level objectives into actionable execution trees.",
        iconName: "Sparkles",
      },
      {
        title: "Executive Telemetry",
        description: "Real-time mathematical progress metrics and predictive organizational health.",
        iconName: "Sparkles",
      },
    ],
    proofPoint: {
      metric: "Live",
      label: "Platform Active",
      detail: "Executive command operating system empowering forward-looking enterprise teams.",
    },
    faqs: [
      {
        question: "What is GetAstrav?",
        answer: "GetAstrav is an executive command operating system designed to automate goal decomposition, mathematical progress rollups, and cross-functional enterprise workflows.",
      },
      {
        question: "How can my enterprise access GetAstrav?",
        answer: "Visit www.getastrav.com to explore platform capabilities and get started.",
      },
    ],
  },
  {
    slug: "omnigrc",
    name: "OMNiGRC",
    domain: "app.omnigrc.co",
    category: "Governance, Risk & Compliance",
    status: "live",
    badge: "Live Platform",
    badgeColor: "#2e936f",
    tagline: "SaaS Platform for Governance, Risk & Compliance",
    description:
      "A comprehensive SaaS solution designed to streamline governance, risk management, and compliance processes for enterprises. Simplify audits, reduce risk exposure, and ensure regulatory adherence.",
    positioning:
      "A unified enterprise SaaS platform for continuous governance, automated compliance audits, and real-time risk monitoring.",
    ctaText: "Visit OMNiGRC →",
    ctaUrl: "https://app.omnigrc.co/",
    ctaEnabled: true,
    externalUrl: "https://app.omnigrc.co/",
    iconName: "ShieldCheck",
    iconUrl: "/images/omni-grc-logo.png",
    imageUrl: "/images/omni-grc-logo.png",
    features: [
      "Centralized governance dashboard",
      "Real-time risk monitoring and alerts",
      "Automated compliance tracking",
      "Audit trail and reporting",
    ],
    useCase: "Enterprises and mid-market companies managing complex compliance requirements",
    pricingModel: "live-platform",
    pricingNote: "Enterprise platform access available for CISOs, audit, risk, and compliance teams.",
    targetAudience: [
      "Enterprises and mid-market companies managing complex compliance requirements",
      "Chief Information Security Officers (CISOs) & Compliance Directors",
      "Internal Audit, Risk & Legal Teams",
      "Organizations streamlining DPDP, SOC-2, ISO 27001 & GDPR audit readiness",
    ],
    problemSolved: {
      title: "Streamlining Complex Enterprise Risk & Compliance",
      points: [
        "Manual compliance tracking across fragmented spreadsheets and static documents.",
        "Lack of real-time visibility into continuous regulatory and infrastructure risks.",
        "Resource-intensive audit cycles requiring weeks of manual evidence collection.",
      ],
    },
    howItWorks: [
      {
        step: 1,
        title: "Centralize Risk Posture",
        description: "Unify compliance frameworks, security controls, and assets in one dashboard.",
      },
      {
        step: 2,
        title: "Automate Monitoring",
        description: "Track policy adherence and receive instant alerts on risk posture changes.",
      },
      {
        step: 3,
        title: "Export Audit Trails",
        description: "Generate automated, audit-ready compliance reports with a single click.",
      },
    ],
    featureDetails: [
      {
        title: "Governance Dashboard",
        description: "Single-pane-of-glass overview of security controls and organizational risk.",
        iconName: "ShieldCheck",
      },
      {
        title: "Risk Monitoring & Alerts",
        description: "Continuous automated scanning and instant risk notification engine.",
        iconName: "ShieldCheck",
      },
      {
        title: "Automated Compliance",
        description: "Pre-mapped controls for DPDP, SOC-2, ISO 27001, and global privacy laws.",
        iconName: "ShieldCheck",
      },
      {
        title: "Audit Trail & Reporting",
        description: "Immutable evidence logs and one-click regulatory export readiness.",
        iconName: "ShieldCheck",
      },
    ],
    proofPoint: {
      metric: "Live",
      label: "Enterprise Platform Active",
      detail: "Engineered to cut enterprise compliance audit preparation time by up to 70%.",
    },
    faqs: [
      {
        question: "How do I access OMNiGRC?",
        answer: "Visit app.omnigrc.co to log in or launch your enterprise governance and compliance portal.",
      },
      {
        question: "What frameworks does OMNiGRC support?",
        answer: "OMNiGRC supports built-in modules for DPDP (India), SOC-2 Type II, ISO 27001, and GDPR.",
      },
    ],
  },
];

const productAliasMap: Record<string, string> = {
  "astrobeams-ai": "astrobeams-ai",
  "astrobeams.ai": "astrobeams-ai",
  "astrobeams.in": "astrobeams-ai",
  "astrobeams-store": "astrobeams",
  "astrobeams.store": "astrobeams",
};

export function getProductBySlug(slug: string): Product | undefined {
  const normalized = productAliasMap[slug] || slug;
  return productsData.find((p) => p.slug === normalized);
}

export function getAllProductSlugs(): string[] {
  const primarySlugs = productsData.map((p) => p.slug);
  const aliasSlugs = Object.keys(productAliasMap);
  return Array.from(new Set([...primarySlugs, ...aliasSlugs]));
}
