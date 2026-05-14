"use client";

import { Alert, AlertDescription, AlertTitle } from "@netmetric/ui";

export function CrmFormErrorSummary({
  message,
  errors,
}: Readonly<{
  message?: string;
  errors?: Record<string, string[]>;
}>) {
  if (!message && (!errors || Object.keys(errors).length === 0)) {
    return null;
  }

  return (
    <Alert variant="destructive" role="alert" aria-live="assertive">
      <AlertTitle>Please review the form</AlertTitle>
      <AlertDescription>
        <div className="space-y-1">
          {message ? <p>{message}</p> : null}
          {errors
            ? Object.entries(errors).map(([key, fieldErrors]) => <p key={key}>{fieldErrors[0]}</p>)
            : null}
        </div>
      </AlertDescription>
    </Alert>
  );
}
