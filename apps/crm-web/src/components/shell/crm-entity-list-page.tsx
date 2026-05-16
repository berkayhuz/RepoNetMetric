import type { CrmPagedResult } from "@/lib/crm-api";
import { tCrm } from "@/lib/i18n/crm-i18n";

import { CrmEmptyState } from "./crm-empty-state";
import { CrmEntityTable, type CrmEntityTableColumn } from "./crm-entity-table";
import { CrmListToolbar } from "./crm-list-toolbar";
import { CrmPageHeader } from "./crm-page-header";
import { CrmPagination } from "./crm-pagination";

export function CrmEntityListPage<TItem extends { id: string }>({
  title,
  description,
  actionPath,
  createPath,
  createLabel,
  createDisabledMessage,
  search,
  caption,
  columns,
  paged,
  detailBasePath,
  currentQuery,
  locale,
  emptyTitle,
  emptyDescription,
}: Readonly<{
  title: string;
  description: string;
  actionPath: string;
  createPath?: string;
  createLabel?: string;
  createDisabledMessage?: string;
  search?: string;
  caption: string;
  columns: CrmEntityTableColumn<TItem>[];
  paged: CrmPagedResult<TItem>;
  detailBasePath: string;
  currentQuery: URLSearchParams;
  locale?: string | null;
  emptyTitle?: string;
  emptyDescription?: string;
}>) {
  const resolvedEmptyTitle = emptyTitle ?? tCrm("crm.lists.states.empty", locale);
  const resolvedEmptyDescription =
    emptyDescription ?? tCrm("crm.lists.states.emptyDescription", locale);

  return (
    <section className="space-y-6">
      <CrmPageHeader title={title} description={description} />
      <CrmListToolbar
        actionPath={actionPath}
        {...(createPath ? { createPath } : {})}
        {...(createLabel ? { createLabel } : {})}
        {...(createDisabledMessage ? { createDisabledMessage } : {})}
        {...(search ? { search } : {})}
        {...(locale !== undefined ? { locale } : {})}
      />

      {paged.items.length === 0 ? (
        <CrmEmptyState title={resolvedEmptyTitle} description={resolvedEmptyDescription} />
      ) : (
        <CrmEntityTable
          caption={caption}
          columns={columns}
          rows={paged.items}
          detailBasePath={detailBasePath}
        />
      )}

      <CrmPagination
        currentPage={paged.pageNumber}
        totalPages={paged.totalPages}
        basePath={actionPath}
        currentQuery={currentQuery}
      />
    </section>
  );
}
