import Link from "next/link";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "@netmetric/ui";

export function DashboardSummaryCard({
  title,
  total,
  href,
  description,
}: Readonly<{
  title: string;
  total: number;
  href: string;
  description: string;
}>) {
  return (
    <Card aria-label={`${title} summary`}>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{title}</CardTitle>
          <Badge variant="secondary">Read-only</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Text className="text-3xl font-semibold">{total}</Text>
        <Link
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          href={href}
        >
          View all
        </Link>
      </CardContent>
    </Card>
  );
}
