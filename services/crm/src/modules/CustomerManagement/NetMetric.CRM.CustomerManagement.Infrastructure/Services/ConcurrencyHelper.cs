using Microsoft.EntityFrameworkCore;

namespace NetMetric.CRM.CustomerManagement.Infrastructure.Services;

internal static class ConcurrencyHelper
{
    public static void ApplyRowVersion<TEntity>(DbContext dbContext, TEntity entity, string? rowVersion)
        where TEntity : class
    {
        if (string.IsNullOrWhiteSpace(rowVersion))
            return;

        var originalValue = Convert.FromBase64String(rowVersion);
        dbContext.Entry(entity).Property("RowVersion").OriginalValue = originalValue;
    }
}
