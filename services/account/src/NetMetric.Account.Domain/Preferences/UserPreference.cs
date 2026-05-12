using NetMetric.Account.Domain.Common;
using NetMetric.Localization;

namespace NetMetric.Account.Domain.Preferences;

public sealed class UserPreference
{
    private UserPreference()
    {
        Theme = ThemePreference.System;
        Language = "en-US";
        TimeZone = "UTC";
        DateFormat = "yyyy-MM-dd";
        Version = [];
    }

    private UserPreference(Guid id, TenantId tenantId, UserId userId, DateTimeOffset utcNow)
        : this()
    {
        Id = id;
        TenantId = tenantId;
        UserId = userId;
        CreatedAt = utcNow;
        UpdatedAt = utcNow;
    }

    public Guid Id { get; private set; }
    public TenantId TenantId { get; private set; }
    public UserId UserId { get; private set; }
    public ThemePreference Theme { get; private set; }
    public string Language { get; private set; }
    public string TimeZone { get; private set; }
    public string DateFormat { get; private set; }
    public Guid? DefaultOrganizationId { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }
    public DateTimeOffset UpdatedAt { get; private set; }
    public byte[] Version { get; private set; }

    public static UserPreference CreateDefault(TenantId tenantId, UserId userId, DateTimeOffset utcNow)
        => new(Guid.NewGuid(), tenantId, userId, utcNow);

    public void Update(
        ThemePreference theme,
        string language,
        string timeZone,
        string dateFormat,
        Guid? defaultOrganizationId,
        DateTimeOffset utcNow)
    {
        Theme = theme;
        Language = NetMetricCultures.Normalize(language)
            ?? throw new DomainValidationException($"{nameof(language)} must be one of: {string.Join(", ", NetMetricCultures.SupportedCultureNames)}.");
        TimeZone = Normalize(timeZone, 100, nameof(timeZone));
        DateFormat = Normalize(dateFormat, 40, nameof(dateFormat));
        DefaultOrganizationId = defaultOrganizationId == Guid.Empty ? null : defaultOrganizationId;
        UpdatedAt = utcNow;
    }

    private static string Normalize(string value, int maxLength, string name)
    {
        var normalized = value.Trim();
        if (normalized.Length == 0)
        {
            throw new DomainValidationException($"{name} is required.");
        }

        if (normalized.Length > maxLength)
        {
            throw new DomainValidationException($"{name} cannot exceed {maxLength} characters.");
        }

        return normalized;
    }
}
