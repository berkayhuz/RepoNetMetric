"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  Input,
  Separator,
} from "@netmetric/ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  ThemeToggle,
} from "@netmetric/ui/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  canNavigateCrmModule,
  crmModuleGroups,
  crmModuleRegistry,
  getCrmModulesByGroup,
  isCrmModuleNavigable,
} from "@/features/modules/module-registry";
import type { CrmCapabilities } from "@/lib/crm-auth/crm-capabilities";
import { getCrmGroupLabel, getCrmModuleTitle, getCrmStatusLabel, tCrm } from "@/lib/i18n/crm-i18n";

function pageTitle(pathname: string, locale: string): string {
  if (pathname === "/") {
    return tCrm("crm.dashboard.title", locale);
  }

  const matched = crmModuleRegistry.find(
    (item) => pathname === item.path || pathname.startsWith(`${item.path}/`),
  );

  if (!matched) {
    return tCrm("crm.shell.breadcrumbRoot", locale);
  }

  return getCrmModuleTitle(matched, locale);
}

export function CrmShell({
  children,
  locale,
  capabilities,
}: Readonly<{ children: React.ReactNode; locale: string; capabilities?: CrmCapabilities }>) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <a
        href="#main-content"
        className="sr-only left-4 top-4 z-modal rounded-md bg-background px-3 py-2 focus:not-sr-only focus:absolute"
      >
        {tCrm("crm.shell.skipToContent", locale)}
      </a>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="px-2 py-1">
            <p className="text-sm font-semibold">{tCrm("crm.shell.appTitle", locale)}</p>
            <p className="text-xs text-muted-foreground">{tCrm("crm.shell.workspace", locale)}</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {crmModuleGroups.map((group) => {
            const modules = getCrmModulesByGroup(group).filter(
              (moduleItem) =>
                !isCrmModuleNavigable(moduleItem) || canNavigateCrmModule(moduleItem, capabilities),
            );
            if (!modules.length) {
              return null;
            }

            return (
              <SidebarGroup key={group}>
                <SidebarGroupLabel>{getCrmGroupLabel(group, locale)}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {modules.map((moduleItem) => {
                      const isNavigable = canNavigateCrmModule(moduleItem, capabilities);
                      const isActive =
                        isNavigable &&
                        (pathname === moduleItem.path ||
                          pathname.startsWith(`${moduleItem.path}/`));
                      const label = getCrmModuleTitle(moduleItem, locale);
                      const statusLabel = getCrmStatusLabel(moduleItem.status, locale);

                      return (
                        <SidebarMenuItem key={moduleItem.id}>
                          {isNavigable ? (
                            <SidebarMenuButton asChild isActive={isActive}>
                              <Link href={moduleItem.path} aria-label={`${label} (${statusLabel})`}>
                                {label}
                              </Link>
                            </SidebarMenuButton>
                          ) : (
                            <SidebarMenuButton aria-disabled="true" disabled title={statusLabel}>
                              {label}
                            </SidebarMenuButton>
                          )}
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/settings">{tCrm("crm.shell.accountSettings", locale)}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
            <div className="flex-1">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/dashboard">{tCrm("crm.shell.breadcrumbRoot", locale)}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{pageTitle(pathname, locale)}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="hidden w-full max-w-xs md:block">
              <Input
                aria-label={tCrm("crm.shell.globalSearchAria", locale)}
                placeholder={tCrm("crm.shell.searchPlaceholder", locale)}
                aria-disabled="true"
                disabled
                title={tCrm("crm.shell.searchPlaceholder", locale)}
              />
            </div>
            <Button
              variant="outline"
              disabled
              aria-disabled="true"
              title={tCrm("crm.actions.quickCreate", locale)}
            >
              {tCrm("crm.actions.quickCreate", locale)}
            </Button>
            <ThemeToggle />
          </div>
        </header>
        <main id="main-content" className="p-4 md:p-6">
          <Card>
            <CardContent className="space-y-4 p-4 md:p-6">{children}</CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
