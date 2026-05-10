using NetMetric.Auth.Infrastructure.Persistence;

namespace NetMetric.Auth.TestKit.Helpers;

public static class DatabaseResetHelper
{
    public static async Task ResetAsync(AuthDbContext dbContext)
    {
        await dbContext.Database.EnsureDeletedAsync();
        await dbContext.Database.EnsureCreatedAsync();
    }
}

