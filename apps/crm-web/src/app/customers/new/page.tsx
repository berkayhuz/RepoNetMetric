import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { CustomerForm } from "@/features/customers/forms/customer-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function NewCustomerPage() {
  await requireCrmSession("/customers/new");
  const locale = await getRequestLocale();

  return (
    <CrmEntityFormShell
      title={tCrm("crm.customers.pages.create.title", locale)}
      description={tCrm("crm.customers.pages.create.description", locale)}
    >
      <CustomerForm mode="create" />
    </CrmEntityFormShell>
  );
}
