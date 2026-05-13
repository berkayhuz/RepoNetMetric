import type { Metadata } from "next";

import { StandardPage } from "@/features/public/components/standard-page";
import { getPageContent } from "@/features/public/content/pages";
import { createPageMetadata } from "@/lib/metadata";

const content = getPageContent("crm");

export const metadata: Metadata = createPageMetadata({
  title: "CRM",
  description: content.description,
  path: "/crm",
});

export default function CrmPage() {
  return <StandardPage content={content} />;
}
