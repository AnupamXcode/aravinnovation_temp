"use client";

import * as React from "react";
import { servicesData as initialServices, Service } from "@/data/services";
import { industriesData as initialIndustries, IndustrySolution } from "@/data/industries";
import { caseStudiesData as initialCaseStudies, CaseStudy } from "@/data/case-studies";

export interface HeroContent {
  eyebrow: string;
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
  indiaPhone: string;
  uaePhone: string;
  supportEmail: string;
  linkedinUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsappUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
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

export interface ChatbotIntentItem {
  id: string;
  name: string;
  keywords: string[];
  response: string;
  ctaText?: string;
  ctaRoute?: string;
}

export interface ChatbotKB {
  defaultGreeting: string;
  fallbackResponse: string;
  intents: ChatbotIntentItem[];
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
    "Arav Innovations delivers enterprise IT strategy, full-stack web & app engineering, data compliance (DPDP/SOC-2), and high-intent digital marketing across India, UAE, US, EU, and global markets.",
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
    url: "https://api.whatsapp.com/send?phone=919650625777",
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

const defaultChatbotKB: ChatbotKB = {
  defaultGreeting: "Hey there! 👋 Welcome to Arav Innovations. How can our team help accelerate your project today?",
  fallbackResponse: "Thank you for reaching out! I've noted your inquiry. Would you like to schedule an exploratory call with an IT strategy advisor?",
  intents: [
    {
      id: "intent-web",
      name: "Web & App Development",
      keywords: ["website", "web app", "software", "nextjs", "react", "app"],
      response: "We engineer subsecond Next.js web applications, SaaS platforms, and enterprise digital products built for scale.",
      ctaText: "Explore Web Development",
      ctaRoute: "/services/web-app-development",
    },
    {
      id: "intent-marketing",
      name: "Digital Marketing & SEO",
      keywords: ["marketing", "seo", "leads", "demand gen", "linkedin", "google ads"],
      response: "Our B2B performance marketing & technical SEO pods deliver closed-loop attribution and high-intent pipeline growth.",
      ctaText: "Explore Digital Marketing",
      ctaRoute: "/services/digital-marketing",
    },
    {
      id: "intent-compliance",
      name: "Risk & DPDP Compliance",
      keywords: ["dpdp", "compliance", "soc-2", "security", "gdpr", "privacy"],
      response: "We ensure full readiness with India's DPDP Act, SOC-2 data security, and enterprise privacy compliance.",
      ctaText: "Explore Compliance",
      ctaRoute: "/services/risk-governance-compliance",
    },
  ],
};

const defaultFooter: FooterContent = {
  indiaPhone: "+91 9650625777",
  uaePhone: "+971 521555792",
  supportEmail: "support@aravinnovations.com",
  linkedinUrl: "https://www.linkedin.com/company/aravinnovations/",
  instagramUrl: "https://www.instagram.com/aravinnovations",
  facebookUrl: "https://www.facebook.com/people/Arav-Innovations/61566419637071/",
  whatsappUrl: "https://api.whatsapp.com/send?phone=919650625777",
  twitterUrl: "https://x.com/AravInnovations",
  youtubeUrl: "https://www.youtube.com/@AravInnovations",
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
  updateIndustry: (slug: string, updated: Partial<IndustrySolution>) => void;
  updateCaseStudy: (slug: string, updated: Partial<CaseStudy>) => void;
  updateProcessStep: (idx: number, updated: Partial<ProcessStepItem>) => void;
  updateTestimonial: (idx: number, updated: Partial<TestimonialItem>) => void;
  updateFooter: (footer: Partial<FooterContent>) => void;
  updateSocialLink: (id: string, updated: Partial<SocialLinkItem>) => void;
  addSocialLink: (link: SocialLinkItem) => void;
  deleteSocialLink: (id: string) => void;
  updateLanguage: (code: string, updated: Partial<LanguageItem>) => void;
  toggleLanguage: (code: string) => void;
  updateChatbotKB: (kb: Partial<ChatbotKB>) => void;
  updateSEO: (seo: Partial<SEOContent>) => void;
  updateLegal: (legal: Partial<LegalContent>) => void;
  updateTranslation: (locale: string, key: string, val: string) => void;
  resetAllContent: () => void;
}

const SiteContentContext = React.createContext<SiteContentContextType>({
  content: defaultContent,
  updateHero: () => {},
  updateService: () => {},
  updateIndustry: () => {},
  updateCaseStudy: () => {},
  updateProcessStep: () => {},
  updateTestimonial: () => {},
  updateFooter: () => {},
  updateSocialLink: () => {},
  addSocialLink: () => {},
  deleteSocialLink: () => {},
  updateLanguage: () => {},
  toggleLanguage: () => {},
  updateChatbotKB: () => {},
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

  const updateIndustry = (slug: string, updatedPartial: Partial<IndustrySolution>) => {
    const updatedIndustries = content.industries.map((ind) =>
      ind.slug === slug ? { ...ind, ...updatedPartial } : ind
    );
    saveContent({ ...content, industries: updatedIndustries });
  };

  const updateCaseStudy = (slug: string, updatedPartial: Partial<CaseStudy>) => {
    const updatedStudies = content.caseStudies.map((cs) =>
      cs.slug === slug ? { ...cs, ...updatedPartial } : cs
    );
    saveContent({ ...content, caseStudies: updatedStudies });
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
        updateIndustry,
        updateCaseStudy,
        updateProcessStep,
        updateTestimonial,
        updateFooter,
        updateSocialLink,
        addSocialLink,
        deleteSocialLink,
        updateLanguage,
        toggleLanguage,
        updateChatbotKB,
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
