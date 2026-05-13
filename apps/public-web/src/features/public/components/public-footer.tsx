import Link from "next/link";

import { Muted, Text } from "@netmetric/ui";

import { legalLinks } from "@/features/public/content/navigation";
import { publicEnv } from "@/lib/public-env";

export function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3">
        <div className="space-y-2">
          <Text className="font-semibold">NetMetric</Text>
          <Muted>
            Enterprise platform for customer operations, identity, and secure integrations.
          </Muted>
        </div>

        <div className="space-y-2">
          <Text className="font-medium">Platform</Text>
          <ul className="space-y-1 text-sm">
            <li>
              <a href={publicEnv.authUrl} className="hover:underline">
                auth.netmetric.net
              </a>
            </li>
            <li>
              <a href={publicEnv.accountUrl} className="hover:underline">
                account.netmetric.net
              </a>
            </li>
            <li>
              <a href={publicEnv.apiUrl} className="hover:underline">
                API endpoint
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <Text className="font-medium">Legal</Text>
          <ul className="space-y-1 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
