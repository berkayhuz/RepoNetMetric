import { Button, Card, CardContent } from "@netmetric/ui";

type ImageDownloadActionsProps = {
  canConvert: boolean;
  isPending: boolean;
  canDownload: boolean;
  outputFileName: string;
  onConvert: () => void;
  onDownload: () => void;
};

export function ImageDownloadActions({
  canConvert,
  isPending,
  canDownload,
  outputFileName,
  onConvert,
  onDownload,
}: ImageDownloadActionsProps) {
  return (
    <Card className="mt-6">
      <CardContent className="flex flex-wrap items-center gap-3 pt-6">
        <Button type="button" onClick={onConvert} disabled={!canConvert || isPending}>
          {isPending ? "Converting..." : "Convert image"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onDownload}
          disabled={!canDownload || isPending}
        >
          Download output
        </Button>
        <p className="text-sm text-muted-foreground">Output file: {outputFileName}</p>
        <p className="sr-only" role="status" aria-live="polite">
          {isPending ? "Image conversion in progress." : "Image conversion ready."}
        </p>
      </CardContent>
    </Card>
  );
}
