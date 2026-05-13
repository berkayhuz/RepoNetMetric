import "server-only";

import { cookies, headers } from "next/headers";

import type { AccountApiAuthContext } from "@/lib/account-api";

const accessCookieEnv = process.env.ACCOUNT_ACCESS_COOKIE_NAME?.trim();
const fallbackAccessCookieNames = ["__Secure-netmetric-access", "__Secure-nm_access"] as const;

function getAccessCookieNames(): readonly string[] {
  return accessCookieEnv
    ? [accessCookieEnv, ...fallbackAccessCookieNames]
    : fallbackAccessCookieNames;
}

function getAccessToken(
  cookieHeaderStore: Awaited<ReturnType<typeof cookies>>,
): string | undefined {
  for (const cookieName of getAccessCookieNames()) {
    const token = cookieHeaderStore.get(cookieName)?.value?.trim();
    if (token) {
      return token;
    }
  }

  return undefined;
}

export async function getAccountApiAuthContext(): Promise<AccountApiAuthContext | undefined> {
  const cookieStore = await cookies();
  const accessToken = getAccessToken(cookieStore);

  if (!accessToken) {
    return undefined;
  }

  return {
    bearerToken: accessToken,
  };
}

export async function getRequestCorrelationId(): Promise<string | undefined> {
  const headerStore = await headers();
  return headerStore.get("x-request-id") ?? headerStore.get("x-correlation-id") ?? undefined;
}
