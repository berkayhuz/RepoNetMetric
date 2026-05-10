namespace NetMetric.Auth.Contracts.Internal;

public sealed record InternalCreateTenantInvitationRequest(
    Guid ActorUserId,
    string Email,
    string? FirstName,
    string? LastName);
