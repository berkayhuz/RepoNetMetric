import "server-only";

import { crmApiClient, type CrmListQuery } from "@/lib/crm-api";
import { getCrmApiAuthContext, getRequestCorrelationId } from "@/lib/crm-auth/crm-auth-headers";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";

export async function getTicketsData(query: CrmListQuery, returnPath: string) {
  try {
    const authContext = await getCrmApiAuthContext();
    const correlationId = await getRequestCorrelationId();
    const options = {
      ...(authContext ? { authContext } : {}),
      ...(correlationId ? { correlationId } : {}),
    };

    return await crmApiClient.listTickets(query, options);
  } catch (error) {
    handleCrmApiPageError(error, returnPath);
  }
}

export async function getTicketDetailData(ticketId: string, returnPath: string) {
  try {
    const authContext = await getCrmApiAuthContext();
    const correlationId = await getRequestCorrelationId();
    const options = {
      ...(authContext ? { authContext } : {}),
      ...(correlationId ? { correlationId } : {}),
    };

    return await crmApiClient.getTicketById(ticketId, options);
  } catch (error) {
    handleCrmApiPageError(error, returnPath);
  }
}
