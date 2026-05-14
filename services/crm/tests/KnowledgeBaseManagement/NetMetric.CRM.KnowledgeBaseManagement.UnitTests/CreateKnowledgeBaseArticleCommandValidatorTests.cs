using FluentAssertions;
using NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Articles.CreateKnowledgeBaseArticle;
using NetMetric.CRM.KnowledgeBaseManagement.Application.Validators;

namespace NetMetric.CRM.KnowledgeBaseManagement.UnitTests;

public sealed class CreateKnowledgeBaseArticleCommandValidatorTests
{
    [Fact]
    public void Validate_Should_Pass_For_Valid_Command()
    {
        var validator = new CreateKnowledgeBaseArticleCommandValidator();
        var result = validator.Validate(new CreateKnowledgeBaseArticleCommand(Guid.NewGuid(), "Title", "summary", "content", true));
        result.IsValid.Should().BeTrue();
    }
}
