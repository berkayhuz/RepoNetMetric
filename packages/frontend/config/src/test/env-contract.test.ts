import { describe, expect, it } from "vitest";

import { parseFrontendEnv } from "../env";

describe("frontend env contract", () => {
  it("accepts valid required fields", () => {
    const env = parseFrontendEnv({
      NODE_ENV: "development",
      APP_ENV: "development",
      NEXT_PUBLIC_APP_NAME: "NetMetric",
      NEXT_PUBLIC_API_BASE_URL: "https://api.netmetric.test",
    });

    expect(env.APP_ENV).toBe("development");
    expect(env.NEXT_PUBLIC_API_BASE_URL).toBe("https://api.netmetric.test");
  });

  it("rejects invalid app environment values", () => {
    expect(() =>
      parseFrontendEnv({
        NODE_ENV: "development",
        APP_ENV: "sandbox",
        NEXT_PUBLIC_APP_NAME: "NetMetric",
        NEXT_PUBLIC_API_BASE_URL: "https://api.netmetric.test",
      }),
    ).toThrow();
  });

  it("rejects invalid public API URL", () => {
    expect(() =>
      parseFrontendEnv({
        NODE_ENV: "development",
        APP_ENV: "development",
        NEXT_PUBLIC_APP_NAME: "NetMetric",
        NEXT_PUBLIC_API_BASE_URL: "not-a-url",
      }),
    ).toThrow();
  });
});
