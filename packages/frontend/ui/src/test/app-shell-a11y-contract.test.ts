/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../../..");

function read(relativePath: string): string {
  return fs.readFileSync(path.resolve(repoRoot, relativePath), "utf8");
}

describe("app shell accessibility contract", () => {
  it("keeps skip-link and main landmark patterns across representative apps", () => {
    const authLayout = read("apps/auth-web/src/app/layout.tsx");
    const accountShell = read("apps/account-web/src/features/account/components/account-shell.tsx");
    const crmShell = read("apps/crm-web/src/components/shell/crm-shell.tsx");
    const toolsLayout = read("apps/tools-web/src/app/layout.tsx");
    const publicLayout = read("apps/public-web/src/app/layout.tsx");

    expect(authLayout).toContain('href="#main-content"');
    expect(authLayout).toContain('<main id="main-content"');

    expect(accountShell).toContain('href="#main-content"');
    expect(accountShell).toContain('<main id="main-content"');

    expect(crmShell).toContain('href="#main-content"');
    expect(crmShell).toContain('<main id="main-content"');

    expect(toolsLayout).toContain('href="#main-content"');
    expect(toolsLayout).toContain('<main id="main-content"');

    expect(publicLayout).toContain('href="#main-content"');
    expect(publicLayout).toContain('<main id="main-content"');
  });
});
