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
import { tAccountClient } from "@/lib/i18n/account-i18n";

type PrivacyConsentsPanelProps = {
  consents: ConsentsResponse;
};

export function PrivacyConsentsPanel({ consents }: PrivacyConsentsPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.privacy.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.privacy.description")}
        </Text>
      </div>

      {consents.items.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{tAccountClient("account.privacy.emptyTitle")}</CardTitle>
            <CardDescription>{tAccountClient("account.privacy.emptyDescription")}</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{tAccountClient("account.privacy.overviewTitle")}</CardTitle>
              <CardDescription>
                {tAccountClient("account.privacy.overviewDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-sm text-muted-foreground">
                {tAccountClient("account.audit.returnedEntriesLabel")}: {consents.items.length}
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
