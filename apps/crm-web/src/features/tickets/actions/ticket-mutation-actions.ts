"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { isGuid } from "@/features/shared/data/guid";
import { emptyToNull } from "@/features/shared/forms/schema-primitives";
import { crmApiClient, type TicketUpdateRequest, type TicketUpsertRequest } from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import {
  ticketFormSchema,
  type TicketFormInput,
  type TicketFormValues,
} from "../forms/ticket-form-schema";

function mapZodErrors(fieldErrors: Record<string, string[] | undefined>): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(fieldErrors).flatMap(([key, errors]) => {
      if (!errors || errors.length === 0) {
        return [];
      }

      return [[key, errors] as const];
    }),
  );
}

function toApiDateTime(value?: string): string | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.valueOf())) {
    return null;
  }

  return parsed.toISOString();
}

function mapTicketPayload(input: TicketFormValues): TicketUpsertRequest {
  return {
    subject: input.subject.trim(),
    description: emptyToNull(input.description),
    ticketType: input.ticketType,
    channel: input.channel,
    priority: input.priority,
    assignedUserId: emptyToNull(input.assignedUserId),
    customerId: emptyToNull(input.customerId),
    contactId: emptyToNull(input.contactId),
    ticketCategoryId: emptyToNull(input.ticketCategoryId),
    slaPolicyId: emptyToNull(input.slaPolicyId),
    firstResponseDueAt: toApiDateTime(input.firstResponseDueAt),
    resolveDueAt: toApiDateTime(input.resolveDueAt),
    notes: emptyToNull(input.notes),
  };
}

function mapTicketUpdatePayload(input: TicketFormValues): TicketUpdateRequest {
  return {
    ...mapTicketPayload(input),
    rowVersion: emptyToNull(input.rowVersion),
  };
}

export async function createTicketAction(input: TicketFormInput): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  const parsed = ticketFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    const created = await crmApiClient.createTicket(mapTicketPayload(parsed.data), options);

    revalidatePath("/tickets");
    revalidatePath(`/tickets/${created.id}`);

    return {
      status: "success",
      message: "Ticket created successfully.",
      redirectTo: `/tickets/${created.id}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, "/tickets/new");
  }
}

export async function updateTicketAction(
  ticketId: string,
  input: TicketFormInput,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  if (!isGuid(ticketId)) {
    return {
      status: "error",
      message: "Invalid ticket id.",
    };
  }

  const parsed = ticketFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.updateTicket(ticketId, mapTicketUpdatePayload(parsed.data), options);

    revalidatePath("/tickets");
    revalidatePath(`/tickets/${ticketId}`);
    revalidatePath(`/tickets/${ticketId}/edit`);

    return {
      status: "success",
      message: "Ticket updated successfully.",
      redirectTo: `/tickets/${ticketId}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/tickets/${ticketId}/edit`);
  }
}

export async function deleteTicketAction(
  ticketId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  await requireCrmSession(`/tickets/${ticketId}`);

  if (!isGuid(ticketId)) {
    return { status: "error", message: "Invalid ticket id." };
  }

  if (formData.get("confirm") !== "delete-ticket") {
    return { status: "error", message: "Delete confirmation is invalid." };
  }

  const confirmText = formData.get("confirmText");
  if (typeof confirmText !== "string" || confirmText.trim().length === 0) {
    return {
      status: "error",
      message: "Please type the record name to confirm deletion.",
      fieldErrors: { confirmText: ["Confirmation text is required."] },
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.deleteTicket(ticketId, options);

    revalidatePath("/tickets");
    revalidatePath(`/tickets/${ticketId}`);
    redirect("/tickets");
  } catch (error) {
    const mapped = mapCrmMutationErrorToState(error, `/tickets/${ticketId}`);
    if (mapped.message === "The requested record no longer exists.") {
      return {
        status: "error",
        message: "Ticket is already removed or no longer available.",
      };
    }

    return mapped;
  }
}
