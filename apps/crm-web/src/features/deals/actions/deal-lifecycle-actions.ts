"use server";

import { revalidatePath } from "next/cache";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { isGuid } from "@/features/shared/data/guid";
import { emptyToNull } from "@/features/shared/forms/schema-primitives";
import { crmApiClient, type DealOutcomeRequest } from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import { dealLifecycleActionSchema } from "../forms/deal-lifecycle-action-schema";
import { dealOwnerFormSchema } from "../forms/deal-owner-form-schema";

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

  if (!isGuid(dealId)) {
    return { status: "error", message: "Invalid deal id." };
  }

  const parsed = dealOwnerFormSchema.safeParse({
    ownerUserId: formData.get("ownerUserId"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
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
    return { status: "success", message: "Deal owner updated successfully." };
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

  if (!isGuid(dealId)) {
    return { status: "error", message: "Invalid deal id." };
  }

  if (formData.get("confirm") !== "mark-deal-won") {
    return { status: "error", message: "Action confirmation is invalid." };
  }

  const payload = mapLifecyclePayload(formData);
  if (!payload) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.markDealWon(dealId, payload, options);
    revalidateDealRoutes(dealId);
    return { status: "success", message: "Deal marked as won." };
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

  if (!isGuid(dealId)) {
    return { status: "error", message: "Invalid deal id." };
  }

  if (formData.get("confirm") !== "mark-deal-lost") {
    return { status: "error", message: "Action confirmation is invalid." };
  }

  const payload = mapLifecyclePayload(formData);
  if (!payload) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.markDealLost(dealId, payload, options);
    revalidateDealRoutes(dealId);
    return { status: "success", message: "Deal marked as lost." };
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

  if (!isGuid(dealId)) {
    return { status: "error", message: "Invalid deal id." };
  }

  if (formData.get("confirm") !== "reopen-deal") {
    return { status: "error", message: "Action confirmation is invalid." };
  }

  const payload = mapLifecyclePayload(formData);
  if (!payload) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.reopenDeal(dealId, payload, options);
    revalidateDealRoutes(dealId);
    return { status: "success", message: "Deal reopened." };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/deals/${dealId}`);
  }
}
