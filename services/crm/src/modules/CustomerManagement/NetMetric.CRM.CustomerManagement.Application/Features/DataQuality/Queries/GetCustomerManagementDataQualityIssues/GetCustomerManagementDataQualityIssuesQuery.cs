using NetMetric.CRM.CustomerManagement.Application.DTOs.DataQuality;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.DataQuality.Queries.GetCustomerManagementDataQualityIssues;

public sealed class GetCustomerManagementDataQualityIssuesQuery : IRequest<IReadOnlyList<DataQualityIssueDto>>
{
    public int Take { get; init; } = 200;
}
