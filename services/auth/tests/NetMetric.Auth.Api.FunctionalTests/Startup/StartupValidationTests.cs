using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using NetMetric.Auth.API.Security;
using NetMetric.Auth.Application.Options;

namespace NetMetric.Auth.Api.FunctionalTests.Startup;

public sealed class StartupValidationTests
{
    [Fact]
    public void Startup_Should_Fail_In_Production_When_JwtSigningKey_Is_Missing()
    {
        var validation = ValidateJwtOptions(
            new JwtOptions
            {
                Issuer = "https://auth.netmetric.net",
                Audience = "https://app.netmetric.net",
                AccessTokenMinutes = 15,
                RefreshTokenDays = 14,
                SigningKeys = []
            },
            new TestHostEnvironment(Environments.Production));

        validation.Failed.Should().BeTrue();
        validation.Failures.Should().Contain(message => message.Contains("Jwt:SigningKeys", StringComparison.Ordinal));
    }

    [Fact]
    public void Startup_Should_Fail_In_Production_When_TokenTransport_Mode_Is_BodyOnly()
    {
        var validator = new TokenTransportOptionsValidation(new TestHostEnvironment(Environments.Production));
        var result = validator.Validate(
            null,
            new TokenTransportOptions
            {
                Mode = TokenTransportModes.BodyOnly,
                AccessCookieName = "__Secure-netmetric-access",
                RefreshCookieName = "__Secure-netmetric-refresh",
                SessionCookieName = "__Secure-netmetric-session",
                AccessCookiePath = "/",
                RefreshCookiePath = "/api/auth",
                SessionCookiePath = "/api/auth",
                SameSite = "Lax"
            });

        result.Failed.Should().BeTrue();
        result.Failures.Should().Contain(message => message.Contains("Security:TokenTransport:Mode must be CookiesOnly outside development.", StringComparison.Ordinal));
    }

    [Fact]
    public void Startup_Should_Fail_In_Production_When_Cors_Uses_Wildcard_With_Credentials()
    {
        var validator = new ApiCorsOptionsValidation(new TestHostEnvironment(Environments.Production));
        var result = validator.Validate(
            null,
            new ApiCorsOptions
            {
                AllowedOrigins = ["*"],
                AllowCredentials = true
            });

        result.Failed.Should().BeTrue();
        result.Failures.Should().Contain(message => message.Contains("AllowedOrigins cannot contain '*'", StringComparison.Ordinal));
    }

    [Fact]
    public void Startup_Should_Fail_In_Production_When_IdentityConnection_Is_Loopback()
    {
        var config = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["ConnectionStrings:IdentityConnection"] = "Server=localhost;Database=AuthDb;User Id=sa;Password=test-only-placeholder;Encrypt=True;"
            })
            .Build();

        var validation = ValidateDatabaseOptions(
            new DatabaseOptions { ApplyMigrationsOnStartup = false },
            new TestHostEnvironment(Environments.Production),
            config);

        validation.Failed.Should().BeTrue();
        validation.Failures.Should().Contain(message => message.Contains("ConnectionStrings:IdentityConnection cannot point to localhost in production.", StringComparison.Ordinal));
    }

    private static ValidateOptionsResult ValidateJwtOptions(JwtOptions options, IHostEnvironment environment)
    {
        var validatorType = Type.GetType(
                "NetMetric.Auth.Infrastructure.DependencyInjection.JwtOptionsValidation, NetMetric.Auth.Infrastructure",
                throwOnError: true)!
            ;
        var validator = Activator.CreateInstance(validatorType, environment)!;
        return (ValidateOptionsResult)validatorType.GetMethod("Validate")!.Invoke(validator, [null, options])!;
    }

    private static ValidateOptionsResult ValidateDatabaseOptions(DatabaseOptions options, IHostEnvironment environment, IConfiguration configuration)
    {
        var validatorType = Type.GetType(
                "NetMetric.Auth.Infrastructure.DependencyInjection.DatabaseOptionsValidation, NetMetric.Auth.Infrastructure",
                throwOnError: true)!
            ;
        var validator = Activator.CreateInstance(validatorType, environment, configuration)!;
        return (ValidateOptionsResult)validatorType.GetMethod("Validate")!.Invoke(validator, [null, options])!;
    }

    private sealed class TestHostEnvironment(string environmentName) : IHostEnvironment
    {
        public string EnvironmentName { get; set; } = environmentName;
        public string ApplicationName { get; set; } = "NetMetric.Auth.Api.FunctionalTests";
        public string ContentRootPath { get; set; } = AppContext.BaseDirectory;
        public IFileProvider ContentRootFileProvider { get; set; } = new NullFileProvider();
    }
}
