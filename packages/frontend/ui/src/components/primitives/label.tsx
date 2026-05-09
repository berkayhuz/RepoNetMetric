"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const labelVariants = cva(
  [
    "flex items-center gap-2",
    "text-sm leading-none font-medium",
    "select-none",
    "peer-disabled:cursor-not-allowed",
    "peer-disabled:opacity-50",
    "group-data-[disabled=true]:pointer-events-none",
    "group-data-[disabled=true]:opacity-50",
    "group-data-[invalid=true]:text-destructive",
  ],
  {
    variants: {
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function Label({
  className,
  size,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        labelVariants({
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Label, labelVariants };
