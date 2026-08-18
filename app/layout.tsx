import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";

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
  themeColor: "#FFFDF9",
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
    "Arav Innovations is a multidisciplinary B2B technology consulting, full-stack engineering, digital marketing, risk & governance, and staff augmentation firm operating in India and UAE.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aravinnovations.com",
    siteName: "Arav Innovations",
    title: "Arav Innovations | Technology, IT Strategy & Digital Growth",
    description:
      "Enterprise IT Strategy, Full-Stack Software Engineering, Performance Marketing, Governance, and Staff Augmentation across India & UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#3A2E27] font-sans antialiased selection:bg-[#FCE3D3] selection:text-[#E8672A]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
