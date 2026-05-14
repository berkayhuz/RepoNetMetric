"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
  Input,
  NativeSelect,
  NativeSelectOption,
  Textarea,
} from "@netmetric/ui";
import { useForm } from "react-hook-form";

import { CrmFormErrorSummary } from "@/components/forms/crm-form-error-summary";
import { CrmMutationResult } from "@/components/forms/crm-mutation-result";
import { initialCrmMutationState } from "@/features/shared/actions/mutation-state";
import { booleanOptions } from "@/features/shared/forms/options";

import { scheduleWorkMeetingAction } from "../actions/work-management-create-actions";
import { meetingFormSchema, type MeetingFormInput } from "./task-form-schema";

const defaults: MeetingFormInput = {
  title: "",
  startsAtUtc: "",
  endsAtUtc: "",
  organizerEmail: "",
  attendeeSummary: "",
  requiresExternalSync: false,
};

export function MeetingForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(initialCrmMutationState);
  const form = useForm<MeetingFormInput>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: defaults,
  });

  const onSubmit = (values: MeetingFormInput) => {
    setResult(initialCrmMutationState);
    startTransition(async () => {
      const response = await scheduleWorkMeetingAction(values);
      setResult(response);
      if (response.fieldErrors) {
        for (const [field, errors] of Object.entries(response.fieldErrors)) {
          const first = errors[0];
          if (first) form.setError(field as keyof MeetingFormInput, { message: first });
        }
      }
      if (response.status === "success" && response.redirectTo) {
        router.push(response.redirectTo);
        router.refresh();
      }
    });
  };

  return (
    <form className="space-y-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <CrmFormErrorSummary
        {...(result.status === "error" && result.message ? { message: result.message } : {})}
        {...(result.fieldErrors ? { errors: result.fieldErrors } : {})}
      />
      <CrmMutationResult state={result} />

      <FieldSet className="grid gap-4 sm:grid-cols-2">
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="meeting-title">Title</FieldLabel>
          <FieldContent>
            <Input id="meeting-title" {...form.register("title")} />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="meeting-startsAtUtc">Starts at (UTC)</FieldLabel>
          <FieldContent>
            <Input
              id="meeting-startsAtUtc"
              type="datetime-local"
              {...form.register("startsAtUtc")}
            />
            <FieldError>{form.formState.errors.startsAtUtc?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="meeting-endsAtUtc">Ends at (UTC)</FieldLabel>
          <FieldContent>
            <Input id="meeting-endsAtUtc" type="datetime-local" {...form.register("endsAtUtc")} />
            <FieldError>{form.formState.errors.endsAtUtc?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="meeting-organizerEmail">Organizer email</FieldLabel>
          <FieldContent>
            <Input id="meeting-organizerEmail" type="email" {...form.register("organizerEmail")} />
            <FieldError>{form.formState.errors.organizerEmail?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="meeting-attendeeSummary">Attendee summary</FieldLabel>
          <FieldContent>
            <Textarea id="meeting-attendeeSummary" rows={4} {...form.register("attendeeSummary")} />
            <FieldError>{form.formState.errors.attendeeSummary?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="meeting-requiresExternalSync">Requires external sync</FieldLabel>
          <FieldContent>
            <NativeSelect
              id="meeting-requiresExternalSync"
              {...form.register("requiresExternalSync")}
            >
              {booleanOptions.map((o) => (
                <NativeSelectOption key={`meeting-sync-${o.value}`} value={o.value}>
                  {o.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.requiresExternalSync?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? "Scheduling..." : "Schedule meeting"}
        </Button>
      </div>
    </form>
  );
}
