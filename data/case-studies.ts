export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  clientIndustry: string;
  serviceCategory: string;
  serviceSlug: string;
  location: string;
  summary: string;
  challenge: string;
  objective: string;
  approach: string;
  solution: string;
  verificationStatus?: "Draft" | "Needs Verification" | "Verified" | "Approved for Public Use" | "Archived";
  permissionStatus?: "Approved for Public Use" | "Needs Verification" | "Anonymized";
  pipelineStages: {
    stage: string;
    subtext: string;
  }[];
  outcomes: {
    direction: "up" | "down";
    label: string;
  }[];
  results: {
    metric: string;
    label: string;
    description: string;
    isVerified?: boolean;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    designation: string;
    company: string;
  };
  technologiesUsed: string[];
  storytellingStages?: {
    stageNumber?: number;
    title?: string;
    headline?: string;
    description?: string;
    badge?: string;
    stage?: string;
    subtext?: string;
  }[];
  implementationApproach?: string;
  whatAravChanged?: string;
  businessImpact?: string;
  finalOutcome?: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    slug: "enterprise-cloud-transformation",
    title: "Enterprise Cloud Migration & Architecture Blueprint",
    client: "Service Capability Blueprint",
    clientIndustry: "Financial Technology & Logistics",
    serviceCategory: "IT Strategy & Implementation",
    serviceSlug: "it-strategy-implementation",
    location: "Global Framework",
    verificationStatus: "Approved for Public Use",
    permissionStatus: "Anonymized",
    summary:
      "Engineering blueprint illustrating cloud migration patterns, containerized microservices, and infrastructure governance.",
    challenge:
      "Organizations facing fragmented legacy architecture, high server maintenance overhead, and unaligned deployment workflows.",
    objective:
      "Architect a resilient multi-cloud framework with automated failover, container orchestration, and cloud cost governance.",
    approach:
      "Structured 4-week architectural discovery, containerized Kubernetes target topology on AWS, and phased database migration planning.",
    solution:
      "Modular microservices architecture with automated CI/CD deployment pipelines and multi-region backup failover.",
    pipelineStages: [
      { stage: "LEGACY MONOLITH", subtext: "Infrastructure Bottleneck Audit" },
      { stage: "CLOUD ARCHITECTURE", subtext: "Kubernetes Target State" },
      { stage: "MICROSERVICES", subtext: "Containerized Workloads" },
      { stage: "AUTOMATED CI/CD", subtext: "Automated Release Pipelines" },
    ],
    outcomes: [
      { direction: "down", label: "Infrastructure complexity" },
      { direction: "up", label: "Deployment velocity" },
      { direction: "up", label: "System reliability" },
    ],
    results: [
      {
        metric: "High Availability",
        label: "Target Uptime SLA",
        description: "Architected for continuous availability across transactional service endpoints.",
      },
      {
        metric: "FinOps",
        label: "Cost Governance",
        description: "Infrastructure right-sizing via automated autoscaling policies.",
      },
      {
        metric: "CI/CD",
        label: "Release Automation",
        description: "Automated deployment pipelines reducing manual release overhead.",
      },
    ],
    technologiesUsed: ["AWS", "Kubernetes", "Docker", "Terraform", "PostgreSQL", "Redis"],
  },
  {
    slug: "saas-portal-engineering",
    title: "High-Performance Web Platform & Portal Engineering Blueprint",
    client: "Service Capability Blueprint",
    clientIndustry: "B2B Enterprise Software",
    serviceCategory: "Web & Application Development",
    serviceSlug: "web-app-development",
    location: "UAE & India",
    verificationStatus: "Approved for Public Use",
    permissionStatus: "Anonymized",
    summary:
      "Engineering blueprint for customer portals with responsive Next.js architectures, API gateways, and enterprise integrations.",
    challenge:
      "Legacy web portals experiencing high load latency, brittle frontends, and fragmented user workflows.",
    objective:
      "Re-engineer the frontend into a responsive Next.js application with modular components and clean API data layers.",
    approach:
      "Created an enterprise design system in Figma, engineered typed React/Next.js components, and integrated REST/GraphQL APIs.",
    solution:
      "Modern web portal powered by Server-Side Rendering (SSR), edge caching, and automated integration testing.",
    pipelineStages: [
      { stage: "LEGACY REVIEW", subtext: "Performance Bottleneck Audit" },
      { stage: "NEXT.JS APP ROUTER", subtext: "Edge Rendering Architecture" },
      { stage: "DESIGN SYSTEM", subtext: "Accessible UX Components" },
      { stage: "INTEGRATED APIS", subtext: "Data Layer Optimization" },
    ],
    outcomes: [
      { direction: "down", label: "Page load latency" },
      { direction: "up", label: "User engagement" },
      { direction: "down", label: "Support overhead" },
    ],
    results: [
      {
        metric: "Optimized",
        label: "Core Web Vitals",
        description: "Enhanced page load metrics across mobile and desktop devices.",
      },
      {
        metric: "Modular",
        label: "Component Library",
        description: "Reusable design system accelerating new feature delivery.",
      },
      {
        metric: "Accessible",
        label: "User Interface",
        description: "Streamlined navigation reducing user friction.",
      },
    ],
    technologiesUsed: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "PostgreSQL"],
  },
  {
    slug: "b2b-demand-generation",
    title: "Full-Funnel B2B Growth & Technical SEO Strategy Blueprint",
    client: "Service Capability Blueprint",
    clientIndustry: "Industrial & Professional Services",
    serviceCategory: "Digital Marketing & Brand Development",
    serviceSlug: "digital-marketing-brand-development",
    location: "Global Framework",
    verificationStatus: "Approved for Public Use",
    permissionStatus: "Anonymized",
    summary:
      "Growth framework aligning paid search, account-based targeting, technical SEO, and CRM attribution.",
    challenge:
      "Unstructured ad spend on generic keywords with no CRM integration or visibility into buyer journey stages.",
    objective:
      "Deploy account-based marketing on LinkedIn and high-intent search campaigns while implementing technical SEO.",
    approach:
      "Audited search queries, rebuilt conversion landing pages, connected CRM tracking webhooks, and published targeted content.",
    solution:
      "A synchronized acquisition engine combining paid media with technical SEO and automated lead routing.",
    pipelineStages: [
      { stage: "AUDIT & RESEARCH", subtext: "Buyer Journey Mapping" },
      { stage: "TECHNICAL SEO", subtext: "Topical Authority Strategy" },
      { stage: "ABM CAMPAIGNS", subtext: "Account-Based Targeting" },
      { stage: "CRM ATTRIBUTION", subtext: "Closed-Loop Revenue Tracking" },
    ],
    outcomes: [
      { direction: "up", label: "Qualified pipeline" },
      { direction: "down", label: "Cost per acquisition" },
      { direction: "up", label: "Search reach" },
    ],
    results: [
      {
        metric: "Attributed",
        label: "Pipeline Tracking",
        description: "Closed-loop CRM tracking connecting campaigns to opportunities.",
      },
      {
        metric: "Efficient",
        label: "Ad Acquisition",
        description: "Refined keyword targeting driving lower cost-per-lead.",
      },
      {
        metric: "Expanded",
        label: "Search Visibility",
        description: "Increased organic reach across core solution keywords.",
      },
    ],
    technologiesUsed: ["Google Ads", "LinkedIn Campaign Manager", "HubSpot", "GA4", "Next.js Landing Pages"],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((c) => c.slug === slug);
}
