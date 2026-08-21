"use client";

import * as React from "react";

export interface SiteConfig {
  chatbotEnabled: boolean;
  chatbotDelaySeconds: number;
  animationsEnabled: boolean;
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
}

const defaultConfig: SiteConfig = {
  chatbotEnabled: true,
  chatbotDelaySeconds: 10,
  animationsEnabled: true,
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
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (key: keyof SiteConfig, value: any) => void;
  toggleServiceState: (slug: string) => void;
  resetConfig: () => void;
  isAuthenticated: boolean;
  loginAdmin: (u: string, p: string) => boolean;
  logoutAdmin: () => void;
}

const SiteConfigContext = React.createContext<SiteConfigContextType>({
  config: defaultConfig,
  updateConfig: () => {},
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
