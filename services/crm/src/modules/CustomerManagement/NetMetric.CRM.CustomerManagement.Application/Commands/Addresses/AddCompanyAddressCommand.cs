using MediatR;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Addresses;

public sealed record AddCompanyAddressCommand(
    Guid CompanyId,
    AddressType AddressType,
    string Line1,
    string? Line2,
    string? District,
    string? City,
    string? State,
    string? Country,
    string? ZipCode,
    bool IsDefault) : IRequest<AddressDto>;
