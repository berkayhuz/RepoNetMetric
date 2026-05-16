import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "@netmetric/ui";

import { tAccountClient } from "@/lib/i18n/account-i18n";

type PlaceholderDashboardCardProps = {
  title: string;
  description: string;
};

export function PlaceholderDashboardCard({ title, description }: PlaceholderDashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Badge variant="outline">{tAccountClient("account.scaffold.shortLabel")}</Badge>
      </CardHeader>
      <CardContent>
        <Text className="text-sm text-muted-foreground">
          {tAccountClient("account.scaffold.placeholderDescription")}
        </Text>
      </CardContent>
    </Card>
  );
}
