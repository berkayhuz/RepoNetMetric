import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { resolveUiPreferences, UI_LOCALE_COOKIE_NAME, UI_THEME_COOKIE_NAME } from "@netmetric/i18n";
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
  const cookieStore = await cookies();
  const resolved = resolveUiPreferences({
    theme: cookieStore.get(UI_THEME_COOKIE_NAME)?.value,
    locale: cookieStore.get(UI_LOCALE_COOKIE_NAME)?.value,
  });
  const locale = resolved.locale;

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          id="netmetric-theme-init"
          dangerouslySetInnerHTML={{ __html: getThemeInitScript(resolved.theme) }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme={resolved.theme}>
          <CrmShell locale={locale}>{children}</CrmShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
