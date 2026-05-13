import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";
import type { ReactNode } from "react";

import type { MfaStatusResponse } from "@/lib/account-api";

type MfaReadOnlyPanelProps = {
  mfaStatus: MfaStatusResponse;
};

export function MfaReadOnlyPanel({ mfaStatus }: MfaReadOnlyPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Multi-factor Authentication</Heading>
        <Text className="text-muted-foreground">
          Read-only MFA status. Setup/confirm/disable flows will be added in the next phase.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>MFA status</CardTitle>
          <CardDescription>Current account second-factor posture.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Row
            label="MFA enabled"
            value={
              mfaStatus.isEnabled ? (
                <Badge variant="secondary">Enabled</Badge>
              ) : (
                <Badge variant="outline">Disabled</Badge>
              )
            }
          />
          <Row
            label="Authenticator configured"
            value={
              mfaStatus.hasAuthenticator ? (
                <Badge variant="secondary">Configured</Badge>
              ) : (
                <Badge variant="outline">Not configured</Badge>
              )
            }
          />
          <Row
            label="Recovery codes remaining"
            value={<Text>{String(mfaStatus.recoveryCodesRemaining)}</Text>}
          />
        </CardContent>
      </Card>
    </section>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Text className="text-sm text-muted-foreground">{label}</Text>
      {value}
    </div>
  );
}
