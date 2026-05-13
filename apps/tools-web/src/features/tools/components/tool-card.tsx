import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@netmetric/ui";

import type { ToolCatalogItem } from "@/features/tools/catalog/catalog-types";
import { getToolRoutePath } from "@/features/tools/catalog/catalog-routes";

type ToolCardProps = {
  tool: ToolCatalogItem;
};

function toMegabytes(bytes: number): number {
  return Math.round((bytes / 1024 / 1024) * 10) / 10;
}

export function ToolCard({ tool }: ToolCardProps) {
  const path = getToolRoutePath(tool.slug);
  const isComingSoon = !tool.isEnabled;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{tool.title}</CardTitle>
          <Badge variant={isComingSoon ? "outline" : "secondary"}>
            {isComingSoon ? "Coming Soon" : "Enabled"}
          </Badge>
        </div>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Execution: {tool.executionMode}</p>
        <p>Guest max: {toMegabytes(tool.guestMaxFileBytes)} MB</p>
        <p>Signed-in save max: {toMegabytes(tool.authenticatedMaxSaveBytes)} MB</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant={isComingSoon ? "outline" : "default"}>
          <Link href={path}>{isComingSoon ? "View Details" : "Open Tool"}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
