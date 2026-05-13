import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  NativeSelect,
  Textarea,
} from "@netmetric/ui";

import { QR_MAX_INPUT_LENGTH } from "./qr-validation";

type QrSizeOption = {
  label: string;
  value: number;
};

type QrErrorCorrection = "L" | "M" | "Q" | "H";

type QrInputPanelProps = {
  value: string;
  errorMessage: string | null;
  size: number;
  correctionLevel: QrErrorCorrection;
  sizeOptions: QrSizeOption[];
  onValueChange: (value: string) => void;
  onSizeChange: (value: number) => void;
  onCorrectionLevelChange: (value: QrErrorCorrection) => void;
};

export function QrInputPanel({
  value,
  errorMessage,
  size,
  correctionLevel,
  sizeOptions,
  onValueChange,
  onSizeChange,
  onCorrectionLevelChange,
}: QrInputPanelProps) {
  const describedBy = errorMessage ? "qr-input-help qr-input-error" : "qr-input-help";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
        <CardDescription>
          Enter the content that should be encoded into the QR code.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="qr-input" className="text-sm font-medium">
            Text or URL
          </label>
          <Textarea
            id="qr-input"
            name="qr-input"
            value={value}
            rows={6}
            maxLength={QR_MAX_INPUT_LENGTH + 50}
            onChange={(event) => onValueChange(event.target.value)}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={describedBy}
            placeholder="https://example.com"
          />
          <p id="qr-input-help" className="text-xs text-muted-foreground">
            Max {QR_MAX_INPUT_LENGTH} characters. Leading and trailing spaces are trimmed.
          </p>
          {errorMessage ? (
            <p id="qr-input-error" className="text-sm text-destructive" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="qr-size" className="text-sm font-medium">
              QR size
            </label>
            <NativeSelect
              id="qr-size"
              value={String(size)}
              onChange={(event) => onSizeChange(Number(event.target.value))}
            >
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          </div>

          <div className="space-y-2">
            <label htmlFor="qr-ecl" className="text-sm font-medium">
              Error correction
            </label>
            <NativeSelect
              id="qr-ecl"
              value={correctionLevel}
              onChange={(event) => onCorrectionLevelChange(event.target.value as QrErrorCorrection)}
            >
              <option value="L">Low</option>
              <option value="M">Medium</option>
              <option value="Q">Quartile</option>
              <option value="H">High</option>
            </NativeSelect>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
