"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "../../lib/utils";

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>;

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderProps): React.JSX.Element {
  const sliderValue = React.useMemo(() => {
    if (Array.isArray(value)) {
      return value;
    }

    if (Array.isArray(defaultValue)) {
      return defaultValue;
    }

    return [min];
  }, [defaultValue, min, value]);

  const rootProps: SliderProps = {
    ...props,
    min,
    max,
    className: cn("relative flex w-full touch-none select-none items-center", className),
  };

  if (value !== undefined) {
    rootProps.value = value;
  }

  if (defaultValue !== undefined) {
    rootProps.defaultValue = defaultValue;
  }

  return (
    <SliderPrimitive.Root data-slot="slider" {...rootProps}>
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted"
      >
        <SliderPrimitive.Range data-slot="slider-range" className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>

      {sliderValue.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className={cn(
            "block size-5 rounded-full border border-primary/50 bg-background shadow-sm transition-colors",
            "ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
export type { SliderProps };
