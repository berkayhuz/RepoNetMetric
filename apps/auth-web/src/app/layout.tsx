import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@netmetric/ui/client";

import { getRequestLocale, getTranslator } from "@/features/auth/i18n/auth-i18n.server";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const t = getTranslator(locale);

  return {
    title: {
      default: t("meta.appTitle"),
      template: `%s | ${t("meta.appTitle")}`,
    },
    description: t("meta.appDescription"),
    metadataBase: new URL("http://localhost:7002"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
