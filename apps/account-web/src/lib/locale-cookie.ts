import { appEnv } from "./app-env";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

type SameSite = "lax" | "strict" | "none";

export type LocaleCookieOptions = {
  path: string;
  sameSite: SameSite;
  secure: boolean;
  maxAge: number;
  domain?: string;
};

function isLocalHostname(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase();
  return normalized === "localhost" || normalized === "127.0.0.1" || normalized === "::1";
}

function normalizeCookieDomain(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  if (!normalized) {
    return undefined;
  }

  const lowered = normalized.toLowerCase();
  if (lowered === "localhost" || lowered === "127.0.0.1" || lowered === "::1") {
    return undefined;
  }

  return normalized;
}

export function resolveLocaleCookieOptions(
  config: {
    appOrigin: string;
    cookieDomain?: string | undefined;
  } = {
    appOrigin: appEnv.appOrigin,
    cookieDomain:
      process.env.NETMETRIC_COOKIE_DOMAIN ?? process.env.NEXT_PUBLIC_NETMETRIC_COOKIE_DOMAIN,
  },
): LocaleCookieOptions {
  const hostname = new URL(config.appOrigin).hostname;
  const isLocal = isLocalHostname(hostname);
  const domain = isLocal ? undefined : normalizeCookieDomain(config.cookieDomain);

  return {
    path: "/",
    sameSite: "lax",
    secure: !isLocal,
    maxAge: ONE_YEAR_SECONDS,
    ...(domain ? { domain } : {}),
  };
}
