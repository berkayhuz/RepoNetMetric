using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Companies;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Companies.Queries.GetCompanyWorkspace;

public sealed record GetCompanyWorkspaceQuery(Guid CompanyId) : IRequest<CompanyWorkspaceDto>;
