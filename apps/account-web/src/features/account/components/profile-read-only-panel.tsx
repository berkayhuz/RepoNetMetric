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
import { tAccountClient } from "@/lib/i18n/account-i18n";

type ProfileReadOnlyPanelProps = {
  profile: MyProfileResponse;
};

export function ProfileReadOnlyPanel({ profile }: ProfileReadOnlyPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.profile.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.profile.readOnlyDescription")}
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.profile.detailsTitle")}</CardTitle>
          <CardDescription>{tAccountClient("account.common.editingNextPhase")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Field label={tAccountClient("account.fields.displayName")} value={profile.displayName} />
          <Field
            label={tAccountClient("account.profile.fields.firstName")}
            value={profile.firstName}
          />
          <Field
            label={tAccountClient("account.profile.fields.lastName")}
            value={profile.lastName}
          />
          <Field
            label={tAccountClient("account.profile.fields.phone")}
            value={profile.phoneNumber}
          />
          <Field
            label={tAccountClient("account.profile.fields.jobTitle")}
            value={profile.jobTitle}
          />
          <Field
            label={tAccountClient("account.profile.fields.department")}
            value={profile.department}
          />
          <Field
            label={tAccountClient("account.profile.fields.timeZone")}
            value={profile.timeZone}
          />
          <Field label={tAccountClient("account.profile.fields.culture")} value={profile.culture} />
          <Field label={tAccountClient("account.fields.avatarUrl")} value={profile.avatarUrl} />
          <Field label={tAccountClient("account.fields.version")} value={profile.version} />
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
