import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import type { MyProfileResponse } from "@/lib/account-api";

import { ReadOnlyValue } from "./read-only-value";

type ProfileReadOnlyPanelProps = {
  profile: MyProfileResponse;
};

export function ProfileReadOnlyPanel({ profile }: ProfileReadOnlyPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Profile</Heading>
        <Text className="text-muted-foreground">
          Read-only profile data from the account service.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile details</CardTitle>
          <CardDescription>Editing will be added in the next phase.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Field label="Display name" value={profile.displayName} />
          <Field label="First name" value={profile.firstName} />
          <Field label="Last name" value={profile.lastName} />
          <Field label="Phone" value={profile.phoneNumber} />
          <Field label="Job title" value={profile.jobTitle} />
          <Field label="Department" value={profile.department} />
          <Field label="Time zone" value={profile.timeZone} />
          <Field label="Culture" value={profile.culture} />
          <Field label="Avatar URL" value={profile.avatarUrl} />
          <Field label="Version" value={profile.version} />
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
