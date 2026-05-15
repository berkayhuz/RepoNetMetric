"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
  Heading,
  NativeSelect,
  Text,
} from "@netmetric/ui";

import type {
  AccountOptionsResponse,
  OrganizationMembershipSummaryResponse,
  UserPreferenceResponse,
} from "@/lib/account-api";

import { initialMutationState, type MutationState } from "../actions/mutation-state";
import { ReadOnlyValue } from "./read-only-value";

type PreferencesEditFormProps = {
  preferences: UserPreferenceResponse;
  options: AccountOptionsResponse;
  organizations: OrganizationMembershipSummaryResponse[];
  action: (state: MutationState, formData: FormData) => Promise<MutationState>;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save preferences"}
    </Button>
  );
}

export function PreferencesEditForm({
  preferences,
  options,
  organizations,
  action,
}: PreferencesEditFormProps) {
  const [state, formAction] = useActionState(action, initialMutationState);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Preferences</Heading>
        <Text className="text-muted-foreground">
          Update account preferences. Security and notification workflows are handled in later
          phases.
        </Text>
      </div>

      {state.status === "success" ? (
        <Alert>
          <AlertTitle>Preferences updated</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      {state.status === "error" && state.message ? (
        <Alert variant="destructive">
          <AlertTitle>Update failed</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Edit preferences</CardTitle>
          <CardDescription>Changes are saved to your account preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4" noValidate>
            <input type="hidden" name="version" value={preferences.version} />
            <FieldSet className="grid gap-4 sm:grid-cols-2">
              <SelectField
                id="language"
                name="language"
                label="Language"
                defaultValue={preferences.language}
                error={state.fieldErrors?.language?.[0]}
                options={options.languages}
              />
              <SelectField
                id="timeZone"
                name="timeZone"
                label="Time zone"
                defaultValue={preferences.timeZone}
                error={state.fieldErrors?.timeZone?.[0]}
                options={options.timeZones}
              />
              <SelectField
                id="theme"
                name="theme"
                label="Theme"
                defaultValue={preferences.theme}
                error={state.fieldErrors?.theme?.[0]}
                options={options.themes}
              />
              <SelectField
                id="dateFormat"
                name="dateFormat"
                label="Date format"
                defaultValue={preferences.dateFormat}
                error={state.fieldErrors?.dateFormat?.[0]}
                options={options.dateFormats}
              />
              <Field>
                <FieldLabel htmlFor="defaultOrganizationId">Default organization</FieldLabel>
                <FieldContent>
                  <NativeSelect
                    id="defaultOrganizationId"
                    name="defaultOrganizationId"
                    defaultValue={preferences.defaultOrganizationId ?? ""}
                  >
                    <option value="">No default organization</option>
                    {organizations.map((org) => (
                      <option key={org.organizationId} value={org.organizationId}>
                        {org.organizationName}
                      </option>
                    ))}
                  </NativeSelect>
                  <FieldError id="defaultOrganizationId-error">
                    {state.fieldErrors?.defaultOrganizationId?.[0]}
                  </FieldError>
                </FieldContent>
              </Field>
            </FieldSet>

            <div className="flex flex-wrap items-center gap-2">
              <SubmitButton />
              <Button type="reset" variant="outline">
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Read-only metadata</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <MetaField label="Preference ID" value={preferences.id} />
          <MetaField label="Current version" value={preferences.version} />
        </CardContent>
      </Card>
    </section>
  );
}

function SelectField({
  id,
  name,
  label,
  defaultValue,
  error,
  options,
}: {
  id: string;
  name: string;
  label: string;
  defaultValue: string;
  error: string | undefined;
  options: { value: string; label: string }[];
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldContent>
        <NativeSelect id={id} name={name} defaultValue={defaultValue} aria-invalid={Boolean(error)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
        <FieldError id={`${id}-error`}>{error}</FieldError>
      </FieldContent>
    </Field>
  );
}

function MetaField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="space-y-1">
      <Text className="text-sm text-muted-foreground">{label}</Text>
      <ReadOnlyValue value={value} />
    </div>
  );
}
