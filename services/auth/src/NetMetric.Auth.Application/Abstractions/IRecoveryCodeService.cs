namespace NetMetric.Auth.Application.Abstractions;

public interface IRecoveryCodeService
{
    IReadOnlyCollection<string> GenerateCodes(int count);
    string HashCode(Guid tenantId, Guid userId, string code);
}
