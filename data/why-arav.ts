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
    id: "business-first",
    number: "01",
    title: "Business-First Strategy",
    subtitle: "Commercial Alignment",
    description: "Aligning technology strategy, software engineering, and digital growth directly with executive business goals and commercial impact.",
    businessOutcome: "Tangible business growth and executive-level accountability",
    icon: "Compass",
    accentColor: "#f15e1c",
    order: 1,
  },
  {
    id: "data-informed",
    number: "02",
    title: "Data-Informed Insights",
    subtitle: "Performance & Analytics",
    description: "Using analytics, system health audits, and conversion metrics to guide engineering, search optimization, and marketing decisions without guesswork.",
    businessOutcome: "Data-backed decisions eliminating guesswork and budget waste",
    icon: "TrendingUp",
    accentColor: "#2e936f",
    order: 2,
  },
  {
    id: "scalable",
    number: "03",
    title: "Scalable Foundations",
    subtitle: "Modular Cloud Systems",
    description: "Architecting modular, cloud-native digital systems built to expand smoothly as your user base and transaction volume grow.",
    businessOutcome: "Modular cloud architecture designed to support business growth",
    icon: "Cpu",
    accentColor: "#fab60a",
    order: 3,
  },
  {
    id: "end-to-end",
    number: "04",
    title: "End-to-End Accountability",
    subtitle: "Unified Partnership",
    description: "Managing strategy, software engineering, digital marketing, compliance advisory, and talent support under one single accountable partnership.",
    businessOutcome: "Seamless alignment across technology, marketing, and operations",
    icon: "ShieldCheck",
    accentColor: "#2e936f",
    order: 4,
  },
];
