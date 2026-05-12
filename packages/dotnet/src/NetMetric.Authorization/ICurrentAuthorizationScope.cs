namespace NetMetric.Authorization;

public interface ICurrentAuthorizationScope
{
    AuthorizationScope Resolve(string resource);
}
