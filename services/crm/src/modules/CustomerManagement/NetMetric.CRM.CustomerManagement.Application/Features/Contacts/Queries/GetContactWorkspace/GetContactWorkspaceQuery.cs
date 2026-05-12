using NetMetric.CRM.CustomerManagement.Application.DTOs.Contacts;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Contacts.Queries.GetContactWorkspace;

public sealed record GetContactWorkspaceQuery(Guid ContactId) : IRequest<ContactWorkspaceDto>;
