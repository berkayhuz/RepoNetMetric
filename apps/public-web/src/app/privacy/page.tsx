import type { Metadata } from "next";
import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("privacy");
export const metadata: Metadata = createPageMetadata({
  title: "Privacy",
  description: content.description,
  path: "/privacy",
});
export default function PrivacyPage() {
  return <StandardPage content={content} />;
}
