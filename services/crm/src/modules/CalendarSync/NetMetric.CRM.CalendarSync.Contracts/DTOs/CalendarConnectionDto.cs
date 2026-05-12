namespace NetMetric.CRM.CalendarSync.Contracts.DTOs;

public sealed record CalendarConnectionDto(Guid Id, string Name, string Provider, string CalendarIdentifier, string SyncDirection, bool IsActive);
