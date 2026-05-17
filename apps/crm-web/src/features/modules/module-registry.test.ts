import { describe, expect, it } from "vitest";

import { createCrmCapabilities } from "@/lib/crm-auth/crm-capabilities";

import { canNavigateCrmModule, getCrmModuleById, isCrmModuleNavigable } from "./module-registry";

describe("CRM module registry", () => {
  it("does not treat contract_pending modules as active navigation targets", () => {
    const moduleItem = getCrmModuleById("customer-intelligence");

    expect(moduleItem).toBeDefined();
    expect(moduleItem?.status).toBe("contract_pending");
    expect(isCrmModuleNavigable(moduleItem!)).toBe(false);
    expect(canNavigateCrmModule(moduleItem!, createCrmCapabilities(["*"]))).toBe(false);
  });

  it("keeps ready modules navigable when capabilities allow them", () => {
    const moduleItem = getCrmModuleById("customers");

    expect(moduleItem).toBeDefined();
    expect(isCrmModuleNavigable(moduleItem!)).toBe(true);
    expect(moduleItem?.endpointDiscoveryStatus).toBe("ready");
    expect(canNavigateCrmModule(moduleItem!, createCrmCapabilities(["customers.read"]))).toBe(true);
  });

  it("does not navigate modules when backend readiness is not ready", () => {
    const moduleItem = getCrmModuleById("activities");

    expect(moduleItem).toBeDefined();
    expect(moduleItem?.endpointDiscoveryStatus).toBe("contract_pending");
    expect(isCrmModuleNavigable(moduleItem!)).toBe(false);
  });

  it("denies ready modules when the capability map does not allow them", () => {
    const moduleItem = getCrmModuleById("customers");

    expect(moduleItem).toBeDefined();
    expect(canNavigateCrmModule(moduleItem!, createCrmCapabilities(["profile:self"]))).toBe(false);
  });
});
