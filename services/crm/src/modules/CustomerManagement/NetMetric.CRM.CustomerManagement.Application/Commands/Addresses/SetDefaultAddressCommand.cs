using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Addresses;

public sealed record SetDefaultAddressCommand(Guid AddressId) : IRequest<Unit>;
