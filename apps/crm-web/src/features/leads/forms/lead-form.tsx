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
import {
  leadSourceOptions,
  leadStatusOptions,
  priorityOptions,
} from "@/features/shared/forms/options";

import { createLeadAction, updateLeadAction } from "../actions/lead-mutation-actions";
import { leadFormSchema, type LeadFormInput } from "./lead-form-schema";

type LeadFormProps = {
  mode: "create" | "edit";
  leadId?: string;
  initialValues?: Partial<LeadFormInput>;
};

const defaults: LeadFormInput = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  jobTitle: "",
  description: "",
  estimatedBudget: "",
  nextContactDate: "",
  source: 0,
  status: 0,
  priority: 1,
  companyId: "",
  ownerUserId: "",
  notes: "",
  rowVersion: "",
};

export function LeadForm({ mode, leadId, initialValues }: Readonly<LeadFormProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(initialCrmMutationState);
  const form = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { ...defaults, ...initialValues },
  });

  const onSubmit = (values: LeadFormInput) => {
    setResult(initialCrmMutationState);
    startTransition(async () => {
      const response =
        mode === "create"
          ? await createLeadAction(values)
          : await updateLeadAction(leadId ?? "", values);
      setResult(response);
      if (response.fieldErrors) {
        for (const [field, errors] of Object.entries(response.fieldErrors)) {
          const first = errors[0];
          if (first) form.setError(field as keyof LeadFormInput, { message: first });
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
        <Field>
          <FieldLabel htmlFor="lead-fullName">Full name</FieldLabel>
          <FieldContent>
            <Input id="lead-fullName" {...form.register("fullName")} />
            <FieldError>{form.formState.errors.fullName?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-companyName">Company name</FieldLabel>
          <FieldContent>
            <Input id="lead-companyName" {...form.register("companyName")} />
            <FieldError>{form.formState.errors.companyName?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-email">Email</FieldLabel>
          <FieldContent>
            <Input id="lead-email" type="email" {...form.register("email")} />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-phone">Phone</FieldLabel>
          <FieldContent>
            <Input id="lead-phone" {...form.register("phone")} />
            <FieldError>{form.formState.errors.phone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-jobTitle">Job title</FieldLabel>
          <FieldContent>
            <Input id="lead-jobTitle" {...form.register("jobTitle")} />
            <FieldError>{form.formState.errors.jobTitle?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-estimatedBudget">Estimated budget</FieldLabel>
          <FieldContent>
            <Input
              id="lead-estimatedBudget"
              inputMode="decimal"
              {...form.register("estimatedBudget")}
            />
            <FieldError>{form.formState.errors.estimatedBudget?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-nextContactDate">Next contact date</FieldLabel>
          <FieldContent>
            <Input id="lead-nextContactDate" type="date" {...form.register("nextContactDate")} />
            <FieldError>{form.formState.errors.nextContactDate?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-source">Source</FieldLabel>
          <FieldContent>
            <NativeSelect id="lead-source" {...form.register("source")}>
              {leadSourceOptions.map((o) => (
                <NativeSelectOption key={`lead-source-${o.value}`} value={String(o.value)}>
                  {o.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.source?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-status">Status</FieldLabel>
          <FieldContent>
            <NativeSelect id="lead-status" {...form.register("status")}>
              {leadStatusOptions.map((o) => (
                <NativeSelectOption key={`lead-status-${o.value}`} value={String(o.value)}>
                  {o.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.status?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-priority">Priority</FieldLabel>
          <FieldContent>
            <NativeSelect id="lead-priority" {...form.register("priority")}>
              {priorityOptions.map((o) => (
                <NativeSelectOption key={`lead-priority-${o.value}`} value={String(o.value)}>
                  {o.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.priority?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-companyId">Company ID</FieldLabel>
          <FieldContent>
            <Input id="lead-companyId" {...form.register("companyId")} />
            <FieldError>{form.formState.errors.companyId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-ownerUserId">Owner user ID</FieldLabel>
          <FieldContent>
            <Input id="lead-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="lead-description">Description</FieldLabel>
          <FieldContent>
            <Textarea id="lead-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-notes">Notes</FieldLabel>
          <FieldContent>
            <Textarea id="lead-notes" rows={4} {...form.register("notes")} />
            <FieldError>{form.formState.errors.notes?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      {mode === "edit" ? <input type="hidden" {...form.register("rowVersion")} /> : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? "Saving..." : mode === "create" ? "Create lead" : "Save lead"}
        </Button>
      </div>
    </form>
  );
}
