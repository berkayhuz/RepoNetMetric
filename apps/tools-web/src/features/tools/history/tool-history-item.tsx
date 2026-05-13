import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "@netmetric/ui";

import type { ToolRunSummaryResponse } from "@/lib/tools-api";

import { ToolHistoryDeleteForm } from "./tool-history-delete-form";

type ToolHistoryItemProps = {
  item: ToolRunSummaryResponse;
};

export function ToolHistoryItem({ item }: ToolHistoryItemProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">{item.toolSlug}</CardTitle>
          <Badge variant="outline">{item.artifactCount} artifact(s)</Badge>
        </div>
        <CardDescription>Created {new Date(item.createdAtUtc).toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link href={`/history/${item.runId}`}>View details</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/api/tools/history/${item.runId}/download`}>Download latest output</Link>
          </Button>
        </div>

        <details>
          <summary className="cursor-pointer text-sm text-muted-foreground">
            Delete this run
          </summary>
          <div className="mt-3 rounded-md border p-3">
            <ToolHistoryDeleteForm runId={item.runId} />
          </div>
        </details>

        <Text className="text-xs text-muted-foreground">Run id: {item.runId}</Text>
      </CardContent>
    </Card>
  );
}
