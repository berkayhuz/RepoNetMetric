import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@netmetric/ui";

import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import {
  acceptQuoteAction,
  approveQuoteAction,
  createQuoteRevisionAction,
  declineQuoteAction,
  expireQuoteAction,
  markQuoteSentAction,
  rejectQuoteAction,
  submitQuoteAction,
} from "@/features/quotes/actions/quote-lifecycle-actions";
import { deleteQuoteAction } from "@/features/quotes/actions/quote-mutation-actions";
import { getQuoteDetailData } from "@/features/quotes/data/quotes-data";
import { QuoteLifecycleActionPanel } from "@/features/quotes/forms/quote-lifecycle-panels";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type QuoteDetailDto } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { tCrm, tCrmWithFallback } from "@/lib/i18n/crm-i18n";

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/quotes/${resolved.id}`);
  const locale = await getRequestLocale();

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
        description={tCrm("crm.quotes.detail.description", locale)}
        actions={
          <Button asChild>
            <Link href={`/quotes/${resolved.id}/edit`}>
              {tCrm("crm.quotes.actions.edit", locale)}
            </Link>
          </Button>
        }
      />
      <CrmEntityDetailPanel
        title={tCrm("crm.quotes.detail.profileTitle", locale)}
        fields={[
          { label: tCrm("crm.quotes.fields.quoteNumber", locale), value: quote.quoteNumber },
          { label: tCrm("crm.quotes.fields.proposalTitle", locale), value: quote.proposalTitle },
          {
            label: tCrm("crm.quotes.fields.status", locale),
            value: tCrmWithFallback(
              `crm.quotes.status.${quote.status}`,
              String(quote.status),
              locale,
            ),
          },
          { label: tCrm("crm.quotes.fields.quoteDate", locale), value: quote.quoteDate },
          { label: tCrm("crm.quotes.fields.validUntil", locale), value: quote.validUntil },
          { label: tCrm("crm.quotes.fields.currency", locale), value: quote.currencyCode },
          { label: tCrm("crm.quotes.fields.grandTotal", locale), value: quote.grandTotal },
          { label: tCrm("crm.quotes.fields.revision", locale), value: quote.revisionNumber },
          { label: tCrm("crm.quotes.fields.opportunityId", locale), value: quote.opportunityId },
          { label: tCrm("crm.quotes.fields.customerId", locale), value: quote.customerId },
          { label: tCrm("crm.quotes.fields.ownerUserId", locale), value: quote.ownerUserId },
        ]}
      />
      <CrmEntityDetailPanel
        title={tCrm("crm.quotes.lineItems.summaryTitle", locale)}
        fields={[
          { label: tCrm("crm.quotes.lineItems.lineCount", locale), value: quote.items.length },
          {
            label: tCrm("crm.quotes.lineItems.latestStatusChange", locale),
            value: quote.history[0]?.changedAt ?? null,
          },
        ]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <QuoteLifecycleActionPanel
          title={tCrm("crm.quotes.lifecycle.submit.title", locale)}
          description={tCrm("crm.quotes.lifecycle.submit.description", locale)}
          confirmValue="submit-quote"
          action={submitQuoteAction.bind(null, resolved.id)}
          rowVersion={quote.rowVersion}
        />
        <QuoteLifecycleActionPanel
          title={tCrm("crm.quotes.lifecycle.approve.title", locale)}
          description={tCrm("crm.quotes.lifecycle.approve.description", locale)}
          confirmValue="approve-quote"
          action={approveQuoteAction.bind(null, resolved.id)}
          rowVersion={quote.rowVersion}
        />
        <QuoteLifecycleActionPanel
          title={tCrm("crm.quotes.lifecycle.reject.title", locale)}
          description={tCrm("crm.quotes.lifecycle.reject.description", locale)}
          confirmValue="reject-quote"
          action={rejectQuoteAction.bind(null, resolved.id)}
          rowVersion={quote.rowVersion}
          showReason
        />
        <QuoteLifecycleActionPanel
          title={tCrm("crm.quotes.lifecycle.send.title", locale)}
          description={tCrm("crm.quotes.lifecycle.send.description", locale)}
          confirmValue="send-quote"
          action={markQuoteSentAction.bind(null, resolved.id)}
          rowVersion={quote.rowVersion}
          showDate
        />
        <QuoteLifecycleActionPanel
          title={tCrm("crm.quotes.lifecycle.accept.title", locale)}
          description={tCrm("crm.quotes.lifecycle.accept.description", locale)}
          confirmValue="accept-quote"
          action={acceptQuoteAction.bind(null, resolved.id)}
          rowVersion={quote.rowVersion}
          showDate
        />
        <QuoteLifecycleActionPanel
          title={tCrm("crm.quotes.lifecycle.decline.title", locale)}
          description={tCrm("crm.quotes.lifecycle.decline.description", locale)}
          confirmValue="decline-quote"
          action={declineQuoteAction.bind(null, resolved.id)}
          rowVersion={quote.rowVersion}
          showReason
        />
        <QuoteLifecycleActionPanel
          title={tCrm("crm.quotes.lifecycle.expire.title", locale)}
          description={tCrm("crm.quotes.lifecycle.expire.description", locale)}
          confirmValue="expire-quote"
          action={expireQuoteAction.bind(null, resolved.id)}
          rowVersion={quote.rowVersion}
          showDate
        />
        <QuoteLifecycleActionPanel
          title={tCrm("crm.quotes.lifecycle.revise.title", locale)}
          description={tCrm("crm.quotes.lifecycle.revise.description", locale)}
          confirmValue="revise-quote"
          action={createQuoteRevisionAction.bind(null, resolved.id)}
          rowVersion={quote.rowVersion}
        />
      </div>
      <CrmDeleteZone
        title={tCrm("crm.quotes.delete.title", locale)}
        description={tCrm("crm.quotes.delete.description", locale)}
      >
        <CrmDeleteConfirmForm
          entityLabel={tCrm("crm.quotes.entityLabel", locale)}
          entityName={quote.quoteNumber}
          confirmValue="delete-quote"
          action={deleteQuoteAction.bind(null, resolved.id)}
        />
      </CrmDeleteZone>
      <CrmContractPending module={tCrm("crm.quotes.contractPending.cpqTimeline", locale)} />
    </section>
  );
}
