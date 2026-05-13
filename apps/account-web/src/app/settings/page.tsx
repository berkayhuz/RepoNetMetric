import { SettingsHubPanel } from "@/features/account/components/settings-hub-panel";
import {
  getOverviewForPage,
  getPreferencesForPage,
  getProfileForPage,
} from "@/features/account/data/account-read-data";
import { handleAccountApiPageError } from "@/lib/auth/handle-account-api-page-error";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function SettingsPage() {
  await requireAccountSession("/settings");

  let overview;
  let profile;
  let preferences;
  try {
    [overview, profile, preferences] = await Promise.all([
      getOverviewForPage(),
      getProfileForPage(),
      getPreferencesForPage(),
    ]);
  } catch (error) {
    handleAccountApiPageError(error);
  }

  return (
    <SettingsHubPanel
      displayName={profile.displayName || overview.displayName}
      language={preferences.language}
      timeZone={preferences.timeZone}
    />
  );
}
