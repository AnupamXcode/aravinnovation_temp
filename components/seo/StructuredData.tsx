import * as React from "react";

/**
 * Sitewide Organization JSON-LD Schema
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arav Innovations",
    alternateName: "Arav Innovations Consulting",
    url: "https://aravinnovations.com",
    logo: "https://aravinnovations.com/logos/arav-logo.png",
    description:
      "Arav Innovations is a multidisciplinary B2B technology consulting, full-stack software engineering, digital marketing, risk & governance, and staff augmentation firm operating globally.",
    sameAs: [
      "https://www.linkedin.com/company/arav-innovations",
      "https://www.instagram.com/aravinnovations",
      "https://x.com/aravinnovations",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "connect@aravinnovations.com",
        areaServed: ["IN", "AE", "US", "GB", "SG"],
        availableLanguage: ["English", "Hindi", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@aravinnovations.com",
        areaServed: ["IN", "AE"],
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: [
      "IT Strategy & Consulting",
      "Full-Stack Web & App Development",
      "Next.js App Router Architecture",
      "B2B Performance Marketing & Demand Generation",
      "Technical SEO & Programmatic Search",
      "DPDP Act Compliance & Governance",
      "Cloud FinOps & Infrastructure Optimization",
      "IT Staff Augmentation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Local Business JSON-LD Schema
 */
export function LocalBusinessSchema({ location }: { location: "india" | "uae" | "both" }) {
  const businesses = [];

  if (location === "india" || location === "both") {
    businesses.push({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Arav Innovations - India Delivery Center",
      image: "https://aravinnovations.com/logos/arav-logo.png",
      url: "https://aravinnovations.com",
      telephone: "+91-80-00000000",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tech Hub Zone",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560100",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "12.9716",
        longitude: "77.5946",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    });
  }

  if (location === "uae" || location === "both") {
    businesses.push({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Arav Innovations - Middle East Operations",
      image: "https://aravinnovations.com/logos/arav-logo.png",
      url: "https://aravinnovations.com",
      telephone: "+971-4-0000000",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Business Bay / DIFC Region",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "25.2048",
        longitude: "55.2708",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    });
  }

  return (
    <>
      {businesses.map((biz, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(biz) }}
        />
      ))}
    </>
  );
}

/**
 * Article / BlogPosting JSON-LD Schema
 */
export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  url,
  authorName,
  authorRole,
  category,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  authorName: string;
  authorRole?: string;
  category?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Arav Innovations",
      logo: {
        "@type": "ImageObject",
        url: "https://aravinnovations.com/logos/arav-logo.png",
      },
    },
    articleSection: category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage JSON-LD Schema
 */
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList JSON-LD Schema
 */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url?: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aravinnovations.com",
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.name,
        ...(item.url ? { item: `https://aravinnovations.com${item.url}` } : {}),
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service JSON-LD Schema
 */
export function ServiceSchema({
  name,
  description,
  url,
  category,
}: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: category || name,
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Arav Innovations",
      url: "https://aravinnovations.com",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Product JSON-LD Schema
 */
export function ProductSchema({
  name,
  description,
  category,
  url,
}: {
  name: string;
  description: string;
  category: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: category,
    operatingSystem: "Cloud / SaaS / Multi-Cloud",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        valueAddedTaxIncluded: true,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Arav Innovations",
      url: "https://aravinnovations.com",
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
