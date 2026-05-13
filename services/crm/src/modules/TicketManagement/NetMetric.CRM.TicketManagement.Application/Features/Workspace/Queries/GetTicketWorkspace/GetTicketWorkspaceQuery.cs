using MediatR;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Features.Workspace.Queries.GetTicketWorkspace;

public sealed record GetTicketWorkspaceQuery(Guid TicketId) : IRequest<TicketWorkspaceDto?>;
