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
import { tAccountClient } from "@/lib/i18n/account-i18n";

type MfaReadOnlyPanelProps = {
  mfaStatus: MfaStatusResponse;
};

export function MfaReadOnlyPanel({ mfaStatus }: MfaReadOnlyPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.mfa.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.mfa.readOnlyDescription")}
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.mfa.statusTitle")}</CardTitle>
          <CardDescription>{tAccountClient("account.mfa.statusDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Row
            label={tAccountClient("account.mfa.enabledLabel")}
            value={
              mfaStatus.isEnabled ? (
                <Badge variant="secondary">{tAccountClient("account.common.enabled")}</Badge>
              ) : (
                <Badge variant="outline">{tAccountClient("account.common.disabled")}</Badge>
              )
            }
          />
          <Row
            label={tAccountClient("account.mfa.authenticatorConfigured")}
            value={
              mfaStatus.hasAuthenticator ? (
                <Badge variant="secondary">{tAccountClient("account.common.configured")}</Badge>
              ) : (
                <Badge variant="outline">{tAccountClient("account.common.notConfigured")}</Badge>
              )
            }
          />
          <Row
            label={tAccountClient("account.mfa.recoveryCodesRemaining")}
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
