using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using MediatR;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Customers;

public sealed record CreateCustomerCommand(string FirstName, string LastName, string? Title, string? Email, string? MobilePhone, string? WorkPhone, string? PersonalPhone, DateTime? BirthDate, GenderType Gender, string? Department, string? JobTitle, string? Description, string? Notes, Guid? OwnerUserId, CustomerType CustomerType, string? IdentityNumber, bool IsVip, Guid? CompanyId) : IRequest<CustomerDetailDto>;
