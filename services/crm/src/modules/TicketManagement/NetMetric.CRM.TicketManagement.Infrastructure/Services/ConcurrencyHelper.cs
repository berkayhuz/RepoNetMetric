using Microsoft.EntityFrameworkCore;
using NetMetric.Entities.Abstractions;

namespace NetMetric.CRM.TicketManagement.Infrastructure.Services;

internal static class ConcurrencyHelper
{
    public static void ApplyRowVersion<TEntity>(DbContext dbContext, TEntity entity, byte[]? rowVersion)
        where TEntity : class, IHasRowVersion
    {
        if (rowVersion is null || rowVersion.Length == 0)
            return;

        dbContext.Entry(entity).Property(x => x.RowVersion).OriginalValue = rowVersion;
    }
}
