import "server-only";

import { redirect } from "next/navigation";

import { buildAuthLoginRedirectUrl } from "@/lib/crm-auth/safe-return-url";
import { crmEnv } from "@/lib/crm-env";

import type { CrmCapabilities } from "./crm-capabilities";
import {
  createCrmCapabilities,
  crmCapabilityAllows,
  getRequiredCrmCapabilityForPath,
} from "./crm-capabilities";
import { getCrmAccessToken, getRequestCorrelationId } from "./crm-auth-headers";

export type CrmSessionProfile = {
  tenantId: string;
  userId: string;
  sessionId: string;
  email: string;
  roles: string[];
  permissions: string[];
  accountStatus: string;
  emailConfirmed: boolean;
  mfaVerifiedAt: string | null;
};

export type CrmSession = {
  accessToken: string;
  capabilities: CrmCapabilities;
  profile: CrmSessionProfile;
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
    const profile = await readCrmSessionProfile(response);
    if (!profile || !isCrmProfileAllowed(profile)) {
      redirect("/access-denied");
    }

    const capabilities = createCrmCapabilities(profile.permissions);
    const requiredCapability = getRequiredCrmCapabilityForPath(pathname);
    if (!crmCapabilityAllows(capabilities, requiredCapability)) {
      redirect("/access-denied");
    }

    return {
      accessToken,
      capabilities,
      profile,
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

async function readCrmSessionProfile(response: Response): Promise<CrmSessionProfile | null> {
  try {
    const payload = await response.json();
    if (!payload || typeof payload !== "object") {
      return null;
    }

    const candidate = payload as Partial<CrmSessionProfile>;
    if (
      typeof candidate.tenantId !== "string" ||
      typeof candidate.userId !== "string" ||
      typeof candidate.sessionId !== "string" ||
      typeof candidate.email !== "string" ||
      !Array.isArray(candidate.roles) ||
      !Array.isArray(candidate.permissions) ||
      typeof candidate.accountStatus !== "string" ||
      typeof candidate.emailConfirmed !== "boolean"
    ) {
      return null;
    }

    return {
      tenantId: candidate.tenantId,
      userId: candidate.userId,
      sessionId: candidate.sessionId,
      email: candidate.email,
      roles: candidate.roles.filter((role): role is string => typeof role === "string"),
      permissions: candidate.permissions.filter(
        (permission): permission is string => typeof permission === "string",
      ),
      accountStatus: candidate.accountStatus,
      emailConfirmed: candidate.emailConfirmed,
      mfaVerifiedAt:
        typeof candidate.mfaVerifiedAt === "string" || candidate.mfaVerifiedAt === null
          ? candidate.mfaVerifiedAt
          : null,
    };
  } catch {
    return null;
  }
}

function isCrmProfileAllowed(profile: CrmSessionProfile): boolean {
  return (
    profile.tenantId.length > 0 &&
    profile.userId.length > 0 &&
    profile.sessionId.length > 0 &&
    profile.accountStatus.toLowerCase() === "active" &&
    profile.emailConfirmed
  );
}
