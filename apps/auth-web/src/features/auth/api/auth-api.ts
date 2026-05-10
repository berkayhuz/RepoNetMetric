import "server-only";

import { apiRequest } from "@/lib/api/api-client";

import { authEndpoints } from "./auth-endpoints";
import type { AuthSessionStatus, LoginResult, RegisterSuccessResult } from "../types/auth-session";
import type { WorkspaceSummary, WorkspaceSwitchResult } from "../types/workspace";

export type LoginRequest = {
  email: string;
  password: string;
  tenantId?: string;
  rememberMe?: boolean;
  mfaCode?: string;
  recoveryCode?: string;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
  workspaceName?: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
  token: string;
  password: string;
};

export type ConfirmEmailRequest = {
  userId: string;
  token: string;
};

export type SwitchWorkspaceRequest = {
  tenantId: string;
};

export const authApi = {
  login(input: LoginRequest): Promise<LoginResult> {
    return apiRequest<LoginResult>(authEndpoints.login, {
      method: "POST",
      body: input,
    });
  },

  register(input: RegisterRequest): Promise<RegisterSuccessResult> {
    return apiRequest<RegisterSuccessResult>(authEndpoints.register, {
      method: "POST",
      body: input,
    });
  },

  forgotPassword(input: ForgotPasswordRequest): Promise<void> {
    return apiRequest<void>(authEndpoints.forgotPassword, {
      method: "POST",
      body: input,
    });
  },

  resetPassword(input: ResetPasswordRequest): Promise<void> {
    return apiRequest<void>(authEndpoints.resetPassword, {
      method: "POST",
      body: input,
    });
  },

  confirmEmail(input: ConfirmEmailRequest): Promise<void> {
    return apiRequest<void>(authEndpoints.confirmEmail, {
      method: "POST",
      body: input,
    });
  },

  resendConfirmEmail(input: ForgotPasswordRequest): Promise<void> {
    return apiRequest<void>(authEndpoints.resendConfirmEmail, {
      method: "POST",
      body: input,
    });
  },

  getSessionStatus(): Promise<AuthSessionStatus> {
    return apiRequest<AuthSessionStatus>(authEndpoints.sessionStatus, {
      method: "GET",
    });
  },

  getWorkspaces(): Promise<WorkspaceSummary[]> {
    return apiRequest<WorkspaceSummary[]>(authEndpoints.workspaces, {
      method: "GET",
    });
  },

  switchWorkspace(input: SwitchWorkspaceRequest): Promise<WorkspaceSwitchResult> {
    return apiRequest<WorkspaceSwitchResult>(authEndpoints.switchWorkspace, {
      method: "POST",
      body: input,
    });
  },

  logout(): Promise<void> {
    return apiRequest<void>(authEndpoints.logout, {
      method: "POST",
    });
  },
};
