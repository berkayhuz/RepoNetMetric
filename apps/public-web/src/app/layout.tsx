import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@netmetric/ui/client";

import { PublicFooter } from "@/features/public/components/public-footer";
import { PublicHeader } from "@/features/public/components/public-header";
import { defaultSiteDescription, siteTitle } from "@/lib/metadata";
import { publicEnv } from "@/lib/public-env";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: defaultSiteDescription,
  alternates: {
    canonical: publicEnv.siteUrl,
  },
  openGraph: {
    type: "website",
    url: publicEnv.siteUrl,
    title: siteTitle,
    description: defaultSiteDescription,
    siteName: siteTitle,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: defaultSiteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only left-4 top-4 z-modal rounded-md bg-background px-3 py-2 focus:not-sr-only focus:absolute"
            >
              Skip to content
            </a>
            <PublicHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <PublicFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
