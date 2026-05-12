using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using NetMetric.CRM.API.Compatibility;
using NetMetric.CRM.CustomerManagement.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

if (!builder.Environment.IsDevelopment())
{
    throw new InvalidOperationException(
        "The standalone CustomerManagement API host is deprecated and disabled outside Development. Use NetMetric.CRM.API as the single production CRM host.");
}

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddCustomerManagementModule(builder.Configuration);
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSection = builder.Configuration.GetSection("Authentication:Jwt");
        var issuer = jwtSection["Issuer"];
        var audience = jwtSection["Audience"];
        var metadataAddress = jwtSection["MetadataAddress"];
        var authority = jwtSection["Authority"];
        var requireConfiguredJwt = !builder.Environment.IsDevelopment();

        if (requireConfiguredJwt &&
            (string.IsNullOrWhiteSpace(issuer) ||
             string.IsNullOrWhiteSpace(audience) ||
             (string.IsNullOrWhiteSpace(metadataAddress) && string.IsNullOrWhiteSpace(authority))))
        {
            throw new InvalidOperationException("Authentication:Jwt issuer, audience and metadata address or authority must be configured outside Development.");
        }

        options.RequireHttpsMetadata = !builder.Environment.IsDevelopment();
        options.IncludeErrorDetails = builder.Environment.IsDevelopment();
        options.SaveToken = false;
        if (!string.IsNullOrWhiteSpace(authority))
        {
            options.Authority = authority;
        }

        if (!string.IsNullOrWhiteSpace(metadataAddress))
        {
            options.MetadataAddress = metadataAddress;
        }

        options.RefreshOnIssuerKeyNotFound = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = issuer,
            ValidateAudience = true,
            ValidAudience = audience,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });
builder.Services.AddAuthorization(options =>
{
    options.AddCustomerManagementPolicies();
    options.FallbackPolicy = options.DefaultPolicy;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
