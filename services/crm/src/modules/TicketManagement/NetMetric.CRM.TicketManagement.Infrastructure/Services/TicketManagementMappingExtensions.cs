using NetMetric.CRM.TicketManagement.Domain.Common;

namespace NetMetric.CRM.TicketManagement.Infrastructure.Services;

internal static class TicketManagementMappingExtensions
{
    public static string GenerateTicketNumber()
        => $"{TicketNumberDefaults.Prefix}-{DateTime.UtcNow:yyyyMMddHHmmssfff}";
}
