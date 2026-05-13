using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Contacts;

public sealed record SoftDeleteContactCommand(Guid ContactId) : IRequest<Unit>;
