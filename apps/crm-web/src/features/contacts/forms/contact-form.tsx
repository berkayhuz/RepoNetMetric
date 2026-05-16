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
import { genderOptions } from "@/features/shared/forms/options";
import { tCrmClient } from "@/lib/i18n/crm-i18n";

import { createContactAction, updateContactAction } from "../actions/contact-mutation-actions";
import { contactFormSchema, type ContactFormInput } from "./contact-form-schema";

type ContactFormProps = {
  mode: "create" | "edit";
  contactId?: string;
  initialValues?: Partial<ContactFormInput>;
};

const defaults: ContactFormInput = {
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
  companyId: "",
  customerId: "",
  isPrimaryContact: false,
  rowVersion: "",
};

export function ContactForm({ mode, contactId, initialValues }: Readonly<ContactFormProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(initialCrmMutationState);
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { ...defaults, ...initialValues },
  });

  const onSubmit = (values: ContactFormInput) => {
    setResult(initialCrmMutationState);
    startTransition(async () => {
      const response =
        mode === "create"
          ? await createContactAction(values)
          : await updateContactAction(contactId ?? "", values);
      setResult(response);
      if (response.fieldErrors) {
        for (const [field, errors] of Object.entries(response.fieldErrors)) {
          const first = errors[0];
          if (first) form.setError(field as keyof ContactFormInput, { message: first });
        }
      }
      if (response.status === "success" && response.redirectTo) {
        router.push(response.redirectTo);
        router.refresh();
      }
    });
  };

  const genderLabelByValue: Record<number, string> = {
    0: tCrmClient("crm.contacts.options.gender.unknown"),
    1: tCrmClient("crm.contacts.options.gender.female"),
    2: tCrmClient("crm.contacts.options.gender.male"),
    3: tCrmClient("crm.contacts.options.gender.other"),
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
          <FieldLabel htmlFor="contact-firstName">
            {tCrmClient("crm.contacts.fields.firstName")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-firstName" {...form.register("firstName")} />
            <FieldError>{form.formState.errors.firstName?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-lastName">
            {tCrmClient("crm.contacts.fields.lastName")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-lastName" {...form.register("lastName")} />
            <FieldError>{form.formState.errors.lastName?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-email">{tCrmClient("crm.contacts.fields.email")}</FieldLabel>
          <FieldContent>
            <Input id="contact-email" type="email" {...form.register("email")} />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-mobilePhone">
            {tCrmClient("crm.contacts.fields.mobilePhone")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-mobilePhone" {...form.register("mobilePhone")} />
            <FieldError>{form.formState.errors.mobilePhone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-workPhone">
            {tCrmClient("crm.contacts.fields.workPhone")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-workPhone" {...form.register("workPhone")} />
            <FieldError>{form.formState.errors.workPhone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-personalPhone">
            {tCrmClient("crm.contacts.fields.personalPhone")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-personalPhone" {...form.register("personalPhone")} />
            <FieldError>{form.formState.errors.personalPhone?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-birthDate">
            {tCrmClient("crm.contacts.fields.birthDate")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-birthDate" type="date" {...form.register("birthDate")} />
            <FieldError>{form.formState.errors.birthDate?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-gender">
            {tCrmClient("crm.contacts.fields.gender")}
          </FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("gender"))}
              onValueChange={(value) =>
                form.setValue("gender", Number(value), { shouldDirty: true, shouldValidate: true })
              }
            >
              <SelectTrigger id="contact-gender">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((o) => (
                  <SelectItem key={`contact-gender-${o.value}`} value={String(o.value)}>
                    {genderLabelByValue[o.value] ?? o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{form.formState.errors.gender?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-primary">
            {tCrmClient("crm.contacts.fields.primaryContact")}
          </FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("isPrimaryContact"))}
              onValueChange={(value) =>
                form.setValue("isPrimaryContact", value === "true", {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger id="contact-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">{tCrmClient("crm.common.no")}</SelectItem>
                <SelectItem value="true">{tCrmClient("crm.common.yes")}</SelectItem>
              </SelectContent>
            </Select>
            <FieldError>{form.formState.errors.isPrimaryContact?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-companyId">
            {tCrmClient("crm.contacts.fields.companyId")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-companyId" {...form.register("companyId")} />
            <FieldError>{form.formState.errors.companyId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-customerId">
            {tCrmClient("crm.contacts.fields.customerId")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-customerId" {...form.register("customerId")} />
            <FieldError>{form.formState.errors.customerId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-ownerUserId">
            {tCrmClient("crm.contacts.fields.ownerUserId")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-title">{tCrmClient("crm.contacts.fields.title")}</FieldLabel>
          <FieldContent>
            <Input id="contact-title" {...form.register("title")} />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-department">
            {tCrmClient("crm.contacts.fields.department")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-department" {...form.register("department")} />
            <FieldError>{form.formState.errors.department?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-jobTitle">
            {tCrmClient("crm.contacts.fields.jobTitle")}
          </FieldLabel>
          <FieldContent>
            <Input id="contact-jobTitle" {...form.register("jobTitle")} />
            <FieldError>{form.formState.errors.jobTitle?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="contact-description">
            {tCrmClient("crm.contacts.fields.description")}
          </FieldLabel>
          <FieldContent>
            <Textarea id="contact-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-notes">{tCrmClient("crm.contacts.fields.notes")}</FieldLabel>
          <FieldContent>
            <Textarea id="contact-notes" rows={4} {...form.register("notes")} />
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
              ? tCrmClient("crm.contacts.actions.create")
              : tCrmClient("crm.contacts.actions.save")}
        </Button>
      </div>
    </form>
  );
}
