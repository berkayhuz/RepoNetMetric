import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolHistoryDetailPanel } from "@/features/tools/history/tool-history-detail-panel";
import { createNoIndexMetadata } from "@/lib/seo";
import { handleToolsApiPageError } from "@/lib/tools-auth/handle-tools-api-page-error";
import { requireToolsSession } from "@/lib/tools-auth/require-tools-session";
import { toolsApiClient, ToolsApiError, type ToolRunDetailResponse } from "@/lib/tools-api";
import { getToolsApiRequestOptions } from "@/lib/tools-api/tools-api-request-options";

export const metadata: Metadata = createNoIndexMetadata(
  "History Entry",
  "Detailed authenticated history entry page.",
  "/history/[id]",
);

export default async function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireToolsSession(`/history/${id}`);

  let run: ToolRunDetailResponse;
  try {
    const requestOptions = await getToolsApiRequestOptions();
    run = await toolsApiClient.getHistoryDetail(id, requestOptions);
  } catch (error) {
    if (error instanceof ToolsApiError && error.kind === "not_found") {
      notFound();
    }

    handleToolsApiPageError(error, `/history/${id}`);
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <ToolHistoryDetailPanel run={run} />
    </section>
  );
}
