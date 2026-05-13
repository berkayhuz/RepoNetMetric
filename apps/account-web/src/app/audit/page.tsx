import { ScaffoldPage } from "@/features/account/components/scaffold-page";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function AuditPage() {
  await requireAccountSession();

  return (
    <ScaffoldPage
      title="Audit"
      description="Account audit timeline scaffold. Activity retrieval and filtering will be implemented in later phases."
    />
  );
}
