import { servicesData } from "@/data/services";
import { productsData } from "@/data/products";
import { caseStudiesData } from "@/data/case-studies";
import { blogPostsData } from "@/data/insights";

export interface SEOPageSettings {
  path: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  priority: number; // 0.0 - 1.0
  ogTitle?: string;
  ogImage?: string;
  ogDescription?: string;
  canonicalOverride?: string;
  robots: "Index, Follow" | "Index, NoFollow" | "NoIndex, Follow" | "NoIndex, NoFollow";
  jsonLdSchema: string;
  imageAltMappings: Record<string, string>;
}

export interface SEOAuditIssue {
  type: "error" | "warning" | "info";
  message: string;
}

export interface SEOAuditResult {
  score: number; // 0 - 100
  status: "optimal" | "warning" | "critical";
  issues: SEOAuditIssue[];
}

export const SITE_BASE_URL = "https://aravinnovations.com";

// Sitewide default Organization & LocalBusiness JSON-LD
export const siteOrganizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_BASE_URL}/#organization`,
      name: "Arav Innovations",
      url: SITE_BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_BASE_URL}/logo.png`,
        caption: "Arav Innovations Logo",
      },
      sameAs: [
        "https://www.linkedin.com/company/aravinnovations/",
        "https://www.instagram.com/aravinnovations",
        "https://www.facebook.com/people/Arav-Innovations/61566419637071/",
        "https://api.whatsapp.com/send?phone=919650625777",
        "https://x.com/AravInnovations",
        "https://www.youtube.com/@AravInnovations",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9650625777",
          contactType: "sales",
          areaServed: ["IN", "US", "EU", "CA"],
          availableLanguage: ["English", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+971-521555792",
          contactType: "sales",
          areaServed: ["AE", "GCC"],
          availableLanguage: ["English", "Arabic"],
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_BASE_URL}/#localbusiness-in`,
      name: "Arav Innovations - India HQ",
      image: `${SITE_BASE_URL}/og-default.jpg`,
      telephone: "+91-9650625777",
      email: "support@aravinnovations.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Cyber City Tech Zone",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        postalCode: "122002",
        addressCountry: "IN",
      },
      url: SITE_BASE_URL,
      priceRange: "$$$",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_BASE_URL}/#localbusiness-uae`,
      name: "Arav Innovations - UAE Hub",
      image: `${SITE_BASE_URL}/og-default.jpg`,
      telephone: "+971-521555792",
      email: "support@aravinnovations.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Business Bay Tower",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        postalCode: "00000",
        addressCountry: "AE",
      },
      url: SITE_BASE_URL,
      priceRange: "$$$",
    },
  ],
};

// Route Catalog with Dynamic Default Metadata & Schemas
export function getRouteCatalog(): SEOPageSettings[] {
  const routes: SEOPageSettings[] = [
    {
      path: "/",
      label: "Homepage",
      metaTitle: "Enterprise IT & Growth | Arav Innovations",
      metaDescription: "Arav Innovations delivers enterprise IT strategy, full-stack web & mobile engineering, performance marketing, DPDP compliance audit, and staff augmentation globally.",
      priority: 1.0,
      ogTitle: "Enterprise IT & Growth | Arav Innovations",
      ogImage: `${SITE_BASE_URL}/og-default.jpg`,
      ogDescription: "Enterprise technology, digital growth marketing, risk governance & dedicated engineering squads.",
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Arav Innovations",
          url: SITE_BASE_URL,
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_BASE_URL}/services?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
        null,
        2
      ),
      imageAltMappings: {
        "/logo.png": "Arav Innovations circular brand logo",
        "/hero-banner.jpg": "Enterprise IT Architecture and Software Development Diagram",
        "/office-dubai.jpg": "Arav Innovations Dubai Regional Office",
      },
    },
    {
      path: "/about",
      label: "About Us",
      metaTitle: "About Us | Arav Innovations",
      metaDescription: "Learn about Arav Innovations' dual-hub engineering model across Gurgaon and Dubai, driving high-impact digital transformation for global enterprises.",
      priority: 0.8,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Arav Innovations",
          url: `${SITE_BASE_URL}/about`,
          description: "Multidisciplinary technology, strategy, digital growth, governance, and staff augmentation firm.",
        },
        null,
        2
      ),
      imageAltMappings: {
        "/team-culture.jpg": "Arav Innovations Engineering Team Collaboration",
      },
    },
    {
      path: "/services",
      label: "8 Core Services",
      metaTitle: "Enterprise Services & Technology Practices | Arav Innovations",
      metaDescription: "Explore our 8 core services: IT Strategy, Digital Marketing & Branding, Web & App Development, Risk & Compliance, Audits, Staff Augmentation, Technical SEO, and AI Portfolio.",
      priority: 0.9,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Arav Innovations Core Services",
          itemListElement: servicesData.map((s, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: s.title,
            url: `${SITE_BASE_URL}/services/${s.slug}`,
          })),
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/products",
      label: "Product Ecosystem",
      metaTitle: "Software Products & SaaS | Arav Innovations",
      metaDescription: "Discover proprietary enterprise solutions built by Arav Innovations for DPDP compliance, AI lead scoring, cloud optimization, and security governance.",
      priority: 0.9,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Enterprise Products Ecosystem",
          url: `${SITE_BASE_URL}/products`,
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/solutions",
      label: "Industry Solutions",
      metaTitle: "Industry Tech Solutions | Arav Innovations",
      metaDescription: "Tailored digital platforms and compliance frameworks for FinTech, E-Commerce, Healthcare, SaaS, Logistics, and Professional Services.",
      priority: 0.8,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Industry Tech Solutions",
          url: `${SITE_BASE_URL}/solutions`,
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/case-studies",
      label: "Case Studies Hub",
      metaTitle: "Case Studies & Results | Arav Innovations",
      metaDescription: "Read real client transformation case studies delivering 3.4x conversion uplift, 45% latency reduction, and 100% DPDP Act compliance.",
      priority: 0.8,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Enterprise Case Studies",
          url: `${SITE_BASE_URL}/case-studies`,
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/testimonials",
      label: "Client Testimonials",
      metaTitle: "Client Reviews & Feedback | Arav Innovations",
      metaDescription: "Read verified client testimonials from CTOs and engineering leaders collaborating with Arav Innovations across India and Dubai.",
      priority: 0.7,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Client Testimonials & Endorsements",
          url: `${SITE_BASE_URL}/testimonials`,
          description: "Read verified client testimonials from CTOs and engineering leaders collaborating with Arav Innovations across India and Dubai.",
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/insights",
      label: "Insights & Tech Blog",
      metaTitle: "Tech Blog & Insights | Arav Innovations",
      metaDescription: "Actionable articles on Next.js App Router performance, DPDP Act compliance strategies, B2B demand generation, and AI workflow integration.",
      priority: 0.8,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Arav Innovations Technology Blog",
          url: `${SITE_BASE_URL}/insights`,
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/careers",
      label: "Careers & Squads",
      metaTitle: "Careers & Senior Squads | Arav Innovations",
      metaDescription: "We are hiring principal software engineers, technical SEO strategists, compliance consultants, and UI/UX designers in Gurgaon & Dubai.",
      priority: 0.7,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "CareersPage",
          name: "Careers at Arav Innovations",
          url: `${SITE_BASE_URL}/careers`,
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/contact",
      label: "Contact & Global Hubs",
      metaTitle: "Contact Us | Arav Innovations",
      metaDescription: "Get in touch with our strategy and engineering pods in Gurugram (India) or Dubai (UAE). Fast 24-hour response for enterprise inquiries.",
      priority: 0.8,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Arav Innovations",
          url: `${SITE_BASE_URL}/contact`,
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/privacy-policy",
      label: "Privacy Policy",
      metaTitle: "Privacy Policy | Arav Innovations",
      metaDescription: "Read Arav Innovations' privacy policy detailing data processing, DPDP compliance, cookie disclosures, and global privacy standards.",
      priority: 0.3,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          url: `${SITE_BASE_URL}/privacy-policy`,
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/terms-and-conditions",
      label: "Terms & Conditions",
      metaTitle: "Terms & Conditions | Arav Innovations",
      metaDescription: "Master service agreement terms and conditions governing engineering services, IP rights, and SLA guarantees at Arav Innovations.",
      priority: 0.3,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms and Conditions",
          url: `${SITE_BASE_URL}/terms-and-conditions`,
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/refund-policy",
      label: "Refund & Cancellation",
      metaTitle: "Refund Policy | Arav Innovations",
      metaDescription: "Clear terms and service level milestones regarding project retainer refunds, milestone cancellations, and support guarantees.",
      priority: 0.3,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Refund Policy",
          url: `${SITE_BASE_URL}/refund-policy`,
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
    {
      path: "/security-dpdp",
      label: "Security & DPDP Compliance",
      metaTitle: "Security & DPDP Compliance | Arav Innovations",
      metaDescription: "Overview of Arav Innovations' enterprise security standards, data protection officer roles, SOC-2 readiness, and DPDP compliance audits.",
      priority: 0.6,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Security & DPDP Compliance",
          url: `${SITE_BASE_URL}/security-dpdp`,
        },
        null,
        2
      ),
      imageAltMappings: {},
    },
  ];

  // Dynamic Service Pages
  servicesData.forEach((s) => {
    routes.push({
      path: `/services/${s.slug}`,
      label: `Service: ${s.title}`,
      metaTitle: `${s.title} Services | Arav Innovations Engineering`,
      metaDescription: s.description || `Enterprise grade ${s.title.toLowerCase()} delivered by specialized engineering squads in India & UAE.`,
      priority: 0.8,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          provider: {
            "@type": "Organization",
            name: "Arav Innovations",
          },
          serviceType: s.title,
          description: s.description,
          areaServed: ["Global", "India", "UAE"],
        },
        null,
        2
      ),
      imageAltMappings: {
        "/service-hero.jpg": `${s.title} visual representation`,
      },
    });
  });

  // Dynamic Product Pages
  productsData.forEach((p) => {
    routes.push({
      path: `/products/${p.slug}`,
      label: `Product: ${p.name}`,
      metaTitle: `${p.name} SaaS Platform | Arav Innovations`,
      metaDescription: p.description || `Explore ${p.name}, a high-performance software solution built for enterprise digital transformation.`,
      priority: 0.8,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.description,
          brand: {
            "@type": "Brand",
            name: "Arav Innovations",
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${SITE_BASE_URL}/products/${p.slug}`,
          },
        },
        null,
        2
      ),
      imageAltMappings: {
        "/product-hero.jpg": `${p.name} interface preview`,
      },
    });
  });

  // Dynamic Case Studies
  caseStudiesData.forEach((cs) => {
    routes.push({
      path: `/case-studies/${cs.slug}`,
      label: `Case Study: ${cs.client}`,
      metaTitle: `Case Study: ${cs.title} | ${cs.client}`,
      metaDescription: `How Arav Innovations helped ${cs.client} achieve ${cs.results?.[0]?.metric || "scalable growth"} with enterprise software solutions.`,
      priority: 0.7,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: cs.title,
          description: cs.summary || cs.title,
          publisher: {
            "@type": "Organization",
            name: "Arav Innovations",
            url: SITE_BASE_URL,
          },
        },
        null,
        2
      ),
      imageAltMappings: {},
    });
  });

  // Dynamic Insight/Blog Posts
  blogPostsData.forEach((post) => {
    routes.push({
      path: `/insights/${post.slug}`,
      label: `Blog: ${post.title}`,
      metaTitle: `${post.title} | Arav Innovations Insights`,
      metaDescription: post.summary || `Read detailed technical insights on ${post.title} written by senior architects at Arav Innovations.`,
      priority: 0.7,
      robots: "Index, Follow",
      jsonLdSchema: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          author: {
            "@type": "Person",
            name: post.author.name,
            jobTitle: post.author.role,
          },
          datePublished: post.publishedAt,
          publisher: {
            "@type": "Organization",
            name: "Arav Innovations",
            logo: {
              "@type": "ImageObject",
              url: `${SITE_BASE_URL}/logo.png`,
            },
          },
        },
        null,
        2
      ),
      imageAltMappings: {},
    });
  });

  return routes;
}

// In-Memory & LocalStorage Persistence Helpers
const SEO_STORAGE_KEY = "arav_seo_overrides_v1";

export function getStoredSEOOverrides(): Record<string, Partial<SEOPageSettings>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(SEO_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSEOOverride(path: string, override: Partial<SEOPageSettings>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredSEOOverrides();
    current[path] = { ...current[path], ...override };
    localStorage.setItem(SEO_STORAGE_KEY, JSON.stringify(current));
    // Dispatch custom event for instant live preview listeners
    window.dispatchEvent(new CustomEvent("arav_seo_updated", { detail: { path } }));
  } catch {
    // Ignore storage failure
  }
}

export function getSEOForPath(path: string): SEOPageSettings {
  const catalog = getRouteCatalog();
  const found = catalog.find((r) => r.path === path);

  const fallback: SEOPageSettings = {
    path,
    label: path === "/" ? "Homepage" : path.replace(/^\//, "").replace(/-/g, " "),
    metaTitle: `${path === "/" ? "Home" : path.replace(/^\//, "").replace(/-/g, " ")} | Arav Innovations`,
    metaDescription: "Arav Innovations provides IT strategy consulting, full-stack software development, performance marketing, and compliance governance globally.",
    priority: 0.5,
    robots: "Index, Follow",
    jsonLdSchema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: path,
      url: `${SITE_BASE_URL}${path}`,
    }, null, 2),
    imageAltMappings: {},
  };

  const baseSettings = found || fallback;

  const overrides = getStoredSEOOverrides();
  const overrideForPath = overrides[path];

  if (!overrideForPath) return baseSettings;

  return {
    ...baseSettings,
    ...overrideForPath,
    // ensure imageAltMappings are merged if partial
    imageAltMappings: {
      ...baseSettings.imageAltMappings,
      ...(overrideForPath.imageAltMappings || {}),
    },
  };
}

// Live SEO Audit Evaluation Algorithm
export function evaluateSEOAudit(seo: SEOPageSettings): SEOAuditResult {
  const issues: SEOAuditIssue[] = [];

  // Title Checks
  const titleLen = seo.metaTitle ? seo.metaTitle.length : 0;
  if (titleLen === 0) {
    issues.push({ type: "error", message: "Meta title is missing." });
  } else if (titleLen < 30) {
    issues.push({ type: "warning", message: `Meta title is short (${titleLen} chars). Recommended: 30–60 chars.` });
  } else if (titleLen > 60) {
    issues.push({ type: "warning", message: `Meta title is long (${titleLen} chars). Recommended: 30–60 chars.` });
  }

  // Description Checks
  const descLen = seo.metaDescription ? seo.metaDescription.length : 0;
  if (descLen === 0) {
    issues.push({ type: "error", message: "Meta description is missing." });
  } else if (descLen < 120) {
    issues.push({ type: "warning", message: `Meta description is short (${descLen} chars). Recommended: 120–160 chars.` });
  } else if (descLen > 160) {
    issues.push({ type: "warning", message: `Meta description is long (${descLen} chars). Recommended: 120–160 chars.` });
  }

  // Robots checks
  if (seo.robots.includes("NoIndex")) {
    issues.push({ type: "info", message: "Page is explicitly set to NoIndex. Will not be indexed by search engines." });
  }

  // Canonical checks
  if (!seo.canonicalOverride) {
    issues.push({ type: "info", message: "Canonical link using default URL structure." });
  }

  // JSON-LD Validation
  if (!seo.jsonLdSchema || seo.jsonLdSchema.trim() === "") {
    issues.push({ type: "warning", message: "No structured JSON-LD schema defined." });
  } else {
    try {
      JSON.parse(seo.jsonLdSchema);
    } catch {
      issues.push({ type: "error", message: "Structured JSON-LD schema has invalid JSON syntax." });
    }
  }

  // Alt Text Mappings Checks
  const altKeys = Object.keys(seo.imageAltMappings || {});
  if (altKeys.length === 0) {
    issues.push({ type: "warning", message: "No custom image alt text mappings defined for this route." });
  }

  const errors = issues.filter((i) => i.type === "error").length;
  const warnings = issues.filter((i) => i.type === "warning").length;

  let score = 100 - errors * 30 - warnings * 10;
  if (score < 0) score = 0;

  let status: SEOAuditResult["status"] = "optimal";
  if (errors > 0) status = "critical";
  else if (warnings > 0) status = "warning";

  return {
    score,
    status,
    issues,
  };
}

export function getAltTextForImage(path: string, src: string, fallbackAlt: string = "Arav Innovations image"): string {
  const seo = getSEOForPath(path);
  if (seo.imageAltMappings && seo.imageAltMappings[src]) {
    return seo.imageAltMappings[src];
  }
  return fallbackAlt;
}
