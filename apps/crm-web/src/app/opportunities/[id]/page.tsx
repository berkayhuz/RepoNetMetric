import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@netmetric/ui";

import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { deleteOpportunityAction } from "@/features/opportunities/actions/opportunity-mutation-actions";
import { getOpportunityDetailData } from "@/features/opportunities/data/opportunities-data";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type OpportunityDetailDto } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  await requireCrmSession(`/opportunities/${resolved.id}`);
  const locale = await getRequestLocale();

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let opportunity: OpportunityDetailDto;

  try {
    opportunity = await getOpportunityDetailData(resolved.id, `/opportunities/${resolved.id}`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/opportunities/${resolved.id}`);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={opportunity.name}
        description={tCrm("crm.opportunities.pages.detail.description", locale)}
        actions={
          <Button asChild>
            <Link href={`/opportunities/${resolved.id}/edit`}>
              {tCrm("crm.opportunities.actions.edit", locale)}
            </Link>
          </Button>
        }
      />
      <CrmEntityDetailPanel
        title={tCrm("crm.opportunities.pages.detail.profileTitle", locale)}
        fields={[
          { label: "Code", value: opportunity.opportunityCode },
          { label: "Stage", value: String(opportunity.stage) },
          { label: "Status", value: String(opportunity.status) },
          { label: "Priority", value: String(opportunity.priority) },
          { label: "Estimated amount", value: opportunity.estimatedAmount },
          { label: "Expected revenue", value: opportunity.expectedRevenue },
          { label: "Probability", value: opportunity.probability },
          { label: "Estimated close date", value: opportunity.estimatedCloseDate },
          { label: "Lead id", value: opportunity.leadId },
          { label: "Customer id", value: opportunity.customerId },
          { label: "Owner user id", value: opportunity.ownerUserId },
          { label: "State", value: opportunity.isActive ? "Active" : "Inactive" },
        ]}
      />
      <CrmDeleteZone
        title={tCrm("crm.opportunities.actions.delete", locale)}
        description={tCrm("crm.opportunities.pages.detail.deleteDescription", locale)}
      >
        <CrmDeleteConfirmForm
          entityLabel={tCrm("crm.opportunities.entityName", locale)}
          entityName={opportunity.name}
          confirmValue="delete-opportunity"
          action={deleteOpportunityAction.bind(null, resolved.id)}
        />
      </CrmDeleteZone>
      <CrmContractPending module={tCrm("crm.opportunities.pages.detail.pendingModule", locale)} />
    </section>
  );
}
