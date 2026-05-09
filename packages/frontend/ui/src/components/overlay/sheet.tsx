"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

const Sheet = DialogPrimitive.Root;

const SheetTrigger = DialogPrimitive.Trigger;

const SheetClose = DialogPrimitive.Close;

const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="sheet-overlay"
    className={cn(
      [
        "fixed inset-0 z-50 bg-black/80",
        "data-[state=open]:animate-in",
        "data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0",
        "data-[state=open]:fade-in-0",
      ].join(" "),
      className,
    )}
    {...props}
  />
));

SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const sheetVariants = cva(
  [
    "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
    "data-[state=open]:animate-in",
    "data-[state=closed]:animate-out",
    "data-[state=closed]:duration-300",
    "data-[state=open]:duration-500",
  ].join(" "),
  {
    variants: {
      side: {
        top: [
          "inset-x-0 top-0 border-b",
          "data-[state=closed]:slide-out-to-top",
          "data-[state=open]:slide-in-from-top",
        ].join(" "),
        bottom: [
          "inset-x-0 bottom-0 border-t",
          "data-[state=closed]:slide-out-to-bottom",
          "data-[state=open]:slide-in-from-bottom",
        ].join(" "),
        left: [
          "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          "data-[state=closed]:slide-out-to-left",
          "data-[state=open]:slide-in-from-left",
        ].join(" "),
        right: [
          "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          "data-[state=closed]:slide-out-to-right",
          "data-[state=open]:slide-in-from-right",
        ].join(" "),
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />

    <DialogPrimitive.Content
      ref={ref}
      data-slot="sheet-content"
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}

      <DialogPrimitive.Close
        className={cn(
          [
            "ring-offset-background",
            "focus:ring-ring",
            "data-[state=open]:bg-secondary",
            "absolute top-4 right-4 rounded-xs opacity-70 transition-opacity",
            "hover:opacity-100",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "disabled:pointer-events-none",
          ].join(" "),
        )}
      >
        <X className="h-4 w-4" />

        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
));

SheetContent.displayName = DialogPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sheet-header"
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
);

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sheet-footer"
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="sheet-title"
    className={cn("text-foreground text-lg font-semibold", className)}
    {...props}
  />
));

SheetTitle.displayName = DialogPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="sheet-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));

SheetDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
