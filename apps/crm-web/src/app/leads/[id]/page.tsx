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
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/leads/${resolved.id}`);
  const locale = await getRequestLocale();

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
        description={tCrm("crm.leads.pages.detail.description", locale)}
        actions={
          <Button asChild>
            <Link href={`/leads/${resolved.id}/edit`}>
              {tCrm("crm.leads.actions.edit", locale)}
            </Link>
          </Button>
        }
      />
      <CrmEntityDetailPanel
        title={tCrm("crm.leads.pages.detail.profileTitle", locale)}
        fields={[
          { label: tCrm("crm.leads.fields.leadCode", locale), value: lead.leadCode },
          { label: tCrm("crm.leads.fields.fullName", locale), value: lead.fullName },
          { label: tCrm("crm.leads.fields.company", locale), value: lead.companyName },
          { label: tCrm("crm.leads.fields.email", locale), value: lead.email },
          { label: tCrm("crm.leads.fields.phone", locale), value: lead.phone },
          {
            label: tCrm("crm.leads.fields.status", locale),
            value: tCrm(`crm.leads.status.${lead.status}`, locale),
          },
          {
            label: tCrm("crm.leads.fields.source", locale),
            value: tCrm(`crm.leads.source.${lead.source}`, locale),
          },
          {
            label: tCrm("crm.leads.fields.priority", locale),
            value: tCrm(`crm.common.priority.${lead.priority}`, locale),
          },
          { label: tCrm("crm.leads.fields.score", locale), value: lead.totalScore },
          { label: tCrm("crm.leads.fields.grade", locale), value: String(lead.grade) },
          {
            label: tCrm("crm.leads.fields.slaBreached", locale),
            value: lead.slaBreached
              ? tCrm("crm.common.yes", locale)
              : tCrm("crm.common.no", locale),
          },
          {
            label: tCrm("crm.leads.fields.state", locale),
            value: lead.isActive
              ? tCrm("crm.common.active", locale)
              : tCrm("crm.common.inactive", locale),
          },
        ]}
      />
      <CrmDeleteZone
        title={tCrm("crm.leads.actions.delete", locale)}
        description={tCrm("crm.leads.pages.detail.deleteDescription", locale)}
      >
        <CrmDeleteConfirmForm
          entityLabel={tCrm("crm.leads.entityName", locale)}
          entityName={lead.fullName}
          confirmValue="delete-lead"
          action={deleteLeadAction.bind(null, resolved.id)}
        />
      </CrmDeleteZone>
      <CrmContractPending module={tCrm("crm.leads.pages.detail.pendingModule", locale)} />
    </section>
  );
}
