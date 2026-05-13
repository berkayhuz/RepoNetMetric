import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { getToolDetail, getToolsCatalog } from "@/features/tools/catalog/catalog-api";
import { ToolComingSoonPanel } from "@/features/tools/components/tool-coming-soon-panel";
import { ToolDetailShell } from "@/features/tools/components/tool-detail-shell";
import { QrGeneratorClient } from "@/features/tools/qr/qr-generator-client";
import { createPageMetadata } from "@/lib/seo";
import { getToolsAuthStatus } from "@/lib/tools-auth/tools-auth-headers";
import { toAbsoluteUrl } from "@/lib/tools-env";

export const metadata: Metadata = createPageMetadata(
  "QR Generator",
  "Generate QR images directly in your browser, download locally, and optionally save to account history when signed in.",
  "/qr-generator",
);

export default async function QrGeneratorPage() {
  const tool = await getToolDetail("qr-generator");

  if (!tool) {
    notFound();
  }

  const catalog = await getToolsCatalog();
  const authStatus = await getToolsAuthStatus();
  const categoryTitle =
    catalog.categories.find((category) => category.slug === tool.categorySlug)?.title ??
    tool.categorySlug;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: tool.description,
    url: toAbsoluteUrl("/qr-generator"),
  };

  return (
    <>
      <Script id="qr-generator-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <ToolDetailShell tool={tool} categoryTitle={categoryTitle} isExecutionAvailable />
      {tool.isEnabled ? <QrGeneratorClient isAuthenticated={authStatus.isAuthenticated} /> : null}
      {!tool.isEnabled ? (
        <div className="mx-auto mb-10 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <ToolComingSoonPanel />
        </div>
      ) : null}
    </>
  );
}
