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
  NativeSelect,
  Text,
} from "@netmetric/ui";

import type { AccountOptionsResponse, MyProfileResponse } from "@/lib/account-api";
import { resolveLanguageSelectState } from "@/lib/language-select";

import { initialMutationState, type MutationState } from "../actions/mutation-state";
import { AvatarManagementPanel } from "./avatar-management-panel";
import { ReadOnlyValue } from "./read-only-value";

type ProfileEditFormProps = {
  profile: MyProfileResponse;
  options: AccountOptionsResponse;
  copy: ProfileEditCopy;
  action: (state: MutationState, formData: FormData) => Promise<MutationState>;
};

export type ProfileEditCopy = {
  pageTitle: string;
  pageDescription: string;
  updatedTitle: string;
  updateFailedTitle: string;
  editCardTitle: string;
  editCardDescription: string;
  fields: {
    displayName: string;
    firstName: string;
    lastName: string;
    phoneCountry: string;
    noPhone: string;
    phoneNationalNumber: string;
    jobTitle: string;
    department: string;
    timeZone: string;
    language: string;
  };
  help: {
    displayNameManaged: string;
    phoneNationalNumber: string;
  };
  actions: {
    save: string;
    saving: string;
    reset: string;
  };
};

function SubmitButton({ copy }: { copy: ProfileEditCopy }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? copy.actions.saving : copy.actions.save}
    </Button>
  );
}

export function ProfileEditForm({ profile, options, copy, action }: ProfileEditFormProps) {
  const [state, formAction] = useActionState(action, initialMutationState);
  const languageSelect = resolveLanguageSelectState(profile.culture, options.languages);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{copy.pageTitle}</Heading>
        <Text className="text-muted-foreground">{copy.pageDescription}</Text>
      </div>

      {state.status === "success" ? (
        <Alert>
          <AlertTitle>{copy.updatedTitle}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      {state.status === "error" && state.message ? (
        <Alert variant="destructive">
          <AlertTitle>{copy.updateFailedTitle}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{copy.editCardTitle}</CardTitle>
          <CardDescription>{copy.editCardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4" noValidate>
            <input type="hidden" name="version" value={profile.version} />
            <FieldSet className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="displayName"
                name="displayName"
                label={copy.fields.displayName}
                defaultValue={profile.displayName}
                readOnly
                helpText={copy.help.displayNameManaged}
                error={undefined}
              />
              <FormField
                id="firstName"
                name="firstName"
                label={copy.fields.firstName}
                defaultValue={profile.firstName}
                error={state.fieldErrors?.firstName?.[0]}
                helpText={undefined}
                readOnly={undefined}
              />
              <FormField
                id="lastName"
                name="lastName"
                label={copy.fields.lastName}
                defaultValue={profile.lastName}
                error={state.fieldErrors?.lastName?.[0]}
                helpText={undefined}
                readOnly={undefined}
              />
              <Field>
                <FieldLabel htmlFor="phoneCountryIso2">{copy.fields.phoneCountry}</FieldLabel>
                <FieldContent>
                  <NativeSelect
                    id="phoneCountryIso2"
                    name="phoneCountryIso2"
                    defaultValue={profile.phoneCountryIso2 ?? ""}
                  >
                    <option value="">{copy.fields.noPhone}</option>
                    {options.phoneCountries.map((country) => (
                      <option key={country.iso2} value={country.iso2}>
                        {country.name} ({country.iso2}) {country.dialCode}
                      </option>
                    ))}
                  </NativeSelect>
                </FieldContent>
              </Field>
              <FormField
                id="phoneNationalNumber"
                name="phoneNationalNumber"
                label={copy.fields.phoneNationalNumber}
                defaultValue={profile.phoneNationalNumber ?? ""}
                error={state.fieldErrors?.phoneNationalNumber?.[0]}
                helpText={copy.help.phoneNationalNumber}
                readOnly={undefined}
              />
              <FormField
                id="jobTitle"
                name="jobTitle"
                label={copy.fields.jobTitle}
                defaultValue={profile.jobTitle ?? ""}
                error={state.fieldErrors?.jobTitle?.[0]}
                helpText={undefined}
                readOnly={undefined}
              />
              <FormField
                id="department"
                name="department"
                label={copy.fields.department}
                defaultValue={profile.department ?? ""}
                error={state.fieldErrors?.department?.[0]}
                helpText={undefined}
                readOnly={undefined}
              />
              <Field>
                <FieldLabel htmlFor="timeZone">{copy.fields.timeZone}</FieldLabel>
                <FieldContent>
                  <NativeSelect
                    id="timeZone"
                    name="timeZone"
                    defaultValue={profile.timeZone}
                    aria-invalid={Boolean(state.fieldErrors?.timeZone?.[0])}
                  >
                    {options.timeZones.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </NativeSelect>
                  <FieldError id="timeZone-error">{state.fieldErrors?.timeZone?.[0]}</FieldError>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="culture">{copy.fields.language}</FieldLabel>
                <FieldContent>
                  <NativeSelect
                    id="culture"
                    name="culture"
                    defaultValue={languageSelect.selectedValue}
                    aria-invalid={Boolean(state.fieldErrors?.culture?.[0])}
                  >
                    {languageSelect.options.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </NativeSelect>
                  <FieldError id="culture-error">{state.fieldErrors?.culture?.[0]}</FieldError>
                </FieldContent>
              </Field>
            </FieldSet>

            <div className="flex flex-wrap items-center gap-2">
              <SubmitButton copy={copy} />
              <Button type="reset" variant="outline">
                {copy.actions.reset}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AvatarManagementPanel profile={profile} />

      <Card>
        <CardHeader>
          <CardTitle>Read-only metadata</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <MetaField label="Profile ID" value={profile.id} />
          <MetaField label="Tenant ID" value={profile.tenantId} />
          <MetaField label="User ID" value={profile.userId} />
          <MetaField label="Avatar URL" value={profile.avatarUrl} />
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
  helpText: string | undefined;
  readOnly: boolean | undefined;
};

function FormField({ id, name, label, defaultValue, error, helpText, readOnly }: FormFieldProps) {
  const describedBy = error ? `${id}-error` : helpText ? `${id}-help` : undefined;

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldContent>
        <Input
          id={id}
          name={name}
          defaultValue={defaultValue}
          readOnly={readOnly}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
        {helpText ? (
          <Text id={`${id}-help`} className="text-xs text-muted-foreground">
            {helpText}
          </Text>
        ) : null}
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
