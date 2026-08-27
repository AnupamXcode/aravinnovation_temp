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
    category: "AI-Powered Astrology & Spiritual Guidance Platform",
    status: "live",
    badge: "Live",
    badgeColor: "#2e936f",
    tagline: "AI-Powered Astrology & Spiritual Guidance Platform",
    description:
      "An AI-powered astrology and spiritual guidance platform that combines personalized cosmic insights, interactive AI consultations, astrology tools, and downloadable reports.",
    positioning:
      "An AI spiritual advisor marketplace where users can receive personalized astrology, numerology, palmistry, and spiritual guidance through conversational AI and digital reports.",
    ctaText: "Explore AstroBeams →",
    ctaUrl: "https://astrobeams.in/",
    ctaEnabled: true,
    externalUrl: "https://astrobeams.in/",
    iconName: "Sparkles",
    features: [
      "Vedic Astrology",
      "Western Astrology",
      "Love & Relationship Guidance",
      "Compatibility & Matchmaking",
      "Career Guidance",
      "Spiritual Guidance",
      "Palmistry & Numerology",
      "Oracle Readings",
      "Personalized Astrology Reports",
    ],
    reports: [
      "Mini / Basic / Professional Horoscope",
      "Gemstone Report",
      "Match-making Horoscope",
      "Numerology Report",
      "Varshaphal Annual Report",
      "Natal Horoscope",
      "Life Forecast",
      "Solar Return",
      "Synastry Report",
    ],
    useCase: "Consumers seeking personalized astrology, numerology, palmistry, and spiritual guidance via AI and digital reports",
    pricingModel: "live-platform",
    pricingNote: "Users can start with free questions and continue through a credit-based consultation experience.",
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
        description: "Create an account and receive 3 free questions to test the platform.",
      },
      {
        step: 2,
        title: "Choose an AI Guide & Ask Questions",
        description: "Select your preferred AI spiritual advisor for instant chat and consultations.",
      },
      {
        step: 3,
        title: "Download Reports & Use Credits",
        description: "Access birth chart reports and continue using credit-based consultations.",
      },
    ],
    featureDetails: [
      {
        title: "Vedic & Western Astrology",
        description: "Comprehensive planetary analysis, Kundli generation, and zodiac insights.",
        iconName: "Sparkles",
      },
      {
        title: "Interactive AI Consultations",
        description: "Conversational AI guidance for career, relationships, and life timing.",
        iconName: "Sparkles",
      },
      {
        title: "Palmistry & Numerology",
        description: "Digital palmistry scanning and personalized numerological vibration charts.",
        iconName: "Sparkles",
      },
      {
        title: "Downloadable Reports",
        description: "Generate Varshaphal, Solar Return, Synastry, and Gemstone reports instantly.",
        iconName: "Sparkles",
      },
    ],
    proofPoint: {
      metric: "24/7",
      label: "Instant AI Consultation Availability",
      detail: "Freemium credit-based spiritual advisor platform delivering sub-second cosmic insights.",
    },
    faqs: [
      {
        question: "How do I start using AstroBeams?",
        answer: "Visit astrobeams.in, sign up to receive 3 free questions, choose an AI spiritual advisor, and start your consultation.",
      },
      {
        question: "What types of reports can I download on AstroBeams?",
        answer: "AstroBeams offers Mini/Basic/Professional Horoscopes, Gemstone Reports, Match-making, Numerology, Varshaphal Annual Reports, Natal Horoscopes, and Synastry Reports.",
      },
    ],
  },
  {
    slug: "omnigrc",
    name: "OMNiGRC",
    category: "Governance, Risk & Compliance",
    status: "in-development",
    badge: "In Development",
    badgeColor: "#fab60a",
    tagline: "SaaS Platform for Governance, Risk & Compliance",
    description:
      "A comprehensive SaaS solution designed to streamline governance, risk management, and compliance processes for enterprises. Simplify audits, reduce risk exposure, and ensure regulatory adherence.",
    ctaText: "Coming Soon",
    ctaUrl: "",
    ctaEnabled: false,
    iconName: "ShieldCheck",
    features: [
      "Centralized governance dashboard",
      "Real-time risk monitoring and alerts",
      "Automated compliance tracking",
      "Audit trail and reporting",
    ],
    useCase: "Enterprises and mid-market companies managing complex compliance requirements",
    pricingModel: "waitlist",
    pricingNote: "Early access waitlist open for enterprise beta partners.",
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
      metric: "Beta",
      label: "Early Access Program Active",
      detail: "Engineered to cut enterprise compliance audit preparation time by up to 70%.",
    },
    faqs: [
      {
        question: "When will OMNiGRC be available for public launch?",
        answer: "OMNiGRC is currently in active development. Join the waitlist to receive priority beta access.",
      },
      {
        question: "What frameworks will OMNiGRC support at launch?",
        answer: "OMNiGRC will launch with built-in modules for DPDP (India), SOC-2 Type II, ISO 27001, and GDPR.",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return productsData.map((p) => p.slug);
}

