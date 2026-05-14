"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { isGuid } from "@/features/shared/data/guid";
import { emptyToNull } from "@/features/shared/forms/schema-primitives";
import { crmApiClient, type ContactUpsertRequest } from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import {
  contactFormSchema,
  type ContactFormInput,
  type ContactFormValues,
} from "../forms/contact-form-schema";

function mapContactPayload(input: ContactFormValues): ContactUpsertRequest {
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
    companyId: emptyToNull(input.companyId),
    customerId: emptyToNull(input.customerId),
    isPrimaryContact: input.isPrimaryContact,
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

export async function createContactAction(input: ContactFormInput): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  const parsed = contactFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    const created = await crmApiClient.createContact(mapContactPayload(parsed.data), options);

    revalidatePath("/contacts");
    revalidatePath(`/contacts/${created.id}`);

    return {
      status: "success",
      message: "Contact created successfully.",
      redirectTo: `/contacts/${created.id}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, "/contacts/new");
  }
}

export async function updateContactAction(
  contactId: string,
  input: ContactFormInput,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  if (!isGuid(contactId)) {
    return {
      status: "error",
      message: "Invalid contact id.",
    };
  }

  const parsed = contactFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.updateContact(contactId, mapContactPayload(parsed.data), options);

    revalidatePath("/contacts");
    revalidatePath(`/contacts/${contactId}`);
    revalidatePath(`/contacts/${contactId}/edit`);

    return {
      status: "success",
      message: "Contact updated successfully.",
      redirectTo: `/contacts/${contactId}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/contacts/${contactId}/edit`);
  }
}

export async function deleteContactAction(
  contactId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  await requireCrmSession(`/contacts/${contactId}`);

  if (!isGuid(contactId)) {
    return { status: "error", message: "Invalid contact id." };
  }

  if (formData.get("confirm") !== "delete-contact") {
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
    await crmApiClient.deleteContact(contactId, options);

    revalidatePath("/contacts");
    redirect("/contacts");
  } catch (error) {
    const mapped = mapCrmMutationErrorToState(error, `/contacts/${contactId}`);
    if (mapped.message === "The requested record no longer exists.") {
      return {
        status: "error",
        message: "Contact is already removed or no longer available.",
      };
    }

    return mapped;
  }
}
