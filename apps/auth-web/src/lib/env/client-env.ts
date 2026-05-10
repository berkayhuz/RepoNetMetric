import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("NetMetric Auth"),
  NEXT_PUBLIC_APP_ORIGIN: z.url(),
  NEXT_PUBLIC_API_BASE_URL: z.url(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

export const clientEnv: ClientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
