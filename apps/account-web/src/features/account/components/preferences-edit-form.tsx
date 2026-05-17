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
  Text,
} from "@netmetric/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@netmetric/ui/client";
import { useState } from "react";

import type {
  AccountOptionsResponse,
  OrganizationMembershipSummaryResponse,
  UserPreferenceResponse,
} from "@/lib/account-api";

import { initialMutationState, type MutationState } from "../actions/mutation-state";
import { ReadOnlyValue } from "./read-only-value";
import { tAccountClient } from "@/lib/i18n/account-i18n";

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
      {pending
        ? tAccountClient("account.common.saving")
        : tAccountClient("account.preferences.save")}
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
  const noDefaultOrganization = "__none__";
  const isConflict = state.status === "error" && state.code === "conflict";
  const [defaultOrganizationId, setDefaultOrganizationId] = useState(
    preferences.defaultOrganizationId ?? noDefaultOrganization,
  );

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.preferences.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.preferences.description")}
        </Text>
      </div>

      {state.status === "success" ? (
        <Alert>
          <AlertTitle>{tAccountClient("account.preferences.updatedTitle")}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      {state.status === "error" && state.message ? (
        <Alert variant="destructive">
          <AlertTitle>{tAccountClient("account.common.updateFailed")}</AlertTitle>
          <AlertDescription className="space-y-3">
            <span>{state.message}</span>
            {isConflict ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  window.location.reload();
                }}
              >
                {tAccountClient("account.preferences.reloadLatest")}
              </Button>
            ) : null}
          </AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.preferences.editTitle")}</CardTitle>
          <CardDescription>{tAccountClient("account.preferences.editDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4" noValidate>
            <input type="hidden" name="version" value={preferences.version} />
            <FieldSet className="grid gap-4 sm:grid-cols-2">
              <SelectField
                id="language"
                name="language"
                label={tAccountClient("account.profile.fields.language")}
                defaultValue={preferences.language}
                error={state.fieldErrors?.language?.[0]}
                options={options.languages}
              />
              <SelectField
                id="timeZone"
                name="timeZone"
                label={tAccountClient("account.profile.fields.timeZone")}
                defaultValue={preferences.timeZone}
                error={state.fieldErrors?.timeZone?.[0]}
                options={options.timeZones}
              />
              <SelectField
                id="theme"
                name="theme"
                label={tAccountClient("account.preferences.theme")}
                defaultValue={preferences.theme}
                error={state.fieldErrors?.theme?.[0]}
                options={options.themes}
              />
              <SelectField
                id="dateFormat"
                name="dateFormat"
                label={tAccountClient("account.preferences.dateFormat")}
                defaultValue={preferences.dateFormat}
                error={state.fieldErrors?.dateFormat?.[0]}
                options={options.dateFormats}
              />
              <Field>
                <FieldLabel htmlFor="defaultOrganizationId">
                  {tAccountClient("account.preferences.defaultOrganization")}
                </FieldLabel>
                <FieldContent>
                  <input
                    type="hidden"
                    id="defaultOrganizationId"
                    name="defaultOrganizationId"
                    value={
                      defaultOrganizationId === noDefaultOrganization ? "" : defaultOrganizationId
                    }
                  />
                  <Select
                    value={defaultOrganizationId}
                    onValueChange={(nextValue) =>
                      setDefaultOrganizationId(nextValue ?? noDefaultOrganization)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={tAccountClient("account.preferences.noDefaultOrganization")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={noDefaultOrganization}>
                        {tAccountClient("account.preferences.noDefaultOrganization")}
                      </SelectItem>
                      {organizations.map((org) => (
                        <SelectItem key={org.organizationId} value={org.organizationId}>
                          {org.organizationName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError id="defaultOrganizationId-error">
                    {state.fieldErrors?.defaultOrganizationId?.[0]}
                  </FieldError>
                </FieldContent>
              </Field>
            </FieldSet>

            <div className="flex flex-wrap items-center gap-2">
              <SubmitButton />
              <Button type="reset" variant="outline">
                {tAccountClient("account.common.reset")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.common.readOnlyMetadata")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <MetaField
            label={tAccountClient("account.preferences.preferenceId")}
            value={preferences.id}
          />
          <MetaField
            label={tAccountClient("account.fields.currentVersion")}
            value={preferences.version}
          />
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
  const [value, setValue] = useState(defaultValue);

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldContent>
        <input type="hidden" id={id} name={name} value={value} />
        <Select value={value} onValueChange={(nextValue) => setValue(nextValue ?? defaultValue)}>
          <SelectTrigger aria-invalid={Boolean(error)}>
            <SelectValue
              placeholder={tAccountClient("account.common.selectPlaceholder", { label })}
            />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
