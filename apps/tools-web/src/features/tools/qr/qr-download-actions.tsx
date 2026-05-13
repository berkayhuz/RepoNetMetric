import { Button } from "@netmetric/ui";

type QrDownloadActionsProps = {
  canDownload: boolean;
  onDownload: () => void;
};

export function QrDownloadActions({ canDownload, onDownload }: QrDownloadActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button type="button" onClick={onDownload} disabled={!canDownload}>
        Download PNG
      </Button>
      <p className="text-sm text-muted-foreground">File name: netmetric-qr-code.png</p>
      <p className="sr-only" role="status" aria-live="polite">
        {canDownload
          ? "QR output is ready for download."
          : "Generate a QR code to enable download."}
      </p>
    </div>
  );
}
