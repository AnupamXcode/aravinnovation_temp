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

export interface NavbarConfig {
  enabled: boolean;
  translucent: boolean;
  scrollTransparencyEnabled: boolean;
  topOpacity: number;
  scrolledOpacity: number;
  backdropBlur: number;
  borderVisible: boolean;
  borderOpacity: number;
  shadowVisible: boolean;
  shadowIntensity: "none" | "sm" | "md" | "lg";
  transitionSpeed: "fast" | "standard" | "smooth";
}

export const defaultNavbarConfig: NavbarConfig = {
  enabled: true,
  translucent: true,
  scrollTransparencyEnabled: true,
  topOpacity: 80,
  scrolledOpacity: 85,
  backdropBlur: 16,
  borderVisible: true,
  borderOpacity: 60,
  shadowVisible: true,
  shadowIntensity: "sm",
  transitionSpeed: "standard",
};

export interface HeroPositioningDeviceConfig {
  contentX: number; // -200 to 200px
  contentY: number; // -150 to 150px
  contentWidth: number; // 450 to 800px
  contentAlign: "left" | "center" | "right";

  headingX: number; // -100 to 100px
  headingY: number; // -100 to 100px
  headingMb: number; // 8 to 64px
  headingSize: number; // 32 to 72px

  descX: number; // -100 to 100px
  descY: number; // -100 to 100px
  descMb: number; // 8 to 64px

  ctaX: number; // -100 to 100px
  ctaY: number; // -100 to 100px
  ctaMb: number; // 8 to 64px
  ctaGap: number; // 8 to 40px

  capX: number; // -100 to 100px
  capY: number; // -100 to 100px
  capMt: number; // 8 to 96px
  capGap: number; // 16 to 80px

  dividerY: number; // -50 to 50px
  dividerWidth: number; // 10 to 100%
  dividerOpacity: number; // 0 to 100%

  visualX: number; // -200 to 200px
  visualY: number; // -150 to 150px
  visualScale: number; // 80 to 130%
  videoOverlayOpacity: number; // 0 to 100%
}

export interface HeroPositioningConfig {
  desktop: HeroPositioningDeviceConfig;
  tablet: HeroPositioningDeviceConfig;
  mobile: HeroPositioningDeviceConfig;
}

export const defaultHeroPositioningDeviceConfig: HeroPositioningDeviceConfig = {
  contentX: -60,
  contentY: 0,
  contentWidth: 640,
  contentAlign: "left",

  headingX: 0,
  headingY: 0,
  headingMb: 24,
  headingSize: 56,

  descX: 0,
  descY: 0,
  descMb: 32,

  ctaX: 0,
  ctaY: 0,
  ctaMb: 40,
  ctaGap: 20,

  capX: 0,
  capY: 0,
  capMt: 48,
  capGap: 24,

  dividerY: 0,
  dividerWidth: 100,
  dividerOpacity: 15,

  visualX: 0,
  visualY: 0,
  visualScale: 100,
  videoOverlayOpacity: 45,
};

export const defaultHeroPositioning: HeroPositioningConfig = {
  desktop: defaultHeroPositioningDeviceConfig,
  tablet: { ...defaultHeroPositioningDeviceConfig, contentX: 0, contentWidth: 580 },
  mobile: { ...defaultHeroPositioningDeviceConfig, contentX: 0, contentY: 0, contentWidth: 420 },
};

export interface HeroVideoConfig {
  enabled: boolean;
  videoUrl: string;
  playbackSpeed: number; // e.g. 0.25, 0.5, 0.65, 0.75, 1.0, 1.25, 1.5, 2.0
  overlayOpacity: number; // 0 to 100
  textAlignment: "left" | "center" | "right";
  textLayoutPosition: "left" | "center" | "right";
  textMaxWidth: "compact" | "standard" | "wide";
  positioning?: HeroPositioningConfig;
}

export const defaultHeroVideoConfig: HeroVideoConfig = {
  enabled: true,
  videoUrl: "/videos/Create_a_premium_minimalist_ci.mp4",
  playbackSpeed: 0.75,
  overlayOpacity: 45,
  textAlignment: "left",
  textLayoutPosition: "left",
  textMaxWidth: "standard",
  positioning: defaultHeroPositioning,
};

export interface CEOSectionConfig {
  visible: boolean;
  name: string;
  designation: string;
  portrait: string;
  statement: string;
  statementSupportingLine: string;
  biographyParagraph1: string;
  biographyParagraph2: string;
  linkedinUrl: string;
  ctaText: string;
}

export interface FooterConfig {
  ctaHeading: string;
  ctaDescription: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  brandStatement: string;
  addressIndia: string;
  mapsUrlIndia?: string;
  addressUAE: string;
  mapsUrlUAE?: string;
  phoneIndia: string;
  phoneUAE: string;
  supportEmail: string;
}

export interface SiteConfig {
  websiteEnabled: boolean;
  brandColors: BrandColors;
  navbarConfig: NavbarConfig;
  heroVideoConfig: HeroVideoConfig;
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
  ceoSectionConfig: CEOSectionConfig;
  footerConfig: FooterConfig;
  sectionThemes: SectionThemes;
  cardStyle: CardStyleOption;
}

export const defaultConfig: SiteConfig = {
  websiteEnabled: true,
  brandColors: defaultBrandColors,
  navbarConfig: defaultNavbarConfig,
  heroVideoConfig: defaultHeroVideoConfig,
  chatbotEnabled: true,
  chatbotDelaySeconds: 4,
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
    serviceLayers: [],
  },
  trustedClientsVisible: true,
  servicesVisible: true,
  industriesVisible: true,
  processVisible: true,
  testimonialsVisible: true,
  caseStudiesVisible: true,
  blogVisible: true,
  bannerVisible: false,
  bannerText: "Welcome to Arav Innovations - Elevating Brands, One Click at a Time",
  phoneIndia: "+91 9650625777",
  phoneUAE: "+971 521555792",
  supportEmail: "Info@aravinnovations.com",
  linkedinUrl: "https://www.linkedin.com/company/aravinnovations/",
  instagramUrl: "https://www.instagram.com/aravinnovations",
  facebookUrl: "https://facebook.com",
  whatsappUrl: "https://wa.me/919650625777",
  twitterUrl: "https://twitter.com",
  youtubeUrl: "https://youtube.com",
  serviceStates: {
    "it-strategy-implementation": true,
    "digital-marketing-brand-development": true,
    "web-app-development": true,
    "seo": true,
    "risk-governance-compliance": true,
    "audit-improvement": true,
    "training-staff-augmentation": true,
    "ai-solutions": true,
  },
  ceoSectionConfig: {
    visible: true,
    name: "Aryan Sayal",
    designation: "Founder & CEO, Arav Innovations",
    portrait: "/images/aryan-sayal-clean.png",
    statement: "Technology should create progress, not complexity.",
    statementSupportingLine: "That principle shapes how we approach strategy, transformation and technology delivery at Arav Innovations.",
    biographyParagraph1: "Aryan Sayal, Founder & CEO of Arav Innovations, brings more than 19 years of experience across technology and digital media. His leadership is grounded in helping businesses turn technology complexity into practical, scalable progress.",
    biographyParagraph2: "His experience spans IT strategy, cybersecurity, cloud services, application development, data analytics and digital media, with a focus on connecting technology decisions to real business priorities.",
    linkedinUrl: "https://www.linkedin.com/company/aravinnovations/",
    ctaText: "Connect with Aryan",
  },
  footerConfig: {
    ctaHeading: "READY FOR WHAT'S NEXT?",
    ctaDescription: "From technology strategy to digital growth, Arav Innovations helps organizations build stronger foundations for what's next.",
    ctaPrimaryText: "TALK TO AN EXPERT",
    ctaPrimaryHref: "/contact",
    ctaSecondaryText: "EXPLORE SERVICES",
    ctaSecondaryHref: "/services",
    brandStatement: "Technology, transformation and digital growth built around measurable business outcomes.",
    addressIndia: "Platinum Floor, 14/23, Ardee City, Sector 52, Gurgaon, 122002",
    mapsUrlIndia: "https://www.google.com/maps/search/?api=1&query=Platinum+Floor%2C+14%2F23%2C+Ardee+City%2C+Sector+52%2C+Gurgaon%2C+122002",
    addressUAE: "55764-001 IFZA Business Park FZCO, Building A1, Dubai Silicon Oasis, Dubai, UAE",
    mapsUrlUAE: "https://www.google.com/maps/search/?api=1&query=IFZA+Business+Park+Building+A1+Dubai+Silicon+Oasis+Dubai+UAE",
    phoneIndia: "+91 9650625777",
    phoneUAE: "+971 521555792",
    supportEmail: "Info@aravinnovations.com",
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
  updateNavbarConfig: (updates: Partial<NavbarConfig>) => void;
  updateHeroVideoConfig: (updates: Partial<HeroVideoConfig>) => void;
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
  updateNavbarConfig: () => {},
  updateHeroVideoConfig: () => {},
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

  const updateNavbarConfig = (updates: Partial<NavbarConfig>) => {
    setConfig((prev) => {
      const updatedNavbarConfig = {
        ...(prev.navbarConfig || defaultNavbarConfig),
        ...updates,
      };
      const updated = { ...prev, navbarConfig: updatedNavbarConfig };
      try {
        localStorage.setItem("arav_site_config", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const updateHeroVideoConfig = (updates: Partial<HeroVideoConfig>) => {
    setConfig((prev) => {
      const updatedHeroVideoConfig = {
        ...(prev.heroVideoConfig || defaultHeroVideoConfig),
        ...updates,
      };
      const updated = { ...prev, heroVideoConfig: updatedHeroVideoConfig };
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
        updateNavbarConfig,
        updateHeroVideoConfig,
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
