import { Alert, AlertDescription, AlertTitle, Heading, Text } from "@netmetric/ui";

export default function RetryLaterPage() {
  return (
    <section className="space-y-4">
      <Heading level={2}>Too many requests</Heading>
      <Text className="text-muted-foreground">
        CRM is receiving too many requests right now. Please wait a moment and try again.
      </Text>
      <Alert>
        <AlertTitle>Rate limit reached</AlertTitle>
        <AlertDescription>This is temporary and protects platform reliability.</AlertDescription>
      </Alert>
    </section>
  );
}
