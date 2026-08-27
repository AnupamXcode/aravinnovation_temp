import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Compass, Layers, Mail, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f15e1c]/10 dark:bg-[#f15e1c]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <Badge variant="secondary" size="md" className="rounded-full px-4">
            Error 404 &bull; Page Not Found
          </Badge>
          <div className="w-24 h-24 rounded-3xl bg-[#FCE3D3] dark:bg-[#261F1A] text-[#f15e1c] mx-auto flex items-center justify-center font-display font-extrabold text-4xl border border-[#F4A97F]/40 dark:border-[#3D332B] shadow-lg animate-pulse">
            404
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
            Looks like this page took a wrong turn.
          </h1>
          <p className="text-sm sm:text-base text-[#7A6A5F] dark:text-[#B8ACA0] max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Suggested Next Steps */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-4 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] px-1">
            Suggested Next Steps
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FBF3EA]/60 dark:bg-[#1A1613] hover:bg-[#FCE3D3]/60 dark:hover:bg-[#261F1A] border border-[#EFE2D6] dark:border-[#2C241E] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] transition-all group"
            >
              <div className="p-2 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c]">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold group-hover:text-[#f15e1c] transition-colors">Return Home</div>
                <div className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">Homepage overview</div>
              </div>
            </Link>

            <Link
              href="/services"
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FBF3EA]/60 dark:bg-[#1A1613] hover:bg-[#FCE3D3]/60 dark:hover:bg-[#261F1A] border border-[#EFE2D6] dark:border-[#2C241E] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] transition-all group"
            >
              <div className="p-2 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c]">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold group-hover:text-[#f15e1c] transition-colors">7 Core Practices</div>
                <div className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">Explore our services</div>
              </div>
            </Link>

            <Link
              href="/case-studies"
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FBF3EA]/60 dark:bg-[#1A1613] hover:bg-[#FCE3D3]/60 dark:hover:bg-[#261F1A] border border-[#EFE2D6] dark:border-[#2C241E] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] transition-all group"
            >
              <div className="p-2 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c]">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold group-hover:text-[#f15e1c] transition-colors">Case Studies</div>
                <div className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">Enterprise outcomes</div>
              </div>
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FBF3EA]/60 dark:bg-[#1A1613] hover:bg-[#FCE3D3]/60 dark:hover:bg-[#261F1A] border border-[#EFE2D6] dark:border-[#2C241E] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] transition-all group"
            >
              <div className="p-2 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold group-hover:text-[#f15e1c] transition-colors">Contact Support</div>
                <div className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">Talk to our team</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="lg" leftIcon={<ArrowLeft className="w-4 h-4" />} className="shadow-md">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

