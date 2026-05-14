import { CrmEmptyState } from "@/components/shell/crm-empty-state";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { PipelineBoard } from "@/features/pipeline/components/pipeline-board";
import { getPipelineBoardData, getPipelinesData } from "@/features/pipeline/data/pipeline-data";
import { isGuid } from "@/features/shared/data/guid";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function PipelinePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/pipeline");

  const params = await searchParams;
  const selectedPipelineIdRaw =
    typeof params.pipelineId === "string"
      ? params.pipelineId
      : Array.isArray(params.pipelineId)
        ? params.pipelineId[0]
        : undefined;
  const ownerUserIdRaw =
    typeof params.ownerUserId === "string"
      ? params.ownerUserId
      : Array.isArray(params.ownerUserId)
        ? params.ownerUserId[0]
        : undefined;

  const pipelines = await getPipelinesData("/pipeline");

  if (pipelines.length === 0) {
    return (
      <section className="space-y-6">
        <CrmPageHeader
          title="Pipeline"
          description="Read-only pipeline overview from consolidated CRM API."
        />
        <CrmEmptyState
          title="No pipeline configuration found"
          description="Create or import pipeline definitions from backend administration first."
        />
      </section>
    );
  }

  const selectedPipeline =
    selectedPipelineIdRaw && isGuid(selectedPipelineIdRaw)
      ? (pipelines.find((pipeline) => pipeline.id === selectedPipelineIdRaw) ?? pipelines[0])
      : pipelines[0];

  if (!selectedPipeline) {
    return (
      <section className="space-y-6">
        <CrmPageHeader
          title="Pipeline"
          description="Read-only pipeline overview from consolidated CRM API."
        />
        <CrmEmptyState
          title="No selectable pipeline found"
          description="Pipeline list response did not include a usable pipeline item."
        />
      </section>
    );
  }

  const ownerUserId = ownerUserIdRaw && isGuid(ownerUserIdRaw) ? ownerUserIdRaw : undefined;
  const board = await getPipelineBoardData(selectedPipeline.id, "/pipeline", ownerUserId);

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title="Pipeline"
        description="Read-only pipeline board using real stage and opportunity data."
      />
      <PipelineBoard board={board} />
    </section>
  );
}
