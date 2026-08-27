"use client";

import * as React from "react";
import Link from "next/link";
import { companyContactInfo, servicesNavigation } from "@/data/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useTranslations } from "next-intl";

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

import { useSiteContent } from "@/lib/site-content";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const t = useTranslations("Footer");
  const { content } = useSiteContent();
  const footer = content.footer;

  if (pathname?.includes("/admin")) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-br from-[#fab60a] via-[#f47d43] to-[#f15e1c] dark:from-[#1e2c27] dark:via-[#172420] dark:to-[#101b17] dark:border-t dark:border-[#253630] text-white pt-16 pb-8 transition-colors duration-300 relative overflow-hidden">
      {/* Background ambient radial highlights & 3D Network Layer */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 dark:bg-[#f15e1c]/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1b2823]/12 dark:bg-[#2e936f]/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      {/* Subtle Rotating 3D Network Overlay */}
      <div className="absolute top-12 left-8 w-96 h-96 opacity-15 pointer-events-none z-0 animate-[spin_60s_linear_infinite]">
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-white fill-none" strokeWidth="1">
          <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" />
          <polygon points="100,50 140,75 140,125 100,150 60,125 60,75" />
          <line x1="100" y1="20" x2="100" y2="50" />
          <line x1="170" y1="60" x2="140" y2="75" />
          <line x1="170" y1="140" x2="140" y2="125" />
          <line x1="100" y1="180" x2="100" y2="150" />
          <line x1="30" y1="140" x2="60" y2="125" />
          <line x1="30" y1="60" x2="60" y2="75" />
          <circle cx="100" cy="20" r="4" fill="#ffffff" />
          <circle cx="170" cy="60" r="4" fill="#ffffff" />
          <circle cx="170" cy="140" r="4" fill="#ffffff" />
          <circle cx="100" cy="180" r="4" fill="#ffffff" />
          <circle cx="30" cy="140" r="4" fill="#ffffff" />
          <circle cx="30" cy="60" r="4" fill="#ffffff" />
        </svg>
      </div>

      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        {/* Main Grid: Left Closing Statement + Right Information Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-12 border-b border-white/25">
          {/* Left Column (6 Cols): Massive Dynamic Headline + Pill Buttons */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white uppercase drop-shadow-xs">
              {t("heading")}
            </h2>

            {/* Side-by-Side Pill Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href={footer?.bookCallUrl || `tel:${footer?.indiaPhone?.replace(/\s+/g, "") || "+919650625777"}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#f15e1c] border border-white/40 backdrop-blur-md text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>{t("bookCall")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href={footer?.contactUsUrl || "/contact"}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#f15e1c] border border-white/40 backdrop-blur-md text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>{t("contactUs")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column (6 Cols): Services Strip, Dual Office Cards, Email & Socials */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            {/* Reorganized Practice Links Strip */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-semibold text-white/90 border-b border-white/20 pb-5">
              {servicesNavigation.map((service, idx) => (
                <React.Fragment key={service.href}>
                  <Link
                    href={service.href}
                    className="group relative inline-flex items-center gap-1 py-1 px-2.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-[#f15e1c] transition-all duration-300 font-medium hover:shadow-md"
                  >
                    <span className="transition-transform group-hover:translate-x-0.5">{service.label}</span>
                  </Link>
                  {idx < servicesNavigation.length - 1 && (
                    <span className="text-white/40 hidden sm:inline">&bull;</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Dual Regional Operations Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-white/90">
              {/* India */}
              {footer?.indiaVisible !== false && (
                <div className="space-y-1.5">
                  <a
                    href={`tel:${footer?.indiaPhone?.replace(/\s+/g, "") || "+919650625777"}`}
                    className="font-bold text-sm text-white hover:underline block"
                  >
                    {t("indiaHq")} (+91 9650625777)
                  </a>
                  <div className="w-full h-px bg-white/30 my-2" />
                  <p className="text-white/85 leading-relaxed whitespace-pre-line">
                    {footer?.indiaAddress || "Platinum Floor D 14/23\nArdee City Sec 52\nGurgaon 122002"}
                  </p>
                  <div className="pt-2">
                    <a
                      href={`mailto:${footer?.supportEmail || "support@aravinnovations.com"}`}
                      className="font-medium text-white hover:underline block"
                    >
                      {footer?.supportEmail || "support@aravinnovations.com"}
                    </a>
                  </div>
                </div>
              )}

              {/* UAE */}
              {footer?.uaeVisible !== false && (
                <div className="space-y-1.5 pb-4 sm:pb-0">
                  <a
                    href="tel:+971521555792"
                    className="font-bold text-sm text-white hover:underline block"
                  >
                    UAE Regional Office (+971 521555792)
                  </a>
                  <div className="w-full h-px bg-white/30 my-2" />
                  <p className="text-white/85 leading-relaxed whitespace-pre-line">
                    {footer?.uaeCompanyName ? `${footer.uaeCompanyName}\n` : ""}
                    {footer?.uaeAddress || "55764-001 IFZA Business Park FZCO\nBuilding A1 Dubai Silicon Oasis Dubai, U.A.E"}
                  </p>
                  {footer?.secondaryEmail && (
                    <div className="pt-2">
                      <a
                        href={`mailto:${footer.secondaryEmail}`}
                        className="font-medium text-white hover:underline block"
                      >
                        {footer.secondaryEmail}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Dynamic Social Icons Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {(content.socialLinks || [])
                .filter((s) => s.enabled)
                .map((social) => {
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target={social.openNewTab ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#f15e1c] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 shadow-md"
                      aria-label={social.name}
                      title={social.name}
                    >
                      {social.id === "instagram" && <InstagramIcon className="w-4 h-4" />}
                      {social.id === "facebook" && <FacebookIcon className="w-4 h-4" />}
                      {social.id === "linkedin" && <LinkedInIcon className="w-4 h-4" />}
                      {social.id === "whatsapp" && <WhatsAppIcon className="w-4 h-4" />}
                      {social.id === "twitter" && <TwitterIcon className="w-4 h-4" />}
                      {social.id === "youtube" && <YoutubeIcon className="w-4 h-4" />}
                      {!["instagram", "facebook", "linkedin", "whatsapp", "twitter", "youtube"].includes(social.id) && (
                        <span className="text-xs font-bold font-mono">{social.name.slice(0, 2)}</span>
                      )}
                    </a>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal Links on Left, Copyright on Right */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/95 border-t border-white/20 pt-6 pb-16 sm:pb-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 font-semibold">
              {[
                { label: t("privacyPolicy"), href: "/privacy-policy" },
                { label: t("refundPolicy"), href: "/refund-policy" },
                { label: t("termsConditions"), href: "/terms-and-conditions" },
                { label: t("securityDpdp"), href: "/security-dpdp" },
              ].map((link, idx, arr) => (
                <React.Fragment key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative inline-flex items-center gap-1.5 py-1 text-white/90 hover:text-white font-bold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white" />
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                  {idx < arr.length - 1 && (
                    <span className="text-white/40 font-normal">&bull;</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="font-medium text-white/90 text-center sm:text-right">
              {`© 2024–2026 Arav Innovations. ${t("rights")}`}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
