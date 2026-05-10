import "server-only";

import { cookies } from "next/headers";

const cookieNames = {
  accessToken: "__Secure-nm_access",
  csrfToken: "__Secure-nm_csrf",
  activeTenantId: "nm_active_tenant",
} as const;

export type AuthCookieName = keyof typeof cookieNames;

export async function getAuthCookie(name: AuthCookieName): Promise<string | null> {
  const cookieStore = await cookies();

  return cookieStore.get(cookieNames[name])?.value ?? null;
}

export async function getActiveTenantIdFromCookie(): Promise<string | null> {
  return getAuthCookie("activeTenantId");
}

export async function clearAuthWebCookies(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(cookieNames.accessToken);
  cookieStore.delete(cookieNames.csrfToken);
  cookieStore.delete(cookieNames.activeTenantId);
}
