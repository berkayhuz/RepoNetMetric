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
  Input,
  Text,
} from "@netmetric/ui";

import type { UserPreferenceResponse } from "@/lib/account-api";

import { initialMutationState, type MutationState } from "../actions/mutation-state";
import { ReadOnlyValue } from "./read-only-value";

type PreferencesEditFormProps = {
  preferences: UserPreferenceResponse;
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

export function PreferencesEditForm({ preferences, action }: PreferencesEditFormProps) {
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
              <FormField
                id="language"
                name="language"
                label="Language"
                defaultValue={preferences.language}
                error={state.fieldErrors?.language?.[0]}
              />
              <FormField
                id="timeZone"
                name="timeZone"
                label="Time zone"
                defaultValue={preferences.timeZone}
                error={state.fieldErrors?.timeZone?.[0]}
              />
              <FormField
                id="theme"
                name="theme"
                label="Theme"
                defaultValue={preferences.theme}
                error={state.fieldErrors?.theme?.[0]}
              />
              <FormField
                id="dateFormat"
                name="dateFormat"
                label="Date format"
                defaultValue={preferences.dateFormat}
                error={state.fieldErrors?.dateFormat?.[0]}
              />
              <FormField
                id="defaultOrganizationId"
                name="defaultOrganizationId"
                label="Default organization ID"
                defaultValue={preferences.defaultOrganizationId ?? ""}
                error={state.fieldErrors?.defaultOrganizationId?.[0]}
              />
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

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue: string;
  error: string | undefined;
};

function FormField({ id, name, label, defaultValue, error }: FormFieldProps) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldContent>
        <Input
          id={id}
          name={name}
          defaultValue={defaultValue}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
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
