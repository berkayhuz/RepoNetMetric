namespace NetMetric.Authorization;

public interface IFieldAuthorizationService
{
    FieldAuthorizationDecision Decide(string resource, string field, IReadOnlyCollection<string> permissions);
}
