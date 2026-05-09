import { describe, expect, it } from "vitest";

import * as clientEntry from "../client";
import * as serverEntry from "../index";

describe("component public API contract", () => {
  it("keeps server-safe exports in root entry", () => {
    expect("Button" in serverEntry).toBe(true);
    expect("Input" in serverEntry).toBe(true);
    expect("useTheme" in serverEntry).toBe(false);
    expect("ThemeProvider" in serverEntry).toBe(false);
  });

  it("keeps client-only hooks and interactive providers in client entry", () => {
    expect("ThemeProvider" in clientEntry).toBe(true);
    expect("useTheme" in clientEntry).toBe(true);
    expect("useMediaQuery" in clientEntry).toBe(true);
  });
});
