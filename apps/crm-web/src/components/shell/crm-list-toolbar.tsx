import { Button, Input } from "@netmetric/ui";

type CrmListToolbarProps = {
  actionPath: string;
  search?: string;
};

export function CrmListToolbar({ actionPath, search }: Readonly<CrmListToolbarProps>) {
  return (
    <form action={actionPath} method="get" className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1 space-y-2">
        <label htmlFor="search" className="text-sm font-medium">
          Search
        </label>
        <Input id="search" name="search" defaultValue={search ?? ""} placeholder="Search" />
      </div>
      <div className="flex gap-2">
        <Button type="submit">Apply</Button>
        <Button type="submit" name="search" value="" variant="outline">
          Clear
        </Button>
      </div>
    </form>
  );
}
