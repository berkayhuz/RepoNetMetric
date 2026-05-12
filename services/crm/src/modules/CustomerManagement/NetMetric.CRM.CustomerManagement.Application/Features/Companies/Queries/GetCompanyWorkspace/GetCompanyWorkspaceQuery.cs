using NetMetric.CRM.CustomerManagement.Application.DTOs.Companies;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Companies.Queries.GetCompanyWorkspace;

public sealed record GetCompanyWorkspaceQuery(Guid CompanyId) : IRequest<CompanyWorkspaceDto>;
