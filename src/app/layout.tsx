import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/adapters/theme/theme-provider";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GrainOverlay } from "@/components/layout/grain-overlay";
import { CommandMenu } from "@/components/layout/command-menu";
import { SiteFloatingDock } from "@/components/layout/floating-dock";
import { ThemeParticles } from "@/components/layout/theme-particles";
import { SITE_META } from "@/domain/site-meta";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.url),
  title: {
    default: SITE_META.title,
    template: `%s | ${SITE_META.name}`,
  },
  description: SITE_META.description,
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    url: SITE_META.url,
    siteName: SITE_META.title,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--accent-fg)]"
            >
              Skip to content
            </a>
            <div className="pointer-events-none fixed inset-0 z-0">
              <ThemeParticles
                className="absolute inset-0"
                quantity={60}
                ease={80}
                size={0.4}
                staticity={40}
              />
            </div>
            <GrainOverlay />
            <Header />
            <main id="main-content" className="relative z-10">
              {children}
            </main>
            <Footer />
            <SiteFloatingDock />
            <CommandMenu />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
