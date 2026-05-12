using NetMetric.CRM.CustomerManagement.Application.DTOs.Tags;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Tags.Queries.ListTagsForEntity;

public sealed class ListTagsForEntityQuery : IRequest<IReadOnlyList<TagDto>>
{
    public required string EntityName { get; init; }
    public required Guid EntityId { get; init; }
}
