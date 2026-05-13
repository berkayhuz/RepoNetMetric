using NetMetric.CRM.CustomerManagement.Application.Commands.Companies;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;

namespace NetMetric.CRM.CustomerManagement.Application.Abstractions;

public interface ICompanyAdministrationService
{
    Task<CompanyDetailDto> CreateAsync(CreateCompanyCommand request, CancellationToken cancellationToken = default);
    Task<CompanyDetailDto> UpdateAsync(UpdateCompanyCommand request, CancellationToken cancellationToken = default);
    Task ActivateAsync(Guid companyId, CancellationToken cancellationToken = default);
    Task DeactivateAsync(Guid companyId, CancellationToken cancellationToken = default);
    Task SoftDeleteAsync(Guid companyId, CancellationToken cancellationToken = default);
}
