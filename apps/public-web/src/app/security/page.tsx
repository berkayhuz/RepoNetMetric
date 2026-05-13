import type { Metadata } from "next";
import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("security");
export const metadata: Metadata = createPageMetadata({
  title: "Security",
  description: content.description,
  path: "/security",
});
export default function SecurityPage() {
  return <StandardPage content={content} />;
}
