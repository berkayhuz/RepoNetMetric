import { Card } from "@netmetric/ui";

import { getRequestLocale, getTranslator } from "@/features/auth/i18n/auth-i18n.server";

type AuthPageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export async function AuthPageShell({ eyebrow, title, description, children }: AuthPageShellProps) {
  const locale = await getRequestLocale();
  const t = getTranslator(locale);

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12">
      <section className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_440px]">
        <div className="hidden space-y-6 lg:block">
          <div className="inline-flex rounded-full border px-3 py-1 text-sm font-medium text-muted-foreground">
            {eyebrow ?? t("layout.mainEyebrow")}
          </div>

          <div className="max-w-xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground xl:text-5xl">
              {t("layout.mainHeroTitle")}
            </h1>

            <p className="text-base leading-7 text-muted-foreground">
              {t("layout.mainHeroDescription")}
            </p>
          </div>

          <div className="grid max-w-xl gap-3 text-sm text-muted-foreground">
            <Card className="rounded-2xl p-4">{t("layout.bullet.multiTenant")}</Card>
            <Card className="rounded-2xl p-4">{t("layout.bullet.mfa")}</Card>
            <Card className="rounded-2xl p-4">{t("layout.bullet.unified")}</Card>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight lg:hidden">{title}</h1>
          <p className="text-sm text-muted-foreground lg:hidden">{description}</p>
          {children}
        </div>
      </section>
    </main>
  );
}
