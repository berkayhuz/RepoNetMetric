import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { getThemeInitScript } from "@netmetric/ui";
import { ThemeProvider } from "@netmetric/ui/client";

import { CrmShell } from "@/components/shell/crm-shell";
import { crmEnv } from "@/lib/crm-env";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();

  return {
    metadataBase: new URL(crmEnv.crmUrl),
    title: {
      default: tCrm("crm.shell.appTitle", locale),
      template: `%s | ${tCrm("crm.shell.appTitle", locale)}`,
    },
    description: tCrm("crm.shell.workspace", locale),
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        noarchive: true,
        nosnippet: true,
      },
    },
  };
}

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
      <body>
        <ThemeProvider>
          <CrmShell locale={locale}>{children}</CrmShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
