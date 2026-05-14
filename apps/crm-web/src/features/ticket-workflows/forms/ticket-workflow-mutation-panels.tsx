"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldLabel,
  Input,
  NativeSelect,
  NativeSelectOption,
  Textarea,
} from "@netmetric/ui";

import { CrmMutationResult } from "@/components/forms/crm-mutation-result";
import {
  initialCrmMutationState,
  type CrmMutationState,
} from "@/features/shared/actions/mutation-state";

function SubmitButton({ label }: Readonly<{ label: string }>) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-busy={pending}>
      {pending ? "Processing..." : label}
    </Button>
  );
}

export function TicketWorkflowMutationPanels({
  createQueueAction,
  updateQueueAction,
  deleteQueueAction,
  assignQueueAction,
  assignOwnerAction,
  statusChangeAction,
}: Readonly<{
  createQueueAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
  updateQueueAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
  deleteQueueAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
  assignQueueAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
  assignOwnerAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
  statusChangeAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
}>) {
  const [createQueueState, createQueueFormAction] = useActionState(
    createQueueAction,
    initialCrmMutationState,
  );
  const [updateQueueState, updateQueueFormAction] = useActionState(
    updateQueueAction,
    initialCrmMutationState,
  );
  const [deleteQueueState, deleteQueueFormAction] = useActionState(
    deleteQueueAction,
    initialCrmMutationState,
  );
  const [assignQueueState, assignQueueFormAction] = useActionState(
    assignQueueAction,
    initialCrmMutationState,
  );
  const [assignOwnerState, assignOwnerFormAction] = useActionState(
    assignOwnerAction,
    initialCrmMutationState,
  );
  const [statusChangeState, statusChangeFormAction] = useActionState(
    statusChangeAction,
    initialCrmMutationState,
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Queue</CardTitle>
          <CardDescription>Create ticket workflow queue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={createQueueState} />
          <form action={createQueueFormAction} className="space-y-3">
            <Field>
              <FieldLabel htmlFor="create-queue-code">Code</FieldLabel>
              <FieldContent>
                <Input id="create-queue-code" name="code" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="create-queue-name">Name</FieldLabel>
              <FieldContent>
                <Input id="create-queue-name" name="name" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="create-queue-description">Description</FieldLabel>
              <FieldContent>
                <Textarea id="create-queue-description" name="description" rows={3} />
              </FieldContent>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="create-queue-strategy">Assignment Strategy</FieldLabel>
                <FieldContent>
                  <NativeSelect
                    id="create-queue-strategy"
                    name="assignmentStrategy"
                    defaultValue="1"
                  >
                    <NativeSelectOption value="1">Manual</NativeSelectOption>
                    <NativeSelectOption value="2">RoundRobin</NativeSelectOption>
                    <NativeSelectOption value="3">LeastLoaded</NativeSelectOption>
                  </NativeSelect>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="create-queue-default">Default Queue</FieldLabel>
                <FieldContent>
                  <NativeSelect id="create-queue-default" name="isDefault" defaultValue="false">
                    <NativeSelectOption value="false">No</NativeSelectOption>
                    <NativeSelectOption value="true">Yes</NativeSelectOption>
                  </NativeSelect>
                </FieldContent>
              </Field>
            </div>
            <SubmitButton label="Create queue" />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Queue</CardTitle>
          <CardDescription>Update queue by GUID.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={updateQueueState} />
          <form action={updateQueueFormAction} className="space-y-3">
            <Field>
              <FieldLabel htmlFor="update-queue-id">Queue ID</FieldLabel>
              <FieldContent>
                <Input id="update-queue-id" name="queueId" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="update-queue-name">Name</FieldLabel>
              <FieldContent>
                <Input id="update-queue-name" name="name" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="update-queue-description">Description</FieldLabel>
              <FieldContent>
                <Textarea id="update-queue-description" name="description" rows={3} />
              </FieldContent>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="update-queue-strategy">Assignment Strategy</FieldLabel>
                <FieldContent>
                  <NativeSelect
                    id="update-queue-strategy"
                    name="assignmentStrategy"
                    defaultValue="1"
                  >
                    <NativeSelectOption value="1">Manual</NativeSelectOption>
                    <NativeSelectOption value="2">RoundRobin</NativeSelectOption>
                    <NativeSelectOption value="3">LeastLoaded</NativeSelectOption>
                  </NativeSelect>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="update-queue-default">Default Queue</FieldLabel>
                <FieldContent>
                  <NativeSelect id="update-queue-default" name="isDefault" defaultValue="false">
                    <NativeSelectOption value="false">No</NativeSelectOption>
                    <NativeSelectOption value="true">Yes</NativeSelectOption>
                  </NativeSelect>
                </FieldContent>
              </Field>
            </div>
            <SubmitButton label="Update queue" />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete Queue</CardTitle>
          <CardDescription>Soft-delete queue with explicit confirmation marker.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={deleteQueueState} />
          <form action={deleteQueueFormAction} className="space-y-3">
            <input type="hidden" name="confirm" value="delete-ticket-workflow-queue" />
            <Field>
              <FieldLabel htmlFor="delete-queue-id">Queue ID</FieldLabel>
              <FieldContent>
                <Input id="delete-queue-id" name="queueId" />
              </FieldContent>
            </Field>
            <SubmitButton label="Delete queue" />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assign Queue</CardTitle>
          <CardDescription>Assign or reassign ticket queue by GUID inputs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={assignQueueState} />
          <form action={assignQueueFormAction} className="space-y-3">
            <Field>
              <FieldLabel htmlFor="assign-queue-ticket">Ticket ID</FieldLabel>
              <FieldContent>
                <Input id="assign-queue-ticket" name="ticketId" />
              </FieldContent>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="assign-queue-prev">Previous Queue ID</FieldLabel>
                <FieldContent>
                  <Input id="assign-queue-prev" name="previousQueueId" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="assign-queue-new">New Queue ID</FieldLabel>
                <FieldContent>
                  <Input id="assign-queue-new" name="newQueueId" />
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="assign-queue-reason">Reason</FieldLabel>
              <FieldContent>
                <Textarea id="assign-queue-reason" name="reason" rows={3} />
              </FieldContent>
            </Field>
            <SubmitButton label="Assign queue" />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assign Owner</CardTitle>
          <CardDescription>Assign or reassign ticket owner by GUID inputs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={assignOwnerState} />
          <form action={assignOwnerFormAction} className="space-y-3">
            <Field>
              <FieldLabel htmlFor="assign-owner-ticket">Ticket ID</FieldLabel>
              <FieldContent>
                <Input id="assign-owner-ticket" name="ticketId" />
              </FieldContent>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="assign-owner-prev">Previous Owner ID</FieldLabel>
                <FieldContent>
                  <Input id="assign-owner-prev" name="previousOwnerUserId" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="assign-owner-new">New Owner ID</FieldLabel>
                <FieldContent>
                  <Input id="assign-owner-new" name="newOwnerUserId" />
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="assign-owner-queue">Queue ID</FieldLabel>
              <FieldContent>
                <Input id="assign-owner-queue" name="queueId" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="assign-owner-reason">Reason</FieldLabel>
              <FieldContent>
                <Textarea id="assign-owner-reason" name="reason" rows={3} />
              </FieldContent>
            </Field>
            <SubmitButton label="Assign owner" />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Ticket Status</CardTitle>
          <CardDescription>
            Record a status transition using explicit confirmation marker.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={statusChangeState} />
          <form action={statusChangeFormAction} className="space-y-3">
            <input type="hidden" name="confirm" value="change-ticket-workflow-status" />
            <Field>
              <FieldLabel htmlFor="status-ticket-id">Ticket ID</FieldLabel>
              <FieldContent>
                <Input id="status-ticket-id" name="ticketId" />
              </FieldContent>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="status-prev">Previous Status</FieldLabel>
                <FieldContent>
                  <Input id="status-prev" name="previousStatus" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="status-new">New Status</FieldLabel>
                <FieldContent>
                  <Input id="status-new" name="newStatus" />
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="status-note">Note</FieldLabel>
              <FieldContent>
                <Textarea id="status-note" name="note" rows={3} />
              </FieldContent>
            </Field>
            <SubmitButton label="Change ticket status" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
