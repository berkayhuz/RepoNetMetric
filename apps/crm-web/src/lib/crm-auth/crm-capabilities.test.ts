import { describe, expect, it } from "vitest";

import {
  createCrmCapabilities,
  crmCapabilityAllows,
  getRequiredCrmCapabilityForPath,
} from "./crm-capabilities";

describe("CRM capability mapping", () => {
  it("denies unknown or missing permissions by default", () => {
    const capabilities = createCrmCapabilities(["unknown.permission"]);

    expect(crmCapabilityAllows(capabilities, "customers.create")).toBe(false);
    expect(crmCapabilityAllows(capabilities, "customers.read")).toBe(false);
  });

  it("maps backend permissions to frontend capabilities", () => {
    const capabilities = createCrmCapabilities([
      "crm.customer-management.customers.read",
      "customers.write",
    ]);

    expect(crmCapabilityAllows(capabilities, "customers.read")).toBe(true);
    expect(crmCapabilityAllows(capabilities, "customers.create")).toBe(true);
    expect(crmCapabilityAllows(capabilities, "customers.delete")).toBe(false);
  });

  it("maps service permissions to service module capabilities", () => {
    const capabilities = createCrmCapabilities([
      "support-inbox.messages.read",
      "ticket.sla-policies.manage",
      "ticket.queues.read",
    ]);

    expect(crmCapabilityAllows(capabilities, "supportInbox.read")).toBe(true);
    expect(crmCapabilityAllows(capabilities, "ticketSla.read")).toBe(true);
    expect(crmCapabilityAllows(capabilities, "ticketSla.manage")).toBe(true);
    expect(crmCapabilityAllows(capabilities, "ticketWorkflow.read")).toBe(true);
    expect(crmCapabilityAllows(capabilities, "ticketWorkflow.manage")).toBe(false);
  });

  it("allows known capabilities for wildcard tenant owners", () => {
    const capabilities = createCrmCapabilities(["*"]);

    expect(crmCapabilityAllows(capabilities, "customers.create")).toBe(true);
    expect(crmCapabilityAllows(capabilities, "tickets.delete")).toBe(true);
  });

  it("maps CRM entity routes to the required capability", () => {
    expect(getRequiredCrmCapabilityForPath("/customers")).toBe("customers.read");
    expect(getRequiredCrmCapabilityForPath("/customers/new")).toBe("customers.create");
    expect(
      getRequiredCrmCapabilityForPath("/customers/6f9619ff-8b86-d011-b42d-00cf4fc964ff/edit"),
    ).toBe("customers.edit");
    expect(getRequiredCrmCapabilityForPath("/quotes/6f9619ff-8b86-d011-b42d-00cf4fc964ff")).toBe(
      "quotes.read",
    );
    expect(getRequiredCrmCapabilityForPath("/tasks/new")).toBe("tasks.create");
    expect(getRequiredCrmCapabilityForPath("/tasks/meetings/new")).toBe("tasks.create");
    expect(getRequiredCrmCapabilityForPath("/support-inbox")).toBe("supportInbox.read");
    expect(getRequiredCrmCapabilityForPath("/ticket-sla")).toBe("ticketSla.read");
    expect(getRequiredCrmCapabilityForPath("/ticket-workflows")).toBe("ticketWorkflow.read");
    expect(getRequiredCrmCapabilityForPath("/unknown")).toBeNull();
  });
});
