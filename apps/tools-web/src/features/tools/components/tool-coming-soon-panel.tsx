import { Alert, AlertDescription, AlertTitle } from "@netmetric/ui";

export function ToolComingSoonPanel() {
  return (
    <Alert>
      <AlertTitle>Coming soon</AlertTitle>
      <AlertDescription>
        This tool is listed in the catalog, but execution will be enabled in a later phase.
      </AlertDescription>
    </Alert>
  );
}
