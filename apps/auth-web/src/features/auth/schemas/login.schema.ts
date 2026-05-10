import { z } from "zod";

import type { ValidationText } from "./validation-text";

export function createLoginSchema(v: ValidationText) {
  return z.object({
    email: z.string().trim().min(1, v.emailRequired).email(v.emailInvalid),
    password: z.string().min(1, v.passwordRequired).min(8, v.passwordMin),
    tenantId: z.string().trim().optional(),
    rememberMe: z.coerce.boolean().default(false),
    returnUrl: z.string().trim().optional(),
  });
}

export type LoginInput = z.infer<ReturnType<typeof createLoginSchema>>;
