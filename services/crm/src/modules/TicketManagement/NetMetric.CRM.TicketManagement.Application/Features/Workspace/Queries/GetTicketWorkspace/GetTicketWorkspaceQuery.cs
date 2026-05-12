using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Features.Workspace.Queries.GetTicketWorkspace;

public sealed record GetTicketWorkspaceQuery(Guid TicketId) : IRequest<TicketWorkspaceDto?>;
