import { ApiError } from "@/lib/api/api-error";
import { isProblemDetails } from "@/lib/api/problem-details";

import type { ConfirmEmailInput } from "../schemas/confirm-email.schema";
import type { ForgotPasswordInput } from "../schemas/forgot-password.schema";
import type { LoginInput } from "../schemas/login.schema";
import type { MfaInput } from "../schemas/mfa.schema";
import type { RecoveryCodeInput } from "../schemas/recovery-code.schema";
import type { RegisterInput } from "../schemas/register.schema";
import type { ResetPasswordInput } from "../schemas/reset-password.schema";
import type { AuthSessionStatus, LoginResult, RegisterSuccessResult } from "../types/auth-session";
import type { WorkspaceSummary, WorkspaceSwitchResult } from "../types/workspace";

type BrowserRequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
};

async function readResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

async function browserRequest<TResponse>(
  path: string,
  options: BrowserRequestOptions = {},
): Promise<TResponse> {
  const init: RequestInit = {
    method: options.method ?? "GET",
    credentials: "include",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (options.body !== undefined) {
    init.body = JSON.stringify(options.body);
  }

  const response = await fetch(path, init);
  const payload = await readResponsePayload(response);

  if (!response.ok) {
    if (isProblemDetails(payload)) {
      throw new ApiError(
        payload.detail ?? payload.title ?? "Request failed.",
        response.status,
        payload,
      );
    }

    throw new ApiError("Request failed.", response.status);
  }

  return payload as TResponse;
}

export const authBrowserApi = {
  login(input: LoginInput): Promise<LoginResult> {
    const { returnUrl: _returnUrl, ...payload } = input;

    void _returnUrl;

    return browserRequest<LoginResult>("/api/auth/login", {
      method: "POST",
      body: payload,
    });
  },

  verifyMfa(input: MfaInput): Promise<LoginResult> {
    const { code, returnUrl: _returnUrl, ...rest } = input;

    void _returnUrl;

    return browserRequest<LoginResult>("/api/auth/login", {
      method: "POST",
      body: {
        ...rest,
        mfaCode: code,
      },
    });
  },

  verifyRecoveryCode(input: RecoveryCodeInput): Promise<LoginResult> {
    const { recoveryCode, returnUrl: _returnUrl, ...rest } = input;

    void _returnUrl;

    return browserRequest<LoginResult>("/api/auth/login", {
      method: "POST",
      body: {
        ...rest,
        recoveryCode,
      },
    });
  },

  register(input: RegisterInput): Promise<RegisterSuccessResult> {
    const {
      confirmPassword: _confirmPassword,
      acceptTerms: _acceptTerms,
      returnUrl: _returnUrl,
      ...payload
    } = input;

    void _confirmPassword;
    void _acceptTerms;
    void _returnUrl;

    return browserRequest<RegisterSuccessResult>("/api/auth/register", {
      method: "POST",
      body: payload,
    });
  },

  forgotPassword(input: ForgotPasswordInput): Promise<void> {
    return browserRequest<void>("/api/auth/forgot-password", {
      method: "POST",
      body: input,
    });
  },

  resetPassword(input: ResetPasswordInput): Promise<void> {
    const { confirmPassword: _confirmPassword, ...payload } = input;

    void _confirmPassword;

    return browserRequest<void>("/api/auth/reset-password", {
      method: "POST",
      body: payload,
    });
  },

  confirmEmail(input: ConfirmEmailInput): Promise<void> {
    return browserRequest<void>("/api/auth/confirm-email", {
      method: "POST",
      body: input,
    });
  },

  resendConfirmEmail(input: ForgotPasswordInput): Promise<void> {
    return browserRequest<void>("/api/auth/resend-confirm-email", {
      method: "POST",
      body: input,
    });
  },

  getSession(): Promise<AuthSessionStatus> {
    return browserRequest<AuthSessionStatus>("/api/auth/session");
  },

  getWorkspaces(): Promise<WorkspaceSummary[]> {
    return browserRequest<WorkspaceSummary[]>("/api/auth/workspaces");
  },

  switchWorkspace(tenantId: string): Promise<WorkspaceSwitchResult> {
    return browserRequest<WorkspaceSwitchResult>("/api/auth/workspaces/switch", {
      method: "POST",
      body: {
        tenantId,
      },
    });
  },

  logout(): Promise<void> {
    return browserRequest<void>("/api/auth/logout", {
      method: "POST",
    });
  },
};
