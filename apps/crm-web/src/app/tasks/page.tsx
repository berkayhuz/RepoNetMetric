import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEmptyState } from "@/components/shell/crm-empty-state";
import { CrmListToolbar } from "@/components/shell/crm-list-toolbar";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { CrmPagination } from "@/components/shell/crm-pagination";
import { getTasksData } from "@/features/tasks/data/tasks-data";
import { toListQuery } from "@/features/shared/data/query";
import type { WorkTaskDto } from "@/lib/crm-api";
import { crmCapabilityAllows } from "@/lib/crm-auth/crm-capabilities";
import { getCurrentCrmCapabilities } from "@/lib/crm-auth/current-crm-capabilities";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { tCrm, tCrmWithFallback } from "@/lib/i18n/crm-i18n";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "@netmetric/ui";
import Link from "next/link";

function renderTaskRow(task: WorkTaskDto, locale: string) {
  return (
    <TableRow key={task.id}>
      <TableCell>{task.title}</TableCell>
      <TableCell>{task.description || "-"}</TableCell>
      <TableCell>
        {tCrmWithFallback(`crm.tasks.status.${task.status}`, String(task.status), locale)}
      </TableCell>
      <TableCell>
        {tCrmWithFallback(`crm.common.priority.${task.priority}`, String(task.priority), locale)}
      </TableCell>
      <TableCell>{new Date(task.dueAtUtc).toLocaleDateString(locale)}</TableCell>
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
  const locale = await getRequestLocale();
  const capabilities = await getCurrentCrmCapabilities();
  const canCreateTasks = crmCapabilityAllows(capabilities, "tasks.create");

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
        title={tCrm("crm.tasks.page.title", locale)}
        description={tCrm("crm.tasks.page.description", locale)}
        actions={
          canCreateTasks ? (
            <>
              <Button asChild>
                <Link href="/tasks/new">{tCrm("crm.tasks.actions.create", locale)}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/tasks/meetings/new">
                  {tCrm("crm.meetings.actions.schedule", locale)}
                </Link>
              </Button>
            </>
          ) : null
        }
      />
      <div className="rounded-lg border p-4 text-sm text-muted-foreground">
        <p>
          {tCrm("crm.tasks.summary.openTasks", locale, { count: workspaceSummary.openTaskCount })}
        </p>
        <p>
          {tCrm("crm.tasks.summary.upcomingMeetings", locale, {
            count: workspaceSummary.upcomingMeetingCount,
          })}
        </p>
      </div>
      <CrmListToolbar actionPath="/tasks" {...(query.search ? { search: query.search } : {})} />
      {paged.items.length === 0 ? (
        <CrmEmptyState
          title={tCrm("crm.tasks.empty.title", locale)}
          description={tCrm("crm.tasks.empty.description", locale)}
        />
      ) : (
        <Table>
          <TableCaption>{tCrm("crm.tasks.table.caption", locale)}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{tCrm("crm.tasks.fields.title", locale)}</TableHead>
              <TableHead>{tCrm("crm.tasks.fields.description", locale)}</TableHead>
              <TableHead>{tCrm("crm.tasks.fields.status", locale)}</TableHead>
              <TableHead>{tCrm("crm.tasks.fields.priority", locale)}</TableHead>
              <TableHead>{tCrm("crm.tasks.fields.dueDate", locale)}</TableHead>
              <TableHead>{tCrm("crm.tasks.fields.owner", locale)}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{paged.items.map((task) => renderTaskRow(task, locale))}</TableBody>
        </Table>
      )}
      <CrmPagination
        currentPage={paged.pageNumber}
        totalPages={paged.totalPages}
        basePath="/tasks"
        currentQuery={currentQuery}
      />
      <CrmContractPending module={tCrm("crm.tasks.contractPending.detailTimeline", locale)} />
    </section>
  );
}
