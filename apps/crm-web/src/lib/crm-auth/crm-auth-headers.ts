import "server-only";

import { cookies, headers } from "next/headers";

import { crmServerEnv } from "@/lib/crm-env";
import type { CrmApiAuthContext } from "@/lib/crm-api";

const fallbackAccessCookieNames = ["__Secure-netmetric-access", "__Secure-nm_access"] as const;

function getAccessCookieNames(): readonly string[] {
  return crmServerEnv.accessCookieName
    ? [crmServerEnv.accessCookieName, ...fallbackAccessCookieNames]
    : fallbackAccessCookieNames;
}

function getAccessToken(cookieStore: Awaited<ReturnType<typeof cookies>>): string | undefined {
  for (const cookieName of getAccessCookieNames()) {
    const token = cookieStore.get(cookieName)?.value?.trim();
    if (token) {
      return token;
    }
  }

  return undefined;
}

export async function getCrmAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return getAccessToken(cookieStore);
}

export async function getCrmApiAuthContext(): Promise<CrmApiAuthContext | undefined> {
  const accessToken = await getCrmAccessToken();

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
