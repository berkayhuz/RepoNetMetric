import "server-only";

const LOCAL_DEFAULTS = {
  appName: "NetMetric CRM",
  appOrigin: "http://localhost:7006",
  authUrl: "http://localhost:7002",
  crmUrl: "http://localhost:7006",
  apiBaseUrl: "http://localhost:8080",
  crmApiBaseUrl: "http://localhost:5030",
  accessCookieName: "__Secure-netmetric-access",
} as const;

const isProductionApp = process.env.APP_ENV === "production";

function normalizeUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function readStringEnv(
  key: string,
  fallback: string,
  options: {
    requiredInProduction?: boolean;
  } = {},
): string {
  const value = process.env[key]?.trim();
  if (value) {
    return value;
  }

  if (isProductionApp && options.requiredInProduction) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return fallback;
}

function readUrlEnv(
  key: string,
  fallback: string,
  options: {
    requiredInProduction?: boolean;
  } = {},
): string {
  const source = readStringEnv(key, fallback, options);
  const normalized = normalizeUrl(source);

  try {
    return new URL(normalized).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`Invalid URL in environment variable: ${key}`);
  }
}

export const crmPublicEnv = {
  appName: readStringEnv("NEXT_PUBLIC_APP_NAME", LOCAL_DEFAULTS.appName, {
    requiredInProduction: true,
  }),
  appOrigin: readUrlEnv("NEXT_PUBLIC_APP_ORIGIN", LOCAL_DEFAULTS.appOrigin, {
    requiredInProduction: true,
  }),
  crmUrl: readUrlEnv("NEXT_PUBLIC_CRM_URL", LOCAL_DEFAULTS.crmUrl, {
    requiredInProduction: true,
  }),
  authUrl: readUrlEnv("NEXT_PUBLIC_AUTH_URL", LOCAL_DEFAULTS.authUrl, {
    requiredInProduction: true,
  }),
  apiBaseUrl: readUrlEnv("NEXT_PUBLIC_API_BASE_URL", LOCAL_DEFAULTS.apiBaseUrl, {
    requiredInProduction: true,
  }),
} as const;

export const crmServerEnv = {
  crmApiBaseUrl: readUrlEnv("CRM_API_BASE_URL", LOCAL_DEFAULTS.crmApiBaseUrl, {
    requiredInProduction: true,
  }),
  accessCookieName: readStringEnv("CRM_ACCESS_COOKIE_NAME", LOCAL_DEFAULTS.accessCookieName, {
    requiredInProduction: false,
  }),
} as const;

export const crmEnv = {
  ...crmPublicEnv,
  ...crmServerEnv,
} as const;
