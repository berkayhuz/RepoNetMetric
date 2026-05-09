"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "../../lib/utils";

type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

function Tabs({ className, value, defaultValue, ...props }: TabsProps): React.JSX.Element {
  const rootProps: TabsProps = {
    ...props,
    className: cn(className),
  };

  if (value !== undefined) {
    rootProps.value = value;
  }

  if (defaultValue !== undefined) {
    rootProps.defaultValue = defaultValue;
  }

  return <TabsPrimitive.Root data-slot="tabs" {...rootProps} />;
}

function TabsList({ className, ...props }: TabsListProps): React.JSX.Element {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsTriggerProps): React.JSX.Element {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
        "ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-background",
        "data-[state=active]:text-foreground",
        "data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsContentProps): React.JSX.Element {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "mt-2 ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };

export type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps };
