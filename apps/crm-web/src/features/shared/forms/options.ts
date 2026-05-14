export const genderOptions = [
  { value: 0, label: "Unknown" },
  { value: 1, label: "Female" },
  { value: 2, label: "Male" },
  { value: 3, label: "Other" },
] as const;

export const customerTypeOptions = [
  { value: 0, label: "Individual" },
  { value: 1, label: "Corporate" },
] as const;

export const companyTypeOptions = [
  { value: 0, label: "Prospect" },
  { value: 1, label: "Customer" },
  { value: 2, label: "Partner" },
  { value: 3, label: "Vendor" },
  { value: 4, label: "Competitor" },
] as const;

export const booleanOptions = [
  { value: "false", label: "No" },
  { value: "true", label: "Yes" },
] as const;
