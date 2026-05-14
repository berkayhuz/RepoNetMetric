using FluentAssertions;
using NetMetric.CRM.KnowledgeBaseManagement.Domain.Entities;
using NetMetric.CRM.KnowledgeBaseManagement.Domain.Enums;

namespace NetMetric.CRM.KnowledgeBaseManagement.UnitTests;

public sealed class KnowledgeBaseArticleTests
{
    [Fact]
    public void Publish_Should_Set_Status_And_PublishedAt()
    {
        var article = new KnowledgeBaseArticle(Guid.NewGuid(), "How to reset password", "summary", "content", true);
        var now = DateTime.UtcNow;

        article.Publish(now);

        article.Status.Should().Be(KnowledgeBaseArticleStatus.Published);
        article.PublishedAt.Should().Be(now);
    }
}
