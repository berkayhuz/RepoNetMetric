import { Alert, AlertDescription, AlertTitle, Heading, Text } from "@netmetric/ui";
import { tAccountClient } from "@/lib/i18n/account-i18n";

export default function ServiceUnavailablePage() {
  return (
    <section className="space-y-4">
      <Heading level={2}>{tAccountClient("account.statusPages.serviceUnavailable.title")}</Heading>
      <Text className="text-muted-foreground">
        {tAccountClient("account.statusPages.serviceUnavailable.description")}
      </Text>
      <Alert>
        <AlertTitle>
          {tAccountClient("account.statusPages.serviceUnavailable.alertTitle")}
        </AlertTitle>
        <AlertDescription>
          {tAccountClient("account.statusPages.serviceUnavailable.alertDescription")}
        </AlertDescription>
      </Alert>
    </section>
  );
}
