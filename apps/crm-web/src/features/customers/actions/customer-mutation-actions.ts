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

function mapZodErrors(fieldErrors: Record<string, string[] | undefined>): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(fieldErrors).flatMap(([key, errors]) => {
      if (!errors || errors.length === 0) {
        return [];
      }

      return [[key, errors] as const];
    }),
  );
}

export async function createCustomerAction(input: CustomerFormInput): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  const parsed = customerFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    const created = await crmApiClient.createCustomer(mapCustomerPayload(parsed.data), options);

    revalidatePath("/customers");
    revalidatePath(`/customers/${created.id}`);

    return {
      status: "success",
      message: "Customer created successfully.",
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

  if (!isGuid(customerId)) {
    return {
      status: "error",
      message: "Invalid customer id.",
    };
  }

  const parsed = customerFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
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
      message: "Customer updated successfully.",
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

  if (!isGuid(customerId)) {
    return { status: "error", message: "Invalid customer id." };
  }

  if (formData.get("confirm") !== "delete-customer") {
    return { status: "error", message: "Delete confirmation is invalid." };
  }

  const confirmText = formData.get("confirmText");
  if (typeof confirmText !== "string" || confirmText.trim().length === 0) {
    return {
      status: "error",
      message: "Please type the record name to confirm deletion.",
      fieldErrors: { confirmText: ["Confirmation text is required."] },
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
        message: "Customer is already removed or no longer available.",
      };
    }

    return mapped;
  }
}
