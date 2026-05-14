import "server-only";

import { crmApiClient } from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export type DashboardData = {
  customerTotal: number;
  companyTotal: number;
  contactTotal: number;
  recentCustomers: Array<{ id: string; name: string; subtitle: string }>;
  recentCompanies: Array<{ id: string; name: string; subtitle: string }>;
  recentContacts: Array<{ id: string; name: string; subtitle: string }>;
};

const RECENT_PAGE_SIZE = 5;

export async function getDashboardData(returnPath = "/dashboard"): Promise<DashboardData> {
  await requireCrmSession(returnPath);

  try {
    const options = await getCrmApiRequestOptions();

    const [customers, companies, contacts] = await Promise.all([
      crmApiClient.listCustomers({ page: 1, pageSize: RECENT_PAGE_SIZE }, options),
      crmApiClient.listCompanies({ page: 1, pageSize: RECENT_PAGE_SIZE }, options),
      crmApiClient.listContacts({ page: 1, pageSize: RECENT_PAGE_SIZE }, options),
    ]);

    return {
      customerTotal: customers.totalCount,
      companyTotal: companies.totalCount,
      contactTotal: contacts.totalCount,
      recentCustomers: customers.items.map((item) => ({
        id: item.id,
        name: item.fullName,
        subtitle: item.email ?? item.mobilePhone ?? "No contact info",
      })),
      recentCompanies: companies.items.map((item) => ({
        id: item.id,
        name: item.name,
        subtitle: item.email ?? item.phone ?? "No contact info",
      })),
      recentContacts: contacts.items.map((item) => ({
        id: item.id,
        name: item.fullName,
        subtitle: item.email ?? item.mobilePhone ?? "No contact info",
      })),
    };
  } catch (error) {
    handleCrmApiPageError(error, returnPath);
  }
}
