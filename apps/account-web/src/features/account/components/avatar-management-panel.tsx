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
  FieldError,
  FieldLabel,
  Input,
  Text,
} from "@netmetric/ui";

import type { MyProfileResponse } from "@/lib/account-api";

import { removeAvatarAction, uploadAvatarAction } from "../actions/profile-actions";
import { initialMutationState } from "../actions/mutation-state";
import { AvatarActionResult } from "./avatar-action-result";

type AvatarManagementPanelProps = {
  profile: MyProfileResponse;
};

function UploadButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Uploading..." : "Upload avatar"}
    </Button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="destructive" disabled={pending}>
      {pending ? "Removing..." : "Delete avatar"}
    </Button>
  );
}

export function AvatarManagementPanel({ profile }: AvatarManagementPanelProps) {
  const [uploadState, uploadFormAction] = useActionState(uploadAvatarAction, initialMutationState);
  const [deleteState, deleteFormAction] = useActionState(removeAvatarAction, initialMutationState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avatar management</CardTitle>
        <CardDescription>Upload PNG, JPEG, or WEBP images up to 10 MB.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Text className="text-sm text-muted-foreground">
          Current avatar: {profile.avatarUrl ? "Configured" : "Not set"}
        </Text>
        {profile.avatarUrl ? (
          <Text className="break-all text-xs text-muted-foreground">{profile.avatarUrl}</Text>
        ) : null}

        <AvatarActionResult
          state={uploadState}
          successTitle="Avatar updated"
          errorTitle="Upload failed"
        />
        <form action={uploadFormAction} className="space-y-3" noValidate>
          <Field>
            <FieldLabel htmlFor="avatarFile">Avatar file</FieldLabel>
            <FieldContent>
              <Input
                id="avatarFile"
                name="avatarFile"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                aria-invalid={Boolean(uploadState.fieldErrors?.avatarFile?.[0])}
                aria-describedby={
                  uploadState.fieldErrors?.avatarFile?.[0] ? "avatarFile-error" : undefined
                }
              />
              <FieldError id="avatarFile-error">
                {uploadState.fieldErrors?.avatarFile?.[0]}
              </FieldError>
            </FieldContent>
          </Field>
          <UploadButton />
        </form>

        {profile.avatarUrl ? (
          <>
            <AvatarActionResult
              state={deleteState}
              successTitle="Avatar removed"
              errorTitle="Delete failed"
            />
            <form action={deleteFormAction} className="space-y-3">
              <input type="hidden" name="confirm" value="delete-avatar" />
              <Text className="text-xs text-muted-foreground">
                Confirm to remove the current avatar from your profile.
              </Text>
              <DeleteButton />
            </form>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
