import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { CompanyForm } from "@/features/companies/forms/company-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function NewCompanyPage() {
  await requireCrmSession("/companies/new");

  return (
    <CrmEntityFormShell title="Create Company" description="Add a new company record.">
      <CompanyForm mode="create" />
    </CrmEntityFormShell>
  );
}
