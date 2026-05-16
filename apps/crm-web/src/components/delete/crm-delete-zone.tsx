import {
  Alert,
  AlertDescription,
  AlertTitle,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@netmetric/ui";
import { tCrm } from "@/lib/i18n/crm-i18n";

export function CrmDeleteZone({
  title,
  description,
  locale,
  dangerTitle,
  dangerDescription,
  children,
}: Readonly<{
  title: string;
  description: string;
  locale?: string | null;
  dangerTitle?: string;
  dangerDescription?: string;
  children: React.ReactNode;
}>) {
  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertTitle>{dangerTitle ?? tCrm("crm.delete.dangerTitle", locale)}</AlertTitle>
          <AlertDescription>
            {dangerDescription ?? tCrm("crm.delete.cannotUndo", locale)}
          </AlertDescription>
        </Alert>
        {children}
      </CardContent>
    </Card>
  );
}
