import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "PosterAI - AI-Powered Political Poster Maker Platform",
  description:
    "Create professional political posters, campaign banners, and promotional graphics instantly using AI background generation and custom text overlays.",
  keywords: [
    "Political Poster Maker",
    "AI Poster Generator",
    "Campaign Banner",
    "Bangladesh Political Poster",
    "PosterAI",
  ],
  authors: [{ name: "PosterAI Team" }],
  openGraph: {
    title: "PosterAI - AI-Powered Political Poster Maker Platform",
    description:
      "Create professional political posters and campaign banners instantly with AI.",
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
      lang="bn"
      data-scroll-behavior="smooth"
      className="h-full font-sans"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          scriptProps={{ type: "application/json" }}
        >
          <AuthProvider>{children}</AuthProvider>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
