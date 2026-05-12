using MediatR;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed record ChangeLeadStatusCommand(Guid LeadId, LeadStatusType Status) : IRequest<Unit>;
