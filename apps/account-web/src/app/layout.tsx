import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import {
  resolveUiPreferences as resolveSharedUiPreferences,
  translate,
  UI_LOCALE_COOKIE_NAME,
  UI_THEME_COOKIE_NAME,
} from "@netmetric/i18n";
import { getThemeInitScript } from "@netmetric/ui";
import { ThemeProvider } from "@netmetric/ui/client";

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
  const cookieStore = await cookies();
  const cookieResolved = resolveSharedUiPreferences({
    theme: cookieStore.get(UI_THEME_COOKIE_NAME)?.value,
    locale: cookieStore.get(UI_LOCALE_COOKIE_NAME)?.value,
  });
  const session = await getCurrentAccountSession();
  if (!session.authenticated) {
    return {
      theme: cookieResolved.theme,
      lang: cookieResolved.locale,
      localeName: translate("locale.name", { locale: cookieResolved.locale }),
    };
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
    return {
      theme: cookieResolved.theme,
      lang: cookieResolved.locale,
      localeName: translate("locale.name", { locale: cookieResolved.locale }),
    };
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
      <head>
        <script
          id="netmetric-theme-init"
          dangerouslySetInnerHTML={{ __html: getThemeInitScript(uiPreferences.theme) }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme={uiPreferences.theme}>
          <AccountShell localeName={uiPreferences.localeName}>{children}</AccountShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
