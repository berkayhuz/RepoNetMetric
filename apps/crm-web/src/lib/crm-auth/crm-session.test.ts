import { beforeEach, describe, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";

const mocks = vi.hoisted(() => ({
  accessToken: undefined as string | undefined,
  redirect: vi.fn((url: string) => {
    throw Object.assign(new Error("NEXT_REDIRECT"), { url });
  }),
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      name === "__Secure-netmetric-access" && mocks.accessToken
        ? { value: mocks.accessToken }
        : undefined,
  }),
  headers: async () => ({
    get: () => null,
  }),
}));

vi.mock("next/navigation", () => ({
  redirect: mocks.redirect,
}));

import { isPublicCrmPath, validateCrmSession } from "./crm-session";

function sessionStatusResponse(
  permissions: readonly string[],
  overrides: Record<string, unknown> = {},
) {
  return new Response(
    JSON.stringify({
      tenantId: "test-tenant-id",
      userId: "test-user-id",
      sessionId: "test-session-id",
      email: "ada@example.com",
      roles: ["tenant-owner"],
      permissions,
      accountStatus: "active",
      emailConfirmed: true,
      mfaVerifiedAt: null,
      ...overrides,
    }),
    { status: 200, headers: { "content-type": "application/json" } },
  );
}

describe("CRM session route classification", () => {
  beforeEach(() => {
    mocks.accessToken = undefined;
    mocks.redirect.mockClear();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("leaves status pages public for unauthenticated redirects", () => {
    expect(isPublicCrmPath("/access-denied")).toBe(true);
    expect(isPublicCrmPath("/service-unavailable")).toBe(true);
    expect(isPublicCrmPath("/retry-later")).toBe(true);
  });

  it("requires the centralized guard for protected CRM paths", () => {
    expect(isPublicCrmPath("/customers")).toBe(false);
    expect(isPublicCrmPath("/dashboard")).toBe(false);
  });

  it("redirects users without an access token to login", async () => {
    await expect(validateCrmSession("/customers")).rejects.toMatchObject({
      url: expect.stringContaining("/login"),
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("redirects invalid or unauthorized sessions safely", async () => {
    mocks.accessToken = randomUUID();
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 401 }));

    await expect(validateCrmSession("/customers")).rejects.toMatchObject({
      url: expect.stringContaining("/login"),
    });

    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 403 }));
    await expect(validateCrmSession("/customers")).rejects.toMatchObject({
      url: "/access-denied",
    });
  });

  it("requires route capabilities even when session introspection succeeds", async () => {
    mocks.accessToken = randomUUID();
    vi.mocked(fetch).mockResolvedValueOnce(sessionStatusResponse(["customers.read"]));

    await expect(validateCrmSession("/customers/new")).rejects.toMatchObject({
      url: "/access-denied",
    });
  });

  it("returns a CRM session for valid introspection and route capability", async () => {
    mocks.accessToken = randomUUID();
    vi.mocked(fetch).mockResolvedValueOnce(sessionStatusResponse(["customers.read"]));

    const session = await validateCrmSession("/customers");

    expect(session.accessToken).toBe(mocks.accessToken);
    expect(session.capabilities["customers.read"]).toBe(true);
    expect(session.profile.tenantId).toBe("test-tenant-id");
    expect(session.profile.email).toBe("ada@example.com");
  });

  it("redirects disabled or unconfirmed profiles away from CRM", async () => {
    mocks.accessToken = randomUUID();
    vi.mocked(fetch).mockResolvedValueOnce(
      sessionStatusResponse(["customers.read"], { accountStatus: "disabled" }),
    );

    await expect(validateCrmSession("/customers")).rejects.toMatchObject({
      url: "/access-denied",
    });

    vi.mocked(fetch).mockResolvedValueOnce(
      sessionStatusResponse(["customers.read"], { emailConfirmed: false }),
    );

    await expect(validateCrmSession("/customers")).rejects.toMatchObject({
      url: "/access-denied",
    });
  });

  it("redirects missing tenant context safely", async () => {
    mocks.accessToken = randomUUID();
    vi.mocked(fetch).mockResolvedValueOnce(
      sessionStatusResponse(["customers.read"], { tenantId: "" }),
    );

    await expect(validateCrmSession("/customers")).rejects.toMatchObject({
      url: "/access-denied",
    });
  });
});
