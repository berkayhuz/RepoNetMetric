import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@netmetric/ui/client";

import { AccountShell } from "@/features/account/components/account-shell";
import { appEnv } from "@/lib/app-env";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(appEnv.accountUrl),
  title: {
    default: "NetMetric Account",
    template: "%s | NetMetric Account",
  },
  description: "NetMetric authenticated account portal.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AccountShell>{children}</AccountShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
