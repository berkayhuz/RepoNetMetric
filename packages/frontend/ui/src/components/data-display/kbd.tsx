import * as React from "react";

import { cn } from "../../lib/utils";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-6 min-w-6 items-center justify-center rounded-md border px-1.5 font-mono text-[0.75rem] font-medium",
        "select-none",
        className,
      )}
      {...props}
    />
  );
}

function KbdGroup({
  className,
  separator = "+",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  separator?: React.ReactNode;
}) {
  const items = React.Children.toArray(children);

  return (
    <div
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {child}

          {index < items.length - 1 ? (
            <span data-slot="kbd-separator" className="text-muted-foreground text-xs">
              {separator}
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

export { Kbd, KbdGroup };
