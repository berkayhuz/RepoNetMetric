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

type PreferencesReadOnlyPanelProps = {
  preferences: UserPreferenceResponse;
};

export function PreferencesReadOnlyPanel({ preferences }: PreferencesReadOnlyPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Preferences</Heading>
        <Text className="text-muted-foreground">
          Read-only preference data from the account service.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preference details</CardTitle>
          <CardDescription>Editing will be added in the next phase.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Field label="Language" value={preferences.language} />
          <Field label="Time zone" value={preferences.timeZone} />
          <Field label="Theme" value={preferences.theme} />
          <Field label="Date format" value={preferences.dateFormat} />
          <Field label="Default organization" value={preferences.defaultOrganizationId} />
          <Field label="Version" value={preferences.version} />
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
