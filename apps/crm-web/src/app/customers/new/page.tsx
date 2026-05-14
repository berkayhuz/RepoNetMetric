import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { CustomerForm } from "@/features/customers/forms/customer-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function NewCustomerPage() {
  await requireCrmSession("/customers/new");

  return (
    <CrmEntityFormShell title="Create Customer" description="Add a new customer record.">
      <CustomerForm mode="create" />
    </CrmEntityFormShell>
  );
}
