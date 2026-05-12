using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.CustomFields.Commands.DeleteCustomFieldOption;

public sealed class DeleteCustomFieldOptionCommand : IRequest<Unit>
{
    public Guid OptionId { get; init; }
}
