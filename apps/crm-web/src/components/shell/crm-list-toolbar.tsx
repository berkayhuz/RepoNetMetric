import Link from "next/link";

import { Button, Input, buttonVariants } from "@netmetric/ui";
import { tCrm } from "@/lib/i18n/crm-i18n";

type CrmListToolbarProps = {
  actionPath: string;
  createPath?: string;
  createLabel?: string;
  createDisabledMessage?: string;
  search?: string;
  locale?: string | null;
  searchLabel?: string;
  searchPlaceholder?: string;
  applyLabel?: string;
  clearLabel?: string;
};

export function CrmListToolbar({
  actionPath,
  createPath,
  createLabel,
  createDisabledMessage,
  search,
  locale,
  searchLabel,
  searchPlaceholder,
  applyLabel,
  clearLabel,
}: Readonly<CrmListToolbarProps>) {
  const resolvedSearchLabel = searchLabel ?? tCrm("crm.lists.toolbar.search", locale);
  const resolvedSearchPlaceholder = searchPlaceholder ?? resolvedSearchLabel;
  const resolvedApplyLabel = applyLabel ?? tCrm("crm.lists.toolbar.apply", locale);
  const resolvedClearLabel = clearLabel ?? tCrm("crm.lists.toolbar.clear", locale);

  return (
    <form action={actionPath} method="get" className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1 space-y-2">
        <label htmlFor="search" className="text-sm font-medium">
          {resolvedSearchLabel}
        </label>
        <Input
          id="search"
          name="search"
          defaultValue={search ?? ""}
          placeholder={resolvedSearchPlaceholder}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">{resolvedApplyLabel}</Button>
        <Button type="submit" name="search" value="" variant="outline">
          {resolvedClearLabel}
        </Button>
        {createPath && createLabel ? (
          <Link href={createPath} className={buttonVariants({ variant: "secondary" })}>
            {createLabel}
          </Link>
        ) : createDisabledMessage ? (
          <p className="text-sm text-muted-foreground">{createDisabledMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
