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

export interface SiteConfig {
  chatbotEnabled: boolean;
  chatbotDelaySeconds: number;
  animationsEnabled: boolean;
  hoverEffectsEnabled: boolean;
  scrollAnimationsEnabled: boolean;
  entranceAnimationsEnabled: boolean;
  animationIntensity: "subtle" | "standard" | "enhanced";
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
  chatbotEnabled: true,
  chatbotDelaySeconds: 10,
  animationsEnabled: true,
  hoverEffectsEnabled: true,
  scrollAnimationsEnabled: true,
  entranceAnimationsEnabled: true,
  animationIntensity: "standard",
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
  whatsappUrl: "https://api.whatsapp.com/send?phone=919650625777",
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
