namespace NetMetric.Authorization;

public sealed record FieldAuthorizationDecision(
    string Resource,
    string Field,
    FieldVisibility Visibility);
