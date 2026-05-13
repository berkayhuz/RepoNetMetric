import { ScaffoldPage } from "@/features/account/components/scaffold-page";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function SecurityMfaPage() {
  await requireAccountSession("/security/mfa");

  return (
    <ScaffoldPage
      title="Security MFA"
      description="MFA setup and management scaffold. Verification and recovery flows are intentionally deferred."
    />
  );
}
