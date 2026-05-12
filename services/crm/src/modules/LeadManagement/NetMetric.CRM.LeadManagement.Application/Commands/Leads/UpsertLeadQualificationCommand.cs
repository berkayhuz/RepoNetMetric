using MediatR;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed record UpsertLeadQualificationCommand(
    Guid LeadId,
    QualificationFrameworkType FrameworkType,
    string QualificationDataJson) : IRequest;
