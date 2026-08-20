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
    client: "[CLIENT CONFIDENTIAL / LOGO PENDING APPROVAL]",
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
    results: [
      {
        metric: "[CONTENT REQUIRED FROM ARAV]",
        label: "System Uptime Benchmark",
        description: "Achieved continuous high availability across critical transaction endpoints.",
      },
      {
        metric: "[CONTENT REQUIRED FROM ARAV]",
        label: "Infrastructure Cost Optimization",
        description: "Reduced monthly infrastructure overhead via automated autoscaling and resource right-sizing.",
      },
      {
        metric: "[CONTENT REQUIRED FROM ARAV]",
        label: "Deployment Latency Reduction",
        description: "Accelerated production release velocity through automated CI/CD pipelines.",
      },
    ],
    testimonial: {
      quote:
        "[CONTENT REQUIRED FROM ARAV - Client testimonial quote to be inserted upon verified signoff]",
      author: "[CLIENT EXECUTIVE NAME PENDING]",
      designation: "Chief Technology Officer",
      company: "[COMPANY NAME PENDING APPROVAL]",
    },
    technologiesUsed: ["AWS", "Kubernetes", "Docker", "Terraform", "PostgreSQL", "Redis"],
  },
  {
    slug: "saas-portal-engineering",
    title: "High-Performance Modern Web Platform & Portal Engineering",
    client: "[CLIENT CONFIDENTIAL / LOGO PENDING APPROVAL]",
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
    results: [
      {
        metric: "[CONTENT REQUIRED FROM ARAV]",
        label: "PageSpeed Score",
        description: "Enhanced Core Web Vitals across mobile and desktop devices.",
      },
      {
        metric: "[CONTENT REQUIRED FROM ARAV]",
        label: "User Engagement Rate",
        description: "Increased daily active engagement on self-service customer features.",
      },
      {
        metric: "[CONTENT REQUIRED FROM ARAV]",
        label: "Support Ticket Reduction",
        description: "Decreased usability-related support inquiries through streamlined workflows.",
      },
    ],
    testimonial: {
      quote:
        "[CONTENT REQUIRED FROM ARAV - Client testimonial quote to be inserted upon verified signoff]",
      author: "[CLIENT EXECUTIVE NAME PENDING]",
      designation: "Head of Digital Products",
      company: "[COMPANY NAME PENDING APPROVAL]",
    },
    technologiesUsed: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "PostgreSQL"],
  },
  {
    slug: "b2b-demand-generation",
    title: "Full-Funnel B2B Demand Generation & Search Expansion",
    client: "[CLIENT CONFIDENTIAL / LOGO PENDING APPROVAL]",
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
    results: [
      {
        metric: "[CONTENT REQUIRED FROM ARAV]",
        label: "Sales Qualified Pipeline",
        description: "Generated qualified enterprise sales conversations within target accounts.",
      },
      {
        metric: "[CONTENT REQUIRED FROM ARAV]",
        label: "Cost Per Opportunity",
        description: "Reduced acquisition cost per qualified sales meeting.",
      },
      {
        metric: "[CONTENT REQUIRED FROM ARAV]",
        label: "Non-Brand Organic Search Reach",
        description: "Expanded organic search footprint across high-intent solution keywords.",
      },
    ],
    testimonial: {
      quote:
        "[CONTENT REQUIRED FROM ARAV - Client testimonial quote to be inserted upon verified signoff]",
      author: "[CLIENT EXECUTIVE NAME PENDING]",
      designation: "VP of Business Development",
      company: "[COMPANY NAME PENDING APPROVAL]",
    },
    technologiesUsed: ["Google Ads", "LinkedIn Campaign Manager", "HubSpot", "GA4", "Next.js CRO Pages"],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((c) => c.slug === slug);
}
