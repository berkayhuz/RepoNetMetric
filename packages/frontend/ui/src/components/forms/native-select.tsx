import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { focusRing } from "../../lib/variants";

function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div data-slot="native-select-wrapper" className="relative inline-flex w-full">
      <select
        data-slot="native-select"
        className={cn(
          "border-input bg-background text-foreground ring-offset-background h-10 w-full appearance-none rounded-md border px-3 py-2 pr-9 text-sm shadow-xs outline-none transition-colors",
          "focus-visible:border-ring",
          focusRing,
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className,
        )}
        {...props}
      >
        {children}
      </select>

      <ChevronDownIcon
        aria-hidden="true"
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 opacity-50"
      />
    </div>
  );
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({ ...props }: React.ComponentProps<"optgroup">) {
  return <optgroup data-slot="native-select-optgroup" {...props} />;
}

export { NativeSelect, NativeSelectOption, NativeSelectOptGroup };
