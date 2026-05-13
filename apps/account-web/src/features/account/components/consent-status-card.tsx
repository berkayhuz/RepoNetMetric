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
import { ConsentAcceptForm } from "./consent-accept-form";

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
  const status = item.status.trim().toLowerCase();
  const isAccepted = status === "accepted" || status === "current";
  const isActionable =
    !isAccepted &&
    (status === "required" ||
      status === "pending" ||
      status === "declined" ||
      status === "revoked" ||
      status === "expired");

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
        {isActionable ? (
          <div className="mt-3">
            <ConsentAcceptForm consentType={item.consentType} version={item.version} />
          </div>
        ) : (
          <Text className="mt-3 text-xs text-muted-foreground">
            Consent action is not required for the current status.
          </Text>
        )}
      </CardContent>
    </Card>
  );
}
