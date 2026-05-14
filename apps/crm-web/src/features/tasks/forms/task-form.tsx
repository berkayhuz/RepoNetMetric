"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
  Input,
  NativeSelect,
  NativeSelectOption,
  Textarea,
} from "@netmetric/ui";
import { useForm } from "react-hook-form";

import { CrmFormErrorSummary } from "@/components/forms/crm-form-error-summary";
import { CrmMutationResult } from "@/components/forms/crm-mutation-result";
import { initialCrmMutationState } from "@/features/shared/actions/mutation-state";
import { priorityOptions } from "@/features/shared/forms/options";

import { createWorkTaskAction } from "../actions/work-management-create-actions";
import { taskFormSchema, type TaskFormInput } from "./task-form-schema";

const defaults: TaskFormInput = {
  title: "",
  description: "",
  ownerUserId: "",
  dueAtUtc: "",
  priority: 1,
};

export function TaskForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(initialCrmMutationState);
  const form = useForm<TaskFormInput>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: defaults,
  });

  const onSubmit = (values: TaskFormInput) => {
    setResult(initialCrmMutationState);
    startTransition(async () => {
      const response = await createWorkTaskAction(values);
      setResult(response);
      if (response.fieldErrors) {
        for (const [field, errors] of Object.entries(response.fieldErrors)) {
          const first = errors[0];
          if (first) form.setError(field as keyof TaskFormInput, { message: first });
        }
      }
      if (response.status === "success" && response.redirectTo) {
        router.push(response.redirectTo);
        router.refresh();
      }
    });
  };

  return (
    <form className="space-y-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <CrmFormErrorSummary
        {...(result.status === "error" && result.message ? { message: result.message } : {})}
        {...(result.fieldErrors ? { errors: result.fieldErrors } : {})}
      />
      <CrmMutationResult state={result} />

      <FieldSet className="grid gap-4 sm:grid-cols-2">
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="task-title">Title</FieldLabel>
          <FieldContent>
            <Input id="task-title" {...form.register("title")} />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="task-description">Description</FieldLabel>
          <FieldContent>
            <Textarea id="task-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="task-ownerUserId">Owner user ID</FieldLabel>
          <FieldContent>
            <Input id="task-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="task-dueAtUtc">Due at (UTC)</FieldLabel>
          <FieldContent>
            <Input id="task-dueAtUtc" type="datetime-local" {...form.register("dueAtUtc")} />
            <FieldError>{form.formState.errors.dueAtUtc?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="task-priority">Priority</FieldLabel>
          <FieldContent>
            <NativeSelect id="task-priority" {...form.register("priority")}>
              {priorityOptions.map((o) => (
                <NativeSelectOption key={`task-priority-${o.value}`} value={String(o.value)}>
                  {o.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.priority?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? "Creating..." : "Create task"}
        </Button>
      </div>
    </form>
  );
}
