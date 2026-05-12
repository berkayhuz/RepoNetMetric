namespace NetMetric.CRM.CustomerManagement.Infrastructure.Services;

public sealed class CustomerManagementSecurityOptions
{
    public bool AllowUnassignedRead { get; set; } = true;
    public bool AllowUnassignedWrite { get; set; }
}
