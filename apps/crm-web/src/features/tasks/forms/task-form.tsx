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
  Textarea,
} from "@netmetric/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@netmetric/ui/client";
import { useForm } from "react-hook-form";

import { CrmFormErrorSummary } from "@/components/forms/crm-form-error-summary";
import { CrmMutationResult } from "@/components/forms/crm-mutation-result";
import { initialCrmMutationState } from "@/features/shared/actions/mutation-state";
import { priorityOptions } from "@/features/shared/forms/options";
import { tCrmClient } from "@/lib/i18n/crm-i18n";

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
          <FieldLabel htmlFor="task-title">{tCrmClient("crm.tasks.fields.title")}</FieldLabel>
          <FieldContent>
            <Input id="task-title" {...form.register("title")} />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="task-description">
            {tCrmClient("crm.tasks.fields.description")}
          </FieldLabel>
          <FieldContent>
            <Textarea id="task-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="task-ownerUserId">
            {tCrmClient("crm.tasks.fields.ownerUserId")}
          </FieldLabel>
          <FieldContent>
            <Input id="task-ownerUserId" {...form.register("ownerUserId")} />
            <FieldError>{form.formState.errors.ownerUserId?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="task-dueAtUtc">{tCrmClient("crm.tasks.fields.dueAtUtc")}</FieldLabel>
          <FieldContent>
            <Input id="task-dueAtUtc" type="datetime-local" {...form.register("dueAtUtc")} />
            <FieldError>{form.formState.errors.dueAtUtc?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="task-priority">{tCrmClient("crm.tasks.fields.priority")}</FieldLabel>
          <FieldContent>
            <Select
              value={String(form.watch("priority"))}
              onValueChange={(value) =>
                form.setValue("priority", Number(value), {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger id="task-priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((o) => (
                  <SelectItem key={`task-priority-${o.value}`} value={String(o.value)}>
                    {tCrmClient(`crm.common.priority.${o.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{form.formState.errors.priority?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          {tCrmClient("crm.forms.actions.cancel")}
        </Button>
        <Button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending
            ? tCrmClient("crm.forms.actions.creating")
            : tCrmClient("crm.tasks.actions.create")}
        </Button>
      </div>
    </form>
  );
}
