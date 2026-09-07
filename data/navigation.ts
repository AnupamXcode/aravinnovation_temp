export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

export const servicesNavigation: NavItem[] = [
  {
    label: "IT Strategy & Implementation",
    href: "/services/it-strategy-implementation",
    description: "Enterprise tech roadmaps, digital transformation blueprints, cloud architecture & IT governance.",
  },
  {
    label: "Digital Marketing & Brand Development",
    href: "/services/digital-marketing-brand-development",
    description: "B2B demand generation, brand positioning, multi-channel performance marketing & closed-loop attribution.",
  },
  {
    label: "Web & Application Development",
    href: "/services/web-app-development",
    description: "Scalable modern web applications, cloud native systems, enterprise SaaS portals & mobile apps.",
  },
  {
    label: "Risk, Compliance & Governance",
    href: "/services/risk-compliance-governance",
    description: "Regulatory compliance frameworks, data privacy (GDPR/DPDP), cybersecurity posture & risk mitigation.",
  },
  {
    label: "Audit & Improvement",
    href: "/services/audit-improvement",
    description: "System efficiency reviews, process bottleneck remediation, codebase audits & cloud cost optimization.",
  },
  {
    label: "Training & Staff Augmentation",
    href: "/services/training-staff-augmentation",
    description: "Vetted on-demand technical talent, enterprise upskilling programs & dedicated engineering squads.",
  },
  {
    label: "SEO Services",
    href: "/services/seo-services",
    description: "Technical SEO audits, programmatic indexing, enterprise topical authority & organic revenue growth.",
  },
  {
    label: "AI Portfolio",
    href: "/products",
    description: "Enterprise AI solutions, Intelligent Automation pipelines, RAG systems & seamless LLM integrations.",
  },
];

export const workingWithUsNavigation: NavItem[] = [
  {
    label: "Contact & Inquiries",
    href: "/contact",
    description: "Connect with our practice leads for NDAs, scoping, and enterprise proposals.",
    badge: "Direct",
  },
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
    label: "Case Studies",
    href: "/case-studies",
    description: "Documented enterprise outcomes across cloud, SaaS, and engineering.",
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
  {
    label: "About Arav Innovations",
    href: "/about",
    description: "Our leadership, global footprint, code ownership, and culture.",
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
    label: "Insights",
    href: "/insights",
  },
];

export const companyContactInfo = {
  name: "Arav Innovations",
  tagline: "Technology • Strategy • Digital Growth",
  email: "support@aravinnovations.com",
  connectEmail: "connect@aravinnovations.com",
  salesEmail: "sales@aravinnovations.com",
  careersEmail: "careers@aravinnovations.com",
  phoneIndia: "+91 9650625777",
  phoneIndiaRaw: "+919650625777",
  phoneUAE: "+971 521555792",
  phoneUAERaw: "+971521555792",
  offices: [
    {
      country: "India",
      city: "Gurgaon",
      name: "Arav Innovations — India",
      address: "Platinum Floor, 14/23, Ardee City, Sector 52, Gurgaon, 122002",
      status: "Regional Headquarters & Delivery Center",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.8286591147814!2d77.0842247!3d28.4385311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d22757279f187%3A0xb35a0928e1d53086!2sArdee%20City%2C%20Sector%2052%2C%20Gurugram%2C%20Haryana%20122002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Platinum+Floor,+14/23,+Ardee+City,+Sector+52,+Gurgaon,+122002",
      openInMapsUrl: "https://www.google.com/maps/search/?api=1&query=Platinum+Floor,+14/23,+Ardee+City,+Sector+52,+Gurgaon,+122002",
    },
    {
      country: "UAE",
      city: "Dubai",
      name: "Arav Innovations — UAE",
      address: "AravInnovations Consultancy - FZCO, 55764-001 IFZA Business Park FZCO, Building A1 Dubai Silicon Oasis, Dubai, U.A.E",
      status: "Middle East Operations & Strategy",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.441995874251!2d55.3853924!3d25.1207914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f647953c39c89%3A0xa1aa6b0dfef9cb81!2sIFZA%20Business%20Park!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=IFZA+Business+Park+FZCO,+Building+A1,+Dubai+Silicon+Oasis,+Dubai,+UAE",
      openInMapsUrl: "https://www.google.com/maps/search/?api=1&query=IFZA+Business+Park+FZCO,+Building+A1,+Dubai+Silicon+Oasis,+Dubai,+UAE",
    },
  ],
  socials: {
    instagram: "https://www.instagram.com/aravinnovations",
    facebook: "https://www.facebook.com/people/Arav-Innovations/61566419637071/",
    linkedin: "https://www.linkedin.com/company/aravinnovations/",
    whatsapp: "https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project.",
    twitter: "https://x.com/AravInnovations",
    youtube: "https://www.youtube.com/@AravInnovations",
  },
};
