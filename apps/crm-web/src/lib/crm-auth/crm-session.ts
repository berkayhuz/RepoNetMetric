import "server-only";

import { redirect } from "next/navigation";

import { buildAuthLoginRedirectUrl } from "@/lib/crm-auth/safe-return-url";
import { crmEnv } from "@/lib/crm-env";

import type { CrmCapabilities } from "./crm-capabilities";
import { crmCapabilityAllows, getRequiredCrmCapabilityForPath } from "./crm-capabilities";
import { getCurrentCrmCapabilities } from "./current-crm-capabilities";
import { getCrmAccessToken, getRequestCorrelationId } from "./crm-auth-headers";

export type CrmSession = {
  accessToken: string;
  capabilities: CrmCapabilities;
};

const publicCrmPathPrefixes = [
  "/access-denied",
  "/service-unavailable",
  "/retry-later",
  "/health",
] as const;

function joinGatewayApiPath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${crmEnv.apiBaseUrl}${normalizedPath}`;
}

export function isPublicCrmPath(pathname: string): boolean {
  return publicCrmPathPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function validateCrmSession(pathname = "/"): Promise<CrmSession> {
  const accessToken = await getCrmAccessToken();
  if (!accessToken) {
    redirect(buildAuthLoginRedirectUrl(pathname));
  }

  const headers = new Headers({
    accept: "application/json",
    authorization: `Bearer ${accessToken}`,
  });
  const correlationId = await getRequestCorrelationId();
  if (correlationId) {
    headers.set("x-correlation-id", correlationId);
  }

  let response: Response;
  try {
    response = await fetch(joinGatewayApiPath("/api/auth/session-status"), {
      method: "GET",
      headers,
      cache: "no-store",
      redirect: "manual",
    });
  } catch {
    redirect("/service-unavailable");
  }

  if (response.ok) {
    const capabilities = await getCurrentCrmCapabilities();
    const requiredCapability = getRequiredCrmCapabilityForPath(pathname);
    if (!crmCapabilityAllows(capabilities, requiredCapability)) {
      redirect("/access-denied");
    }

    return {
      accessToken,
      capabilities,
    };
  }

  if (response.status === 401) {
    redirect(buildAuthLoginRedirectUrl(pathname));
  }

  if (response.status === 403) {
    redirect("/access-denied");
  }

  if (response.status === 429) {
    redirect("/retry-later");
  }

  redirect("/service-unavailable");
}
