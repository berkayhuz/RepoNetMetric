import { authRoutes } from "@/features/auth/config/auth-routes";
import { getRequestLocale } from "@/features/auth/i18n/auth-i18n.server";
import { createAuthMetadata } from "@/features/auth/i18n/auth-metadata";

import { redirect } from "next/navigation";

export async function generateMetadata() {
  return createAuthMetadata(await getRequestLocale(), "auth.login.metaTitle");
}

export default function HomePage() {
  redirect(authRoutes.login);
}
