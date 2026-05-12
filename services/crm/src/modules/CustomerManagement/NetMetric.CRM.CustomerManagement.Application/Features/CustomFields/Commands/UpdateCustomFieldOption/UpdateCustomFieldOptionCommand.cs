using NetMetric.CRM.CustomerManagement.Application.DTOs.CustomFields;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.CustomFields.Commands.UpdateCustomFieldOption;

public sealed record UpdateCustomFieldOptionCommand : IRequest<CustomFieldOptionDto>
{
    public Guid OptionId { get; init; }
    public required string Label { get; init; }
    public required string Value { get; init; }
    public int OrderNo { get; init; }
}
