"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors",
    "ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:bg-accent",
    "data-[state=on]:text-accent-foreground",
    "hover:bg-muted",
    "hover:text-muted-foreground",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2.5",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ToggleProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>;

function Toggle({
  className,
  variant,
  size,
  pressed,
  defaultPressed,
  ...props
}: ToggleProps): React.JSX.Element {
  const rootProps: React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> = {
    ...props,
    className: cn(
      toggleVariants({
        variant,
        size,
      }),
      className,
    ),
  };

  if (pressed !== undefined) {
    rootProps.pressed = pressed;
  }

  if (defaultPressed !== undefined) {
    rootProps.defaultPressed = defaultPressed;
  }

  return <TogglePrimitive.Root data-slot="toggle" {...rootProps} />;
}

export { Toggle, toggleVariants };
export type { ToggleProps };
