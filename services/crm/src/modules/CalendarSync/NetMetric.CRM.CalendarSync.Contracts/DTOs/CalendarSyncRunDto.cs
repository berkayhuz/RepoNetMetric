namespace NetMetric.CRM.CalendarSync.Contracts.DTOs;

public sealed record CalendarSyncRunDto(Guid Id, Guid ConnectionId, string Status, int ImportedCount, int ExportedCount, string? ErrorMessage);
