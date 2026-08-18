export interface IndustrySolution {
  slug: string;
  name: string;
  description: string;
  icon: string;
  capabilities: string[];
  statusNote?: string;
}

export const industriesData: IndustrySolution[] = [
  {
    slug: "fintech-financial-services",
    name: "FinTech & Financial Services",
    description:
      "Secure, DPDP and SOC-2 compliant digital banking portals, automated transaction workflows, and high-performance financial analytics engines.",
    icon: "Building2",
    capabilities: [
      "SOC-2 & DPDP Compliance Roadmaps",
      "Sub-Second High-Concurrency Portals",
      "API Integrations with Banking Gateways",
      "Zero-Trust Cloud Architecture",
    ],
    statusNote: "[INDUSTRIES TO BE CONFIRMED]",
  },
  {
    slug: "b2b-saas-enterprise-tech",
    name: "B2B SaaS & Enterprise Tech",
    description:
      "Modern Next.js web applications, multi-tenant cloud architectures, technical SEO clusters, and high-intent B2B performance marketing.",
    icon: "Cpu",
    capabilities: [
      "Next.js App Router Architecture",
      "High-Intent LinkedIn Demand Generation",
      "Technical SEO & Programmatic Indexing",
      "On-Demand Engineering Squads",
    ],
    statusNote: "[INDUSTRIES TO BE CONFIRMED]",
  },
  {
    slug: "healthcare-healthtech",
    name: "Healthcare & HealthTech",
    description:
      "Patient data privacy governance, telehealth portal engineering, clinical workflow automation, and regional health data compliance.",
    icon: "HeartPulse",
    capabilities: [
      "Health Data Privacy Frameworks",
      "HIPAA / DPDP Aligned Data Storage",
      "Responsive Telehealth Portals",
      "Staff Augmentation for Health Systems",
    ],
    statusNote: "[INDUSTRIES TO BE CONFIRMED]",
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    description:
      "Real-time tracking dashboards, multi-regional dispatch portals, cloud cost reduction, and performance audits for legacy fleet systems.",
    icon: "Truck",
    capabilities: [
      "Real-Time Telemetry & Dashboards",
      "Cloud Infrastructure Modernization",
      "Legacy Code & Performance Audits",
      "B2B Demand Capture for Freight",
    ],
    statusNote: "[INDUSTRIES TO BE CONFIRMED]",
  },
  {
    slug: "ecommerce-retail",
    name: "E-Commerce & Modern Retail",
    description:
      "Headless storefronts, lightning-fast Core Web Vitals, omnichannel marketing funnels, and automated inventory sync architectures.",
    icon: "ShoppingBag",
    capabilities: [
      "Headless Next.js Storefronts",
      "Core Web Vitals Optimization",
      "Multi-Touch Attribution Modeling",
      "Staff Augmentation for Peak Seasons",
    ],
    statusNote: "[INDUSTRIES TO BE CONFIRMED]",
  },
  {
    slug: "education-edtech",
    name: "Education & EdTech Platforms",
    description:
      "Scalable LMS systems, interactive video streaming platforms, organic search authority hubs, and corporate training delivery programs.",
    icon: "GraduationCap",
    capabilities: [
      "Scalable Learning Management Portals",
      "Topical Authority SEO Hubs",
      "Cloud Cost & FinOps Optimization",
      "Custom Upskilling Workshops",
    ],
    statusNote: "[INDUSTRIES TO BE CONFIRMED]",
  },
];
