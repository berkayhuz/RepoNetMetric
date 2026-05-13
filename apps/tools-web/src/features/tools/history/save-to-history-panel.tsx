"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Alert, AlertDescription, AlertTitle, Button } from "@netmetric/ui";

import {
  initialToolHistoryActionState,
  saveToHistoryAction,
} from "@/features/tools/actions/save-to-history-action";
import type { ToolHistoryActionState } from "@/features/tools/actions/tool-history-action-state";
import { toolsEnv } from "@/lib/tools-env";

type SavePayload = {
  outputFile: File;
  inputSummaryJson: string;
};

type SaveToHistoryPanelProps = {
  toolSlug: "qr-generator" | "png-to-jpg" | "jpg-to-png";
  isAuthenticated: boolean;
  canSave: boolean;
  getPayload: () => Promise<SavePayload | null>;
};

export function SaveToHistoryPanel({
  toolSlug,
  isAuthenticated,
  canSave,
  getPayload,
}: SaveToHistoryPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ToolHistoryActionState>(initialToolHistoryActionState);

  function onSaveClick(): void {
    startTransition(() => {
      void (async () => {
        const payload = await getPayload();
        if (!payload) {
          setState({ status: "error", message: "Generate output before saving to history." });
          return;
        }

        const formData = new FormData();
        formData.set("toolSlug", toolSlug);
        formData.set("inputSummaryJson", payload.inputSummaryJson);
        formData.set("outputFile", payload.outputFile, payload.outputFile.name);

        const result = await saveToHistoryAction(state, formData);
        setState(result);
      })();
    });
  }

  if (!isAuthenticated) {
    return (
      <Alert className="mt-6">
        <AlertTitle>Sign in to save history</AlertTitle>
        <AlertDescription>
          You can use this tool as a guest and download locally. Sign in to save runs and artifacts.
          <span className="mt-3 block">
            <Button asChild size="sm">
              <Link href={toolsEnv.authUrl}>Sign in</Link>
            </Button>
          </span>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <Button type="button" onClick={onSaveClick} disabled={!canSave || isPending}>
        {isPending ? "Saving..." : "Save to history"}
      </Button>

      {state.status !== "idle" ? (
        <Alert role="status" aria-live="polite">
          <AlertTitle>{state.status === "success" ? "Saved" : "Save failed"}</AlertTitle>
          <AlertDescription>
            {state.message}
            {state.status === "success" && state.runId ? (
              <span className="mt-2 block">
                <Link href={`/history/${state.runId}`} className="underline underline-offset-4">
                  View saved run
                </Link>
              </span>
            ) : null}
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
