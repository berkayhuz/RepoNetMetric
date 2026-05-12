namespace NetMetric.CRM.CustomerManagement.Application.Abstractions.Services;

public interface ICustomerManagementMergeService
{
    Task MergeCompaniesAsync(Guid targetCompanyId, Guid sourceCompanyId, CancellationToken cancellationToken = default);
    Task MergeContactsAsync(Guid targetContactId, Guid sourceContactId, CancellationToken cancellationToken = default);
    Task MergeCustomersAsync(Guid targetCustomerId, Guid sourceCustomerId, CancellationToken cancellationToken = default);
}
