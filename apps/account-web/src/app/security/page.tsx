import { ScaffoldPage } from "@/features/account/components/scaffold-page";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function SecurityPage() {
  await requireAccountSession();

  return (
    <ScaffoldPage
      title="Security"
      description="Security page scaffold. This route will host account security controls once auth and API bridge work is complete."
    />
  );
}
