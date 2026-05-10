import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { getRequestLocale, getTranslator } from "@/features/auth/i18n/auth-i18n.server";
import { createAuthMetadata } from "@/features/auth/i18n/auth-metadata";

type ResetPasswordPageProps = {
  searchParams: Promise<{ email?: string; token?: string }>;
};

export async function generateMetadata() {
  return createAuthMetadata(await getRequestLocale(), "auth.reset.metaTitle");
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const locale = await getRequestLocale();
  const t = getTranslator(locale);

  return (
    <AuthPageShell title={t("auth.reset.pageTitle")} description={t("auth.reset.pageDescription")}>
      <AuthCard title={t("auth.reset.cardTitle")} description={t("auth.reset.cardDescription")}>
        <ResetPasswordForm email={params.email ?? ""} token={params.token ?? ""} />
      </AuthCard>
    </AuthPageShell>
  );
}
