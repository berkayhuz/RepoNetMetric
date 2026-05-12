import { Card, Heading, Text } from "@netmetric/ui";

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
      <section className="w-full mx-auto">
        <div className="max-w-md mx-auto w-full">
          <Heading className="text-2xl font-semibold tracking-tight lg:hidden">{title}</Heading>
          <Text className="text-sm text-muted-foreground lg:hidden">{description}</Text>
          {children}
        </div>
      </section>
    </main>
  );
}
