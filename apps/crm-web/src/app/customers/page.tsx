import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getCustomersData } from "@/features/customers/data/customers-data";
import { toListQuery } from "@/features/shared/data/query";
import type { CustomerListItemDto } from "@/lib/crm-api";
import { crmCapabilityAllows } from "@/lib/crm-auth/crm-capabilities";
import { getCurrentCrmCapabilities } from "@/lib/crm-auth/current-crm-capabilities";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/customers");
  const locale = await getRequestLocale();
  const capabilities = await getCurrentCrmCapabilities();

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getCustomersData(query, "/customers");
  const columns: CrmEntityTableColumn<CustomerListItemDto>[] = [
    {
      key: "fullName",
      header: tCrm("crm.customers.fields.name", locale),
      render: (item) => item.fullName,
    },
    {
      key: "email",
      header: tCrm("crm.customers.fields.email", locale),
      render: (item) => item.email || "-",
    },
    {
      key: "mobilePhone",
      header: tCrm("crm.customers.fields.mobilePhoneShort", locale),
      render: (item) => item.mobilePhone || "-",
    },
    {
      key: "companyName",
      header: tCrm("crm.customers.fields.company", locale),
      render: (item) => item.companyName || "-",
    },
    {
      key: "isVip",
      header: tCrm("crm.customers.fields.vip", locale),
      render: (item) =>
        item.isVip ? tCrm("crm.common.yes", locale) : tCrm("crm.common.no", locale),
    },
    {
      key: "isActive",
      header: tCrm("crm.customers.fields.status", locale),
      render: (item) =>
        item.isActive ? tCrm("crm.common.active", locale) : tCrm("crm.common.inactive", locale),
    },
  ];

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <CrmEntityListPage
      title={tCrm("crm.customers.pages.list.title", locale)}
      description={tCrm("crm.customers.pages.list.description", locale)}
      actionPath="/customers"
      createPath="/customers/new"
      createLabel={tCrm("crm.customers.actions.new", locale)}
      canCreate={crmCapabilityAllows(capabilities, "customers.create")}
      createDisabledMessage={tCrm("crm.states.readOnly", locale)}
      {...(query.search ? { search: query.search } : {})}
      caption={tCrm("crm.customers.pages.list.caption", locale)}
      columns={columns}
      paged={data}
      detailBasePath="/customers"
      currentQuery={currentQuery}
      locale={locale}
      emptyTitle={tCrm("crm.customers.states.emptyTitle", locale)}
      emptyDescription={tCrm("crm.customers.states.emptyDescription", locale)}
    />
  );
}
