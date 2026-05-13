namespace NetMetric.CRM.KnowledgeBaseManagement.Contracts.Requests;

public sealed class KnowledgeBaseCategoryUpsertRequest
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int SortOrder { get; set; }
}
