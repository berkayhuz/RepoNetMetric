import { notFound } from "next/navigation";

import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { getOpportunityDetailData } from "@/features/opportunities/data/opportunities-data";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type OpportunityDetailDto } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  await requireCrmSession(`/opportunities/${resolved.id}`);

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
      <CrmPageHeader title={opportunity.name} description="Read-only opportunity detail." />
      <CrmEntityDetailPanel
        title="Opportunity profile"
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
      <CrmContractPending module="Opportunity timeline, quote, and stage transition operations" />
    </section>
  );
}
