import "server-only";

import { redirect } from "next/navigation";

import { getToolsAccessToken } from "./tools-auth-headers";
import { buildAuthLoginRedirectUrl } from "./safe-return-url";

export async function requireToolsSession(pathname = "/"): Promise<string> {
  const token = await getToolsAccessToken();
  if (!token) {
    redirect(buildAuthLoginRedirectUrl(pathname));
  }

  return token;
}
