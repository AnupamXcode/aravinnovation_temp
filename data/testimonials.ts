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
      "Partnering with Arav Innovations was a game-changer for our business. Their strategic approach and seamless execution helped us grow our digital presence exponentially. We couldn't be happier with the results.",
    author: "Alex Turner",
    designation: "Digital Marketing Head",
    company: "InnovateCo",
    service: "Digital Marketing & Strategy",
    location: "Global",
    rating: 5,
  },
  {
    id: "test-2",
    quote:
      "The team at Arav Innovations transformed our outdated systems into a state-of-the-art solution that not only boosted our efficiency but also provided us with a competitive edge. Truly remarkable work!",
    author: "Maria Gomez",
    designation: "CTO",
    company: "TechBridge Solutions",
    service: "Web & App Development",
    location: "Global",
    rating: 5,
  },
  {
    id: "test-3",
    quote:
      "Working with Arav Innovations was a fantastic experience. Their attention to detail and commitment to excellence set them apart. They understood our needs perfectly and delivered beyond expectations.",
    author: "Liam Shaw",
    designation: "Founder",
    company: "GreenSpace Enterprises",
    service: "IT Strategy & Consulting",
    location: "Global",
    rating: 5,
  },
  {
    id: "test-4",
    quote:
      "Arav Innovations provided unparalleled support and guidance throughout our project. Their expertise and proactive approach ensured the project's success, and their team was a pleasure to work with.",
    author: "Sophie Lee",
    designation: "COO",
    company: "Urban Insights",
    service: "Risk Governance & Operations",
    location: "Global",
    rating: 5,
  },
];
