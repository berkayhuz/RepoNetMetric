import Link from "next/link";
import { Badge, Heading, Text } from "@netmetric/ui";

import { accountRoutes } from "@/features/account/config/account-routes";

export function AccountHeader() {
  return (
    <header className="border-b border-border/80 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Heading level={1} className="text-xl">
              NetMetric Account
            </Heading>
            <Text className="text-sm text-muted-foreground">Account portal scaffold</Text>
          </div>
          <Badge variant="secondary">Phase 1</Badge>
        </div>
        <nav aria-label="Account navigation">
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
