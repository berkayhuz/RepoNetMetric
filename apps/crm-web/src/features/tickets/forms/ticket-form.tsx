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
import {
  priorityOptions,
  ticketChannelOptions,
  ticketTypeOptions,
} from "@/features/shared/forms/options";

import { createTicketAction, updateTicketAction } from "../actions/ticket-mutation-actions";
import { ticketFormSchema, type TicketFormInput } from "./ticket-form-schema";

type TicketFormProps = {
  mode: "create" | "edit";
  ticketId?: string;
  initialValues?: Partial<TicketFormInput>;
};

const defaults: TicketFormInput = {
  subject: "",
  description: "",
  ticketType: 0,
  channel: 0,
  priority: 1,
  assignedUserId: "",
  customerId: "",
  contactId: "",
  ticketCategoryId: "",
  slaPolicyId: "",
  firstResponseDueAt: "",
  resolveDueAt: "",
  notes: "",
  rowVersion: "",
};

export function TicketForm({ mode, ticketId, initialValues }: Readonly<TicketFormProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(initialCrmMutationState);
  const form = useForm<TicketFormInput>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: { ...defaults, ...initialValues },
  });

  const onSubmit = (values: TicketFormInput) => {
    setResult(initialCrmMutationState);
    startTransition(async () => {
      const response =
        mode === "create"
          ? await createTicketAction(values)
          : await updateTicketAction(ticketId ?? "", values);

      setResult(response);

      if (response.fieldErrors) {
        for (const [field, errors] of Object.entries(response.fieldErrors)) {
          const first = errors[0];
          if (first) form.setError(field as keyof TicketFormInput, { message: first });
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
          <FieldLabel htmlFor="ticket-subject">Subject</FieldLabel>
          <FieldContent>
            <Input id="ticket-subject" {...form.register("subject")} />
            <FieldError>{form.formState.errors.subject?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-type">Type</FieldLabel>
          <FieldContent>
            <NativeSelect id="ticket-type" {...form.register("ticketType")}>
              {ticketTypeOptions.map((option) => (
                <NativeSelectOption
                  key={`ticket-type-${option.value}`}
                  value={String(option.value)}
                >
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.ticketType?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-channel">Channel</FieldLabel>
          <FieldContent>
            <NativeSelect id="ticket-channel" {...form.register("channel")}>
              {ticketChannelOptions.map((option) => (
                <NativeSelectOption
                  key={`ticket-channel-${option.value}`}
                  value={String(option.value)}
                >
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.channel?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-priority">Priority</FieldLabel>
          <FieldContent>
            <NativeSelect id="ticket-priority" {...form.register("priority")}>
              {priorityOptions.map((option) => (
                <NativeSelectOption
                  key={`ticket-priority-${option.value}`}
                  value={String(option.value)}
                >
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{form.formState.errors.priority?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-assignedUserId">Assigned user ID</FieldLabel>
          <FieldContent>
            <Input id="ticket-assignedUserId" {...form.register("assignedUserId")} />
            <FieldError>{form.formState.errors.assignedUserId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-customerId">Customer ID</FieldLabel>
          <FieldContent>
            <Input id="ticket-customerId" {...form.register("customerId")} />
            <FieldError>{form.formState.errors.customerId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-contactId">Contact ID</FieldLabel>
          <FieldContent>
            <Input id="ticket-contactId" {...form.register("contactId")} />
            <FieldError>{form.formState.errors.contactId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-ticketCategoryId">Ticket category ID</FieldLabel>
          <FieldContent>
            <Input id="ticket-ticketCategoryId" {...form.register("ticketCategoryId")} />
            <FieldError>{form.formState.errors.ticketCategoryId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-slaPolicyId">SLA policy ID</FieldLabel>
          <FieldContent>
            <Input id="ticket-slaPolicyId" {...form.register("slaPolicyId")} />
            <FieldError>{form.formState.errors.slaPolicyId?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-firstResponseDueAt">First response due</FieldLabel>
          <FieldContent>
            <Input
              id="ticket-firstResponseDueAt"
              type="datetime-local"
              {...form.register("firstResponseDueAt")}
            />
            <FieldError>{form.formState.errors.firstResponseDueAt?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-resolveDueAt">Resolve due</FieldLabel>
          <FieldContent>
            <Input
              id="ticket-resolveDueAt"
              type="datetime-local"
              {...form.register("resolveDueAt")}
            />
            <FieldError>{form.formState.errors.resolveDueAt?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <FieldSet className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="ticket-description">Description</FieldLabel>
          <FieldContent>
            <Textarea id="ticket-description" rows={4} {...form.register("description")} />
            <FieldError>{form.formState.errors.description?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="ticket-notes">Notes</FieldLabel>
          <FieldContent>
            <Textarea id="ticket-notes" rows={4} {...form.register("notes")} />
            <FieldError>{form.formState.errors.notes?.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      {mode === "edit" ? <input type="hidden" {...form.register("rowVersion")} /> : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? "Saving..." : mode === "create" ? "Create ticket" : "Save ticket"}
        </Button>
      </div>
    </form>
  );
}
