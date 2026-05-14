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
  crmModuleGroups,
  crmModuleRegistry,
  getCrmModulesByGroup,
  type CrmModuleStatus,
} from "@/features/modules/module-registry";

const statusLabelByKey: Record<CrmModuleStatus, string> = {
  active: "Active",
  read_only: "Read only",
  contract_pending: "Contract pending",
  coming_soon: "Coming soon",
};

function pageTitle(pathname: string): string {
  if (pathname === "/") {
    return "Dashboard";
  }

  const matched = crmModuleRegistry.find(
    (item) => pathname === item.path || pathname.startsWith(`${item.path}/`),
  );

  return matched?.title ?? "CRM";
}

export function CrmShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <a
        href="#main-content"
        className="sr-only left-4 top-4 z-modal rounded-md bg-background px-3 py-2 focus:not-sr-only focus:absolute"
      >
        Skip to content
      </a>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="px-2 py-1">
            <p className="text-sm font-semibold">NetMetric CRM</p>
            <p className="text-xs text-muted-foreground">Protected workspace</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {crmModuleGroups.map((group) => {
            const modules = getCrmModulesByGroup(group);
            if (!modules.length) {
              return null;
            }

            return (
              <SidebarGroup key={group}>
                <SidebarGroupLabel>{group}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {modules.map((moduleItem) => {
                      const isActive =
                        pathname === moduleItem.path || pathname.startsWith(`${moduleItem.path}/`);

                      return (
                        <SidebarMenuItem key={moduleItem.id}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link
                              href={moduleItem.path}
                              aria-label={`${moduleItem.title} (${statusLabelByKey[moduleItem.status]})`}
                            >
                              {moduleItem.title}
                            </Link>
                          </SidebarMenuButton>
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
                <Link href="/settings">Account settings</Link>
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
                      <Link href="/dashboard">CRM</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{pageTitle(pathname)}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="hidden w-full max-w-xs md:block">
              <Input aria-label="Global search" placeholder="Search (placeholder)" />
            </div>
            <Button variant="outline">Quick create</Button>
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
