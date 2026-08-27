export interface CapabilityCategory {
  category: string;
  items: string[];
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
  deliverable: string;
}

export interface TechnologyCategory {
  category: string;
  stack: string[];
}

export interface EngagementModel {
  title: string;
  description: string;
  bestFor: string;
  ctaText?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceResult {
  metric: string;
  label: string;
  context: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  tagline: string;
  description: string;
  icon: "Compass" | "Code2" | "TrendingUp" | "Search" | "ShieldCheck" | "BarChart3" | "Users2" | "Cpu" | "Sparkles";
  businessProblem: {
    title: string;
    description: string;
    painPoints: string[];
  };
  ourSolution: {
    title: string;
    description: string;
    keyPillars: { title: string; description: string }[];
  };
  capabilities: CapabilityCategory[];
  process: ServiceProcessStep[];
  technologies: TechnologyCategory[];
  engagementModels: EngagementModel[];
  results: ServiceResult[];
  faqs: ServiceFAQ[];
  relatedCaseStudySlugs: string[];
}

export const servicesData: Service[] = [
  {
    slug: "it-strategy-implementation",
    title: "IT Strategy and Implementation",
    shortTitle: "IT Strategy",
    eyebrow: "Enterprise Architecture • Digital Roadmaps • Infrastructure Modernization",
    tagline: "Aligning technology investments with bottom-line business profitability.",
    description:
      "We help forward-thinking enterprises modernize legacy infrastructure, formulate defensible multi-year technology roadmaps, and implement agile governance models that reduce operational friction and cloud costs.",
    icon: "Compass",
    businessProblem: {
      title: "The Enterprise Technology Bottleneck",
      description:
        "Many organizations suffer from fragmented IT ecosystems, ballooning cloud bills, and misalignment between executive business goals and engineering execution.",
      painPoints: [
        "Siloed departmental systems leading to delayed decision-making",
        "Uncontrolled cloud infrastructure expenditures and legacy technical debt",
        "Lack of a coherent digital roadmap to support geographic or product expansion",
        "Risk of vendor lock-in and security compliance blind spots",
      ],
    },
    ourSolution: {
      title: "Strategic Technology Advisory Engineered for ROI",
      description:
        "Our consulting practice merges deep architectural acumen with CFO-aligned financial rigor, establishing scalable digital foundations that scale predictably.",
      keyPillars: [
        {
          title: "Enterprise Architecture Modernization",
          description: "Transitioning monolithic legacy platforms to resilient microservices and cloud-native frameworks.",
        },
        {
          title: "Cloud & FinOps Optimization",
          description: "Auditing cloud utilization (AWS, Azure, GCP) to eliminate resource wastage and establish cost-governance guardrails.",
        },
        {
          title: "Digital Transformation Blueprints",
          description: "Structured multi-phase execution plans with measurable milestones, risk mitigation strategies, and timeline projections.",
        },
      ],
    },
    capabilities: [
      {
        category: "Strategy & Advisory",
        items: [
          "Enterprise Technology Roadmapping",
          "Cloud Migration Strategy (AWS, Azure, GCP)",
          "Legacy Modernization Assessment",
          "Vendor Evaluation & Selection",
        ],
      },
      {
        category: "Governance & Operations",
        items: [
          "FinOps & Cloud Cost Optimization",
          "DevOps Maturity & CI/CD Strategy",
          "Disaster Recovery & Business Continuity",
          "IT Operating Model Design",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Current-State Discovery",
        description: "Deep-dive audit of architecture, tech debt, team workflows, and cloud expenditure.",
        deliverable: "Comprehensive Technology Health Assessment",
      },
      {
        step: 2,
        title: "Target-State Blueprinting",
        description: "Defining optimal system architecture, data models, and tooling aligned with business goals.",
        deliverable: "Future-State Architecture Blueprint & Gap Analysis",
      },
      {
        step: 3,
        title: "Roadmap & Financial Modeling",
        description: "Sequencing initiatives by business impact, Capex/Opex modeling, and risk weighting.",
        deliverable: "12-36 Month Phased Execution Roadmap",
      },
      {
        step: 4,
        title: "Governance & Steering",
        description: "Overseeing migration execution, vendor coordination, and architectural compliance.",
        deliverable: "Bi-Weekly Architecture Steering & KPI Tracking",
      },
      {
        step: 5,
        title: "Value Realization Audit",
        description: "Validating operational speed, cost reduction metrics, and reliability benchmarks.",
        deliverable: "Post-Implementation ROI & Scalability Review",
      },
    ],
    technologies: [
      {
        category: "Cloud Platforms",
        stack: ["Amazon Web Services", "Microsoft Azure", "Google Cloud Platform", "Kubernetes"],
      },
      {
        category: "Enterprise Frameworks",
        stack: ["TOGAF", "ITIL v4", "Microservices", "Event-Driven Architecture", "Terraform"],
      },
    ],
    engagementModels: [
      {
        title: "Fractional CTO / Advisory Retainer",
        description: "Ongoing strategic guidance, architecture reviews, and executive advisory for growing enterprises.",
        bestFor: "Mid-market companies scaling tech without full-time executive overhead.",
        ctaText: "Inquire About Advisory",
      },
      {
        title: "Project-Based Strategy Sprint",
        description: "Time-boxed 4-8 week deep dive focusing on a specific migration, audit, or platform selection.",
        bestFor: "Companies facing imminent cloud migrations or architectural inflection points.",
        ctaText: "Book Strategy Sprint",
      },
    ],
    results: [
      {
        metric: "45%",
        label: "Cloud Cost Optimization",
        context: "Verified efficiency gains achieved across enterprise migration engagements.",
      },
      {
        metric: "3.2x",
        label: "Deployment Velocity",
        context: "Reduction in release cycle latency post CI/CD & architecture restructuring.",
      },
    ],
    faqs: [
      {
        question: "How does Arav Innovations work alongside our internal engineering leadership?",
        answer:
          "We operate as an extension of your leadership team. Rather than imposing rigid textbook templates, we co-design solutions with your VP of Engineering and technical architects to guarantee internal adoption.",
      },
      {
        question: "Do you assist with both Indian and UAE regulatory compliance in IT strategy?",
        answer:
          "Yes. Our cross-border presence allows us to architect cloud systems adhering to India DPDP regulations, UAE Central Bank standards, and regional data residency mandates.",
      },
    ],
    relatedCaseStudySlugs: ["enterprise-cloud-transformation"],
  },
  {
    slug: "digital-marketing-brand-development",
    title: "Digital Marketing and Brand Development",
    shortTitle: "Digital Marketing & Branding",
    eyebrow: "B2B Demand Gen • Brand Strategy • Performance Marketing",
    tagline: "Performance-focused campaigns built to generate qualified B2B pipeline and elevate brand authority.",
    description:
      "We replace generic ad spend with rigorous funnel modeling, high-intent LinkedIn & Google Search campaigns, brand positioning, and multi-touch attribution that turns marketing into verified revenue.",
    icon: "TrendingUp",
    businessProblem: {
      title: "The B2B Ad Spend & Brand Ambiguity Black Hole",
      description:
        "High cost-per-click, low lead quality, and disconnected brand identity make traditional marketing retainers inefficient for B2B enterprises.",
      painPoints: [
        "Leads coming in with low purchasing intent or budget mismatches",
        "Inability to track closed-won pipeline back to specific marketing campaigns",
        "Brand messaging that reads generic and fails to convey core technical value",
        "Wasted ad spend on non-converting audience segments",
      ],
    },
    ourSolution: {
      title: "Revenue-Driven Growth & Brand Positioning Systems",
      description:
        "We build closed-loop marketing systems tightly integrated with your CRM, targeting decision-makers with personalized messaging and high-converting brand experiences.",
      keyPillars: [
        {
          title: "Account-Based Marketing (ABM)",
          description: "Precision targeting of key enterprise accounts across LinkedIn and programmatic channels.",
        },
        {
          title: "Brand Identity & Value Positioning",
          description: "Crafting clear value propositions, visual brand guidelines, and high-impact pitch decks.",
        },
        {
          title: "Full-Funnel CRM Attribution",
          description: "Tracking lead stages from initial ad click through pipeline discovery call to signed contract.",
        },
      ],
    },
    capabilities: [
      {
        category: "Paid Acquisition & Growth",
        items: [
          "LinkedIn B2B Advertising & InMail",
          "Google Search & High-Intent Display",
          "Retargeting & Audience Expansion",
          "Programmatic Account-Based Marketing",
        ],
      },
      {
        category: "Brand & Content Strategy",
        items: [
          "Brand Architecture & Messaging Matrix",
          "Landing Page CRO & A/B Testing",
          "HubSpot / Salesforce CRM Integration",
          "Multi-Touch Attribution Modeling",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Audience & Brand Positioning Audit",
        description: "ICP profiling, competitor teardowns, and buyer journey mapping.",
        deliverable: "ICP Matrix & Brand Strategy Blueprint",
      },
      {
        step: 2,
        title: "Conversion Infrastructure Setup",
        description: "Building dedicated high-converting landing pages and CRM server-side tracking.",
        deliverable: "Conversion Pages & Server-Side Pixel Setup",
      },
      {
        step: 3,
        title: "Campaign Launch & Audience Testing",
        description: "Launching multi-variant creative, ad copy, and high-intent keyword groups.",
        deliverable: "Live Cross-Channel Campaigns",
      },
      {
        step: 4,
        title: "Rapid CRO & Optimization",
        description: "Weekly multivariate testing to drive down Customer Acquisition Cost (CAC).",
        deliverable: "Weekly Performance Sprints & Heatmap Audits",
      },
      {
        step: 5,
        title: "Pipeline & Revenue Reporting",
        description: "Transparent dashboards showing cost-per-qualified-opportunity and ROI.",
        deliverable: "Executive Monthly Revenue Attribution Report",
      },
    ],
    technologies: [
      {
        category: "Marketing Platforms",
        stack: ["LinkedIn Campaign Manager", "Google Ads", "Meta Ads Manager", "RollWorks ABM"],
      },
      {
        category: "Attribution & CRM",
        stack: ["HubSpot", "Salesforce", "Google Tag Manager Server-Side", "GA4", "Hotjar"],
      },
    ],
    engagementModels: [
      {
        title: "Growth & Brand Retainer",
        description: "End-to-end management of paid media, brand identity, landing pages, and weekly optimization.",
        bestFor: "Enterprises seeking predictable customer acquisition and elevated brand authority.",
        ctaText: "Discuss Growth Retainer",
      },
      {
        title: "Marketing Audit & Strategy Sprint",
        description: "Comprehensive 30-day teardown of existing campaigns, brand messaging, and CRM leaks.",
        bestFor: "Companies experiencing plateaus or rising CAC with their existing agency.",
        ctaText: "Request Marketing Audit",
      },
    ],
    results: [
      {
        metric: "3.4x",
        label: "Qualified Pipeline Generated",
        context: "Verified B2B opportunities generated for enterprise partners.",
      },
      {
        metric: "35%",
        label: "CAC Reduction",
        context: "Average customer acquisition cost reduction achieved through funnel refinement.",
      },
    ],
    faqs: [
      {
        question: "How do you ensure lead quality for complex B2B offerings?",
        answer:
          "We qualify traffic upfront using specific industry targeting, job seniority filters, and qualifying questions on dedicated landing page forms, integrated directly into your CRM scorecards.",
      },
      {
        question: "What is your typical onboarding timeline?",
        answer:
          "Standard ramp-up takes 10 to 14 days, including pixel validation, landing page setup, tracking calibration, and brand asset alignment before ad launch.",
      },
    ],
    relatedCaseStudySlugs: ["b2b-demand-generation"],
  },
  {
    slug: "web-app-development",
    title: "Web and Application Development",
    shortTitle: "Web & App Dev",
    eyebrow: "Full-Stack Engineering • Cloud-Native Portals • Mobile Applications",
    tagline: "High-performance digital products engineered for reliability, security, and speed.",
    description:
      "From high-conversion web portals to complex internal SaaS platforms and native mobile applications, we build clean, maintainable software engineered to support enterprise workflows.",
    icon: "Code2",
    businessProblem: {
      title: "The High Cost of Fragile Software",
      description:
        "Slow load speeds, brittle codebases, and poor user interfaces result in churned customers and expensive emergency refactoring.",
      painPoints: [
        "Legacy web apps experiencing slow page loads and bad Core Web Vitals",
        "Mobile experiences that fail to engage users or lack offline resilience",
        "Spaghetti codebases that make new feature releases agonizingly slow",
        "Vulnerabilities and lack of automated CI/CD deployment pipelines",
      ],
    },
    ourSolution: {
      title: "Engineering-First Digital Product Development",
      description:
        "We build with TypeScript, React, Next.js, Node, Python, and cloud-native backends to deliver sub-second performance, modular architecture, and military-grade security.",
      keyPillars: [
        {
          title: "Sub-Second Performance & SEO Core",
          description: "SSR and SSG powered interfaces optimized for maximum Lighthouse scores and search discoverability.",
        },
        {
          title: "Modular Component Architecture",
          description: "Clean design systems and typed APIs ensuring code maintainability and rapid feature iterations.",
        },
        {
          title: "Secure & Resilient Backends",
          description: "Robust database design (PostgreSQL, Redis), rate limiting, and automated testing suites.",
        },
      ],
    },
    capabilities: [
      {
        category: "Web & Platform Engineering",
        items: [
          "Custom SaaS Web Applications",
          "Next.js & React Enterprise Portals",
          "Headless CMS & E-Commerce",
          "API Architecture & Microservices",
        ],
      },
      {
        category: "Mobile & Cross-Platform",
        items: [
          "React Native iOS & Android Apps",
          "Progressive Web Apps (PWAs)",
          "Real-Time WebSocket Integrations",
          "Payment Gateway & ERP Connectors",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Product Scope & Wireframing",
        description: "Interactive UX prototyping, system architecture diagrams, and database entity schemas.",
        deliverable: "Figma Prototypes & Technical Design Document",
      },
      {
        step: 2,
        title: "Sprint-Based Engineering",
        description: "Agile 2-week sprints with automated CI/CD preview environments for continuous stakeholder feedback.",
        deliverable: "Working Bi-Weekly Feature Deployments",
      },
      {
        step: 3,
        title: "QA & Stress Testing",
        description: "End-to-end automated testing, cross-browser validation, and load testing.",
        deliverable: "Automated Test Suite & Performance Audit Report",
      },
      {
        step: 4,
        title: "Production Deployment",
        description: "Zero-downtime deployment, CDN edge caching setup, and observability monitoring.",
        deliverable: "Live Production Release with APM Alerts",
      },
      {
        step: 5,
        title: "Support & Iterative Growth",
        description: "SLA-backed uptime support, security patching, and new feature roadmaps.",
        deliverable: "Monthly Maintenance & Feature Releases",
      },
    ],
    technologies: [
      {
        category: "Frontend & Mobile",
        stack: ["Next.js", "React", "TypeScript", "React Native", "Tailwind CSS"],
      },
      {
        category: "Backend & Database",
        stack: ["Node.js", "Python / FastAPI", "PostgreSQL", "Redis", "Docker"],
      },
    ],
    engagementModels: [
      {
        title: "Dedicated Pod (Team Augmentation)",
        description: "A full-time, self-managing squad of frontend, backend, QA, and UI engineers.",
        bestFor: "Fast-growing companies requiring continuous product feature delivery.",
        ctaText: "Assemble Your Team",
      },
      {
        title: "Fixed-Scope Product Build",
        description: "Milestone-based delivery with fixed timelines and transparent budgets.",
        bestFor: "Greenfield products, portal revamps, or standalone mobile applications.",
        ctaText: "Get Project Estimate",
      },
    ],
    results: [
      {
        metric: "98/100",
        label: "Lighthouse Performance",
        context: "Average PageSpeed scores delivered on modern Next.js deployments.",
      },
      {
        metric: "99.99%",
        label: "Uptime Reliability",
        context: "Maintained across enterprise production web platforms.",
      },
    ],
    faqs: [
      {
        question: "Do you write native mobile apps or cross-platform apps?",
        answer:
          "We specialize in React Native for cost-efficient cross-platform parity (iOS & Android) with near-native performance, while providing native Swift/Kotlin modules when low-level hardware integration is needed.",
      },
      {
        question: "Who owns the intellectual property and source code?",
        answer:
          "You retain 100% ownership of all source code, design assets, and intellectual property from Day 1. Everything is delivered via your internal Git repositories.",
      },
    ],
    relatedCaseStudySlugs: ["saas-portal-engineering"],
  },
  {
    slug: "risk-compliance-governance",
    title: "Risk, Compliance, and Governance",
    shortTitle: "Risk & Compliance",
    eyebrow: "Data Privacy • Cybersecurity Governance • Regulatory Frameworks",
    tagline: "Protecting enterprise resilience through rigorous compliance and proactive risk governance.",
    description:
      "We assist organizations across regulated industries in achieving and maintaining compliance with international and regional standards, including ISO 27001, SOC 2, India DPDP Act, GDPR, and UAE cybersecurity frameworks.",
    icon: "ShieldCheck",
    businessProblem: {
      title: "The Escalating Threat of Regulatory & Security Exposure",
      description:
        "Evolving data privacy regulations and security liabilities mean non-compliance can lead to catastrophic fines, reputational damage, and lost enterprise deals.",
      painPoints: [
        "Unpreparedness for India's Digital Personal Data Protection (DPDP) Act",
        "Struggling to clear enterprise vendor security questionnaires (SOC 2, ISO)",
        "Lack of formal incident response and data protection governance policies",
        "Ambiguity regarding UAE data sovereignty and cloud security directives",
      ],
    },
    ourSolution: {
      title: "Pragmatic Risk Governance That Enables Business Deals",
      description:
        "We turn compliance from an administrative hurdle into a competitive differentiator that wins enterprise trust and accelerates sales cycles.",
      keyPillars: [
        {
          title: "Comprehensive Gap Analysis",
          description: "Evaluating existing controls, data flows, and infrastructure against required standards.",
        },
        {
          title: "Policy & Control Implementation",
          description: "Authoring clear, actionable policies and engineering technical security controls.",
        },
        {
          title: "Continuous Compliance Readiness",
          description: "Simulated internal audits and continuous evidence collection for external certification.",
        },
      ],
    },
    capabilities: [
      {
        category: "Standards & Certifications",
        items: [
          "ISO/IEC 27001:2022 Implementation",
          "SOC 2 Type I & Type II Readiness",
          "India DPDP Act Compliance Framework",
          "GDPR & Cross-Border Data Flow Audits",
        ],
      },
      {
        category: "Governance & Cyber Resilience",
        items: [
          "Vendor & Third-Party Risk Assessment",
          "Data Classification & Retention Policies",
          "Incident Response & Business Continuity",
          "Executive Risk Board Reporting",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Readiness & Gap Assessment",
        description: "Mapping existing controls against ISO 27001, SOC 2, or DPDP Act requirements.",
        deliverable: "Compliance Gap Analysis & Risk Register",
      },
      {
        step: 2,
        title: "Policy & Control Remediation",
        description: "Drafting required governance policies and implementing technical security safeguards.",
        deliverable: "Information Security Policy Suite & Control Matrix",
      },
      {
        step: 3,
        title: "Employee Training & Governance Rollout",
        description: "Training staff on data handling, security hygiene, and incident reporting procedures.",
        deliverable: "Staff Compliance Training & Attendance Logs",
      },
      {
        step: 4,
        title: "Internal Pre-Audit & Evidence Gathering",
        description: "Conducting simulated audits and assembling auditor-ready evidence repositories.",
        deliverable: "Pre-Audit Evidence Package & Readiness Signoff",
      },
      {
        step: 5,
        title: "Certification Support & Ongoing Review",
        description: "Liaising with accredited certification bodies during formal audit proceedings.",
        deliverable: "Certification Attainment & Continuous Monitoring Schedule",
      },
    ],
    technologies: [
      {
        category: "Compliance & Security Tooling",
        stack: ["Vanta", "Drata", "OneTrust", "AWS Security Hub", "Cloudflare Zero Trust"],
      },
      {
        category: "Regulatory Standards",
        stack: ["ISO/IEC 27001", "SOC 2", "India DPDP Act 2023", "GDPR", "UAE NESA / DESC"],
      },
    ],
    engagementModels: [
      {
        title: "Certification Readiness Sprint",
        description: "End-to-end guidance to achieve SOC 2, ISO 27001, or DPDP compliance in 90-120 days.",
        bestFor: "B2B SaaS and enterprise service providers needing immediate audit readiness.",
        ctaText: "Start Compliance Sprint",
      },
      {
        title: "Virtual CISO / DPO as a Service",
        description: "Fractional Chief Information Security Officer / Data Protection Officer to oversee ongoing risk.",
        bestFor: "Growing organizations needing regulatory oversight without hiring a full-time executive.",
        ctaText: "Inquire About vCISO",
      },
    ],
    results: [
      {
        metric: "100%",
        label: "Audit Pass Rate",
        context: "First-time pass rate achieved across SOC 2 and ISO certification engagements.",
      },
      {
        metric: "60%",
        label: "Vendor Deal Acceleration",
        context: "Reduction in enterprise vendor security review delays.",
      },
    ],
    faqs: [
      {
        question: "How does Arav Innovations prepare us for the India DPDP Act?",
        answer:
          "We perform data mapping to identify all personal data touchpoints, create compliant consent mechanisms, draft data protection agreements, and establish Data Principal grievance redressal mechanisms.",
      },
      {
        question: "Do you act as the actual certification auditor?",
        answer:
          "We act as your advisory and implementation partner to make you 100% audit-ready, working directly alongside accredited third-party certification bodies.",
      },
    ],
    relatedCaseStudySlugs: ["iso-compliance-certification"],
  },
  {
    slug: "audit-improvement",
    title: "Audit and Improvement",
    shortTitle: "Audit & Improvement",
    eyebrow: "Process Optimization • Code Health • Operational Efficiency",
    tagline: "Uncovering hidden bottlenecks and unlocking measurable operational efficiency.",
    description:
      "We provide independent technical, operational, and process audits for established enterprises. We analyze code health, cloud efficiency, workflow friction, and delivery pipelines to recommend high-impact remediation strategies.",
    icon: "BarChart3",
    businessProblem: {
      title: "The Creep of Inefficiency & Technical Debt",
      description:
        "As organizations grow, software becomes unwieldy, cloud infrastructure accumulates unused resources, and delivery pipelines slow down unnoticed.",
      painPoints: [
        "Unexplained spikes in monthly cloud hosting and SaaS licensing costs",
        "Frequent software regressions, outages, and slow release turnaround",
        "Inefficient handoffs between product, engineering, and business teams",
        "Lack of objective, independent benchmarks on software quality",
      ],
    },
    ourSolution: {
      title: "Objective Diagnostics & Actionable Engineering Fixes",
      description:
        "We deliver clear, prioritized diagnostic scorecards backed by code-level recommendations and direct implementation support.",
      keyPillars: [
        {
          title: "Comprehensive Codebase & Architecture Audits",
          description: "Static code analysis, vulnerability scanning, and architectural anti-pattern identification.",
        },
        {
          title: "Cloud & Infrastructure Cost Optimization",
          description: "Right-sizing over-provisioned instances, database tuning, and eliminating orphan resources.",
        },
        {
          title: "Delivery Pipeline & DevOps Streamlining",
          description: "Optimizing CI/CD pipelines to slash build times and automate deployment safety.",
        },
      ],
    },
    capabilities: [
      {
        category: "Technical Audits",
        items: [
          "Full-Stack Code Quality & Maintainability Audit",
          "Cloud Architecture & FinOps Efficiency Audit",
          "Application Security & Dependency Vulnerability Scan",
          "Database Query & Indexing Performance Review",
        ],
      },
      {
        category: "Process & Operational Audits",
        items: [
          "Software Delivery Lifecycle (SDLC) Maturity Audit",
          "DevOps & CI/CD Pipeline Bottleneck Analysis",
          "IT Infrastructure Disaster Recovery Audit",
          "Team Velocity & Release Efficiency Assessment",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Non-Intrusive Access & Telemetry",
        description: "Gaining read-only access to code repositories, cloud consoles, and APM tools.",
        deliverable: "Audit Onboarding & Access Verification",
      },
      {
        step: 2,
        title: "Automated & Manual Inspection",
        description: "Running deep diagnostic scans and conducting key stakeholder technical interviews.",
        deliverable: "Raw Diagnostic Findings & Telemetry Data",
      },
      {
        step: 3,
        title: "Impact vs. Effort Prioritization",
        description: "Scoring issues by business risk, financial savings potential, and implementation complexity.",
        deliverable: "Prioritized Remediation Matrix & Executive Summary",
      },
      {
        step: 4,
        title: "Executive & Engineering Debrief",
        description: "Presenting findings to leadership and hosting technical workshops for engineering teams.",
        deliverable: "Interactive Technical Workshop & Recommendations Walkthrough",
      },
      {
        step: 5,
        title: "Implementation & Verification Sprint",
        description: "Assisting internal teams with hands-on refactoring and verifying improvements.",
        deliverable: "Post-Remediation Verification Scorecard",
      },
    ],
    technologies: [
      {
        category: "Diagnostic Tooling",
        stack: ["SonarQube", "Snyk", "AWS Cost Explorer", "Datadog", "New Relic"],
      },
      {
        category: "Performance Benchmarking",
        stack: ["k6 Load Testing", "Lighthouse CI", "PostgreSQL EXPLAIN ANALYZE", "Docker Bench Security"],
      },
    ],
    engagementModels: [
      {
        title: "2-Week Deep Diagnostic Audit",
        description: "Fixed-scope intensive review of a specific platform, codebase, or cloud infrastructure setup.",
        bestFor: "Companies preparing for due diligence, scaling milestones, or resolving performance regressions.",
        ctaText: "Book Diagnostic Audit",
      },
      {
        title: "Audit + Guided Remediation Sprint",
        description: "Diagnostic audit followed by 4-8 weeks of hands-on pairing with your developers to implement fixes.",
        bestFor: "Teams wanting immediate execution alongside diagnostic findings.",
        ctaText: "Inquire About Remediation",
      },
    ],
    results: [
      {
        metric: "35%",
        label: "Cloud Cost Savings",
        context: "Average reduction identified in cloud waste during FinOps audits.",
      },
      {
        metric: "4.0x",
        label: "Build & Deploy Speedup",
        context: "CI/CD build pipeline acceleration post DevOps remediation.",
      },
    ],
    faqs: [
      {
        question: "Does your audit require production downtime?",
        answer:
          "No. All audits are executed in read-only mode using staging environments or telemetry data, ensuring zero risk to live production systems.",
      },
      {
        question: "Can your team help us implement the audit recommendations?",
        answer:
          "Yes. We deliver standalone reports and can also provide hands-on engineering squads to execute remediation sprints directly.",
      },
    ],
    relatedCaseStudySlugs: ["infrastructure-optimization"],
  },
  {
    slug: "training-staff-augmentation",
    title: "Training and Staff Augmentation",
    shortTitle: "Staff Augmentation",
    eyebrow: "Vetted Tech Talent • Dedicated Squads • Corporate Upskilling",
    tagline: "High-caliber engineering talent and tailored training programs to accelerate your delivery roadmap.",
    description:
      "We provide pre-vetted senior software engineers, cloud architects, QA automation specialists, and digital strategists who seamlessly integrate into your development sprints within days, alongside customized corporate training programs.",
    icon: "Users2",
    businessProblem: {
      title: "The Pain of Tech Hiring Bottlenecks",
      description:
        "Lengthy recruitment cycles, high recruiter fees, and mismatch between resume claims and actual hands-on capability stall critical product releases.",
      painPoints: [
        "Months spent interviewing candidates while product roadmaps fall behind",
        "High attrition and project disruption from unvetted contractors",
        "Internal skill gaps in emerging technologies (Next.js, Cloud-Native, AI)",
        "Overhead of payroll, compliance, and international benefits administration",
      ],
    },
    ourSolution: {
      title: "Pre-Vetted Senior Talent Ready to Ship on Day 1",
      description:
        "Every engineer in our network passes rigorous coding challenges, architectural reviews, and communication assessments before being presented to clients.",
      keyPillars: [
        {
          title: "Rigorous 4-Stage Vetting",
          description: "Hands-on coding evaluations, system design defense, and English communication fluency checks.",
        },
        {
          title: "Zero Friction Integration",
          description: "Engineers adapt to your Git workflows, Slack/Teams communication, and Jira sprint rhythms instantly.",
        },
        {
          title: "Enterprise Corporate Upskilling",
          description: "Hands-on corporate workshops on modern full-stack development, cloud architecture, and security.",
        },
      ],
    },
    capabilities: [
      {
        category: "Staff Augmentation & Dedicated Squads",
        items: [
          "Senior Frontend Engineers (React, Next.js, Vue)",
          "Backend & Cloud Specialists (Node, Python, Go, AWS)",
          "QA Automation & Performance Engineers",
          "DevOps & Kubernetes SRE Specialists",
        ],
      },
      {
        category: "Corporate Training & Upskilling",
        items: [
          "Modern Full-Stack Engineering Bootcamps",
          "Cloud-Native Architecture & FinOps Training",
          "Cybersecurity & Secure Coding Practices",
          "Agile & High-Velocity Scrum Workshops",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Requirement & Culture Alignment",
        description: "Understanding technical stack, timezone overlap, seniority requirements, and project scope.",
        deliverable: "Talent Profile & Skill Matrix Definition",
      },
      {
        step: 2,
        title: "Candidate Matching within 48 Hours",
        description: "Presenting 2-3 shortlisted, pre-vetted engineers ready for technical interviews.",
        deliverable: "Curated Candidate Portfolios & Code Samples",
      },
      {
        step: 3,
        title: "Direct Client Interview & Trial",
        description: "You interview candidates directly and assess cultural and technical alignment.",
        deliverable: "Interview Debrief & Candidate Selection",
      },
      {
        step: 4,
        title: "Seamless Onboarding & Kickoff",
        description: "Repo access, security onboarding, and integration into your active sprint cycle.",
        deliverable: "Day 1 Environment Setup & Sprint Planning Attendance",
      },
      {
        step: 5,
        title: "Ongoing Performance Monitoring",
        description: "Regular check-ins between Arav account managers and your engineering leadership.",
        deliverable: "Monthly Velocity Reviews & Talent Scaling Support",
      },
    ],
    technologies: [
      {
        category: "Core Engineering Roles",
        stack: ["React / Next.js", "Node.js / Express", "Python / Django / FastAPI", "Golang", "PostgreSQL"],
      },
      {
        category: "Cloud & QA Specialties",
        stack: ["AWS / Azure / GCP", "Docker & Kubernetes", "Playwright & Cypress", "Terraform", "CI/CD"],
      },
    ],
    engagementModels: [
      {
        title: "Dedicated Monthly Engineers",
        description: "Full-time dedicated engineers working 100% on your product with flexible monthly commitments.",
        bestFor: "Teams needing immediate velocity without long-term local employment liabilities.",
        ctaText: "Request Talent Profiles",
      },
      {
        title: "Custom Corporate Training Cohorts",
        description: "Structured 2 to 6-week intensive upskilling workshops tailored to your enterprise technology stack.",
        bestFor: "Enterprises modernizing their in-house development workforce.",
        ctaText: "Inquire About Training",
      },
    ],
    results: [
      {
        metric: "48-72h",
        label: "Onboarding Time",
        context: "Average turnaround from skill specification to engineer deployment.",
      },
      {
        metric: "95%",
        label: "Retention Rate",
        context: "Maintained across long-term staff augmentation partnerships.",
      },
    ],
    faqs: [
      {
        question: "How fast can an augmented engineer join our team?",
        answer:
          "For standard tech stacks (Next.js, React, Node, Python, AWS), we present qualified candidates within 48 to 72 hours, with engineers starting within 5 to 7 business days.",
      },
      {
        question: "What happens if an engineer is not the right fit?",
        answer:
          "We offer a 2-week replacement guarantee with zero additional placement fees.",
      },
    ],
    relatedCaseStudySlugs: ["engineering-team-augmentation"],
  },
  {
    slug: "seo-services",
    title: "SEO Services",
    shortTitle: "SEO Services",
    eyebrow: "Technical SEO • Programmatic Indexing • Enterprise Authority",
    tagline: "Sustainable organic growth built on technical perfection and high-authority search footprint.",
    description:
      "We treat SEO as an engineering discipline. From resolving complex JavaScript rendering roadblocks and Core Web Vitals to building semantic topical authority hubs, we capture sustainable organic search discoverability.",
    icon: "Search",
    businessProblem: {
      title: "Why Traditional SEO Fails Modern Websites",
      description:
        "Shallow keyword stuffing no longer ranks. Modern search engines demand clean crawlability, high user experience signals, and deep topical authority.",
      painPoints: [
        "JavaScript frameworks not getting indexed properly by search engines",
        "Slow Core Web Vitals (LCP, CLS, INP) dragging down site rankings",
        "Competitors dominating high-value commercial keywords in target regions",
        "Unclear organic ROI and traffic that fails to convert into sales conversations",
      ],
    },
    ourSolution: {
      title: "Engineering-Led Technical SEO & Topical Dominance",
      description:
        "We combine site architecture optimization with programmatic content hubs and authoritative digital PR to build organic search moats.",
      keyPillars: [
        {
          title: "Deep Technical Audits & Architecture",
          description: "Solving crawl budgets, rendering issues, canonical hierarchy, and structured schema markup.",
        },
        {
          title: "Topical Authority & Content Clusters",
          description: "Building comprehensive content silos that signal undeniable subject-matter expertise.",
        },
        {
          title: "High-Authority B2B Digital PR",
          description: "Earning verified citations, backlinks, and brand mentions from top-tier industry publications.",
        },
      ],
    },
    capabilities: [
      {
        category: "Technical & Architectural SEO",
        items: [
          "Next.js / React Server-Side Rendering SEO",
          "Core Web Vitals Remediation (INP, LCP)",
          "Structured Data (Schema.org JSON-LD)",
          "International Hreflang Configuration",
        ],
      },
      {
        category: "Content & Authority Strategy",
        items: [
          "High-Intent Keyword Mapping",
          "Topical Authority Content Hubs",
          "Competitive Gap Analysis",
          "Enterprise B2B Backlink Acquisition",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Comprehensive Technical Crawl Audit",
        description: "Simulating search engine bots to uncover indexation blockers and schema gaps.",
        deliverable: "100-Point Technical SEO Audit & Dev Action Plan",
      },
      {
        step: 2,
        title: "Keyword & Commercial Intent Matrix",
        description: "Mapping search queries by buyer readiness and prioritizing high-intent target pages.",
        deliverable: "Keyword Opportunity & Content Gap Matrix",
      },
      {
        step: 3,
        title: "On-Page & Architecture Refactoring",
        description: "Implementing optimized titles, internal linking models, schema markup, and speed fixes.",
        deliverable: "Direct Git PRs / CMS On-Page Optimization",
      },
      {
        step: 4,
        title: "Topical Content Hub Deployment",
        description: "Publishing in-depth, authoritative guides answering exact industry problem statements.",
        deliverable: "Monthly High-Authority Content Deliverables",
      },
      {
        step: 5,
        title: "Rank & Conversion Tracking",
        description: "Monitoring keyword movements, organic demo requests, and search impressions.",
        deliverable: "Monthly Search Console & Revenue Impact Report",
      },
    ],
    technologies: [
      {
        category: "SEO & Audit Tooling",
        stack: ["Screaming Frog SEO Spider", "Ahrefs", "Semrush", "Google Search Console"],
      },
      {
        category: "Testing & Schema",
        stack: ["Schema.org JSON-LD", "PageSpeed Insights", "Lighthouse CLI", "Chrome UX Report (CrUX)"],
      },
    ],
    engagementModels: [
      {
        title: "Organic Growth Retainer",
        description: "Comprehensive monthly technical audits, content publishing, authority building, and reporting.",
        bestFor: "Brands targeting aggressive multi-region organic search dominance.",
        ctaText: "Start SEO Retainer",
      },
      {
        title: "Technical Migration & Rescue Sprint",
        description: "Protecting rankings and traffic during major CMS re-platforms or site redesigns.",
        bestFor: "Companies launching new websites or recovering from algorithm penalties.",
        ctaText: "Book Migration Audit",
      },
    ],
    results: [
      {
        metric: "+180%",
        label: "Organic Search Visibility",
        context: "Growth achieved across non-brand commercial keyword clusters.",
      },
      {
        metric: "2.8x",
        label: "Organic Pipeline Growth",
        context: "Increase in inbound enterprise inquiries from organic search.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to see organic ranking improvements?",
        answer:
          "Technical fixes and indexing improvements typically yield noticeable indexation gains in 4 to 8 weeks, with substantial compound organic traffic growth realized between months 3 and 6.",
      },
      {
        question: "Can you help rank our website across multiple regional search results?",
        answer:
          "Yes. We implement geo-targeting, hreflang tag configurations, localized content hubs, and international entity citations.",
      },
    ],
    relatedCaseStudySlugs: ["organic-traffic-expansion"],
  },
  {
    slug: "ai-portfolio",
    title: "AI Portfolio",
    shortTitle: "AI Portfolio",
    eyebrow: "AI Solutions • Intelligent Automation • Enterprise AI Integration",
    tagline: "Empowering modern enterprises with scalable AI implementation and intelligent workflow automation.",
    description:
      "We design, build, and deploy production-ready AI solutions, custom LLM integrations, intelligent automation pipelines, and enterprise-grade data workflows tailored to operational efficiency.",
    icon: "Cpu",
    businessProblem: {
      title: "Bridging the Gap Between AI Hype and Enterprise Execution",
      description:
        "Many organizations struggle to convert artificial intelligence potential into secure, high-ROI business applications and automated workflows.",
      painPoints: [
        "Unclear pathways to integrate LLMs and AI agents into legacy enterprise software",
        "Data privacy concerns surrounding customer data usage in cloud AI models",
        "Manual, repetitive operational workflows consuming valuable engineering hours",
        "Lack of custom AI tools tailored to specific domain data and business logic",
      ],
    },
    ourSolution: {
      title: "Pragmatic, High-Impact Enterprise AI Engineering",
      description:
        "We implement secure, scalable AI capabilities—ranging from intelligent workflow automation and retrieval-augmented generation (RAG) to custom AI integrations that deliver immediate business value.",
      keyPillars: [
        {
          title: "Intelligent Workflow Automation",
          description: "Automating complex document processing, lead qualification, and customer operations with custom AI agents.",
        },
        {
          title: "AI Solutions & Enterprise Integration",
          description: "Connecting OpenAI, Anthropic, and open-source models (Llama) directly into internal APIs, databases, and CRMs.",
        },
        {
          title: "Private Data & Retrieval Architecture (RAG)",
          description: "Building secure vector search and knowledge base engines that query internal enterprise data with strict access controls.",
        },
      ],
    },
    capabilities: [
      {
        category: "AI Implementation & Solutions",
        items: [
          "Custom Enterprise AI Solutions & Agent Pipelines",
          "Retrieval-Augmented Generation (RAG) Systems",
          "Intelligent Document Processing & Extraction",
          "AI-Powered B2B Workflow Automation",
        ],
      },
      {
        category: "Integration & Governance",
        items: [
          "API Integration (OpenAI, Claude, Mistral, HuggingFace)",
          "Vector Database Architecture (Pinecone, Qdrant, Pgvector)",
          "AI Data Privacy & DPDP Compliance Guardrails",
          "LLM Latency, Caching & Cost Optimization",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "AI Feasibility & Scoping",
        description: "Evaluating high-value AI use cases, data readiness, and security requirements.",
        deliverable: "AI Feasibility Assessment & Integration Architecture",
      },
      {
        step: 2,
        title: "Proof of Concept (PoC) Prototype",
        description: "Building a functional 2-week prototype to validate accuracy and operational impact.",
        deliverable: "Working Interactive AI Prototype",
      },
      {
        step: 3,
        title: "Enterprise Systems Integration",
        description: "Engineering secure APIs, vector databases, and middleware connecting to internal platforms.",
        deliverable: "Production-Ready AI Microservices",
      },
      {
        step: 4,
        title: "Safety & Privacy Tuning",
        description: "Implementing guardrails, fallbacks, role-based permissions, and response benchmarking.",
        deliverable: "AI Compliance & Security Assessment",
      },
      {
        step: 5,
        title: "Deployment & Continuous Monitoring",
        description: "Deploying model endpoints with monitoring for cost, latency, and drift.",
        deliverable: "Live AI Deployment & Operations Dashboard",
      },
    ],
    technologies: [
      {
        category: "AI Frameworks & Models",
        stack: ["LangChain", "LlamaIndex", "OpenAI GPT-4o", "Claude 3.5 Sonnet", "HuggingFace"],
      },
      {
        category: "Vector DBs & Infrastructure",
        stack: ["Pgvector (PostgreSQL)", "Pinecone", "Qdrant", "Python / FastAPI", "Docker"],
      },
    ],
    engagementModels: [
      {
        title: "AI Implementation Sprint",
        description: "Fixed-scope 4-8 week engineering sprint to build and deploy a dedicated AI solution or RAG system.",
        bestFor: "Enterprises needing rapid deployment of AI-powered workflows.",
        ctaText: "Book AI Implementation Sprint",
      },
      {
        title: "Dedicated AI Engineering Squad",
        description: "On-demand pod of AI engineers, full-stack developers, and data architects.",
        bestFor: "Companies building core AI products or continuous automation pipelines.",
        ctaText: "Assemble AI Squad",
      },
    ],
    results: [
      {
        metric: "70%",
        label: "Operational Process Speedup",
        context: "Time saved across automated document extraction and lead qualification workflows.",
      },
      {
        metric: "100%",
        label: "Data Privacy Compliance",
        context: "Zero customer data leakage through local embedding and zero-retention cloud APIs.",
      },
    ],
    faqs: [
      {
        question: "How do you ensure our corporate data remains secure when using AI?",
        answer:
          "We implement enterprise zero-data-retention APIs, private vector storage, and role-based access controls. Your proprietary business data is never used to train public models.",
      },
      {
        question: "Can AI solutions be integrated into our existing CRM and ERP tools?",
        answer:
          "Yes. We build custom API connectors for Salesforce, HubSpot, SAP, and custom database backends so AI agents interact directly with your existing software stack.",
      },
    ],
    relatedCaseStudySlugs: ["saas-portal-engineering"],
  },
];

// Mapping for backward compatibility with old & direct slugs
const slugAliasMap: Record<string, string> = {
  "it-strategy-consulting": "it-strategy-implementation",
  "itstrategy": "it-strategy-implementation",
  "web-application-development": "web-app-development",
  "webdevelopment": "web-app-development",
  "digital-marketing": "digital-marketing-brand-development",
  "digitalmarketing": "digital-marketing-brand-development",
  "seo": "seo-services",
  "risk-governance-compliance": "risk-compliance-governance",
  "riskandgovernance": "risk-compliance-governance",
  "audit": "audit-improvement",
  "audit-and-improvement": "audit-improvement",
  "trainingandstaff": "training-staff-augmentation",
  "ai-solutions": "ai-portfolio",
};

export function getServiceBySlug(slug: string): Service | undefined {
  const normalizedSlug = slugAliasMap[slug] || slug;
  return servicesData.find((s) => s.slug === normalizedSlug);
}

export function getAllServiceSlugs(): string[] {
  const primarySlugs = servicesData.map((s) => s.slug);
  const aliasSlugs = Object.keys(slugAliasMap);
  return Array.from(new Set([...primarySlugs, ...aliasSlugs]));
}
