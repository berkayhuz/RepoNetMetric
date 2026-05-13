import "server-only";

import {
  accountApiClient,
  type MyProfileResponse,
  type UserPreferenceResponse,
} from "@/lib/account-api";
import { getAccountApiAuthContext, getRequestCorrelationId } from "@/lib/auth/account-auth-headers";
import { getCurrentAccountSession } from "@/lib/auth/account-session";

async function getRequestOptions(): Promise<{
  authContext: { bearerToken: string };
  correlationId?: string;
}> {
  const authContext = await getAccountApiAuthContext();

  if (!authContext?.bearerToken) {
    throw new Error("Authenticated account context is required.");
  }

  const requestOptions: { authContext: { bearerToken: string }; correlationId?: string } = {
    authContext: {
      bearerToken: authContext.bearerToken,
    },
  };

  const correlationId = await getRequestCorrelationId();
  if (correlationId) {
    requestOptions.correlationId = correlationId;
  }

  return requestOptions;
}

export async function getOverviewForPage() {
  const session = await getCurrentAccountSession();
  if (!session.authenticated) {
    throw new Error("Authentication required.");
  }

  return session.overview;
}

export async function getProfileForPage(): Promise<MyProfileResponse> {
  const requestOptions = await getRequestOptions();
  return accountApiClient.getProfile(requestOptions);
}

export async function getPreferencesForPage(): Promise<UserPreferenceResponse> {
  const requestOptions = await getRequestOptions();
  return accountApiClient.getPreferences(requestOptions);
}
