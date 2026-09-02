import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs } from "@/lib/cms";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WaitlistForm } from "@/components/products/WaitlistForm";
import {
  BreadcrumbSchema,
  ProductSchema,
} from "@/components/seo/StructuredData";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Users2,
  Zap,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const url = `https://aravinnovations.com/products/${slug}`;

  return {
    title: `${product.name} — ${product.tagline} | Arav Innovations`,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} | Arav Innovations`,
      description: product.description,
      url,
      siteName: "Arav Innovations",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Arav Innovations`,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isLive = product.status === "live";

  return (
    <div className="pt-28 pb-20 bg-[#fefaf5] dark:bg-[#0a0a0a] transition-colors duration-300 min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: "Products", url: "/products" },
          { name: product.name, url: `/products/${product.slug}` },
        ]}
      />
      <ProductSchema
        name={product.name}
        description={product.description}
        category={product.category}
        url={`https://aravinnovations.com/products/${product.slug}`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* HERO SECTION */}
        <section className="space-y-4 text-center sm:text-left">
          <ScrollReveal direction="up">
            <Breadcrumb
              items={[
                { label: "Products", href: "/products" },
                { label: product.name },
              ]}
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xs"
                style={{ backgroundColor: product.badgeColor }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {product.badge}
              </span>
              <span className="text-xs font-mono font-bold text-[#f15e1c]">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-tight mt-3">
              {product.name}
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-[#f15e1c] font-display mt-2">
              {product.tagline}
            </p>
          </ScrollReveal>
        </section>

        {/* SECTION 1: OVERVIEW & POSITIONING */}
        <section className="space-y-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a] pt-10">
          <ScrollReveal direction="up">
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-[#f15e1c]">
              Product Overview &amp; Positioning
            </h2>
            <p className="text-base sm:text-lg text-[#1b2823] dark:text-[#ffffff] leading-relaxed mt-2 font-medium">
              {product.description}
            </p>

            {product.positioning && (
              <div className="p-5 rounded-2xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed mt-4">
                <span className="font-bold text-[#f15e1c] block mb-1 font-mono uppercase tracking-wide">
                  Strategic Positioning:
                </span>
                {product.positioning}
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {product.problemSolved.points.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs text-[#4a5c55] dark:text-[#d3eee4] space-y-1"
                >
                  <span className="font-mono font-bold text-[#f15e1c]">0{idx + 1}.</span>
                  <p className="leading-snug">{point}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 2: HOW IT WORKS / FREEMIUM FLOW */}
        <section className="space-y-6 border-t border-[#f7d7b0] dark:border-[#1a1a1a] pt-10">
          <ScrollReveal direction="up">
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-[#f15e1c]">
              User Consultation Flow &amp; Model
            </h2>
            {product.pricingNote && (
              <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] mt-1 font-medium">
                {product.pricingNote}
              </p>
            )}
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {product.howItWorks.map((stepItem, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} direction="up">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#1a1a1a] space-y-2 h-full">
                  <div className="w-8 h-8 rounded-full bg-[#f15e1c]/10 text-[#f15e1c] font-mono font-bold text-xs flex items-center justify-center border border-[#f15e1c]/30">
                    Step 0{stepItem.step}
                  </div>
                  <h4 className="text-sm font-bold text-[#1b2823] dark:text-[#ffffff]">
                    {stepItem.title}
                  </h4>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">
                    {stepItem.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* SECTION 3: KEY CAPABILITIES */}
        <section className="space-y-6 border-t border-[#f7d7b0] dark:border-[#1a1a1a] pt-10">
          <ScrollReveal direction="up">
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-[#f15e1c]">
              Key Capabilities
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {product.features.map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.04} direction="up">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#1a1a1a] flex items-center gap-2.5 hover:border-[#f15e1c]/50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                  <span className="text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    {feature}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* SECTION 4: DOWNLOADABLE REPORTS (ASTROBEAMS) */}
        {product.reports && product.reports.length > 0 && (
          <section className="space-y-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a] pt-10">
            <ScrollReveal direction="up">
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-[#f15e1c]">
                Downloadable Astrology &amp; Horoscope Reports
              </h2>
              <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] mt-1">
                Generate and download comprehensive PDF astrology reports directly on the platform.
              </p>
            </ScrollReveal>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {product.reports.map((reportItem, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#1b2823] dark:text-[#ffffff] shadow-xs flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f15e1c]" />
                  <span>{reportItem}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: GET STARTED CTA */}
        <section className="border-t border-[#f7d7b0] dark:border-[#1a1a1a] pt-10">
          <ScrollReveal direction="up">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#1a1a1a] text-center space-y-6 shadow-lg">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {isLive ? `Explore ${product.name}` : `Get Early Access to ${product.name}`}
                </h3>
                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] max-w-md mx-auto">
                  {isLive
                    ? "Start instant consultations directly on the AstroBeams platform."
                    : "Join our enterprise waitlist to receive priority access upon launch."}
                </p>
              </div>

              {isLive && product.externalUrl ? (
                <div className="pt-2">
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="rounded-full px-8 py-3.5 shadow-lg bg-[#f15e1c] hover:bg-[#d8480d] text-white"
                      rightIcon={<ExternalLink className="w-4 h-4 ml-1" />}
                    >
                      {product.ctaText}
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="pt-2">
                  <WaitlistForm productName={product.name} />
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
