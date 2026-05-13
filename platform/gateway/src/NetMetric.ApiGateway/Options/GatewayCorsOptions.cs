using System.ComponentModel.DataAnnotations;

namespace NetMetric.ApiGateway.Options;

public sealed class GatewayCorsOptions
{
    public const string SectionName = "Security:Cors";
    public const string PolicyName = "gateway-cors";

    [MinLength(1)]
    public string[] AllowedOrigins { get; set; } = [];

    public bool AllowCredentials { get; set; } = true;
}
