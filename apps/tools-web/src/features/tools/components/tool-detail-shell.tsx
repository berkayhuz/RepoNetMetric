import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@netmetric/ui";

import type { ToolCatalogItem } from "@/features/tools/catalog/catalog-types";

type ToolDetailShellProps = {
  tool: ToolCatalogItem;
  categoryTitle: string;
  isExecutionAvailable?: boolean;
};

function toMegabytes(bytes: number): number {
  return Math.round((bytes / 1024 / 1024) * 10) / 10;
}

export function ToolDetailShell({
  tool,
  categoryTitle,
  isExecutionAvailable = false,
}: ToolDetailShellProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{tool.isEnabled ? "Enabled" : "Coming Soon"}</Badge>
            <Badge variant="outline">{tool.executionMode}</Badge>
            <Badge variant="outline">{categoryTitle}</Badge>
          </div>
          <CardTitle className="text-3xl">{tool.title}</CardTitle>
          <CardDescription>{tool.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Guest local usage limit: {toMegabytes(tool.guestMaxFileBytes)} MB</p>
          <p>Authenticated save limit: {toMegabytes(tool.authenticatedMaxSaveBytes)} MB</p>
          {isExecutionAvailable ? (
            <p>
              This tool runs directly in your browser. NetMetric does not need to process guest
              files on the server for local output generation.
            </p>
          ) : (
            <p>Tool execution will be added in the next phase.</p>
          )}
          <p>Sign in if you want to explicitly save generated output to your account history.</p>
          {tool.acceptedMimeTypes.length > 0 ? (
            <p>Accepted MIME hints: {tool.acceptedMimeTypes.join(", ")}</p>
          ) : null}
        </CardContent>
        <div className="px-6 pb-6">
          <Button asChild variant="outline">
            <Link href="/history">Go to saved history</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
