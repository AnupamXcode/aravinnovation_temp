import { MetadataRoute } from "next";
import { servicesData } from "@/data/services";
import { caseStudiesData } from "@/data/case-studies";
import { productsData } from "@/data/products";
import { blogPostsData } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aravinnovations.com";

  const getAlternates = (path: string) => ({
    languages: {
      en: `${baseUrl}/en${path}`,
      // 'ar': `${baseUrl}/ar${path}`, // Scaffold for future locale
    },
  });

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/products",
    "/solutions",
    "/case-studies",
    "/testimonials",
    "/insights",
    "/careers",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
    alternates: getAlternates(route),
  }));

  const serviceRoutes = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
    alternates: getAlternates(`/services/${service.slug}`),
  }));

  const productRoutes = productsData.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
    alternates: getAlternates(`/products/${product.slug}`),
  }));

  const caseStudyRoutes = caseStudiesData.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: getAlternates(`/case-studies/${cs.slug}`),
  }));

  const insightRoutes = blogPostsData.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: getAlternates(`/insights/${post.slug}`),
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...productRoutes,
    ...caseStudyRoutes,
    ...insightRoutes,
  ];
}
