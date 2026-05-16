import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shellPath = path.resolve(__dirname, "./crm-shell.tsx");

describe("CRM shell disabled MVP controls", () => {
  it("keeps global search and quick create non-clickable until implementations are wired", () => {
    const source = fs.readFileSync(shellPath, "utf8");

    expect(source).toContain('aria-disabled="true"');
    expect(source).toContain("disabled");
    expect(source).toContain("crm.shell.globalSearchAria");
    expect(source).toContain("crm.actions.quickCreate");
  });
});
