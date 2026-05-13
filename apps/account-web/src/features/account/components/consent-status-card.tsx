import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "@netmetric/ui";

import type { ConsentHistoryItemResponse } from "@/lib/account-api";

type ConsentStatusCardProps = {
  item: ConsentHistoryItemResponse;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString();
}

export function ConsentStatusCard({ item }: ConsentStatusCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{item.status}</Badge>
          <Badge variant="outline">Version {item.version}</Badge>
        </div>
        <CardTitle className="text-base">{item.consentType}</CardTitle>
        <CardDescription>Consent history entry</CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-sm text-muted-foreground">
          Decided at: {formatDate(item.decidedAt)}
        </Text>
      </CardContent>
    </Card>
  );
}
