import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs } from "@/lib/cms";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { LeadForm } from "@/components/forms/LeadForm";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  BreadcrumbSchema,
  ProductSchema,
  FAQSchema,
} from "@/components/seo/StructuredData";
import {
  ShieldCheck,
  Cpu,
  Layers,
  Search,
  FileCheck2,
  Trash2,
  BarChart3,
  Code2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Workflow,
  Users2,
  Database,
  Building2,
  Clock,
  Zap,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
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
    title: `${product.name} | Enterprise Platform | Arav Innovations`,
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

const iconDict: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#E8672A]" />,
  Search: <Search className="w-6 h-6 text-[#E8672A]" />,
  FileCheck2: <FileCheck2 className="w-6 h-6 text-[#E8672A]" />,
  Layers: <Layers className="w-6 h-6 text-[#E8672A]" />,
  Cpu: <Cpu className="w-6 h-6 text-[#E8672A]" />,
  Trash2: <Trash2 className="w-6 h-6 text-[#E8672A]" />,
  BarChart3: <BarChart3 className="w-6 h-6 text-[#E8672A]" />,
  Code2: <Code2 className="w-6 h-6 text-[#E8672A]" />,
};

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const faqAccordionItems = product.faqs.map((faq, index) => ({
    id: `faq-${index}`,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
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
      <FAQSchema faqs={product.faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
        {/* 1. PRODUCT HERO SECTION */}
        <section className="space-y-6">
          <ScrollReveal direction="up">
            <Breadcrumb
              items={[
                { label: "Products", href: "/products" },
                { label: product.name },
              ]}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            <div className="lg:col-span-8 space-y-6">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="inline-flex items-center gap-2">
                  <Badge variant="secondary" size="md">
                    <Sparkles className="w-3.5 h-3.5 text-[#E8672A]" />
                    <span>{product.category}</span>
                  </Badge>
                  {product.badge && (
                    <Badge variant="primary" size="md">
                      {product.badge}
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-[1.1] mt-3">
                  {product.name}
                </h1>

                <p className="text-xl font-medium text-[#E8672A] font-display mt-2">
                  {product.tagline}
                </p>

                <p className="text-base sm:text-lg text-[#7A6A5F] dark:text-[#B8ACA0] max-w-2xl leading-relaxed mt-2">
                  {product.description}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <a href="#demo" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto shadow-md hover:shadow-xl hover:shadow-[#E8672A]/25"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Request a Demo
                    </Button>
                  </a>
                  <a href="#features" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Explore Architecture
                    </Button>
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Hero Summary Card */}
            <div className="lg:col-span-4">
              <ScrollReveal direction="left" delay={0.2}>
                <TiltCard maxTilt={5}>
                  <div className="p-8 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] space-y-6 shadow-xl">
                    <div className="flex items-center justify-between border-b border-[#EFE2D6] dark:border-[#2C241E] pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0]">
                        Deployment & Pricing
                      </span>
                      <span className="text-xs font-mono font-bold text-[#E8672A] uppercase">
                        {product.pricingModel.replace("-", " ")}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                      <div className="flex items-center justify-between">
                        <span>Delivery Center:</span>
                        <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">India & UAE</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Deployment Time:</span>
                        <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">Under 48 Hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Data Storage:</span>
                        <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">Customer Private Cloud</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Architecture:</span>
                        <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">Zero-Trust / Stateless</span>
                      </div>
                    </div>

                    {product.pricingNote && (
                      <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] italic border-t border-[#EFE2D6] dark:border-[#2C241E] pt-3">
                        {product.pricingNote}
                      </p>
                    )}

                    <div className="pt-2">
                      <a href="#demo" className="block w-full">
                        <Button variant="primary" size="md" className="w-full justify-center">
                          See It In Action <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM IT SOLVES */}
        <section className="space-y-8">
          <ScrollReveal direction="up">
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="sm">
                The Enterprise Challenge
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                {product.problemSolved.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.problemSolved.points.map((pt, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} direction="up">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm flex items-start gap-4 h-full">
                  <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 shrink-0 flex items-center justify-center font-mono font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                    {pt}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 3. KEY FEATURES */}
        <section id="features" className="space-y-8">
          <ScrollReveal direction="up">
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="sm">
                Engineered Capabilities
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Core Product Features & Platform Architecture
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(product.featureDetails || product.features.map((f, i) => ({ title: `Capability ${i + 1}`, description: f, iconName: "Zap" }))).map(
              (feat, idx) => {
                const icon = feat.iconName && iconDict[feat.iconName] ? iconDict[feat.iconName] : <Zap className="w-6 h-6 text-[#E8672A]" />;
                return (
                  <ScrollReveal key={idx} delay={idx * 0.08} direction="up">
                    <TiltCard maxTilt={6} scale={1.01} className="h-full">
                      <div className="h-full p-6 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm hover:shadow-xl hover:border-[#E8672A]/40 transition-all flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="p-3 rounded-2xl bg-[#FCE3D3]/50 dark:bg-[#261F1A] border border-[#F4A97F]/30 dark:border-[#3D332B] w-fit">
                            {icon}
                          </div>
                        <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                          {feat.title}
                        </h3>
                        <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* 4. HOW IT WORKS */}
        <section className="space-y-8">
          <ScrollReveal direction="up">
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="sm">
                Execution Workflow
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                How the Platform Operates
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.howItWorks.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} direction="up">
                <div className="p-8 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] space-y-4 shadow-sm h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#E8672A] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 5. WHO IT'S FOR */}
        <section className="space-y-8">
          <ScrollReveal direction="up">
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="sm">
                Target Stakeholders
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Engineered for High-Responsibility Leaders
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.targetAudience.map((audience, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} direction="up">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm flex items-center gap-3">
                  <Users2 className="w-5 h-5 text-[#E8672A] shrink-0" />
                  <span className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    {audience}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 6. INTEGRATIONS & TECH STACK */}
        <section className="space-y-8">
          <ScrollReveal direction="up">
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="sm">
                Ecosystem & Compatibility
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Enterprise Connectors & Technology Stack
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Integrations */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] space-y-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#E8672A]" />
                <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Supported Systems & Connectors
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.integrations.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] text-center"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] space-y-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#E8672A]" />
                <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Underlying Engineering Stack
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.techStack.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] text-center"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. PROOF POINT / CASE STUDY */}
        <section className="space-y-8">
          <ScrollReveal direction="up">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
              <div className="lg:col-span-8 space-y-4">
                <Badge variant="primary" size="sm">
                  Documented Proof Point
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Measurable Operational Impact
                </h3>
                <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  {product.proofPoint.detail}
                </p>
                {product.relatedServiceSlug && (
                  <div className="pt-2">
                    <Link
                      href={`/services/${product.relatedServiceSlug}`}
                      className="text-xs font-bold text-[#E8672A] hover:underline inline-flex items-center gap-1"
                    >
                      View Related Consulting Practice <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 p-8 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] text-center space-y-2 shadow-xs">
                <div className="text-4xl sm:text-5xl font-mono font-extrabold text-[#E8672A]">
                  {product.proofPoint.metric}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE]">
                  {product.proofPoint.label}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 8. FAQ SECTION */}
        <section className="space-y-8">
          <ScrollReveal direction="up">
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="sm">
                Technical FAQ
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Frequently Asked Technical & Deployment Questions
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <Accordion items={faqAccordionItems} />
          </ScrollReveal>
        </section>

        {/* 9. CTA & DEMO FORM */}
        <section id="demo" className="space-y-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Badge variant="primary" size="md">
                Direct Engineering Access
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
                Request a Tailored Demo of {product.name}
              </h2>
              <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                Experience the platform live with our principal architects. We will walk through architecture compatibility, connector setup, and custom pricing for your environment.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <LeadForm
                initialService={`Product Demo: ${product.name}`}
                source={`product_demo_${product.slug}`}
              />
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
