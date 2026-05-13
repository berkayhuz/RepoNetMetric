using Microsoft.EntityFrameworkCore;
using NetMetric.Account.Application.Abstractions.Persistence;

namespace NetMetric.Account.Persistence.Repositories;

public sealed class EfConcurrencyTokenWriter(AccountDbContext dbContext) : IConcurrencyTokenWriter
{
    public void SetOriginalVersion<TEntity>(TEntity entity, byte[] version)
        where TEntity : class
        => dbContext.Entry(entity).Property("Version").OriginalValue = version;
}
