"use server";

import { revalidatePath } from "next/cache";

import { accountApiClient, type UpdateMyProfileRequest } from "@/lib/account-api";
import { getAccountApiRequestOptions } from "@/lib/auth/account-api-request-options";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import { mapMutationErrorToState } from "./mutation-error-map";
import type { MutationState } from "./mutation-state";

function readOptionalString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function readRequiredString(formData: FormData, key: string): string {
  const value = readOptionalString(formData, key);
  return value ?? "";
}

export async function updateProfileAction(
  _previous: MutationState,
  formData: FormData,
): Promise<MutationState> {
  await assertSameOriginRequest();

  const payload: UpdateMyProfileRequest = {
    firstName: readRequiredString(formData, "firstName"),
    lastName: readRequiredString(formData, "lastName"),
    phoneNumber: readOptionalString(formData, "phoneNumber"),
    avatarUrl: readOptionalString(formData, "avatarUrl"),
    jobTitle: readOptionalString(formData, "jobTitle"),
    department: readOptionalString(formData, "department"),
    timeZone: readRequiredString(formData, "timeZone"),
    culture: readRequiredString(formData, "culture"),
    version: readOptionalString(formData, "version"),
  };

  try {
    const requestOptions = await getAccountApiRequestOptions();
    await accountApiClient.updateProfile(payload, requestOptions);
    revalidatePath("/profile");
    revalidatePath("/settings");
    revalidatePath("/");

    return {
      status: "success",
      message: "Profile updated successfully.",
    };
  } catch (error) {
    return mapMutationErrorToState(error, "/profile");
  }
}
