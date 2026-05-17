import Link from "next/link";
import { notFound } from "next/navigation";
import { Alert, AlertDescription, AlertTitle, Button } from "@netmetric/ui";

import { AddressSection } from "@/components/address/address-section";
import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { deleteCustomerAction } from "@/features/customers/actions/customer-mutation-actions";
import {
  getCustomerDetailData,
  getCustomerDuplicateWarnings,
} from "@/features/customers/data/customers-data";
import { isGuid } from "@/features/shared/data/guid";
import {
  CrmApiError,
  type CustomerDetailDto,
  type CustomerDuplicateWarningDto,
} from "@/lib/crm-api";
import { crmCapabilityAllows } from "@/lib/crm-auth/crm-capabilities";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  const session = await requireCrmSession(`/customers/${resolved.id}`);
  const locale = await getRequestLocale();
  const canEdit = crmCapabilityAllows(session.capabilities, "customers.edit");
  const canDelete = crmCapabilityAllows(session.capabilities, "customers.delete");
  const canReviewDuplicates = crmCapabilityAllows(
    session.capabilities,
    "customers.duplicates.review",
  );

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let customer: CustomerDetailDto;
  let duplicateWarnings: CustomerDuplicateWarningDto[] = [];

  try {
    customer = await getCustomerDetailData(resolved.id, `/customers/${resolved.id}`);
    if (canReviewDuplicates) {
      duplicateWarnings =
        (await getCustomerDuplicateWarnings(resolved.id, `/customers/${resolved.id}`)) ?? [];
    }
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/customers/${resolved.id}`);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={customer.fullName}
        description={tCrm("crm.customers.pages.detail.description", locale)}
        actions={
          canEdit ? (
            <Button asChild>
              <Link href={`/customers/${resolved.id}/edit`}>
                {tCrm("crm.customers.actions.edit", locale)}
              </Link>
            </Button>
          ) : undefined
        }
      />
      <CrmEntityDetailPanel
        title={tCrm("crm.customers.pages.detail.profileTitle", locale)}
        fields={[
          { label: tCrm("crm.customers.fields.firstName", locale), value: customer.firstName },
          { label: tCrm("crm.customers.fields.lastName", locale), value: customer.lastName },
          { label: tCrm("crm.customers.fields.email", locale), value: customer.email },
          {
            label: tCrm("crm.customers.fields.mobilePhoneShort", locale),
            value: customer.mobilePhone,
          },
          { label: tCrm("crm.customers.fields.company", locale), value: customer.companyName },
          {
            label: tCrm("crm.customers.fields.customerType", locale),
            value: customer.customerType,
          },
          {
            label: tCrm("crm.customers.fields.vip", locale),
            value: customer.isVip ? tCrm("crm.common.yes", locale) : tCrm("crm.common.no", locale),
          },
          {
            label: tCrm("crm.customers.fields.status", locale),
            value: customer.isActive
              ? tCrm("crm.common.active", locale)
              : tCrm("crm.common.inactive", locale),
          },
        ]}
      />
      {canReviewDuplicates && duplicateWarnings.length > 0 ? (
        <Alert>
          <AlertTitle>{tCrm("crm.customers.duplicates.title", locale)}</AlertTitle>
          <AlertDescription>
            <div className="space-y-3">
              <p>{tCrm("crm.customers.duplicates.description", locale)}</p>
              <ul className="space-y-2">
                {duplicateWarnings.map((warning) => (
                  <li key={warning.candidateId} className="rounded-md border p-3">
                    <div className="font-medium">
                      {tCrm("crm.customers.duplicates.candidate", locale)} {warning.candidateId}
                    </div>
                    <div>
                      {tCrm("crm.customers.duplicates.confidence", locale)} {warning.score}
                    </div>
                    <div>
                      {tCrm("crm.customers.duplicates.reason", locale)} {warning.reasons.join(", ")}
                    </div>
                  </li>
                ))}
              </ul>
              <p>{tCrm("crm.customers.duplicates.manualResolution", locale)}</p>
            </div>
          </AlertDescription>
        </Alert>
      ) : null}
      <AddressSection
        entityType="customer"
        entityId={resolved.id}
        addresses={customer.addresses}
        canManage={canEdit || canDelete}
      />
      {canDelete ? (
        <CrmDeleteZone
          title={tCrm("crm.customers.actions.delete", locale)}
          description={tCrm("crm.customers.pages.detail.deleteDescription", locale)}
          locale={locale}
        >
          <CrmDeleteConfirmForm
            entityLabel={tCrm("crm.customers.entityName", locale)}
            entityName={customer.fullName}
            confirmValue="delete-customer"
            action={deleteCustomerAction.bind(null, resolved.id)}
          />
        </CrmDeleteZone>
      ) : null}
      <CrmContractPending module={tCrm("crm.customers.pages.detail.pendingModule", locale)} />
    </section>
  );
}
