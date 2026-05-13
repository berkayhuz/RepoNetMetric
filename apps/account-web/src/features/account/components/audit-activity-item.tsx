import { Badge, Card, CardContent, CardHeader, CardTitle, Text } from "@netmetric/ui";

import type { AccountAuditEntryResponse } from "@/lib/account-api/account-api-types";

type AuditActivityItemProps = {
  item: AccountAuditEntryResponse;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString();
}

export function AuditActivityItem({ item }: AuditActivityItemProps) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{item.severity}</Badge>
          <Badge variant="outline">{item.eventType}</Badge>
        </div>
        <CardTitle className="text-base">Account activity event</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Text className="text-sm text-muted-foreground">
          Occurred: {formatDate(item.occurredAt)}
        </Text>
        <Text className="text-sm text-muted-foreground">
          Correlation ID: {item.correlationId?.trim() ? item.correlationId : "Not available"}
        </Text>
      </CardContent>
    </Card>
  );
}
