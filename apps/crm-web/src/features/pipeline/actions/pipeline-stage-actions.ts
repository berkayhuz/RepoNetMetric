"use server";

import { revalidatePath } from "next/cache";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { isGuid } from "@/features/shared/data/guid";
import { opportunityStageOptions } from "@/features/shared/forms/options";
import { crmApiClient } from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { assertSameOriginRequest } from "@/lib/security/csrf";

const allowedStages = new Set<number>(opportunityStageOptions.map((item) => item.value));

export async function moveOpportunityStageAction(
  opportunityId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  await requireCrmSession("/pipeline");

  if (!isGuid(opportunityId)) {
    return { status: "error", message: "Invalid opportunity id." };
  }

  const stageRaw = formData.get("newStage");
  const stageNumber = typeof stageRaw === "string" ? Number(stageRaw) : Number.NaN;

  if (!Number.isInteger(stageNumber) || !allowedStages.has(stageNumber)) {
    return {
      status: "error",
      message: "Please choose a valid target stage.",
      fieldErrors: { newStage: ["Invalid target stage."] },
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.moveOpportunityStage(
      opportunityId,
      {
        newStage: stageNumber,
        newPipelineStageId: null,
        note: null,
        lostReasonId: null,
        lostNote: null,
        rowVersion: null,
      },
      options,
    );

    revalidatePath("/pipeline");
    revalidatePath("/opportunities");
    revalidatePath(`/opportunities/${opportunityId}`);

    return {
      status: "success",
      message: "Opportunity stage updated.",
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, "/pipeline");
  }
}
