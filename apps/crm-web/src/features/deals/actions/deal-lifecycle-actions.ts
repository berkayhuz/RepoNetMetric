"use server";

import { revalidatePath } from "next/cache";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { isGuid } from "@/features/shared/data/guid";
import { emptyToNull } from "@/features/shared/forms/schema-primitives";
import { crmApiClient, type DealOutcomeRequest } from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import { dealLifecycleActionSchema } from "../forms/deal-lifecycle-action-schema";
import { dealOwnerFormSchema } from "../forms/deal-owner-form-schema";

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

function revalidateDealRoutes(dealId: string) {
  revalidatePath("/deals");
  revalidatePath(`/deals/${dealId}`);
}

function mapLifecyclePayload(formData: FormData): DealOutcomeRequest | null {
  const parsed = dealLifecycleActionSchema.safeParse({
    occurredAt: formData.get("occurredAt"),
    lostReasonId: formData.get("lostReasonId"),
    note: formData.get("note"),
    rowVersion: formData.get("rowVersion"),
  });

  if (!parsed.success) {
    return null;
  }

  return {
    occurredAt: emptyToNull(parsed.data.occurredAt),
    lostReasonId: emptyToNull(parsed.data.lostReasonId),
    note: emptyToNull(parsed.data.note),
    rowVersion: emptyToNull(parsed.data.rowVersion),
  };
}

export async function changeDealOwnerAction(
  dealId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  const locale = await getRequestLocale();

  if (!isGuid(dealId)) {
    return { status: "error", message: tCrm("crm.deals.validation.invalidId", locale) };
  }

  const parsed = dealOwnerFormSchema.safeParse({
    ownerUserId: formData.get("ownerUserId"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: tCrm("crm.forms.errors.reviewTitle", locale),
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors, locale),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.assignDealOwner(
      dealId,
      { ownerUserId: emptyToNull(parsed.data.ownerUserId) },
      options,
    );

    revalidateDealRoutes(dealId);
    return { status: "success", message: tCrm("crm.deals.result.ownerUpdated", locale) };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/deals/${dealId}`);
  }
}

export async function markDealWonAction(
  dealId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  const locale = await getRequestLocale();

  if (!isGuid(dealId)) {
    return { status: "error", message: tCrm("crm.deals.validation.invalidId", locale) };
  }

  if (formData.get("confirm") !== "mark-deal-won") {
    return {
      status: "error",
      message: tCrm("crm.deals.validation.invalidActionConfirmation", locale),
    };
  }

  const payload = mapLifecyclePayload(formData);
  if (!payload) {
    return {
      status: "error",
      message: tCrm("crm.forms.errors.reviewTitle", locale),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.markDealWon(dealId, payload, options);
    revalidateDealRoutes(dealId);
    return { status: "success", message: tCrm("crm.deals.result.markedWon", locale) };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/deals/${dealId}`);
  }
}

export async function markDealLostAction(
  dealId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  const locale = await getRequestLocale();

  if (!isGuid(dealId)) {
    return { status: "error", message: tCrm("crm.deals.validation.invalidId", locale) };
  }

  if (formData.get("confirm") !== "mark-deal-lost") {
    return {
      status: "error",
      message: tCrm("crm.deals.validation.invalidActionConfirmation", locale),
    };
  }

  const payload = mapLifecyclePayload(formData);
  if (!payload) {
    return {
      status: "error",
      message: tCrm("crm.forms.errors.reviewTitle", locale),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.markDealLost(dealId, payload, options);
    revalidateDealRoutes(dealId);
    return { status: "success", message: tCrm("crm.deals.result.markedLost", locale) };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/deals/${dealId}`);
  }
}

export async function reopenDealAction(
  dealId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  const locale = await getRequestLocale();

  if (!isGuid(dealId)) {
    return { status: "error", message: tCrm("crm.deals.validation.invalidId", locale) };
  }

  if (formData.get("confirm") !== "reopen-deal") {
    return {
      status: "error",
      message: tCrm("crm.deals.validation.invalidActionConfirmation", locale),
    };
  }

  const payload = mapLifecyclePayload(formData);
  if (!payload) {
    return {
      status: "error",
      message: tCrm("crm.forms.errors.reviewTitle", locale),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.reopenDeal(dealId, payload, options);
    revalidateDealRoutes(dealId);
    return { status: "success", message: tCrm("crm.deals.result.reopened", locale) };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/deals/${dealId}`);
  }
}
