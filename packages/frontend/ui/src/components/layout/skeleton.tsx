import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      default: "bg-muted",
      subtle: "bg-muted/60",
      strong: "bg-muted/90",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps): React.JSX.Element {
  return (
    <div aria-hidden="true" className={cn(skeletonVariants({ variant }), className)} {...props} />
  );
}

export { Skeleton, skeletonVariants };
