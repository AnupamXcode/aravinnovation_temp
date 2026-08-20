export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

export const servicesNavigation: NavItem[] = [
  {
    label: "IT Strategy & Consulting",
    href: "/services/it-strategy-consulting",
    description: "Enterprise tech roadmaps, digital transformation, cloud architecture & IT governance.",
  },
  {
    label: "Web & App Development",
    href: "/services/web-app-development",
    description: "Scalable modern web applications, cloud native systems, enterprise portals & mobile apps.",
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    description: "Data-driven B2B demand generation, multi-channel performance marketing & conversion optimization.",
  },
  {
    label: "Search Engine Optimization (SEO)",
    href: "/services/seo",
    description: "Technical SEO audits, programmatic indexing, enterprise authority building & organic revenue growth.",
  },
  {
    label: "Risk Governance & Compliance",
    href: "/services/risk-governance-compliance",
    description: "Regulatory compliance frameworks, data privacy (GDPR/DPDP), cybersecurity posture & risk mitigation.",
  },
  {
    label: "Audit & Improvement",
    href: "/services/audit-improvement",
    description: "System efficiency reviews, process bottlenecks remediation, code audits & cost optimization.",
  },
  {
    label: "Training & Staff Augmentation",
    href: "/services/training-staff-augmentation",
    description: "Vetted on-demand technical talent, enterprise upskilling programs & dedicated delivery squads.",
  },
];

export const workingWithUsNavigation: NavItem[] = [
  {
    label: "Our 5-Step Process",
    href: "/#process",
    description: "How we move from discovery to execution and measurable business outcomes.",
  },
  {
    label: "Clients & Testimonials",
    href: "/testimonials",
    description: "Feedback and proof of execution from cross-industry partners.",
  },
  {
    label: "Industry Solutions",
    href: "/solutions",
    description: "Tailored technology and growth frameworks for your vertical.",
  },
  {
    label: "Careers at Arav",
    href: "/careers",
    description: "Join our multidisciplinary engineering and strategy practice.",
  },
];

export const mainNavigation: NavItem[] = [
  {
    label: "What We Do",
    href: "/services",
    children: servicesNavigation,
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Working With Us",
    href: "/#process",
    children: workingWithUsNavigation,
  },
  {
    label: "Case Studies",
    href: "/case-studies",
  },
  {
    label: "Insights",
    href: "/insights",
  },
  {
    label: "About Us",
    href: "/about",
  },
];

export const companyContactInfo = {
  name: "Arav Innovations",
  tagline: "Technology • Strategy • Digital Growth",
  email: "connect@aravinnovations.com",
  salesEmail: "sales@aravinnovations.com",
  careersEmail: "careers@aravinnovations.com",
  phoneIndia: "+91 [CONTACT NUMBER PENDING]",
  phoneUAE: "+971 [CONTACT NUMBER PENDING]",
  offices: [
    {
      country: "India",
      city: "Bengaluru / Noida",
      address: "[OFFICE ADDRESS PENDING APPROVAL - INDIA HQ]",
      status: "Regional Headquarters & Delivery Center",
    },
    {
      country: "UAE",
      city: "Dubai",
      address: "[OFFICE ADDRESS PENDING APPROVAL - UAE REGION]",
      status: "Middle East Operations & Strategy",
    },
  ],
  socials: {
    linkedin: "https://www.linkedin.com/company/arav-innovations",
    instagram: "https://www.instagram.com/aravinnovations",
    twitter: "https://x.com/aravinnovations",
  },
};
