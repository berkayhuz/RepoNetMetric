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
  opportunityStageOptions,
  opportunityStatusOptions,
  priorityOptions,
} from "@/features/shared/forms/options";

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
          <FieldLabel htmlFor="opportunity-code">Opportunity code</FieldLabel>
          <FieldContent>
            <Input id="opportunity-code" {...form.register("opportunityCode")} />
            <FieldError>{form.formState.errors.opportunityCode?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-name">Name</FieldLabel>
          <FieldContent>
            <Input id="opportunity-name" {...form.register("name")} />
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-estimatedAmount">Estimated amount</FieldLabel>
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
          <FieldLabel htmlFor="opportunity-expectedRevenue">Expected revenue</FieldLabel>
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
          <FieldLabel htmlFor="opportunity-probability">Probability (%)</FieldLabel>
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
          <FieldLabel htmlFor="opportunity-estimatedCloseDate">Estimated close date</FieldLabel>
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
          <FieldLabel htmlFor="opportunity-stage">Stage</FieldLabel>
          <FieldContent>
            <NativeSelect id="opportunity-stage" {...form.register("stage")}>
              {opportunityStageOptions.map((o) => (
                <NativeSelectOption key={`opportunity-stage-${o.value}`} value={String(o.value)}>
                  {o.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.stage?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-status">Status</FieldLabel>
          <FieldContent>
            <NativeSelect id="opportunity-status" {...form.register("status")}>
              {opportunityStatusOptions.map((o) => (
                <NativeSelectOption key={`opportunity-status-${o.value}`} value={String(o.value)}>
                  {o.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.status?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-priority">Priority</FieldLabel>
          <FieldContent>
            <NativeSelect id="opportunity-priority" {...form.register("priority")}>
              {priorityOptions.map((o) => (
                <NativeSelectOption key={`opportunity-priority-${o.value}`} value={String(o.value)}>
                  {o.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.priority?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-leadId">Lead ID</FieldLabel>
          <FieldContent>
            <Input id="opportunity-leadId" {...form.register("leadId")} />
            <FieldError>{form.formState.errors.leadId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-customerId">Customer ID</FieldLabel>
          <FieldContent>
            <Input id="opportunity-customerId" {...form.register("customerId")} />
            <FieldError>{form.formState.errors.customerId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-ownerUserId">Owner user ID</FieldLabel>
          <FieldContent>
            <Input id="opportunity-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="opportunity-description">Description</FieldLabel>
          <FieldContent>
            <Textarea id="opportunity-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="opportunity-notes">Notes</FieldLabel>
          <FieldContent>
            <Textarea id="opportunity-notes" rows={4} {...form.register("notes")} />
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
          {isPending ? "Saving..." : mode === "create" ? "Create opportunity" : "Save opportunity"}
        </Button>
      </div>
    </form>
  );
}
