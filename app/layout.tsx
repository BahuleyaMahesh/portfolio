import type { Metadata } from "next";
import { Inter, Outfit, Space_Mono } from "next/font/google";
import { siteConfig } from "@/data/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/layout/CommandPalette";
import "./globals.css";

// Load modern typography configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

// Easily editable SEO metadata
export const metadata: Metadata = {
  title: `${siteConfig.name} — AI/ML Engineer & Builder`,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bahuleyam.com"),
  keywords: [
    "Bahuleya M",
    "RVCE",
    "Computer Science",
    "AI/ML",
    "Genomics",
    "Embedded Systems",
    "Robotics",
    "Portfolio",
    "Software Engineer"
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — AI/ML Engineer & Builder`,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — AI/ML Engineer & Builder`,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-dark text-text-primary selection:bg-accent/20 selection:text-white">
        {/* Custom cursor (Desktops only, manages its own touch/motion filters) */}
        <CustomCursor />

        {/* Global Keyboard Shortcut Search Command Palette */}
        <CommandPalette />

        {/* Floating Header Navigation */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <div className="flex-grow flex flex-col">{children}</div>

        {/* Institutional Footer */}
        <Footer />
      </body>
    </html>
  );
}
