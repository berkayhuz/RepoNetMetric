import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@netmetric/ui";

import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { deleteQuoteAction } from "@/features/quotes/actions/quote-mutation-actions";
import { getQuoteDetailData } from "@/features/quotes/data/quotes-data";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type QuoteDetailDto } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/quotes/${resolved.id}`);

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let quote: QuoteDetailDto;

  try {
    quote = await getQuoteDetailData(resolved.id, `/quotes/${resolved.id}`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/quotes/${resolved.id}`);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={quote.quoteNumber}
        description="Quote detail."
        actions={
          <Button asChild>
            <Link href={`/quotes/${resolved.id}/edit`}>Edit quote</Link>
          </Button>
        }
      />
      <CrmEntityDetailPanel
        title="Quote profile"
        fields={[
          { label: "Quote number", value: quote.quoteNumber },
          { label: "Proposal title", value: quote.proposalTitle },
          { label: "Status", value: String(quote.status) },
          { label: "Quote date", value: quote.quoteDate },
          { label: "Valid until", value: quote.validUntil },
          { label: "Currency", value: quote.currencyCode },
          { label: "Grand total", value: quote.grandTotal },
          { label: "Revision", value: quote.revisionNumber },
          { label: "Opportunity id", value: quote.opportunityId },
          { label: "Customer id", value: quote.customerId },
          { label: "Owner user id", value: quote.ownerUserId },
        ]}
      />
      <CrmEntityDetailPanel
        title="Line items summary"
        fields={[
          { label: "Line count", value: quote.items.length },
          {
            label: "Latest status change",
            value: quote.history[0]?.changedAt ?? null,
          },
        ]}
      />
      <CrmDeleteZone
        title="Delete Quote"
        description="Deleting this quote removes it from active CRM views."
      >
        <CrmDeleteConfirmForm
          entityLabel="Quote"
          entityName={quote.quoteNumber}
          confirmValue="delete-quote"
          action={deleteQuoteAction.bind(null, resolved.id)}
        />
      </CrmDeleteZone>
      <CrmContractPending module="Quote lifecycle actions, line editing, and approval operations" />
    </section>
  );
}
