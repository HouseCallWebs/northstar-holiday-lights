import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { DemoBanner } from "@/components/DemoBanner";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/config";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Residential and commercial Christmas light design, installation, maintenance, and takedown across the Denver metro. Book your install online in minutes.",
  keywords: [
    "Christmas light installation Denver",
    "holiday lighting Denver",
    "Christmas light hanging service",
    "commercial holiday lighting",
    "HOA Christmas lights",
  ],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description:
      "Book professional Christmas light installation, maintenance, and takedown across the Denver metro.",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink pb-16 lg:pb-0">
        <LocalBusinessJsonLd />
        <div className="sticky top-0 z-50">
          <DemoBanner />
          <Navigation />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
