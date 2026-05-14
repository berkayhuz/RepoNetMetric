import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@netmetric/ui";

import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { deleteCustomerAction } from "@/features/customers/actions/customer-mutation-actions";
import { getCustomerDetailData } from "@/features/customers/data/customers-data";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type CustomerDetailDto } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/customers/${resolved.id}`);

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let customer: CustomerDetailDto;

  try {
    customer = await getCustomerDetailData(resolved.id, `/customers/${resolved.id}`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/customers/${resolved.id}`);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={customer.fullName}
        description="Read-only customer detail."
        actions={
          <Button asChild>
            <Link href={`/customers/${resolved.id}/edit`}>Edit customer</Link>
          </Button>
        }
      />
      <CrmEntityDetailPanel
        title="Profile"
        fields={[
          { label: "First name", value: customer.firstName },
          { label: "Last name", value: customer.lastName },
          { label: "Email", value: customer.email },
          { label: "Mobile", value: customer.mobilePhone },
          { label: "Company", value: customer.companyName },
          { label: "Customer type", value: customer.customerType },
          { label: "VIP", value: customer.isVip ? "Yes" : "No" },
          { label: "Status", value: customer.isActive ? "Active" : "Inactive" },
        ]}
      />
      <CrmDeleteZone
        title="Delete Customer"
        description="Deleting this customer removes it from active CRM views."
      >
        <CrmDeleteConfirmForm
          entityLabel="Customer"
          entityName={customer.fullName}
          confirmValue="delete-customer"
          action={deleteCustomerAction.bind(null, resolved.id)}
        />
      </CrmDeleteZone>
      <CrmContractPending module="Customer timeline and activities" />
    </section>
  );
}
