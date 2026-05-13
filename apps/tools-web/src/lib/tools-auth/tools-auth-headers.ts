import "server-only";

import { cookies, headers } from "next/headers";

const accessCookieEnv = process.env.TOOLS_ACCESS_COOKIE_NAME?.trim();
const fallbackAccessCookieNames = ["__Secure-netmetric-access", "__Secure-nm_access"] as const;

function getAccessCookieNames(): readonly string[] {
  return accessCookieEnv
    ? [accessCookieEnv, ...fallbackAccessCookieNames]
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

export async function getToolsAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return getAccessToken(cookieStore);
}

export async function getRequestCorrelationId(): Promise<string | undefined> {
  const headerStore = await headers();
  return headerStore.get("x-request-id") ?? headerStore.get("x-correlation-id") ?? undefined;
}

export async function getToolsAuthStatus(): Promise<{ isAuthenticated: boolean }> {
  return {
    isAuthenticated: Boolean(await getToolsAccessToken()),
  };
}
