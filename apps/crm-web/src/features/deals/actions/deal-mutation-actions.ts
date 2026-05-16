"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { isGuid } from "@/features/shared/data/guid";
import { emptyToNull } from "@/features/shared/forms/schema-primitives";
import { crmApiClient, type DealUpsertRequest } from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import { dealFormSchema, type DealFormInput, type DealFormValues } from "../forms/deal-form-schema";

function mapZodErrors(
  fieldErrors: Record<string, string[] | undefined>,
  locale: string,
): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(fieldErrors).flatMap(([key, errors]) => {
      if (!errors || errors.length === 0) {
        return [];
      }

      return [[key, [tCrm("crm.deals.validation.invalid", locale)]] as const];
    }),
  );
}

function mapDealPayload(input: DealFormValues): DealUpsertRequest {
  return {
    dealCode: input.dealCode.trim(),
    name: input.name.trim(),
    totalAmount: Number(input.totalAmount),
    closedDate: input.closedDate,
    opportunityId: emptyToNull(input.opportunityId),
    companyId: emptyToNull(input.companyId),
    ownerUserId: emptyToNull(input.ownerUserId),
    notes: emptyToNull(input.notes),
  };
}

function mapDealUpdatePayload(input: DealFormValues): DealUpsertRequest {
  return {
    ...mapDealPayload(input),
    rowVersion: emptyToNull(input.rowVersion),
  };
}

export async function createDealAction(input: DealFormInput): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  const locale = await getRequestLocale();

  const parsed = dealFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: tCrm("crm.forms.errors.reviewTitle", locale),
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors, locale),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    const created = await crmApiClient.createDeal(mapDealPayload(parsed.data), options);

    revalidatePath("/deals");
    revalidatePath(`/deals/${created.id}`);

    return {
      status: "success",
      message: tCrm("crm.deals.result.created", locale),
      redirectTo: `/deals/${created.id}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, "/deals/new");
  }
}

export async function updateDealAction(
  dealId: string,
  input: DealFormInput,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  const locale = await getRequestLocale();

  if (!isGuid(dealId)) {
    return {
      status: "error",
      message: tCrm("crm.deals.validation.invalidId", locale),
    };
  }

  const parsed = dealFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: tCrm("crm.forms.errors.reviewTitle", locale),
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors, locale),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.updateDeal(dealId, mapDealUpdatePayload(parsed.data), options);

    revalidatePath("/deals");
    revalidatePath(`/deals/${dealId}`);
    revalidatePath(`/deals/${dealId}/edit`);

    return {
      status: "success",
      message: tCrm("crm.deals.result.updated", locale),
      redirectTo: `/deals/${dealId}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/deals/${dealId}/edit`);
  }
}

export async function deleteDealAction(
  dealId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  await requireCrmSession(`/deals/${dealId}`);
  const locale = await getRequestLocale();

  if (!isGuid(dealId)) {
    return { status: "error", message: tCrm("crm.deals.validation.invalidId", locale) };
  }

  if (formData.get("confirm") !== "delete-deal") {
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
    await crmApiClient.deleteDeal(dealId, options);

    revalidatePath("/deals");
    redirect("/deals");
  } catch (error) {
    const mapped = mapCrmMutationErrorToState(error, `/deals/${dealId}`);
    if (mapped.message === "The requested record no longer exists.") {
      return {
        status: "error",
        message: tCrm("crm.deals.result.alreadyRemoved", locale),
      };
    }

    return mapped;
  }
}
