using NetMetric.CRM.CustomerManagement.Application.DTOs.Tags;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Tags.Commands.CreateTag;

public sealed class CreateTagCommand : IRequest<TagDto>
{
    public required string Name { get; init; }
    public string? ColorHex { get; init; }
    public string? Description { get; init; }
}
