import { describe, expect, it } from "vitest";
import { getThemeInitScript } from "@netmetric/ui";

import { formatAccountDateTime } from "./account-date";
import { mapAccountLanguageToLocale, mapAccountThemeToUiTheme } from "./account-locale";

describe("account date and ui preference mapping", () => {
  it("formats using selected date format", () => {
    const value = formatAccountDateTime("2026-05-15T10:30:00Z", {
      locale: "en-US",
      timeZone: "UTC",
      dateFormat: "yyyy-MM-dd",
    });

    expect(value).toContain("2026");
    expect(value).toContain("10:30");
  });

  it("falls back safely for invalid date", () => {
    const value = formatAccountDateTime("not-a-date", {
      locale: "en-US",
      timeZone: "UTC",
      dateFormat: "yyyy-MM-dd",
    });

    expect(value).toBe("Not available");
  });

  it("maps language/culture to i18n locale with fallback", () => {
    expect(mapAccountLanguageToLocale("tr-TR")).toBe("tr");
    expect(mapAccountLanguageToLocale("en-US")).toBe("en");
    expect(mapAccountLanguageToLocale("deprecated")).toBeTypeOf("string");
  });

  it("maps theme values to ui themes", () => {
    expect(mapAccountThemeToUiTheme("System")).toBe("system");
    expect(mapAccountThemeToUiTheme("Default")).toBe("light");
    expect(mapAccountThemeToUiTheme("Dark")).toBe("dark");
    expect(mapAccountThemeToUiTheme("Light")).toBe("light");
    expect(mapAccountThemeToUiTheme("Unknown")).toBe("system");
  });

  it("keeps the theme init script aligned with theme preference values", () => {
    const script = getThemeInitScript();

    expect(script).toContain("netmetric-theme");
    expect(script).toContain("stored==='light'||stored==='dark'||stored==='system'");
    expect(script).toContain("matchMedia('(prefers-color-scheme: dark)'");
    expect(script).toContain("classList.toggle('dark'");
  });
});
