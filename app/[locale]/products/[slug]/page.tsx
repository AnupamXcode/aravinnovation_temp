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
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300 min-h-screen">
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-xs"
                style={{ backgroundColor: product.badgeColor }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {product.badge}
              </span>
              <span className="text-xs font-semibold text-[#7A6A5F] dark:text-[#B8ACA0]">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-tight mt-3">
              {product.name}
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-[#E8672A] font-display mt-2">
              {product.tagline}
            </p>
          </ScrollReveal>
        </section>

        {/* SECTION 1: WHAT IT SOLVES */}
        <section className="space-y-4 border-t border-[#EFE2D6] dark:border-[#2C241E] pt-10">
          <ScrollReveal direction="up">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#E8672A]">
              What It Solves
            </h2>
            <p className="text-base sm:text-lg text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed mt-2 font-medium">
              {product.description}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {product.problemSolved.points.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] text-xs text-[#7A6A5F] dark:text-[#B8ACA0] space-y-1"
                >
                  <span className="font-mono font-bold text-[#E8672A]">0{idx + 1}.</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 2: KEY CAPABILITIES */}
        <section className="space-y-6 border-t border-[#EFE2D6] dark:border-[#2C241E] pt-10">
          <ScrollReveal direction="up">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#E8672A]">
              Key Capabilities
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.features.map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05} direction="up">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] flex items-start gap-3 hover:border-[#E8672A]/40 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#2e936f] shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    {feature}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* SECTION 3: WHO IT'S FOR */}
        <section className="space-y-4 border-t border-[#EFE2D6] dark:border-[#2C241E] pt-10">
          <ScrollReveal direction="up">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#E8672A]">
              Who It&apos;s For
            </h2>
            <div className="p-6 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] flex items-center gap-4 mt-2">
              <Users2 className="w-6 h-6 text-[#E8672A] shrink-0" />
              <p className="text-sm sm:text-base font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                {product.useCase}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 4: GET STARTED CTA */}
        <section className="border-t border-[#EFE2D6] dark:border-[#2C241E] pt-10">
          <ScrollReveal direction="up">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] text-center space-y-6 shadow-lg">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  {isLive ? `Explore ${product.name}` : `Get Early Access to ${product.name}`}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0] max-w-md mx-auto">
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
                      className="rounded-full px-8 py-3.5 shadow-lg"
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
