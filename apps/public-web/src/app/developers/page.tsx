import type { Metadata } from "next";
import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("developers");
export const metadata: Metadata = createPageMetadata({
  title: "Developers",
  description: content.description,
  path: "/developers",
});
export default function DevelopersPage() {
  return <StandardPage content={content} />;
}
