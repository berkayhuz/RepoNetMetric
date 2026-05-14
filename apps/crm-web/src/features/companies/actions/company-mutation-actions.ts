"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { mapCrmMutationErrorToState } from "@/features/shared/actions/mutation-error-map";
import type { CrmMutationState } from "@/features/shared/actions/mutation-state";
import { isGuid } from "@/features/shared/data/guid";
import { emptyToNull } from "@/features/shared/forms/schema-primitives";
import { crmApiClient, type CompanyUpsertRequest } from "@/lib/crm-api";
import { getCrmApiRequestOptions } from "@/lib/crm-auth/crm-api-request-options";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { assertSameOriginRequest } from "@/lib/security/csrf";

import {
  companyFormSchema,
  type CompanyFormInput,
  type CompanyFormValues,
} from "../forms/company-form-schema";

function mapCompanyPayload(input: CompanyFormValues): CompanyUpsertRequest {
  return {
    name: input.name.trim(),
    taxNumber: emptyToNull(input.taxNumber),
    taxOffice: emptyToNull(input.taxOffice),
    website: emptyToNull(input.website),
    email: emptyToNull(input.email),
    phone: emptyToNull(input.phone),
    sector: emptyToNull(input.sector),
    employeeCountRange: emptyToNull(input.employeeCountRange),
    annualRevenue: input.annualRevenue ?? null,
    description: emptyToNull(input.description),
    notes: emptyToNull(input.notes),
    companyType: input.companyType,
    ownerUserId: emptyToNull(input.ownerUserId),
    parentCompanyId: emptyToNull(input.parentCompanyId),
    rowVersion: emptyToNull(input.rowVersion),
  };
}

function mapZodErrors(fieldErrors: Record<string, string[] | undefined>): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(fieldErrors).flatMap(([key, errors]) => {
      if (!errors || errors.length === 0) {
        return [];
      }

      return [[key, errors] as const];
    }),
  );
}

export async function createCompanyAction(input: CompanyFormInput): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  const parsed = companyFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    const created = await crmApiClient.createCompany(mapCompanyPayload(parsed.data), options);

    revalidatePath("/companies");
    revalidatePath(`/companies/${created.id}`);

    return {
      status: "success",
      message: "Company created successfully.",
      redirectTo: `/companies/${created.id}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, "/companies/new");
  }
}

export async function updateCompanyAction(
  companyId: string,
  input: CompanyFormInput,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();

  if (!isGuid(companyId)) {
    return {
      status: "error",
      message: "Invalid company id.",
    };
  }

  const parsed = companyFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: mapZodErrors(parsed.error.flatten().fieldErrors),
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.updateCompany(companyId, mapCompanyPayload(parsed.data), options);

    revalidatePath("/companies");
    revalidatePath(`/companies/${companyId}`);
    revalidatePath(`/companies/${companyId}/edit`);

    return {
      status: "success",
      message: "Company updated successfully.",
      redirectTo: `/companies/${companyId}`,
    };
  } catch (error) {
    return mapCrmMutationErrorToState(error, `/companies/${companyId}/edit`);
  }
}

export async function deleteCompanyAction(
  companyId: string,
  _previous: CrmMutationState,
  formData: FormData,
): Promise<CrmMutationState> {
  await assertSameOriginRequest();
  await requireCrmSession(`/companies/${companyId}`);

  if (!isGuid(companyId)) {
    return { status: "error", message: "Invalid company id." };
  }

  if (formData.get("confirm") !== "delete-company") {
    return { status: "error", message: "Delete confirmation is invalid." };
  }

  const confirmText = formData.get("confirmText");
  if (typeof confirmText !== "string" || confirmText.trim().length === 0) {
    return {
      status: "error",
      message: "Please type the record name to confirm deletion.",
      fieldErrors: { confirmText: ["Confirmation text is required."] },
    };
  }

  try {
    const options = await getCrmApiRequestOptions();
    await crmApiClient.deleteCompany(companyId, options);

    revalidatePath("/companies");
    redirect("/companies");
  } catch (error) {
    const mapped = mapCrmMutationErrorToState(error, `/companies/${companyId}`);
    if (mapped.message === "The requested record no longer exists.") {
      return {
        status: "error",
        message: "Company is already removed or no longer available.",
      };
    }

    return mapped;
  }
}
