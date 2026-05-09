import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { focusRing } from "../../lib/variants";

type PaginationProps = React.ComponentProps<"nav">;

function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

type PaginationContentProps = React.ComponentProps<"ul">;

function PaginationContent({ className, ...props }: PaginationContentProps) {
  return <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />;
}

type PaginationItemProps = React.ComponentProps<"li">;

function PaginationItem(props: PaginationItemProps) {
  return <li {...props} />;
}

type PaginationLinkProps = React.ComponentProps<"a"> & {
  isActive?: boolean;
};

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        [
          "inline-flex h-9 min-w-9 items-center justify-center rounded-md",
          "border border-input bg-background px-4 py-2",
          "text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          focusRing,
          "disabled:pointer-events-none disabled:opacity-50",
          isActive && "border-transparent bg-accent text-accent-foreground",
        ],
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />

      <span>Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>Next</span>

      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />

      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
