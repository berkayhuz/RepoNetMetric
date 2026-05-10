import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_ENV: z.enum(["development", "test", "staging", "production"]).default("development"),

  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("NetMetric Auth"),
  NEXT_PUBLIC_APP_ORIGIN: z.url(),
  NEXT_PUBLIC_API_BASE_URL: z.url(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const serverEnv: ServerEnv = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  APP_ENV: process.env.APP_ENV,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
