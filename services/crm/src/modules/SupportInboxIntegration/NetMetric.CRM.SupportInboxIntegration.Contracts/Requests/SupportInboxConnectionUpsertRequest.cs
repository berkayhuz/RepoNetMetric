using NetMetric.CRM.SupportInboxIntegration.Domain.Enums;

namespace NetMetric.CRM.SupportInboxIntegration.Contracts.Requests;

public sealed class SupportInboxConnectionUpsertRequest
{
    public string Name { get; set; } = null!;
    public SupportInboxProviderType Provider { get; set; }
    public string EmailAddress { get; set; } = null!;
    public string Host { get; set; } = null!;
    public int Port { get; set; }
    public string Username { get; set; } = null!;
    public string SecretReference { get; set; } = null!;
    public bool UseSsl { get; set; }
    public bool IsActive { get; set; } = true;
}
