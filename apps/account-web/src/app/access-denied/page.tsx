import { AccessDeniedState, Heading, Text } from "@netmetric/ui";
import { tAccountClient } from "@/lib/i18n/account-i18n";

export default function AccessDeniedPage() {
  return (
    <section className="space-y-4">
      <Heading level={2}>{tAccountClient("account.statusPages.accessDenied.title")}</Heading>
      <Text className="text-muted-foreground">
        {tAccountClient("account.statusPages.accessDenied.description")}
      </Text>
      <AccessDeniedState
        title={tAccountClient("account.statusPages.accessDenied.alertTitle")}
        description={tAccountClient("account.statusPages.accessDenied.alertDescription")}
      />
    </section>
  );
}
