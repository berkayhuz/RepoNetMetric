import "server-only";

import { authApi } from "../api/auth-api";
import type { AuthSessionStatus } from "../types/auth-session";

export async function getCurrentAuthSession(): Promise<AuthSessionStatus> {
  try {
    return await authApi.getSessionStatus();
  } catch {
    return {
      authenticated: false,
    };
  }
}

export async function requireAuthenticatedSession(): Promise<AuthSessionStatus> {
  const session = await getCurrentAuthSession();

  if (!session.authenticated) {
    throw new Error("Authentication required.");
  }

  return session;
}
