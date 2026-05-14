import Link from "next/link";

import { Button, Input, buttonVariants } from "@netmetric/ui";

type CrmListToolbarProps = {
  actionPath: string;
  createPath: string;
  createLabel: string;
  search?: string;
};

export function CrmListToolbar({
  actionPath,
  createPath,
  createLabel,
  search,
}: Readonly<CrmListToolbarProps>) {
  return (
    <form action={actionPath} method="get" className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1 space-y-2">
        <label htmlFor="search" className="text-sm font-medium">
          Search
        </label>
        <Input id="search" name="search" defaultValue={search ?? ""} placeholder="Search" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Apply</Button>
        <Button type="submit" name="search" value="" variant="outline">
          Clear
        </Button>
        <Link href={createPath} className={buttonVariants({ variant: "secondary" })}>
          {createLabel}
        </Link>
      </div>
    </form>
  );
}
