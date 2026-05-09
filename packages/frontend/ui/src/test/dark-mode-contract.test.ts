/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tokensPath = path.resolve(__dirname, "../styles/tokens.css");
const providerPath = path.resolve(__dirname, "../components/theme/theme-provider.tsx");

describe("dark mode contract", () => {
  it("defines dark token overrides", () => {
    const tokensCss = fs.readFileSync(tokensPath, "utf8");
    expect(tokensCss).toContain(".dark");
    expect(tokensCss).toContain("--nm-background");
    expect(tokensCss).toContain("--nm-foreground");
  });

  it("uses class-based dark mode toggling in ThemeProvider", () => {
    const provider = fs.readFileSync(providerPath, "utf8");
    expect(provider).toContain('classList.toggle("dark"');
    expect(provider).toContain("colorScheme");
  });
});
