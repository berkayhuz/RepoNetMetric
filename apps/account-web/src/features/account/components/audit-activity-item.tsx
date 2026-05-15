import { Badge, Card, CardContent, CardHeader, CardTitle, Text } from "@netmetric/ui";
import type { AccountDateSettings } from "@/lib/account-date";
import { formatAccountDateTime } from "@/lib/account-date";

import type { AccountAuditEntryResponse } from "@/lib/account-api/account-api-types";

type AuditActivityItemProps = {
  item: AccountAuditEntryResponse;
  dateSettings: AccountDateSettings;
};

export function AuditActivityItem({ item, dateSettings }: AuditActivityItemProps) {
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
          Occurred: {formatAccountDateTime(item.occurredAt, dateSettings)}
        </Text>
        <Text className="text-sm text-muted-foreground">
          Correlation ID: {item.correlationId?.trim() ? item.correlationId : "Not available"}
        </Text>
      </CardContent>
    </Card>
  );
}
