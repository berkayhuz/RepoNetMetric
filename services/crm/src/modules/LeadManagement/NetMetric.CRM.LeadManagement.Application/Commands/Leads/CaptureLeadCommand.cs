using MediatR;
using NetMetric.CRM.Types;
using System.Text.Json;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed record CaptureLeadCommand(
    string FullName,
    string? Email,
    string? Phone,
    string? CompanyName,
    string? JobTitle,
    string? Description,
    LeadSourceType Source,
    Guid? CaptureFormId,
    string? ReferrerUrl,
    string? UtmSource,
    string? UtmMedium,
    string? UtmCampaign,
    string? UtmTerm,
    string? UtmContent,
    Dictionary<string, object>? DynamicData) : IRequest<Guid>;
