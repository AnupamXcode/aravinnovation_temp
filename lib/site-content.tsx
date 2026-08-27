"use client";

import * as React from "react";
import { servicesData as initialServices, Service } from "@/data/services";
import { industriesData as initialIndustries, IndustrySolution } from "@/data/industries";
import { caseStudiesData as initialCaseStudies, CaseStudy } from "@/data/case-studies";

export type { Service } from "@/data/services";
export type { IndustrySolution } from "@/data/industries";
export type { CaseStudy } from "@/data/case-studies";


export interface HeroContent {
  eyebrow: string;
  problemSolved?: string;
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
}

export interface ProcessStepItem {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating?: number;
  designation?: string;
  service?: string;
}

export interface FooterContent {
  mainHeading: string;
  description: string;
  indiaCountry: string;
  indiaPhone: string;
  indiaAddress: string;
  indiaDisplayLabel: string;
  indiaVisible: boolean;
  uaeCountry: string;
  uaeCompanyName: string;
  uaePhone: string;
  uaeAddress: string;
  uaeDisplayLabel: string;
  uaeVisible: boolean;
  supportEmail: string;
  secondaryEmail: string;
  whatsappNumber: string;
  whatsappUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  bookCallUrl: string;
  contactUsUrl: string;
  copyrightText: string;
}

export interface SocialLinkItem {
  id: string;
  name: string;
  icon: string;
  url: string;
  enabled: boolean;
  openNewTab: boolean;
  order: number;
  customLabel?: string;
}

export interface LanguageItem {
  code: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  enabled: boolean;
  order: number;
}

export interface ChatbotCTAButton {
  label: string;
  type: "text" | "page" | "contact" | "whatsapp" | "email" | "project_form";
  value?: string;
}

export interface ChatbotCommandItem {
  id: string;
  keyword: string;
  alternativeKeywords: string[];
  userIntent: string;
  response: string;
  followUpResponse?: string;
  relatedService?: string;
  relatedPage?: string;
  ctaButtons: ChatbotCTAButton[];
  priority: number;
  enabled: boolean;
}

export interface ChatbotKB {
  masterEnabled: boolean;
  defaultGreeting: string;
  fallbackResponse: string;
  commands: ChatbotCommandItem[];
}

export interface SEOContent {
  globalTitle: string;
  metaDescription: string;
  canonicalBase: string;
}

export interface LegalContent {
  privacyPolicyText: string;
  termsText: string;
  refundText: string;
  securityDpdpText: string;
}

export interface SiteContent {
  hero: HeroContent;
  services: Service[];
  industries: IndustrySolution[];
  caseStudies: CaseStudy[];
  processSteps: ProcessStepItem[];
  testimonials: TestimonialItem[];
  footer: FooterContent;
  socialLinks: SocialLinkItem[];
  languages: LanguageItem[];
  chatbotKB: ChatbotKB;
  seo: SEOContent;
  legal: LegalContent;
  translations: Record<string, Record<string, string>>;
}

const defaultHero: HeroContent = {
  eyebrow: "Enterprise Technology • Strategy • Digital Growth",
  title: "Building High-Impact Technology Platforms & Accelerated B2B Growth",
  description:
    "Enterprise IT strategy, full-stack software development, performance digital marketing, and dedicated engineering talent.",
  primaryCtaText: "Schedule Exploratory Call",
  primaryCtaUrl: "/contact",
  secondaryCtaText: "Explore Practices",
  secondaryCtaUrl: "/services",
};

const defaultProcessSteps: ProcessStepItem[] = [
  {
    step: "01",
    title: "Understand & Discover",
    description: "In-depth architecture auditing, stakeholder interviews, and goal alignment.",
    deliverable: "System Audit & Requirements Brief",
  },
  {
    step: "02",
    title: "Strategize & Architect",
    description: "Designing defensible technology roadmaps, data privacy controls, and sprint plans.",
    deliverable: "Technical Blueprint & Roadmap",
  },
  {
    step: "03",
    title: "Implement & Engineer",
    description: "Subsecond Next.js / cloud engineering and high-intent campaign deployment.",
    deliverable: "Production Code & Active Campaigns",
  },
  {
    step: "04",
    title: "Optimize & Secure",
    description: "Core Web Vitals tuning, DPDP Act readiness checks, and conversion funnel testing.",
    deliverable: "Audit Certification & Funnel Benchmark",
  },
  {
    step: "05",
    title: "Deliver Measurable Results",
    description: "Closed-loop attribution reporting, scalable handover, and long-term retainer support.",
    deliverable: "Final Executive Report & Growth Metrics",
  },
];

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "test-1",
    quote:
      "Arav Innovations modernized our core SaaS web platform and reduced latency by 65%. Their engineering pod operates with absolute precision.",
    author: "Vikramaditya Sharma",
    role: "Chief Technology Officer",
    designation: "Chief Technology Officer",
    company: "Nexis Cloud Solutions",
    location: "Gurgaon, India",
    rating: 5,
    service: "Web & App Development",
  },
  {
    id: "test-2",
    quote:
      "Their B2B demand generation team brought structured closed-loop attribution to our campaign. Our pipeline expanded 3.2x in 4 months.",
    author: "Fatima Al-Maktoum",
    role: "Head of Marketing",
    designation: "Head of Marketing",
    company: "Aura Commerce GCC",
    location: "Dubai, UAE",
    rating: 5,
    service: "Digital Marketing",
  },
  {
    id: "test-3",
    quote:
      "Navigating India's DPDP Act readiness was effortless with Arav's compliance team. They audited our data pipelines and secured full readiness.",
    author: "Rajesh K. Mehta",
    role: "VP of Engineering",
    designation: "VP of Engineering",
    company: "Veritas Logistics",
    location: "Mumbai, India",
    rating: 5,
    service: "Risk & Compliance",
  },
];

const defaultSocialLinks: SocialLinkItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "Instagram",
    url: "https://www.instagram.com/aravinnovations",
    enabled: true,
    openNewTab: true,
    order: 1,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "Facebook",
    url: "https://www.facebook.com/people/Arav-Innovations/61566419637071/",
    enabled: true,
    openNewTab: true,
    order: 2,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "Linkedin",
    url: "https://www.linkedin.com/company/aravinnovations/",
    enabled: true,
    openNewTab: true,
    order: 3,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "MessageCircle",
    url: "https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project.",
    enabled: true,
    openNewTab: true,
    order: 4,
  },
  {
    id: "twitter",
    name: "X / Twitter",
    icon: "Twitter",
    url: "https://x.com/AravInnovations",
    enabled: true,
    openNewTab: true,
    order: 5,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "Youtube",
    url: "https://www.youtube.com/@AravInnovations",
    enabled: true,
    openNewTab: true,
    order: 6,
  },
];

const defaultLanguages: LanguageItem[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", enabled: true, order: 1 },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr", enabled: true, order: 2 },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", enabled: true, order: 3 },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr", enabled: true, order: 4 },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr", enabled: true, order: 5 },
];

const defaultChatbotCommands: ChatbotCommandItem[] = [
  {
    id: "cmd-ai",
    keyword: "ai portfolio",
    alternativeKeywords: ["ai", "ai solutions", "ai implementation", "intelligent automation", "ai integration", "llm", "rag", "agents"],
    userIntent: "Inquire about enterprise AI solutions, intelligent automation, and LLM integrations",
    response: "We engineer production-ready AI solutions, intelligent automation workflows, retrieval-augmented generation (RAG) engines, and enterprise AI integrations built for security and ROI.",
    followUpResponse: "Would you like to explore custom AI implementation options or schedule an AI feasibility sprint?",
    relatedService: "ai-portfolio",
    relatedPage: "/services/ai-portfolio",
    ctaButtons: [
      { label: "Explore AI Portfolio", type: "page", value: "/services/ai-portfolio" },
      { label: "Start an AI Project", type: "project_form" },
    ],
    priority: 10,
    enabled: true,
  },
  {
    id: "cmd-it-strategy",
    keyword: "it strategy",
    alternativeKeywords: ["it strategy and implementation", "it consulting", "cloud architecture", "digital transformation", "tech roadmap"],
    userIntent: "Inquire about enterprise IT strategy and technology implementation",
    response: "We formulate defensible multi-year technology roadmaps, cloud modernization blueprints, FinOps governance models, and enterprise architecture upgrades.",
    followUpResponse: "Would you like to schedule an IT strategy scoping session with our principal consultants?",
    relatedService: "it-strategy-implementation",
    relatedPage: "/services/it-strategy-implementation",
    ctaButtons: [
      { label: "Explore IT Strategy", type: "page", value: "/services/it-strategy-implementation" },
      { label: "Book Strategy Call", type: "contact" },
    ],
    priority: 10,
    enabled: true,
  },
  {
    id: "cmd-marketing",
    keyword: "digital marketing",
    alternativeKeywords: ["brand development", "online marketing", "b2b marketing", "demand generation", "leads", "performance marketing"],
    userIntent: "Inquire about B2B digital marketing, brand development, and lead generation",
    response: "Arav Innovations provides high-intent B2B digital marketing, brand development, multi-channel performance campaigns, and closed-loop attribution modeling.",
    followUpResponse: "Would you like to discuss campaign strategies or schedule a demand generation audit with our marketing pod?",
    relatedService: "digital-marketing-brand-development",
    relatedPage: "/services/digital-marketing-brand-development",
    ctaButtons: [
      { label: "Explore Marketing & Branding", type: "page", value: "/services/digital-marketing-brand-development" },
      { label: "Start a Project", type: "project_form" },
      { label: "WhatsApp Us", type: "whatsapp", value: "https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project." },
    ],
    priority: 10,
    enabled: true,
  },
  {
    id: "cmd-web-dev",
    keyword: "web development",
    alternativeKeywords: ["app development", "website", "web app", "software", "nextjs", "react", "app engineering", "saas platform"],
    userIntent: "Inquire about full-stack web and SaaS application engineering",
    response: "We engineer subsecond Next.js web platforms, enterprise SaaS portals, microservices architectures, and cross-platform mobile applications.",
    followUpResponse: "Are you building a new platform from scratch or modernizing an existing legacy infrastructure?",
    relatedService: "web-application-development",
    relatedPage: "/services/web-application-development",
    ctaButtons: [
      { label: "Explore Web & App Dev", type: "page", value: "/services/web-application-development" },
      { label: "Schedule Tech Call", type: "contact" },
      { label: "Start a Project", type: "project_form" },
    ],
    priority: 10,
    enabled: true,
  },
  {
    id: "cmd-seo",
    keyword: "seo services",
    alternativeKeywords: ["seo", "search engine optimization", "google ranking", "search marketing", "organic traffic", "technical seo"],
    userIntent: "Inquire about SEO services and technical web performance tuning",
    response: "Our technical SEO pods focus on Core Web Vitals optimization, programmatic indexing, semantic architecture, and high-converting search visibility.",
    followUpResponse: "We can perform a preliminary SEO & Core Web Vitals audit for your domain.",
    relatedService: "seo-services",
    relatedPage: "/services/seo-services",
    ctaButtons: [
      { label: "Explore SEO Services", type: "page", value: "/services/seo-services" },
      { label: "Request SEO Audit", type: "project_form" },
    ],
    priority: 9,
    enabled: true,
  },
  {
    id: "cmd-compliance",
    keyword: "risk and compliance",
    alternativeKeywords: ["compliance", "governance", "dpdp", "soc-2", "security", "gdpr", "privacy act", "risk governance"],
    userIntent: "Inquire about Risk, Compliance, Governance, and DPDP Act audits",
    response: "We provide comprehensive DPDP Act readiness audits, SOC 2 framework alignment, data privacy governance, and cross-border cybersecurity compliance.",
    followUpResponse: "Our compliance team assists enterprise clients across India and the GCC in achieving total data sovereignty readiness.",
    relatedService: "risk-compliance-governance",
    relatedPage: "/services/risk-compliance-governance",
    ctaButtons: [
      { label: "Explore Risk & Compliance", type: "page", value: "/services/risk-compliance-governance" },
      { label: "Contact Compliance Pod", type: "email", value: "mailto:support@aravinnovations.com" },
    ],
    priority: 9,
    enabled: true,
  },
  {
    id: "cmd-audit",
    keyword: "audit and improvement",
    alternativeKeywords: ["audit", "system audit", "code health", "finops", "cloud cost audit", "process optimization"],
    userIntent: "Inquire about Audit & Improvement, code quality, and cloud cost optimization",
    response: "We provide independent codebase quality audits, FinOps cloud cost optimization, CI/CD pipeline streamlining, and performance bottleneck diagnostics.",
    followUpResponse: "Would you like to schedule a 2-week diagnostic audit for your platform?",
    relatedService: "audit-improvement",
    relatedPage: "/services/audit-improvement",
    ctaButtons: [
      { label: "Explore Audit & Improvement", type: "page", value: "/services/audit-improvement" },
      { label: "Book Audit", type: "project_form" },
    ],
    priority: 9,
    enabled: true,
  },
  {
    id: "cmd-staff-aug",
    keyword: "staff augmentation",
    alternativeKeywords: ["training", "staff squads", "hire developers", "dedicated engineers", "upskilling", "tech talent"],
    userIntent: "Inquire about Training, Staff Augmentation, and dedicated engineering squads",
    response: "We provide pre-vetted senior software engineers, cloud architects, and QA specialists who integrate into your sprints within 48-72 hours, alongside custom corporate training.",
    followUpResponse: "What technical roles or skillsets do you need to augment your current team?",
    relatedService: "training-staff-augmentation",
    relatedPage: "/services/training-staff-augmentation",
    ctaButtons: [
      { label: "Explore Staff Augmentation", type: "page", value: "/services/training-staff-augmentation" },
      { label: "Request Talent Profiles", type: "project_form" },
    ],
    priority: 9,
    enabled: true,
  },
  {
    id: "cmd-contact",
    keyword: "contact info",
    alternativeKeywords: ["contact", "phone", "email", "address", "location", "gurgaon", "dubai", "office", "headquarters"],
    userIntent: "Request company contact details and regional office addresses",
    response: "Arav Innovations operates dual regional headquarters:\n\n• **India HQ**: Gurgaon, Haryana (Tel: +91 9650625777)\n• **UAE Regional Office**: Dubai Silicon Oasis, Dubai (Tel: +971 521555792)\n• **Email**: support@aravinnovations.com",
    followUpResponse: "Would you like to connect directly via WhatsApp or email?",
    relatedPage: "/contact",
    ctaButtons: [
      { label: "Contact Page", type: "page", value: "/contact" },
      { label: "WhatsApp Us", type: "whatsapp", value: "https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project." },
      { label: "Email Us", type: "email", value: "mailto:support@aravinnovations.com" },
    ],
    priority: 8,
    enabled: true,
  },
  {
    id: "cmd-pricing",
    keyword: "pricing",
    alternativeKeywords: ["cost", "rates", "budget", "quote", "pricing model", "retainer"],
    userIntent: "Inquire about project pricing and engagement models",
    response: "We offer custom enterprise engagements tailored to your strategic goals. Tell us what you are trying to achieve and we will help you identify the right technology, strategy, and execution path.",
    followUpResponse: "Discuss your project scope with our engineering leadership.",
    ctaButtons: [
      { label: "Start a Project Request", type: "project_form" },
      { label: "Speak with Advisor", type: "contact" },
    ],
    priority: 7,
    enabled: true,
  },
];

const defaultChatbotKB: ChatbotKB = {
  masterEnabled: true,
  defaultGreeting: "Hey there! 👋 Welcome to Arav Innovations. How can our team help accelerate your technology & growth goals today?",
  fallbackResponse: "I'm here to help with Arav Innovations' services, projects, industries and contact options. Could you tell me what you're looking for?",
  commands: defaultChatbotCommands,
};

const defaultFooter: FooterContent = {
  mainHeading: "WE 🤍 WORKING WITH AMBITIOUS BRANDS, ACROSS EVERY SECTOR",
  description: "Arav Innovations delivers enterprise technology platforms, IT strategy, full-stack software, data compliance, and B2B growth.",
  indiaCountry: "India HQ",
  indiaPhone: "+91 9650625777",
  indiaAddress: "Platinum Floor D 14/23, Ardee City Sec 52, Gurgaon 122002",
  indiaDisplayLabel: "+91 9650625777 - India HQ",
  indiaVisible: true,
  uaeCountry: "UAE Regional Office",
  uaeCompanyName: "ARAVINNOVATIONS CONSULTANCY - FZCO",
  uaePhone: "+971 521555792",
  uaeAddress: "55764-001 IFZA Business Park FZCO, Building A1 Dubai Silicon Oasis Dubai, U.A.E",
  uaeDisplayLabel: "+971 521555792 - UAE Regional Office",
  uaeVisible: true,
  supportEmail: "support@aravinnovations.com",
  secondaryEmail: "contact@aravinnovations.com",
  whatsappNumber: "+91 9650625777",
  whatsappUrl: "https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  linkedinUrl: "https://www.linkedin.com/company/aravinnovations/",
  instagramUrl: "https://www.instagram.com/aravinnovations",
  facebookUrl: "https://www.facebook.com/people/Arav-Innovations/61566419637071/",
  twitterUrl: "https://x.com/AravInnovations",
  youtubeUrl: "https://www.youtube.com/@AravInnovations",
  bookCallUrl: "tel:+919650625777",
  contactUsUrl: "/contact",
  copyrightText: "© 2026 Arav Innovations. All rights reserved.",
};

const defaultSEO: SEOContent = {
  globalTitle: "Arav Innovations | Enterprise IT Strategy, Software Engineering & Growth",
  metaDescription:
    "Arav Innovations is a multidisciplinary technology, strategy, digital growth, governance, and staff augmentation firm operating globally.",
  canonicalBase: "https://aravinnovations.com",
};

const defaultLegal: LegalContent = {
  privacyPolicyText: "Privacy Policy for Arav Innovations. Effective Date: 27th Dec 2024. At Arav Innovations, your privacy is important to us.",
  termsText: "Terms and Conditions for Arav Innovations. By using our website and services, you agree to these terms.",
  refundText: "Refund Policy for Arav Innovations. Service retainers and milestone deliveries follow structured scope terms.",
  securityDpdpText: "Security & DPDP Act Compliance Policy. Arav Innovations enforces strict data sovereignty and encryption standards.",
};

const defaultContent: SiteContent = {
  hero: defaultHero,
  services: initialServices,
  industries: initialIndustries,
  caseStudies: initialCaseStudies,
  processSteps: defaultProcessSteps,
  testimonials: defaultTestimonials,
  footer: defaultFooter,
  socialLinks: defaultSocialLinks,
  languages: defaultLanguages,
  chatbotKB: defaultChatbotKB,
  seo: defaultSEO,
  legal: defaultLegal,
  translations: {},
};

interface SiteContentContextType {
  content: SiteContent;
  updateHero: (hero: Partial<HeroContent>) => void;
  updateService: (slug: string, updated: Partial<Service>) => void;
  addService: (service: Service) => void;
  deleteService: (slug: string) => void;
  updateIndustry: (slug: string, updated: Partial<IndustrySolution>) => void;
  addIndustry: (industry: IndustrySolution) => void;
  deleteIndustry: (slug: string) => void;
  updateCaseStudy: (slug: string, updated: Partial<CaseStudy>) => void;
  addCaseStudy: (study: CaseStudy) => void;
  deleteCaseStudy: (slug: string) => void;
  updateProcessStep: (idx: number, updated: Partial<ProcessStepItem>) => void;
  updateTestimonial: (idx: number, updated: Partial<TestimonialItem>) => void;
  addTestimonial: (testimonial: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
  updateFooter: (footer: Partial<FooterContent>) => void;
  updateSocialLink: (id: string, updated: Partial<SocialLinkItem>) => void;
  addSocialLink: (link: SocialLinkItem) => void;
  deleteSocialLink: (id: string) => void;
  updateLanguage: (code: string, updated: Partial<LanguageItem>) => void;
  toggleLanguage: (code: string) => void;
  updateChatbotKB: (kb: Partial<ChatbotKB>) => void;
  addChatbotCommand: (cmd: ChatbotCommandItem) => void;
  updateChatbotCommand: (id: string, updated: Partial<ChatbotCommandItem>) => void;
  deleteChatbotCommand: (id: string) => void;
  toggleChatbotCommand: (id: string) => void;
  updateSEO: (seo: Partial<SEOContent>) => void;
  updateLegal: (legal: Partial<LegalContent>) => void;
  updateTranslation: (locale: string, key: string, val: string) => void;
  resetAllContent: () => void;
}

const SiteContentContext = React.createContext<SiteContentContextType>({
  content: defaultContent,
  updateHero: () => {},
  updateService: () => {},
  addService: () => {},
  deleteService: () => {},
  updateIndustry: () => {},
  addIndustry: () => {},
  deleteIndustry: () => {},
  updateCaseStudy: () => {},
  addCaseStudy: () => {},
  deleteCaseStudy: () => {},
  updateProcessStep: () => {},
  updateTestimonial: () => {},
  addTestimonial: () => {},
  deleteTestimonial: () => {},
  updateFooter: () => {},
  updateSocialLink: () => {},
  addSocialLink: () => {},
  deleteSocialLink: () => {},
  updateLanguage: () => {},
  toggleLanguage: () => {},
  updateChatbotKB: () => {},
  addChatbotCommand: () => {},
  updateChatbotCommand: () => {},
  deleteChatbotCommand: () => {},
  toggleChatbotCommand: () => {},
  updateSEO: () => {},
  updateLegal: () => {},
  updateTranslation: () => {},
  resetAllContent: () => {},
});

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = React.useState<SiteContent>(defaultContent);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("arav_site_content");
      if (saved) {
        setContent((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveContent = (updated: SiteContent) => {
    setContent(updated);
    try {
      localStorage.setItem("arav_site_content", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const updateHero = (heroPartial: Partial<HeroContent>) => {
    saveContent({
      ...content,
      hero: { ...content.hero, ...heroPartial },
    });
  };

  const updateService = (slug: string, updatedPartial: Partial<Service>) => {
    const updatedServices = content.services.map((s) =>
      s.slug === slug ? { ...s, ...updatedPartial } : s
    );
    saveContent({ ...content, services: updatedServices });
  };

  const addService = (service: Service) => {
    saveContent({ ...content, services: [...content.services, service] });
  };

  const deleteService = (slug: string) => {
    saveContent({ ...content, services: content.services.filter((s) => s.slug !== slug) });
  };

  const updateIndustry = (slug: string, updatedPartial: Partial<IndustrySolution>) => {
    const updatedIndustries = content.industries.map((ind) =>
      ind.slug === slug ? { ...ind, ...updatedPartial } : ind
    );
    saveContent({ ...content, industries: updatedIndustries });
  };

  const addIndustry = (industry: IndustrySolution) => {
    saveContent({ ...content, industries: [...content.industries, industry] });
  };

  const deleteIndustry = (slug: string) => {
    saveContent({ ...content, industries: content.industries.filter((ind) => ind.slug !== slug) });
  };

  const updateCaseStudy = (slug: string, updatedPartial: Partial<CaseStudy>) => {
    const updatedStudies = content.caseStudies.map((cs) =>
      cs.slug === slug ? { ...cs, ...updatedPartial } : cs
    );
    saveContent({ ...content, caseStudies: updatedStudies });
  };

  const addCaseStudy = (study: CaseStudy) => {
    saveContent({ ...content, caseStudies: [...content.caseStudies, study] });
  };

  const deleteCaseStudy = (slug: string) => {
    saveContent({ ...content, caseStudies: content.caseStudies.filter((cs) => cs.slug !== slug) });
  };

  const updateProcessStep = (idx: number, updatedPartial: Partial<ProcessStepItem>) => {
    const updatedSteps = content.processSteps.map((step, i) =>
      i === idx ? { ...step, ...updatedPartial } : step
    );
    saveContent({ ...content, processSteps: updatedSteps });
  };

  const updateTestimonial = (idx: number, updatedPartial: Partial<TestimonialItem>) => {
    const updatedTests = content.testimonials.map((t, i) =>
      i === idx ? { ...t, ...updatedPartial } : t
    );
    saveContent({ ...content, testimonials: updatedTests });
  };

  const addTestimonial = (t: TestimonialItem) => {
    saveContent({ ...content, testimonials: [...content.testimonials, t] });
  };

  const deleteTestimonial = (id: string) => {
    saveContent({ ...content, testimonials: content.testimonials.filter((t) => t.id !== id) });
  };

  const updateFooter = (footerPartial: Partial<FooterContent>) => {
    saveContent({
      ...content,
      footer: { ...content.footer, ...footerPartial },
    });
  };

  const updateSocialLink = (id: string, updatedPartial: Partial<SocialLinkItem>) => {
    const updatedSocials = content.socialLinks.map((s) =>
      s.id === id ? { ...s, ...updatedPartial } : s
    );
    saveContent({ ...content, socialLinks: updatedSocials });
  };

  const addSocialLink = (link: SocialLinkItem) => {
    saveContent({
      ...content,
      socialLinks: [...content.socialLinks, link],
    });
  };

  const deleteSocialLink = (id: string) => {
    saveContent({
      ...content,
      socialLinks: content.socialLinks.filter((s) => s.id !== id),
    });
  };

  const updateLanguage = (code: string, updatedPartial: Partial<LanguageItem>) => {
    const updatedLangs = content.languages.map((l) =>
      l.code === code ? { ...l, ...updatedPartial } : l
    );
    saveContent({ ...content, languages: updatedLangs });
  };

  const toggleLanguage = (code: string) => {
    const updatedLangs = content.languages.map((l) =>
      l.code === code ? { ...l, enabled: !l.enabled } : l
    );
    saveContent({ ...content, languages: updatedLangs });
  };

  const updateChatbotKB = (kbPartial: Partial<ChatbotKB>) => {
    saveContent({
      ...content,
      chatbotKB: { ...content.chatbotKB, ...kbPartial },
    });
  };

  const addChatbotCommand = (cmd: ChatbotCommandItem) => {
    const currentCommands = content.chatbotKB?.commands || defaultChatbotCommands;
    saveContent({
      ...content,
      chatbotKB: {
        ...content.chatbotKB,
        commands: [cmd, ...currentCommands],
      },
    });
  };

  const updateChatbotCommand = (id: string, updatedPartial: Partial<ChatbotCommandItem>) => {
    const currentCommands = content.chatbotKB?.commands || defaultChatbotCommands;
    const updatedCommands = currentCommands.map((c) =>
      c.id === id ? { ...c, ...updatedPartial } : c
    );
    saveContent({
      ...content,
      chatbotKB: {
        ...content.chatbotKB,
        commands: updatedCommands,
      },
    });
  };

  const deleteChatbotCommand = (id: string) => {
    const currentCommands = content.chatbotKB?.commands || defaultChatbotCommands;
    saveContent({
      ...content,
      chatbotKB: {
        ...content.chatbotKB,
        commands: currentCommands.filter((c) => c.id !== id),
      },
    });
  };

  const toggleChatbotCommand = (id: string) => {
    const currentCommands = content.chatbotKB?.commands || defaultChatbotCommands;
    const updatedCommands = currentCommands.map((c) =>
      c.id === id ? { ...c, enabled: !c.enabled } : c
    );
    saveContent({
      ...content,
      chatbotKB: {
        ...content.chatbotKB,
        commands: updatedCommands,
      },
    });
  };

  const updateSEO = (seoPartial: Partial<SEOContent>) => {
    saveContent({
      ...content,
      seo: { ...content.seo, ...seoPartial },
    });
  };

  const updateLegal = (legalPartial: Partial<LegalContent>) => {
    saveContent({
      ...content,
      legal: { ...content.legal, ...legalPartial },
    });
  };

  const updateTranslation = (locale: string, key: string, val: string) => {
    const currentLoc = content.translations[locale] || {};
    saveContent({
      ...content,
      translations: {
        ...content.translations,
        [locale]: { ...currentLoc, [key]: val },
      },
    });
  };

  const resetAllContent = () => {
    saveContent(defaultContent);
    try {
      localStorage.removeItem("arav_site_content");
    } catch {
      // ignore
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        updateHero,
        updateService,
        addService,
        deleteService,
        updateIndustry,
        addIndustry,
        deleteIndustry,
        updateCaseStudy,
        addCaseStudy,
        deleteCaseStudy,
        updateProcessStep,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        updateFooter,
        updateSocialLink,
        addSocialLink,
        deleteSocialLink,
        updateLanguage,
        toggleLanguage,
        updateChatbotKB,
        addChatbotCommand,
        updateChatbotCommand,
        deleteChatbotCommand,
        toggleChatbotCommand,
        updateSEO,
        updateLegal,
        updateTranslation,
        resetAllContent,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return React.useContext(SiteContentContext);
}

