namespace NetMetric.Auth.Contracts.Requests;

public sealed record CreateWorkspaceRequest(string Name, string? Culture = null);
