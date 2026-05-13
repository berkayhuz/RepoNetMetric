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

import { AuditActivityItem } from "./audit-activity-item";

type AuditActivityPanelProps = {
  audit: AccountAuditEntriesResponse;
  activeEventType: string | undefined;
  activeLimit: number;
};

export function AuditActivityPanel({
  audit,
  activeEventType,
  activeLimit,
}: AuditActivityPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Audit activity</Heading>
        <Text className="text-muted-foreground">
          Read-only account activity timeline for security and compliance visibility.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applied filters</CardTitle>
          <CardDescription>Current server-side query options for this view.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          <Text className="text-sm text-muted-foreground">Limit: {activeLimit}</Text>
          <Text className="text-sm text-muted-foreground">
            Event type: {activeEventType?.trim() ? activeEventType : "All"}
          </Text>
        </CardContent>
      </Card>

      {audit.items.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No audit entries</CardTitle>
            <CardDescription>No activity entries matched the current filters.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          <Text className="text-sm text-muted-foreground">Returned entries: {audit.count}</Text>
          {audit.items.map((item) => (
            <AuditActivityItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
