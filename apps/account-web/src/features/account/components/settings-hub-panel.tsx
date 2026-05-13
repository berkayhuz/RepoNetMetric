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

type SettingsHubPanelProps = {
  displayName?: string | null;
  language?: string | null;
  timeZone?: string | null;
};

export function SettingsHubPanel({ displayName, language, timeZone }: SettingsHubPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Settings</Heading>
        <Text className="text-muted-foreground">
          Manage account configuration from focused settings sections.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current context</CardTitle>
          <CardDescription>
            Read-only snapshot from your account profile and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-3">
          <Stat label="Display name" value={displayName} />
          <Stat label="Language" value={language} />
          <Stat label="Time zone" value={timeZone} />
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            href: "/profile",
            title: "Profile",
            description: "View identity and contact information.",
          },
          {
            href: "/preferences",
            title: "Preferences",
            description: "View language, timezone, and display defaults.",
          },
          {
            href: "/security",
            title: "Security",
            description: "Review password, MFA, and session posture.",
          },
          {
            href: "/notifications",
            title: "Notifications",
            description: "Review notification center and channels.",
          },
          {
            href: "/privacy",
            title: "Privacy",
            description: "Review consent and privacy details.",
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
                Open {item.title}
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
      <Text>{value && value.length > 0 ? value : "Not available"}</Text>
    </div>
  );
}
