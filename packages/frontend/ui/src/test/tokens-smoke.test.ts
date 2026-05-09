/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stylesDir = path.resolve(__dirname, "../styles");

function readStyleFile(name: string) {
  return fs.readFileSync(path.join(stylesDir, name), "utf-8");
}

describe("token/css smoke", () => {
  it("tokens.css contains critical variables", () => {
    const tokensCss = readStyleFile("tokens.css");

    expect(tokensCss).toContain("--nm-background");
    expect(tokensCss).toContain("--nm-foreground");
    expect(tokensCss).toContain("--nm-focus-ring");
    expect(tokensCss).toContain("--nm-overlay-backdrop");
    expect(tokensCss).toContain("--nm-state-focus-ring-width");
  });

  it("theme.css exposes semantic aliases", () => {
    const themeCss = readStyleFile("theme.css");

    expect(themeCss).toContain("--color-background");
    expect(themeCss).toContain("--color-focus-ring");
    expect(themeCss).toContain("--color-overlay-backdrop");
    expect(themeCss).toContain("--leading-normal");
    expect(themeCss).toContain("--font-weight-medium");
    expect(themeCss).toContain("--tracking-normal");
  });
});
