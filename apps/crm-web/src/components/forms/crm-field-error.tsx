"use client";

import { Text } from "@netmetric/ui";

export function CrmFieldError({ id, error }: Readonly<{ id: string; error?: string }>) {
  if (!error) {
    return null;
  }

  return (
    <Text id={id} className="text-sm text-destructive">
      {error}
    </Text>
  );
}
