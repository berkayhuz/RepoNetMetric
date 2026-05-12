using NetMetric.CRM.Types;

namespace NetMetric.CRM.CustomerManagement.Contracts.DTOs;

public sealed record AddressDto(
    Guid Id,
    AddressType AddressType,
    string Line1,
    string? Line2,
    string? District,
    string? City,
    string? State,
    string? Country,
    string? ZipCode,
    bool IsDefault,
    string RowVersion);
