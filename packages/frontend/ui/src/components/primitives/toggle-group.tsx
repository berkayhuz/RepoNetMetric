"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

import { toggleVariants } from "./toggle";

type ToggleGroupContextProps = VariantProps<typeof toggleVariants>;

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  size: "default",
  variant: "default",
});

type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>;

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: ToggleGroupProps): React.JSX.Element {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive.Root
        data-slot="toggle-group"
        className={cn("flex items-center justify-center gap-1", className)}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </ToggleGroupContext.Provider>
  );
}

type ToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>;

function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: ToggleGroupItemProps): React.JSX.Element {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        toggleVariants({
          variant: variant ?? context.variant,
          size: size ?? context.size,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupItemProps, ToggleGroupProps };
