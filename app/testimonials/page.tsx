import * as React from "react";
import Link from "next/link";
import { testimonialsData } from "@/data/testimonials";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Clients & Testimonials | Arav Innovations",
  description:
    "Read verified client reviews and feedback on Arav Innovations' enterprise engineering, strategy, digital growth, and staff augmentation partnerships.",
};

export default function TestimonialsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Breadcrumb items={[{ label: "Testimonials & Reviews" }]} />
          <Badge variant="secondary" size="md">
            Client Validation
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] tracking-tight">
            Client Feedback & Executive Reviews
          </h1>
          <p className="text-lg text-[#7A6A5F] leading-relaxed">
            Read verified feedback from engineering leaders, CTOs, and growth executives who have partnered with Arav Innovations across India and the United Arab Emirates.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((test) => (
            <div
              key={test.id}
              className="p-8 rounded-3xl bg-white border border-[#EFE2D6] shadow-sm hover:shadow-xl hover:border-[#E8672A]/40 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-16 h-16 text-[#FCE3D3]/40 pointer-events-none" />

              <div>
                <div className="flex items-center space-x-1 mb-4 text-[#E8672A]">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <blockquote className="text-base sm:text-lg font-medium text-[#3A2E27] leading-relaxed relative z-10">
                  “{test.quote}”
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-[#EFE2D6]">
                <div className="font-bold text-base text-[#3A2E27] font-display">
                  {test.author}
                </div>
                <div className="text-xs text-[#7A6A5F] mt-0.5">
                  {test.designation} &bull; <span className="font-medium text-[#3A2E27]">{test.company}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-[#E8672A]">
                  <span>{test.service}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-[#7A6A5F]">
                    <MapPin className="w-3.5 h-3.5 text-[#E8672A]" /> {test.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-[#FBF3EA] p-8 sm:p-12 border border-[#EFE2D6] text-center max-w-3xl mx-auto space-y-5">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27]">
            Experience the Arav Difference
          </h3>
          <p className="text-sm text-[#7A6A5F] leading-relaxed">
            Let’s discuss your current business requirements and demonstrate how our engineering & strategy squads can deliver measurable ROI.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start a Discussion
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
