import { OverviewDataPanel } from "@/features/account/components/overview-data-panel";
import { getOverviewForPage } from "@/features/account/data/account-read-data";
import { handleAccountApiPageError } from "@/lib/auth/handle-account-api-page-error";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function AccountOverviewPage() {
  await requireAccountSession("/");

  let overview;
  try {
    overview = await getOverviewForPage();
  } catch (error) {
    handleAccountApiPageError(error);
  }

  return <OverviewDataPanel overview={overview} />;
}
