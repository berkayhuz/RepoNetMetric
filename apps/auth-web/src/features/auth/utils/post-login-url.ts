import { clientEnv } from "@/lib/env/client-env";

const productionReturnOrigins = [
  "https://netmetric.net",
  "https://www.netmetric.net",
  "https://auth.netmetric.net",
  "https://account.netmetric.net",
  "https://crm.netmetric.net",
  "https://tools.netmetric.net",
] as const;

function normalizeOrigin(input: string): string | null {
  try {
    return new URL(input).origin.toLowerCase();
  } catch {
    return null;
  }
}

function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production" || process.env.APP_ENV === "production";
}

function getDefaultAccountUrl(): string {
  if (clientEnv.NEXT_PUBLIC_ACCOUNT_URL) {
    return clientEnv.NEXT_PUBLIC_ACCOUNT_URL;
  }

  return isProductionRuntime() ? "https://account.netmetric.net" : "http://localhost:7004";
}

function getAllowedReturnOrigins(): Set<string> {
  const origins = new Set<string>();
  const addOrigin = (value: string | undefined) => {
    if (!value) {
      return;
    }
    const origin = normalizeOrigin(value);
    if (origin) {
      origins.add(origin);
    }
  };

  if (isProductionRuntime()) {
    for (const origin of productionReturnOrigins) {
      addOrigin(origin);
    }

    return origins;
  }

  addOrigin(getDefaultAccountUrl());
  const rawConfigured = clientEnv.NEXT_PUBLIC_AUTH_ALLOWED_RETURN_ORIGINS;
  if (rawConfigured) {
    for (const item of rawConfigured.split(",")) {
      addOrigin(item.trim());
    }
  } else {
    addOrigin("http://localhost:7004");
    addOrigin("http://localhost:7005");
    addOrigin("http://localhost:7006");
  }

  return origins;
}

export function getDefaultPostLoginUrl(): string {
  const accountUrl = getDefaultAccountUrl();
  const url = new URL(accountUrl);
  return `${url.origin}/`;
}

export function getSafePostLoginRedirectUrl(returnUrl?: string | null): string {
  const fallback = getDefaultPostLoginUrl();
  const rawValue = returnUrl?.trim();
  if (!rawValue) {
    return fallback;
  }

  if (rawValue.startsWith("/")) {
    if (rawValue.startsWith("//")) {
      return fallback;
    }

    return new URL(rawValue, fallback).toString();
  }

  let absolute: URL;
  try {
    absolute = new URL(rawValue);
  } catch {
    return fallback;
  }

  return getAllowedReturnOrigins().has(absolute.origin.toLowerCase())
    ? absolute.toString()
    : fallback;
}
