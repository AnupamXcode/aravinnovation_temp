export interface ServiceKnowledge {
  slug: string;
  name: string;
  keywords: string[];
  description: string;
  route: string;
}

export const servicesKnowledge: ServiceKnowledge[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    keywords: [
      "digital marketing",
      "online marketing",
      "social media",
      "seo",
      "search engine",
      "marketing",
      "digital growth",
      "online presence",
      "traffic",
      "lead generation",
      "adwords",
      "b2b marketing",
    ],
    description:
      "We help businesses build and strengthen their online presence through strategic B2B demand generation, high-intent LinkedIn & Google Search campaigns, and multi-channel conversion funnel modeling.",
    route: "/services/digital-marketing",
  },
  {
    slug: "web-app-development",
    name: "Web & App Development",
    keywords: [
      "website",
      "web development",
      "web design",
      "website development",
      "website design",
      "frontend",
      "backend",
      "web app",
      "web application",
      "mobile app",
      "react",
      "next.js",
      "app",
    ],
    description:
      "We build high-performance customer-facing web portals, complex internal SaaS platforms, cloud-native microservices, and native mobile applications using subsecond Next.js and React architecture.",
    route: "/services/web-app-development",
  },
  {
    slug: "it-strategy-consulting",
    name: "IT Strategy & Consulting",
    keywords: [
      "it strategy",
      "consulting",
      "cloud migration",
      "architecture",
      "legacy modernization",
      "it roadmap",
      "tech consulting",
      "cto",
    ],
    description:
      "We help forward-thinking enterprises modernize legacy infrastructure, formulate defensible multi-year technology roadmaps, and optimize enterprise cloud architecture across AWS, Azure, and GCP.",
    route: "/services/it-strategy-consulting",
  },
  {
    slug: "risk-governance-compliance",
    name: "Risk Governance & Compliance",
    keywords: [
      "compliance",
      "risk",
      "dpdp",
      "gdpr",
      "soc2",
      "iso",
      "governance",
      "data privacy",
      "security audit",
      "cybersecurity",
    ],
    description:
      "We implement enterprise compliance frameworks, DPDP Act 2023 readiness, SOC-2 compliance, data privacy controls, and cybersecurity risk posture management.",
    route: "/services/risk-governance-compliance",
  },
  {
    slug: "audit-improvement",
    name: "Audit & Improvement",
    keywords: [
      "audit",
      "code audit",
      "performance audit",
      "cost optimization",
      "finops",
      "core web vitals",
      "system review",
    ],
    description:
      "We conduct meticulous system efficiency reviews, code audits, performance tuning, Core Web Vitals remediation, and cloud cost waste slashing.",
    route: "/services/audit-improvement",
  },
  {
    slug: "training-staff-augmentation",
    name: "Training & Staff Augmentation",
    keywords: [
      "staff",
      "augmentation",
      "hire engineers",
      "developers",
      "training",
      "talent",
      "pod",
      "squad",
      "dedicated team",
    ],
    description:
      "We provide vetted on-demand senior technical talent, full-stack engineering pods, and customized enterprise technical upskilling programs.",
    route: "/services/training-staff-augmentation",
  },
  {
    slug: "ai-solutions",
    name: "AI & Automation Solutions",
    keywords: [
      "ai",
      "artificial intelligence",
      "machine learning",
      "ml",
      "generative ai",
      "automation",
      "ai solution",
      "intelligent systems",
      "llm",
    ],
    description:
      "We integrate intelligent AI workflows, custom predictive models, automated data pipelines, and generative AI agents into enterprise web platforms.",
    route: "/solutions",
  },
];

export function findMatchingService(query: string): ServiceKnowledge | null {
  const q = query.toLowerCase().trim();
  for (const service of servicesKnowledge) {
    for (const kw of service.keywords) {
      if (q.includes(kw)) {
        return service;
      }
    }
  }
  return null;
}

export function isGreeting(query: string): boolean {
  const q = query.toLowerCase().trim();
  const greetings = [
    "hi",
    "hello",
    "hii",
    "hey",
    "hey there",
    "good morning",
    "good evening",
    "namaste",
  ];
  return greetings.includes(q) || q.startsWith("hi ") || q.startsWith("hello ");
}

export function isBuyingIntent(query: string): boolean {
  const q = query.toLowerCase().trim();
  const intentKeywords = [
    "start a project",
    "hire",
    "cost",
    "price",
    "quote",
    "i need a website",
    "i want digital marketing",
    "can you build",
    "talk to someone",
    "contact us",
  ];
  return intentKeywords.some((kw) => q.includes(kw));
}
