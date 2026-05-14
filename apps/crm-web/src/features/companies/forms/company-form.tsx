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
import { companyTypeOptions } from "@/features/shared/forms/options";

import { createCompanyAction, updateCompanyAction } from "../actions/company-mutation-actions";
import { companyFormSchema, type CompanyFormInput } from "./company-form-schema";

type CompanyFormProps = {
  mode: "create" | "edit";
  companyId?: string;
  initialValues?: Partial<CompanyFormInput>;
};

const defaults: CompanyFormInput = {
  name: "",
  taxNumber: "",
  taxOffice: "",
  website: "",
  email: "",
  phone: "",
  sector: "",
  employeeCountRange: "",
  annualRevenue: undefined,
  description: "",
  notes: "",
  companyType: 0,
  ownerUserId: "",
  parentCompanyId: "",
  rowVersion: "",
};

export function CompanyForm({ mode, companyId, initialValues }: Readonly<CompanyFormProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(initialCrmMutationState);
  const form = useForm<CompanyFormInput>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: { ...defaults, ...initialValues },
  });

  const onSubmit = (values: CompanyFormInput) => {
    setResult(initialCrmMutationState);
    startTransition(async () => {
      const response =
        mode === "create"
          ? await createCompanyAction(values)
          : await updateCompanyAction(companyId ?? "", values);
      setResult(response);
      if (response.fieldErrors) {
        for (const [field, errors] of Object.entries(response.fieldErrors)) {
          const first = errors[0];
          if (first) form.setError(field as keyof CompanyFormInput, { message: first });
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
          <FieldLabel htmlFor="company-name">Name</FieldLabel>
          <FieldContent>
            <Input id="company-name" {...form.register("name")} />
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-type">Company type</FieldLabel>
          <FieldContent>
            <NativeSelect id="company-type" {...form.register("companyType")}>
              {companyTypeOptions.map((o) => (
                <NativeSelectOption key={`company-type-${o.value}`} value={String(o.value)}>
                  {o.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.companyType?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-email">Email</FieldLabel>
          <FieldContent>
            <Input id="company-email" type="email" {...form.register("email")} />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-phone">Phone</FieldLabel>
          <FieldContent>
            <Input id="company-phone" {...form.register("phone")} />
            <FieldError>{form.formState.errors.phone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-website">Website</FieldLabel>
          <FieldContent>
            <Input id="company-website" type="url" {...form.register("website")} />
            <FieldError>{form.formState.errors.website?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-sector">Sector</FieldLabel>
          <FieldContent>
            <Input id="company-sector" {...form.register("sector")} />
            <FieldError>{form.formState.errors.sector?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-taxNumber">Tax number</FieldLabel>
          <FieldContent>
            <Input id="company-taxNumber" {...form.register("taxNumber")} />
            <FieldError>{form.formState.errors.taxNumber?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-taxOffice">Tax office</FieldLabel>
          <FieldContent>
            <Input id="company-taxOffice" {...form.register("taxOffice")} />
            <FieldError>{form.formState.errors.taxOffice?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-employeeCountRange">Employee count range</FieldLabel>
          <FieldContent>
            <Input id="company-employeeCountRange" {...form.register("employeeCountRange")} />
            <FieldError>{form.formState.errors.employeeCountRange?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-annualRevenue">Annual revenue</FieldLabel>
          <FieldContent>
            <Input
              id="company-annualRevenue"
              type="number"
              step="0.01"
              {...form.register("annualRevenue", { valueAsNumber: true })}
            />
            <FieldError>{form.formState.errors.annualRevenue?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-ownerUserId">Owner user ID</FieldLabel>
          <FieldContent>
            <Input id="company-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-parentCompanyId">Parent company ID</FieldLabel>
          <FieldContent>
            <Input id="company-parentCompanyId" {...form.register("parentCompanyId")} />
            <FieldError>{form.formState.errors.parentCompanyId?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="company-description">Description</FieldLabel>
          <FieldContent>
            <Textarea id="company-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="company-notes">Notes</FieldLabel>
          <FieldContent>
            <Textarea id="company-notes" rows={4} {...form.register("notes")} />
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
          {isPending ? "Saving..." : mode === "create" ? "Create company" : "Save company"}
        </Button>
      </div>
    </form>
  );
}
