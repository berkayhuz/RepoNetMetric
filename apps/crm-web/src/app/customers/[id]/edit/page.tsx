import { notFound } from "next/navigation";

import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { getCustomerDetailData } from "@/features/customers/data/customers-data";
import { CustomerForm } from "@/features/customers/forms/customer-form";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/customers/${resolved.id}/edit`);

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let customer;

  try {
    customer = await getCustomerDetailData(resolved.id, `/customers/${resolved.id}/edit`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/customers/${resolved.id}/edit`);
  }

  return (
    <CrmEntityFormShell title="Edit Customer" description="Update customer profile fields.">
      <CustomerForm
        mode="edit"
        customerId={resolved.id}
        initialValues={{
          firstName: customer.firstName,
          lastName: customer.lastName,
          title: customer.title ?? "",
          email: customer.email ?? "",
          mobilePhone: customer.mobilePhone ?? "",
          workPhone: customer.workPhone ?? "",
          personalPhone: customer.personalPhone ?? "",
          birthDate: customer.birthDate?.slice(0, 10) ?? "",
          gender: Number(customer.gender),
          department: customer.department ?? "",
          jobTitle: customer.jobTitle ?? "",
          description: customer.description ?? "",
          notes: customer.notes ?? "",
          ownerUserId: customer.ownerUserId ?? "",
          customerType: Number(customer.customerType),
          identityNumber: customer.identityNumber ?? "",
          isVip: customer.isVip,
          companyId: customer.companyId ?? "",
          rowVersion: customer.rowVersion,
        }}
      />
    </CrmEntityFormShell>
  );
}
