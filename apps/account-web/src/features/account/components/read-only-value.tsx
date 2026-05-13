import { Text } from "@netmetric/ui";

type ReadOnlyValueProps = {
  value: string | number | boolean | null | undefined;
  emptyLabel?: string;
};

export function ReadOnlyValue({ value, emptyLabel = "Not available" }: ReadOnlyValueProps) {
  if (value === null || value === undefined || value === "") {
    return <Text className="text-muted-foreground">{emptyLabel}</Text>;
  }

  if (typeof value === "boolean") {
    return <Text>{value ? "Yes" : "No"}</Text>;
  }

  return <Text>{String(value)}</Text>;
}
