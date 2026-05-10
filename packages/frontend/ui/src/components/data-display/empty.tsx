import * as React from "react";

import { cn } from "../../lib/utils";

function hasNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasTextContent(node: React.ReactNode): boolean {
  if (typeof node === "string") {
    return node.trim().length > 0;
  }
  if (typeof node === "number") {
    return true;
  }
  if (Array.isArray(node)) {
    return node.some((item) => hasTextContent(item));
  }
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    return hasTextContent(element.props.children);
  }
  return false;
}

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full flex-col items-center justify-center gap-6 rounded-xl border border-dashed p-8 text-center",
        className,
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-md flex-col items-center gap-2 text-center", className)}
      {...props}
    />
  );
}

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "icon";
}) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={cn(
        "flex items-center justify-center",
        variant === "default" && "bg-muted size-20 rounded-full",
        variant === "icon" && "bg-muted text-muted-foreground size-12 rounded-lg border",
        className,
      )}
      {...props}
    />
  );
}

function EmptyTitle({
  className,
  children,
  "aria-label": ariaLabel,
  title,
  ...props
}: React.ComponentProps<"h3">) {
  const hasContent = hasTextContent(children);
  const accessibleLabel = hasNonEmptyString(ariaLabel) ? ariaLabel : undefined;
  const titleText = hasNonEmptyString(title) ? title : undefined;

  if (!hasContent && !accessibleLabel && !titleText) {
    return null;
  }

  return (
    <h3
      data-slot="empty-title"
      className={cn("text-lg font-semibold tracking-tight", className)}
      aria-label={accessibleLabel}
      title={titleText}
      {...props}
    >
      {children}
    </h3>
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn("text-muted-foreground text-sm text-balance", className)}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn("flex w-full flex-col items-center justify-center gap-3", className)}
      {...props}
    />
  );
}

export { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent };
