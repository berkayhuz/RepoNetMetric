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

export function TicketSlaMutationPanels({
  createPolicyAction,
  updatePolicyAction,
  deletePolicyAction,
  createRuleAction,
  updateRuleAction,
}: Readonly<{
  createPolicyAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
  updatePolicyAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
  deletePolicyAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
  createRuleAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
  updateRuleAction: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
}>) {
  const [createPolicyState, createPolicyFormAction] = useActionState(
    createPolicyAction,
    initialCrmMutationState,
  );
  const [updatePolicyState, updatePolicyFormAction] = useActionState(
    updatePolicyAction,
    initialCrmMutationState,
  );
  const [deletePolicyState, deletePolicyFormAction] = useActionState(
    deletePolicyAction,
    initialCrmMutationState,
  );
  const [createRuleState, createRuleFormAction] = useActionState(
    createRuleAction,
    initialCrmMutationState,
  );
  const [updateRuleState, updateRuleFormAction] = useActionState(
    updateRuleAction,
    initialCrmMutationState,
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create SLA Policy</CardTitle>
          <CardDescription>Create a new ticket SLA policy.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={createPolicyState} />
          <form action={createPolicyFormAction} className="space-y-3">
            <Field>
              <FieldLabel htmlFor="create-policy-name">Name</FieldLabel>
              <FieldContent>
                <Input id="create-policy-name" name="name" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="create-policy-category">Ticket Category ID</FieldLabel>
              <FieldContent>
                <Input id="create-policy-category" name="ticketCategoryId" />
              </FieldContent>
            </Field>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="create-policy-priority">Priority</FieldLabel>
                <FieldContent>
                  <Input
                    id="create-policy-priority"
                    name="priority"
                    type="number"
                    defaultValue="1"
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="create-policy-first">First Response Min</FieldLabel>
                <FieldContent>
                  <Input
                    id="create-policy-first"
                    name="firstResponseTargetMinutes"
                    type="number"
                    defaultValue="30"
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="create-policy-resolution">Resolution Min</FieldLabel>
                <FieldContent>
                  <Input
                    id="create-policy-resolution"
                    name="resolutionTargetMinutes"
                    type="number"
                    defaultValue="240"
                  />
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="create-policy-default">Default Policy</FieldLabel>
              <FieldContent>
                <NativeSelect id="create-policy-default" name="isDefault" defaultValue="false">
                  <NativeSelectOption value="false">No</NativeSelectOption>
                  <NativeSelectOption value="true">Yes</NativeSelectOption>
                </NativeSelect>
              </FieldContent>
            </Field>
            <SubmitButton label="Create SLA policy" />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update SLA Policy</CardTitle>
          <CardDescription>Update an existing policy by GUID.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={updatePolicyState} />
          <form action={updatePolicyFormAction} className="space-y-3">
            <Field>
              <FieldLabel htmlFor="update-policy-id">Policy ID</FieldLabel>
              <FieldContent>
                <Input id="update-policy-id" name="policyId" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="update-policy-name">Name</FieldLabel>
              <FieldContent>
                <Input id="update-policy-name" name="name" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="update-policy-category">Ticket Category ID</FieldLabel>
              <FieldContent>
                <Input id="update-policy-category" name="ticketCategoryId" />
              </FieldContent>
            </Field>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="update-policy-priority">Priority</FieldLabel>
                <FieldContent>
                  <Input
                    id="update-policy-priority"
                    name="priority"
                    type="number"
                    defaultValue="1"
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="update-policy-first">First Response Min</FieldLabel>
                <FieldContent>
                  <Input
                    id="update-policy-first"
                    name="firstResponseTargetMinutes"
                    type="number"
                    defaultValue="30"
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="update-policy-resolution">Resolution Min</FieldLabel>
                <FieldContent>
                  <Input
                    id="update-policy-resolution"
                    name="resolutionTargetMinutes"
                    type="number"
                    defaultValue="240"
                  />
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="update-policy-default">Default Policy</FieldLabel>
              <FieldContent>
                <NativeSelect id="update-policy-default" name="isDefault" defaultValue="false">
                  <NativeSelectOption value="false">No</NativeSelectOption>
                  <NativeSelectOption value="true">Yes</NativeSelectOption>
                </NativeSelect>
              </FieldContent>
            </Field>
            <SubmitButton label="Update SLA policy" />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete SLA Policy</CardTitle>
          <CardDescription>Soft-delete policy with explicit confirmation marker.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={deletePolicyState} />
          <form action={deletePolicyFormAction} className="space-y-3">
            <input type="hidden" name="confirm" value="delete-sla-policy" />
            <Field>
              <FieldLabel htmlFor="delete-policy-id">Policy ID</FieldLabel>
              <FieldContent>
                <Input id="delete-policy-id" name="policyId" />
              </FieldContent>
            </Field>
            <SubmitButton label="Delete SLA policy" />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create Escalation Rule</CardTitle>
          <CardDescription>Create a rule for policy metrics and actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={createRuleState} />
          <form action={createRuleFormAction} className="space-y-3">
            <Field>
              <FieldLabel htmlFor="create-rule-policy">SLA Policy ID</FieldLabel>
              <FieldContent>
                <Input id="create-rule-policy" name="slaPolicyId" />
              </FieldContent>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="create-rule-metric">Metric Type</FieldLabel>
                <FieldContent>
                  <NativeSelect
                    id="create-rule-metric"
                    name="metricType"
                    defaultValue="FirstResponse"
                  >
                    <NativeSelectOption value="FirstResponse">FirstResponse</NativeSelectOption>
                    <NativeSelectOption value="Resolution">Resolution</NativeSelectOption>
                  </NativeSelect>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="create-rule-action">Action Type</FieldLabel>
                <FieldContent>
                  <NativeSelect
                    id="create-rule-action"
                    name="actionType"
                    defaultValue="NotifyOwner"
                  >
                    <NativeSelectOption value="None">None</NativeSelectOption>
                    <NativeSelectOption value="NotifyOwner">NotifyOwner</NativeSelectOption>
                    <NativeSelectOption value="NotifyManager">NotifyManager</NativeSelectOption>
                    <NativeSelectOption value="ReassignQueue">ReassignQueue</NativeSelectOption>
                    <NativeSelectOption value="IncreasePriority">
                      IncreasePriority
                    </NativeSelectOption>
                    <NativeSelectOption value="EscalateToTeam">EscalateToTeam</NativeSelectOption>
                  </NativeSelect>
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="create-rule-trigger">Trigger Minutes (+/-)</FieldLabel>
              <FieldContent>
                <Input
                  id="create-rule-trigger"
                  name="triggerBeforeOrAfterMinutes"
                  type="number"
                  defaultValue="0"
                />
              </FieldContent>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="create-rule-team">Target Team ID</FieldLabel>
                <FieldContent>
                  <Input id="create-rule-team" name="targetTeamId" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="create-rule-user">Target User ID</FieldLabel>
                <FieldContent>
                  <Input id="create-rule-user" name="targetUserId" />
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="create-rule-enabled">Enabled</FieldLabel>
              <FieldContent>
                <NativeSelect id="create-rule-enabled" name="isEnabled" defaultValue="true">
                  <NativeSelectOption value="true">Yes</NativeSelectOption>
                  <NativeSelectOption value="false">No</NativeSelectOption>
                </NativeSelect>
              </FieldContent>
            </Field>
            <SubmitButton label="Create escalation rule" />
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Update Escalation Rule</CardTitle>
          <CardDescription>
            Update a rule by GUID. Delete endpoint is not source-visible yet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CrmMutationResult state={updateRuleState} />
          <form action={updateRuleFormAction} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="update-rule-id">Rule ID</FieldLabel>
                <FieldContent>
                  <Input id="update-rule-id" name="ruleId" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="update-rule-policy">SLA Policy ID</FieldLabel>
                <FieldContent>
                  <Input id="update-rule-policy" name="slaPolicyId" />
                </FieldContent>
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="update-rule-metric">Metric Type</FieldLabel>
                <FieldContent>
                  <NativeSelect
                    id="update-rule-metric"
                    name="metricType"
                    defaultValue="FirstResponse"
                  >
                    <NativeSelectOption value="FirstResponse">FirstResponse</NativeSelectOption>
                    <NativeSelectOption value="Resolution">Resolution</NativeSelectOption>
                  </NativeSelect>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="update-rule-action">Action Type</FieldLabel>
                <FieldContent>
                  <NativeSelect
                    id="update-rule-action"
                    name="actionType"
                    defaultValue="NotifyOwner"
                  >
                    <NativeSelectOption value="None">None</NativeSelectOption>
                    <NativeSelectOption value="NotifyOwner">NotifyOwner</NativeSelectOption>
                    <NativeSelectOption value="NotifyManager">NotifyManager</NativeSelectOption>
                    <NativeSelectOption value="ReassignQueue">ReassignQueue</NativeSelectOption>
                    <NativeSelectOption value="IncreasePriority">
                      IncreasePriority
                    </NativeSelectOption>
                    <NativeSelectOption value="EscalateToTeam">EscalateToTeam</NativeSelectOption>
                  </NativeSelect>
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="update-rule-trigger">Trigger Minutes (+/-)</FieldLabel>
              <FieldContent>
                <Input
                  id="update-rule-trigger"
                  name="triggerBeforeOrAfterMinutes"
                  type="number"
                  defaultValue="0"
                />
              </FieldContent>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="update-rule-team">Target Team ID</FieldLabel>
                <FieldContent>
                  <Input id="update-rule-team" name="targetTeamId" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="update-rule-user">Target User ID</FieldLabel>
                <FieldContent>
                  <Input id="update-rule-user" name="targetUserId" />
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="update-rule-enabled">Enabled</FieldLabel>
              <FieldContent>
                <NativeSelect id="update-rule-enabled" name="isEnabled" defaultValue="true">
                  <NativeSelectOption value="true">Yes</NativeSelectOption>
                  <NativeSelectOption value="false">No</NativeSelectOption>
                </NativeSelect>
              </FieldContent>
            </Field>
            <SubmitButton label="Update escalation rule" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
