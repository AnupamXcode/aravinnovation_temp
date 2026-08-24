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

export default async function ProductsListingPage() {
  const products = await getProducts();

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300 min-h-screen">
      <BreadcrumbSchema items={[{ name: "Products", url: "/products" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 text-left">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Products" }]} />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Our Products
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
              Purpose-built solutions for modern businesses
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column Responsive Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {products.map((product, idx) => (
            <ScrollReveal key={product.slug} delay={idx * 0.1} direction="up" className="h-full">
              <ProductCard product={product} index={idx} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
