import type { Metadata } from "next";
import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("about");
export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: content.description,
  path: "/about",
});
export default function AboutPage() {
  return <StandardPage content={content} />;
}
