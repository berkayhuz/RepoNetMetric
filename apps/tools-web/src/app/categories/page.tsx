import type { Metadata } from "next";
import { Heading, Text } from "@netmetric/ui";

import { getToolsCatalog } from "@/features/tools/catalog/catalog-api";
import { CategoryCard } from "@/features/tools/components/category-card";
import { ToolsShell } from "@/features/tools/components/tools-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  "Tool Categories",
  "Browse NetMetric Tools categories and discover browser-first utilities.",
  "/categories",
);

export default async function CategoriesPage() {
  const catalog = await getToolsCatalog();

  const sortedCategories = [...catalog.categories].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <ToolsShell>
      <section aria-labelledby="categories-heading" className="space-y-6">
        <div className="space-y-2">
          <Heading id="categories-heading" level={1}>
            Categories
          </Heading>
          <Text className="text-muted-foreground">
            Explore tools by category and find the right utility faster.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sortedCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              toolCount={catalog.tools.filter((tool) => tool.categorySlug === category.slug).length}
            />
          ))}
        </div>
      </section>
    </ToolsShell>
  );
}
