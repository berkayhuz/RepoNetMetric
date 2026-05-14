"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Button,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  NativeSelect,
  NativeSelectOption,
} from "@netmetric/ui";

import {
  initialCrmMutationState,
  type CrmMutationState,
} from "@/features/shared/actions/mutation-state";
import { opportunityStageOptions } from "@/features/shared/forms/options";

function MoveSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" variant="outline" disabled={pending} aria-busy={pending}>
      {pending ? "Moving..." : "Move"}
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

  return (
    <form action={formAction} className="space-y-2">
      <Field>
        <FieldLabel htmlFor={`pipeline-stage-${opportunityId}`}>Move to stage</FieldLabel>
        <FieldContent>
          <NativeSelect
            id={`pipeline-stage-${opportunityId}`}
            name="newStage"
            defaultValue={String(currentStage)}
          >
            {opportunityStageOptions.map((option) => (
              <NativeSelectOption
                key={`${opportunityId}-${option.value}`}
                value={String(option.value)}
              >
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
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
