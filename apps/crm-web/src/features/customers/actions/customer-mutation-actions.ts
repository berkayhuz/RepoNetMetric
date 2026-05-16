"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { isGuid } from "@/features/shared/data/guid";
import { emptyToNull } from "@/features/shared/forms/schema-primitives";
import { crmApiClient, type CustomerUpsertRequest } from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import {
  customerFormSchema,
  type CustomerFormInput,
  type CustomerFormValues,
} from "../forms/customer-form-schema";

function mapCustomerPayload(input: CustomerFormValues): CustomerUpsertRequest {
  return {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    title: emptyToNull(input.title),
    email: emptyToNull(input.email),
    mobilePhone: emptyToNull(input.mobilePhone),
    workPhone: emptyToNull(input.workPhone),
    personalPhone: emptyToNull(input.personalPhone),
    birthDate: emptyToNull(input.birthDate),
    gender: input.gender,
    department: emptyToNull(input.department),
    jobTitle: emptyToNull(input.jobTitle),
    description: emptyToNull(input.description),
    notes: emptyToNull(input.notes),
    ownerUserId: emptyToNull(input.ownerUserId),
    customerType: input.customerType,
    identityNumber: emptyToNull(input.identityNumber),
    isVip: input.isVip,
    companyId: emptyToNull(input.companyId),
    rowVersion: emptyToNull(input.rowVersion),
  };
}

function localizeFieldErrors(
  fieldErrors: Record<string, string[] | undefined>,
  locale: string,
): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(fieldErrors).flatMap(([key, errors]) => {
      if (!errors || errors.length === 0) {
        return [];
      }

      const first = errors[0] ?? "";
      const isRequired =
        first.toLowerCase().includes("required") || first.toLowerCase().includes("small");
      const resolved = isRequired
        ? tCrm("crm.customers.validation.required", locale)
        : tCrm("crm.customers.validation.invalid", locale);
      return [[key, [resolved]] as const];
    }),
  );
}

export async function createCustomerAction(input: CustomerFormInput): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  const locale = await getRequestLocale();

  const parsed = customerFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: tCrm("crm.forms.errors.reviewTitle", locale),
      fieldErrors: localizeFieldErrors(parsed.error.flatten().fieldErrors, locale),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    const created = await crmApiClient.createCustomer(mapCustomerPayload(parsed.data), options);

    revalidatePath("/customers");
    revalidatePath(`/customers/${created.id}`);

    return {
      status: "success",
      message: tCrm("crm.customers.result.created", locale),
      redirectTo: `/customers/${created.id}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, "/customers/new");
  }
}

export async function updateCustomerAction(
  customerId: string,
  input: CustomerFormInput,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  const locale = await getRequestLocale();

  if (!isGuid(customerId)) {
    return {
      status: "error",
      message: tCrm("crm.customers.validation.invalidId", locale),
    };
  }

  const parsed = customerFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: tCrm("crm.forms.errors.reviewTitle", locale),
      fieldErrors: localizeFieldErrors(parsed.error.flatten().fieldErrors, locale),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.updateCustomer(customerId, mapCustomerPayload(parsed.data), options);

    revalidatePath("/customers");
    revalidatePath(`/customers/${customerId}`);
    revalidatePath(`/customers/${customerId}/edit`);

    return {
      status: "success",
      message: tCrm("crm.customers.result.updated", locale),
      redirectTo: `/customers/${customerId}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/customers/${customerId}/edit`);
  }
}

export async function deleteCustomerAction(
  customerId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  await requireCrmSession(`/customers/${customerId}`);
  const locale = await getRequestLocale();

  if (!isGuid(customerId)) {
    return { status: "error", message: tCrm("crm.customers.validation.invalidId", locale) };
  }

  if (formData.get("confirm") !== "delete-customer") {
    return { status: "error", message: tCrm("crm.delete.invalidConfirmation", locale) };
  }

  const confirmText = formData.get("confirmText");
  if (typeof confirmText !== "string" || confirmText.trim().length === 0) {
    return {
      status: "error",
      message: tCrm("crm.delete.typeNameRequired", locale),
      fieldErrors: { confirmText: [tCrm("crm.delete.confirmationRequired", locale)] },
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.deleteCustomer(customerId, options);

    revalidatePath("/customers");
    redirect("/customers");
  } catch (error) {
    const mapped = mapCrmMutationErrorToState(error, `/customers/${customerId}`);
    if (mapped.message === "The requested record no longer exists.") {
      return {
        status: "error",
        message: tCrm("crm.customers.result.alreadyRemoved", locale),
      };
    }

    return mapped;
  }
}
