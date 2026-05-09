export const visuallyHiddenClass =
  "absolute size-px overflow-hidden whitespace-nowrap border-0 p-0";

export function createAriaId(prefix: string, value: string) {
  return `${prefix}-${value}`.toLowerCase().replace(/[^a-z0-9-_]/g, "-");
}
