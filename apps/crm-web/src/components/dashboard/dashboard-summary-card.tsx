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
  summaryAriaLabel,
  readOnlyLabel,
  viewAllLabel,
}: Readonly<{
  title: string;
  total: number;
  href: string;
  description: string;
  summaryAriaLabel: string;
  readOnlyLabel: string;
  viewAllLabel: string;
}>) {
  return (
    <Card aria-label={summaryAriaLabel}>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{title}</CardTitle>
          <Badge variant="secondary">{readOnlyLabel}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Text className="text-3xl font-semibold">{total}</Text>
        <Link
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          href={href}
        >
          {viewAllLabel}
        </Link>
      </CardContent>
    </Card>
  );
}
