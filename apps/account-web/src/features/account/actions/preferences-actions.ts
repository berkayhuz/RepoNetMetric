"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { UI_LOCALE_COOKIE_NAME, UI_THEME_COOKIE_NAME } from "@netmetric/i18n";

import { accountApiClient, type UpdateUserPreferenceRequest } from "@/lib/account-api";
import { getAccountApiRequestOptions } from "@/lib/auth/account-api-request-options";
import { resolveLocaleCookieOptions } from "@/lib/locale-cookie";
import { resolvePreferenceCookiesFromPayload } from "@/lib/ui-preference-cookies";
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

export async function updatePreferencesAction(
  _previous: MutationState,
  formData: FormData,
): Promise<MutationState> {
  await assertSameOriginRequest();

  const payload: UpdateUserPreferenceRequest = {
    theme: readRequiredString(formData, "theme"),
    language: readRequiredString(formData, "language"),
    timeZone: readRequiredString(formData, "timeZone"),
    dateFormat: readRequiredString(formData, "dateFormat"),
    defaultOrganizationId: readOptionalString(formData, "defaultOrganizationId"),
    version: readOptionalString(formData, "version"),
  };

  try {
    const requestOptions = await getAccountApiRequestOptions();
    await accountApiClient.updatePreferences(payload, requestOptions);
    const cookieStore = await cookies();
    const cookieOptions = resolveLocaleCookieOptions();
    const cookieValues = resolvePreferenceCookiesFromPayload(payload);
    cookieStore.set(UI_LOCALE_COOKIE_NAME, cookieValues.locale, cookieOptions);
    cookieStore.set(UI_THEME_COOKIE_NAME, cookieValues.theme, cookieOptions);
    revalidatePath("/preferences");
    revalidatePath("/settings");

    return {
      status: "success",
      message: "Preferences updated successfully.",
    };
  } catch (error) {
    return mapMutationErrorToState(error, "/preferences");
  }
}
