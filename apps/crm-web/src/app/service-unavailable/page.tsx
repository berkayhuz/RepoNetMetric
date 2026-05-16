import { Alert, AlertDescription, AlertTitle, Heading, Text } from "@netmetric/ui";

import { getRequestLocale } from "@/lib/i18n/request-locale";
import { tCrm } from "@/lib/i18n/crm-i18n";

export default async function ServiceUnavailablePage() {
  const locale = await getRequestLocale();

  return (
    <section className="space-y-4">
      <Heading level={2}>{tCrm("crm.statusPages.serviceUnavailable.title", locale)}</Heading>
      <Text className="text-muted-foreground">
        {tCrm("crm.statusPages.serviceUnavailable.description", locale)}
      </Text>
      <Alert>
        <AlertTitle>{tCrm("crm.statusPages.serviceUnavailable.alertTitle", locale)}</AlertTitle>
        <AlertDescription>
          {tCrm("crm.statusPages.serviceUnavailable.alertDescription", locale)}
        </AlertDescription>
      </Alert>
    </section>
  );
}
