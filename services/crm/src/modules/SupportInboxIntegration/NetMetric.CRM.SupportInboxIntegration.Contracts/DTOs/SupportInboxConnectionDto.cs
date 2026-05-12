namespace NetMetric.CRM.SupportInboxIntegration.Contracts.DTOs;

public sealed record SupportInboxConnectionDto(Guid Id, string Name, string Provider, string EmailAddress, string Host, int Port, string Username, bool UseSsl, bool IsActive);
