using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Duplicates;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Duplicates.Queries.DetectPotentialDuplicates;

public sealed class DetectPotentialDuplicatesQuery : IRequest<IReadOnlyList<DuplicateCandidateDto>>
{
    public required string EntityType { get; init; }
    public string? Term { get; init; }
    public bool ExactOnly { get; init; }
}
