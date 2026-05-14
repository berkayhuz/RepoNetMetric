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
import { customerTypeOptions, genderOptions } from "@/features/shared/forms/options";

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

  return (
    <form className="space-y-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <CrmFormErrorSummary
        {...(result.status === "error" && result.message ? { message: result.message } : {})}
        {...(result.fieldErrors ? { errors: result.fieldErrors } : {})}
      />
      <CrmMutationResult state={result} />

      <FieldSet className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="customer-firstName">First name</FieldLabel>
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
          <FieldLabel htmlFor="customer-lastName">Last name</FieldLabel>
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
          <FieldLabel htmlFor="customer-email">Email</FieldLabel>
          <FieldContent>
            <Input id="customer-email" type="email" {...form.register("email")} />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-mobilePhone">Mobile phone</FieldLabel>
          <FieldContent>
            <Input id="customer-mobilePhone" {...form.register("mobilePhone")} />
            <FieldError>{form.formState.errors.mobilePhone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-workPhone">Work phone</FieldLabel>
          <FieldContent>
            <Input id="customer-workPhone" {...form.register("workPhone")} />
            <FieldError>{form.formState.errors.workPhone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-personalPhone">Personal phone</FieldLabel>
          <FieldContent>
            <Input id="customer-personalPhone" {...form.register("personalPhone")} />
            <FieldError>{form.formState.errors.personalPhone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-birthDate">Birth date</FieldLabel>
          <FieldContent>
            <Input id="customer-birthDate" type="date" {...form.register("birthDate")} />
            <FieldError>{form.formState.errors.birthDate?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="customer-gender">Gender</FieldLabel>
          <FieldContent>
            <NativeSelect id="customer-gender" {...form.register("gender")}>
              {genderOptions.map((option) => (
                <NativeSelectOption key={`gender-${option.value}`} value={String(option.value)}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="customer-customerType">Customer type</FieldLabel>
          <FieldContent>
            <NativeSelect id="customer-customerType" {...form.register("customerType")}>
              {customerTypeOptions.map((option) => (
                <NativeSelectOption key={`type-${option.value}`} value={String(option.value)}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="customer-vip">VIP</FieldLabel>
          <FieldContent>
            <NativeSelect id="customer-vip" {...form.register("isVip")}>
              <NativeSelectOption value="false">No</NativeSelectOption>
              <NativeSelectOption value="true">Yes</NativeSelectOption>
            </NativeSelect>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-companyId">Company ID</FieldLabel>
          <FieldContent>
            <Input id="customer-companyId" {...form.register("companyId")} />
            <FieldError>{form.formState.errors.companyId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-ownerUserId">Owner user ID</FieldLabel>
          <FieldContent>
            <Input id="customer-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-title">Title</FieldLabel>
          <FieldContent>
            <Input id="customer-title" {...form.register("title")} />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-identityNumber">Identity number</FieldLabel>
          <FieldContent>
            <Input id="customer-identityNumber" {...form.register("identityNumber")} />
            <FieldError>{form.formState.errors.identityNumber?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-department">Department</FieldLabel>
          <FieldContent>
            <Input id="customer-department" {...form.register("department")} />
            <FieldError>{form.formState.errors.department?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-jobTitle">Job title</FieldLabel>
          <FieldContent>
            <Input id="customer-jobTitle" {...form.register("jobTitle")} />
            <FieldError>{form.formState.errors.jobTitle?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="customer-description">Description</FieldLabel>
          <FieldContent>
            <Textarea id="customer-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="customer-notes">Notes</FieldLabel>
          <FieldContent>
            <Textarea id="customer-notes" rows={4} {...form.register("notes")} />
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
          {isPending ? "Saving..." : mode === "create" ? "Create customer" : "Save customer"}
        </Button>
      </div>
    </form>
  );
}
