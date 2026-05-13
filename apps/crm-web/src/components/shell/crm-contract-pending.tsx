import { Alert, AlertDescription, AlertTitle } from "@netmetric/ui";

export function CrmContractPending({ module }: Readonly<{ module: string }>) {
  return (
    <Alert>
      <AlertTitle>Contract pending</AlertTitle>
      <AlertDescription>
        {module} will be implemented after source-visible API contract confirmation.
      </AlertDescription>
    </Alert>
  );
}
