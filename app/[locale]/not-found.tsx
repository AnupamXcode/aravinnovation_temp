import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 bg-[#FFFDF9] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#FCE3D3] text-[#E8672A] mx-auto flex items-center justify-center font-display font-extrabold text-3xl border border-[#F4A97F]/40 shadow-xs">
          404
        </div>
        <h1 className="text-3xl font-bold font-display text-[#3A2E27]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#7A6A5F] leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return to Homepage
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" size="md">
              View Our Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
