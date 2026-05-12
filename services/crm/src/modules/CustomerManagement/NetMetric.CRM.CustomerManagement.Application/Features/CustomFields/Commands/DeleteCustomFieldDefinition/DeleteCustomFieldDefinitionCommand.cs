using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.CustomFields.Commands.DeleteCustomFieldDefinition;

public sealed class DeleteCustomFieldDefinitionCommand : IRequest<Unit>
{
    public Guid DefinitionId { get; init; }
}
