"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { isGuid } from "@/features/shared/data/guid";
import { emptyToNull } from "@/features/shared/forms/schema-primitives";
import {
  crmApiClient,
  type OpportunityUpdateRequest,
  type OpportunityUpsertRequest,
} from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import {
  opportunityFormSchema,
  type OpportunityFormInput,
  type OpportunityFormValues,
} from "../forms/opportunity-form-schema";

function mapOpportunityPayload(input: OpportunityFormValues): OpportunityUpsertRequest {
  const estimatedAmount = Number(input.estimatedAmount);
  const expectedRevenue = input.expectedRevenue ? Number(input.expectedRevenue) : null;

  return {
    opportunityCode: input.opportunityCode.trim(),
    name: input.name.trim(),
    description: emptyToNull(input.description),
    estimatedAmount,
    expectedRevenue:
      expectedRevenue === null || Number.isNaN(expectedRevenue) ? null : expectedRevenue,
    probability: input.probability,
    estimatedCloseDate: emptyToNull(input.estimatedCloseDate),
    stage: input.stage,
    status: input.status,
    priority: input.priority,
    leadId: emptyToNull(input.leadId),
    customerId: emptyToNull(input.customerId),
    ownerUserId: emptyToNull(input.ownerUserId),
    notes: emptyToNull(input.notes),
  };
}

function mapOpportunityUpdatePayload(input: OpportunityFormValues): OpportunityUpdateRequest {
  const rowVersion = input.rowVersion?.trim();

  return {
    ...mapOpportunityPayload(input),
    rowVersion: rowVersion && rowVersion.length > 0 ? rowVersion : "",
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

export async function createOpportunityAction(
  input: OpportunityFormInput,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  const parsed = opportunityFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    const created = await crmApiClient.createOpportunity(
      mapOpportunityPayload(parsed.data),
      options,
    );

    revalidatePath("/opportunities");
    revalidatePath("/pipeline");
    revalidatePath(`/opportunities/${created.id}`);

    return {
      status: "success",
      message: "Opportunity created successfully.",
      redirectTo: `/opportunities/${created.id}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, "/opportunities/new");
  }
}

export async function updateOpportunityAction(
  opportunityId: string,
  input: OpportunityFormInput,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  if (!isGuid(opportunityId)) {
    return {
      status: "error",
      message: "Invalid opportunity id.",
    };
  }

  const parsed = opportunityFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.updateOpportunity(
      opportunityId,
      mapOpportunityUpdatePayload(parsed.data),
      options,
    );

    revalidatePath("/opportunities");
    revalidatePath("/pipeline");
    revalidatePath(`/opportunities/${opportunityId}`);
    revalidatePath(`/opportunities/${opportunityId}/edit`);

    return {
      status: "success",
      message: "Opportunity updated successfully.",
      redirectTo: `/opportunities/${opportunityId}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/opportunities/${opportunityId}/edit`);
  }
}

export async function deleteOpportunityAction(
  opportunityId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  await requireCrmSession(`/opportunities/${opportunityId}`);

  if (!isGuid(opportunityId)) {
    return { status: "error", message: "Invalid opportunity id." };
  }

  if (formData.get("confirm") !== "delete-opportunity") {
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
    await crmApiClient.deleteOpportunity(opportunityId, options);

    revalidatePath("/opportunities");
    revalidatePath("/pipeline");
    redirect("/opportunities");
  } catch (error) {
    const mapped = mapCrmMutationErrorToState(error, `/opportunities/${opportunityId}`);
    if (mapped.message === "The requested record no longer exists.") {
      return {
        status: "error",
        message: "Opportunity is already removed or no longer available.",
      };
    }

    return mapped;
  }
}
