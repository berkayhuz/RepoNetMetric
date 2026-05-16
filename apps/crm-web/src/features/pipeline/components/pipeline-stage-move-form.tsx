"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button, Field, FieldContent, FieldError, FieldLabel } from "@netmetric/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@netmetric/ui/client";

import {
  initialCrmMutationState,
  type CrmMutationState,
} from "@/features/shared/actions/mutation-state";
import { opportunityStageOptions } from "@/features/shared/forms/options";
import { tCrmClient } from "@/lib/i18n/crm-i18n";

function MoveSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" variant="outline" disabled={pending} aria-busy={pending}>
      {pending
        ? tCrmClient("crm.pipeline.actions.moving")
        : tCrmClient("crm.pipeline.actions.move")}
    </Button>
  );
}

export function PipelineStageMoveForm({
  opportunityId,
  action,
  currentStage,
}: Readonly<{
  opportunityId: string;
  currentStage: number;
  action: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
}>) {
  const [state, formAction] = useActionState(action, initialCrmMutationState);
  const [newStage, setNewStage] = useState(String(currentStage));

  return (
    <form action={formAction} className="space-y-2">
      <Field>
        <FieldLabel htmlFor={`pipeline-stage-${opportunityId}`}>
          {tCrmClient("crm.pipeline.fields.moveToStage")}
        </FieldLabel>
        <FieldContent>
          <input type="hidden" name="newStage" value={newStage} />
          <Select
            value={newStage}
            onValueChange={(value) => setNewStage(value ?? String(currentStage))}
          >
            <SelectTrigger id={`pipeline-stage-${opportunityId}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {opportunityStageOptions.map((option) => (
                <SelectItem key={`${opportunityId}-${option.value}`} value={String(option.value)}>
                  {tCrmClient(`crm.opportunities.stage.${option.value}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{state.fieldErrors?.newStage?.[0]}</FieldError>
        </FieldContent>
      </Field>
      {state.status === "error" && state.message ? (
        <p className="text-xs text-destructive">{state.message}</p>
      ) : null}
      {state.status === "success" && state.message ? (
        <p className="text-xs text-green-700 dark:text-green-400">{state.message}</p>
      ) : null}
      <MoveSubmitButton />
    </form>
  );
}
