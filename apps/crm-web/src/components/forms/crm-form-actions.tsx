"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@netmetric/ui";
import { tCrmClient } from "@/lib/i18n/crm-i18n";

export function CrmFormActions({
  isPending,
  submitLabel,
  pendingLabel,
  cancelLabel,
  cancelHref,
}: Readonly<{
  isPending: boolean;
  submitLabel: string;
  pendingLabel?: string;
  cancelLabel?: string;
  cancelHref: string;
}>) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <Link href={cancelHref} className={buttonVariants({ variant: "outline" })}>
        {cancelLabel ?? tCrmClient("crm.forms.actions.cancel")}
      </Link>
      <Button type="submit" disabled={isPending} aria-busy={isPending}>
        {isPending ? (pendingLabel ?? tCrmClient("crm.forms.actions.saving")) : submitLabel}
      </Button>
    </div>
  );
}
