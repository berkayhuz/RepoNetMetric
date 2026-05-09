"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ toastOptions, ...props }: ToasterProps): React.JSX.Element {
  const { theme } = useTheme();

  const resolvedTheme: NonNullable<ToasterProps["theme"]> =
    theme === "light" || theme === "dark" || theme === "system" ? theme : "system";

  return (
    <Sonner
      theme={resolvedTheme}
      className="toaster group"
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
export type { ToasterProps };
