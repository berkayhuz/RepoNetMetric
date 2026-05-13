import "server-only";

import { redirect } from "next/navigation";

import { buildAuthLoginRedirectUrl } from "@/lib/crm-auth/safe-return-url";

import { getCrmAccessToken } from "./crm-auth-headers";

// Phase 2 limitation: we can only validate token presence server-side here.
// Deep session/permission checks will be added when CRM session/profile endpoints are wired.
export async function requireCrmSession(pathname = "/"): Promise<string> {
  const token = await getCrmAccessToken();
  if (!token) {
    redirect(buildAuthLoginRedirectUrl(pathname));
  }

  return token;
}
