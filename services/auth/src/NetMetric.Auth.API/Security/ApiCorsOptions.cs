using System.ComponentModel.DataAnnotations;

namespace NetMetric.Auth.API.Security;

public sealed class ApiCorsOptions
{
    public const string SectionName = "Security:Cors";
    public const string PolicyName = "auth-cors";

    [MinLength(1)]
    public string[] AllowedOrigins { get; set; } = [];

    public bool AllowCredentials { get; set; } = true;
}
