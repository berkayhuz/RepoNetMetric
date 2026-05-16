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
import { customerTypeOptions, genderOptions } from "@/features/shared/forms/options";
import { tCrmClient } from "@/lib/i18n/crm-i18n";

import { createCustomerAction, updateCustomerAction } from "../actions/customer-mutation-actions";
import { customerFormSchema, type CustomerFormInput } from "./customer-form-schema";

type CustomerFormProps = {
  mode: "create" | "edit";
  customerId?: string;
  initialValues?: Partial<CustomerFormInput>;
};

const defaults: CustomerFormInput = {
  firstName: "",
  lastName: "",
  title: "",
  email: "",
  mobilePhone: "",
  workPhone: "",
  personalPhone: "",
  birthDate: "",
  gender: 0,
  department: "",
  jobTitle: "",
  description: "",
  notes: "",
  ownerUserId: "",
  customerType: 0,
  identityNumber: "",
  isVip: false,
  companyId: "",
  rowVersion: "",
};

export function CustomerForm({ mode, customerId, initialValues }: Readonly<CustomerFormProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(initialCrmMutationState);

  const form = useForm<CustomerFormInput>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: { ...defaults, ...initialValues },
  });

  const onSubmit = (values: CustomerFormInput) => {
    setResult(initialCrmMutationState);

    startTransition(async () => {
      const response =
        mode === "create"
          ? await createCustomerAction(values)
          : await updateCustomerAction(customerId ?? "", values);

      setResult(response);

      if (response.fieldErrors) {
        for (const [field, errors] of Object.entries(response.fieldErrors)) {
          const first = errors[0];
          if (first) {
            form.setError(field as keyof CustomerFormInput, { message: first });
          }
        }
      }

      if (response.status === "success" && response.redirectTo) {
        router.push(response.redirectTo);
        router.refresh();
      }
    });
  };

  const firstNameError = form.formState.errors.firstName?.message;
  const lastNameError = form.formState.errors.lastName?.message;
  const genderLabelByValue: Record<number, string> = {
    0: tCrmClient("crm.customers.options.gender.unknown"),
    1: tCrmClient("crm.customers.options.gender.female"),
    2: tCrmClient("crm.customers.options.gender.male"),
    3: tCrmClient("crm.customers.options.gender.other"),
  };
  const customerTypeLabelByValue: Record<number, string> = {
    0: tCrmClient("crm.customers.options.customerType.individual"),
    1: tCrmClient("crm.customers.options.customerType.corporate"),
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
          <FieldLabel htmlFor="customer-firstName">
            {tCrmClient("crm.customers.fields.firstName")}
          </FieldLabel>
          <FieldContent>
            <Input
              id="customer-firstName"
              {...form.register("firstName")}
              aria-invalid={Boolean(firstNameError)}
            />
            <FieldError>{firstNameError}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="customer-lastName">
            {tCrmClient("crm.customers.fields.lastName")}
          </FieldLabel>
          <FieldContent>
            <Input
              id="customer-lastName"
              {...form.register("lastName")}
              aria-invalid={Boolean(lastNameError)}
            />
            <FieldError>{lastNameError}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="customer-email">
            {tCrmClient("crm.customers.fields.email")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-email" type="email" {...form.register("email")} />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-mobilePhone">
            {tCrmClient("crm.customers.fields.mobilePhone")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-mobilePhone" {...form.register("mobilePhone")} />
            <FieldError>{form.formState.errors.mobilePhone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-workPhone">
            {tCrmClient("crm.customers.fields.workPhone")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-workPhone" {...form.register("workPhone")} />
            <FieldError>{form.formState.errors.workPhone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-personalPhone">
            {tCrmClient("crm.customers.fields.personalPhone")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-personalPhone" {...form.register("personalPhone")} />
            <FieldError>{form.formState.errors.personalPhone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-birthDate">
            {tCrmClient("crm.customers.fields.birthDate")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-birthDate" type="date" {...form.register("birthDate")} />
            <FieldError>{form.formState.errors.birthDate?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="customer-gender">
            {tCrmClient("crm.customers.fields.gender")}
          </FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("gender"))}
              onValueChange={(value) =>
                form.setValue("gender", Number(value), { shouldDirty: true, shouldValidate: true })
              }
            >
              <SelectTrigger id="customer-gender">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={`gender-${option.value}`} value={String(option.value)}>
                    {genderLabelByValue[option.value] ?? option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="customer-customerType">
            {tCrmClient("crm.customers.fields.customerType")}
          </FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("customerType"))}
              onValueChange={(value) =>
                form.setValue("customerType", Number(value), {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger id="customer-customerType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {customerTypeOptions.map((option) => (
                  <SelectItem key={`type-${option.value}`} value={String(option.value)}>
                    {customerTypeLabelByValue[option.value] ?? option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="customer-vip">{tCrmClient("crm.customers.fields.vip")}</FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("isVip"))}
              onValueChange={(value) =>
                form.setValue("isVip", value === "true", {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger id="customer-vip">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">{tCrmClient("crm.common.no")}</SelectItem>
                <SelectItem value="true">{tCrmClient("crm.common.yes")}</SelectItem>
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-companyId">
            {tCrmClient("crm.customers.fields.companyId")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-companyId" {...form.register("companyId")} />
            <FieldError>{form.formState.errors.companyId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-ownerUserId">
            {tCrmClient("crm.customers.fields.ownerUserId")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-title">
            {tCrmClient("crm.customers.fields.title")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-title" {...form.register("title")} />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-identityNumber">
            {tCrmClient("crm.customers.fields.identityNumber")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-identityNumber" {...form.register("identityNumber")} />
            <FieldError>{form.formState.errors.identityNumber?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-department">
            {tCrmClient("crm.customers.fields.department")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-department" {...form.register("department")} />
            <FieldError>{form.formState.errors.department?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-jobTitle">
            {tCrmClient("crm.customers.fields.jobTitle")}
          </FieldLabel>
          <FieldContent>
            <Input id="customer-jobTitle" {...form.register("jobTitle")} />
            <FieldError>{form.formState.errors.jobTitle?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="customer-description">
            {tCrmClient("crm.customers.fields.description")}
          </FieldLabel>
          <FieldContent>
            <Textarea id="customer-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-notes">
            {tCrmClient("crm.customers.fields.notes")}
          </FieldLabel>
          <FieldContent>
            <Textarea id="customer-notes" rows={4} {...form.register("notes")} />
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
              ? tCrmClient("crm.customers.actions.create")
              : tCrmClient("crm.customers.actions.save")}
        </Button>
      </div>
    </form>
  );
}
