namespace NetMetric.CRM.KnowledgeBaseManagement.Contracts.Requests;

public sealed class KnowledgeBaseArticleUpsertRequest
{
    public Guid CategoryId { get; set; }
    public string Title { get; set; } = null!;
    public string? Summary { get; set; }
    public string Content { get; set; } = null!;
    public bool IsPublic { get; set; }
}
