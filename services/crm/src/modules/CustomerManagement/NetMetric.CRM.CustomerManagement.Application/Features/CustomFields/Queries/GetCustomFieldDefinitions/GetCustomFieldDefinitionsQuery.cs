using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.CustomFields;

namespace NetMetric.CRM.CustomerManagement.Application.Features.CustomFields.Queries.GetCustomFieldDefinitions;

public sealed class GetCustomFieldDefinitionsQuery : IRequest<IReadOnlyList<CustomFieldDefinitionDto>>
{
    public required string EntityName { get; init; }
}
