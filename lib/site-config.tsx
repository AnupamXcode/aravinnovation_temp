"use client";

import * as React from "react";

export interface SectionThemes {
  services: "soft_orange" | "warm_beige" | "light_neutral" | "default";
  industries: "warm_beige" | "soft_orange" | "light_neutral" | "default";
  caseStudies: "soft_orange" | "warm_beige" | "light_neutral" | "default";
  methodology: "light_neutral" | "warm_beige" | "default";
  testimonials: "warm_beige" | "light_neutral" | "default";
  cta: "gradient" | "dark" | "default";
}

export type CardStyleOption = "elevated" | "bordered" | "minimal" | "standard";

export interface ThreeDExperienceConfig {
  enable3D: boolean;
  hero3D: boolean;
  services3D: boolean;
  caseStudies3D: boolean;
  methodology3D: boolean;
  footer3D: boolean;
  threeDIntensity: "low" | "medium" | "high";
  mobile3D: boolean;
  performanceMode: "auto" | "performance" | "high_quality";
}

export interface EnterpriseServiceLayerConfig {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  tone: string; // Brand palette color
  icon: string;
  href: string;
  visible: boolean;
}

export interface EnterprisePracticesConfig {
  enabled: boolean;
  scrollAnimationEnabled: boolean;
  threeDEnabled: boolean;
  backgroundMotionEnabled: boolean;
  hoverEffectsEnabled: boolean;
  intensity: "low" | "medium" | "high";
  serviceLayers: EnterpriseServiceLayerConfig[];
}

export interface BrandColors {
  primary: string;
  secondary: string;
  white: string;
  lightYellow: string;
  gold: string;
  peach: string;
  cardAccent: string;
  badgeBg: string;
  iconAccent: string;
  buttonHover: string;
}

export const defaultBrandColors: BrandColors = {
  primary: "#F15E1C",
  secondary: "#2E936F",
  white: "#FFFFFF",
  lightYellow: "#FFEC69",
  gold: "#FAB60A",
  peach: "#F7D7B0",
  cardAccent: "#F15E1C",
  badgeBg: "#F7D7B0",
  iconAccent: "#2E936F",
  buttonHover: "#D8480D",
};

export interface SiteConfig {
  websiteEnabled: boolean;
  brandColors: BrandColors;
  chatbotEnabled: boolean;
  chatbotDelaySeconds: number;
  animationsEnabled: boolean;
  backgroundMotionEnabled: boolean;
  parallaxEnabled: boolean;
  hoverEffectsEnabled: boolean;
  scrollAnimationsEnabled: boolean;
  entranceAnimationsEnabled: boolean;
  mobileAnimationsEnabled: boolean;
  animationIntensity: "subtle" | "standard" | "enhanced";
  animationIntensityLevel: "low" | "medium" | "high";
  threeDConfig: ThreeDExperienceConfig;
  enterprisePracticesConfig: EnterprisePracticesConfig;
  trustedClientsVisible: boolean;
  servicesVisible: boolean;
  industriesVisible: boolean;
  processVisible: boolean;
  testimonialsVisible: boolean;
  caseStudiesVisible: boolean;
  blogVisible: boolean;
  bannerVisible: boolean;
  bannerText: string;
  phoneIndia: string;
  phoneUAE: string;
  supportEmail: string;
  linkedinUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsappUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  serviceStates: Record<string, boolean>;
  sectionThemes: SectionThemes;
  cardStyle: CardStyleOption;
}

const defaultConfig: SiteConfig = {
  websiteEnabled: true,
  brandColors: defaultBrandColors,
  chatbotEnabled: true,
  chatbotDelaySeconds: 10,
  animationsEnabled: true,
  backgroundMotionEnabled: true,
  parallaxEnabled: true,
  hoverEffectsEnabled: true,
  scrollAnimationsEnabled: true,
  entranceAnimationsEnabled: true,
  mobileAnimationsEnabled: true,
  animationIntensity: "standard",
  animationIntensityLevel: "medium",
  threeDConfig: {
    enable3D: true,
    hero3D: true,
    services3D: true,
    caseStudies3D: true,
    methodology3D: true,
    footer3D: true,
    threeDIntensity: "medium",
    mobile3D: true,
    performanceMode: "auto",
  },
  enterprisePracticesConfig: {
    enabled: true,
    scrollAnimationEnabled: true,
    threeDEnabled: true,
    backgroundMotionEnabled: true,
    hoverEffectsEnabled: true,
    intensity: "medium",
    serviceLayers: [
      {
        id: 0,
        slug: "it-strategy-implementation",
        name: "IT Strategy & Implementation",
        shortName: "IT Strategy & Implementation",
        description: "Enterprise roadmaps, cloud strategy, digital transformation & tech modernization.",
        tone: "#f15e1c", // Primary Orange
        icon: "Compass",
        href: "/services/it-strategy-implementation",
        visible: true,
      },
      {
        id: 1,
        slug: "digital-marketing-brand-development",
        name: "Digital Marketing & Brand Development",
        shortName: "Digital Marketing & Brand Development",
        description: "Brand strategy, performance marketing & growth campaigns that drive measurable impact.",
        tone: "#2e936f", // Green
        icon: "TrendingUp",
        href: "/services/digital-marketing-brand-development",
        visible: true,
      },
      {
        id: 2,
        slug: "web-application-development",
        name: "Web & Application Development",
        shortName: "Web & Application Development",
        description: "Scalable web & mobile apps built with modern frameworks and cloud-native architecture.",
        tone: "#fab60a", // Gold
        icon: "Code2",
        href: "/services/web-application-development",
        visible: true,
      },
      {
        id: 3,
        slug: "risk-compliance-governance",
        name: "Risk, Compliance & Governance",
        shortName: "Risk, Compliance & Governance",
        description: "Risk frameworks, compliance automation & governance models for secure and compliant operations.",
        tone: "#f7d7b0", // Peach
        icon: "ShieldCheck",
        href: "/services/risk-compliance-governance",
        visible: true,
      },
      {
        id: 4,
        slug: "audit-improvement",
        name: "Audit & Improvement",
        shortName: "Audit & Improvement",
        description: "Technical, operational & process audits with actionable performance improvements.",
        tone: "#2e936f", // Green
        icon: "BarChart3",
        href: "/services/audit-improvement",
        visible: true,
      },
      {
        id: 5,
        slug: "training-staff-augmentation",
        name: "Training & Staff Augmentation",
        shortName: "Training & Staff Augmentation",
        description: "Pre-vetted tech talent & training programs to scale your team and capabilities.",
        tone: "#ffec69", // Yellow
        icon: "Users2",
        href: "/services/training-staff-augmentation",
        visible: true,
      },
      {
        id: 6,
        slug: "seo-services",
        name: "SEO Services",
        shortName: "SEO Services",
        description: "Technical SEO, content strategy & authority building for long-term organic growth.",
        tone: "#2e936f", // Green
        icon: "Search",
        href: "/services/seo-services",
        visible: true,
      },
      {
        id: 7,
        slug: "ai-portfolio",
        name: "AI Portfolio",
        shortName: "AI Portfolio",
        description: "AI-powered solutions, automation & intelligent systems built for the future of your business.",
        tone: "#f15e1c", // Primary Orange
        icon: "Cpu",
        href: "/products",
        visible: true,
      },
    ],
  },
  trustedClientsVisible: true,
  servicesVisible: true,
  industriesVisible: true,
  processVisible: true,
  testimonialsVisible: true,
  caseStudiesVisible: true,
  blogVisible: true,
  bannerVisible: false,
  bannerText: "🚀 Operating Globally across India, UAE, US, EU & Canada Hubs",
  phoneIndia: "+91 9650625777",
  phoneUAE: "+971 521555792",
  supportEmail: "support@aravinnovations.com",
  linkedinUrl: "https://www.linkedin.com/company/aravinnovations/",
  instagramUrl: "https://www.instagram.com/aravinnovations",
  facebookUrl: "https://www.facebook.com/people/Arav-Innovations/61566419637071/",
  whatsappUrl: "https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  twitterUrl: "https://x.com/AravInnovations",
  youtubeUrl: "https://www.youtube.com/@AravInnovations",
  serviceStates: {
    "it-strategy-consulting": true,
    "web-app-development": true,
    "digital-marketing": true,
    "seo": true,
    "risk-governance-compliance": true,
    "audit-improvement": true,
    "training-staff-augmentation": true,
    "ai-solutions": true,
  },
  sectionThemes: {
    services: "soft_orange",
    industries: "warm_beige",
    caseStudies: "soft_orange",
    methodology: "light_neutral",
    testimonials: "warm_beige",
    cta: "gradient",
  },
  cardStyle: "elevated",
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (key: keyof SiteConfig, value: any) => void;
  updateSectionTheme: (section: keyof SectionThemes, theme: string) => void;
  updateCardStyle: (style: CardStyleOption) => void;
  toggleServiceState: (slug: string) => void;
  toggleWebsitePower: (override?: boolean) => void;
  resetConfig: () => void;
  isAuthenticated: boolean;
  loginAdmin: (u: string, p: string) => boolean;
  logoutAdmin: () => void;
}

const SiteConfigContext = React.createContext<SiteConfigContextType>({
  config: defaultConfig,
  updateConfig: () => {},
  updateSectionTheme: () => {},
  updateCardStyle: () => {},
  toggleServiceState: () => {},
  toggleWebsitePower: () => {},
  resetConfig: () => {},
  isAuthenticated: false,
  loginAdmin: () => false,
  logoutAdmin: () => {},
});

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = React.useState<SiteConfig>(defaultConfig);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("arav_site_config");
      if (saved) {
        setConfig((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
      const authSaved = sessionStorage.getItem("arav_admin_authenticated");
      if (authSaved === "true") {
        setIsAuthenticated(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const updateConfig = (key: keyof SiteConfig, value: any) => {
    setConfig((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem("arav_site_config", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const updateSectionTheme = (section: keyof SectionThemes, theme: string) => {
    setConfig((prev) => {
      const updatedThemes = {
        ...(prev.sectionThemes || defaultConfig.sectionThemes),
        [section]: theme,
      };
      const updated = { ...prev, sectionThemes: updatedThemes };
      try {
        localStorage.setItem("arav_site_config", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const updateCardStyle = (style: CardStyleOption) => {
    updateConfig("cardStyle", style);
  };

  const toggleServiceState = (slug: string) => {
    setConfig((prev) => {
      const currentStates = prev.serviceStates || defaultConfig.serviceStates;
      const updatedStates = {
        ...currentStates,
        [slug]: !currentStates[slug],
      };
      const updated = { ...prev, serviceStates: updatedStates };
      try {
        localStorage.setItem("arav_site_config", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const toggleWebsitePower = (override?: boolean) => {
    setConfig((prev) => {
      const nextPower = override !== undefined ? override : prev.websiteEnabled === false ? true : false;
      const updated = { ...prev, websiteEnabled: nextPower };
      try {
        localStorage.setItem("arav_site_config", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    try {
      localStorage.removeItem("arav_site_config");
    } catch {
      // ignore
    }
  };

  const loginAdmin = (u: string, p: string): boolean => {
    if (u.trim() === "aravinadmin" && p === "passwordasarav") {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem("arav_admin_authenticated", "true");
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem("arav_admin_authenticated");
    } catch {
      // ignore
    }
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateConfig,
        updateSectionTheme,
        updateCardStyle,
        toggleServiceState,
        toggleWebsitePower,
        resetConfig,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return React.useContext(SiteConfigContext);
}
