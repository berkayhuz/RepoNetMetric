namespace NetMetric.Auth.Application.Descriptors;

public sealed record RefreshTokenDescriptor(string Token, string Hash, DateTime ExpiresAtUtc);