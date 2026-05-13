import { Alert, AlertDescription, AlertTitle, Heading, Text } from "@netmetric/ui";

export default function RetryLaterPage() {
  return (
    <section className="space-y-4">
      <Heading level={2}>Too many requests</Heading>
      <Text className="text-muted-foreground">
        We are receiving too many account requests right now. Please wait a moment and try again.
      </Text>
      <Alert>
        <AlertTitle>Rate limit reached</AlertTitle>
        <AlertDescription>
          This is temporary and helps protect account security operations.
        </AlertDescription>
      </Alert>
    </section>
  );
}
