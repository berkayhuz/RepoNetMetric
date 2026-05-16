import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { ContactForm } from "@/features/contacts/forms/contact-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function NewContactPage() {
  await requireCrmSession("/contacts/new");
  const locale = await getRequestLocale();

  return (
    <CrmEntityFormShell
      title={tCrm("crm.contacts.pages.create.title", locale)}
      description={tCrm("crm.contacts.pages.create.description", locale)}
    >
      <ContactForm mode="create" />
    </CrmEntityFormShell>
  );
}
