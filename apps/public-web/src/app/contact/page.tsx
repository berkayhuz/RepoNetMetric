import type { Metadata } from "next";
import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("contact");
export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: content.description,
  path: "/contact",
});
export default function ContactPage() {
  return <StandardPage content={content} />;
}
