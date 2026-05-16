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
import { crmCapabilityAllows } from "@/lib/crm-auth/crm-capabilities";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm, tCrmWithFallback } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  const session = await requireCrmSession(`/opportunities/${resolved.id}`);
  const locale = await getRequestLocale();
  const canEdit = crmCapabilityAllows(session.capabilities, "opportunities.edit");
  const canDelete = crmCapabilityAllows(session.capabilities, "opportunities.delete");

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
          canEdit ? (
            <Button asChild>
              <Link href={`/opportunities/${resolved.id}/edit`}>
                {tCrm("crm.opportunities.actions.edit", locale)}
              </Link>
            </Button>
          ) : undefined
        }
      />
      <CrmEntityDetailPanel
        title={tCrm("crm.opportunities.pages.detail.profileTitle", locale)}
        fields={[
          {
            label: tCrm("crm.opportunities.fields.code", locale),
            value: opportunity.opportunityCode,
          },
          {
            label: tCrm("crm.opportunities.fields.stage", locale),
            value: tCrmWithFallback(
              `crm.opportunities.stage.${opportunity.stage}`,
              String(opportunity.stage),
              locale,
            ),
          },
          {
            label: tCrm("crm.opportunities.fields.status", locale),
            value: tCrmWithFallback(
              `crm.opportunities.status.${opportunity.status}`,
              String(opportunity.status),
              locale,
            ),
          },
          {
            label: tCrm("crm.opportunities.fields.priority", locale),
            value: tCrmWithFallback(
              `crm.common.priority.${opportunity.priority}`,
              String(opportunity.priority),
              locale,
            ),
          },
          {
            label: tCrm("crm.opportunities.fields.estimatedAmount", locale),
            value: opportunity.estimatedAmount,
          },
          {
            label: tCrm("crm.opportunities.fields.expectedRevenue", locale),
            value: opportunity.expectedRevenue,
          },
          {
            label: tCrm("crm.opportunities.fields.probability", locale),
            value: opportunity.probability,
          },
          {
            label: tCrm("crm.opportunities.fields.estimatedCloseDate", locale),
            value: opportunity.estimatedCloseDate,
          },
          { label: tCrm("crm.opportunities.fields.leadId", locale), value: opportunity.leadId },
          {
            label: tCrm("crm.opportunities.fields.customerId", locale),
            value: opportunity.customerId,
          },
          {
            label: tCrm("crm.opportunities.fields.ownerUserId", locale),
            value: opportunity.ownerUserId,
          },
          {
            label: tCrm("crm.common.columns.state", locale),
            value: opportunity.isActive
              ? tCrm("crm.states.active", locale)
              : tCrm("crm.states.inactive", locale),
          },
        ]}
      />
      {canDelete ? (
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
      ) : null}
      <CrmContractPending module={tCrm("crm.opportunities.pages.detail.pendingModule", locale)} />
    </section>
  );
}
