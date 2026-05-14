import { Card, CardContent, CardDescription, CardHeader, CardTitle, Text } from "@netmetric/ui";

import type { PipelineBoardDto } from "@/lib/crm-api";

export function PipelineBoard({ board }: Readonly<{ board: PipelineBoardDto }>) {
  return (
    <section className="space-y-4" aria-label="Pipeline board">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{board.pipelineName}</h2>
        <p className="text-sm text-muted-foreground">
          Read-only board view from CRM pipeline endpoints.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {board.columns.map((column) => (
          <Card key={column.stageId}>
            <CardHeader>
              <CardTitle className="text-base">{column.name}</CardTitle>
              <CardDescription>
                {column.opportunityCount} items � Total {column.totalValue}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {column.opportunities.length === 0 ? (
                <Text className="text-sm text-muted-foreground">
                  No opportunities in this stage.
                </Text>
              ) : (
                <ul className="space-y-3">
                  {column.opportunities.map((opportunity) => (
                    <li key={opportunity.id} className="rounded-md border p-3">
                      <p className="font-medium">{opportunity.name}</p>
                      <p className="text-xs text-muted-foreground">{opportunity.opportunityCode}</p>
                      <p className="text-sm">Amount: {opportunity.amount}</p>
                      <p className="text-xs text-muted-foreground">
                        {opportunity.customerName ?? "No customer linked"}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
