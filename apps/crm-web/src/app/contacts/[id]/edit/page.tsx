import { notFound } from "next/navigation";

import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { getContactDetailData } from "@/features/contacts/data/contacts-data";
import { ContactForm } from "@/features/contacts/forms/contact-form";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function EditContactPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/contacts/${resolved.id}/edit`);
  const locale = await getRequestLocale();

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let contact;

  try {
    contact = await getContactDetailData(resolved.id, `/contacts/${resolved.id}/edit`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/contacts/${resolved.id}/edit`);
  }

  return (
    <CrmEntityFormShell
      title={tCrm("crm.contacts.pages.edit.title", locale)}
      description={tCrm("crm.contacts.pages.edit.description", locale)}
    >
      <ContactForm
        mode="edit"
        contactId={resolved.id}
        initialValues={{
          firstName: contact.firstName,
          lastName: contact.lastName,
          title: contact.title ?? "",
          email: contact.email ?? "",
          mobilePhone: contact.mobilePhone ?? "",
          workPhone: contact.workPhone ?? "",
          personalPhone: contact.personalPhone ?? "",
          birthDate: contact.birthDate?.slice(0, 10) ?? "",
          gender: Number(contact.gender),
          department: contact.department ?? "",
          jobTitle: contact.jobTitle ?? "",
          description: contact.description ?? "",
          notes: contact.notes ?? "",
          ownerUserId: contact.ownerUserId ?? "",
          companyId: contact.companyId ?? "",
          customerId: contact.customerId ?? "",
          isPrimaryContact: contact.isPrimaryContact,
          rowVersion: contact.rowVersion,
        }}
      />
    </CrmEntityFormShell>
  );
}
