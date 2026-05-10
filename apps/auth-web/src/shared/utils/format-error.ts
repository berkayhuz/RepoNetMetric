import { getApiErrorMessage } from "@/lib/api/api-error";

export function formatError(error: unknown): string {
  return getApiErrorMessage(error);
}
