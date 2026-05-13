namespace NetMetric.CRM.DealManagement.Application.Common;

public sealed record DealPageRequest(int Page, int PageSize)
{
    public int NormalizedPage => Page < 1 ? 1 : Page;
    public int NormalizedPageSize => PageSize is < 1 or > 200 ? 20 : PageSize;
}
