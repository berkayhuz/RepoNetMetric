import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import type { UserPreferenceResponse } from "@/lib/account-api";

import { ReadOnlyValue } from "./read-only-value";
import { tAccountClient } from "@/lib/i18n/account-i18n";

type PreferencesReadOnlyPanelProps = {
  preferences: UserPreferenceResponse;
};

export function PreferencesReadOnlyPanel({ preferences }: PreferencesReadOnlyPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.preferences.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.preferences.readOnlyDescription")}
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.preferences.detailsTitle")}</CardTitle>
          <CardDescription>{tAccountClient("account.common.editingNextPhase")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Field
            label={tAccountClient("account.profile.fields.language")}
            value={preferences.language}
          />
          <Field
            label={tAccountClient("account.profile.fields.timeZone")}
            value={preferences.timeZone}
          />
          <Field label={tAccountClient("account.preferences.theme")} value={preferences.theme} />
          <Field
            label={tAccountClient("account.preferences.dateFormat")}
            value={preferences.dateFormat}
          />
          <Field
            label={tAccountClient("account.preferences.defaultOrganization")}
            value={preferences.defaultOrganizationId}
          />
          <Field label={tAccountClient("account.fields.version")} value={preferences.version} />
        </CardContent>
      </Card>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="space-y-1">
      <Text className="text-sm text-muted-foreground">{label}</Text>
      <ReadOnlyValue value={value} />
    </div>
  );
}
