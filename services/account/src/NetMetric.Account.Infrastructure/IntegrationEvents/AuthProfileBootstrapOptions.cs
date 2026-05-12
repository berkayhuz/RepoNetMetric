namespace NetMetric.Account.Infrastructure.IntegrationEvents;

public sealed class AuthProfileBootstrapOptions
{
    public const string SectionName = "AuthProfileBootstrap";

    public bool Enabled { get; set; } = true;

    public string QueueName { get; set; } = "netmetric.account.auth-user-registered.v1";
}
