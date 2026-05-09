import * as React from "react";

import { cn } from "../../lib/utils";

function InputGroup({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      data-slot="input-group"
      data-orientation={orientation}
      className={cn(
        "flex w-full",
        orientation === "horizontal" ? "flex-row items-stretch" : "flex-col",
        "[&>[data-slot=input-group-item]:not(:first-child)]:border-l-0",
        "[&>[data-slot=input-group-item]:not(:first-child)]:rounded-l-none",
        "[&>[data-slot=input-group-item]:not(:last-child)]:rounded-r-none",
        orientation === "vertical" && [
          "[&>[data-slot=input-group-item]:not(:first-child)]:border-l",
          "[&>[data-slot=input-group-item]:not(:first-child)]:border-t-0",
          "[&>[data-slot=input-group-item]:not(:first-child)]:rounded-t-none",
          "[&>[data-slot=input-group-item]:not(:last-child)]:rounded-b-none",
        ],
        className,
      )}
      {...props}
    />
  );
}

function InputGroupItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group-item"
      className={cn("relative flex items-center", className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group-text"
      className={cn(
        "bg-background text-muted-foreground border-input inline-flex items-center justify-center border px-3 text-sm whitespace-nowrap",
        "h-10 rounded-md",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupAddon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-group-addon" className={cn("flex items-center", className)} {...props} />
  );
}

export { InputGroup, InputGroupItem, InputGroupText, InputGroupAddon };
