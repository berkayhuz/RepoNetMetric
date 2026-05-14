import "server-only";

import { isGuid } from "@/features/shared/data/guid";
import {
  crmApiClient,
  type TicketAssignmentHistoryDto,
  type TicketStatusHistoryDto,
  type TicketWorkflowQueueDto,
} from "@/lib/crm-api";
import { getCrmApiAuthContext, getRequestCorrelationId } from "@/lib/crm-auth/crm-auth-headers";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export type TicketWorkflowReadQuery = {
  ticketId?: string;
};

export type TicketWorkflowDataResult = {
  queues: TicketWorkflowQueueDto[];
  assignments: TicketAssignmentHistoryDto[] | null;
  statusHistory: TicketStatusHistoryDto[] | null;
};

export async function getTicketWorkflowData(
  query: TicketWorkflowReadQuery,
  returnPath: string,
): Promise<TicketWorkflowDataResult> {
  await requireCrmSession(returnPath);

  try {
    const authContext = await getCrmApiAuthContext();
    const correlationId = await getRequestCorrelationId();
    const options = {
      ...(authContext ? { authContext } : {}),
      ...(correlationId ? { correlationId } : {}),
    };

    const queues = await crmApiClient.listTicketWorkflowQueues(options);

    const [assignments, statusHistory] =
      query.ticketId && isGuid(query.ticketId)
        ? await Promise.all([
            crmApiClient.listTicketAssignmentHistory(query.ticketId, options),
            crmApiClient.listTicketStatusHistory(query.ticketId, options),
          ])
        : [null, null];

    return { queues, assignments, statusHistory };
  } catch (error) {
    handleCrmApiPageError(error, returnPath);
  }
}
