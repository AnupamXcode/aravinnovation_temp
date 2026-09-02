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
  Compass,
  TrendingUp,
  Code2,
  ShieldCheck,
  BarChart3,
  Users2,
  Search,
  Cpu,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
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
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Official Ecosystem Service Practice Cards Data
const enterprisePractices = [
  {
    num: "01",
    title: "IT Strategy & Implementation",
    href: "/services/it-strategy-implementation",
    accent: "#f15e1c",
    category: "TECHNOLOGY",
    icon: <Compass className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    num: "02",
    title: "Digital Marketing & Brand Development",
    href: "/services/digital-marketing-brand-development",
    accent: "#fab60a",
    category: "GROWTH",
    icon: <TrendingUp className="w-4 h-4 text-[#fab60a]" />,
  },
  {
    num: "03",
    title: "Web & Application Development",
    href: "/services/web-app-development",
    accent: "#2e936f",
    category: "ENGINEERING",
    icon: <Code2 className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    num: "04",
    title: "Risk, Compliance & Governance",
    href: "/services/risk-compliance-governance",
    accent: "#2e936f",
    category: "COMPLIANCE",
    icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    num: "05",
    title: "Audit & Improvement",
    href: "/services/audit-improvement",
    accent: "#f15e1c",
    category: "DIAGNOSTIC",
    icon: <BarChart3 className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    num: "06",
    title: "Training & Staff Augmentation",
    href: "/services/training-staff-augmentation",
    accent: "#fab60a",
    category: "TALENT",
    icon: <Users2 className="w-4 h-4 text-[#fab60a]" />,
  },
  {
    num: "07",
    title: "SEO Services",
    href: "/services/seo-services",
    accent: "#2e936f",
    category: "SEARCH",
    icon: <Search className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    num: "08",
    title: "AI Portfolio",
    href: "/products",
    accent: "#f15e1c",
    category: "AI INNOVATION",
    icon: <Cpu className="w-4 h-4 text-[#f15e1c]" />,
  },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Working With Us", href: "/careers" },
  { label: "Careers", href: "/careers" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const exploreLinks = [
  { label: "Our Practices", href: "/services" },
  { label: "Our Approach", href: "/about" },
  { label: "Technology", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Security & DPDP", href: "/security-dpdp" },
];

export function Footer() {
  const pathname = usePathname();

  // Do not render footer on admin routes
  if (pathname?.includes("/admin")) {
    return null;
  }

  return (
    <footer className="w-full relative bg-gradient-to-br from-[#f7d7b0] via-[#f15e1c] to-[#fab60a] dark:from-[#0a0a0a] dark:via-[#000000] dark:to-[#1e2d27] text-white pt-10 pb-8 overflow-hidden select-none transition-colors duration-300 border-t border-[#f7d7b0]/40 dark:border-[#1a1a1a]">
      
      {/* Background Abstract Technology Connected SVG Line Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15 dark:opacity-20 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 500" fill="none">
          <path d="M -100 100 C 300 30, 700 250, 1540 60" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="5 5" />
          <path d="M -100 350 C 400 220, 900 420, 1540 260" stroke="#F7D7B0" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="350" cy="90" r="4" fill="#FAB60A" />
          <circle cx="850" cy="320" r="4" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Main Centered Max-Width Container */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-10">
        
        {/* =========================================================================
            ZONE 1: COMPACT TOP BRAND / CTA BAR
            ========================================================================= */}
        <AnimatedFooterSection delay={0.03}>
          <div className="p-5 sm:p-7 rounded-2xl bg-white/15 dark:bg-white/10 border border-white/30 backdrop-blur-md shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 text-left max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 border border-white/30 text-[11px] font-mono font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
                <span>START YOUR TRANSFORMATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display tracking-tight text-white leading-snug">
                READY TO BUILD WHAT COMES NEXT?
              </h2>
              <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                From technology strategy to digital growth, Arav Innovations helps organizations build stronger foundations for what&apos;s next.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#f15e1c] hover:bg-[#d8480d] text-white text-xs font-extrabold font-display shadow-md hover:shadow-lg transition-all duration-300 group ring-1 ring-white/30"
              >
                <span>TALK TO AN EXPERT</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#f15e1c] border border-white/40 backdrop-blur-md text-xs font-extrabold font-display shadow-sm transition-all duration-300 group"
              >
                <span>EXPLORE SERVICES</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimatedFooterSection>

        {/* =========================================================================
            ZONE 2: COMPACT SLEEK ENTERPRISE PRACTICES GRID
            ========================================================================= */}
        <AnimatedFooterSection delay={0.08} className="space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <div>
              <span className="text-[10px] font-mono font-black text-[#ffec69] uppercase tracking-widest block">
                PRACTICE ECOSYSTEM
              </span>
              <h3 className="text-base sm:text-lg font-extrabold font-display text-white tracking-tight">
                ARAV ENTERPRISE PRACTICES
              </h3>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-extrabold text-white hover:text-[#ffec69] transition-colors group focus:outline-hidden focus:ring-1 focus:ring-[#ffec69] rounded-xs"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#ffec69]" />
            </Link>
          </div>

          {/* Sleek 8-Card Responsive Grid (4-Col Desktop, 2-Col Tablet, 1-2 Mobile) */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3">
            {enterprisePractices.map((practice) => (
              <Link
                key={practice.num}
                href={practice.href}
                className="p-3.5 rounded-xl border border-white/25 bg-white/10 dark:bg-white/5 hover:bg-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-200 group text-left flex flex-col justify-between space-y-2 cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#ffec69]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-black text-[#ffec69] tracking-wider uppercase">
                    {practice.num} &bull; {practice.category}
                  </span>
                  <div className="p-1 rounded-lg bg-white/15 border border-white/20 group-hover:scale-105 transition-transform shrink-0">
                    {practice.icon}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold font-display text-white group-hover:text-[#ffec69] transition-colors leading-snug">
                    {practice.title}
                  </h4>
                </div>

                <div className="pt-1.5 border-t border-white/15 flex items-center justify-between text-[10px] font-mono font-bold text-white/80">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#ffec69]" />
                </div>
              </Link>
            ))}
          </div>
        </AnimatedFooterSection>

        {/* =========================================================================
            ZONE 3 & 4: COMPACT LOWER INFORMATION AREA (BRAND, NAV & CONTACT)
            ========================================================================= */}
        <AnimatedFooterSection delay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left">
          
          {/* BRAND BLOCK (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <BrandLogo variant="footer" />
            
            <div className="space-y-0.5">
              <h3 className="text-base font-extrabold font-display text-white tracking-wide">
                ARAV INNOVATIONS
              </h3>
              <p className="text-[11px] font-mono font-bold text-[#ffec69] italic">
                &ldquo;Elevating Brands, One Click at a Time.&rdquo;
              </p>
            </div>

            <p className="text-xs text-white/90 leading-relaxed max-w-sm font-medium">
              Technology strategy, engineering, compliance and digital growth for organizations ready to move forward.
            </p>
          </div>

          {/* COMPANY & EXPLORE LINKS (3 Cols) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            {/* COMPANY */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-mono font-black text-[#ffec69] uppercase tracking-wider">
                COMPANY
              </h4>
              <ul className="space-y-1.5 text-xs font-semibold text-white/90">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#ffec69] transition-colors inline-block focus:outline-hidden focus:ring-1 focus:ring-[#f15e1c] rounded-xs"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* EXPLORE */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-mono font-black text-[#ffec69] uppercase tracking-wider">
                EXPLORE
              </h4>
              <ul className="space-y-1.5 text-xs font-semibold text-white/90">
                {exploreLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#ffec69] transition-colors inline-block focus:outline-hidden focus:ring-1 focus:ring-[#f15e1c] rounded-xs"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CONTACT & REGIONAL OFFICES (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-[11px] font-mono font-black text-[#ffec69] uppercase tracking-wider">
              CONTACT &amp; REGIONAL OFFICES
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-white/90">
              
              {/* INDIA HQ GLASS CARD */}
              <div className="p-3 rounded-xl bg-white/10 border border-white/20 space-y-1 backdrop-blur-md">
                <div className="font-extrabold font-display text-white text-[11px] flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#ffec69]" />
                  <span>INDIA HQ</span>
                </div>
                <p className="text-[10px] text-white/80 leading-relaxed">
                  Platinum Floor D 14/23, Ardee City Sec 52, Gurgaon 122002
                </p>
                <a
                  href="tel:+919650625777"
                  className="font-bold text-[#ffec69] hover:underline inline-block text-[11px]"
                >
                  +91 9650625777
                </a>
              </div>

              {/* UAE REGIONAL OFFICE GLASS CARD */}
              <div className="p-3 rounded-xl bg-white/10 border border-white/20 space-y-1 backdrop-blur-md">
                <div className="font-extrabold font-display text-white text-[11px] flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#ffec69]" />
                  <span>UAE REGIONAL OFFICE</span>
                </div>
                <p className="text-[10px] text-white/80 leading-relaxed">
                  55764-001 IFZA Business Park FZCO, Building A1 Dubai Silicon Oasis, Dubai, U.A.E
                </p>
                <a
                  href="tel:+971521555792"
                  className="font-bold text-[#ffec69] hover:underline inline-block text-[11px]"
                >
                  +971 521555792
                </a>
              </div>
            </div>

            {/* EMAIL ROW */}
            <div>
              <a
                href="mailto:support@aravinnovations.com"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white hover:text-[#ffec69] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#ffec69]" />
                <span>support@aravinnovations.com</span>
              </a>
            </div>
          </div>
        </AnimatedFooterSection>

        {/* =========================================================================
            ZONE 5: SOCIAL MEDIA ("FOLLOW US")
            ========================================================================= */}
        <AnimatedFooterSection delay={0.15} className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-mono font-bold text-white/90 uppercase tracking-widest">
            FOLLOW US
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              { name: "LinkedIn", href: "https://www.linkedin.com/company/aravinnovations/", icon: <LinkedInIcon className="w-3.5 h-3.5" /> },
              { name: "Instagram", href: "https://www.instagram.com/aravinnovations/", icon: <InstagramIcon className="w-3.5 h-3.5" /> },
              { name: "Facebook", href: "https://www.facebook.com/aravinnovations", icon: <FacebookIcon className="w-3.5 h-3.5" /> },
              { name: "WhatsApp", href: "https://api.whatsapp.com/send?phone=971521555792", icon: <WhatsAppIcon className="w-3.5 h-3.5" /> },
              { name: "Twitter", href: "https://twitter.com/aravinnovations", icon: <TwitterIcon className="w-3.5 h-3.5" /> },
              { name: "YouTube", href: "https://youtube.com/@aravinnovations", icon: <YoutubeIcon className="w-3.5 h-3.5" /> },
            ].map((soc) => (
              <a
                key={soc.name}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#f15e1c] flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-xs focus:outline-hidden focus:ring-1 focus:ring-[#ffec69]"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </AnimatedFooterSection>

        {/* =========================================================================
            ZONE 6: LEGAL BAR & COPYRIGHT
            ========================================================================= */}
        <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-white/90">
          
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5">
            {legalLinks.map((link, idx) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-[#ffec69] transition-colors focus:outline-hidden focus:ring-1 focus:ring-[#f15e1c] rounded-xs text-[11px]"
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
          <div className="font-mono text-center sm:text-right text-white/80 text-[10px]">
            &copy; 2024–2026 Arav Innovations. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
