import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@netmetric/ui";

import { AddressForm } from "@/components/address/address-form";
import { AddressList } from "@/components/address/address-list";
import {
  createCompanyAddressAction,
  createCustomerAddressAction,
} from "@/features/addresses/actions/address-mutation-actions";
import type { AddressDto } from "@/lib/crm-api";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export async function AddressSection({
  entityType,
  entityId,
  addresses,
}: Readonly<{
  entityType: "customer" | "company";
  entityId: string;
  addresses?: AddressDto[] | null;
}>) {
  const locale = await getRequestLocale();
  const list = Array.isArray(addresses) ? addresses : [];
  const entityKey =
    entityType === "customer" ? "crm.address.entity.customer" : "crm.address.entity.company";

  return (
    <section className="space-y-4" aria-labelledby={`${entityType}-address-section`}>
      <header className="space-y-1">
        <h2 id={`${entityType}-address-section`} className="text-lg font-semibold">
          {tCrm("crm.address.section.title", locale)}
        </h2>
        <p className="text-sm text-muted-foreground">
          {tCrm("crm.address.section.description", locale, {
            entity: tCrm(entityKey, locale),
          })}
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{tCrm("crm.address.actions.add", locale)}</CardTitle>
          <CardDescription>
            {tCrm("crm.address.section.addDescription", locale, {
              entity: tCrm(entityKey, locale),
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddressForm
            mode="create"
            action={
              entityType === "customer"
                ? createCustomerAddressAction.bind(null, entityId)
                : createCompanyAddressAction.bind(null, entityId)
            }
          />
        </CardContent>
      </Card>

      {list.length > 0 ? (
        <AddressList entityType={entityType} entityId={entityId} addresses={list} locale={locale} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{tCrm("crm.address.section.emptyTitle", locale)}</CardTitle>
            <CardDescription>
              {tCrm("crm.address.section.emptyDescription", locale)}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </section>
  );
}
