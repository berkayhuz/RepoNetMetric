"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@netmetric/ui";

export function CrmFormActions({
  isPending,
  submitLabel,
  cancelHref,
}: Readonly<{
  isPending: boolean;
  submitLabel: string;
  cancelHref: string;
}>) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <Link href={cancelHref} className={buttonVariants({ variant: "outline" })}>
        Cancel
      </Link>
      <Button type="submit" disabled={isPending} aria-busy={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </div>
  );
}
