import type { CrmPagedResult } from "@/lib/crm-api";

import { CrmEmptyState } from "./crm-empty-state";
import { CrmEntityTable, type CrmEntityTableColumn } from "./crm-entity-table";
import { CrmListToolbar } from "./crm-list-toolbar";
import { CrmPagination } from "./crm-pagination";
import { CrmPageHeader } from "./crm-page-header";

export function CrmEntityListPage<TItem extends { id: string }>({
  title,
  description,
  actionPath,
  search,
  caption,
  columns,
  paged,
  detailBasePath,
  currentQuery,
}: Readonly<{
  title: string;
  description: string;
  actionPath: string;
  search?: string;
  caption: string;
  columns: CrmEntityTableColumn<TItem>[];
  paged: CrmPagedResult<TItem>;
  detailBasePath: string;
  currentQuery: URLSearchParams;
}>) {
  return (
    <section className="space-y-6">
      <CrmPageHeader title={title} description={description} />
      <CrmListToolbar actionPath={actionPath} {...(search ? { search } : {})} />

      {paged.items.length === 0 ? (
        <CrmEmptyState
          title={`No ${title.toLowerCase()} found`}
          description="Try adjusting your search or pagination parameters."
        />
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
