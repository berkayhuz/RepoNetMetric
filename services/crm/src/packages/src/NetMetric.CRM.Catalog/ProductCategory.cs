namespace NetMetric.CRM.Catalog;

public class ProductCategory : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public Guid? ParentCategoryId { get; set; }
    public ProductCategory? ParentCategory { get; set; }
}
