import "server-only";

import { cache } from "react";

import { accountApiClient, AccountApiError, type AccountOverviewResponse } from "@/lib/account-api";

import { getAccountApiAuthContext, getRequestCorrelationId } from "./account-auth-headers";

export type AccountSessionState =
  | {
      authenticated: true;
      overview: AccountOverviewResponse;
    }
  | {
      authenticated: false;
    };

export const getCurrentAccountSession = cache(async (): Promise<AccountSessionState> => {
  const authContext = await getAccountApiAuthContext();

  if (!authContext?.bearerToken) {
    return { authenticated: false };
  }

  try {
    const requestOptions: {
      authContext: NonNullable<typeof authContext>;
      correlationId?: string;
    } = {
      authContext,
    };
    const correlationId = await getRequestCorrelationId();
    if (correlationId) {
      requestOptions.correlationId = correlationId;
    }

    const overview = await accountApiClient.getOverview(requestOptions);

    return {
      authenticated: true,
      overview,
    };
  } catch (error) {
    if (error instanceof AccountApiError && error.kind === "unauthorized") {
      return { authenticated: false };
    }

    throw error;
  }
});
