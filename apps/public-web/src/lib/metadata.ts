import type { Metadata } from "next";

import { toAbsoluteUrl } from "@/lib/public-env";

const defaultTitle = "NetMetric";
const defaultDescription =
  "NetMetric is an enterprise platform for secure authentication, account governance, CRM operations, business tools, and API-driven workflows.";

export const siteTitle = defaultTitle;

export function createPageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = toAbsoluteUrl(input.path);

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: defaultTitle,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

export const defaultSiteDescription = defaultDescription;
