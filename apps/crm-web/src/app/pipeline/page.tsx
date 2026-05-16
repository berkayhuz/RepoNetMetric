import { CrmEmptyState } from "@/components/shell/crm-empty-state";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { PipelineBoard } from "@/features/pipeline/components/pipeline-board";
import { getPipelineBoardData, getPipelinesData } from "@/features/pipeline/data/pipeline-data";
import { isGuid } from "@/features/shared/data/guid";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function PipelinePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/pipeline");
  const locale = await getRequestLocale();

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
          title={tCrm("crm.pipeline.title", locale)}
          description={tCrm("crm.pipeline.description", locale)}
        />
        <CrmEmptyState
          title={tCrm("crm.pipeline.emptyConfigurationTitle", locale)}
          description={tCrm("crm.pipeline.emptyConfigurationDescription", locale)}
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
          title={tCrm("crm.pipeline.title", locale)}
          description={tCrm("crm.pipeline.description", locale)}
        />
        <CrmEmptyState
          title={tCrm("crm.pipeline.noSelectableTitle", locale)}
          description={tCrm("crm.pipeline.noSelectableDescription", locale)}
        />
      </section>
    );
  }

  const ownerUserId = ownerUserIdRaw && isGuid(ownerUserIdRaw) ? ownerUserIdRaw : undefined;
  const board = await getPipelineBoardData(selectedPipeline.id, "/pipeline", ownerUserId);

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={tCrm("crm.pipeline.title", locale)}
        description={tCrm("crm.pipeline.boardPageDescription", locale)}
      />
      <PipelineBoard board={board} locale={locale} />
    </section>
  );
}
