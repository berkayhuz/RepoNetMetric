using NetMetric.CRM.CustomerManagement.Application.DTOs.CustomFields;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.CustomFields.Commands.CreateCustomFieldOption;

public sealed record CreateCustomFieldOptionCommand : IRequest<CustomFieldOptionDto>
{
    public Guid DefinitionId { get; init; }
    public required string Label { get; init; }
    public required string Value { get; init; }
    public int OrderNo { get; init; }
}
