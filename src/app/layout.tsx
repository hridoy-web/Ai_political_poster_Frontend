import type { Metadata } from "next";
import { Outfit, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfitFont = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const banglaFont = Noto_Serif_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "PosterAI - AI-Powered Political Poster Maker Platform",
  description: "Create professional political posters, campaign banners, and promotional graphics instantly using AI background generation and custom text overlays.",
  keywords: ["Political Poster Maker", "AI Poster Generator", "Campaign Banner", "Bangladesh Political Poster", "PosterAI"],
  authors: [{ name: "PosterAI Team" }],
  openGraph: {
    title: "PosterAI - AI-Powered Political Poster Maker Platform",
    description: "Create professional political posters and campaign banners instantly with AI.",
    type: "website",
    locale: "bn_BD",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("h-full", outfitFont.variable, banglaFont.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        
        <main className="grow flex flex-col">
          {children}
        </main>

      </body>
    </html>
  );
}