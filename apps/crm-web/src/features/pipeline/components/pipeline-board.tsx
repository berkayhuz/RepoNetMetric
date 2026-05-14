import { Card, CardContent, CardDescription, CardHeader, CardTitle, Text } from "@netmetric/ui";

import { moveOpportunityStageAction } from "@/features/pipeline/actions/pipeline-stage-actions";
import { PipelineStageMoveForm } from "@/features/pipeline/components/pipeline-stage-move-form";
import { opportunityStageOptions } from "@/features/shared/forms/options";
import type { PipelineBoardDto } from "@/lib/crm-api";
import { isGuid } from "@/features/shared/data/guid";

function normalizeLabel(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function mapColumnNameToStageValue(columnName: string): number | undefined {
  const normalized = normalizeLabel(columnName);
  const matched = opportunityStageOptions.find(
    (option) => normalizeLabel(option.label) === normalized,
  );
  return matched?.value;
}

export function PipelineBoard({ board }: Readonly<{ board: PipelineBoardDto }>) {
  return (
    <section className="space-y-4" aria-label="Pipeline board">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{board.pipelineName}</h2>
        <p className="text-sm text-muted-foreground">
          Read-only board with server-validated stage movement.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {board.columns.map((column) => {
          const defaultStageValue = mapColumnNameToStageValue(column.name);

          return (
            <Card key={column.stageId}>
              <CardHeader>
                <CardTitle className="text-base">{column.name}</CardTitle>
                <CardDescription>
                  {column.opportunityCount} items - Total {column.totalValue}
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
                      <li key={opportunity.id} className="space-y-2 rounded-md border p-3">
                        <p className="font-medium">{opportunity.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {opportunity.opportunityCode}
                        </p>
                        <p className="text-sm">Amount: {opportunity.amount}</p>
                        <p className="text-xs text-muted-foreground">
                          {opportunity.customerName ?? "No customer linked"}
                        </p>
                        {defaultStageValue !== undefined && isGuid(opportunity.id) ? (
                          <PipelineStageMoveForm
                            opportunityId={opportunity.id}
                            currentStage={defaultStageValue}
                            action={moveOpportunityStageAction.bind(null, opportunity.id)}
                          />
                        ) : (
                          <Text className="text-xs text-muted-foreground">
                            Stage movement unavailable for this card mapping.
                          </Text>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
