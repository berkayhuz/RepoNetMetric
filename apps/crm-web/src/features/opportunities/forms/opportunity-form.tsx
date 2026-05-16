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
  opportunityStageOptions,
  opportunityStatusOptions,
  priorityOptions,
} from "@/features/shared/forms/options";
import { tCrmClient } from "@/lib/i18n/crm-i18n";

import {
  createOpportunityAction,
  updateOpportunityAction,
} from "../actions/opportunity-mutation-actions";
import { opportunityFormSchema, type OpportunityFormInput } from "./opportunity-form-schema";

type OpportunityFormProps = {
  mode: "create" | "edit";
  opportunityId?: string;
  initialValues?: Partial<OpportunityFormInput>;
};

const defaults: OpportunityFormInput = {
  opportunityCode: "",
  name: "",
  description: "",
  estimatedAmount: "",
  expectedRevenue: "",
  probability: 0,
  estimatedCloseDate: "",
  stage: 0,
  status: 0,
  priority: 1,
  leadId: "",
  customerId: "",
  ownerUserId: "",
  notes: "",
  rowVersion: "",
};

export function OpportunityForm({
  mode,
  opportunityId,
  initialValues,
}: Readonly<OpportunityFormProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(initialCrmMutationState);
  const form = useForm<OpportunityFormInput>({
    resolver: zodResolver(opportunityFormSchema),
    defaultValues: { ...defaults, ...initialValues },
  });

  const onSubmit = (values: OpportunityFormInput) => {
    setResult(initialCrmMutationState);
    startTransition(async () => {
      const response =
        mode === "create"
          ? await createOpportunityAction(values)
          : await updateOpportunityAction(opportunityId ?? "", values);
      setResult(response);
      if (response.fieldErrors) {
        for (const [field, errors] of Object.entries(response.fieldErrors)) {
          const first = errors[0];
          if (first) form.setError(field as keyof OpportunityFormInput, { message: first });
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
          <FieldLabel htmlFor="opportunity-code">
            {tCrmClient("crm.opportunities.fields.opportunityCode")}
          </FieldLabel>
          <FieldContent>
            <Input id="opportunity-code" {...form.register("opportunityCode")} />
            <FieldError>{form.formState.errors.opportunityCode?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-name">
            {tCrmClient("crm.opportunities.fields.name")}
          </FieldLabel>
          <FieldContent>
            <Input id="opportunity-name" {...form.register("name")} />
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-estimatedAmount">
            {tCrmClient("crm.opportunities.fields.estimatedAmount")}
          </FieldLabel>
          <FieldContent>
            <Input
              id="opportunity-estimatedAmount"
              inputMode="decimal"
              {...form.register("estimatedAmount")}
            />
            <FieldError>{form.formState.errors.estimatedAmount?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-expectedRevenue">
            {tCrmClient("crm.opportunities.fields.expectedRevenue")}
          </FieldLabel>
          <FieldContent>
            <Input
              id="opportunity-expectedRevenue"
              inputMode="decimal"
              {...form.register("expectedRevenue")}
            />
            <FieldError>{form.formState.errors.expectedRevenue?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-probability">
            {tCrmClient("crm.opportunities.fields.probability")}
          </FieldLabel>
          <FieldContent>
            <Input
              id="opportunity-probability"
              type="number"
              min={0}
              max={100}
              {...form.register("probability")}
            />
            <FieldError>{form.formState.errors.probability?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-estimatedCloseDate">
            {tCrmClient("crm.opportunities.fields.estimatedCloseDate")}
          </FieldLabel>
          <FieldContent>
            <Input
              id="opportunity-estimatedCloseDate"
              type="date"
              {...form.register("estimatedCloseDate")}
            />
            <FieldError>{form.formState.errors.estimatedCloseDate?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-stage">
            {tCrmClient("crm.opportunities.fields.stage")}
          </FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("stage"))}
              onValueChange={(value) =>
                form.setValue("stage", Number(value), { shouldDirty: true, shouldValidate: true })
              }
            >
              <SelectTrigger id="opportunity-stage">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {opportunityStageOptions.map((o) => (
                  <SelectItem key={`opportunity-stage-${o.value}`} value={String(o.value)}>
                    {tCrmClient(`crm.opportunities.stage.${o.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{form.formState.errors.stage?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-status">
            {tCrmClient("crm.opportunities.fields.status")}
          </FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("status"))}
              onValueChange={(value) =>
                form.setValue("status", Number(value), { shouldDirty: true, shouldValidate: true })
              }
            >
              <SelectTrigger id="opportunity-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {opportunityStatusOptions.map((o) => (
                  <SelectItem key={`opportunity-status-${o.value}`} value={String(o.value)}>
                    {tCrmClient(`crm.opportunities.status.${o.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{form.formState.errors.status?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-priority">
            {tCrmClient("crm.opportunities.fields.priority")}
          </FieldLabel>
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
              <SelectTrigger id="opportunity-priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((o) => (
                  <SelectItem key={`opportunity-priority-${o.value}`} value={String(o.value)}>
                    {tCrmClient(`crm.common.priority.${o.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{form.formState.errors.priority?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-leadId">
            {tCrmClient("crm.opportunities.fields.leadId")}
          </FieldLabel>
          <FieldContent>
            <Input id="opportunity-leadId" {...form.register("leadId")} />
            <FieldError>{form.formState.errors.leadId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-customerId">
            {tCrmClient("crm.opportunities.fields.customerId")}
          </FieldLabel>
          <FieldContent>
            <Input id="opportunity-customerId" {...form.register("customerId")} />
            <FieldError>{form.formState.errors.customerId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-ownerUserId">
            {tCrmClient("crm.opportunities.fields.ownerUserId")}
          </FieldLabel>
          <FieldContent>
            <Input id="opportunity-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="opportunity-description">
            {tCrmClient("crm.opportunities.fields.description")}
          </FieldLabel>
          <FieldContent>
            <Textarea id="opportunity-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-notes">
            {tCrmClient("crm.opportunities.fields.notes")}
          </FieldLabel>
          <FieldContent>
            <Textarea id="opportunity-notes" rows={4} {...form.register("notes")} />
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
              ? tCrmClient("crm.opportunities.actions.create")
              : tCrmClient("crm.opportunities.actions.save")}
        </Button>
      </div>
    </form>
  );
}
