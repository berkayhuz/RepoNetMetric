"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Text } from "@netmetric/ui";

type RecoveryCodesDisplayProps = {
  codes: string[];
};

export function RecoveryCodesDisplay({ codes }: RecoveryCodesDisplayProps) {
  if (codes.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recovery codes</CardTitle>
        <CardDescription>These are shown once. Save them in a secure place now.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid gap-2 sm:grid-cols-2">
          {codes.map((code, index) => (
            <Text
              key={`${code}-${index}`}
              className="rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm"
            >
              {code}
            </Text>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
