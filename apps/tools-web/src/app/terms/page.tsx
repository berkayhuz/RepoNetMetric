import type { Metadata } from "next";
import { Heading, Text } from "@netmetric/ui";

import { ToolsShell } from "@/features/tools/components/tools-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  "Terms",
  "Terms of use for NetMetric Tools.",
  "/terms",
);

export default function TermsPage() {
  return (
    <ToolsShell>
      <section aria-labelledby="terms-heading" className="space-y-4">
        <Heading id="terms-heading" level={1}>
          Terms
        </Heading>
        <Text className="text-muted-foreground">
          Tool-specific terms and service limits will be refined as production features are
          released.
        </Text>
      </section>
    </ToolsShell>
  );
}
