import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@netmetric/ui";

import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { deleteContactAction } from "@/features/contacts/actions/contact-mutation-actions";
import { getContactDetailData } from "@/features/contacts/data/contacts-data";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type ContactDetailDto } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/contacts/${resolved.id}`);

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let contact: ContactDetailDto;

  try {
    contact = await getContactDetailData(resolved.id, `/contacts/${resolved.id}`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/contacts/${resolved.id}`);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={contact.fullName}
        description="Read-only contact detail."
        actions={
          <Button asChild>
            <Link href={`/contacts/${resolved.id}/edit`}>Edit contact</Link>
          </Button>
        }
      />
      <CrmEntityDetailPanel
        title="Profile"
        fields={[
          { label: "First name", value: contact.firstName },
          { label: "Last name", value: contact.lastName },
          { label: "Email", value: contact.email },
          { label: "Mobile", value: contact.mobilePhone },
          { label: "Company", value: contact.companyName },
          { label: "Customer", value: contact.customerName },
          { label: "Primary contact", value: contact.isPrimaryContact ? "Yes" : "No" },
          { label: "Status", value: contact.isActive ? "Active" : "Inactive" },
        ]}
      />
      <CrmDeleteZone
        title="Delete Contact"
        description="Deleting this contact removes it from active CRM views."
      >
        <CrmDeleteConfirmForm
          entityLabel="Contact"
          entityName={contact.fullName}
          confirmValue="delete-contact"
          action={deleteContactAction.bind(null, resolved.id)}
        />
      </CrmDeleteZone>
      <CrmContractPending module="Contact timeline and activities" />
    </section>
  );
}
