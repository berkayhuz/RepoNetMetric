import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@netmetric/ui";

import { AddressForm } from "@/components/address/address-form";
import { AddressList } from "@/components/address/address-list";
import {
  createCompanyAddressAction,
  createCustomerAddressAction,
} from "@/features/addresses/actions/address-mutation-actions";
import type { AddressDto } from "@/lib/crm-api";

export function AddressSection({
  entityType,
  entityId,
  addresses,
}: Readonly<{
  entityType: "customer" | "company";
  entityId: string;
  addresses?: AddressDto[] | null;
}>) {
  const list = Array.isArray(addresses) ? addresses : [];

  return (
    <section className="space-y-4" aria-labelledby={`${entityType}-address-section`}>
      <header className="space-y-1">
        <h2 id={`${entityType}-address-section`} className="text-lg font-semibold">
          Addresses
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage postal addresses for this {entityType}. Changes are applied immediately.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Add address</CardTitle>
          <CardDescription>
            Enter the address details and submit to attach it to this {entityType}.
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
        <AddressList entityType={entityType} entityId={entityId} addresses={list} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No addresses yet</CardTitle>
            <CardDescription>Add the first address using the form above.</CardDescription>
          </CardHeader>
        </Card>
      )}
    </section>
  );
}
