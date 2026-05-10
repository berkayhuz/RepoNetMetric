namespace NetMetric.AspNetCore.TrustedGateway.Options;

public sealed class TrustedGatewayKeyOptions
{
    public string KeyId { get; set; } = string.Empty;

    public string Secret { get; set; } = string.Empty;

    public bool Enabled { get; set; } = true;

    public bool SignRequests { get; set; } = true;
}