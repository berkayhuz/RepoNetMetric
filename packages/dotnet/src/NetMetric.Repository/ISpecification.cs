using System.Linq.Expressions;

namespace NetMetric.Repository;

public interface ISpecification<TEntity>
{
    Expression<Func<TEntity, bool>>? Criteria { get; }
}
