import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@netmetric/ui";

import type { ToolCategory } from "@/features/tools/catalog/catalog-types";

type CategoryCardProps = {
  category: ToolCategory;
  toolCount: number;
};

export function CategoryCard({ category, toolCount }: CategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{category.title}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {toolCount} tools in this category
      </CardContent>
      <CardFooter>
        <Link
          href={`/categories/${category.slug}`}
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          View category
        </Link>
      </CardFooter>
    </Card>
  );
}
