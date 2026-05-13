import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@netmetric/ui";

function withPage(url: URL, page: number): string {
  const copy = new URL(url.toString());
  copy.searchParams.set("page", String(page));
  return `${copy.pathname}${copy.search}`;
}

export function CrmPagination({
  currentPage,
  totalPages,
  basePath,
  currentQuery,
}: Readonly<{
  currentPage: number;
  totalPages: number;
  basePath: string;
  currentQuery: URLSearchParams;
}>) {
  if (totalPages <= 1) {
    return null;
  }

  const baseUrl = new URL(`http://localhost${basePath}`);
  for (const [key, value] of currentQuery.entries()) {
    if (key === "page") {
      continue;
    }

    baseUrl.searchParams.set(key, value);
  }

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={withPage(baseUrl, prevPage)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : 0}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={withPage(baseUrl, currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={withPage(baseUrl, nextPage)}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : 0}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
