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
import { BlogCardImage } from "@/components/insights/BlogCardImage";

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
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300">
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

      <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
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
                className="text-xs font-semibold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] inline-flex items-center gap-1 transition-colors min-h-[44px] px-2"
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

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Author Attribution */}
              <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FCE3D3] dark:bg-[#161616] border border-[#F4A97F]/30 dark:border-[#262626] flex items-center justify-center text-[#f15e1c]">
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
                  <span className="text-[10px] font-mono uppercase text-[#7A6A5F] dark:text-[#B8ACA0] bg-white dark:bg-[#000000] px-2.5 py-1 rounded-full border border-[#EFE2D6] dark:border-[#1f1f1f]">
                    Verified Technical Guide
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.12}>
            <div className="my-6">
              <BlogCardImage
                post={post}
                aspectRatio="h-64 sm:h-[400px] lg:h-[480px]"
                className="rounded-3xl border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md"
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Key Takeaways Callout Box */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#000000] border-2 border-[#f15e1c]/30 dark:border-[#f15e1c]/40 shadow-md space-y-4">
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
        {post.contentHtml ? (
          <ScrollReveal direction="up" delay={0.1}>
            <article
              className="article-content space-y-6 text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed
                [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:font-display [&_h1]:text-[#3A2E27] [&_h1]:dark:text-[#FAF5EE] [&_h1]:mt-8 [&_h1]:mb-4
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-display [&_h2]:text-[#3A2E27] [&_h2]:dark:text-[#FAF5EE] [&_h2]:mt-8 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-display [&_h3]:text-[#3A2E27] [&_h3]:dark:text-[#FAF5EE] [&_h3]:mt-6 [&_h3]:mb-3
                [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[#3A2E27] [&_h4]:dark:text-[#FAF5EE] [&_h4]:mt-4 [&_h4]:mb-2
                [&_p]:mb-4 [&_p]:leading-relaxed
                [&_a]:text-[#f15e1c] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-[#d04d13]
                [&_strong]:font-bold [&_strong]:text-[#3A2E27] [&_strong]:dark:text-[#FAF5EE]
                [&_b]:font-bold [&_b]:text-[#3A2E27] [&_b]:dark:text-[#FAF5EE]
                [&_em]:italic [&_i]:italic
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4
                [&_li]:pl-1
                [&_blockquote]:border-l-4 [&_blockquote]:border-[#f15e1c] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-[#FBF3EA] [&_blockquote]:dark:bg-[#1A1613] [&_blockquote]:p-4 [&_blockquote]:rounded-r-2xl [&_blockquote]:my-6
                [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:my-6 [&_img]:border [&_img]:border-[#EFE2D6] [&_img]:dark:border-[#1f1f1f] [&_img]:shadow-sm
                [&_figure]:my-6 [&_figure]:space-y-2
                [&_figcaption]:text-xs [&_figcaption]:text-center [&_figcaption]:text-[#7A6A5F] [&_figcaption]:dark:text-[#B8ACA0] [&_figcaption]:italic"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </ScrollReveal>
        ) : (
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
        )}

        {/* Tags */}
        <div className="pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f] flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0] mr-2">
            Related Topics:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#1f1f1f]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Topic-Relevant Contextual CTA */}
        <ScrollReveal direction="up">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-4 shadow-xl">
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
          <div className="pt-10 border-t border-[#EFE2D6] dark:border-[#1f1f1f] space-y-6">
            <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Recommended Perspectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <TiltCard key={rel.slug} maxTilt={4} scale={1.01}>
                  <div className="p-6 rounded-3xl bg-white dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm space-y-3 flex flex-col justify-between h-full group">
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
                    <div className="pt-3 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
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
