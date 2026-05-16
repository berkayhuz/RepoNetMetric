import Link from "next/link";
import { Badge, Heading, Text } from "@netmetric/ui";

import { accountRoutes } from "@/features/account/config/account-routes";
import { getCurrentAccountSession } from "@/lib/auth/account-session";
import { UserAvatar } from "./user-avatar";
import { tAccountClient } from "@/lib/i18n/account-i18n";

type AccountHeaderProps = {
  localeName: string;
};

export async function AccountHeader({ localeName }: AccountHeaderProps) {
  const session = await getCurrentAccountSession();
  const displayName = session.authenticated ? session.overview.displayName : "Account user";
  const avatarUrl = session.authenticated ? session.overview.avatarUrl : null;

  return (
    <header className="border-b border-border/80 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Heading level={1} className="text-xl">
              {tAccountClient("account.header.title")}
            </Heading>
            <Text className="text-sm text-muted-foreground">
              {tAccountClient("account.header.description", { locale: localeName })}
            </Text>
          </div>
          <div className="flex items-center gap-3">
            <UserAvatar displayName={displayName} avatarUrl={avatarUrl ?? null} />
            <Badge variant="secondary">{tAccountClient("account.header.phaseOne")}</Badge>
          </div>
        </div>
        <nav aria-label={tAccountClient("account.a11y.accountNavigation")}>
          <ul className="flex flex-wrap gap-2">
            {accountRoutes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className="inline-flex rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
