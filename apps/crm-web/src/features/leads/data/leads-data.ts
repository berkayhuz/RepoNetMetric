import "server-only";

import { crmApiClient, type CrmListQuery } from "@/lib/crm-api";
import { getCrmApiAuthContext, getRequestCorrelationId } from "@/lib/crm-auth/crm-auth-headers";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";

export async function getLeadsData(query: CrmListQuery, returnPath: string) {
  try {
    const authContext = await getCrmApiAuthContext();
    const correlationId = await getRequestCorrelationId();
    const options = {
      ...(authContext ? { authContext } : {}),
      ...(correlationId ? { correlationId } : {}),
    };

    return await crmApiClient.listLeads(query, options);
  } catch (error) {
    handleCrmApiPageError(error, returnPath);
  }
}

export async function getLeadDetailData(leadId: string, returnPath: string) {
  try {
    const authContext = await getCrmApiAuthContext();
    const correlationId = await getRequestCorrelationId();
    const options = {
      ...(authContext ? { authContext } : {}),
      ...(correlationId ? { correlationId } : {}),
    };

    return await crmApiClient.getLeadById(leadId, options);
  } catch (error) {
    handleCrmApiPageError(error, returnPath);
  }
}
