import "server-only";

import {
  crmApiClient,
  normalizeListQuery,
  type CrmListQuery,
  type CrmPagedResult,
  type WorkManagementWorkspaceDto,
  type WorkTaskDto,
} from "@/lib/crm-api";
import { getCrmApiAuthContext, getRequestCorrelationId } from "@/lib/crm-auth/crm-auth-headers";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";

export type TasksDataResult = {
  paged: CrmPagedResult<WorkTaskDto>;
  workspaceSummary: Pick<WorkManagementWorkspaceDto, "openTaskCount" | "upcomingMeetingCount">;
};

function paginateTasks(tasks: WorkTaskDto[], query: CrmListQuery): CrmPagedResult<WorkTaskDto> {
  const normalized = normalizeListQuery(query);
  const searchLower = normalized.search?.toLowerCase();

  const filtered = searchLower
    ? tasks.filter((task) => {
        const title = task.title.toLowerCase();
        const description = task.description.toLowerCase();
        const status = task.status.toLowerCase();
        return (
          title.includes(searchLower) ||
          description.includes(searchLower) ||
          status.includes(searchLower)
        );
      })
    : tasks;

  const startIndex = (normalized.page - 1) * normalized.pageSize;
  const items = filtered.slice(startIndex, startIndex + normalized.pageSize);
  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / normalized.pageSize) || 0;

  return {
    items,
    totalCount,
    pageNumber: normalized.page,
    pageSize: normalized.pageSize,
    totalPages,
  };
}

export async function getTasksData(
  query: CrmListQuery,
  returnPath: string,
): Promise<TasksDataResult> {
  try {
    const authContext = await getCrmApiAuthContext();
    const correlationId = await getRequestCorrelationId();
    const options = {
      ...(authContext ? { authContext } : {}),
      ...(correlationId ? { correlationId } : {}),
    };

    const workspace = await crmApiClient.getWorkManagementWorkspace(options);
    return {
      paged: paginateTasks(workspace.tasks, query),
      workspaceSummary: {
        openTaskCount: workspace.openTaskCount,
        upcomingMeetingCount: workspace.upcomingMeetingCount,
      },
    };
  } catch (error) {
    handleCrmApiPageError(error, returnPath);
  }
}
