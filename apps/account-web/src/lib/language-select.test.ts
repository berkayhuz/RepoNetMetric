import { describe, expect, it } from "vitest";

import { resolveLanguageSelectState } from "./language-select";

const baseOptions = [
  { value: "en", label: "English" },
  { value: "tr", label: "Türkçe" },
  { value: "aa", label: "Afar" },
];

describe("resolveLanguageSelectState", () => {
  it("selects base locale when saved value is regional", () => {
    const state = resolveLanguageSelectState("tr-TR", baseOptions);
    expect(state.selectedValue).toBe("tr");
  });

  it("selects exact locale when available", () => {
    const state = resolveLanguageSelectState("tr", baseOptions);
    expect(state.selectedValue).toBe("tr");
  });

  it("maps zh-CN to zh when base option exists", () => {
    const state = resolveLanguageSelectState("zh-CN", [
      { value: "en", label: "English" },
      { value: "tr", label: "Türkçe" },
      { value: "zh", label: "Chinese" },
    ]);
    expect(state.selectedValue).toBe("zh");
  });

  it("injects safe option when saved locale is missing", () => {
    const state = resolveLanguageSelectState("zh-CN", [
      { value: "en", label: "English" },
      { value: "tr", label: "Türkçe" },
    ]);
    expect(state.selectedValue).toBe("zh-CN");
    expect(state.options[0]?.value).toBe("zh-CN");
    expect(state.options[0]?.label).toContain("zh-CN");
  });

  it("falls back to english for invalid values", () => {
    const state = resolveLanguageSelectState("not-a-locale", baseOptions);
    expect(state.selectedValue).toBe("en");
  });
});
