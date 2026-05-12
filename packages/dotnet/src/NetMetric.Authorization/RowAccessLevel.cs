namespace NetMetric.Authorization;

public enum RowAccessLevel
{
    None = 0,
    Own = 10,
    Assigned = 20,
    Tenant = 100
}
