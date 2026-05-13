"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button, Field, FieldContent, FieldError, FieldLabel, Text } from "@netmetric/ui";

import type { AccountMemberResponse, AccountRoleCatalogResponse } from "@/lib/account-api";

import { updateMemberRolesAction } from "../actions/member-role-actions";
import { initialMutationState } from "../actions/mutation-state";
import { MemberRoleActionResult } from "./member-role-action-result";

type MemberRoleUpdateFormProps = {
  member: AccountMemberResponse;
  rolesCatalog: AccountRoleCatalogResponse[];
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Updating..." : "Update roles"}
    </Button>
  );
}

export function MemberRoleUpdateForm({ member, rolesCatalog }: MemberRoleUpdateFormProps) {
  const [state, formAction] = useActionState(updateMemberRolesAction, initialMutationState);
  const protectedRoleNames = rolesCatalog
    .filter((role) => role.isProtected)
    .map((role) => role.name);

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="confirm" value="update-member-roles" />
      <input type="hidden" name="userId" value={member.userId} />
      <input
        type="hidden"
        name="allowedRoles"
        value={rolesCatalog.map((role) => role.name).join(",")}
      />
      <input type="hidden" name="protectedRoles" value={protectedRoleNames.join(",")} />
      <input type="hidden" name="currentRoles" value={member.roles.join(",")} />

      <Field>
        <FieldLabel>Assignable roles</FieldLabel>
        <FieldContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {rolesCatalog.map((role) => {
              const hasRole = member.roles.includes(role.name);
              const disableProtectedRemoval = role.isProtected && hasRole;
              return (
                <label
                  key={role.name}
                  className="flex items-center gap-2 rounded-md border border-border p-2"
                >
                  <input
                    type="checkbox"
                    name="roles"
                    value={role.name}
                    defaultChecked={hasRole}
                    disabled={disableProtectedRemoval}
                    aria-label={`Role ${role.name}`}
                  />
                  <Text className="text-sm">
                    {role.name}
                    {role.isProtected ? " (Protected)" : ""}
                  </Text>
                </label>
              );
            })}
          </div>
          <FieldError>{state.fieldErrors?.roles?.[0]}</FieldError>
        </FieldContent>
      </Field>

      <Text className="text-xs text-muted-foreground">
        Backend authorization and protected-role policies remain authoritative.
      </Text>
      <SubmitButton />
      <MemberRoleActionResult state={state} />
    </form>
  );
}
