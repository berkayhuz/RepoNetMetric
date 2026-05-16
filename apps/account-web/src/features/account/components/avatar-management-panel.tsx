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
import { tAccountClient } from "@/lib/i18n/account-i18n";

type AvatarManagementPanelProps = {
  profile: MyProfileResponse;
};

function UploadButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending
        ? tAccountClient("account.profile.avatar.uploading")
        : tAccountClient("account.profile.avatar.upload")}
    </Button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="destructive" disabled={pending}>
      {pending
        ? tAccountClient("account.common.removing")
        : tAccountClient("account.profile.avatar.delete")}
    </Button>
  );
}

export function AvatarManagementPanel({ profile }: AvatarManagementPanelProps) {
  const [uploadState, uploadFormAction] = useActionState(uploadAvatarAction, initialMutationState);
  const [deleteState, deleteFormAction] = useActionState(removeAvatarAction, initialMutationState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tAccountClient("account.profile.avatar.managementTitle")}</CardTitle>
        <CardDescription>{tAccountClient("account.profile.avatar.help")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Text className="text-sm text-muted-foreground">
          {tAccountClient("account.profile.avatar.current")}:{" "}
          {profile.avatarUrl
            ? tAccountClient("account.common.configured")
            : tAccountClient("account.common.notConfigured")}
        </Text>
        {profile.avatarUrl ? (
          <Text className="break-all text-xs text-muted-foreground">{profile.avatarUrl}</Text>
        ) : null}

        <AvatarActionResult
          state={uploadState}
          successTitle={tAccountClient("account.profile.avatar.updated")}
          errorTitle={tAccountClient("account.profile.avatar.uploadFailed")}
        />
        <form action={uploadFormAction} className="space-y-3" noValidate>
          <Field>
            <FieldLabel htmlFor="avatarFile">
              {tAccountClient("account.profile.avatar.fileLabel")}
            </FieldLabel>
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
              successTitle={tAccountClient("account.profile.avatar.removed")}
              errorTitle={tAccountClient("account.common.deleteFailed")}
            />
            <form action={deleteFormAction} className="space-y-3">
              <input type="hidden" name="confirm" value="delete-avatar" />
              <Text className="text-xs text-muted-foreground">
                {tAccountClient("account.profile.avatar.deleteConfirm")}
              </Text>
              <DeleteButton />
            </form>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
