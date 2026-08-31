export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const aiPortfolioFAQs: FAQItem[] = [
  {
    question: "How do you ensure our corporate data remains secure when using AI?",
    answer:
      "We implement enterprise zero-data-retention APIs, private vector storage, and role-based access controls. Your proprietary business data is never used to train public models. All data is encrypted in transit and at rest using AES-256-GCM.",
    category: "Security & Privacy",
  },
  {
    question: "Can AI solutions be integrated into our existing CRM and ERP tools?",
    answer:
      "Yes. We specialize in seamless integration with Salesforce, SAP, Oracle, and other enterprise systems through secure APIs, middleware, and custom connectors. No data migration required—we build bridges between your existing infrastructure.",
    category: "Integration",
  },
  {
    question: "What's the typical timeline for implementing an AI solution?",
    answer:
      "Most engagements follow a 5-step process: (1) Proof of Concept (2 weeks), (2) AI Solutions & Integration (3-4 weeks), (3) Enterprise Systems Integration (2-3 weeks), (4) Safety & Privacy Tuning (1-2 weeks), (5) Deployment & Monitoring (ongoing). Total: 8-12 weeks to production.",
    category: "Timeline & Process",
  },
  {
    question: "How do you handle hallucination and accuracy in AI models?",
    answer:
      "We implement guardrails, fallback mechanisms, role-based permissions, and response benchmarking to ensure accuracy. Our Retrieval-Augmented Generation (RAG) approach grounds AI responses in your internal knowledge base, reducing hallucination by 85%+.",
    category: "AI Quality",
  },
  {
    question: "Can you help us move from rule-based systems to AI-powered workflows?",
    answer:
      "Absolutely. We build production-ready AI microservices, vector databases, and monitoring dashboards that replace legacy workflows. Your team gets a live operations dashboard for cost, latency, and model drift monitoring.",
    category: "Modernization",
  },
  {
    question: "What's included in your AI Compliance & Security Assessment?",
    answer:
      "We audit your AI implementation for GDPR, DPDP, SOX, and industry-specific compliance. Deliverables include a detailed security assessment, risk matrix, guardrails implementation plan, and ongoing monitoring setup.",
    category: "Compliance",
  },
];
