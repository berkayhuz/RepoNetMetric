using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Queries.Contacts;

public sealed record GetContactByIdQuery(Guid ContactId) : IRequest<ContactDetailDto?>;
