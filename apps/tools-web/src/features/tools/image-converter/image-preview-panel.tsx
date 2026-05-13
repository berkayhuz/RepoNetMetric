import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@netmetric/ui";

type ImagePreviewPanelProps = {
  previewUrl: string | null;
  width: number | null;
  height: number | null;
  altText: string;
};

export function ImagePreviewPanel({ previewUrl, width, height, altText }: ImagePreviewPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>Preview is generated locally in your browser only.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt={altText}
            width={320}
            height={320}
            unoptimized
            className="mx-auto max-h-80 rounded-md border bg-white object-contain p-1"
          />
        ) : (
          <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            Select a valid source file to see a preview.
          </p>
        )}

        {width && height ? (
          <p className="text-xs text-muted-foreground">
            Dimensions: {width} x {height}px
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
