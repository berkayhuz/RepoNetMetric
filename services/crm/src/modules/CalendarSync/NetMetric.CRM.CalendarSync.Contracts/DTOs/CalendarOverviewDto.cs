namespace NetMetric.CRM.CalendarSync.Contracts.DTOs;

public sealed record CalendarOverviewDto(IReadOnlyList<CalendarConnectionDto> Connections, IReadOnlyList<CalendarSyncRunDto> RecentRuns, int ActiveConnectionCount);
