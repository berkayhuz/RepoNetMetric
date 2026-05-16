"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, Text, cn } from "@netmetric/ui";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@netmetric/ui/client";
import { Menu } from "lucide-react";

import { publicEnv } from "@/lib/public-env";

type PublicNavLink = {
  href: string;
  label: string;
};

type PublicHeaderCopy = {
  primaryAria: string;
  signIn: string;
  openCrm: string;
  openMenu: string;
  navigationTitle: string;
};

function PublicNavLinks({
  links,
  primaryAria,
  mobile = false,
}: {
  links: readonly PublicNavLink[];
  primaryAria: string;
  mobile?: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={primaryAria}
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

export function PublicHeader({
  links,
  copy,
}: {
  links: readonly PublicNavLink[];
  copy: PublicHeaderCopy;
}) {
  return (
    <header className="sticky top-0 z-sticky border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            NM
          </span>
          <Text className="font-semibold">NetMetric</Text>
        </Link>

        <PublicNavLinks links={links} primaryAria={copy.primaryAria} />

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" size="sm">
            <a href={publicEnv.authUrl}>{copy.signIn}</a>
          </Button>
          <Button asChild size="sm">
            <a href={publicEnv.crmUrl}>{copy.openCrm}</a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label={copy.openMenu}>
              <Menu className={cn("size-5")} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{copy.navigationTitle}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 grid gap-4">
              <PublicNavLinks links={links} primaryAria={copy.primaryAria} mobile />
              <div className="grid gap-2 border-t pt-4">
                <Button asChild variant="outline">
                  <a href={publicEnv.authUrl}>{copy.signIn}</a>
                </Button>
                <Button asChild>
                  <a href={publicEnv.crmUrl}>{copy.openCrm}</a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
