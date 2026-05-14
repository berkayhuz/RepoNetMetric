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

export function CrmDeleteZone({
  title,
  description,
  children,
}: Readonly<{
  title: string;
  description: string;
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
          <AlertTitle>Danger zone</AlertTitle>
          <AlertDescription>This action cannot be undone.</AlertDescription>
        </Alert>
        {children}
      </CardContent>
    </Card>
  );
}
