export const QR_MAX_INPUT_LENGTH = 2048;

export type QrValidationResult =
  | { isValid: true; normalizedValue: string }
  | { isValid: false; normalizedValue: string; errorMessage: string };

export function validateQrInput(rawValue: string): QrValidationResult {
  const normalizedValue = rawValue.trim();

  if (normalizedValue.length === 0) {
    return {
      isValid: false,
      normalizedValue,
      errorMessage: "Enter text or a URL to generate a QR code.",
    };
  }

  if (normalizedValue.length > QR_MAX_INPUT_LENGTH) {
    return {
      isValid: false,
      normalizedValue,
      errorMessage: `Input must be ${QR_MAX_INPUT_LENGTH} characters or fewer.`,
    };
  }

  return {
    isValid: true,
    normalizedValue,
  };
}
