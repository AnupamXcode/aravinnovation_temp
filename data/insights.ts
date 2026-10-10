import { wordpressPostsData } from "./wordpress-posts";

export interface BlogPostSection {
  heading: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  publishedAt: string; // e.g. "August 2026" / "2026-08-15"
  dateFormatted: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  tags: string[];
  keyTakeaways: string[];
  sections: BlogPostSection[];
  relatedServiceSlug?: string;
  relatedProductSlug?: string;
  cta: {
    badge?: string;
    headline: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  wpPostId?: number;
  featuredImageUrl?: string;
  contentHtml?: string;
}

export const blogPostsData: BlogPost[] = wordpressPostsData;

export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find((p) => p.slug === slug);
}

export function getAllBlogPostSlugs(): string[] {
  return blogPostsData.map((p) => p.slug);
}

export function getBlogCategories(): string[] {
  const cats = new Set(blogPostsData.map((p) => p.category));
  return Array.from(cats);
}
