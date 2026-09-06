"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  Sparkles,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { useSiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.285-.143-1.689-.834-1.951-.929-.262-.095-.453-.143-.643.143-.19.286-.737.929-.904 1.119-.167.19-.333.214-.618.071-.285-.143-1.207-.445-2.299-1.419-.85-.758-1.424-1.694-1.591-1.98-.167-.286-.018-.44.125-.582.129-.128.285-.333.428-.5.143-.167.19-.286.285-.476.095-.19.048-.357-.024-.5-.071-.143-.643-1.547-.88-2.118-.231-.557-.465-.482-.643-.491l-.547-.01c-.19 0-.5.071-.761.357-.262.286-1.001.977-1.001 2.38 0 1.404 1.023 2.76 1.166 2.951.143.19 2.013 3.074 4.877 4.311.681.294 1.213.47 1.627.601.684.217 1.307.186 1.8.113.55-.082 1.689-.69 1.927-1.357.238-.667.238-1.238.167-1.357-.07-.119-.262-.19-.547-.333z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function AnimatedFooterSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 8 Verified Enterprise Services
const serviceLinks = [
  {
    num: "01",
    title: "IT Strategy & Implementation",
    href: "/services/it-strategy-implementation",
  },
  {
    num: "02",
    title: "Digital Marketing & Brand Development",
    href: "/services/digital-marketing-brand-development",
  },
  {
    num: "03",
    title: "Web & Application Development",
    href: "/services/web-app-development",
  },
  {
    num: "04",
    title: "Risk, Compliance & Governance",
    href: "/services/risk-compliance-governance",
  },
  {
    num: "05",
    title: "Audit & Improvement",
    href: "/services/audit-improvement",
  },
  {
    num: "06",
    title: "Training & Staff Augmentation",
    href: "/services/training-staff-augmentation",
  },
  {
    num: "07",
    title: "SEO Services",
    href: "/services/seo-services",
  },
  {
    num: "08",
    title: "AI Portfolio",
    href: "/services/ai-portfolio",
  },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Working With Us", href: "/#process" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const exploreLinks = [
  { label: "Our Approach", href: "/about" },
  { label: "Technology", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Blogs", href: "/blogs" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Security & DPDP", href: "/security-dpdp" },
];

export function Footer() {
  const pathname = usePathname();
  const { config } = useSiteConfig();
  const footerConfig = config.footerConfig;

  // Do not render footer on admin routes
  if (pathname?.includes("/admin")) {
    return null;
  }

  return (
    <footer className="w-full relative bg-gradient-to-br from-[#1b2823] via-[#243e34] to-[#1b2823] text-white pt-12 pb-8 overflow-hidden select-none border-t border-[#2e936f]/40">
      
      {/* Refined Ambient Background Lighting (Arav Brand Colors: Warm Orange #f15e1c & Emerald Green #2e936f) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f15e1c]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2e936f]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Max-Width Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-12">
        
        {/* =========================================================================
            LAYER 1: COMPACT TOP CTA AREA (Vibrant Brand Gradient CTA)
            ========================================================================= */}
        <AnimatedFooterSection delay={0.03}>
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#f15e1c] via-[#e04f0f] to-[#fab60a] border border-[#ffec69]/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden text-white">
            {/* Soft Ambient Inner Glow */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#ffec69]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-2 text-left max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 border border-white/40 text-[11px] font-mono font-bold text-white shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
                <span>START YOUR TRANSFORMATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display tracking-tight text-white leading-snug">
                {footerConfig.ctaHeading}
              </h2>
              <p className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed">
                {footerConfig.ctaDescription}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0 relative z-10">
              <Link
                href={footerConfig.ctaPrimaryHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1b2823] hover:bg-white text-white hover:text-[#1b2823] text-xs font-mono font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>{footerConfig.ctaPrimaryText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={footerConfig.ctaSecondaryHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#1b2823] border border-white/40 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-all duration-300 group"
              >
                <span>{footerConfig.ctaSecondaryHref === "/services" ? "EXPLORE SERVICES" : footerConfig.ctaSecondaryText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimatedFooterSection>

        {/* =========================================================================
            LAYER 2: MAIN FOOTER NAVIGATION (STRUCTURED MULTI-COLUMN)
            ========================================================================= */}
        <AnimatedFooterSection delay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left border-b border-[#2e936f]/30 pb-10">
          
          {/* COLUMN 1: SERVICES (5 Cols on Large screens - Minimal clean list, NO 8 large cards) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xs font-mono font-black text-[#ffec69] uppercase tracking-widest">
                SERVICES
              </h3>
              <p className="text-[11px] text-[#f7d7b0]/90 font-mono">
                Enterprise Technology &amp; Growth Practices
              </p>
            </div>

            <ul className="space-y-2">
              {serviceLinks.map((service, idx) => (
                <motion.li
                  key={service.num}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                >
                  <Link
                    href={service.href}
                    className="group flex items-center justify-between py-1.5 px-2 -mx-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono font-bold text-[#ffec69] group-hover:text-white transition-colors">
                        {service.num}
                      </span>
                      <span className="text-xs sm:text-sm font-sans font-semibold text-white/90 group-hover:text-[#ffec69] group-hover:translate-x-1 transition-all duration-200">
                        {service.title}
                      </span>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-[#ffec69] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: COMPANY (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono font-black text-[#ffec69] uppercase tracking-widest">
              COMPANY
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold text-white/85">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[#ffec69] hover:translate-x-0.5 transition-all inline-block focus:outline-none focus:ring-1 focus:ring-[#f15e1c] rounded-xs"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: EXPLORE (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono font-black text-[#ffec69] uppercase tracking-widest">
              EXPLORE
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold text-white/85">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[#ffec69] hover:translate-x-0.5 transition-all inline-block focus:outline-none focus:ring-1 focus:ring-[#f15e1c] rounded-xs"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: CONNECT (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-black text-[#ffec69] uppercase tracking-widest">
              CONNECT
            </h3>
            
            <ul className="space-y-2.5 text-xs font-medium text-white/90">
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-white font-bold hover:text-[#ffec69] transition-colors"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ffec69]" />
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${footerConfig.supportEmail}`}
                  className="inline-flex items-center gap-2 hover:text-[#ffec69] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ffec69] shrink-0" />
                  <span>{footerConfig.supportEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerConfig.phoneIndia.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 hover:text-[#ffec69] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ffec69] shrink-0" />
                  <span>{footerConfig.phoneIndia} (India)</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerConfig.phoneUAE.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 hover:text-[#ffec69] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#fab60a] shrink-0" />
                  <span>{footerConfig.phoneUAE} (UAE)</span>
                </a>
              </li>
            </ul>

            {/* Social Media Row */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-mono text-[#f7d7b0] uppercase tracking-wider block">
                FOLLOW US
              </span>
              <div className="flex items-center gap-2">
                {[
                  { name: "LinkedIn", href: config.linkedinUrl || "https://www.linkedin.com/company/aravinnovations/", icon: <LinkedInIcon className="w-3.5 h-3.5" /> },
                  { name: "Instagram", href: config.instagramUrl || "https://www.instagram.com/aravinnovations", icon: <InstagramIcon className="w-3.5 h-3.5" /> },
                  { name: "Facebook", href: config.facebookUrl || "https://www.facebook.com/people/Arav-Innovations/61566419637071/", icon: <FacebookIcon className="w-3.5 h-3.5" /> },
                  { name: "WhatsApp", href: config.whatsappUrl || "https://api.whatsapp.com/send?phone=971521555792", icon: <WhatsAppIcon className="w-3.5 h-3.5" /> },
                  { name: "Twitter", href: config.twitterUrl || "https://x.com/AravInnovations", icon: <TwitterIcon className="w-3.5 h-3.5" /> },
                  { name: "YouTube", href: config.youtubeUrl || "https://www.youtube.com/@AravInnovations", icon: <YoutubeIcon className="w-3.5 h-3.5" /> },
                ].map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.name}
                    className="w-8 h-8 rounded-xl bg-white/15 hover:bg-[#f15e1c] text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </AnimatedFooterSection>

        {/* =========================================================================
            LAYER 3: REGIONAL PRESENCE & BRAND STATEMENT
            ========================================================================= */}
        <AnimatedFooterSection delay={0.12} className="space-y-8 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* BRAND STATEMENT (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="text-base font-extrabold font-display text-white uppercase tracking-wider block">
                  ARAV INNOVATIONS
                </span>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans max-w-sm font-medium">
                  {footerConfig.brandStatement}
                </p>
              </div>

              <div className="text-[11px] font-mono text-[#ffec69] font-bold">
                Global Operations: India &bull; UAE &bull; US &bull; EU &bull; Canada
              </div>
            </div>

            {/* REGIONAL PRESENCE (8 Cols - Equal Height Aligned Office Cards) */}
            <div className="lg:col-span-8 space-y-3">
              <h3 className="text-xs font-mono font-black text-[#ffec69] uppercase tracking-widest">
                REGIONAL PRESENCE
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                
                {/* INDIA HQ CARD */}
                <div className="p-4 rounded-xl bg-white/10 border border-white/20 flex flex-col justify-between h-full space-y-3 transition-all duration-300 hover:border-[#ffec69] hover:bg-white/20 hover:-translate-y-1 shadow-xs group">
                  <div className="space-y-1.5">
                    <div className="font-extrabold font-display text-white text-xs flex items-center gap-2 group-hover:text-[#ffec69] transition-colors">
                      <MapPin className="w-3.5 h-3.5 text-[#ffec69] group-hover:scale-110 transition-transform shrink-0" />
                      <span>INDIA HQ</span>
                    </div>
                    <p className="text-xs text-white/85 leading-relaxed font-sans">
                      {footerConfig.addressIndia}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                    <a
                      href={`tel:${footerConfig.phoneIndia.replace(/\s+/g, '')}`}
                      className="font-mono font-bold text-[#ffec69] group-hover:underline"
                    >
                      {footerConfig.phoneIndia}
                    </a>
                    <span className="text-[10px] font-mono text-[#ffec69] font-bold">INDIA</span>
                  </div>
                </div>

                {/* UAE REGIONAL OFFICE CARD */}
                <div className="p-4 rounded-xl bg-white/10 border border-white/20 flex flex-col justify-between h-full space-y-3 transition-all duration-300 hover:border-[#ffec69] hover:bg-white/20 hover:-translate-y-1 shadow-xs group">
                  <div className="space-y-1.5">
                    <div className="font-extrabold font-display text-white text-xs flex items-center gap-2 group-hover:text-[#ffec69] transition-colors">
                      <MapPin className="w-3.5 h-3.5 text-[#ffec69] group-hover:scale-110 transition-transform shrink-0" />
                      <span>UAE REGIONAL OFFICE</span>
                    </div>
                    <p className="text-xs text-white/85 leading-relaxed font-sans">
                      {footerConfig.addressUAE}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                    <a
                      href={`tel:${footerConfig.phoneUAE.replace(/\s+/g, '')}`}
                      className="font-mono font-bold text-[#ffec69] group-hover:underline"
                    >
                      {footerConfig.phoneUAE}
                    </a>
                    <span className="text-[10px] font-mono text-[#fab60a] font-bold">UAE</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </AnimatedFooterSection>

        {/* =========================================================================
            LEGAL BAR & COPYRIGHT
            ========================================================================= */}
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/85">
          
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            {legalLinks.map((link, idx) => (
              <React.Fragment key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-[#ffec69] transition-colors focus:outline-none focus:ring-1 focus:ring-[#f15e1c] rounded-xs text-[11px]"
                >
                  {link.label}
                </Link>
                {idx < legalLinks.length - 1 && (
                  <span className="text-white/40 text-[9px]">&bull;</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono text-center sm:text-right text-white/80 text-[11px]">
            &copy; 2024–{new Date().getFullYear()} Arav Innovations. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
