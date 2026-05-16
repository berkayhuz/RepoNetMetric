import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import { tAccountClient } from "@/lib/i18n/account-i18n";

type SettingsHubPanelProps = {
  displayName?: string | null;
  language?: string | null;
  timeZone?: string | null;
};

export function SettingsHubPanel({ displayName, language, timeZone }: SettingsHubPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.settings.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.settings.description")}
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.settings.currentContextTitle")}</CardTitle>
          <CardDescription>
            {tAccountClient("account.settings.currentContextDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-3">
          <Stat label={tAccountClient("account.fields.displayName")} value={displayName} />
          <Stat label={tAccountClient("account.profile.fields.language")} value={language} />
          <Stat label={tAccountClient("account.profile.fields.timeZone")} value={timeZone} />
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            href: "/profile",
            title: tAccountClient("account.nav.profile"),
            description: tAccountClient("account.settings.cards.profileDescription"),
          },
          {
            href: "/preferences",
            title: tAccountClient("account.nav.preferences"),
            description: tAccountClient("account.settings.cards.preferencesDescription"),
          },
          {
            href: "/security",
            title: tAccountClient("account.nav.security"),
            description: tAccountClient("account.settings.cards.securityDescription"),
          },
          {
            href: "/notifications",
            title: tAccountClient("account.nav.notifications"),
            description: tAccountClient("account.settings.cards.notificationsDescription"),
          },
          {
            href: "/privacy",
            title: tAccountClient("account.nav.privacy"),
            description: tAccountClient("account.settings.cards.privacyDescription"),
          },
          {
            href: "/settings/team",
            title: tAccountClient("account.nav.team"),
            description: tAccountClient("account.settings.cards.teamDescription"),
          },
        ].map((item) => (
          <Card key={item.href}>
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={item.href}
                className="inline-flex rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {tAccountClient("account.settings.openSection", { title: item.title })}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="space-y-1 rounded-md border border-border p-3">
      <Text className="text-sm text-muted-foreground">{label}</Text>
      <Text>
        {value && value.length > 0 ? value : tAccountClient("account.common.notAvailable")}
      </Text>
    </div>
  );
}
