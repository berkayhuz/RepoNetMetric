import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import type { ConsentsResponse } from "@/lib/account-api";

import { ConsentStatusCard } from "./consent-status-card";

type PrivacyConsentsPanelProps = {
  consents: ConsentsResponse;
};

export function PrivacyConsentsPanel({ consents }: PrivacyConsentsPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Privacy and consent history</Heading>
        <Text className="text-muted-foreground">
          Review your consent timeline. Consent updates will be enabled in a later phase.
        </Text>
      </div>

      {consents.items.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No consent entries</CardTitle>
            <CardDescription>No consent history is available for this account yet.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consent overview</CardTitle>
              <CardDescription>Read-only entries returned by the account API.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-sm text-muted-foreground">
                Returned entries: {consents.items.length}
              </Text>
            </CardContent>
          </Card>
          {consents.items.map((item) => (
            <ConsentStatusCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
