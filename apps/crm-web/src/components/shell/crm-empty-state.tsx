import { Heading, Text } from "@netmetric/ui";

export function CrmEmptyState({
  title,
  description,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <section className="rounded-lg border border-dashed p-8 text-center">
      <Heading level={3}>{title}</Heading>
      <Text className="mt-2 text-muted-foreground">{description}</Text>
    </section>
  );
}
