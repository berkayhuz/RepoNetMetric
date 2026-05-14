import { renderCrmModuleShell } from "@/features/modules/render-module-shell";

export default async function PipelinePage() {
  return renderCrmModuleShell("/pipeline");
}
