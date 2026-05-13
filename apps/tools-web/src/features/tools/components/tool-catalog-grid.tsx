import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@netmetric/ui";

import type { ToolCatalogItem } from "@/features/tools/catalog/catalog-types";
import { ToolCard } from "./tool-card";

type ToolCatalogGridProps = {
  tools: ToolCatalogItem[];
};

export function ToolCatalogGrid({ tools }: ToolCatalogGridProps) {
  if (tools.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No tools found</EmptyTitle>
          <EmptyDescription>Try another search term or browse categories.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
