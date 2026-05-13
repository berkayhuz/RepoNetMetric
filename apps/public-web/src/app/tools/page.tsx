import type { Metadata } from "next";
import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("tools");
export const metadata: Metadata = createPageMetadata({
  title: "Tools",
  description: content.description,
  path: "/tools",
});
export default function ToolsPage() {
  return <StandardPage content={content} />;
}
