import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "gsap"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    qualities: [75, 95],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "blog.aravinnovations.com",
      },
      {
        protocol: "https",
        hostname: "blog.aravinnovations.com",
      },
      {
        protocol: "https",
        hostname: "aravinnovations.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    const isTestDomain =
      process.env.VERCEL_ENV === "preview" ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
      process.env.IS_TEST_DOMAIN === "true";

    const commonHeaders = [
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(self), geolocation=(), interest-cohort=()",
      },
      {
        key: "Content-Security-Policy-Report-Only",
        value:
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; media-src 'self' https:; font-src 'self' data: https:; connect-src 'self' https:;",
      },
    ];

    if (isTestDomain) {
      commonHeaders.push({
        key: "X-Robots-Tag",
        value: "noindex, nofollow",
      });
    }

    return [
      {
        source: "/(.*)",
        headers: commonHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/top-10-ai-tools-for-seo-optimization",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/google-ads-for-business-growth",
        destination: "/services/digital-marketing-brand-development",
        permanent: true,
      },
      {
        source: "/real-estate-compliance-in-uae",
        destination: "/services/risk-compliance-governance",
        permanent: true,
      },
      {
        source: "/cybersecurity-in-the-renewable-energy-sector",
        destination: "/services/risk-compliance-governance",
        permanent: true,
      },
      {
        source: "/seo-vs-paid-ads",
        destination: "/services/seo-services",
        permanent: true,
      },
      {
        source: "/google-algorithm-updates",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/our-services",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
