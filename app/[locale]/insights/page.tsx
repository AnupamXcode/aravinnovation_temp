import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogPosts, getBlogCategories } from "@/lib/cms";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { EmptyState } from "@/components/ui/empty-state";
import { ArrowRight, Clock, BookOpen, Sparkles, User2, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights & Engineering Perspectives | Arav Innovations",
  description:
    "Engineering guides, B2B digital growth strategies, DPDP regulatory insights, and cloud architecture deep dives authored by practice leads at Arav Innovations.",
  alternates: {
    canonical: "https://aravinnovations.com/insights",
  },
  openGraph: {
    title: "Insights & Engineering Perspectives | Arav Innovations",
    description:
      "Engineering guides, B2B digital growth strategies, DPDP regulatory insights, and cloud architecture deep dives.",
    url: "https://aravinnovations.com/insights",
    siteName: "Arav Innovations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Engineering Perspectives | Arav Innovations",
    description:
      "Engineering guides, B2B digital growth strategies, DPDP regulatory insights, and cloud architecture deep dives.",
  },
};

export default async function InsightsPage() {
  const articles = await getBlogPosts();
  const categories = await getBlogCategories();
  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Insights", url: "/insights" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Insights & Perspectives" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2">
              <Badge variant="secondary" size="md">
                <Sparkles className="w-3.5 h-3.5 text-[#f15e1c]" />
                <span>Executive Thought Leadership</span>
              </Badge>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Insights & Engineering Perspectives
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              In-depth analysis on modern software architecture, B2B demand generation, regulatory data privacy, and cloud FinOps optimization authored by our global practice leads.
            </p>
          </ScrollReveal>
        </div>

        {/* Categories Bar */}
        <ScrollReveal direction="up">
          <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-[#EFE2D6] dark:border-[#2C241E] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] mr-2">
              Practices:
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f15e1c] text-white">
              All Articles ({articles.length})
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#2C241E]"
              >
                {cat}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Featured Article */}
        {featuredArticle && (
          <ScrollReveal direction="up">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="primary" size="sm">
                    Featured Insight
                  </Badge>
                  <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#f15e1c]" /> {featuredArticle.readTime}
                  </span>
                  <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                    &bull; {featuredArticle.dateFormatted}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  <Link
                    href={`/insights/${featuredArticle.slug}`}
                    className="hover:text-[#f15e1c] transition-colors"
                  >
                    {featuredArticle.title}
                  </Link>
                </h2>
                <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  {featuredArticle.summary}
                </p>
                <div className="pt-3">
                  <Link href={`/insights/${featuredArticle.slug}`}>
                    <Button
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Read Full Deep-Dive
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] space-y-3 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] block">
                  Key Takeaways
                </span>
                <ul className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] space-y-2.5">
                  {featuredArticle.keyTakeaways.slice(0, 3).map((takeaway, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-[#f15e1c] font-bold">&bull;</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gridArticles.map((art, idx) => (
            <ScrollReveal key={art.slug} delay={idx * 0.1} direction="up" className="h-full">
              <TiltCard maxTilt={5} scale={1.01} className="h-full">
                <div className="h-full p-7 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm hover:shadow-2xl hover:border-[#f15e1c]/40 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" size="sm">
                        {art.category}
                      </Badge>
                      <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#f15e1c]" /> {art.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors line-clamp-3">
                      <Link href={`/insights/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E] flex items-center justify-between">
                    <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">{art.dateFormatted}</span>
                    <Link
                      href={`/insights/${art.slug}`}
                      className="text-xs font-bold text-[#f15e1c] hover:underline inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Topic Discussion CTA */}
        <ScrollReveal direction="up">
          <div className="rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4 shadow-xl">
            <h3 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Need Architectural Guidance on Any of These Topics?
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed max-w-xl mx-auto">
              Our practice directors consult globally with enterprise teams on cloud architecture, DPDP compliance, and performance marketing frameworks.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Connect With Practice Leads
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
