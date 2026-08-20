/**
 * CMS Data Layer Abstraction for Arav Innovations
 * 
 * Provides typed, decoupled data access across Services, Case Studies, Products,
 * Blog/Insights, Testimonials, and Industry Solutions.
 * 
 * Architecture:
 * - Components and pages consume data exclusively via these typed functions.
 * - Current provider: In-memory typed static datasets (fast, zero external runtime dependency).
 * - Extensible: Ready to swap with Headless CMS clients (e.g., Sanity, Contentful, Strapi)
 *   by providing the appropriate environment variables without breaking component interfaces.
 */

import { servicesData, getServiceBySlug as getServiceFromData, getAllServiceSlugs as getSlugsFromData, Service } from "@/data/services";
import { caseStudiesData, getCaseStudyBySlug as getCaseStudyFromData, CaseStudy } from "@/data/case-studies";
import { productsData, getProductBySlug as getProductFromData, getAllProductSlugs as getProductSlugsFromData, Product } from "@/data/products";
import { blogPostsData, getBlogPostBySlug as getBlogPostFromData, getAllBlogPostSlugs as getBlogSlugsFromData, getBlogCategories as getCategoriesFromData, BlogPost } from "@/data/insights";
import { testimonialsData, Testimonial } from "@/data/testimonials";
import { industriesData, IndustrySolution } from "@/data/industries";

// Re-export core types so consumers import from @/lib/cms
export type { Service, CaseStudy, Product, BlogPost, Testimonial, IndustrySolution };

export interface CMSConfig {
  provider: "static" | "sanity" | "contentful";
  isLiveCMSConfigured: boolean;
}

export function getCMSConfig(): CMSConfig {
  const isSanityConfigured = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET
  );

  return {
    provider: isSanityConfigured ? "sanity" : "static",
    isLiveCMSConfigured: isSanityConfigured,
  };
}

/* =========================================================================
   SERVICES
   ========================================================================= */

export async function getServices(): Promise<Service[]> {
  return servicesData;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return getServiceFromData(slug);
}

export async function getAllServiceSlugs(): Promise<string[]> {
  return getSlugsFromData();
}

/* =========================================================================
   CASE STUDIES
   ========================================================================= */

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return caseStudiesData;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  return getCaseStudyFromData(slug);
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  return caseStudiesData.map((c) => c.slug);
}

export async function getCaseStudiesByService(serviceSlug: string): Promise<CaseStudy[]> {
  return caseStudiesData.filter((c) => c.serviceSlug === serviceSlug);
}

/* =========================================================================
   PRODUCTS
   ========================================================================= */

export async function getProducts(): Promise<Product[]> {
  return productsData;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return getProductFromData(slug);
}

export async function getAllProductSlugs(): Promise<string[]> {
  return getProductSlugsFromData();
}

/* =========================================================================
   BLOG / INSIGHTS
   ========================================================================= */

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPostsData;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return getBlogPostFromData(slug);
}

export async function getAllBlogPostSlugs(): Promise<string[]> {
  return getBlogSlugsFromData();
}

export async function getBlogCategories(): Promise<string[]> {
  return getCategoriesFromData();
}

export async function getFeaturedBlogPost(): Promise<BlogPost> {
  return blogPostsData[0];
}

export async function getRelatedBlogPosts(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const current = getBlogPostFromData(currentSlug);
  if (!current) return blogPostsData.slice(0, limit);

  return blogPostsData
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return 0;
    })
    .slice(0, limit);
}

/* =========================================================================
   TESTIMONIALS & CLIENT PROOF
   ========================================================================= */

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonialsData;
}

export async function getTestimonialsByService(serviceName: string): Promise<Testimonial[]> {
  return testimonialsData.filter(
    (t) => t.service.toLowerCase().includes(serviceName.toLowerCase())
  );
}

/* =========================================================================
   INDUSTRIES
   ========================================================================= */

export async function getIndustries(): Promise<IndustrySolution[]> {
  return industriesData;
}

export async function getIndustryBySlug(slug: string): Promise<IndustrySolution | undefined> {
  return industriesData.find((ind) => ind.slug === slug);
}
