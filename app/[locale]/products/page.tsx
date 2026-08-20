import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getProducts } from "@/lib/cms";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import {
  ShieldCheck,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  BarChart3,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise Products & Software Platforms | Arav Innovations",
  description:
    "Explore Arav Innovations' proprietary software suites: Arav ComplianceGuard™ (DPDP/GDPR consent platform) and Arav CloudOptima™ (Kubernetes FinOps & cloud cost reduction).",
  alternates: {
    canonical: "https://aravinnovations.com/products",
  },
  openGraph: {
    title: "Enterprise Products & Software Platforms | Arav Innovations",
    description:
      "Proprietary software suites for automated DPDP regulatory governance and multi-cloud FinOps cost optimization.",
    url: "https://aravinnovations.com/products",
    siteName: "Arav Innovations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Products & Software Platforms | Arav Innovations",
    description:
      "Proprietary software suites for automated DPDP regulatory governance and multi-cloud FinOps cost optimization.",
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Risk & Governance": <ShieldCheck className="w-5 h-5 text-[#E8672A]" />,
  "Cloud & DevOps": <Cpu className="w-5 h-5 text-[#E8672A]" />,
};

export default async function ProductsListingPage() {
  const products = await getProducts();

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Products", url: "/products" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Products & Platforms" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2">
              <Badge variant="secondary" size="md">
                <Sparkles className="w-3.5 h-3.5 text-[#E8672A]" />
                <span>Proprietary Enterprise Software</span>
              </Badge>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Software Platforms Engineered for Enterprise Scale
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              In addition to our bespoke consulting practices, Arav Innovations engineers turnkey software platforms that automate regulatory DPDP compliance, optimize cloud FinOps economics, and strengthen digital reliability across India and the UAE.
            </p>
          </ScrollReveal>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {products.map((product, idx) => (
            <ScrollReveal key={product.slug} delay={idx * 0.1} direction="up" className="h-full">
              <TiltCard maxTilt={4} scale={1.01} className="h-full">
                <div className="h-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm hover:shadow-2xl hover:border-[#E8672A]/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-6">
                    {/* Category & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2.5 rounded-xl bg-[#FCE3D3]/60 dark:bg-[#261F1A] border border-[#F4A97F]/30 dark:border-[#3D332B]">
                          {categoryIcons[product.category] || <Layers className="w-5 h-5 text-[#E8672A]" />}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0]">
                          {product.category}
                        </span>
                      </div>
                      {product.badge && (
                        <Badge variant="primary" size="sm">
                          {product.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Product Name & Tagline */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-sm font-semibold text-[#E8672A] mt-1">
                        {product.tagline}
                      </p>
                      <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mt-3">
                        {product.description}
                      </p>
                    </div>

                    {/* Key Features Preview */}
                    <div className="space-y-2 pt-2 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] block mb-2">
                        Key Capabilities:
                      </span>
                      {product.features.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                          <CheckCircle2 className="w-4 h-4 text-[#E8672A] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Proof Point Highlight */}
                    <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1C1814] border border-[#EFE2D6] dark:border-[#2C241E] flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] block">
                          {product.proofPoint.label}
                        </span>
                        <p className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] mt-0.5">
                          {product.proofPoint.detail}
                        </p>
                      </div>
                      <div className="text-2xl font-mono font-bold text-[#E8672A] pl-4 shrink-0">
                        {product.proofPoint.metric}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#E8672A]" />
                      <span className="capitalize">{product.pricingModel.replace("-", " ")}</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <Link
                        href={`/products/${product.slug}`}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          Explore Specs
                        </Button>
                      </Link>
                      <Link
                        href={`/products/${product.slug}#demo`}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full sm:w-auto"
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                          Request a Demo
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Custom Solution Notice */}
        <ScrollReveal direction="up">
          <div className="rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5 shadow-xl">
            <Badge variant="secondary" size="md">
              Custom Engineering & Integrations
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Require Custom Enterprise Tooling or Proprietary Middleware?
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] max-w-2xl mx-auto leading-relaxed">
              Our engineering squads design, build, and deploy custom enterprise software platforms and private SaaS modules tailored strictly to your company’s internal workflow requirements.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Discuss Custom Product Engineering
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
