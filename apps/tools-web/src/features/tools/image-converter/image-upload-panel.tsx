import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  NativeSelect,
} from "@netmetric/ui";

import type { ImageConverterMode } from "./image-validation";

type ImageUploadPanelProps = {
  mode: ImageConverterMode;
  accept: string;
  isPending: boolean;
  errorMessage: string | null;
  onFileChange: (file: File | null) => void;
  jpgQuality: number;
  onJpgQualityChange: (quality: number) => void;
};

export function ImageUploadPanel({
  mode,
  accept,
  isPending,
  errorMessage,
  onFileChange,
  jpgQuality,
  onJpgQualityChange,
}: ImageUploadPanelProps) {
  const describedBy = errorMessage ? "image-file-help image-file-error" : "image-file-help";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload file</CardTitle>
        <CardDescription>
          {mode === "png-to-jpg"
            ? "Upload a PNG file up to 5 MB."
            : "Upload a JPG/JPEG file up to 5 MB."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="converter-file" className="text-sm font-medium">
            Source image
          </label>
          <input
            id="converter-file"
            type="file"
            accept={accept}
            onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
            disabled={isPending}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={describedBy}
            className="block w-full text-sm file:mr-4 file:rounded-md file:border file:border-input file:bg-background file:px-3 file:py-2 file:text-sm file:font-medium"
          />
          <p id="image-file-help" className="text-xs text-muted-foreground">
            SVG and unsupported formats are rejected.
          </p>
          {errorMessage ? (
            <p id="image-file-error" role="alert" className="text-sm text-destructive">
              {errorMessage}
            </p>
          ) : null}
        </div>

        {mode === "png-to-jpg" ? (
          <div className="space-y-2">
            <label htmlFor="jpg-quality" className="text-sm font-medium">
              JPG quality
            </label>
            <NativeSelect
              id="jpg-quality"
              value={String(jpgQuality)}
              onChange={(event) => onJpgQualityChange(Number(event.target.value))}
              disabled={isPending}
            >
              <option value="60">60% (smaller file)</option>
              <option value="75">75% (balanced)</option>
              <option value="90">90% (higher quality)</option>
            </NativeSelect>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
