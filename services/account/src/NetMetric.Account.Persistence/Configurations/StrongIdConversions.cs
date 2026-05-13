using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetMetric.Account.Domain.Common;

namespace NetMetric.Account.Persistence.Configurations;

internal static class StrongIdConversions
{
    public static readonly ValueConverter<TenantId, Guid> TenantId = new(
        id => id.Value,
        value => NetMetric.Account.Domain.Common.TenantId.From(value));

    public static readonly ValueConverter<UserId, Guid> UserId = new(
        id => id.Value,
        value => NetMetric.Account.Domain.Common.UserId.From(value));
}
