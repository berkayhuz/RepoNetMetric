using MediatR;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;

namespace NetMetric.CRM.CustomerManagement.Application.Queries.Contacts;

public sealed record GetContactByIdQuery(Guid ContactId) : IRequest<ContactDetailDto?>;
