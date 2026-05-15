import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { getThemeInitScript } from "@netmetric/ui";
import { ThemeProvider } from "@netmetric/ui/client";
import { translate } from "@netmetric/i18n";

import { AccountShell } from "@/features/account/components/account-shell";
import { appEnv } from "@/lib/app-env";
import { accountApiClient } from "@/lib/account-api";
import { mapAccountLanguageToLocale, mapAccountThemeToUiTheme } from "@/lib/account-locale";
import { getAccountApiRequestOptions } from "@/lib/auth/account-api-request-options";
import { getCurrentAccountSession } from "@/lib/auth/account-session";

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

export const dynamic = "force-dynamic";

async function resolveUiPreferences(): Promise<{
  theme: "system" | "light" | "dark";
  lang: string;
  localeName: string;
}> {
  const session = await getCurrentAccountSession();
  if (!session.authenticated) {
    return { theme: "system", lang: "en", localeName: translate("locale.name", { locale: "en" }) };
  }

  try {
    const requestOptions = await getAccountApiRequestOptions();
    const preferences = await accountApiClient.getPreferences(requestOptions);
    const locale = mapAccountLanguageToLocale(preferences.language);
    return {
      theme: mapAccountThemeToUiTheme(preferences.theme),
      lang: locale,
      localeName: translate("locale.name", { locale }),
    };
  } catch {
    return { theme: "system", lang: "en", localeName: translate("locale.name", { locale: "en" }) };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const uiPreferences = await resolveUiPreferences();
  return (
    <html lang={uiPreferences.lang} className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme={uiPreferences.theme}>
          <AccountShell localeName={uiPreferences.localeName}>{children}</AccountShell>
        </ThemeProvider>
      </body>
      <Script
        id="netmetric-theme-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: getThemeInitScript() }}
      />
    </html>
  );
}
