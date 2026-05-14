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
import { assertSameOriginRequest } from "@/lib/security/csrf";

import { dealFormSchema, type DealFormInput, type DealFormValues } from "../forms/deal-form-schema";

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

  const parsed = dealFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    const created = await crmApiClient.createDeal(mapDealPayload(parsed.data), options);

    revalidatePath("/deals");
    revalidatePath(`/deals/${created.id}`);

    return {
      status: "success",
      message: "Deal created successfully.",
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

  if (!isGuid(dealId)) {
    return {
      status: "error",
      message: "Invalid deal id.",
    };
  }

  const parsed = dealFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
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
      message: "Deal updated successfully.",
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

  if (!isGuid(dealId)) {
    return { status: "error", message: "Invalid deal id." };
  }

  if (formData.get("confirm") !== "delete-deal") {
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
    await crmApiClient.deleteDeal(dealId, options);

    revalidatePath("/deals");
    redirect("/deals");
  } catch (error) {
    const mapped = mapCrmMutationErrorToState(error, `/deals/${dealId}`);
    if (mapped.message === "The requested record no longer exists.") {
      return {
        status: "error",
        message: "Deal is already removed or no longer available.",
      };
    }

    return mapped;
  }
}
