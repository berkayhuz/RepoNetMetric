import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Separator,
  Text,
} from "@netmetric/ui";

type ScaffoldPageProps = {
  title: string;
  description: string;
};

export function ScaffoldPage({ title, description }: ScaffoldPageProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <Badge variant="secondary">Scaffold Placeholder</Badge>
        <Heading level={2}>{title}</Heading>
        <Text className="text-muted-foreground">{description}</Text>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Implementation Status</CardTitle>
          <CardDescription>Phase 1 includes structure only.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text className="text-sm text-muted-foreground">
            Data loading, mutations, session enforcement, and API contract integration are
            intentionally not implemented in this phase.
          </Text>
        </CardContent>
      </Card>
    </section>
  );
}
