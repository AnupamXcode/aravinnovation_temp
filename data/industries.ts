export interface IndustrySolution {
  slug: string;
  name: string;
  description: string;
  icon: string;
  capabilities: string[];
  challenges: string[];
  aravApproach: string;
  recommendedTech: string[];
  expectedOutcome: string;
  ctaText?: string;
  relatedCaseStudySlug?: string;
}

export const industriesData: IndustrySolution[] = [
  {
    slug: "fintech-financial-services",
    name: "FinTech & Financial Services",
    description:
      "Secure digital banking portals, automated compliance workflows, and high-concurrency transaction architectures aligned with DPDP India and UAE Central Bank guidelines.",
    icon: "Building2",
    challenges: [
      "Regulatory compliance pressures (DPDP, SOC-2, ISO27001)",
      "High transaction latency and legacy core banking bottlenecks",
      "Data security vulnerabilities in multi-cloud integrations",
      "Rigid customer onboarding and slow KYC verification flows",
    ],
    aravApproach:
      "We design zero-trust financial architecture with built-in audit logging, sub-second API response rates, and automated governance frameworks.",
    capabilities: [
      "Risk, Compliance & Governance (GRC)",
      "Web & Custom Application Engineering",
      "IT Strategy & Cloud Architecture",
      "System Health & Security Audits",
    ],
    recommendedTech: ["Next.js", "TypeScript", "PostgreSQL", "AWS / Azure FinTech Cloud", "Redis"],
    expectedOutcome:
      "Achieve SOC-2 readiness, reduce onboarding drop-off rates, and maintain 99.99% system availability under peak loads.",
    ctaText: "Discuss FinTech Architecture",
  },
  {
    slug: "b2b-saas-enterprise-tech",
    name: "B2B SaaS & Enterprise Tech",
    description:
      "Modern application modernization, multi-tenant cloud engineering, technical SEO clusters, and high-intent B2B customer acquisition pipelines.",
    icon: "Cpu",
    challenges: [
      "High customer acquisition cost (CAC) and weak organic discovery",
      "Legacy codebase technical debt hindering feature releases",
      "Lack of structured B2B marketing funnels for decision makers",
      "Difficulty scaling engineering teams for specialized tech stacks",
    ],
    aravApproach:
      "We build high-performance web platforms coupled with technical AEO/SEO strategies and on-demand engineering squads to accelerate product velocity.",
    capabilities: [
      "Web & Application Engineering",
      "SEO & Generative Engine Discovery",
      "Digital Marketing & Brand Authority",
      "Training & Staff Augmentation",
    ],
    recommendedTech: ["Next.js App Router", "Tailwind CSS", "Node.js / Python", "GraphQL", "Vercel / AWS"],
    expectedOutcome:
      "Reduce page load time below 1 second, increase qualified organic leads, and scale sprint capacity on demand.",
    ctaText: "Explore SaaS Scaling",
  },
  {
    slug: "healthcare-healthtech",
    name: "Healthcare & HealthTech",
    description:
      "Patient data privacy governance, telehealth portals, clinical workflow automation, and regional health data protection compliance.",
    icon: "HeartPulse",
    challenges: [
      "Strict data privacy regulations (HIPAA, DPDP, DHA/DOH UAE)",
      "Fragmented electronic health record (EHR) systems",
      "Poor mobile user experience for patient scheduling and consultation",
      "Unoptimized cloud infrastructure costs for imaging data",
    ],
    aravApproach:
      "We engineer HIPAA/DPDP-compliant data pipelines and patient-centric portals with zero data leakage and smooth EHR integration.",
    capabilities: [
      "Risk, Compliance & Governance",
      "Web & Application Engineering",
      "Audit & FinOps Improvement",
      "Training & Staff Augmentation",
    ],
    recommendedTech: ["React / Next.js", "Encrypted PostgreSQL", "FHIR APIs", "Tailwind CSS", "AWS HealthLake"],
    expectedOutcome:
      "Ensure 100% data privacy compliance, streamline patient booking journeys, and lower cloud hosting overhead.",
    ctaText: "Review HealthTech Governance",
  },
  {
    slug: "professional-services-consulting",
    name: "Professional Services & Consulting",
    description:
      "High-authority brand positioning, client portals, technical search optimization, and automated lead capture systems for legal, accounting, and advisory firms.",
    icon: "Briefcase",
    challenges: [
      "Generic brand perception failing to attract enterprise clients",
      "Manual client onboarding and proposal workflows",
      "Low visibility on Google Search for high-value practice areas",
      "Disconnected CRM and sales pipeline data",
    ],
    aravApproach:
      "We craft authoritative digital brand experiences, technical SEO content architecture, and automated client intake portals.",
    capabilities: [
      "Digital Marketing & Brand Authority",
      "SEO & Generative Discovery",
      "Web & Custom Application Engineering",
      "IT Strategy & Implementation",
    ],
    recommendedTech: ["Next.js", "Tailwind CSS", "HubSpot / Salesforce Integrations", "Analytics Engines"],
    expectedOutcome:
      "Establish market authority, increase inbound consultation inquiries, and automate client intake tasks.",
    ctaText: "Elevate Brand Authority",
  },
  {
    slug: "ecommerce-retail",
    name: "Retail & E-Commerce",
    description:
      "Headless storefronts, sub-second product pages, omnichannel performance marketing, and automated inventory sync architectures.",
    icon: "ShoppingBag",
    challenges: [
      "Slow mobile loading speeds leading to cart abandonment",
      "Unpredictable traffic surges causing server downtime during sales",
      "High ad spends with unclear multi-channel attribution",
      "Manual multi-warehouse inventory updates",
    ],
    aravApproach:
      "We replace monolithic storefronts with headless Next.js platforms optimized for Core Web Vitals and deploy performance marketing funnels.",
    capabilities: [
      "Web & Application Engineering",
      "Digital Marketing & Brand Development",
      "SEO & Generative Discovery",
      "Audit & Performance Improvement",
    ],
    recommendedTech: ["Headless Next.js", "Shopify Plus / Custom CMS", "Tailwind CSS", "Algolia Search", "Stripe / Razorpay"],
    expectedOutcome:
      "Sub-800ms page load speeds, higher mobile conversion rates, and unified cross-channel analytics.",
    ctaText: "Boost E-Commerce Conversion",
  },
  {
    slug: "education-edtech",
    name: "Education & EdTech Platforms",
    description:
      "Scalable learning management portals, interactive course delivery, organic search authority hubs, and institutional staff training.",
    icon: "GraduationCap",
    challenges: [
      "High video streaming latency during concurrent live classes",
      "Low organic enrollment traffic due to unstructured search content",
      "Complex student credentialing and assessment management",
      "Escalating cloud server costs for digital media storage",
    ],
    aravApproach:
      "We build resilient learning management interfaces, optimize media delivery CDNs, and execute topical authority SEO hubs.",
    capabilities: [
      "Web & Custom Application Engineering",
      "SEO & Generative Discovery",
      "Audit & FinOps Improvement",
      "Training & Staff Augmentation",
    ],
    recommendedTech: ["Next.js", "Node.js", "AWS CloudFront", "Tailwind CSS", "PostgreSQL"],
    expectedOutcome:
      "Smooth multi-device learning experiences, lower media delivery costs, and sustained organic organic traffic growth.",
    ctaText: "Explore EdTech Platforms",
  },
  {
    slug: "manufacturing-industrial-tech",
    name: "Manufacturing & Industrial Tech",
    description:
      "Operational dashboards, IoT telemetry interfaces, IT/OT security compliance, and cloud migration roadmaps for industrial enterprises.",
    icon: "Factory",
    challenges: [
      "Legacy on-premises software isolated from modern business tools",
      "Lack of real-time visibility into shop-floor operational metrics",
      "Heightened cybersecurity risks across connected industrial devices",
      "Difficulty recruiting specialized software engineers",
    ],
    aravApproach:
      "We construct real-time operational monitoring portals and conduct thorough IT/OT governance audits to modernize industrial operations safely.",
    capabilities: [
      "IT Strategy & Implementation",
      "Risk, Compliance & Governance",
      "Web & Application Engineering",
      "Training & Staff Augmentation",
    ],
    recommendedTech: ["Next.js", "TypeScript", "MQTT / REST Gateways", "AWS IoT Core", "Tailwind CSS"],
    expectedOutcome:
      "Unified operational dashboards, reduced equipment downtime risks, and modernized IT governance.",
    ctaText: "Modernize Industrial Tech",
  },
  {
    slug: "realestate-proptech",
    name: "Real Estate & PropTech",
    description:
      "High-performance property portals, interactive virtual tour integrations, lead qualification funnels, and CRM automation.",
    icon: "Home",
    challenges: [
      "Slow property search filters and image-heavy page slowdowns",
      "Unqualified leads cluttering sales agent pipelines",
      "Fragmented listing data across regional property MLS portals",
      "Weak search visibility for premium commercial & residential keywords",
    ],
    aravApproach:
      "We build sub-second search platforms, implement technical SEO strategies, and integrate automated chatbot lead qualification.",
    capabilities: [
      "Web & Application Engineering",
      "SEO & Generative Discovery",
      "Digital Marketing & Brand Authority",
      "AI & Portfolio Solutions",
    ],
    recommendedTech: ["Next.js App Router", "Tailwind CSS", "PostGIS / ElasticSearch", "Cloudinary", "Mapbox APIs"],
    expectedOutcome:
      "Instant property filter results, higher qualified lead volume, and dominating local search rankings.",
    ctaText: "Build PropTech Platform",
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    description:
      "Real-time shipment tracking dashboards, partner dispatch portals, cloud cost optimization, and legacy fleet system modernizations.",
    icon: "Truck",
    challenges: [
      "Unreliable tracking updates across multi-vendor carrier routes",
      "Manual order dispatching creating operational bottlenecks",
      "Overpriced cloud infrastructure running outdated database queries",
      "Difficulty capturing high-value B2B freight contracts online",
    ],
    aravApproach:
      "We modernize legacy tracking backend infrastructure, build intuitive web interfaces, and optimize cloud resource consumption.",
    capabilities: [
      "IT Strategy & Cloud Modernization",
      "Web & Custom Application Engineering",
      "Audit & FinOps Improvement",
      "Digital Marketing & Brand Authority",
    ],
    recommendedTech: ["Next.js", "WebSockets / Server-Sent Events", "PostgreSQL", "Docker / K8s", "Tailwind CSS"],
    expectedOutcome:
      "Real-time tracking accuracy, 30%+ reduction in cloud hosting bills, and automated dispatch workflows.",
    ctaText: "Optimize Supply Chain",
  },
  {
    slug: "startups-scaleups",
    name: "Startups & High-Growth Scale-Ups",
    description:
      "Rapid MVP development, technical architecture validation, fractional CTO guidance, and quick engineering talent augmentation.",
    icon: "Rocket",
    challenges: [
      "Tight deadlines to launch product before funding milestones",
      "Unclear architectural choices leading to early tech debt",
      "High cost of hiring full-time senior engineers in competitive markets",
      "Lack of focus on security and initial regulatory readiness",
    ],
    aravApproach:
      "We provide battle-tested Next.js boilerplates, strategic fractional tech leadership, and dedicated engineering pods ready in days.",
    capabilities: [
      "Web & Application Engineering",
      "IT Strategy & Implementation",
      "Training & Staff Augmentation",
      "AI & Portfolio Solutions",
    ],
    recommendedTech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase / PostgreSQL", "Vercel"],
    expectedOutcome:
      "Launch market-ready web platforms 2x faster with scalable clean architecture and zero early tech debt.",
    ctaText: "Accelerate Startup MVP",
  },
];

