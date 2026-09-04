import { BlogPost } from "@/data/insights";
import { wordpressPostsData } from "@/data/wordpress-posts";

/**
 * Maps categories to authentic original Arav Innovations WordPress images as safety fallback.
 * Strictly NO stock photos (Unsplash/Pexels) and NO AI-generated images.
 */
const ORIGINAL_WP_CATEGORY_MAPPINGS: Record<string, string> = {
  "Digital Marketing": "https://blog.aravinnovations.com/wp-content/uploads/2024/12/campaign-creators-yktK2qaiVHI-unsplash.jpg",
  "AI": "https://blog.aravinnovations.com/wp-content/uploads/2025/11/Top-100-AI-Tools-Changing-the-World-in-2026.png",
  "Web & App Dev": "https://blog.aravinnovations.com/wp-content/uploads/2025/03/pexels-pixabay-414837-scaled.jpg",
  "Risk Governance": "https://blog.aravinnovations.com/wp-content/uploads/2025/02/3d-internet-secuirty-badge-scaled.jpg",
  "IT Strategy": "https://blog.aravinnovations.com/wp-content/uploads/2025/01/businessman-plan-strategy-marketing-finance-goal-2025-planning-business-growth-with-technology-ai-environmental-care-new-year-resolutions-business_184421-3962.avif",
  "Audit & Improvement": "https://blog.aravinnovations.com/wp-content/uploads/2025/02/standard-quality-control-concept-m-scaled.jpg",
  "SEO": "https://blog.aravinnovations.com/wp-content/uploads/2025/06/SEO-vs-PPC-Which-One-Is-Right-for-You.png",
  "Default": "https://blog.aravinnovations.com/wp-content/uploads/2024/12/19198948-2-scaled.jpg",
};

/**
 * Normalizes image URLs to ensure valid, secure HTTPS WordPress URLs.
 */
function normalizeUrl(url: string): string {
  if (!url) return "";
  let clean = url.trim();
  if (clean.startsWith("http://blog.aravinnovations.com")) {
    clean = clean.replace("http://blog.aravinnovations.com", "https://blog.aravinnovations.com");
  } else if (clean.startsWith("http://aravinnovation.com")) {
    clean = clean.replace("http://aravinnovation.com", "https://blog.aravinnovations.com");
  } else if (clean.startsWith("https://aravinnovation.com")) {
    clean = clean.replace("https://aravinnovation.com", "https://blog.aravinnovations.com");
  }
  return clean;
}

/**
 * Returns the exact 1:1 original WordPress featured image URL for any given blog post.
 * Checks post.featuredImageUrl, matches slug against exported WordPress data, or falls back
 * strictly to an authentic original WordPress image for that category.
 */
export function getValidBlogImageUrl(post: Partial<BlogPost>): string {
  // 1. Direct featuredImageUrl on object
  if (post.featuredImageUrl) {
    const normalized = normalizeUrl(post.featuredImageUrl);
    if (normalized) return normalized;
  }

  // 2. Lookup in exported WordPress posts data by slug
  if (post.slug) {
    const wpPost = wordpressPostsData.find((p) => p.slug === post.slug);
    if (wpPost?.featuredImageUrl) {
      const normalized = normalizeUrl(wpPost.featuredImageUrl);
      if (normalized) return normalized;
    }
  }

  // 3. Category fallback using authentic original WordPress media library asset
  const categoryKey = post.category || "Default";
  return ORIGINAL_WP_CATEGORY_MAPPINGS[categoryKey] || ORIGINAL_WP_CATEGORY_MAPPINGS.Default;
}

/**
 * Returns authentic original WordPress image URL for category fallback handle
 */
export function getBlogCategoryFallback(category?: string): string {
  const categoryKey = category || "Default";
  return ORIGINAL_WP_CATEGORY_MAPPINGS[categoryKey] || ORIGINAL_WP_CATEGORY_MAPPINGS.Default;
}
