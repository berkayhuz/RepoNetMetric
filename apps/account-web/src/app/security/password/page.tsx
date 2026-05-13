import { ScaffoldPage } from "@/features/account/components/scaffold-page";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function SecurityPasswordPage() {
  await requireAccountSession();

  return (
    <ScaffoldPage
      title="Security Password"
      description="Password change scaffold. Real mutation flow and validations will be added in a dedicated security phase."
    />
  );
}
