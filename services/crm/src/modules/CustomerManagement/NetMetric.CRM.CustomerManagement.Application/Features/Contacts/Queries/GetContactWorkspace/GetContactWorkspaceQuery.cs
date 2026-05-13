using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Contacts;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Contacts.Queries.GetContactWorkspace;

public sealed record GetContactWorkspaceQuery(Guid ContactId) : IRequest<ContactWorkspaceDto>;
