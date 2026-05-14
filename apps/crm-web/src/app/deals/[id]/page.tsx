import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@netmetric/ui";

import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import {
  changeDealOwnerAction,
  markDealLostAction,
  markDealWonAction,
  reopenDealAction,
} from "@/features/deals/actions/deal-lifecycle-actions";
import { deleteDealAction } from "@/features/deals/actions/deal-mutation-actions";
import { getDealDetailData, getDealLostReasonsData } from "@/features/deals/data/deals-data";
import {
  DealLifecycleActionPanel,
  DealOwnerActionPanel,
} from "@/features/deals/forms/deal-lifecycle-panels";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type DealDetailDto, type DealLostReasonDto } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function DealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/deals/${resolved.id}`);

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let deal: DealDetailDto;
  let lostReasons: DealLostReasonDto[] = [];

  try {
    deal = await getDealDetailData(resolved.id, `/deals/${resolved.id}`);
    lostReasons = await getDealLostReasonsData(`/deals/${resolved.id}`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/deals/${resolved.id}`);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={deal.name}
        description="Deal detail."
        actions={
          <Button asChild>
            <Link href={`/deals/${resolved.id}/edit`}>Edit deal</Link>
          </Button>
        }
      />
      <CrmEntityDetailPanel
        title="Deal profile"
        fields={[
          { label: "Deal code", value: deal.dealCode },
          { label: "Name", value: deal.name },
          { label: "Amount", value: deal.totalAmount },
          { label: "Closed date", value: deal.closedDate },
          { label: "Stage", value: String(deal.stage) },
          { label: "Outcome", value: String(deal.outcome) },
          { label: "Opportunity id", value: deal.opportunityId },
          { label: "Company id", value: deal.companyId },
          { label: "Owner user id", value: deal.ownerUserId },
          { label: "Lost reason id", value: deal.lostReasonId },
          { label: "Lost note", value: deal.lostNote },
          { label: "State", value: deal.isActive ? "Active" : "Inactive" },
        ]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <DealOwnerActionPanel
          dealId={resolved.id}
          ownerUserId={deal.ownerUserId ?? null}
          action={changeDealOwnerAction.bind(null, resolved.id)}
        />
        <DealLifecycleActionPanel
          title="Mark as Won"
          description="Mark this deal as won."
          confirmValue="mark-deal-won"
          action={markDealWonAction.bind(null, resolved.id)}
          rowVersion={deal.rowVersion}
        />
        <DealLifecycleActionPanel
          title="Mark as Lost"
          description="Mark this deal as lost and optionally select a reason."
          confirmValue="mark-deal-lost"
          action={markDealLostAction.bind(null, resolved.id)}
          showLostReason
          lostReasons={lostReasons}
          rowVersion={deal.rowVersion}
        />
        <DealLifecycleActionPanel
          title="Reopen Deal"
          description="Reopen this deal after win/loss closure."
          confirmValue="reopen-deal"
          action={reopenDealAction.bind(null, resolved.id)}
          rowVersion={deal.rowVersion}
        />
      </div>
      <CrmDeleteZone
        title="Delete Deal"
        description="Deleting this deal removes it from active CRM views."
      >
        <CrmDeleteConfirmForm
          entityLabel="Deal"
          entityName={deal.name}
          confirmValue="delete-deal"
          action={deleteDealAction.bind(null, resolved.id)}
        />
      </CrmDeleteZone>
      <CrmContractPending module="Deal bulk owner change and win-loss review workflows" />
    </section>
  );
}
