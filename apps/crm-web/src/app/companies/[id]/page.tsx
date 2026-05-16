import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@netmetric/ui";

import { AddressSection } from "@/components/address/address-section";
import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { deleteCompanyAction } from "@/features/companies/actions/company-mutation-actions";
import { getCompanyDetailData } from "@/features/companies/data/companies-data";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type CompanyDetailDto } from "@/lib/crm-api";
import { crmCapabilityAllows } from "@/lib/crm-auth/crm-capabilities";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  const session = await requireCrmSession(`/companies/${resolved.id}`);
  const locale = await getRequestLocale();
  const canEdit = crmCapabilityAllows(session.capabilities, "companies.edit");
  const canDelete = crmCapabilityAllows(session.capabilities, "companies.delete");

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
        description={tCrm("crm.companies.pages.detail.description", locale)}
        actions={
          canEdit ? (
            <Button asChild>
              <Link href={`/companies/${resolved.id}/edit`}>
                {tCrm("crm.companies.actions.edit", locale)}
              </Link>
            </Button>
          ) : undefined
        }
      />
      <CrmEntityDetailPanel
        title={tCrm("crm.companies.pages.detail.profileTitle", locale)}
        fields={[
          { label: tCrm("crm.companies.fields.name", locale), value: company.name },
          { label: tCrm("crm.companies.fields.email", locale), value: company.email },
          { label: tCrm("crm.companies.fields.phone", locale), value: company.phone },
          { label: tCrm("crm.companies.fields.sector", locale), value: company.sector },
          { label: tCrm("crm.companies.fields.companyType", locale), value: company.companyType },
          { label: tCrm("crm.companies.fields.website", locale), value: company.website },
          { label: tCrm("crm.companies.fields.taxNumber", locale), value: company.taxNumber },
          {
            label: tCrm("crm.companies.fields.status", locale),
            value: company.isActive
              ? tCrm("crm.common.active", locale)
              : tCrm("crm.common.inactive", locale),
          },
        ]}
      />
      <AddressSection
        entityType="company"
        entityId={resolved.id}
        addresses={company.addresses}
        canManage={canEdit || canDelete}
      />
      {canDelete ? (
        <CrmDeleteZone
          title={tCrm("crm.companies.actions.delete", locale)}
          description={tCrm("crm.companies.pages.detail.deleteDescription", locale)}
          locale={locale}
        >
          <CrmDeleteConfirmForm
            entityLabel={tCrm("crm.companies.entityName", locale)}
            entityName={company.name}
            confirmValue="delete-company"
            action={deleteCompanyAction.bind(null, resolved.id)}
          />
        </CrmDeleteZone>
      ) : null}
      <CrmContractPending module={tCrm("crm.companies.pages.detail.pendingModule", locale)} />
    </section>
  );
}
