import { z } from "zod";

import type { ValidationText } from "./validation-text";

export function createConfirmEmailSchema(v: ValidationText) {
  return z.object({
    userId: z.string().trim().min(1, v.userIdRequired),
    token: z.string().trim().min(1, v.confirmTokenRequired),
  });
}

export type ConfirmEmailInput = z.infer<ReturnType<typeof createConfirmEmailSchema>>;
