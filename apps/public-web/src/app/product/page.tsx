import type { Metadata } from "next";

import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("product");

export const metadata: Metadata = createPageMetadata({
  title: "Product",
  description: content.description,
  path: "/product",
});

export default function ProductPage() {
  return <StandardPage content={content} />;
}
