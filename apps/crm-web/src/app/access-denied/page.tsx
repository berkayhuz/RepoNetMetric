import { Alert, AlertDescription, AlertTitle, Heading, Text } from "@netmetric/ui";

export default function AccessDeniedPage() {
  return (
    <section className="space-y-4">
      <Heading level={2}>Access denied</Heading>
      <Text className="text-muted-foreground">
        Your current account does not have permission to access this CRM area.
      </Text>
      <Alert variant="destructive">
        <AlertTitle>Authorization required</AlertTitle>
        <AlertDescription>
          Contact your CRM administrator if this should be available to you.
        </AlertDescription>
      </Alert>
    </section>
  );
}
