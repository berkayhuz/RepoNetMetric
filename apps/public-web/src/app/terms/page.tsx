import type { Metadata } from "next";
import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("terms");
export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description: content.description,
  path: "/terms",
});
export default function TermsPage() {
  return <StandardPage content={content} />;
}
