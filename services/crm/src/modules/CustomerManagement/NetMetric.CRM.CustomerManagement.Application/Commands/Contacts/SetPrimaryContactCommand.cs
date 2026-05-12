using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Contacts;

public sealed record SetPrimaryContactCommand(Guid ContactId) : IRequest<Unit>;
