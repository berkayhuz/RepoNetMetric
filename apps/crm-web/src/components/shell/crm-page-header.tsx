import type { ReactNode } from "react";

import { Heading, Text } from "@netmetric/ui";

export function CrmPageHeader({
  title,
  description,
  actions,
}: Readonly<{
  title: string;
  description: string;
  actions?: ReactNode;
}>) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-2">
        <Heading level={2}>{title}</Heading>
        <Text className="text-muted-foreground">{description}</Text>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}
