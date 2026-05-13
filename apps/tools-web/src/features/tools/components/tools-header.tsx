import Link from "next/link";
import { Button } from "@netmetric/ui";

import { toolsEnv } from "@/lib/tools-env";

export function ToolsHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {toolsEnv.appName}
          </Link>
          <p className="text-sm text-muted-foreground">
            Browser-first utilities for everyday tasks
          </p>
        </div>
        <nav aria-label="Primary" className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/categories">Categories</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/history">History</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={toolsEnv.authUrl}>Sign in</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
