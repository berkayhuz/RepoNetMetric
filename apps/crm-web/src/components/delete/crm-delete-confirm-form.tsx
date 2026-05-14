"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Button,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from "@netmetric/ui";

import {
  initialCrmMutationState,
  type CrmMutationState,
} from "@/features/shared/actions/mutation-state";

import { CrmDeleteActionResult } from "./crm-delete-action-result";

function SubmitButton({ entityLabel }: Readonly<{ entityLabel: string }>) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" disabled={pending} aria-busy={pending}>
      {pending ? `Deleting ${entityLabel.toLowerCase()}...` : `Delete ${entityLabel}`}
    </Button>
  );
}

export function CrmDeleteConfirmForm({
  entityLabel,
  entityName,
  confirmValue,
  action,
}: Readonly<{
  entityLabel: string;
  entityName: string;
  confirmValue: string;
  action: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
}>) {
  const [state, formAction] = useActionState(action, initialCrmMutationState);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="confirm" value={confirmValue} />
      <CrmDeleteActionResult state={state} />
      <Field>
        <FieldLabel htmlFor={`delete-confirm-${confirmValue}`}>Confirmation</FieldLabel>
        <FieldContent>
          <Input
            id={`delete-confirm-${confirmValue}`}
            name="confirmText"
            defaultValue=""
            placeholder={entityName}
            aria-invalid={Boolean(state.fieldErrors?.confirmText?.[0])}
            aria-describedby={
              state.fieldErrors?.confirmText?.[0]
                ? `delete-confirm-${confirmValue}-error`
                : undefined
            }
          />
          <FieldDescription>
            Type <strong>{entityName}</strong> to confirm permanent removal.
          </FieldDescription>
          <FieldError id={`delete-confirm-${confirmValue}-error`}>
            {state.fieldErrors?.confirmText?.[0]}
          </FieldError>
        </FieldContent>
      </Field>
      <SubmitButton entityLabel={entityLabel} />
    </form>
  );
}
