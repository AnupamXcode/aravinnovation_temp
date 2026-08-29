export interface WhyAravPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  businessOutcome: string;
  icon: string;
  accentColor: string;
  order: number;
}

export const whyAravPillarsData: WhyAravPillar[] = [
  {
    id: "tech-strategy",
    number: "01",
    title: "Technology + Strategy",
    subtitle: "CFO-Aligned Engineering",
    description: "We bridge high-level executive business goals with hands-on architectural rigor, ensuring technology investments directly drive bottom-line profitability.",
    businessOutcome: "Lower total cost of ownership & transparent tech ROI",
    icon: "Compass",
    accentColor: "#f15e1c",
    order: 1,
  },
  {
    id: "enterprise-execution",
    number: "02",
    title: "Enterprise-Ready Execution",
    subtitle: "Zero-Downtime Reliability",
    description: "Built for high concurrency, zero data loss, and mission-critical uptime. We deliver production-grade code with automated CI/CD guardrails.",
    businessOutcome: "99.99% system availability & faster release velocity",
    icon: "ShieldCheck",
    accentColor: "#2e936f",
    order: 2,
  },
  {
    id: "business-outcomes",
    number: "03",
    title: "Business-Focused Solutions",
    subtitle: "ROI Over Hype",
    description: "We avoid unnecessary technology hype. Every architectural decision is evaluated against conversion rates, latency, operational efficiency, and revenue.",
    businessOutcome: "3.4x sales pipeline growth & reduced operational costs",
    icon: "TrendingUp",
    accentColor: "#fab60a",
    order: 3,
  },
  {
    id: "scalable-architecture",
    number: "04",
    title: "Scalable Digital Architecture",
    subtitle: "Future-Proof Foundations",
    description: "Transitioning monolithic legacy systems into resilient, cloud-native microservices capable of scaling seamlessly as market demand spikes.",
    businessOutcome: "5x transaction capacity without architectural rewrites",
    icon: "Cpu",
    accentColor: "#f15e1c",
    order: 4,
  },
  {
    id: "data-compliance",
    number: "05",
    title: "Data & Compliance Awareness",
    subtitle: "DPDP & SOC-2 Guardrails",
    description: "Security and regulatory compliance are baked into the architecture from Day 1, protecting patient, financial, and customer data across regions.",
    businessOutcome: "100% regulatory alignment & zero compliance breach penalties",
    icon: "Lock",
    accentColor: "#2e936f",
    order: 5,
  },
  {
    id: "long-term-partnership",
    number: "06",
    title: "Long-Term Partnership",
    subtitle: "Senior Embedded Squads",
    description: "We act as your extended CTO office and senior engineering squad, maintaining accountability across the multi-year evolution of your platform.",
    businessOutcome: "Predictable delivery & retained architectural knowledge",
    icon: "Users2",
    accentColor: "#ffec69",
    order: 6,
  },
  {
    id: "ai-ready-innovation",
    number: "07",
    title: "AI-Ready Innovation",
    subtitle: "Intelligent Data Layers",
    description: "Modernizing data pipelines and API surfaces to enable seamless adoption of LLMs, agentic AI workflows, and real-time business telemetry.",
    businessOutcome: "Rapid deployment of enterprise AI capabilities",
    icon: "Sparkles",
    accentColor: "#f15e1c",
    order: 7,
  },
];
