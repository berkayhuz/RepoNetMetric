import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { getToolDetail, getToolsCatalog } from "@/features/tools/catalog/catalog-api";
import { ToolComingSoonPanel } from "@/features/tools/components/tool-coming-soon-panel";
import { ToolDetailShell } from "@/features/tools/components/tool-detail-shell";
import { ImageConverterClient } from "@/features/tools/image-converter/image-converter-client";
import { createPageMetadata } from "@/lib/seo";
import { getToolsAuthStatus } from "@/lib/tools-auth/tools-auth-headers";
import { toAbsoluteUrl } from "@/lib/tools-env";

export const metadata: Metadata = createPageMetadata(
  "JPG to PNG Converter",
  "Convert JPG images to PNG in your browser with local download and optional signed-in history save.",
  "/image/jpg-to-png",
);

export default async function JpgToPngPage() {
  const tool = await getToolDetail("jpg-to-png");

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
    url: toAbsoluteUrl("/image/jpg-to-png"),
  };

  return (
    <>
      <Script id="jpg-to-png-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <ToolDetailShell tool={tool} categoryTitle={categoryTitle} isExecutionAvailable />
      {tool.isEnabled ? (
        <ImageConverterClient mode="jpg-to-png" isAuthenticated={authStatus.isAuthenticated} />
      ) : null}
      {!tool.isEnabled ? (
        <div className="mx-auto mb-10 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <ToolComingSoonPanel />
        </div>
      ) : null}
    </>
  );
}
