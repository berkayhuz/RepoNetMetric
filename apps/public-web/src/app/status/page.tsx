import type { Metadata } from "next";
import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("status");
export const metadata: Metadata = createPageMetadata({
  title: "Status",
  description: content.description,
  path: "/status",
});
export default function StatusPage() {
  return <StandardPage content={content} />;
}
