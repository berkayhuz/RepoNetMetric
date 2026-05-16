import { Alert, AlertDescription, AlertTitle, Heading, Text } from "@netmetric/ui";
import { tAccountClient } from "@/lib/i18n/account-i18n";

export default function AccessDeniedPage() {
  return (
    <section className="space-y-4">
      <Heading level={2}>{tAccountClient("account.statusPages.accessDenied.title")}</Heading>
      <Text className="text-muted-foreground">
        {tAccountClient("account.statusPages.accessDenied.description")}
      </Text>
      <Alert variant="destructive">
        <AlertTitle>{tAccountClient("account.statusPages.accessDenied.alertTitle")}</AlertTitle>
        <AlertDescription>
          {tAccountClient("account.statusPages.accessDenied.alertDescription")}
        </AlertDescription>
      </Alert>
    </section>
  );
}
