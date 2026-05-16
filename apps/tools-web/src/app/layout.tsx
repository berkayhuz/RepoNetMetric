import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { getThemeInitScript } from "@netmetric/ui";
import { ThemeProvider } from "@netmetric/ui/client";

import { ToolsFooter } from "@/features/tools/components/tools-footer";
import { ToolsHeader } from "@/features/tools/components/tools-header";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { toolsEnv } from "@/lib/tools-env";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const defaultDescription =
  "NetMetric Tools provides fast browser-based utilities including QR generation and image conversion tools.";

export const metadata: Metadata = {
  metadataBase: new URL(toolsEnv.siteUrl),
  title: {
    default: "NetMetric Tools",
    template: "%s | NetMetric Tools",
  },
  description: defaultDescription,
  alternates: {
    canonical: toolsEnv.siteUrl,
  },
  openGraph: {
    type: "website",
    url: toolsEnv.siteUrl,
    title: "NetMetric Tools",
    description: defaultDescription,
    siteName: "NetMetric Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "NetMetric Tools",
    description: defaultDescription,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <Script
          id="netmetric-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: getThemeInitScript() }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only left-4 top-4 z-modal rounded-md bg-background px-3 py-2 focus:not-sr-only focus:absolute"
            >
              Skip to content
            </a>
            <ToolsHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <ToolsFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
