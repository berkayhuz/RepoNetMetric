using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Addresses;

public sealed record SoftDeleteAddressCommand(Guid AddressId) : IRequest<Unit>;
