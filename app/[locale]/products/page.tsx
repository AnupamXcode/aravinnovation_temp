import * as React from "react";
import { Metadata } from "next";
import { getProducts } from "@/lib/cms";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProductCard } from "@/components/products/ProductCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Our Products | AstroBeams & OMNiGRC | Arav Innovations",
  description:
    "Explore Arav Innovations' purpose-built products: AstroBeams (live astrologer consultation platform) and OMNiGRC (SaaS platform for governance, risk & compliance).",
  alternates: {
    canonical: "https://aravinnovations.com/products",
  },
  openGraph: {
    title: "Our Products | Arav Innovations",
    description: "Purpose-built solutions for modern businesses.",
    url: "https://aravinnovations.com/products",
    siteName: "Arav Innovations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Products | Arav Innovations",
    description: "Purpose-built solutions for modern businesses.",
  },
};

import Link from "next/link";
import { ExternalLink, Globe, Smartphone, ShieldCheck, Sparkles, Code2, ArrowRight } from "lucide-react";

export default async function ProductsListingPage() {
  const products = await getProducts();

  return (
    <div className="pt-28 pb-20 bg-[#fefaf5] dark:bg-[#172420] transition-colors duration-300 min-h-screen">
      <BreadcrumbSchema items={[{ name: "Products", url: "/products" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 text-left">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Products" }]} />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f15e1c]/10 border border-[#f15e1c]/30 text-xs font-mono font-bold text-[#f15e1c]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROPRIETARY TECH PLATFORMS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight mt-2">
              Our Products &amp; Platforms
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl">
              Arav Innovations builds and delivers real digital products combining AI intelligence, enterprise risk governance, and scalable consumer platforms.
            </p>
          </ScrollReveal>
        </div>

        {/* Responsive Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {products.map((product, idx) => (
            <ScrollReveal key={product.slug} delay={idx * 0.1} direction="up" className="h-full">
              <ProductCard product={product} index={idx} />
            </ScrollReveal>
          ))}
        </div>

        {/* Device & Platform Access Section */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#253630] space-y-6 text-left shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Platform Capabilities &amp; Access Channels
                </h3>
                <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] mt-0.5">
                  Explore supported channels, web platforms, and integration frameworks across our products.
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-[#2e936f] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2e936f]" /> Enterprise Verified SLA
              </span>
            </div>

            {/* Functional Device Link Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://astrobeams.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] text-[#f15e1c] text-xs font-bold font-mono hover:bg-[#fefaf5] hover:border-[#f15e1c] hover:-translate-y-0.5 transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#f15e1c]" />
                <span>AI Platform (AstroBeams.ai)</span>
                <ExternalLink className="w-3 h-3 text-[#f15e1c]" />
              </a>

              <a
                href="https://www.astrobeams.store/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] text-[#2e936f] text-xs font-bold font-mono hover:bg-[#fefaf5] hover:border-[#2e936f] hover:-translate-y-0.5 transition-all shadow-xs cursor-pointer"
              >
                <Globe className="w-4 h-4 text-[#2e936f]" />
                <span>Spiritual Guidance Platform (AstroBeams.store)</span>
                <ExternalLink className="w-3 h-3 text-[#2e936f]" />
              </a>

              <Link
                href="/products/omnigrc"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] text-[#f15e1c] text-xs font-bold font-mono hover:bg-[#fefaf5] hover:border-[#f15e1c] hover:-translate-y-0.5 transition-all shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#f15e1c]" />
                <span>Enterprise GRC Console (OMNiGRC)</span>
                <ArrowRight className="w-3 h-3 text-[#f15e1c]" />
              </Link>

              <Link
                href="/contact?intent=setup-call"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] text-[#f15e1c] text-xs font-bold font-mono hover:bg-[#fefaf5] hover:border-[#f15e1c] hover:-translate-y-0.5 transition-all shadow-xs cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#f15e1c]" />
                <span>Mobile App &amp; API Integration</span>
                <ArrowRight className="w-3 h-3 text-[#f15e1c]" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
