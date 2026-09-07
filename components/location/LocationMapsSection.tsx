"use client";

import * as React from "react";
import { companyContactInfo } from "@/data/navigation";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MapPin, Navigation, ExternalLink, Phone, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationMapsSectionProps {
  className?: string;
  showTitle?: boolean;
}

export function LocationMapsSection({
  className = "",
  showTitle = true,
}: LocationMapsSectionProps) {
  const [mapErrorState, setMapErrorState] = React.useState<Record<string, boolean>>({});
  const [interactiveMap, setInteractiveMap] = React.useState<Record<string, boolean>>({});

  const handleMapError = (key: string) => {
    setMapErrorState((prev) => ({ ...prev, [key]: true }));
  };

  const toggleInteractive = (key: string) => {
    setInteractiveMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const offices = companyContactInfo.offices;

  return (
    <section className={`w-full py-8 md:py-14 select-none ${className}`} id="locations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal direction="up">
              <Badge variant="secondary" size="md">
                GLOBAL PRESENCE &amp; REGIONAL HUBS
              </Badge>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                ARAV INNOVATIONS LOCATIONS
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                Operating globally with dedicated regional headquarters in Gurgaon, India and Dubai Silicon Oasis, UAE.
              </p>
            </ScrollReveal>
          </div>
        )}

        {/* 2-Column Responsive Grid (Side by side on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {offices.map((office, idx) => {
            const isIndia = office.country === "India";
            const phoneNum = isIndia ? companyContactInfo.phoneIndia : companyContactInfo.phoneUAE;
            const phoneRaw = isIndia ? companyContactInfo.phoneIndiaRaw : companyContactInfo.phoneUAERaw;
            const mapKey = office.country.toLowerCase();
            const hasError = mapErrorState[mapKey];
            const isTouchInteractive = interactiveMap[mapKey];

            return (
              <ScrollReveal key={office.country} direction="up" delay={idx * 0.15} className="h-full">
                <div className="h-full rounded-3xl bg-white dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#262626] shadow-xl hover:border-[#f15e1c] dark:hover:border-[#f15e1c] transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                  {/* Card Top Header */}
                  <div className="p-6 space-y-3.5 bg-gradient-to-b from-[#fefaf5] to-white dark:from-[#121212] dark:to-[#0a0a0a] border-b border-[#f7d7b0]/60 dark:border-[#262626]">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center font-bold shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#2e936f] dark:text-[#74c4ab]">
                            {office.status}
                          </span>
                          <h3 className="text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                            {office.name || `Arav Innovations — ${office.country}`}
                          </h3>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#f15e1c]/10 text-[#f15e1c] border border-[#f15e1c]/20 shrink-0">
                        {office.country}
                      </span>
                    </div>

                    {/* Exact Address */}
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0]/80 dark:border-[#262626] space-y-1">
                      <div className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff] flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#f15e1c] shrink-0" />
                        <span>Official Address:</span>
                      </div>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed pl-5 select-text">
                        {office.address}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Map Iframe Container */}
                  <div className="relative w-full h-[260px] sm:h-[290px] bg-[#fefaf5] dark:bg-[#141414] overflow-hidden border-y border-[#f7d7b0]/40 dark:border-[#262626]">
                    {!hasError ? (
                      <>
                        <iframe
                          title={`${office.name || office.country} Location Map`}
                          src={office.mapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          onError={() => handleMapError(mapKey)}
                          className={`w-full h-full transition-opacity duration-300 ${
                            isTouchInteractive ? "pointer-events-auto" : "pointer-events-auto sm:pointer-events-auto"
                          }`}
                        />
                        {/* Mobile Touch Protection Control */}
                        <button
                          type="button"
                          onClick={() => toggleInteractive(mapKey)}
                          className="sm:hidden absolute top-2 right-2 z-10 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-[#121212]/90 text-[10px] font-mono font-bold text-[#1b2823] dark:text-[#ffffff] border border-[#f7d7b0] dark:border-[#262626] shadow-sm backdrop-blur-xs"
                          aria-label={`Toggle interactive map for ${office.country}`}
                        >
                          {isTouchInteractive ? "Lock Scroll" : "Interact"}
                        </button>
                      </>
                    ) : (
                      /* Fallback UI if map iframe fails */
                      <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center space-y-3 bg-[#fefaf5] dark:bg-[#121212]">
                        <MapPin className="w-8 h-8 text-[#f15e1c]" />
                        <div className="space-y-1 max-w-xs">
                          <p className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">
                            {office.address}
                          </p>
                          <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                            Interactive map preview unavailable. Click below for live directions in Google Maps.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Bar (Get Directions, Open in Maps, Call) */}
                  <div className="p-5 bg-[#fefaf5] dark:bg-[#121212] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={office.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open directions to Arav Innovations ${office.country} office`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f15e1c] hover:bg-[#d8480d] text-white font-mono font-bold text-xs shadow-md hover:shadow-lg transition-all"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Get Directions</span>
                      </a>

                      <a
                        href={office.openInMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open Arav Innovations ${office.country} office in Google Maps`}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-[#1c1c1c] text-[#1b2823] dark:text-[#ffffff] hover:text-[#f15e1c] border border-[#f7d7b0] dark:border-[#262626] font-mono font-bold text-xs transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#2e936f]" />
                        <span>Open in Maps</span>
                      </a>
                    </div>

                    <a
                      href={`tel:${phoneRaw}`}
                      aria-label={`Call Arav Innovations ${office.country} office at ${phoneNum}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4] hover:text-[#f15e1c] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#2e936f]" />
                      <span>{phoneNum}</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
