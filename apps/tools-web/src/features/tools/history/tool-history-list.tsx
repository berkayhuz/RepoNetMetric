import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@netmetric/ui";

import type { ToolHistoryPageResponse } from "@/lib/tools-api";

import { ToolHistoryItem } from "./tool-history-item";

type ToolHistoryListProps = {
  response: ToolHistoryPageResponse;
};

export function ToolHistoryList({ response }: ToolHistoryListProps) {
  if (response.items.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No saved runs yet</EmptyTitle>
          <EmptyDescription>
            Run a tool, then use the Save to history action to keep it in your account.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      {response.items.map((item) => (
        <ToolHistoryItem key={item.runId} item={item} />
      ))}
    </div>
  );
}
