import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEmptyState } from "@/components/shell/crm-empty-state";
import { CrmListToolbar } from "@/components/shell/crm-list-toolbar";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { CrmPagination } from "@/components/shell/crm-pagination";
import { getTasksData } from "@/features/tasks/data/tasks-data";
import { toListQuery } from "@/features/shared/data/query";
import type { WorkTaskDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@netmetric/ui";

function renderTaskRow(task: WorkTaskDto) {
  return (
    <TableRow key={task.id}>
      <TableCell>{task.title}</TableCell>
      <TableCell>{task.description || "-"}</TableCell>
      <TableCell>{task.status}</TableCell>
      <TableCell>{task.priority}</TableCell>
      <TableCell>{new Date(task.dueAtUtc).toLocaleDateString("en-GB")}</TableCell>
      <TableCell>{task.ownerUserId || "-"}</TableCell>
    </TableRow>
  );
}

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/tasks");

  const params = await searchParams;
  const query = toListQuery(params);
  const { paged, workspaceSummary } = await getTasksData(query, "/tasks");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title="Tasks"
        description="Read-only WorkManagement workspace tasks from consolidated CRM API."
      />
      <div className="rounded-lg border p-4 text-sm text-muted-foreground">
        <p>Open tasks: {workspaceSummary.openTaskCount}</p>
        <p>Upcoming meetings: {workspaceSummary.upcomingMeetingCount}</p>
      </div>
      <CrmListToolbar actionPath="/tasks" {...(query.search ? { search: query.search } : {})} />
      {paged.items.length === 0 ? (
        <CrmEmptyState
          title="No tasks found"
          description="Try adjusting your search query. Task detail and activity feeds are pending dedicated endpoint contracts."
        />
      ) : (
        <Table>
          <TableCaption>Work management tasks</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{paged.items.map((task) => renderTaskRow(task))}</TableBody>
        </Table>
      )}
      <CrmPagination
        currentPage={paged.pageNumber}
        totalPages={paged.totalPages}
        basePath="/tasks"
        currentQuery={currentQuery}
      />
      <CrmContractPending module="Task detail endpoint and activity timeline endpoint" />
    </section>
  );
}
