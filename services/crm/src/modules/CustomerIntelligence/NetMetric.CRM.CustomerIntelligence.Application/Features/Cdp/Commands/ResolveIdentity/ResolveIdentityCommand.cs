using MediatR;
using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Cdp.Commands.ResolveIdentity;

public sealed record ResolveIdentityCommand(
    string SubjectType,
    Guid SubjectId,
    string IdentityType,
    string IdentityValue,
    decimal ConfidenceScore,
    string? ResolutionNotes) : IRequest<IdentityResolutionDto>;
