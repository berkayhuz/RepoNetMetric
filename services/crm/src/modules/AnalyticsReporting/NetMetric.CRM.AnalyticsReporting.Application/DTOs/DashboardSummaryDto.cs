namespace NetMetric.CRM.AnalyticsReporting.Application.DTOs;

public sealed record DashboardSummaryDto(
    string RoleName,
    IReadOnlyCollection<WidgetDto> Widgets);

public sealed record WidgetDto(
    string WidgetKey,
    string Title,
    string DataSource,
    string ConfigurationJson,
    int DisplayOrder);
