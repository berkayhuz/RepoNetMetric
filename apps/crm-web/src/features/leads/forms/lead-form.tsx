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
  Textarea,
} from "@netmetric/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@netmetric/ui/client";
import { useForm } from "react-hook-form";

import { CrmFormErrorSummary } from "@/components/forms/crm-form-error-summary";
import { CrmMutationResult } from "@/components/forms/crm-mutation-result";
import { initialCrmMutationState } from "@/features/shared/actions/mutation-state";
import {
  leadSourceOptions,
  leadStatusOptions,
  priorityOptions,
} from "@/features/shared/forms/options";
import { tCrmClient } from "@/lib/i18n/crm-i18n";

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
          <FieldLabel htmlFor="lead-fullName">{tCrmClient("crm.leads.fields.fullName")}</FieldLabel>
          <FieldContent>
            <Input id="lead-fullName" {...form.register("fullName")} />
            <FieldError>{form.formState.errors.fullName?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-companyName">
            {tCrmClient("crm.leads.fields.companyName")}
          </FieldLabel>
          <FieldContent>
            <Input id="lead-companyName" {...form.register("companyName")} />
            <FieldError>{form.formState.errors.companyName?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-email">{tCrmClient("crm.leads.fields.email")}</FieldLabel>
          <FieldContent>
            <Input id="lead-email" type="email" {...form.register("email")} />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-phone">{tCrmClient("crm.leads.fields.phone")}</FieldLabel>
          <FieldContent>
            <Input id="lead-phone" {...form.register("phone")} />
            <FieldError>{form.formState.errors.phone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-jobTitle">{tCrmClient("crm.leads.fields.jobTitle")}</FieldLabel>
          <FieldContent>
            <Input id="lead-jobTitle" {...form.register("jobTitle")} />
            <FieldError>{form.formState.errors.jobTitle?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-estimatedBudget">
            {tCrmClient("crm.leads.fields.estimatedBudget")}
          </FieldLabel>
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
          <FieldLabel htmlFor="lead-nextContactDate">
            {tCrmClient("crm.leads.fields.nextContactDate")}
          </FieldLabel>
          <FieldContent>
            <Input id="lead-nextContactDate" type="date" {...form.register("nextContactDate")} />
            <FieldError>{form.formState.errors.nextContactDate?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-source">{tCrmClient("crm.leads.fields.source")}</FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("source"))}
              onValueChange={(value) =>
                form.setValue("source", Number(value), { shouldDirty: true, shouldValidate: true })
              }
            >
              <SelectTrigger id="lead-source">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {leadSourceOptions.map((o) => (
                  <SelectItem key={`lead-source-${o.value}`} value={String(o.value)}>
                    {tCrmClient(`crm.leads.source.${o.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{form.formState.errors.source?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-status">{tCrmClient("crm.leads.fields.status")}</FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("status"))}
              onValueChange={(value) =>
                form.setValue("status", Number(value), { shouldDirty: true, shouldValidate: true })
              }
            >
              <SelectTrigger id="lead-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {leadStatusOptions.map((o) => (
                  <SelectItem key={`lead-status-${o.value}`} value={String(o.value)}>
                    {tCrmClient(`crm.leads.status.${o.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{form.formState.errors.status?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-priority">{tCrmClient("crm.leads.fields.priority")}</FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("priority"))}
              onValueChange={(value) =>
                form.setValue("priority", Number(value), {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger id="lead-priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((o) => (
                  <SelectItem key={`lead-priority-${o.value}`} value={String(o.value)}>
                    {tCrmClient(`crm.common.priority.${o.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{form.formState.errors.priority?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-companyId">
            {tCrmClient("crm.leads.fields.companyId")}
          </FieldLabel>
          <FieldContent>
            <Input id="lead-companyId" {...form.register("companyId")} />
            <FieldError>{form.formState.errors.companyId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-ownerUserId">
            {tCrmClient("crm.leads.fields.ownerUserId")}
          </FieldLabel>
          <FieldContent>
            <Input id="lead-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="lead-description">
            {tCrmClient("crm.leads.fields.description")}
          </FieldLabel>
          <FieldContent>
            <Textarea id="lead-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="lead-notes">{tCrmClient("crm.leads.fields.notes")}</FieldLabel>
          <FieldContent>
            <Textarea id="lead-notes" rows={4} {...form.register("notes")} />
            <FieldError>{form.formState.errors.notes?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      {mode === "edit" ? <input type="hidden" {...form.register("rowVersion")} /> : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          {tCrmClient("crm.forms.actions.cancel")}
        </Button>
        <Button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending
            ? tCrmClient("crm.forms.actions.saving")
            : mode === "create"
              ? tCrmClient("crm.leads.actions.create")
              : tCrmClient("crm.leads.actions.save")}
        </Button>
      </div>
    </form>
  );
}
