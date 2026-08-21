import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SiteConfigProvider } from "@/lib/site-config";
import { SiteContentProvider } from "@/lib/site-content";
import { OrganizationSchema } from "@/components/seo/StructuredData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/layout/PageLoader";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFDF9" },
    { media: "(prefers-color-scheme: dark)", color: "#12100E" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aravinnovations.com"),
  title: {
    default: "Arav Innovations | Technology, IT Strategy & Digital Growth",
    template: "%s | Arav Innovations",
  },
  description:
    "Arav Innovations is a multidisciplinary B2B technology consulting, full-stack engineering, digital marketing, risk & governance, and staff augmentation firm operating globally.",
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
    "Bengaluru Tech Consulting",
  ],
  authors: [{ name: "Arav Innovations" }],
  creator: "Arav Innovations",
  alternates: {
    canonical: "https://aravinnovations.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aravinnovations.com",
    siteName: "Arav Innovations",
    title: "Arav Innovations | Technology, IT Strategy & Digital Growth",
    description:
      "Enterprise IT Strategy, Full-Stack Software Engineering, Performance Marketing, Governance, and Staff Augmentation globally.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
      className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        <OrganizationSchema />
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          id="theme-init-script"
        />
      </head>
      <body className="min-h-screen flex flex-col w-full bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased selection:bg-[#FCE3D3] dark:selection:bg-[#E8672A]/30 selection:text-[#E8672A]">
        <NextIntlClientProvider messages={messages}>
          <SiteConfigProvider>
            <SiteContentProvider>
              <ThemeProvider>
                <PageLoader />
                <Navbar />
                <main className="flex-1 w-full">{children}</main>
                <Footer />
                <ChatbotWidget />
              </ThemeProvider>
            </SiteContentProvider>
          </SiteConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
