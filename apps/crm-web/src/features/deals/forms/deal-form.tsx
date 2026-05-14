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
import { useForm } from "react-hook-form";

import { CrmFormErrorSummary } from "@/components/forms/crm-form-error-summary";
import { CrmMutationResult } from "@/components/forms/crm-mutation-result";
import { initialCrmMutationState } from "@/features/shared/actions/mutation-state";

import { createDealAction, updateDealAction } from "../actions/deal-mutation-actions";
import { dealFormSchema, type DealFormInput } from "./deal-form-schema";

type DealFormProps = {
  mode: "create" | "edit";
  dealId?: string;
  initialValues?: Partial<DealFormInput>;
};

const defaults: DealFormInput = {
  dealCode: "",
  name: "",
  totalAmount: "",
  closedDate: "",
  opportunityId: "",
  companyId: "",
  ownerUserId: "",
  notes: "",
  rowVersion: "",
};

export function DealForm({ mode, dealId, initialValues }: Readonly<DealFormProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(initialCrmMutationState);
  const form = useForm<DealFormInput>({
    resolver: zodResolver(dealFormSchema),
    defaultValues: { ...defaults, ...initialValues },
  });

  const onSubmit = (values: DealFormInput) => {
    setResult(initialCrmMutationState);
    startTransition(async () => {
      const response =
        mode === "create"
          ? await createDealAction(values)
          : await updateDealAction(dealId ?? "", values);
      setResult(response);
      if (response.fieldErrors) {
        for (const [field, errors] of Object.entries(response.fieldErrors)) {
          const first = errors[0];
          if (first) form.setError(field as keyof DealFormInput, { message: first });
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
          <FieldLabel htmlFor="deal-code">Deal code</FieldLabel>
          <FieldContent>
            <Input id="deal-code" {...form.register("dealCode")} />
            <FieldError>{form.formState.errors.dealCode?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="deal-name">Name</FieldLabel>
          <FieldContent>
            <Input id="deal-name" {...form.register("name")} />
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="deal-totalAmount">Total amount</FieldLabel>
          <FieldContent>
            <Input id="deal-totalAmount" inputMode="decimal" {...form.register("totalAmount")} />
            <FieldError>{form.formState.errors.totalAmount?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="deal-closedDate">Closed date</FieldLabel>
          <FieldContent>
            <Input id="deal-closedDate" type="date" {...form.register("closedDate")} />
            <FieldError>{form.formState.errors.closedDate?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="deal-opportunityId">Opportunity ID</FieldLabel>
          <FieldContent>
            <Input id="deal-opportunityId" {...form.register("opportunityId")} />
            <FieldError>{form.formState.errors.opportunityId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="deal-companyId">Company ID</FieldLabel>
          <FieldContent>
            <Input id="deal-companyId" {...form.register("companyId")} />
            <FieldError>{form.formState.errors.companyId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="deal-ownerUserId">Owner user ID</FieldLabel>
          <FieldContent>
            <Input id="deal-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="deal-notes">Notes</FieldLabel>
          <FieldContent>
            <Textarea id="deal-notes" rows={4} {...form.register("notes")} />
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
          {isPending ? "Saving..." : mode === "create" ? "Create deal" : "Save deal"}
        </Button>
      </div>
    </form>
  );
}
