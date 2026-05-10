import { authRoutes } from "@/features/auth/config/auth-routes";

import { getSafeRedirectPath } from "@/lib/security/safe-redirect";

const defaultAuthenticatedPath = authRoutes.home;

export function getRedirectAfterAuth(returnUrl?: string | null): string {
  const safePath = getSafeRedirectPath(returnUrl);

  if (
    safePath === authRoutes.login ||
    safePath === authRoutes.register ||
    safePath === authRoutes.forgotPassword
  ) {
    return defaultAuthenticatedPath;
  }

  return safePath;
}

export function getRedirectAfterLogout(): string {
  return authRoutes.login;
}
