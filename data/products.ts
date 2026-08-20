export interface ProductFeature {
  title: string;
  description: string;
  iconName?: string;
}

export interface ProductUseCase {
  title: string;
  description: string;
  targetRole?: string;
}

export interface ProductHowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface ProductProofPoint {
  metric: string;
  label: string;
  detail: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  badge?: string;
  pricingModel: "demo-only" | "starting-from" | "custom-quote";
  pricingStartingAt?: string;
  pricingNote?: string;
  features: string[]; // string[] matching spec
  featureDetails?: ProductFeature[]; // rich metadata for template
  useCases: string[]; // string[] matching spec
  useCaseDetails?: ProductUseCase[];
  problemSolved: {
    title: string;
    points: string[];
  };
  howItWorks: ProductHowItWorksStep[];
  targetAudience: string[];
  integrations: string[];
  techStack: string[];
  proofPoint: ProductProofPoint;
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServiceSlug?: string;
}

export const productsData: Product[] = [
  {
    slug: "arav-compliance-guard",
    name: "Arav ComplianceGuard™",
    category: "Risk & Governance",
    badge: "Enterprise Suite",
    tagline: "Automated DPDP Act & GDPR Data Principal Governance Platform",
    description:
      "An automated compliance and consent orchestration platform designed for Indian and UAE enterprises to map personal data flows, manage Data Principal consent records, and maintain continuous regulatory audit trails.",
    pricingModel: "demo-only",
    pricingNote: "Custom enterprise licensing based on data volume & cloud environment.",
    features: [
      "Real-time Data Principal consent lifecycle manager with audit logs",
      "Automated personal data asset discovery across multi-cloud databases",
      "One-click Data Subject Access Request (DSAR) fulfillment workflows",
      "Automated vendor risk posture & sub-processor compliance tracker",
      "DPDP (India) & UAE Data Protection Law pre-configured policy templates",
      "Instant compliance export readiness for statutory audit bodies",
    ],
    featureDetails: [
      {
        title: "Consent Lifecycle Orchestration",
        description:
          "Granular, verifiable consent capture widgets and backend revocation pipelines aligned directly with India's DPDP Act mandates.",
        iconName: "ShieldCheck",
      },
      {
        title: "Automated Data Discovery",
        description:
          "Continuous scanning of PostgreSQL, MongoDB, DynamoDB, and Snowflake to identify and catalog PII / sensitive personal data touchpoints.",
        iconName: "Search",
      },
      {
        title: "DSAR Request Automation",
        description:
          "Self-serve consumer privacy portal for data correction, grievance redressal, and automated erasure execution with verifiable cryptographic proofs.",
        iconName: "FileCheck2",
      },
      {
        title: "Multi-Cloud Governance Hub",
        description:
          "Centralized security posture dashboard unifying AWS, Azure, and on-premise infrastructure data residency boundaries.",
        iconName: "Layers",
      },
    ],
    useCases: [
      "BFSI & FinTech platforms processing high-velocity Indian consumer transactions",
      "E-Commerce & D2C applications requiring dynamic checkout consent management",
      "Healthcare & Telehealth portals handling sensitive medical records",
      "Enterprise B2B SaaS companies expanding into India and GCC markets",
    ],
    useCaseDetails: [
      {
        title: "FinTech & Banking Compliance",
        description:
          "Guarantee DPDP Act consent auditability for KYC and high-frequency loan origination workflows without degrading transaction throughput.",
        targetRole: "Chief Risk Officers & CISOs",
      },
      {
        title: "Enterprise Multi-Region SaaS",
        description:
          "Isolate customer data records between India, UAE, and European regions with automated residency enforcement.",
        targetRole: "VP of Engineering & Head of Architecture",
      },
    ],
    problemSolved: {
      title: "Eliminating the High Cost of Manual Privacy Compliance",
      points: [
        "Manual consent tracking spreadsheets create severe liability under India's DPDP Act with penalties up to ₹250 Crores.",
        "Engineering teams waste hundreds of hours manually fulfilling data subject erasure and correction requests.",
        "Unmapped shadow databases and legacy logs secretly store PII without retention lifecycle management.",
        "Lack of unified audit logs makes passing external compliance verification time-consuming and prone to human error.",
      ],
    },
    howItWorks: [
      {
        step: 1,
        title: "Connect & Discover",
        description:
          "Deploy non-intrusive read-only connectors to your cloud databases and APIs to automatically index data schemas and PII tags.",
      },
      {
        step: 2,
        title: "Embed Consent Workflows",
        description:
          "Drop in lightweight, zero-latency consent SDKs onto web portals and mobile applications to capture explicit user consent.",
      },
      {
        step: 3,
        title: "Automate Governance & Audits",
        description:
          "Trigger automated DSAR workflows, enforce retention limits, and generate audit-ready compliance certificates on demand.",
      },
    ],
    targetAudience: [
      "Chief Information Security Officers (CISOs)",
      "Chief Technology Officers (CTOs)",
      "Data Protection Officers (DPOs) & Legal Counsel",
      "Heads of Engineering & Cloud Architecture",
    ],
    integrations: [
      "AWS RDS & DynamoDB",
      "Azure SQL & CosmosDB",
      "PostgreSQL & MySQL",
      "Snowflake & BigQuery",
      "Salesforce & HubSpot CRM",
      "Segment & Mixpanel",
    ],
    techStack: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Rust Core Engine",
      "PostgreSQL with Row-Level Security",
      "Cloudflare Edge Workers",
    ],
    proofPoint: {
      metric: "100%",
      label: "Statutory DPDP Audit Readiness",
      detail:
        "Reduced client DSAR turnaround times from 14 business days to under 15 minutes with automated verification logs.",
    },
    faqs: [
      {
        question: "How does Arav ComplianceGuard integrate into our existing software stack?",
        answer:
          "ComplianceGuard operates via zero-overhead API connectors and lightweight frontend SDKs (compatible with Next.js, React, Node.js, and Python). Deployment takes less than 2 days without modifying core database schemas.",
      },
      {
        question: "Does ComplianceGuard store our customer's personal data?",
        answer:
          "No. ComplianceGuard operates on metadata and cryptographic hashes of consent receipts. Your underlying customer data remains securely inside your own private cloud or on-premise infrastructure.",
      },
      {
        question: "Is this compliant with both India's DPDP Act and UAE Data Protection laws?",
        answer:
          "Yes. The platform includes built-in rule engines for India's Digital Personal Data Protection (DPDP) Act 2023, UAE Federal Decree-Law No. 45/2021, and EU GDPR.",
      },
      {
        question: "Can we request a customized demo tailored to our architecture?",
        answer:
          "Yes. Our engineering directors conduct tailored technical walk-throughs and architecture compatibility assessments for enterprise teams.",
      },
    ],
    relatedServiceSlug: "risk-governance-compliance",
  },
  {
    slug: "arav-cloud-finops-optimizer",
    name: "Arav CloudOptima™",
    category: "Cloud & DevOps",
    badge: "Enterprise Tool",
    tagline: "Continuous Multi-Cloud Cost Optimization & Kubernetes FinOps Intelligence",
    description:
      "An automated cloud governance and cost optimization platform that identifies over-provisioned cloud infrastructure, eliminates zombie resources, and cuts AWS/Azure spend by 25% to 40%.",
    pricingModel: "custom-quote",
    pricingNote: "Performance-linked or fixed monthly enterprise tier.",
    features: [
      "Continuous Kubernetes cluster right-sizing and spot instance orchestration",
      "Automated idle database and orphaned snapshot purge policies",
      "Real-time multi-cloud spend anomaly alerts via Slack and Microsoft Teams",
      "Closed-loop unit economics dashboard mapping cloud spend to revenue per customer",
      "AI-driven reserved instance and savings plan portfolio rebalancer",
      "Zero-downtime execution recommendations with automated Terraform PRs",
    ],
    featureDetails: [
      {
        title: "Kubernetes Dynamic Right-Sizing",
        description:
          "Live pod resource analysis and vertical pod autoscaling recommendations that eliminate over-allocated CPU and memory waste.",
        iconName: "Cpu",
      },
      {
        title: "Automated Waste Elimination",
        description:
          "Detect unattached EBS volumes, legacy RDS snapshots, unused Elastic IPs, and idle staging environments automatically.",
        iconName: "Trash2",
      },
      {
        title: "Unit Cost Economics",
        description:
          "Correlate cloud consumption directly to specific tenants, feature modules, and customer tiers for accurate gross margin tracking.",
        iconName: "BarChart3",
      },
      {
        title: "Terraform PR Generation",
        description:
          "Auto-generate infrastructure-as-code pull requests for cost remediations so your DevOps team can review and merge with zero friction.",
        iconName: "Code2",
      },
    ],
    useCases: [
      "Scale-ups and enterprises spending over $10,000/month on AWS, Azure, or GCP",
      "Organizations running high-concurrency microservices on Kubernetes (EKS / AKS / GKE)",
      "Tech teams preparing for fiscal audits or seeking immediate burn-rate reduction",
      "B2B SaaS platforms needing tenant-level cost attribution for profitability modeling",
    ],
    useCaseDetails: [
      {
        title: "Rapid Cloud Cost Reduction",
        description:
          "Uncover immediate 25%+ monthly infrastructure savings within 72 hours of read-only telemetry connection.",
        targetRole: "VP of Engineering & VP of Finance",
      },
      {
        title: "Kubernetes Fleet Governance",
        description:
          "Prevent microservice sprawl and resource over-provisioning across staging and production clusters.",
        targetRole: "DevOps & SRE Leads",
      },
    ],
    problemSolved: {
      title: "Stopping Spiraling Cloud Waste Without Compromising Availability",
      points: [
        "Over 30% of enterprise cloud spend is wasted on idle staging, over-provisioned nodes, and untracked storage.",
        "Native AWS and Azure billing dashboards are opaque, lagging by 24 hours, and fail to provide actionable code fixes.",
        "Engineering teams lack the time to manually audit hundreds of microservices and reserved instances.",
        "Uncontrolled auto-scaling during traffic spikes creates massive unexpected billing surges.",
      ],
    },
    howItWorks: [
      {
        step: 1,
        title: "Read-Only Cloud Audit",
        description:
          "Connect your AWS or Azure account using an IAM role with strictly read-only metadata permissions. No agent installation required.",
      },
      {
        step: 2,
        title: "Deep Heuristic Analysis",
        description:
          "Our algorithmic engine analyzes 30 days of CloudWatch/Azure Monitor metrics to identify utilization bottlenecks and idle workloads.",
      },
      {
        step: 3,
        title: "One-Click Remediate",
        description:
          "Apply automated safe policies or merge generated Terraform PRs to instantly lock in recurring monthly savings.",
      },
    ],
    targetAudience: [
      "Chief Technology Officers (CTOs)",
      "DevOps / SRE Practice Leads",
      "VP of Engineering",
      "CFOs & Finance Operations Directors",
    ],
    integrations: [
      "Amazon Web Services (AWS)",
      "Microsoft Azure",
      "Google Cloud Platform (GCP)",
      "Kubernetes (EKS / AKS / GKE)",
      "Terraform & OpenTofu",
      "Slack & Microsoft Teams",
    ],
    techStack: [
      "Go / Golang Microservices",
      "ClickHouse Analytics",
      "Next.js App Router",
      "Tailwind CSS",
      "AWS SDK v3",
    ],
    proofPoint: {
      metric: "34%",
      label: "Average Monthly Cloud Spend Saved",
      detail:
        "Demonstrated across client production workloads with zero system outages or performance degradation.",
    },
    faqs: [
      {
        question: "Does CloudOptima require root access to our cloud accounts?",
        answer:
          "No. CloudOptima connects via a restricted cross-account IAM role with strictly read-only access to metrics and billing metadata. It never accesses your application code, databases, or customer data.",
      },
      {
        question: "How quickly do we see actionable savings?",
        answer:
          "Initial telemetry analysis completes within 2 to 4 hours. A complete executive savings roadmap with exact Terraform pull requests is generated within 24 hours.",
      },
      {
        question: "Does this support multi-cloud architectures?",
        answer:
          "Yes. CloudOptima unifies billing and resource metrics across AWS, Microsoft Azure, Google Cloud, and hybrid Kubernetes clusters in a single pane of glass.",
      },
      {
        question: "Can we trial CloudOptima with our DevOps team?",
        answer:
          "Yes. We offer an exploratory 14-day zero-risk audit for qualified enterprise cloud environments.",
      },
    ],
    relatedServiceSlug: "it-strategy-consulting",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return productsData.map((p) => p.slug);
}
