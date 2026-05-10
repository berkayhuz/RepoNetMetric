"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Alert, AlertDescription, Button, Spinner } from "@netmetric/ui";

import { authBrowserApi } from "@/features/auth/api/auth-browser-api";
import { tClient } from "@/features/auth/i18n/auth-i18n.client";
import { getAuthErrorMessage } from "@/features/auth/utils/auth-errors";
import { getRedirectAfterAuth } from "@/features/auth/utils/redirect-after-auth";
import type { WorkspaceSummary } from "@/features/auth/types/workspace";

type WorkspaceSelectPanelProps = { returnUrl?: string };

export function WorkspaceSelectPanel({ returnUrl }: WorkspaceSelectPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [workspaces, setWorkspaces] = useState<WorkspaceSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    authBrowserApi
      .getWorkspaces()
      .then((items) => {
        if (active) {
          setWorkspaces(items);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setFormError(getAuthErrorMessage(error));
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  function switchWorkspace(tenantId: string): void {
    startTransition(async () => {
      setFormError(null);

      try {
        const result = await authBrowserApi.switchWorkspace(tenantId);
        router.replace(result.redirectUrl ?? getRedirectAfterAuth(returnUrl));
      } catch (error) {
        setFormError(getAuthErrorMessage(error));
      }
    });
  }

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground"
      >
        <Spinner /> {tClient("workspace.loading")}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {formError ? (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      {workspaces.length === 0 ? (
        <Alert>
          <AlertDescription>{tClient("workspace.none")}</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-3">
          {workspaces.map((workspace) => (
            <Button
              key={workspace.tenantId}
              type="button"
              disabled={isPending}
              onClick={() => switchWorkspace(workspace.tenantId)}
              variant="outline"
              className="h-auto w-full justify-between px-4 py-4 text-left"
            >
              <span>
                <span className="block text-sm font-medium">{workspace.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {workspace.role ?? tClient("workspace.defaultRole")}
                </span>
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {tClient("action.select")}
              </span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
