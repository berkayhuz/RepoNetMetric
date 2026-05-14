import "server-only";

import { crmApiClient } from "@/lib/crm-api";
import { getCrmApiAuthContext, getRequestCorrelationId } from "@/lib/crm-auth/crm-auth-headers";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";

async function getOptions() {
  const authContext = await getCrmApiAuthContext();
  const correlationId = await getRequestCorrelationId();

  return {
    ...(authContext ? { authContext } : {}),
    ...(correlationId ? { correlationId } : {}),
  };
}

export async function getPipelinesData(returnPath: string) {
  try {
    const options = await getOptions();
    return await crmApiClient.listPipelines(options);
  } catch (error) {
    handleCrmApiPageError(error, returnPath);
  }
}

export async function getPipelineBoardData(
  pipelineId: string,
  returnPath: string,
  ownerUserId?: string,
) {
  try {
    const options = await getOptions();
    return await crmApiClient.getPipelineBoard(
      pipelineId,
      ownerUserId ? { ownerUserId } : {},
      options,
    );
  } catch (error) {
    handleCrmApiPageError(error, returnPath);
  }
}
