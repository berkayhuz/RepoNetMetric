namespace NetMetric.Auth.Application.Options;

public sealed class SeedOptions
{
    public const string SectionName = "Seed";

    public Guid DefaultTenantId { get; set; }

    public bool AllowStartupSeed { get; set; }

    public bool AllowProductionStartupSeed { get; set; }
}
