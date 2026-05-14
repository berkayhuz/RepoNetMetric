import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@netmetric/ui";

import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { deleteCompanyAction } from "@/features/companies/actions/company-mutation-actions";
import { getCompanyDetailData } from "@/features/companies/data/companies-data";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type CompanyDetailDto } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/companies/${resolved.id}`);

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let company: CompanyDetailDto;

  try {
    company = await getCompanyDetailData(resolved.id, `/companies/${resolved.id}`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/companies/${resolved.id}`);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={company.name}
        description="Read-only company detail."
        actions={
          <Button asChild>
            <Link href={`/companies/${resolved.id}/edit`}>Edit company</Link>
          </Button>
        }
      />
      <CrmEntityDetailPanel
        title="Profile"
        fields={[
          { label: "Name", value: company.name },
          { label: "Email", value: company.email },
          { label: "Phone", value: company.phone },
          { label: "Sector", value: company.sector },
          { label: "Type", value: company.companyType },
          { label: "Website", value: company.website },
          { label: "Tax number", value: company.taxNumber },
          { label: "Status", value: company.isActive ? "Active" : "Inactive" },
        ]}
      />
      <CrmDeleteZone
        title="Delete Company"
        description="Deleting this company removes it from active CRM views."
      >
        <CrmDeleteConfirmForm
          entityLabel="Company"
          entityName={company.name}
          confirmValue="delete-company"
          action={deleteCompanyAction.bind(null, resolved.id)}
        />
      </CrmDeleteZone>
      <CrmContractPending module="Company relationships and notes" />
    </section>
  );
}
