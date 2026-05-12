namespace NetMetric.CRM.ProductCatalog.Domain.Common;

public interface ICatalogItemEntity
{
    string Code { get; }
    string Name { get; }
    string? Description { get; }
    bool IsActive { get; }

    void Update(string code, string name, string? description);
    void Activate();
    void Deactivate();
}
