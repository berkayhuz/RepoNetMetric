import { createElement } from "react";
import { afterEach } from "vitest";
import { describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { ProfileEditForm } from "./profile-edit-form";
import { PreferencesEditForm } from "./preferences-edit-form";
import { UserAvatar } from "./user-avatar";
import { SessionsManagementPanel } from "./sessions-management-panel";
import type { MutationState } from "../actions/mutation-state";
import type {
  AccountOptionsResponse,
  MyProfileResponse,
  OrganizationMembershipSummaryResponse,
  TrustedDevicesResponse,
  UserPreferenceResponse,
  UserSessionsResponse,
} from "../../../lib/account-api";

afterEach(() => {
  cleanup();
});

const options: AccountOptionsResponse = {
  languages: [
    { value: "en-US", label: "English" },
    { value: "tr-TR", label: "Turkish" },
  ],
  timeZones: [{ value: "UTC", label: "UTC" }],
  themes: [
    { value: "System", label: "System" },
    { value: "Default", label: "Default" },
    { value: "Dark", label: "Dark" },
    { value: "Light", label: "Light" },
  ],
  dateFormats: [{ value: "yyyy-MM-dd", label: "2026-05-15" }],
  phoneCountries: [{ iso2: "TR", name: "Turkey", dialCode: "+90" }],
};

const profile: MyProfileResponse = {
  id: "p1",
  tenantId: "t1",
  userId: "u1",
  firstName: "Ada",
  lastName: "Lovelace",
  displayName: "Ada Lovelace",
  phoneNumber: null,
  phoneCountryIso2: null,
  phoneCountryCallingCode: null,
  phoneNationalNumber: null,
  avatarUrl: null,
  jobTitle: null,
  department: null,
  timeZone: "UTC",
  culture: "en-US",
  version: "v1",
};

const preferences: UserPreferenceResponse = {
  id: "pref1",
  theme: "System",
  language: "en-US",
  timeZone: "UTC",
  dateFormat: "yyyy-MM-dd",
  defaultOrganizationId: null,
  version: "v1",
};

const organizations: OrganizationMembershipSummaryResponse[] = [
  {
    organizationId: "org1",
    tenantId: "tenant1",
    organizationName: "Main Org",
    organizationSlug: "main-org",
    status: "active",
    isDefault: true,
    joinedAt: "2026-05-15T00:00:00Z",
    lastPermissionRefreshAt: null,
    roles: ["owner"],
  },
];

const sessions: UserSessionsResponse = {
  items: [
    {
      id: "s1",
      deviceName: "Current Device",
      ipAddress: "127.0.0.1",
      userAgent: "UA",
      approximateLocation: "Local",
      createdAt: "2026-05-15T10:00:00Z",
      lastSeenAt: "2026-05-15T10:00:00Z",
      expiresAt: "2026-05-16T10:00:00Z",
      isCurrent: true,
      isActive: true,
    },
    {
      id: "s2",
      deviceName: "Other Device",
      ipAddress: "127.0.0.2",
      userAgent: "UA2",
      approximateLocation: "Local",
      createdAt: "2026-05-15T08:00:00Z",
      lastSeenAt: "2026-05-15T09:00:00Z",
      expiresAt: "2026-05-16T08:00:00Z",
      isCurrent: false,
      isActive: true,
    },
  ],
};

const devices: TrustedDevicesResponse = {
  items: [
    {
      id: "d1",
      name: "Laptop",
      userAgent: "UA",
      ipAddress: "127.0.0.1",
      trustedAt: "2026-05-15T08:00:00Z",
      expiresAt: "2026-06-15T09:00:00Z",
      isCurrent: false,
      isActive: true,
    },
  ],
};

describe("Account forms and panels", () => {
  const idleMutation = async (
    previous: MutationState,
    formData: FormData,
  ): Promise<MutationState> => {
    void previous;
    void formData;
    return { status: "idle" };
  };

  it("renders profile selects from options", () => {
    render(createElement(ProfileEditForm, { profile, options, action: idleMutation }));
    expect(screen.getByLabelText("Phone country")).toBeTruthy();
    expect(screen.getByLabelText("Time zone")).toBeTruthy();
    expect(screen.getByLabelText("Language")).toBeTruthy();
    expect(screen.getByRole("option", { name: /Turkey/i })).toBeTruthy();
  });

  it("renders preferences selects including default organization", () => {
    render(
      createElement(PreferencesEditForm, {
        preferences,
        options,
        organizations,
        action: idleMutation,
      }),
    );
    expect(screen.getByLabelText("Language")).toBeTruthy();
    expect(screen.getByLabelText("Time zone")).toBeTruthy();
    expect(screen.getByLabelText("Theme")).toBeTruthy();
    expect(screen.getByLabelText("Date format")).toBeTruthy();
    expect(screen.getByLabelText("Default organization")).toBeTruthy();
    expect(screen.getByRole("option", { name: /Main Org/i })).toBeTruthy();
  });

  it("renders default avatar when avatar url is missing", () => {
    render(createElement(UserAvatar, { displayName: "Ada Lovelace", avatarUrl: null }));
    expect(screen.getByLabelText("Ada Lovelace default avatar")).toBeTruthy();
    expect(screen.getByText("AL")).toBeTruthy();
  });

  it("exposes revoke-one and revoke-all-other actions", () => {
    render(
      createElement(SessionsManagementPanel, {
        sessions,
        trustedDevices: devices,
        dateSettings: { locale: "en-US", timeZone: "UTC", dateFormat: "yyyy-MM-dd" },
        revokeSessionAction: idleMutation,
        revokeOtherSessionsAction: idleMutation,
        revokeTrustedDeviceAction: idleMutation,
        revokeOtherTrustedDevicesAction: idleMutation,
      }),
    );

    expect(screen.getByText("Revoke this session")).toBeTruthy();
    expect(screen.getByText("Revoke all other sessions")).toBeTruthy();
    expect(screen.getByText("Revoke trusted device")).toBeTruthy();
    expect(screen.getByText("Revoke all other trusted devices")).toBeTruthy();
  });
});
