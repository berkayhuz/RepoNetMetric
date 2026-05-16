import { beforeEach, describe, expect, it, vi } from "vitest";

describe("post-login redirects", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.stubEnv("NODE_ENV", "development");
    delete process.env.APP_ENV;
    process.env.NEXT_PUBLIC_APP_ORIGIN = "http://localhost:7002";
    process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL = "http://localhost:5030";
    process.env.NEXT_PUBLIC_ACCOUNT_URL = "http://localhost:7004";
    process.env.NEXT_PUBLIC_AUTH_ALLOWED_RETURN_ORIGINS =
      "http://localhost:7004,http://localhost:7005,http://localhost:7006";
  });

  it("defaults to account url when returnUrl is empty", async () => {
    const { getSafePostLoginRedirectUrl } = await import("./post-login-url");
    expect(getSafePostLoginRedirectUrl()).toBe("http://localhost:7004/");
  });

  it("keeps allowed returnUrl origin", async () => {
    const { getSafePostLoginRedirectUrl } = await import("./post-login-url");
    expect(getSafePostLoginRedirectUrl("http://localhost:7006/dashboard?x=1")).toBe(
      "http://localhost:7006/dashboard?x=1",
    );
  });

  it("rejects unsafe external returnUrl", async () => {
    const { getSafePostLoginRedirectUrl } = await import("./post-login-url");
    expect(getSafePostLoginRedirectUrl("https://evil.example/phish")).toBe(
      "http://localhost:7004/",
    );
  });

  it("rejects protocol-relative returnUrl values", async () => {
    const { getSafePostLoginRedirectUrl } = await import("./post-login-url");
    expect(getSafePostLoginRedirectUrl("//evil.example/phish")).toBe("http://localhost:7004/");
  });

  it("uses the strict production origin allowlist", async () => {
    vi.resetModules();
    vi.stubEnv("NODE_ENV", "production");
    process.env.NEXT_PUBLIC_APP_ORIGIN = "https://auth.netmetric.net";
    process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL = "https://api.netmetric.net";
    process.env.NEXT_PUBLIC_ACCOUNT_URL = "https://account.netmetric.net";
    process.env.NEXT_PUBLIC_AUTH_ALLOWED_RETURN_ORIGINS =
      "http://localhost:7006,https://evil.example";

    const { getSafePostLoginRedirectUrl } = await import("./post-login-url");

    expect(getSafePostLoginRedirectUrl("https://crm.netmetric.net/dashboard")).toBe(
      "https://crm.netmetric.net/dashboard",
    );
    expect(getSafePostLoginRedirectUrl("http://localhost:7006/dashboard")).toBe(
      "https://account.netmetric.net/",
    );
    expect(getSafePostLoginRedirectUrl("https://evil.example/phish")).toBe(
      "https://account.netmetric.net/",
    );
  });
});
