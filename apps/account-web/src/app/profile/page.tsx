import { updateProfileAction } from "@/features/account/actions/profile-actions";
import { ProfileEditForm } from "@/features/account/components/profile-edit-form";
import {
  getAccountOptionsForPage,
  getProfileForPage,
} from "@/features/account/data/account-read-data";
import { handleAccountApiPageError } from "@/lib/auth/handle-account-api-page-error";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function ProfilePage() {
  await requireAccountSession("/profile");

  let profile;
  let options;
  try {
    [profile, options] = await Promise.all([getProfileForPage(), getAccountOptionsForPage()]);
  } catch (error) {
    handleAccountApiPageError(error);
  }

  return <ProfileEditForm profile={profile} options={options} action={updateProfileAction} />;
}
