import "server-only";

import {
  accountApiClient,
  type MyProfileResponse,
  type UserPreferenceResponse,
} from "@/lib/account-api";
import { getAccountApiRequestOptions } from "@/lib/auth/account-api-request-options";
import { getCurrentAccountSession } from "@/lib/auth/account-session";

export async function getOverviewForPage() {
  const session = await getCurrentAccountSession();
  if (!session.authenticated) {
    throw new Error("Authentication required.");
  }

  return session.overview;
}

export async function getProfileForPage(): Promise<MyProfileResponse> {
  const requestOptions = await getAccountApiRequestOptions();
  return accountApiClient.getProfile(requestOptions);
}

export async function getPreferencesForPage(): Promise<UserPreferenceResponse> {
  const requestOptions = await getAccountApiRequestOptions();
  return accountApiClient.getPreferences(requestOptions);
}
