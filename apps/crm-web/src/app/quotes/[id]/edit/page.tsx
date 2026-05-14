import { notFound } from "next/navigation";

import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { getQuoteDetailData } from "@/features/quotes/data/quotes-data";
import { QuoteForm } from "@/features/quotes/forms/quote-form";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError } from "@/lib/crm-api";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function EditQuotePage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/quotes/${resolved.id}/edit`);

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let quote;

  try {
    quote = await getQuoteDetailData(resolved.id, `/quotes/${resolved.id}/edit`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/quotes/${resolved.id}/edit`);
  }

  return (
    <CrmEntityFormShell title="Edit Quote" description="Update quote fields.">
      <QuoteForm
        mode="edit"
        quoteId={resolved.id}
        initialValues={{
          quoteNumber: quote.quoteNumber,
          proposalTitle: quote.proposalTitle ?? "",
          proposalSummary: quote.proposalSummary ?? "",
          proposalBody: quote.proposalBody ?? "",
          quoteDate: quote.quoteDate.slice(0, 10),
          validUntil: quote.validUntil?.slice(0, 10) ?? "",
          opportunityId: quote.opportunityId ?? "",
          customerId: quote.customerId ?? "",
          ownerUserId: quote.ownerUserId ?? "",
          currencyCode: quote.currencyCode,
          exchangeRate: quote.exchangeRate?.toString() ?? "1",
          termsAndConditions: quote.termsAndConditions ?? "",
          proposalTemplateId: quote.proposalTemplateId ?? "",
          items: quote.items.map((item) => ({
            productId: item.productId,
            description: item.description ?? "",
            quantity: item.quantity,
            unitPrice: item.unitPrice.toString(),
            discountRate: item.discountRate,
            taxRate: item.taxRate,
          })),
          rowVersion: quote.rowVersion,
        }}
      />
    </CrmEntityFormShell>
  );
}
