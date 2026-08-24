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
  status: "live" | "in-development";
  badge: string;
  badgeColor: string; // #2e936f for Live, #fab60a for In Development
  ctaText: string;
  ctaUrl?: string;
  ctaEnabled: boolean;
  externalUrl?: string;
  iconName: string;
  features: string[];
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
    category: "Astrology & Life Guidance",
    status: "live",
    badge: "Live",
    badgeColor: "#2e936f",
    tagline: "Expert Astrologers Online for Predictions & Guidance",
    description:
      "Connect with certified astrologers for accurate predictions on love, career, marriage, and life guidance. Chat or call for instant consultations.",
    ctaText: "Explore AstroBeams →",
    ctaUrl: "https://astrobeams.in/",
    ctaEnabled: true,
    externalUrl: "https://astrobeams.in/",
    iconName: "Sparkles",
    features: [
      "Expert astrologers available 24/7",
      "Live chat and call consultations",
      "Accurate predictions and remedies",
      "Personalized kundli and birth chart analysis",
    ],
    useCase: "Individuals seeking astrological guidance and life predictions",
    pricingModel: "live-platform",
    pricingNote: "Instant pay-per-minute consultations & personalized birth reports.",
    targetAudience: [
      "Individuals seeking astrological guidance and life predictions",
      "Users requiring instant 24/7 phone or live chat astrologer access",
      "People looking for accurate Kundli, Horoscope & birth chart analysis",
      "Couples evaluating marriage and relationship compatibility remedies",
    ],
    problemSolved: {
      title: "Instant Access to Verified Astrological Guidance",
      points: [
        "Finding certified, authentic astrologers with immediate 24/7 availability.",
        "Lack of confidential, transparent platforms for personal phone and chat guidance.",
        "Complex birth chart data without actionable remedies or practical advice.",
      ],
    },
    howItWorks: [
      {
        step: 1,
        title: "Select Certified Astrologer",
        description: "Browse verified astrologer profiles, user ratings, and specialties.",
      },
      {
        step: 2,
        title: "Instant Chat or Call",
        description: "Initiate immediate 1-on-1 private phone call or chat session.",
      },
      {
        step: 3,
        title: "Personalized Insights",
        description: "Receive birth chart analysis, accurate predictions, and effective remedies.",
      },
    ],
    featureDetails: [
      {
        title: "24/7 Live Consultations",
        description: "Connect instantly with top astrologers via secure audio call or chat.",
        iconName: "Sparkles",
      },
      {
        title: "Kundli & Birth Chart",
        description: "Comprehensive Vedic astrology Kundli generation and planetary analysis.",
        iconName: "Sparkles",
      },
      {
        title: "Love & Marriage Guidance",
        description: "Detailed Guna Milan matching and relationship compatibility reports.",
        iconName: "Sparkles",
      },
      {
        title: "Career & Financial Remedies",
        description: "Targeted solutions for professional growth, timing, and wealth alignment.",
        iconName: "Sparkles",
      },
    ],
    proofPoint: {
      metric: "24/7",
      label: "Instant Consultation Availability",
      detail: "Thousands of satisfied users connecting daily for personalized life predictions.",
    },
    faqs: [
      {
        question: "How do I consult an astrologer on AstroBeams?",
        answer: "Visit astrobeams.in, choose a verified astrologer, and start an instant chat or phone call.",
      },
      {
        question: "Are the astrologers on AstroBeams verified?",
        answer: "Yes, all astrologers undergo rigorous background checks and Vedic astrology knowledge assessments.",
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

