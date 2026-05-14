import { z } from "zod";

import {
  optionalDate,
  optionalEmail,
  optionalGuid,
  optionalLongText,
  optionalText,
} from "@/features/shared/forms/schema-primitives";

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  title: optionalText,
  email: optionalEmail,
  mobilePhone: optionalText,
  workPhone: optionalText,
  personalPhone: optionalText,
  birthDate: optionalDate,
  gender: z.coerce.number().int().min(0).max(3),
  department: optionalText,
  jobTitle: optionalText,
  description: optionalLongText,
  notes: optionalLongText,
  ownerUserId: optionalGuid,
  companyId: optionalGuid,
  customerId: optionalGuid,
  isPrimaryContact: z.coerce.boolean(),
  rowVersion: z.string().trim().optional().or(z.literal("")),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;
