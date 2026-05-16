import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { CompanyForm } from "@/features/companies/forms/company-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function NewCompanyPage() {
  await requireCrmSession("/companies/new");
  const locale = await getRequestLocale();

  return (
    <CrmEntityFormShell
      title={tCrm("crm.companies.pages.create.title", locale)}
      description={tCrm("crm.companies.pages.create.description", locale)}
    >
      <CompanyForm mode="create" />
    </CrmEntityFormShell>
  );
}
