import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@netmetric/ui/client";

import { CrmShell } from "@/components/shell/crm-shell";
import { crmEnv } from "@/lib/crm-env";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(crmEnv.crmUrl),
  title: {
    default: "NetMetric CRM",
    template: "%s | NetMetric CRM",
  },
  description: "NetMetric protected CRM workspace.",
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

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CrmShell>{children}</CrmShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
