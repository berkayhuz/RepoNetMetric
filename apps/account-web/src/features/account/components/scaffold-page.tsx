import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Separator,
  Text,
} from "@netmetric/ui";

import { tAccountClient } from "@/lib/i18n/account-i18n";

type ScaffoldPageProps = {
  title: string;
  description: string;
};

export function ScaffoldPage({ title, description }: ScaffoldPageProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <Badge variant="secondary">{tAccountClient("account.scaffold.badge")}</Badge>
        <Heading level={2}>{title}</Heading>
        <Text className="text-muted-foreground">{description}</Text>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.scaffold.statusTitle")}</CardTitle>
          <CardDescription>{tAccountClient("account.scaffold.statusDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.scaffold.integrationDeferred")}
          </Text>
        </CardContent>
      </Card>
    </section>
  );
}
