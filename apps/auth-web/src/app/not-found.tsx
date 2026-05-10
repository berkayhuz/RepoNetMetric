import Link from "next/link";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@netmetric/ui";

import { authRoutes } from "@/features/auth/config/auth-routes";
import { getRequestLocale, getTranslator } from "@/features/auth/i18n/auth-i18n.server";

export default async function NotFoundPage() {
  const locale = await getRequestLocale();
  const t = getTranslator(locale);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <CardTitle>{t("error.notFoundTitle")}</CardTitle>
          <CardDescription>{t("error.notFoundDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href={authRoutes.login}>{t("common.backToLogin")}</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
