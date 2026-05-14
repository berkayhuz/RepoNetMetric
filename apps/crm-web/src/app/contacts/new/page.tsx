import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { ContactForm } from "@/features/contacts/forms/contact-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function NewContactPage() {
  await requireCrmSession("/contacts/new");

  return (
    <CrmEntityFormShell title="Create Contact" description="Add a new contact record.">
      <ContactForm mode="create" />
    </CrmEntityFormShell>
  );
}
