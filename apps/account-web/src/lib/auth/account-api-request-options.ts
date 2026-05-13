import "server-only";

import type { AccountApiRequestOptions } from "@/lib/account-api";

import { getAccountApiAuthContext, getRequestCorrelationId } from "./account-auth-headers";

export async function getAccountApiRequestOptions(): Promise<AccountApiRequestOptions> {
  const authContext = await getAccountApiAuthContext();

  if (!authContext?.bearerToken) {
    throw new Error("Authenticated account context is required.");
  }

  const options: AccountApiRequestOptions = {
    authContext: {
      bearerToken: authContext.bearerToken,
    },
  };

  const correlationId = await getRequestCorrelationId();
  if (correlationId) {
    options.correlationId = correlationId;
  }

  return options;
}
