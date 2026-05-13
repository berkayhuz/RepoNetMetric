namespace NetMetric.Auth.Application.Descriptors;

public sealed record AccessTokenDescriptor(string Token, DateTime ExpiresAtUtc);
