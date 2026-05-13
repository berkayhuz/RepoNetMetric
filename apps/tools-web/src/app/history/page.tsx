import type { Metadata } from "next";
import { Heading, Text } from "@netmetric/ui";

import { ToolHistoryList } from "@/features/tools/history/tool-history-list";
import { createNoIndexMetadata } from "@/lib/seo";
import { handleToolsApiPageError } from "@/lib/tools-auth/handle-tools-api-page-error";
import { requireToolsSession } from "@/lib/tools-auth/require-tools-session";
import { toolsApiClient, type ToolHistoryPageResponse } from "@/lib/tools-api";
import { getToolsApiRequestOptions } from "@/lib/tools-api/tools-api-request-options";

export const metadata: Metadata = createNoIndexMetadata(
  "History",
  "History area for authenticated tools usage.",
  "/history",
);

export default async function HistoryPage() {
  await requireToolsSession("/history");

  let response: ToolHistoryPageResponse;
  try {
    const requestOptions = await getToolsApiRequestOptions();
    response = await toolsApiClient.getHistory({ page: 1, pageSize: 20 }, requestOptions);
  } catch (error) {
    handleToolsApiPageError(error, "/history");
  }

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Heading level={1}>History</Heading>
        <Text className="text-muted-foreground">
          Review your saved tool runs and manage artifacts.
        </Text>
      </div>
      <ToolHistoryList response={response} />
    </section>
  );
}
