import type { Metadata } from "next";
import Script from "next/script";
import { Code, Heading, Input, Text } from "@netmetric/ui";

import { getToolsCatalog } from "@/features/tools/catalog/catalog-api";
import { ToolCatalogGrid } from "@/features/tools/components/tool-catalog-grid";
import { ToolsHero } from "@/features/tools/components/tools-hero";
import { ToolsShell } from "@/features/tools/components/tools-shell";
import { createPageMetadata } from "@/lib/seo";
import { toAbsoluteUrl } from "@/lib/tools-env";

export const metadata: Metadata = createPageMetadata(
  "Browser Tools Catalog",
  "Discover browser-first tools for QR generation and image conversion on NetMetric Tools.",
  "/",
);

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const catalog = await getToolsCatalog();
  const query = q?.trim().toLowerCase() ?? "";

  const tools = query
    ? catalog.tools.filter((tool) => {
        const haystack = `${tool.title} ${tool.description} ${tool.slug}`.toLowerCase();
        return haystack.includes(query);
      })
    : catalog.tools;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NetMetric Tools",
    url: toAbsoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${toAbsoluteUrl("/")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Script id="tools-home-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <ToolsHero />
      <ToolsShell>
        <section aria-labelledby="catalog-heading" className="space-y-4">
          <div className="space-y-2">
            <Heading id="catalog-heading" level={1}>
              Tool catalog
            </Heading>
            <Text className="text-muted-foreground">
              Start with enabled tools and explore upcoming utilities.
            </Text>
          </div>
          <form action="/" method="get" className="flex max-w-xl items-center gap-2" role="search">
            <label htmlFor="catalog-search" className="sr-only">
              Search tools
            </label>
            <Input
              id="catalog-search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search tools by name or purpose"
            />
          </form>
          {query ? (
            <Text className="text-muted-foreground">
              Showing results for <Code>{query}</Code>
            </Text>
          ) : null}
          <ToolCatalogGrid tools={tools} />
        </section>
      </ToolsShell>
    </>
  );
}
