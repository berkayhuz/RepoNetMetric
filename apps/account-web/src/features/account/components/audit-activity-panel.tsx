import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import type { AccountAuditEntriesResponse } from "@/lib/account-api";
import type { AccountDateSettings } from "@/lib/account-date";
import { tAccountClient } from "@/lib/i18n/account-i18n";

import { AuditActivityItem } from "./audit-activity-item";

type AuditActivityPanelProps = {
  audit: AccountAuditEntriesResponse;
  activeEventType: string | undefined;
  activeLimit: number;
  dateSettings: AccountDateSettings;
};

export function AuditActivityPanel({
  audit,
  activeEventType,
  activeLimit,
  dateSettings,
}: AuditActivityPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.audit.title")}</Heading>
        <Text className="text-muted-foreground">{tAccountClient("account.audit.description")}</Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.audit.filtersTitle")}</CardTitle>
          <CardDescription>{tAccountClient("account.audit.filtersDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.audit.limitLabel")}: {activeLimit}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.audit.eventTypeLabel")}:{" "}
            {activeEventType?.trim() ? activeEventType : tAccountClient("account.common.all")}
          </Text>
        </CardContent>
      </Card>

      {audit.items.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{tAccountClient("account.audit.emptyTitle")}</CardTitle>
            <CardDescription>{tAccountClient("account.audit.emptyDescription")}</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.audit.returnedEntriesLabel")}: {audit.count}
          </Text>
          {audit.items.map((item) => (
            <AuditActivityItem key={item.id} item={item} dateSettings={dateSettings} />
          ))}
        </div>
      )}
    </section>
  );
}
