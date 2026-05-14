import Link from "next/link";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@netmetric/ui";

type ModuleItem = {
  title: string;
  href?: string;
  status: "active" | "contract-pending";
  description: string;
};

export function DashboardModuleGrid({ modules }: Readonly<{ modules: ModuleItem[] }>) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((module) => (
        <Card key={module.title}>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>{module.title}</CardTitle>
              <Badge variant={module.status === "active" ? "secondary" : "outline"}>
                {module.status === "active" ? "Active" : "Contract pending"}
              </Badge>
            </div>
            <CardDescription>{module.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {module.href ? (
              <Link
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                href={module.href}
              >
                Open module
              </Link>
            ) : (
              <p className="text-sm text-muted-foreground">
                Coming after API contract confirmation.
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
