import { Spinner } from "@netmetric/ui";

import { tClient } from "@/features/auth/i18n/auth-i18n.client";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Spinner />
        <span>{tClient("common.loading")}</span>
      </div>
    </main>
  );
}
