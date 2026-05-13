"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, Text, cn } from "@netmetric/ui";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@netmetric/ui/client";
import { Menu } from "lucide-react";

import { companyLinks, primaryNavLinks } from "@/features/public/content/navigation";
import { publicEnv } from "@/lib/public-env";

function PublicNavLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const links = [...primaryNavLinks, ...companyLinks];

  return (
    <nav
      aria-label="Primary"
      className={mobile ? "grid gap-2" : "hidden items-center gap-1 lg:flex"}
    >
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Button
            key={link.href}
            asChild
            variant={active ? "secondary" : "ghost"}
            size={mobile ? "default" : "sm"}
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        );
      })}
    </nav>
  );
}

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-sticky border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            NM
          </span>
          <Text className="font-semibold">NetMetric</Text>
        </Link>

        <PublicNavLinks />

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" size="sm">
            <a href={publicEnv.authUrl}>Sign In</a>
          </Button>
          <Button asChild size="sm">
            <a href={publicEnv.crmUrl}>Open CRM</a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className={cn("size-5")} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="mt-6 grid gap-4">
              <PublicNavLinks mobile />
              <div className="grid gap-2 border-t pt-4">
                <Button asChild variant="outline">
                  <a href={publicEnv.authUrl}>Sign In</a>
                </Button>
                <Button asChild>
                  <a href={publicEnv.crmUrl}>Open CRM</a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
