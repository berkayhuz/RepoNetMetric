import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@netmetric/ui";

type QrPreviewPanelProps = {
  previewDataUrl: string | null;
};

export function QrPreviewPanel({ previewDataUrl }: QrPreviewPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Preview</CardTitle>
        <CardDescription>
          The QR preview updates in your browser only. Nothing is uploaded.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {previewDataUrl ? (
          <Image
            src={previewDataUrl}
            alt="Generated QR code preview"
            width={256}
            height={256}
            unoptimized
            className="mx-auto rounded-md border bg-white object-contain p-2"
          />
        ) : (
          <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            Enter text or a URL to generate a preview.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
