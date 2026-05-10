namespace NetMetric.Auth.Application.Abstractions;

public interface IAuthUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}