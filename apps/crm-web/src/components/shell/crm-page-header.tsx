import { Heading, Text } from "@netmetric/ui";

export function CrmPageHeader({
  title,
  description,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <header className="space-y-2">
      <Heading level={2}>{title}</Heading>
      <Text className="text-muted-foreground">{description}</Text>
    </header>
  );
}
