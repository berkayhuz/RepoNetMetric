import { Alert, AlertDescription, AlertTitle, Heading, Text } from "@netmetric/ui";
import { tAccountClient } from "@/lib/i18n/account-i18n";

export default function RetryLaterPage() {
  return (
    <section className="space-y-4">
      <Heading level={2}>{tAccountClient("account.statusPages.retryLater.title")}</Heading>
      <Text className="text-muted-foreground">
        {tAccountClient("account.statusPages.retryLater.description")}
      </Text>
      <Alert>
        <AlertTitle>{tAccountClient("account.statusPages.retryLater.alertTitle")}</AlertTitle>
        <AlertDescription>
          {tAccountClient("account.statusPages.retryLater.alertDescription")}
        </AlertDescription>
      </Alert>
    </section>
  );
}
