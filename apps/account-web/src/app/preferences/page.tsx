import { updatePreferencesAction } from "@/features/account/actions/preferences-actions";
import { PreferencesEditForm } from "@/features/account/components/preferences-edit-form";
import { getPreferencesForPage } from "@/features/account/data/account-read-data";
import { handleAccountApiPageError } from "@/lib/auth/handle-account-api-page-error";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function PreferencesPage() {
  await requireAccountSession("/preferences");

  let preferences;
  try {
    preferences = await getPreferencesForPage();
  } catch (error) {
    handleAccountApiPageError(error);
  }

  return <PreferencesEditForm preferences={preferences} action={updatePreferencesAction} />;
}
