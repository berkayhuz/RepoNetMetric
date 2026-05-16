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
import { useFieldArray, useForm } from "react-hook-form";

import { CrmFormErrorSummary } from "@/components/forms/crm-form-error-summary";
import { CrmMutationResult } from "@/components/forms/crm-mutation-result";
import { initialCrmMutationState } from "@/features/shared/actions/mutation-state";
import { tCrmClient } from "@/lib/i18n/crm-i18n";

import { createQuoteAction, updateQuoteAction } from "../actions/quote-mutation-actions";
import { quoteFormSchema, type QuoteFormInput } from "./quote-form-schema";

type QuoteFormProps = {
  mode: "create" | "edit";
  quoteId?: string;
  initialValues?: Partial<QuoteFormInput>;
};

const defaultLine: QuoteFormInput["items"][number] = {
  productId: "",
  description: "",
  quantity: 1,
  unitPrice: "0",
  discountRate: 0,
  taxRate: 0,
};

const defaults: QuoteFormInput = {
  quoteNumber: "",
  proposalTitle: "",
  proposalSummary: "",
  proposalBody: "",
  quoteDate: "",
  validUntil: "",
  opportunityId: "",
  customerId: "",
  ownerUserId: "",
  currencyCode: "TRY",
  exchangeRate: "1",
  termsAndConditions: "",
  proposalTemplateId: "",
  items: [defaultLine],
  rowVersion: "",
};

export function QuoteForm({ mode, quoteId, initialValues }: Readonly<QuoteFormProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(initialCrmMutationState);
  const form = useForm<QuoteFormInput>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      ...defaults,
      ...initialValues,
      items: initialValues?.items?.length ? initialValues.items : defaults.items,
    },
  });

  const lineItems = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (values: QuoteFormInput) => {
    setResult(initialCrmMutationState);
    startTransition(async () => {
      const response =
        mode === "create"
          ? await createQuoteAction(values)
          : await updateQuoteAction(quoteId ?? "", values);

      setResult(response);
      if (response.fieldErrors) {
        for (const [field, errors] of Object.entries(response.fieldErrors)) {
          const first = errors[0];
          if (first) form.setError(field as keyof QuoteFormInput, { message: first });
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
          <FieldLabel htmlFor="quote-number">
            {tCrmClient("crm.quotes.fields.quoteNumber")}
          </FieldLabel>
          <FieldContent>
            <Input id="quote-number" {...form.register("quoteNumber")} />
            <FieldError>{form.formState.errors.quoteNumber?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-title">
            {tCrmClient("crm.quotes.fields.proposalTitle")}
          </FieldLabel>
          <FieldContent>
            <Input id="quote-title" {...form.register("proposalTitle")} />
            <FieldError>{form.formState.errors.proposalTitle?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-date">{tCrmClient("crm.quotes.fields.quoteDate")}</FieldLabel>
          <FieldContent>
            <Input id="quote-date" type="date" {...form.register("quoteDate")} />
            <FieldError>{form.formState.errors.quoteDate?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-validUntil">
            {tCrmClient("crm.quotes.fields.validUntil")}
          </FieldLabel>
          <FieldContent>
            <Input id="quote-validUntil" type="date" {...form.register("validUntil")} />
            <FieldError>{form.formState.errors.validUntil?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-currency">
            {tCrmClient("crm.quotes.fields.currencyCode")}
          </FieldLabel>
          <FieldContent>
            <Input id="quote-currency" maxLength={3} {...form.register("currencyCode")} />
            <FieldError>{form.formState.errors.currencyCode?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-exchangeRate">
            {tCrmClient("crm.quotes.fields.exchangeRate")}
          </FieldLabel>
          <FieldContent>
            <Input id="quote-exchangeRate" inputMode="decimal" {...form.register("exchangeRate")} />
            <FieldError>{form.formState.errors.exchangeRate?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-opportunityId">
            {tCrmClient("crm.quotes.fields.opportunityId")}
          </FieldLabel>
          <FieldContent>
            <Input id="quote-opportunityId" {...form.register("opportunityId")} />
            <FieldError>{form.formState.errors.opportunityId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-customerId">
            {tCrmClient("crm.quotes.fields.customerId")}
          </FieldLabel>
          <FieldContent>
            <Input id="quote-customerId" {...form.register("customerId")} />
            <FieldError>{form.formState.errors.customerId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-ownerUserId">
            {tCrmClient("crm.quotes.fields.ownerUserId")}
          </FieldLabel>
          <FieldContent>
            <Input id="quote-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-proposalTemplateId">
            {tCrmClient("crm.quotes.fields.proposalTemplateId")}
          </FieldLabel>
          <FieldContent>
            <Input id="quote-proposalTemplateId" {...form.register("proposalTemplateId")} />
            <FieldError>{form.formState.errors.proposalTemplateId?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="quote-summary">
            {tCrmClient("crm.quotes.fields.proposalSummary")}
          </FieldLabel>
          <FieldContent>
            <Textarea id="quote-summary" rows={3} {...form.register("proposalSummary")} />
            <FieldError>{form.formState.errors.proposalSummary?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-body">
            {tCrmClient("crm.quotes.fields.proposalBody")}
          </FieldLabel>
          <FieldContent>
            <Textarea id="quote-body" rows={5} {...form.register("proposalBody")} />
            <FieldError>{form.formState.errors.proposalBody?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="quote-terms">
            {tCrmClient("crm.quotes.fields.termsAndConditions")}
          </FieldLabel>
          <FieldContent>
            <Textarea id="quote-terms" rows={4} {...form.register("termsAndConditions")} />
            <FieldError>{form.formState.errors.termsAndConditions?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">{tCrmClient("crm.quotes.lineItems.title")}</h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => lineItems.append({ ...defaultLine })}
          >
            {tCrmClient("crm.quotes.lineItems.addLine")}
          </Button>
        </div>

        {lineItems.fields.map((line, index) => (
          <div key={line.id} className="grid gap-3 rounded-md border p-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor={`quote-item-${index}-productId`}>
                {tCrmClient("crm.quotes.fields.productId")}
              </FieldLabel>
              <FieldContent>
                <Input
                  id={`quote-item-${index}-productId`}
                  {...form.register(`items.${index}.productId`)}
                />
                <FieldError>{form.formState.errors.items?.[index]?.productId?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor={`quote-item-${index}-quantity`}>
                {tCrmClient("crm.quotes.fields.quantity")}
              </FieldLabel>
              <FieldContent>
                <Input
                  id={`quote-item-${index}-quantity`}
                  type="number"
                  min={1}
                  {...form.register(`items.${index}.quantity`)}
                />
                <FieldError>{form.formState.errors.items?.[index]?.quantity?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor={`quote-item-${index}-unitPrice`}>
                {tCrmClient("crm.quotes.fields.unitPrice")}
              </FieldLabel>
              <FieldContent>
                <Input
                  id={`quote-item-${index}-unitPrice`}
                  inputMode="decimal"
                  {...form.register(`items.${index}.unitPrice`)}
                />
                <FieldError>{form.formState.errors.items?.[index]?.unitPrice?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor={`quote-item-${index}-discountRate`}>
                {tCrmClient("crm.quotes.fields.discountRate")}
              </FieldLabel>
              <FieldContent>
                <Input
                  id={`quote-item-${index}-discountRate`}
                  type="number"
                  min={0}
                  max={100}
                  step="0.01"
                  {...form.register(`items.${index}.discountRate`)}
                />
                <FieldError>
                  {form.formState.errors.items?.[index]?.discountRate?.message}
                </FieldError>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor={`quote-item-${index}-taxRate`}>
                {tCrmClient("crm.quotes.fields.taxRate")}
              </FieldLabel>
              <FieldContent>
                <Input
                  id={`quote-item-${index}-taxRate`}
                  type="number"
                  min={0}
                  max={100}
                  step="0.01"
                  {...form.register(`items.${index}.taxRate`)}
                />
                <FieldError>{form.formState.errors.items?.[index]?.taxRate?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor={`quote-item-${index}-description`}>
                {tCrmClient("crm.quotes.fields.description")}
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id={`quote-item-${index}-description`}
                  rows={2}
                  {...form.register(`items.${index}.description`)}
                />
                <FieldError>
                  {form.formState.errors.items?.[index]?.description?.message}
                </FieldError>
              </FieldContent>
            </Field>
            <div className="sm:col-span-2 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                disabled={lineItems.fields.length <= 1}
                onClick={() => lineItems.remove(index)}
              >
                {tCrmClient("crm.quotes.lineItems.removeLine")}
              </Button>
            </div>
          </div>
        ))}
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
              ? tCrmClient("crm.quotes.actions.create")
              : tCrmClient("crm.quotes.actions.save")}
        </Button>
      </div>
    </form>
  );
}
