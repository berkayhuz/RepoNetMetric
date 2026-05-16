"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { isGuid } from "@/features/shared/data/guid";
import { emptyToNull } from "@/features/shared/forms/schema-primitives";
import { crmApiClient, type LeadUpdateRequest, type LeadUpsertRequest } from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import { leadFormSchema, type LeadFormInput, type LeadFormValues } from "../forms/lead-form-schema";

function mapLeadPayload(input: LeadFormValues): LeadUpsertRequest {
  const estimatedBudget = input.estimatedBudget ? Number(input.estimatedBudget) : null;

  return {
    fullName: input.fullName.trim(),
    companyName: emptyToNull(input.companyName),
    email: emptyToNull(input.email),
    phone: emptyToNull(input.phone),
    jobTitle: emptyToNull(input.jobTitle),
    description: emptyToNull(input.description),
    estimatedBudget:
      estimatedBudget === null || Number.isNaN(estimatedBudget) ? null : estimatedBudget,
    nextContactDate: emptyToNull(input.nextContactDate),
    source: input.source,
    status: input.status,
    priority: input.priority,
    companyId: emptyToNull(input.companyId),
    ownerUserId: emptyToNull(input.ownerUserId),
    notes: emptyToNull(input.notes),
  };
}

function mapLeadUpdatePayload(input: LeadFormValues): LeadUpdateRequest {
  return {
    ...mapLeadPayload(input),
    rowVersion: emptyToNull(input.rowVersion),
  };
}

function mapZodErrors(
  fieldErrors: Record<string, string[] | undefined>,
  locale: string,
): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(fieldErrors).flatMap(([key, errors]) => {
      if (!errors || errors.length === 0) {
        return [];
      }

      return [[key, [tCrm("crm.leads.validation.invalid", locale)]] as const];
    }),
  );
}

export async function createLeadAction(input: LeadFormInput): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  const locale = await getRequestLocale();

  const parsed = leadFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: tCrm("crm.forms.errors.reviewTitle", locale),
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors, locale),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    const created = await crmApiClient.createLead(mapLeadPayload(parsed.data), options);

    revalidatePath("/leads");
    revalidatePath(`/leads/${created.id}`);

    return {
      status: "success",
      message: tCrm("crm.leads.result.created", locale),
      redirectTo: `/leads/${created.id}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, "/leads/new");
  }
}

export async function updateLeadAction(
  leadId: string,
  input: LeadFormInput,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  const locale = await getRequestLocale();

  if (!isGuid(leadId)) {
    return {
      status: "error",
      message: tCrm("crm.leads.validation.invalidId", locale),
    };
  }

  const parsed = leadFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: tCrm("crm.forms.errors.reviewTitle", locale),
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors, locale),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.updateLead(leadId, mapLeadUpdatePayload(parsed.data), options);

    revalidatePath("/leads");
    revalidatePath(`/leads/${leadId}`);
    revalidatePath(`/leads/${leadId}/edit`);

    return {
      status: "success",
      message: tCrm("crm.leads.result.updated", locale),
      redirectTo: `/leads/${leadId}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/leads/${leadId}/edit`);
  }
}

export async function deleteLeadAction(
  leadId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  await requireCrmSession(`/leads/${leadId}`);
  const locale = await getRequestLocale();

  if (!isGuid(leadId)) {
    return { status: "error", message: tCrm("crm.leads.validation.invalidId", locale) };
  }

  if (formData.get("confirm") !== "delete-lead") {
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
    await crmApiClient.deleteLead(leadId, options);

    revalidatePath("/leads");
    redirect("/leads");
  } catch (error) {
    const mapped = mapCrmMutationErrorToState(error, `/leads/${leadId}`);
    if (mapped.message === "The requested record no longer exists.") {
      return {
        status: "error",
        message: tCrm("crm.leads.result.alreadyRemoved", locale),
      };
    }

    return mapped;
  }
}
