export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  designation: string;
  company: string;
  service: string;
  location: string;
  rating: number;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "Arav Innovations transformed our digital infrastructure with remarkable precision. Their technical leadership bridged the gap between our business goals and engineering execution.",
    author: "[EXECUTIVE NAME PENDING APPROVAL]",
    designation: "Chief Technology Officer",
    company: "[ENTERPRISE CLIENT - FINANCIAL SERVICES]",
    service: "IT Strategy & Consulting",
    location: "UAE",
    rating: 5,
  },
  {
    id: "test-2",
    quote:
      "Their web development team delivered a sub-second platform on Next.js that exceeded all our performance expectations and significantly boosted conversion.",
    author: "[EXECUTIVE NAME PENDING APPROVAL]",
    designation: "VP of Digital Engineering",
    company: "[ENTERPRISE CLIENT - B2B SAAS]",
    service: "Web & App Development",
    location: "India",
    rating: 5,
  },
  {
    id: "test-3",
    quote:
      "Unlike conventional agencies, Arav Innovations approaches digital marketing with engineering rigor and full-funnel attribution that proves exact ROI.",
    author: "[EXECUTIVE NAME PENDING APPROVAL]",
    designation: "Head of Growth & Demand Gen",
    company: "[CLIENT - PROFESSIONAL SERVICES]",
    service: "Digital Marketing & SEO",
    location: "Global",
    rating: 5,
  },
  {
    id: "test-4",
    quote:
      "Their risk and governance team made our SOC-2 and ISO 27001 readiness seamless, navigating complex requirements without slowing down product releases.",
    author: "[EXECUTIVE NAME PENDING APPROVAL]",
    designation: "Director of Information Security",
    company: "[ENTERPRISE CLIENT - CLOUD TECH]",
    service: "Risk Governance & Compliance",
    location: "India",
    rating: 5,
  },
];
