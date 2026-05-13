using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.CustomFields;

namespace NetMetric.CRM.CustomerManagement.Application.Features.CustomFields.Commands.UpsertCustomFieldValue;

public sealed class UpsertCustomFieldValueCommand : IRequest<CustomFieldValueDto>
{
    public required Guid DefinitionId { get; init; }
    public required string EntityName { get; init; }
    public required Guid EntityId { get; init; }
    public string? Value { get; init; }
}
