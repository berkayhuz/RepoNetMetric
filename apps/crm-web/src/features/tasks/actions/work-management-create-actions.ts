"use server";

import { revalidatePath } from "next/cache";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { emptyToNull } from "@/features/shared/forms/schema-primitives";
import {
  crmApiClient,
  type CreateWorkTaskRequest,
  type ScheduleMeetingRequest,
} from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import {
  meetingFormSchema,
  taskFormSchema,
  type MeetingFormInput,
  type MeetingFormValues,
  type TaskFormInput,
  type TaskFormValues,
} from "../forms/task-form-schema";

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

function toIsoUtc(value: string): string | null {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function mapTaskPayload(input: TaskFormValues): CreateWorkTaskRequest | null {
  const dueAtUtc = toIsoUtc(input.dueAtUtc);
  if (!dueAtUtc) {
    return null;
  }

  return {
    title: input.title.trim(),
    description: emptyToNull(input.description) ?? "",
    ownerUserId: emptyToNull(input.ownerUserId),
    dueAtUtc,
    priority: input.priority,
  };
}

function mapMeetingPayload(input: MeetingFormValues): ScheduleMeetingRequest | null {
  const startsAtUtc = toIsoUtc(input.startsAtUtc);
  const endsAtUtc = toIsoUtc(input.endsAtUtc);
  if (!startsAtUtc || !endsAtUtc) {
    return null;
  }

  return {
    title: input.title.trim(),
    startsAtUtc,
    endsAtUtc,
    organizerEmail: (input.organizerEmail ?? "").trim(),
    attendeeSummary: emptyToNull(input.attendeeSummary) ?? "",
    requiresExternalSync: input.requiresExternalSync,
  };
}

export async function createWorkTaskAction(input: TaskFormInput): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  const parsed = taskFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  const payload = mapTaskPayload(parsed.data);
  if (!payload) {
    return {
      status: "error",
      message: "Due date is invalid.",
      fieldErrors: { dueAtUtc: ["Provide a valid date-time value."] },
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.createWorkTask(payload, options);

    revalidatePath("/tasks");
    revalidatePath("/work-management");

    return {
      status: "success",
      message: "Task created successfully.",
      redirectTo: "/tasks",
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, "/tasks/new");
  }
}

export async function scheduleWorkMeetingAction(
  input: MeetingFormInput,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  const parsed = meetingFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  const payload = mapMeetingPayload(parsed.data);
  if (!payload) {
    return {
      status: "error",
      message: "Meeting start/end values are invalid.",
      fieldErrors: {
        startsAtUtc: ["Provide a valid date-time value."],
        endsAtUtc: ["Provide a valid date-time value."],
      },
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.scheduleWorkMeeting(payload, options);

    revalidatePath("/tasks");
    revalidatePath("/work-management");

    return {
      status: "success",
      message: "Meeting scheduled successfully.",
      redirectTo: "/tasks",
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, "/tasks/meetings/new");
  }
}
