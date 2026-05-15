export type AccountDateSettings = {
  locale: string;
  timeZone: string;
  dateFormat: string;
};

function fallbackDateString(value: Date): string {
  return value.toISOString();
}

function getDateOrder(dateFormat: string): Intl.DateTimeFormatOptions {
  switch (dateFormat) {
    case "yyyy-MM-dd":
      return { year: "numeric", month: "2-digit", day: "2-digit" };
    case "dd/MM/yyyy":
      return { day: "2-digit", month: "2-digit", year: "numeric" };
    case "MM/dd/yyyy":
      return { month: "2-digit", day: "2-digit", year: "numeric" };
    case "dd.MM.yyyy":
      return { day: "2-digit", month: "2-digit", year: "numeric" };
    case "d MMM yyyy":
      return { day: "numeric", month: "short", year: "numeric" };
    default:
      return { year: "numeric", month: "2-digit", day: "2-digit" };
  }
}

export function formatAccountDateTime(
  value: string | null | undefined,
  settings: AccountDateSettings,
): string {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  try {
    const datePart = new Intl.DateTimeFormat(settings.locale, {
      ...getDateOrder(settings.dateFormat),
      timeZone: settings.timeZone,
    }).format(date);
    const timePart = new Intl.DateTimeFormat(settings.locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: settings.timeZone,
    }).format(date);
    return `${datePart} ${timePart}`;
  } catch {
    return fallbackDateString(date);
  }
}
