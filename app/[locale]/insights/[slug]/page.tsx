import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogPostBySlug, getAllBlogPostSlugs, getRelatedBlogPosts } from "@/lib/cms";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema, ArticleSchema } from "@/components/seo/StructuredData";
import {
  Clock,
  User2,
  Calendar,
  ArrowRight,
  Share2,
  Bookmark,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Layers,
} from "lucide-react";

interface InsightPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: InsightPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Insight Not Found",
    };
  }

  const url = `https://aravinnovations.com/insights/${slug}`;

  return {
    title: `${post.title} | Arav Innovations`,
    description: post.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | Arav Innovations`,
      description: post.summary,
      url,
      siteName: "Arav Innovations",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Arav Innovations`,
      description: post.summary,
    },
  };
}

export default async function InsightPostDetailPage({
  params,
}: InsightPostPageProps) {
  const { slug, locale } = (await params) as any;
  setRequestLocale(locale);
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(slug, locale, 2);
  const canonicalUrl = `https://aravinnovations.com/insights/${post.slug}`;

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      <BreadcrumbSchema
        items={[
          { name: "Insights", url: "/insights" },
          { name: post.title, url: `/insights/${post.slug}` },
        ]}
      />
      <ArticleSchema
        title={post.title}
        description={post.summary}
        datePublished={post.publishedAt}
        url={canonicalUrl}
        authorName={post.author.name}
        authorRole={post.author.role}
        category={post.category}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation & Breadcrumb */}
        <div className="space-y-6">
          <ScrollReveal direction="up">
            <div className="flex items-center justify-between">
              <Breadcrumb
                items={[
                  { label: "Insights", href: "/insights" },
                  { label: post.category },
                ]}
              />
              <Link
                href="/insights"
                className="text-xs font-semibold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All Insights
              </Link>
            </div>
          </ScrollReveal>

          {/* Post Header */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" size="md">
                  {post.category}
                </Badge>
                <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#f15e1c]" /> {post.readTime}
                </span>
                <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#f15e1c]" /> {post.dateFormatted}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Author Attribution */}
              <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FCE3D3] dark:bg-[#261F1A] border border-[#F4A97F]/30 dark:border-[#3D332B] flex items-center justify-center text-[#f15e1c]">
                    <User2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] block">
                      {post.author.name}
                    </span>
                    <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                      {post.author.role}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#7A6A5F] dark:text-[#B8ACA0] bg-white dark:bg-[#12100E] px-2.5 py-1 rounded-full border border-[#EFE2D6] dark:border-[#2C241E]">
                    Verified Technical Guide
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Key Takeaways Callout Box */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#171411] border-2 border-[#f15e1c]/30 dark:border-[#f15e1c]/40 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-[#f15e1c]">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Executive & Technical Takeaways
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#f15e1c] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Structured Article Body */}
        <article className="space-y-10">
          {post.sections.map((section, sIdx) => (
            <ScrollReveal key={sIdx} direction="up" delay={0.1}>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  {section.heading}
                </h2>
                <div className="space-y-4 text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  {section.body.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </article>

        {/* Tags */}
        <div className="pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0] mr-2">
            Related Topics:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#2C241E]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Topic-Relevant Contextual CTA */}
        <ScrollReveal direction="up">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] space-y-4 shadow-xl">
            {post.cta.badge && (
              <Badge variant="primary" size="sm">
                {post.cta.badge}
              </Badge>
            )}
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              {post.cta.headline}
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] max-w-2xl leading-relaxed">
              {post.cta.description}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link href={post.cta.buttonHref} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {post.cta.buttonText}
                </Button>
              </Link>
              {post.relatedProductSlug && (
                <Link
                  href={`/products/${post.relatedProductSlug}`}
                  className="w-full sm:w-auto"
                >
                  <Button variant="secondary" size="md" className="w-full sm:w-auto">
                    Explore Automated Platform
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Related Posts Grid */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-[#EFE2D6] dark:border-[#2C241E] space-y-6">
            <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Recommended Perspectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <TiltCard key={rel.slug} maxTilt={4} scale={1.01}>
                  <div className="p-6 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm space-y-3 flex flex-col justify-between h-full group">
                    <div className="space-y-2">
                      <Badge variant="secondary" size="sm">
                        {rel.category}
                      </Badge>
                      <h4 className="text-base font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors line-clamp-2">
                        <Link href={`/insights/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] line-clamp-2">
                        {rel.summary}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                      <Link
                        href={`/insights/${rel.slug}`}
                        className="text-xs font-bold text-[#f15e1c] inline-flex items-center gap-1"
                      >
                        Read Insight <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
