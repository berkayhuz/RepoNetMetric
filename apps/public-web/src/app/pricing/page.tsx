import type { Metadata } from "next";
import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("pricing");
export const metadata: Metadata = createPageMetadata({
  title: "Pricing",
  description: content.description,
  path: "/pricing",
});
export default function PricingPage() {
  return <StandardPage content={content} />;
}
