import type { Metadata } from "next";
import { Heading, Text } from "@netmetric/ui";

import { ToolsShell } from "@/features/tools/components/tools-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  "Privacy",
  "Privacy notice for NetMetric Tools usage and data handling.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <ToolsShell>
      <section aria-labelledby="privacy-heading" className="space-y-4">
        <Heading id="privacy-heading" level={1}>
          Privacy
        </Heading>
        <Text className="text-muted-foreground">
          Guest usage is browser-first. Account-based history and artifact retention details will be
          published as those capabilities go live.
        </Text>
      </section>
    </ToolsShell>
  );
}
