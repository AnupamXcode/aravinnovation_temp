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
  }[];
  testimonial?: {
    quote: string;
    author: string;
    designation: string;
    company: string;
  };
  technologiesUsed: string[];
}

export const caseStudiesData: CaseStudy[] = [
  {
    slug: "enterprise-cloud-transformation",
    title: "Enterprise Cloud Migration & Architecture Modernization",
    client: "Confidential Global FinTech & Logistics Enterprise",
    clientIndustry: "Financial Technology & Logistics",
    serviceCategory: "IT Strategy & Consulting",
    serviceSlug: "it-strategy-consulting",
    location: "Global",
    summary:
      "Transitioning an on-premise monolithic architecture to a high-availability cloud-native microservices infrastructure.",
    challenge:
      "The client was experiencing frequent system timeouts during peak business hours and spiraling on-premise maintenance costs with no clear roadmap for cloud adoption.",
    objective:
      "Design a resilient multi-cloud architecture with zero data loss, eliminate single points of failure, and establish automated FinOps governance.",
    approach:
      "Conducted a 4-week architectural discovery audit, established a containerized Kubernetes target state on AWS, and executed a zero-downtime phased database migration.",
    solution:
      "Implemented modular microservices with automated CI/CD pipelines, containerized orchestration, and multi-region disaster recovery failover.",
    pipelineStages: [
      { stage: "LEGACY MONOLITH", subtext: "On-Premise Bottleneck" },
      { stage: "CLOUD ARCHITECTURE", subtext: "AWS Kubernetes Cluster" },
      { stage: "MICROSERVICES", subtext: "Containerized Workloads" },
      { stage: "AUTOMATED CI/CD", subtext: "Zero-Downtime Releases" },
    ],
    outcomes: [
      { direction: "down", label: "Infrastructure complexity" },
      { direction: "up", label: "Deployment velocity" },
      { direction: "up", label: "System reliability" },
    ],
    results: [
      {
        metric: "99.99%",
        label: "System Uptime SLA",
        description: "Achieved continuous high availability across critical transaction endpoints.",
      },
      {
        metric: "45%",
        label: "Cloud Cost Optimization",
        description: "Reduced monthly infrastructure overhead via automated autoscaling and resource right-sizing.",
      },
      {
        metric: "3.2x",
        label: "Deployment Velocity",
        description: "Accelerated production release frequency through automated CI/CD pipelines.",
      },
    ],
    testimonial: {
      quote:
        "Arav Innovations modernized our core architecture with zero downtime. Their senior engineering squad delivered ahead of schedule.",
      author: "Executive Vice President",
      designation: "Chief Technology Officer",
      company: "Global Logistics & FinTech Division",
    },
    technologiesUsed: ["AWS", "Kubernetes", "Docker", "Terraform", "PostgreSQL", "Redis"],
  },
  {
    slug: "saas-portal-engineering",
    title: "High-Performance Modern Web Platform & Portal Engineering",
    client: "Confidential B2B Enterprise Software Client",
    clientIndustry: "B2B Enterprise Software",
    serviceCategory: "Web & App Development",
    serviceSlug: "web-app-development",
    location: "UAE & GCC",
    summary:
      "Architecting a next-generation customer portal with sub-second page loads and seamless enterprise ERP integrations.",
    challenge:
      "The legacy portal had an average load time exceeding 6 seconds, leading to customer frustration, high support tickets, and low feature adoption.",
    objective:
      "Re-engineer the entire frontend into a lightning-fast Next.js application with real-time telemetry, intuitive UX, and mobile responsiveness.",
    approach:
      "Created an enterprise design system in Figma, engineered reusable React/Next.js components with TypeScript, and integrated secure GraphQL/REST APIs.",
    solution:
      "Delivered a modern, accessible web portal powered by Server-Side Rendering (SSR), edge caching, and automated integration testing.",
    pipelineStages: [
      { stage: "LEGACY MONOLITH", subtext: "6s+ Load Latency" },
      { stage: "NEXT.JS APP ROUTER", subtext: "Sub-Second Edge Rendering" },
      { stage: "DESIGN SYSTEM", subtext: "Accessible UX Components" },
      { stage: "INTEGRATED ERP", subtext: "Real-Time Telemetry" },
    ],
    outcomes: [
      { direction: "down", label: "Page load latency" },
      { direction: "up", label: "User engagement" },
      { direction: "down", label: "Support tickets" },
    ],
    results: [
      {
        metric: "98/100",
        label: "Mobile PageSpeed",
        description: "Enhanced Core Web Vitals across mobile and desktop devices.",
      },
      {
        metric: "2.4x",
        label: "User Engagement Rate",
        description: "Increased daily active engagement on self-service customer features.",
      },
      {
        metric: "60%",
        label: "Support Ticket Reduction",
        description: "Decreased usability-related support inquiries through streamlined workflows.",
      },
    ],
    testimonial: {
      quote:
        "The new Next.js portal built by Arav reduced customer onboarding friction and vastly improved our platform NPS scores.",
      author: "Head of Digital Products",
      designation: "VP of Product Engineering",
      company: "Enterprise Software Division",
    },
    technologiesUsed: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "PostgreSQL"],
  },
  {
    slug: "b2b-demand-generation",
    title: "Full-Funnel B2B Demand Generation & Search Expansion",
    client: "Confidential Industrial & Professional Services Group",
    clientIndustry: "Industrial & Professional Services",
    serviceCategory: "Digital Marketing & SEO",
    serviceSlug: "digital-marketing",
    location: "India",
    summary:
      "Restructuring paid acquisition and organic search to generate qualified enterprise opportunities with verified multi-touch attribution.",
    challenge:
      "The company was burning ad budget on low-intent generic keywords with no CRM integration or visibility into pipeline revenue.",
    objective:
      "Deploy account-based marketing on LinkedIn and high-intent Google Search campaigns while implementing technical SEO to capture organic search traffic.",
    approach:
      "Audited search queries, rebuilt conversion landing pages, connected HubSpot server-side tracking, and published targeted topical authority content.",
    solution:
      "A synchronized multi-channel acquisition engine combining paid media with technical SEO and programmatic lead nurturing workflows.",
    pipelineStages: [
      { stage: "UNSTRUCTURED ADS", subtext: "Low-Intent Traffic" },
      { stage: "TECHNICAL SEO", subtext: "Topical Authority Hubs" },
      { stage: "ABM CAMPAIGNS", subtext: "High-Intent Enterprise Targeting" },
      { stage: "CRM ATTRIBUTION", subtext: "Closed-Loop Revenue Funnel" },
    ],
    outcomes: [
      { direction: "up", label: "Qualified pipeline" },
      { direction: "down", label: "Cost per acquisition" },
      { direction: "up", label: "Search reach" },
    ],
    results: [
      {
        metric: "3.4x",
        label: "Sales Qualified Pipeline",
        description: "Generated qualified enterprise sales conversations within target accounts.",
      },
      {
        metric: "35%",
        label: "CPA Reduction",
        description: "Reduced acquisition cost per qualified sales meeting.",
      },
      {
        metric: "180%",
        label: "Organic Search Reach",
        description: "Expanded organic search footprint across high-intent solution keywords.",
      },
    ],
    testimonial: {
      quote:
        "Arav Innovations transformed our digital marketing into a measurable lead generation pipeline with clear revenue attribution.",
      author: "VP of Business Development",
      designation: "Commercial Operations Director",
      company: "Industrial Services Group",
    },
    technologiesUsed: ["Google Ads", "LinkedIn Campaign Manager", "HubSpot", "GA4", "Next.js CRO Pages"],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((c) => c.slug === slug);
}
