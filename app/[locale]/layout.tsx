import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Noto_Sans_Arabic, Noto_Sans_Devanagari } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SiteConfigProvider } from "@/lib/site-config";
import { SiteContentProvider } from "@/lib/site-content";
import { OrganizationSchema } from "@/components/seo/StructuredData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalBackgroundMotion } from "@/components/motion/GlobalBackgroundMotion";
import dynamic from "next/dynamic";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Script from "next/script";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFDF9" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

import { ClientOverlays } from "@/components/layout/ClientOverlays";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL("https://aravinnovations.com"),
    title: {
      default: "Arav Innovations | AI, Technology & Digital Marketing Solutions",
      template: "%s | Arav Innovations",
    },
    description:
      "Arav Innovations helps businesses grow with web and app development, AI solutions, SEO, digital marketing and performance marketing services.",
    keywords: [
      "IT Strategy Consulting",
      "Web & App Development",
      "Next.js Development",
      "B2B Digital Marketing",
      "Technical SEO",
      "Risk Governance Compliance",
      "DPDP Compliance India",
      "IT Staff Augmentation",
      "Dubai UAE Tech Agency",
      "Gurgaon Tech Consulting",
    ],
    authors: [{ name: "Arav Innovations" }],
    creator: "Arav Innovations",
    verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
    alternates: {
      canonical: "https://aravinnovations.com",
      languages: {
        en: "https://aravinnovations.com",
        hi: "https://aravinnovations.com/hi",
        ar: "https://aravinnovations.com/ar",
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://aravinnovations.com",
      siteName: "Arav Innovations",
      title: "Arav Innovations | AI, Technology & Digital Marketing Solutions",
      description:
        "Arav Innovations helps businesses grow with web and app development, AI solutions, SEO, digital marketing and performance marketing services.",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('arav_theme_preference');
    var isDark = stored === 'dark';
    var root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  } catch (e) {}
})();
`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${inter.variable} ${notoSansArabic.variable} ${notoSansDevanagari.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col w-full bg-[#FFFDF9] dark:bg-[#000000] text-[var(--text-primary)] font-sans antialiased selection:bg-[#FCE3D3] dark:selection:bg-[#f15e1c]/30 selection:text-[#f15e1c]">
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <OrganizationSchema />
        <SkipToContent />
        <NextIntlClientProvider messages={messages}>
          <SiteConfigProvider>
            <SiteContentProvider>
              <ThemeProvider>
                <GlobalBackgroundMotion />
                <ClientOverlays>
                  <Navbar />
                  <main id="main-content" className="flex-1 w-full pt-20 sm:pt-24 lg:pt-20">{children}</main>
                  <Footer />
                </ClientOverlays>
              </ThemeProvider>
            </SiteContentProvider>
          </SiteConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
