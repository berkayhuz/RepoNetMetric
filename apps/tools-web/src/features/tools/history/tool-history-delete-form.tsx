"use client";

import { useActionState } from "react";
import { Alert, AlertDescription, AlertTitle, Button, Input } from "@netmetric/ui";

import {
  deleteToolRunAction,
  initialToolHistoryActionState,
} from "@/features/tools/actions/delete-tool-run-action";

type ToolHistoryDeleteFormProps = {
  runId: string;
};

export function ToolHistoryDeleteForm({ runId }: ToolHistoryDeleteFormProps) {
  const [state, formAction, isPending] = useActionState(
    deleteToolRunAction,
    initialToolHistoryActionState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="runId" value={runId} />

      <div className="space-y-2">
        <label htmlFor={`delete-confirm-${runId}`} className="text-sm font-medium">
          Type <code>delete-tool-run</code> to confirm
        </label>
        <Input id={`delete-confirm-${runId}`} name="confirm" autoComplete="off" required />
      </div>

      <Button type="submit" variant="destructive" disabled={isPending}>
        {isPending ? "Deleting..." : "Delete run"}
      </Button>

      {state.status !== "idle" ? (
        <Alert role="status" aria-live="polite">
          <AlertTitle>{state.status === "success" ? "Deleted" : "Delete failed"}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  );
}
