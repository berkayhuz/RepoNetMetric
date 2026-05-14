import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@netmetric/ui";

import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { deleteLeadAction } from "@/features/leads/actions/lead-mutation-actions";
import { getLeadDetailData } from "@/features/leads/data/leads-data";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type LeadDetailDto } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/leads/${resolved.id}`);

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let lead: LeadDetailDto;

  try {
    lead = await getLeadDetailData(resolved.id, `/leads/${resolved.id}`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/leads/${resolved.id}`);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={lead.fullName}
        description="Lead detail."
        actions={
          <Button asChild>
            <Link href={`/leads/${resolved.id}/edit`}>Edit lead</Link>
          </Button>
        }
      />
      <CrmEntityDetailPanel
        title="Lead profile"
        fields={[
          { label: "Lead code", value: lead.leadCode },
          { label: "Full name", value: lead.fullName },
          { label: "Company", value: lead.companyName },
          { label: "Email", value: lead.email },
          { label: "Phone", value: lead.phone },
          { label: "Status", value: String(lead.status) },
          { label: "Source", value: String(lead.source) },
          { label: "Priority", value: String(lead.priority) },
          { label: "Score", value: lead.totalScore },
          { label: "Grade", value: String(lead.grade) },
          { label: "SLA breached", value: lead.slaBreached ? "Yes" : "No" },
          { label: "State", value: lead.isActive ? "Active" : "Inactive" },
        ]}
      />
      <CrmDeleteZone
        title="Delete Lead"
        description="Deleting this lead removes it from active CRM views."
      >
        <CrmDeleteConfirmForm
          entityLabel="Lead"
          entityName={lead.fullName}
          confirmValue="delete-lead"
          action={deleteLeadAction.bind(null, resolved.id)}
        />
      </CrmDeleteZone>
      <CrmContractPending module="Lead timeline, conversion, and assignment operations" />
    </section>
  );
}
