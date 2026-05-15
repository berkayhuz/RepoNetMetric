import Link from "next/link";

import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { LoginForm } from "@/features/auth/components/login-form";
import { authRoutes } from "@/features/auth/config/auth-routes";
import { getRequestLocale, getTranslator } from "@/features/auth/i18n/auth-i18n.server";
import { createAuthMetadata } from "@/features/auth/i18n/auth-metadata";
import { getCurrentAuthSession } from "@/features/auth/server/auth-session";
import { getRedirectAfterAuth } from "@/features/auth/utils/redirect-after-auth";
import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: Promise<{ returnUrl?: string }>;
};

export async function generateMetadata() {
  return createAuthMetadata(await getRequestLocale(), "auth.login.metaTitle");
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const session = await getCurrentAuthSession();
  if (session.authenticated) {
    redirect(getRedirectAfterAuth(params.returnUrl));
  }

  const locale = await getRequestLocale();
  const t = getTranslator(locale);

  return (
    <AuthPageShell title={t("auth.login.pageTitle")} description={t("auth.login.pageDescription")}>
      <AuthCard
        title={t("auth.login.cardTitle")}
        description={t("auth.login.cardDescription")}
        footer={
          <p className="w-full text-center text-sm text-muted-foreground">
            {t("auth.login.noAccount")}{" "}
            <Link
              href={authRoutes.register}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {t("auth.login.goRegister")}
            </Link>
          </p>
        }
      >
        <LoginForm locale={locale} returnUrl={params.returnUrl ?? ""} />
      </AuthCard>
    </AuthPageShell>
  );
}
