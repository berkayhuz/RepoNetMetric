import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@netmetric/ui";

import { AddressDeleteForm } from "@/components/address/address-delete-form";
import { AddressForm } from "@/components/address/address-form";
import { updateAddressAction } from "@/features/addresses/actions/address-mutation-actions";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import type { AddressDto } from "@/lib/crm-api";

export function AddressCard({
  entityType,
  entityId,
  address,
  onDelete,
}: Readonly<{
  entityType: "customer" | "company";
  entityId: string;
  address: AddressDto;
  onDelete: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
}>) {
  const lineParts = [address.line1, address.line2].filter(Boolean).join(", ");
  const locationParts = [address.district, address.city, address.state, address.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Address</CardTitle>
        <CardDescription>
          {[lineParts, locationParts, address.zipCode].filter(Boolean).join(" - ") || "No summary"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <AddressForm
          mode="edit"
          initialValues={{
            id: address.id,
            addressType: Number(address.addressType),
            line1: address.line1,
            line2: address.line2 ?? "",
            district: address.district ?? "",
            city: address.city ?? "",
            state: address.state ?? "",
            country: address.country ?? "",
            zipCode: address.zipCode ?? "",
            isDefault: address.isDefault,
            rowVersion: address.rowVersion,
          }}
          action={updateAddressAction.bind(null, entityType, entityId, address.id)}
        />
        <div className="space-y-2 border-t border-border pt-4">
          <p className="text-sm font-medium text-destructive">Delete address</p>
          <p className="text-xs text-muted-foreground">
            This removes the address from this record. This action cannot be undone.
          </p>
          <AddressDeleteForm action={onDelete} />
        </div>
      </CardContent>
    </Card>
  );
}
