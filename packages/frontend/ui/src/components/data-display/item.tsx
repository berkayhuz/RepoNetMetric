import * as React from "react";

import { cn } from "../../lib/utils";

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-group" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function Item({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "outline" | "muted";
  size?: "default" | "sm" | "xs";
}) {
  return (
    <div
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/item flex w-full items-start gap-4 rounded-xl transition-colors",
        variant === "default" && "bg-transparent",
        variant === "outline" && "border bg-background",
        variant === "muted" && "bg-muted/50",

        size === "default" && "p-4",
        size === "sm" && "gap-3 p-3",
        size === "xs" && "gap-2 p-2",

        className,
      )}
      {...props}
    />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn("flex items-start justify-between gap-4", className)}
      {...props}
    />
  );
}

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "icon";
}) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(
        "flex shrink-0 items-center justify-center",
        variant === "default" && "bg-muted size-12 rounded-lg",
        variant === "icon" && "bg-muted text-muted-foreground size-10 rounded-md border",
        className,
      )}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn("truncate text-sm font-medium", className)}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn("text-muted-foreground text-sm text-balance", className)}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn("mt-2 flex items-center gap-2", className)}
      {...props}
    />
  );
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
};
