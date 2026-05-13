using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.CustomFields;

namespace NetMetric.CRM.CustomerManagement.Application.Features.CustomFields.Queries.GetCustomFieldValues;

public sealed class GetCustomFieldValuesQuery : IRequest<IReadOnlyList<CustomFieldValueDto>>
{
    public required string EntityName { get; init; }
    public required Guid EntityId { get; init; }
}
