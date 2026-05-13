import { Alert, AlertDescription, AlertTitle, Heading, Text } from "@netmetric/ui";

export default function ServiceUnavailablePage() {
  return (
    <section className="space-y-4">
      <Heading level={2}>Service unavailable</Heading>
      <Text className="text-muted-foreground">
        Account services are temporarily unavailable. Please try again shortly.
      </Text>
      <Alert>
        <AlertTitle>Temporary outage</AlertTitle>
        <AlertDescription>
          We are monitoring this and will restore access as soon as possible.
        </AlertDescription>
      </Alert>
    </section>
  );
}
