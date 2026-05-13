import type { Metadata } from "next";
import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("cookies");
export const metadata: Metadata = createPageMetadata({
  title: "Cookies",
  description: content.description,
  path: "/cookies",
});
export default function CookiesPage() {
  return <StandardPage content={content} />;
}
