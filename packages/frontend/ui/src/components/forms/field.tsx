import * as React from "react";

import { cn } from "../../lib/utils";

const FieldIdContext = React.createContext<string | undefined>(undefined);

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset data-slot="field-set" className={cn("flex flex-col gap-6", className)} {...props} />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & {
  variant?: "legend" | "label";
}) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        variant === "legend" && "text-base",
        variant === "label" && "text-sm leading-none",
        className,
      )}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("@container/field-group flex flex-col gap-6", className)}
      {...props}
    />
  );
}

function Field({
  className,
  orientation = "vertical",
  id,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "vertical" | "horizontal" | "responsive";
}) {
  const generatedId = React.useId();
  const fieldId = id ?? `field-${generatedId.replaceAll(":", "")}`;

  return (
    <FieldIdContext.Provider value={fieldId}>
      <div
        id={id}
        role="group"
        data-slot="field"
        data-orientation={orientation}
        className={cn(
          "group/field flex w-full gap-3",
          orientation === "vertical" && "flex-col",
          orientation === "horizontal" && "flex-row items-start",
          orientation === "responsive" &&
            "flex-col @md/field-group:flex-row @md/field-group:items-start",
          className,
        )}
        {...props}
      />
    </FieldIdContext.Provider>
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("flex flex-1 flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function FieldLabel({ className, htmlFor, ...props }: React.ComponentProps<"label">) {
  const fieldId = React.useContext(FieldIdContext);
  const resolvedHtmlFor = htmlFor ?? fieldId;

  return (
    <label
      data-slot="field-label"
      htmlFor={resolvedHtmlFor}
      className={cn(
        "text-sm leading-none font-medium select-none",
        "group-data-[disabled=true]/field:pointer-events-none group-data-[disabled=true]/field:opacity-50",
        "group-data-[invalid=true]/field:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-muted-foreground text-sm text-balance",
        "group-data-[invalid=true]/field:text-destructive/80",
        className,
      )}
      {...props}
    />
  );
}

function FieldSeparator({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-separator"
      role="separator"
      className={cn(
        "bg-border relative my-2 h-px w-full",
        children && "flex items-center justify-center bg-transparent",
        className,
      )}
      {...props}
    >
      {children ? (
        <span className="bg-background text-muted-foreground px-2 text-xs">{children}</span>
      ) : null}
    </div>
  );
}

type FieldErrorItem = {
  message?: string;
};

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<FieldErrorItem | undefined>;
}) {
  const messages = errors
    ?.map((error) => error?.message)
    .filter((message): message is string => Boolean(message));

  if (!children && !messages?.length) {
    return null;
  }

  return (
    <div
      data-slot="field-error"
      className={cn("text-destructive text-sm font-medium", className)}
      {...props}
    >
      {children}

      {!children && messages?.length === 1 ? messages[0] : null}

      {!children && messages && messages.length > 1 ? (
        <ul className="ml-4 list-disc space-y-1">
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
};
