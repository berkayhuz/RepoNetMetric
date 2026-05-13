import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "@netmetric/ui";

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
        <Badge variant="outline">Scaffold</Badge>
      </CardHeader>
      <CardContent>
        <Text className="text-sm text-muted-foreground">
          This section is a placeholder. Account API integration is intentionally deferred to later
          phases.
        </Text>
      </CardContent>
    </Card>
  );
}
